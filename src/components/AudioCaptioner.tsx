"use client";

import { useState, useRef, useCallback } from "react";
import { Mic, MicOff, Loader2, Sparkles, AlertCircle, Trash2 } from "lucide-react";
import { createSpeechRecognition, isSpeechRecognitionSupported } from "@/lib/speech";
import { summarizeLecture } from "@/lib/ai";
import { TextToSpeech } from "./TextToSpeech";

export function AudioCaptioner() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimText, setInterimText] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [demoMode, setDemoMode] = useState(true);
  const recognitionRef = useRef<ReturnType<typeof createSpeechRecognition>>(null);

  const supported = isSpeechRecognitionSupported();

  const startRecording = useCallback(() => {
    setError("");
    const recognition = createSpeechRecognition(
      (result) => {
        if (result.isFinal) {
          setTranscript((prev) => prev + (prev ? " " : "") + result.transcript);
          setInterimText("");
        } else {
          setInterimText(result.transcript);
        }
      },
      (err) => {
        setError(`Speech recognition error: ${err}`);
        setIsRecording(false);
      }
    );

    if (recognition) {
      recognitionRef.current = recognition;
      recognition.start();
      setIsRecording(true);
    }
  }, []);

  const stopRecording = useCallback(() => {
    recognitionRef.current?.stop();
    setIsRecording(false);
    setInterimText("");
  }, []);

  const handleSummarize = async () => {
    const textToSummarize = transcript || "Sample lecture transcript about machine learning...";
    setIsLoading(true);
    setError("");

    try {
      const result = await summarizeLecture(textToSummarize, demoMode ? undefined : apiKey);
      setSummary(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to summarize");
    } finally {
      setIsLoading(false);
    }
  };

  const renderMarkdown = (text: string) => {
    return text
      .split("\n")
      .map((line) => {
        if (line.startsWith("## ")) return `<h2>${line.slice(3)}</h2>`;
        if (line.startsWith("**") && line.endsWith("**")) return `<p><strong>${line.slice(2, -2)}</strong></p>`;
        if (line.startsWith("- ")) return `<li>${line.slice(2)}</li>`;
        if (line.match(/^\d+\./)) return `<li>${line.replace(/^\d+\.\s*/, "")}</li>`;
        if (line.trim() === "") return "<br/>";
        return `<p>${line}</p>`;
      })
      .join("");
  };

  return (
    <div className="space-y-6">
      {/* Mode toggle */}
      <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-xl">
        <label className="flex items-center gap-2 cursor-pointer min-h-[44px]">
          <input
            type="checkbox"
            checked={demoMode}
            onChange={(e) => setDemoMode(e.target.checked)}
            className="w-5 h-5 rounded accent-purple-600"
          />
          <span className="text-sm font-medium text-slate-700">Demo Mode</span>
        </label>
        <span className="text-xs text-slate-500">
          {demoMode ? "Using sample summaries" : "Using OpenAI API"}
        </span>
      </div>

      {!demoMode && (
        <div>
          <label htmlFor="api-key-caption" className="block text-sm font-medium text-slate-700 mb-1">
            OpenAI API Key
          </label>
          <input
            id="api-key-caption"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-..."
            className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 min-h-[44px]"
          />
        </div>
      )}

      {!supported && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl" role="alert">
          <p className="text-sm text-amber-800">
            Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari for live recording. You can still use the demo mode.
          </p>
        </div>
      )}

      {/* Recording controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          disabled={!supported}
          className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors min-h-[44px] flex-1 ${
            isRecording
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50"
          }`}
          aria-label={isRecording ? "Stop recording" : "Start recording"}
        >
          {isRecording ? (
            <>
              <MicOff size={20} />
              Stop Recording
            </>
          ) : (
            <>
              <Mic size={20} />
              Start Recording
            </>
          )}
        </button>

        {transcript && (
          <button
            onClick={() => {
              setTranscript("");
              setSummary("");
            }}
            className="flex items-center justify-center gap-2 px-4 py-3 border border-slate-300 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors min-h-[44px]"
            aria-label="Clear transcript"
          >
            <Trash2 size={18} />
            Clear
          </button>
        )}
      </div>

      {isRecording && (
        <div className="flex items-center gap-3 p-3 bg-red-50 rounded-xl animate-pulse-slow" role="status">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <span className="text-sm text-red-700 font-medium">Recording... Speak into your microphone</span>
        </div>
      )}

      {/* Transcript */}
      <div>
        <label htmlFor="transcript" className="block text-sm font-medium text-slate-700 mb-2">
          Transcript
        </label>
        <textarea
          id="transcript"
          value={transcript + (interimText ? ` ${interimText}` : "")}
          onChange={(e) => setTranscript(e.target.value)}
          placeholder="Your lecture transcript will appear here as you speak, or paste text manually..."
          rows={6}
          className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-y"
          aria-label="Lecture transcript"
        />
      </div>

      {/* Summarize button */}
      <button
        onClick={handleSummarize}
        disabled={isLoading || (!transcript && !demoMode)}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-h-[44px] font-medium"
      >
        {isLoading ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            Generating summary...
          </>
        ) : (
          <>
            <Sparkles size={20} />
            {demoMode ? "Generate Demo Summary" : "Summarize Lecture"}
          </>
        )}
      </button>

      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 text-red-700 rounded-xl" role="alert">
          <AlertCircle size={20} />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {summary && (
        <div className="animate-fade-in space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-800">Lecture Summary</h3>
            <TextToSpeech text={summary} label="Read summary" />
          </div>
          <div
            className="p-6 bg-white border border-slate-200 rounded-2xl markdown-content"
            role="region"
            aria-label="Generated lecture summary"
            aria-live="polite"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(summary) }}
          />
        </div>
      )}
    </div>
  );
}
