"use client";

import { useEffect } from "react";
import { getSettings, SETTINGS_EVENT } from "@/lib/storage";

const FONT_SIZE_MAP: Record<string, string> = {
  small: "16px",
  medium: "18px",
  large: "20px",
  xlarge: "22px",
};

const LINE_SPACING_MAP: Record<string, string> = {
  normal: "1.6",
  wide: "1.8",
  "extra-wide": "2.1",
};

export function AccessibilityProvider() {
  useEffect(() => {
    const applySettings = () => {
      const settings = getSettings();
      const root = document.documentElement;
      const body = document.body;

      root.style.setProperty("--app-font-size", FONT_SIZE_MAP[settings.fontSize] ?? "18px");
      root.style.setProperty("--app-line-height", LINE_SPACING_MAP[settings.lineSpacing] ?? "1.6");

      body.classList.toggle("high-contrast", settings.highContrast);
      body.classList.toggle("reduced-motion", settings.reducedMotion);
      body.classList.toggle("font-dyslexic", settings.dyslexiaFont);
      body.dataset.overlay = settings.colorOverlay;
    };

    applySettings();
    window.addEventListener(SETTINGS_EVENT, applySettings);

    return () => {
      window.removeEventListener(SETTINGS_EVENT, applySettings);
    };
  }, []);

  return null;
}
