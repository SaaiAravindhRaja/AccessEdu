import { ImageDescriber } from "@/components/ImageDescriber";
import { Eye } from "lucide-react";

export default function VisionPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-blue-100 rounded-xl">
            <Eye size={24} className="text-blue-600" aria-hidden="true" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
            Vision Aid
          </h1>
        </div>
        <p className="text-slate-600 max-w-2xl">
          Upload educational images, diagrams, or charts and get detailed AI-generated
          descriptions optimized for screen readers and visually impaired students.
        </p>
      </div>
      <ImageDescriber />
    </div>
  );
}
