import { AudioCaptioner } from "@/components/AudioCaptioner";
import { Mic } from "lucide-react";

export default function CaptionPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-purple-100 rounded-xl">
            <Mic size={24} className="text-purple-600" aria-hidden="true" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
            Lecture Captioner
          </h1>
        </div>
        <p className="text-slate-600 max-w-2xl">
          Record lectures with real-time speech-to-text transcription, then generate
          AI-powered summaries with key topics and action items.
        </p>
      </div>
      <AudioCaptioner />
    </div>
  );
}
