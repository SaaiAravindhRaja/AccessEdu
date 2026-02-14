"use client";

import { useState } from "react";
import { Volume2, VolumeX, Pause, Play } from "lucide-react";
import { speak, stopSpeaking } from "@/lib/speech";
import { getSettings } from "@/lib/storage";

interface TextToSpeechProps {
  text: string;
  label?: string;
}

export function TextToSpeech({ text, label = "Read aloud" }: TextToSpeechProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const handlePlay = () => {
    if (isPaused && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    const plainText = text
      .replace(/#{1,6}\s/g, "")
      .replace(/\*\*/g, "")
      .replace(/\|/g, " ")
      .replace(/-{2,}/g, "")
      .replace(/\n{2,}/g, ". ");

    const settings = getSettings();
    const rateMap: Record<string, number> = { slow: 0.85, normal: 1, fast: 1.2 };
    const utterance = speak(plainText, rateMap[settings.readingSpeed] ?? 1);
    if (utterance) {
      setIsPlaying(true);
      utterance.onend = () => {
        setIsPlaying(false);
        setIsPaused(false);
      };
    }
  };

  const handlePause = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  };

  const handleStop = () => {
    stopSpeaking();
    setIsPlaying(false);
    setIsPaused(false);
  };

  return (
    <div className="flex items-center gap-2" role="group" aria-label="Text to speech controls">
      {!isPlaying ? (
        <button
          onClick={handlePlay}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors min-h-[44px] text-sm font-medium hover-lift pressable shadow-[0_12px_24px_-18px_rgba(5,150,105,0.7)]"
          aria-label={isPaused ? "Resume reading" : label}
        >
          {isPaused ? <Play size={18} /> : <Volume2 size={18} />}
          {isPaused ? "Resume" : label}
        </button>
      ) : (
        <button
          onClick={handlePause}
          className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors min-h-[44px] text-sm font-medium hover-lift pressable shadow-[0_12px_24px_-18px_rgba(217,119,6,0.7)]"
          aria-label="Pause reading"
        >
          <Pause size={18} />
          Pause
        </button>
      )}
      {(isPlaying || isPaused) && (
        <button
          onClick={handleStop}
          className="flex items-center gap-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors min-h-[44px] text-sm font-medium hover-lift pressable shadow-[0_12px_24px_-18px_rgba(220,38,38,0.7)]"
          aria-label="Stop reading"
        >
          <VolumeX size={18} />
          Stop
        </button>
      )}
    </div>
  );
}
