"use client";

import { useState, useRef } from "react";
import { Upload, ImageIcon, Loader2, Sparkles, AlertCircle } from "lucide-react";
import { describeImage } from "@/lib/ai";
import { TextToSpeech } from "./TextToSpeech";

export function ImageDescriber() {
  const [image, setImage] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [apiKey, setApiKey] = useState<string>("");
  const [demoMode, setDemoMode] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file.");
      return;
    }

    setError("");
    setDescription("");

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setImagePreview(result);
      setImage(result.split(",")[1]);
    };
    reader.readAsDataURL(file);
  };

  const handleDescribe = async () => {
    if (!image && !demoMode) return;
    setIsLoading(true);
    setError("");

    try {
      const result = await describeImage(image || "", demoMode ? undefined : apiKey);
      setDescription(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to describe image");
    } finally {
      setIsLoading(false);
    }
  };

  const renderMarkdown = (text: string) => {
    return text
      .split("\n")
      .map((line, i) => {
        if (line.startsWith("**") && line.endsWith("**")) {
          return `<p key="${i}"><strong>${line.slice(2, -2)}</strong></p>`;
        }
        if (line.startsWith("- ")) {
          return `<li>${line.slice(2)}</li>`;
        }
        return `<p>${line}</p>`;
      })
      .join("");
  };

  return (
    <div className="space-y-6">
      {/* Mode toggle */}
      <div className="flex items-center gap-4 p-4 rounded-xl glass">
        <label className="flex items-center gap-2 cursor-pointer min-h-[44px]">
          <input
            type="checkbox"
            checked={demoMode}
            onChange={(e) => setDemoMode(e.target.checked)}
            className="w-5 h-5 rounded accent-blue-600"
          />
          <span className="text-sm font-medium text-slate-700">Demo Mode</span>
        </label>
        <span className="text-xs text-slate-500">
          {demoMode ? "Using sample descriptions" : "Using OpenAI API"}
        </span>
      </div>

      {!demoMode && (
        <div>
          <label htmlFor="api-key" className="block text-sm font-medium text-slate-700 mb-1">
            OpenAI API Key
          </label>
          <input
            id="api-key"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-..."
            className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[44px] input-glass"
          />
        </div>
      )}

      {/* Upload area */}
      <div
        className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer hover-lift glass-dashed"
        onClick={() => fileInputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
        role="button"
        tabIndex={0}
        aria-label="Click to upload an educational image"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          aria-label="Upload image file"
        />
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Uploaded educational image"
            className="max-h-64 mx-auto rounded-lg"
          />
        ) : (
          <div className="space-y-3">
            <div className="mx-auto w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center">
              <ImageIcon size={32} className="text-slate-400" />
            </div>
            <div>
              <p className="text-slate-600 font-medium">Drop an educational image here</p>
              <p className="text-sm text-slate-400 mt-1">or click to browse (PNG, JPG, WebP)</p>
            </div>
            <Upload size={20} className="mx-auto text-slate-400" />
          </div>
        )}
      </div>

      {/* Describe button */}
      <button
        onClick={handleDescribe}
        disabled={isLoading || (!image && !demoMode)}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] font-medium btn-primary hover-lift pressable"
        aria-label={demoMode ? "Generate demo description" : "Describe image using AI"}
      >
        {isLoading ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            Analyzing image...
          </>
        ) : (
          <>
            <Sparkles size={20} />
            {demoMode ? "Generate Demo Description" : "Describe Image"}
          </>
        )}
      </button>

      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 text-red-700 rounded-xl" role="alert">
          <AlertCircle size={20} />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {description && (
        <div className="animate-fade-in space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-800">Image Description</h3>
            <TextToSpeech text={description} label="Read description" />
          </div>
          <div
            className="prose prose-slate max-w-none p-6 rounded-2xl markdown-content card-premium glow-border"
            role="region"
            aria-label="Generated image description"
            aria-live="polite"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(description) }}
          />
        </div>
      )}
    </div>
  );
}
