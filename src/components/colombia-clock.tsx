"use client";

import { useEffect, useState } from "react";

const dateFormat = new Intl.DateTimeFormat("es-CO", {
  timeZone: "America/Bogota", weekday: "long", day: "numeric", month: "long", year: "numeric",
});
const timeFormat = new Intl.DateTimeFormat("es-CO", {
  timeZone: "America/Bogota", hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23",
});

export default function ColombiaClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const update = () => setNow(new Date());
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="clock">
      <p className="clock-date">{now ? dateFormat.format(now) : "Hora de Colombia"}</p>
      <time dateTime={now?.toISOString()} className="clock-time">{now ? timeFormat.format(now) : "--:--:--"}</time>
      <span className="clock-zone">COLOMBIA · UTC−5</span>
    </div>
  );
}
