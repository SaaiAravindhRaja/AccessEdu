import { DyslexiaReader } from "@/components/DyslexiaReader";
import { BookOpen } from "lucide-react";

export default function DyslexiaPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-emerald-100 rounded-xl">
            <BookOpen size={24} className="text-emerald-600" aria-hidden="true" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
            Dyslexia Mode
          </h1>
        </div>
        <p className="text-slate-600 max-w-2xl">
          Paste any educational text and read it with the OpenDyslexic font, adjustable
          spacing, color overlays, and text-to-speech support.
        </p>
      </div>
      <DyslexiaReader />
    </div>
  );
}
