"use client";

import { useEffect, useRef } from "react";

interface EnergyBeamProps {
  projectId?: string;
  className?: string;
}

declare global {
  interface Window {
    UnicornStudio?: {
      init: () => void;
      isInitialized?: boolean;
    };
  }
}

const SCRIPT_SRC =
  "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.5.2/dist/unicornStudio.umd.js";

export function EnergyBeam({ projectId = "hRFfUymDGOHwtFe7evR2", className = "" }: EnergyBeamProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.UnicornStudio) {
      window.UnicornStudio.init();
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
    if (existingScript) {
      existingScript.addEventListener("load", () => window.UnicornStudio?.init(), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => window.UnicornStudio?.init();
    document.head.appendChild(script);
  }, [projectId]);

  return (
    <div
      ref={containerRef}
      data-us-project={projectId}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 h-full w-full overflow-hidden ${className}`}
    />
  );
}

export default EnergyBeam;
