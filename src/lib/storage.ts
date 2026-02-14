"use client";

export interface AccessibilitySettings {
  fontSize: "small" | "medium" | "large" | "xlarge";
  highContrast: boolean;
  reducedMotion: boolean;
  colorOverlay: "none" | "yellow" | "blue" | "green" | "pink";
  lineSpacing: "normal" | "wide" | "extra-wide";
  readingSpeed: "slow" | "normal" | "fast";
  dyslexiaFont: boolean;
}

const DEFAULT_SETTINGS: AccessibilitySettings = {
  fontSize: "medium",
  highContrast: false,
  reducedMotion: false,
  colorOverlay: "none",
  lineSpacing: "normal",
  readingSpeed: "normal",
  dyslexiaFont: false,
};

const STORAGE_KEY = "accessedu-settings";
export const SETTINGS_EVENT = "accessedu-settings";

export function getSettings(): AccessibilitySettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
  } catch {}
  return DEFAULT_SETTINGS;
}

export function saveSettings(settings: AccessibilitySettings): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  window.dispatchEvent(new Event(SETTINGS_EVENT));
}

export function getFontSizeClass(size: AccessibilitySettings["fontSize"]): string {
  const map = { small: "text-sm", medium: "text-base", large: "text-lg", xlarge: "text-xl" };
  return map[size];
}

export function getLineSpacingClass(spacing: AccessibilitySettings["lineSpacing"]): string {
  const map = { normal: "leading-normal", wide: "leading-relaxed", "extra-wide": "leading-loose" };
  return map[spacing];
}
