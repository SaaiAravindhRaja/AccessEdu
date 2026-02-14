"use client";

import { useState } from "react";
import { Wand2, Eye, Mic, BookOpen, Brain, Loader2, AlertCircle } from "lucide-react";
import { describeImage, summarizeForADHD, summarizeLecture } from "@/lib/ai";
import { TextToSpeech } from "./TextToSpeech";

const SAMPLE_LESSON = `Cell division is the process by which a parent cell splits into two daughter cells. In mitosis, the cell duplicates its DNA and divides so each new cell has an identical copy of genetic material. This is essential for growth, repair, and replacing worn-out cells.

Mitosis has several stages: prophase (DNA condenses), metaphase (chromosomes align), anaphase (chromosomes separate), and telophase (new nuclei form). After mitosis, cytokinesis splits the cell into two.

Meiosis is a different type of division that produces four genetically unique cells for reproduction. It reduces the chromosome number by half so that when fertilization occurs, the normal number is restored.`;

type PackResult = {
  altText: string;
  captionSummary: string;
  adhdSummary: string;
};

const emptyPack: PackResult = {
  altText: "",
  captionSummary: "",
  adhdSummary: "",
};

function renderMarkdown(text: string) {
  return text
    .split("\n")
    .map((line) => {
      if (line.startsWith("## ")) return `<h3>${line.slice(3)}</h3>`;
      if (line.startsWith("**") && line.endsWith("**")) return `<p><strong>${line.slice(2, -2)}</strong></p>`;
      if (line.startsWith("- ")) return `<li>${line.slice(2)}</li>`;
      if (line.match(/^\d+\./)) return `<li>${line.replace(/^\d+\.\s*/, "")}</li>`;
      if (line.trim() === "") return "";
      return `<p>${line}</p>`;
    })
    .join("");
}

export function AccessibilityPack() {
  const [text, setText] = useState(SAMPLE_LESSON);
  const [pack, setPack] = useState<PackResult>(emptyPack);
  const [generated, setGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setIsLoading(true);
    setError("");

    try {
      const [altText, captionSummary, adhdSummary] = await Promise.all([
        describeImage(""),
        summarizeLecture(text),
        summarizeForADHD(text),
      ]);
      setPack({ altText, captionSummary, adhdSummary });
      setGenerated(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate access pack");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10">
      <div className="space-y-6">
        <div className="p-6 rounded-3xl border-2 glass-strong glow-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: "#1d4ed8" }}>
              <Wand2 size={20} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: "#1d4ed8" }}>Access Pack Studio</p>
              <h3 className="text-2xl font-bold" style={{ color: "#0f172a" }}>One input. Four accessible formats.</h3>
            </div>
          </div>
          <p className="text-sm" style={{ color: "#475569" }}>
            Paste a lesson and generate a multi-format study pack for vision, hearing, dyslexia, and ADHD.
          </p>
        </div>

        <div>
          <label htmlFor="pack-input" className="block font-semibold mb-3" style={{ color: "#0f172a" }}>
            Lesson text
          </label>
          <textarea
            id="pack-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={8}
            className="w-full px-5 py-4 border-2 rounded-2xl resize-y input-glass"
            style={{ borderColor: "#cbd5e1", fontSize: "1rem" }}
          />
          <p className="mt-2 text-sm" style={{ color: "#64748b" }}>{text.length} characters</p>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 px-8 py-5 rounded-2xl disabled:opacity-60 disabled:cursor-not-allowed transition-all font-bold min-h-[60px] text-lg btn-primary cta-ring hover-lift pressable"
        >
          {isLoading ? (
            <>
              <Loader2 size={22} className="animate-spin" />
              Building your access pack...
            </>
          ) : (
            <>
              <Wand2 size={22} />
              Generate Access Pack
            </>
          )}
        </button>

        {error && (
          <div className="flex items-center gap-2 p-4 rounded-xl" style={{ background: "#fee2e2", color: "#991b1b" }} role="alert">
            <AlertCircle size={20} />
            <p className="text-sm">{error}</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          className={`p-6 rounded-3xl border-2 card-premium hover-lift pressable ${generated ? "animate-float-in" : ""}`}
          style={{ borderColor: "#c7d2fe", animationDelay: "0ms" }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#e0e7ff" }}>
                <Eye size={18} className="text-indigo-700" />
              </div>
              <div>
                <p className="text-xs font-semibold" style={{ color: "#4338ca" }}>Vision</p>
                <h4 className="font-bold" style={{ color: "#0f172a" }}>Screen-reader Alt Text</h4>
              </div>
            </div>
            {generated && <TextToSpeech text={pack.altText} label="Read" />}
          </div>
          <div
            className="text-sm markdown-content"
            style={{ color: "#475569" }}
            dangerouslySetInnerHTML={{
              __html: generated
                ? renderMarkdown(pack.altText)
                : "<p>Generate a structured description of diagrams, charts, and figures.</p>",
            }}
          />
        </div>

        <div
          className={`p-6 rounded-3xl border-2 card-premium hover-lift pressable ${generated ? "animate-float-in" : ""}`}
          style={{ borderColor: "#bbf7d0", animationDelay: "80ms" }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#dcfce7" }}>
                <Mic size={18} className="text-emerald-700" />
              </div>
              <div>
                <p className="text-xs font-semibold" style={{ color: "#047857" }}>Hearing</p>
                <h4 className="font-bold" style={{ color: "#0f172a" }}>Lecture Snapshot</h4>
              </div>
            </div>
            {generated && <TextToSpeech text={pack.captionSummary} label="Read" />}
          </div>
          <div
            className="text-sm markdown-content"
            style={{ color: "#475569" }}
            dangerouslySetInnerHTML={{
              __html: generated
                ? renderMarkdown(pack.captionSummary)
                : "<p>Capture key points, action items, and takeaways in real time.</p>",
            }}
          />
        </div>

        <div
          className={`p-6 rounded-3xl border-2 card-premium hover-lift pressable ${generated ? "animate-float-in" : ""}`}
          style={{ borderColor: "#fde68a", animationDelay: "160ms" }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#fef3c7" }}>
                <BookOpen size={18} className="text-amber-700" />
              </div>
              <div>
                <p className="text-xs font-semibold" style={{ color: "#b45309" }}>Dyslexia</p>
                <h4 className="font-bold" style={{ color: "#0f172a" }}>Readable Flow</h4>
              </div>
            </div>
          </div>
          <p className="text-sm font-dyslexic" style={{ color: "#475569", lineHeight: "1.8" }}>
            {generated ? text.slice(0, 260) + (text.length > 260 ? "..." : "") : "Preview a calmer, spaced-out reading view with dyslexia-friendly styling."}
          </p>
        </div>

        <div
          className={`p-6 rounded-3xl border-2 card-premium hover-lift pressable ${generated ? "animate-float-in" : ""}`}
          style={{ borderColor: "#bfdbfe", animationDelay: "240ms" }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#dbeafe" }}>
                <Brain size={18} className="text-blue-700" />
              </div>
              <div>
                <p className="text-xs font-semibold" style={{ color: "#1d4ed8" }}>ADHD</p>
                <h4 className="font-bold" style={{ color: "#0f172a" }}>Focus Notes</h4>
              </div>
            </div>
            {generated && <TextToSpeech text={pack.adhdSummary} label="Read" />}
          </div>
          <div
            className="text-sm markdown-content"
            style={{ color: "#475569" }}
            dangerouslySetInnerHTML={{
              __html: generated
                ? renderMarkdown(pack.adhdSummary)
                : "<p>Chunk long lessons into short, attention-friendly bullets.</p>",
            }}
          />
        </div>
      </div>
    </div>
  );
}
