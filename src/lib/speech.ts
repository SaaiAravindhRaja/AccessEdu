"use client";

export interface SpeechRecognitionResult {
  transcript: string;
  isFinal: boolean;
}

type SpeechCallback = (result: SpeechRecognitionResult) => void;

export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === "undefined") return false;
  return !!(
    (window as unknown as Record<string, unknown>).SpeechRecognition ||
    (window as unknown as Record<string, unknown>).webkitSpeechRecognition
  );
}

export function createSpeechRecognition(
  onResult: SpeechCallback,
  onError: (error: string) => void
): { start: () => void; stop: () => void } | null {
  if (!isSpeechRecognitionSupported()) return null;

  const SpeechRecognition =
    (window as unknown as Record<string, unknown>).SpeechRecognition ||
    (window as unknown as Record<string, unknown>).webkitSpeechRecognition;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognition = new (SpeechRecognition as any)();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "en-US";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  recognition.onresult = (event: any) => {
    for (let i = event.resultIndex; i < event.results.length; i++) {
      onResult({
        transcript: event.results[i][0].transcript,
        isFinal: event.results[i].isFinal,
      });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  recognition.onerror = (event: any) => {
    onError(event.error);
  };

  return {
    start: () => recognition.start(),
    stop: () => recognition.stop(),
  };
}

export function speak(text: string, rate: number = 1): SpeechSynthesisUtterance | null {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = rate;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
  return utterance;
}

export function stopSpeaking(): void {
  if (typeof window !== "undefined" && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}
