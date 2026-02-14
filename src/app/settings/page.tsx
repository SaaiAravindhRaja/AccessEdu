import { SettingsPanel } from "@/components/SettingsPanel";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-slate-100 rounded-xl">
            <Settings size={24} className="text-slate-600" aria-hidden="true" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
            Accessibility Settings
          </h1>
        </div>
        <p className="text-slate-600 max-w-2xl">
          Customize your accessibility preferences. These settings are saved locally
          and will persist between sessions.
        </p>
      </div>
      <SettingsPanel />
    </div>
  );
}
