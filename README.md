# Bro Garage Web

Landing de lanzamiento de **brogarage.com.co**, construida con Next.js App Router, React y TypeScript.

Una fotografía local ocupa toda la pantalla. El mensaje «Muy pronto Bro Garage será web!» y un reloj en vivo con fecha, hora, minutos y segundos de Colombia (America/Bogota) completan la página. El encuadre y la posición del texto se adaptan a móviles y escritorio. No incluye backend ni base de datos.

## Desarrollo

Node.js 22 y npm.

```sh
npm ci
npm run dev
```

Abrir http://localhost:3000. Validar con `npm run lint` y `npm run build`.

## Estructura

- `src/app/page.tsx`: landing y fotografía con Next Image.
- `src/app/globals.css`: encuadres, contraste y diseño responsive.
- `src/components/colombia-clock.tsx`: reloj cliente con actualización cada segundo.
- `public/bro-garage.jpg`: fotografía proporcionada por el propietario.
- `AGENTS.md` y `SKILLS.md`: instrucciones y procedimientos de mantenimiento.

## GitHub y Vercel

Trabajar en `dev` y abrir PR a `main`. Importar el repositorio en Vercel, elegir Next.js y mantener `main` como Production Branch. La integración Git genera previews y despliega producción automáticamente. En GitHub, configurar CI / quality como check requerido si se desea impedir merges con fallos; el workflow por sí solo no cambia la protección de ramas.

Agregar `brogarage.com.co` y `www.brogarage.com.co` en Vercel y copiar los registros que indique a Spaceship. Conservar los MX y TXT de Zoho. Vercel administra HTTPS al verificar el DNS.

## Releases con notas de IA

El workflow de release escucha **deployment_status success**, solamente para `main` y entornos cuyo nombre comience por `Production`. Publica una release por SHA desplegado, después del despliegue exitoso, con resumen en español basado en commits y diff desde la release anterior que sea ancestro. Usa GitHub Models con el token temporal del workflow (`models: read`); no necesita una clave externa. Las notas identifican el modelo y enlazan código y despliegue. Los límites de entrada se aplican antes de enviar el diff.

Configuración externa necesaria:

1. Conectar Vercel al repositorio y dejar habilitados los eventos GitHub `deployment_status`. Confirmar que reporta ref `main` y entorno `Production` (o ajustar el filtro a los valores reales).
2. Habilitar GitHub Models para el repositorio/cuenta y permitir su uso por Actions según las políticas aplicables. El diff se envía a este servicio para redactar notas.
3. Opcional: definir la variable de repositorio `RELEASE_MODEL` (por defecto `openai/gpt-4o-mini`). El modelo debe estar disponible para esa cuenta.
4. Tras el primer deployment exitoso en main, comprobar Actions y Releases. Si falla el acceso a Models, corregirlo y reejecutar el job. No publica notas de respaldo haciéndolas pasar por IA.

Los tags `deploy-<SHA completo>` evitan duplicados al repetir un deployment. Un rollback de un SHA ya publicado no crea una segunda release. Los eventos de preview o fallidos no publican releases. Esta automatización no conecta ni configura la cuenta de Vercel por sí sola.
