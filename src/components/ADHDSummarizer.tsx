"use client";

import { useState } from "react";
import { Loader2, Sparkles, AlertCircle, CheckCircle2 } from "lucide-react";
import { summarizeForADHD } from "@/lib/ai";
import { TextToSpeech } from "./TextToSpeech";

const SAMPLE_TEXT = `Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize nutrients from carbon dioxide and water. Photosynthesis in plants generally involves the green pigment chlorophyll and generates oxygen as a byproduct. The process takes place primarily in plant leaves, and the energy captured from sunlight is used to convert carbon dioxide and water into glucose.

The light reactions of photosynthesis take place in the thylakoid membranes of the chloroplast. During these reactions, light energy is captured and used to make ATP and NADPH. The Calvin cycle, also known as the light-independent reactions or dark reactions, takes place in the stroma of the chloroplast. During the Calvin cycle, carbon dioxide is fixed into organic molecules, which are then used to build glucose.

Photosynthesis is essential for life on Earth because it produces the oxygen that most organisms need to survive. It also forms the base of almost all food chains on Earth. Without photosynthesis, there would be no food or oxygen for most living organisms. Additionally, photosynthesis plays a crucial role in the carbon cycle by removing carbon dioxide from the atmosphere.`;

export function ADHDSummarizer() {
  const [text, setText] = useState(SAMPLE_TEXT);
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [demoMode, setDemoMode] = useState(true);
  const [progress, setProgress] = useState(0);
  const [sections, setSections] = useState<string[]>([]);
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set());

  const handleSummarize = async () => {
    setIsLoading(true);
    setError("");
    setProgress(0);
    setCompletedSections(new Set());

    try {
      const result = await summarizeForADHD(text, demoMode ? undefined : apiKey);
      setSummary(result);

      const parsedSections = result.split(/(?=## )/).filter((s) => s.trim());
      setSections(parsedSections);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to summarize");
    } finally {
      setIsLoading(false);
    }
  };

  const markSectionRead = (index: number) => {
    const next = new Set(completedSections);
    if (next.has(index)) {
      next.delete(index);
    } else {
      next.add(index);
    }
    setCompletedSections(next);
    setProgress(Math.round((next.size / sections.length) * 100));
  };

  const renderSection = (sectionText: string) => {
    return sectionText
      .split("\n")
      .map((line) => {
        if (line.startsWith("## ")) return `<h2>${line.slice(3)}</h2>`;
        if (line.startsWith("| ")) {
          return `<div class="table-row">${line}</div>`;
        }
        if (line.startsWith("- ")) return `<li>${line.slice(2)}</li>`;
        if (line.match(/^\d+\./)) return `<li>${line.replace(/^\d+\.\s*/, "")}</li>`;
        if (line.trim() === "") return "";
        return `<p>${line}</p>`;
      })
      .join("");
  };

  return (
    <div className="space-y-8">
      {/* Mode toggle */}
      <div className="flex items-center gap-5 p-6 rounded-2xl" style={{ background: '#BFDBFE' }}>
        <label className="flex items-center gap-3 cursor-pointer" style={{ minHeight: '52px' }}>
          <input
            type="checkbox"
            checked={demoMode}
            onChange={(e) => setDemoMode(e.target.checked)}
            className="w-6 h-6 rounded"
            style={{ accentColor: '#1e40af' }}
          />
          <span className="font-semibold" style={{ color: '#0f172a', fontSize: '1rem' }}>Demo Mode</span>
        </label>
        <span style={{ color: '#475569', fontSize: '0.95rem' }}>
          {demoMode ? "Using sample summaries" : "Using OpenAI API"}
        </span>
      </div>

      {!demoMode && (
        <div>
          <label htmlFor="api-key-adhd" className="block font-semibold mb-2" style={{ color: '#0f172a', fontSize: '1rem' }}>
            OpenAI API Key
          </label>
          <input
            id="api-key-adhd"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-..."
            className="w-full px-5 py-4 border-2 rounded-2xl"
            style={{
              borderColor: '#cbd5e1',
              fontSize: '1rem',
              minHeight: '52px',
            }}
          />
        </div>
      )}

      {/* Text input */}
      <div>
        <label htmlFor="adhd-input" className="block font-semibold mb-3" style={{ color: '#0f172a', fontSize: '1rem' }}>
          Paste educational text to summarize
        </label>
        <textarea
          id="adhd-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          className="w-full px-5 py-4 border-2 rounded-2xl resize-y"
          style={{
            borderColor: '#cbd5e1',
            fontSize: '1rem',
          }}
          placeholder="Paste long educational text here..."
        />
        <p className="mt-2" style={{ color: '#64748b', fontSize: '0.9rem' }}>{text.length} characters</p>
      </div>

      {/* Summarize button */}
      <button
        onClick={handleSummarize}
        disabled={isLoading || (!text && !demoMode)}
        className="w-full flex items-center justify-center gap-3 px-8 py-5 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold shadow-sm hover:shadow-md"
        style={{
          background: '#3B82F6',
          color: 'white',
          minHeight: '60px',
          fontSize: '1.125rem',
        }}
      >
        {isLoading ? (
          <>
            <Loader2 size={24} className="animate-spin" />
            Creating summary...
          </>
        ) : (
          <>
            <Sparkles size={24} />
            {demoMode ? "Generate Demo Summary" : "Summarize for ADHD"}
          </>
        )}
      </button>

      {error && (
        <div className="flex items-center gap-3 p-5 rounded-2xl" style={{ background: '#fee2e2', color: '#991b1b' }} role="alert">
          <AlertCircle size={24} />
          <p style={{ fontSize: '1rem' }}>{error}</p>
        </div>
      )}

      {/* Progress tracker */}
      {sections.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-semibold" style={{ color: '#0f172a', fontSize: '1.05rem' }}>Reading Progress</span>
            <span className="font-bold" style={{ color: '#3B82F6', fontSize: '1.25rem' }}>{progress}%</span>
          </div>
          <div className="w-full rounded-full" style={{ background: '#e2e8f0', height: '16px' }} role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
            <div
              className="rounded-full transition-all duration-500"
              style={{
                width: `${progress}%`,
                height: '16px',
                background: 'linear-gradient(90deg, #3B82F6, #60A5FA)',
              }}
            />
          </div>
        </div>
      )}

      {/* Summary sections */}
      {sections.length > 0 && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <h3 className="font-bold" style={{ fontSize: '1.5rem', color: '#0f172a' }}>Summary</h3>
            <TextToSpeech text={summary} label="Read summary" />
          </div>

          {sections.map((section, index) => (
            <div
              key={index}
              className="p-7 rounded-3xl border-3 transition-all cursor-pointer"
              style={{
                background: completedSections.has(index) ? '#D1FAE5' : 'white',
                borderWidth: '3px',
                borderColor: completedSections.has(index) ? '#6EE7B7' : '#cbd5e1',
              }}
              onClick={() => markSectionRead(index)}
              onKeyDown={(e) => e.key === "Enter" && markSectionRead(index)}
              role="button"
              tabIndex={0}
              aria-label={`Section ${index + 1}. ${completedSections.has(index) ? "Marked as read" : "Click to mark as read"}`}
            >
              <div className="flex items-start gap-4">
                <div className="mt-1 flex-shrink-0" style={{ color: completedSections.has(index) ? '#10B981' : '#cbd5e1' }}>
                  <CheckCircle2 size={28} />
                </div>
                <div
                  className="flex-1 markdown-content"
                  style={{ fontSize: '1.05rem' }}
                  dangerouslySetInnerHTML={{ __html: renderSection(section) }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
