import { ADHDSummarizer } from "@/components/ADHDSummarizer";
import { Brain } from "lucide-react";

export default function ADHDPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-amber-100 rounded-xl">
            <Brain size={24} className="text-amber-600" aria-hidden="true" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
            ADHD Mode
          </h1>
        </div>
        <p className="text-slate-600 max-w-2xl">
          Paste long educational text and get AI-generated bite-sized summaries with
          key points highlighted, structured sections, and reading progress tracking.
        </p>
      </div>
      <ADHDSummarizer />
    </div>
  );
}
