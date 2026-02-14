"use client";

import { useState, useEffect } from "react";
import { Save, RotateCcw } from "lucide-react";
import { getSettings, saveSettings, type AccessibilitySettings } from "@/lib/storage";

const fontSizeOptions: { value: AccessibilitySettings["fontSize"]; label: string }[] = [
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" },
  { value: "xlarge", label: "Extra Large" },
];

const colorOverlayOptions: { value: AccessibilitySettings["colorOverlay"]; label: string }[] = [
  { value: "none", label: "None" },
  { value: "yellow", label: "Yellow" },
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
  { value: "pink", label: "Pink" },
];

const lineSpacingOptions: { value: AccessibilitySettings["lineSpacing"]; label: string }[] = [
  { value: "normal", label: "Normal" },
  { value: "wide", label: "Wide" },
  { value: "extra-wide", label: "Extra Wide" },
];

const readingSpeedOptions: { value: AccessibilitySettings["readingSpeed"]; label: string }[] = [
  { value: "slow", label: "Slow" },
  { value: "normal", label: "Normal" },
  { value: "fast", label: "Fast" },
];

export function SettingsPanel() {
  const [settings, setSettings] = useState<AccessibilitySettings>(getSettings());
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSettings(getSettings());
  }, []);

  const handleSave = () => {
    saveSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    const defaults: AccessibilitySettings = {
      fontSize: "medium",
      highContrast: false,
      reducedMotion: false,
      colorOverlay: "none",
      lineSpacing: "normal",
      readingSpeed: "normal",
      dyslexiaFont: false,
    };
    setSettings(defaults);
    saveSettings(defaults);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const update = <K extends keyof AccessibilitySettings>(key: K, value: AccessibilitySettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-8">
      {/* Font Size */}
      <fieldset>
        <legend className="text-lg font-semibold text-slate-800 mb-3">Font Size</legend>
        <div className="flex flex-wrap gap-3">
          {fontSizeOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => update("fontSize", opt.value)}
              className={`px-5 py-3 rounded-xl border-2 font-medium transition-all min-h-[44px] ${
                settings.fontSize === opt.value
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-slate-600 border-slate-300 hover:border-blue-400"
              }`}
              aria-pressed={settings.fontSize === opt.value}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Color Overlay */}
      <fieldset>
        <legend className="text-lg font-semibold text-slate-800 mb-3">Color Overlay</legend>
        <div className="flex flex-wrap gap-3">
          {colorOverlayOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => update("colorOverlay", opt.value)}
              className={`px-5 py-3 rounded-xl border-2 font-medium transition-all min-h-[44px] ${
                settings.colorOverlay === opt.value
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-slate-600 border-slate-300 hover:border-blue-400"
              }`}
              aria-pressed={settings.colorOverlay === opt.value}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Line Spacing */}
      <fieldset>
        <legend className="text-lg font-semibold text-slate-800 mb-3">Line Spacing</legend>
        <div className="flex flex-wrap gap-3">
          {lineSpacingOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => update("lineSpacing", opt.value)}
              className={`px-5 py-3 rounded-xl border-2 font-medium transition-all min-h-[44px] ${
                settings.lineSpacing === opt.value
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-slate-600 border-slate-300 hover:border-blue-400"
              }`}
              aria-pressed={settings.lineSpacing === opt.value}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Reading Speed (TTS) */}
      <fieldset>
        <legend className="text-lg font-semibold text-slate-800 mb-3">Reading Speed (Text-to-Speech)</legend>
        <div className="flex flex-wrap gap-3">
          {readingSpeedOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => update("readingSpeed", opt.value)}
              className={`px-5 py-3 rounded-xl border-2 font-medium transition-all min-h-[44px] ${
                settings.readingSpeed === opt.value
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-slate-600 border-slate-300 hover:border-blue-400"
              }`}
              aria-pressed={settings.readingSpeed === opt.value}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Toggles */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-800">Accessibility Options</h3>

        <label className="flex items-center gap-3 cursor-pointer p-4 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 min-h-[44px]">
          <input
            type="checkbox"
            checked={settings.highContrast}
            onChange={(e) => update("highContrast", e.target.checked)}
            className="w-5 h-5 rounded accent-blue-600"
          />
          <div>
            <span className="text-sm font-medium text-slate-700">High Contrast Mode</span>
            <p className="text-xs text-slate-500">Increase contrast for better visibility</p>
          </div>
        </label>

        <label className="flex items-center gap-3 cursor-pointer p-4 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 min-h-[44px]">
          <input
            type="checkbox"
            checked={settings.reducedMotion}
            onChange={(e) => update("reducedMotion", e.target.checked)}
            className="w-5 h-5 rounded accent-blue-600"
          />
          <div>
            <span className="text-sm font-medium text-slate-700">Reduced Motion</span>
            <p className="text-xs text-slate-500">Minimize animations and transitions</p>
          </div>
        </label>

        <label className="flex items-center gap-3 cursor-pointer p-4 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 min-h-[44px]">
          <input
            type="checkbox"
            checked={settings.dyslexiaFont}
            onChange={(e) => update("dyslexiaFont", e.target.checked)}
            className="w-5 h-5 rounded accent-blue-600"
          />
          <div>
            <span className="text-sm font-medium text-slate-700">Dyslexia-Friendly Font</span>
            <p className="text-xs text-slate-500">Use OpenDyslexic font throughout the app</p>
          </div>
        </label>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <button
          onClick={handleSave}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors min-h-[44px] font-medium flex-1"
        >
          <Save size={18} />
          {saved ? "Saved!" : "Save Settings"}
        </button>
        <button
          onClick={handleReset}
          className="flex items-center justify-center gap-2 px-6 py-3 border border-slate-300 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors min-h-[44px] font-medium"
        >
          <RotateCcw size={18} />
          Reset to Defaults
        </button>
      </div>
    </div>
  );
}
