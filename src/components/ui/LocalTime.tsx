"use client";

import { useEffect, useState } from "react";
import { site } from "@/config/site";

/** Hora actual en Uruguay. Le dice al cliente "estoy en tu misma zona horaria". */
export function LocalTime({ className = "" }: { className?: string }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("es-UY", { hour: "2-digit", minute: "2-digit", timeZone: site.timeZone });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = setInterval(update, 15_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={className}>
      {site.location} <span className="font-semibold tabular-nums">{time || "--:--"}</span>
    </span>
  );
}
