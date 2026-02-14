"use client";

import { useState } from "react";
import { TextToSpeech } from "./TextToSpeech";

const SAMPLE_TEXT = `Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods with carbon dioxide and water. Photosynthesis in plants generally involves the green pigment chlorophyll and generates oxygen as a byproduct.

The process of photosynthesis is commonly written as: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂. This means that the reactants, six carbon dioxide molecules and six water molecules, are converted by light energy captured by chlorophyll into a sugar molecule and six oxygen molecules, the products.

The stages of photosynthesis include the light-dependent reactions, which take place in the thylakoid membrane, and the Calvin cycle, which takes place in the stroma of the chloroplast. During the light-dependent reactions, light energy is converted to chemical energy in the form of ATP and NADPH. During the Calvin cycle, atmospheric CO₂ is incorporated into existing organic carbon compounds.`;

const overlayOptions = [
  { value: "none", label: "No Overlay", className: "" },
  { value: "yellow", label: "Yellow", className: "overlay-yellow" },
  { value: "blue", label: "Blue", className: "overlay-blue" },
  { value: "green", label: "Green", className: "overlay-green" },
  { value: "pink", label: "Pink", className: "overlay-pink" },
];

const fontSizes = [
  { value: "text-base", label: "Normal" },
  { value: "text-lg", label: "Large" },
  { value: "text-xl", label: "X-Large" },
  { value: "text-2xl", label: "XX-Large" },
];

const lineSpacings = [
  { value: "leading-relaxed", label: "Relaxed" },
  { value: "leading-loose", label: "Loose" },
  { value: "leading-[2.5]", label: "Extra Loose" },
];

export function DyslexiaReader() {
  const [text, setText] = useState(SAMPLE_TEXT);
  const [overlay, setOverlay] = useState("yellow");
  const [fontSize, setFontSize] = useState("text-lg");
  const [lineSpacing, setLineSpacing] = useState("leading-loose");
  const [letterSpacing, setLetterSpacing] = useState(true);
  const [useDyslexicFont, setUseDyslexicFont] = useState(true);

  const overlayClass = overlayOptions.find((o) => o.value === overlay)?.className || "";

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-7 rounded-3xl border-2" style={{ background: '#FEF3C7', borderColor: '#FDE68A' }}>
        {/* Color overlay */}
        <fieldset>
          <legend className="font-semibold mb-3" style={{ color: '#0f172a', fontSize: '1rem' }}>Color Overlay</legend>
          <div className="flex flex-wrap gap-3">
            {overlayOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setOverlay(opt.value)}
                className="px-4 py-3 font-semibold rounded-xl border-2 transition-all"
                style={{
                  background: overlay === opt.value ? '#b45309' : 'white',
                  color: overlay === opt.value ? 'white' : '#475569',
                  borderColor: overlay === opt.value ? '#b45309' : '#cbd5e1',
                  minHeight: '52px',
                  fontSize: '0.95rem',
                }}
                aria-pressed={overlay === opt.value}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </fieldset>

        {/* Font size */}
        <fieldset>
          <legend className="font-semibold mb-3" style={{ color: '#0f172a', fontSize: '1rem' }}>Font Size</legend>
          <div className="flex flex-wrap gap-3">
            {fontSizes.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setFontSize(opt.value)}
                className="px-4 py-3 font-semibold rounded-xl border-2 transition-all"
                style={{
                  background: fontSize === opt.value ? '#b45309' : 'white',
                  color: fontSize === opt.value ? 'white' : '#475569',
                  borderColor: fontSize === opt.value ? '#b45309' : '#cbd5e1',
                  minHeight: '52px',
                  fontSize: '0.95rem',
                }}
                aria-pressed={fontSize === opt.value}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </fieldset>

        {/* Line spacing */}
        <fieldset>
          <legend className="font-semibold mb-3" style={{ color: '#0f172a', fontSize: '1rem' }}>Line Spacing</legend>
          <div className="flex flex-wrap gap-3">
            {lineSpacings.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setLineSpacing(opt.value)}
                className="px-4 py-3 font-semibold rounded-xl border-2 transition-all"
                style={{
                  background: lineSpacing === opt.value ? '#b45309' : 'white',
                  color: lineSpacing === opt.value ? 'white' : '#475569',
                  borderColor: lineSpacing === opt.value ? '#b45309' : '#cbd5e1',
                  minHeight: '52px',
                  fontSize: '0.95rem',
                }}
                aria-pressed={lineSpacing === opt.value}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </fieldset>

        {/* Toggles */}
        <label className="flex items-center gap-4 cursor-pointer" style={{ minHeight: '52px' }}>
          <input
            type="checkbox"
            checked={useDyslexicFont}
            onChange={(e) => setUseDyslexicFont(e.target.checked)}
            className="w-6 h-6 rounded"
            style={{ accentColor: '#b45309' }}
          />
          <span className="font-semibold" style={{ color: '#0f172a', fontSize: '1rem' }}>OpenDyslexic Font</span>
        </label>

        <label className="flex items-center gap-4 cursor-pointer" style={{ minHeight: '52px' }}>
          <input
            type="checkbox"
            checked={letterSpacing}
            onChange={(e) => setLetterSpacing(e.target.checked)}
            className="w-6 h-6 rounded"
            style={{ accentColor: '#b45309' }}
          />
          <span className="font-semibold" style={{ color: '#0f172a', fontSize: '1rem' }}>Extra Letter Spacing</span>
        </label>
      </div>

      {/* Text input */}
      <div>
        <label htmlFor="dyslexia-input" className="block font-semibold mb-3" style={{ color: '#0f172a', fontSize: '1rem' }}>
          Paste your text here
        </label>
        <textarea
          id="dyslexia-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          className="w-full px-5 py-4 border-2 rounded-2xl resize-y"
          style={{
            borderColor: '#cbd5e1',
            fontSize: '1rem',
          }}
          placeholder="Paste educational text here..."
        />
      </div>

      {/* TTS */}
      {text && <TextToSpeech text={text} label="Read text aloud" />}

      {/* Formatted output */}
      {text && (
        <div
          className={`p-10 rounded-3xl border-2 ${overlayClass} ${fontSize} ${lineSpacing} ${
            useDyslexicFont ? "font-dyslexic" : ""
          } ${letterSpacing ? "tracking-wide" : ""}`}
          style={{ borderColor: '#cbd5e1' }}
          role="region"
          aria-label="Dyslexia-friendly formatted text"
        >
          {text.split("\n\n").map((paragraph, i) => (
            <p key={i} className="mb-6" style={{ color: '#0f172a' }}>
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
