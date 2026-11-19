import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

// Execute the script with isolated process, git, and HTTP dependencies.
const source = readFileSync(new URL('./release.mjs', import.meta.url), 'utf8')
  .replace("import { execFileSync } from 'node:child_process';", '');
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
const execute = new AsyncFunction('execFileSync', 'fetch', 'process', 'console', source);
const sha = 'a'.repeat(40);
const tag = `release-${sha}`;
const legacy = `deploy-${'b'.repeat(40)}`;
const json = (value, status = 200) => new Response(JSON.stringify(value), { status, headers: { 'Content-Type': 'application/json' } });

async function run({ pages = [[]], notes = { body: '## Changes\n* Fix release notes in #3' }, responseAt, unreachable = [] } = {}) {
  const requests = [];
  let page = 0;
  await execute((command, args) => {
    assert.equal(command, 'git');
    if (unreachable.includes(args[2])) throw new Error('Not an ancestor');
    return '';
  }, async (url, options = {}) => {
    const path = url.split('/repos/owner/repo/')[1];
    const body = options.body ? JSON.parse(options.body) : undefined;
    requests.push({ path, body });
    const override = responseAt?.(path);
    if (override) return override;
    if (path.startsWith('releases?')) return json(pages[page++] ?? []);
    if (path === 'releases/generate-notes') return json(notes);
    assert.equal(path, 'releases');
    return json({ html_url: 'https://github.com/owner/repo/releases/example' }, 201);
  }, {
    env: { GH_TOKEN: 'test-token', GITHUB_REPOSITORY: 'owner/repo', RELEASE_SHA: sha },
    exit: code => { assert.equal(code, 0); throw new Error('Already released'); },
  }, { log() {} }).catch(error => { error.requests = requests; throw error; });
  return requests;
}

test('publishes native notes for the exact main SHA without calling an AI endpoint', async () => {
  const requests = await run();
  const generated = requests.find(r => r.path === 'releases/generate-notes');
  assert.deepEqual(generated.body, { tag_name: tag, target_commitish: sha });
  const published = requests.find(r => r.path === 'releases').body;
  assert.equal(published.tag_name, tag);
  assert.equal(published.target_commitish, sha);
  assert.match(published.body, /Fix release notes in #3/);
  assert.match(published.body, /deployment status is independent/);
  assert.doesNotMatch(published.body, /AI-generated|\[Deployment\]/);
});

test('does not publish an existing SHA twice', async () => {
  await assert.rejects(run({ pages: [[{ tag_name: tag }]] }), error => {
    assert.equal(error.message, 'Already released');
    assert.equal(error.requests.length, 1);
    return true;
  });
});

test('uses a reachable legacy release and excludes drafts, prereleases, and unrelated tags', async () => {
  const requests = await run({ pages: [[
    { tag_name: 'release-unreachable' },
    { tag_name: 'release-draft', draft: true },
    { tag_name: 'release-prerelease', prerelease: true },
    { tag_name: 'unrelated' },
    { tag_name: legacy },
  ]], unreachable: ['release-unreachable'] });
  assert.equal(requests.find(r => r.path === 'releases/generate-notes').body.previous_tag_name, legacy);
});

test('checks releases beyond the first page for duplicates', async () => {
  const first = Array.from({ length: 100 }, (_, i) => ({ tag_name: `other-${i}` }));
  await assert.rejects(run({ pages: [first, [{ tag_name: tag }]] }), error => {
    assert.equal(error.message, 'Already released');
    assert.equal(error.requests.length, 2);
    return true;
  });
});

for (const path of ['releases?per_page=100&page=1', 'releases/generate-notes']) {
  test(`diagnoses HTTP 200 text OK from ${path} without publishing`, async () => {
    await assert.rejects(run({ responseAt: requestPath => requestPath === path ? new Response('OK\n', { headers: { 'Content-Type': 'text/plain' } }) : undefined }), error => {
      assert.match(error.message, /returned invalid JSON \(HTTP 200, Content-Type: text\/plain\)/);
      assert.ok(error.message.includes(path));
      assert.ok(!error.requests.some(r => r.path === 'releases'));
      return true;
    });
  });
}

test('does not publish empty notes', async () => {
  await assert.rejects(run({ notes: { body: ' ' } }), /empty release notes/);
});

test('reports API permission failures without exposing response content', async () => {
  await assert.rejects(run({ responseAt: path => path === 'releases/generate-notes' ? new Response('sensitive content', { status: 403 }) : undefined }), error => {
    assert.match(error.message, /releases\/generate-notes failed \(HTTP 403\)/);
    assert.doesNotMatch(error.message, /sensitive content|test-token/);
    assert.ok(!error.requests.some(r => r.path === 'releases'));
    return true;
  });
});
