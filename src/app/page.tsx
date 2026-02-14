import { AccessibilityPack } from "@/components/AccessibilityPack";
import { ModeSelector } from "@/components/ModeSelector";
import { CheckCircle2, Settings, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div style={{ background: '#FAFAF9' }}>
      {/* Hero */}
      <section className="relative overflow-hidden text-slate-900 mesh-bg noise-overlay" style={{ background: 'linear-gradient(135deg, rgba(191,219,254,0.95) 0%, rgba(209,250,229,0.95) 50%, rgba(254,243,199,0.95) 100%)' }}>
        <div className="absolute inset-0 opacity-20" aria-hidden="true">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl animate-drift" style={{ background: '#93C5FD' }} />
          <div className="absolute bottom-10 right-20 w-96 h-96 rounded-full blur-3xl animate-drift" style={{ background: '#A7F3D0', animationDelay: '1.6s' }} />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-24 sm:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold mb-8 glass glow-border">
              <Sparkles size={20} aria-hidden="true" />
              <span className="text-base">Access Pack Studio</span>
            </div>
            <h1 className="font-bold tracking-tight leading-tight" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#0f172a' }}>
              Turn any class material
              <br />
              <span style={{ color: '#1d4ed8' }}>into an accessible study pack</span>
            </h1>
            <p className="mt-8 leading-relaxed max-w-2xl" style={{ fontSize: '1.25rem', color: '#334155' }}>
              One input delivers screen-reader alt text, live caption summaries,
              dyslexia-friendly reading, and ADHD focus notes in seconds.
            </p>
            <div className="mt-10 flex flex-wrap gap-5">
              <a
                href="#studio"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 font-bold rounded-2xl min-h-[56px] text-lg btn-primary cta-ring hover-lift pressable cta-pulse"
              >
                Build an Access Pack
              </a>
              <a
                href="#modes"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 font-semibold rounded-2xl min-h-[56px] text-lg btn-secondary hover-lift pressable"
              >
                Explore Modes
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Access Pack studio */}
      <section id="studio" className="py-20 border-b" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)', borderColor: '#e5e7eb' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: '#1d4ed8' }}>
                Demo: instant multi-format pack
              </p>
              <h2 className="text-4xl font-bold mt-3" style={{ color: '#0f172a' }}>
                Access Pack Studio
              </h2>
              <p className="mt-4 text-lg" style={{ color: '#475569' }}>
                Generate a complete accessibility bundle from a single lesson. Then use the full tools below for
                live AI and custom workflows.
              </p>
            </div>
            <div className="rounded-2xl px-5 py-4 border-2 glass">
              <p className="text-sm font-semibold" style={{ color: '#1d4ed8' }}>Coverage</p>
              <p className="text-2xl font-bold" style={{ color: '#0f172a' }}>4 / 4 modes</p>
            </div>
          </div>
          <AccessibilityPack />
        </div>
      </section>

      {/* Impact stats */}
      <section id="impact" className="py-20 border-b" style={{ background: 'white', borderColor: '#e5e7eb' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
            <div className="space-y-3 p-6 rounded-3xl card-premium hover-lift">
              <div className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: '#BFDBFE' }}>
                <Sparkles size={32} style={{ color: '#1e40af' }} aria-hidden="true" />
              </div>
              <p className="text-4xl font-bold" style={{ color: '#0f172a' }}>4-in-1</p>
              <p style={{ color: '#64748b', fontSize: '1rem' }}>Vision, hearing, dyslexia, ADHD outputs in a single flow</p>
            </div>
            <div className="space-y-3 p-6 rounded-3xl card-premium hover-lift">
              <div className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: '#D1FAE5' }}>
                <Settings size={32} style={{ color: '#047857' }} aria-hidden="true" />
              </div>
              <p className="text-4xl font-bold" style={{ color: '#0f172a' }}>Personalized</p>
              <p style={{ color: '#64748b', fontSize: '1rem' }}>Settings apply across every mode and persist locally</p>
            </div>
            <div className="space-y-3 p-6 rounded-3xl card-premium hover-lift">
              <div className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: '#FEF3C7' }}>
                <CheckCircle2 size={32} style={{ color: '#b45309' }} aria-hidden="true" />
              </div>
              <p className="text-4xl font-bold" style={{ color: '#0f172a' }}>Accessible</p>
              <p style={{ color: '#64748b', fontSize: '1rem' }}>Keyboard-first, screen-reader labels, and large targets</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mode selector */}
      <section id="modes" className="py-20 sm:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#0f172a' }}>Choose Your Mode</h2>
            <p className="max-w-2xl mx-auto" style={{ color: '#475569', fontSize: '1.125rem', lineHeight: '1.75' }}>
              Select the accessibility tool that best fits your learning needs. Each mode is
              designed with specific disabilities in mind.
            </p>
          </div>
          <ModeSelector />
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 border-t" style={{ background: 'white', borderColor: '#e5e7eb' }}>
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16" style={{ color: '#0f172a' }}>How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center space-y-4 p-6 rounded-3xl card-premium hover-lift">
              <div className="mx-auto w-20 h-20 rounded-3xl flex items-center justify-center text-3xl font-bold" style={{ background: '#BFDBFE', color: '#1e40af' }}>
                1
              </div>
              <h3 className="font-bold text-xl" style={{ color: '#0f172a' }}>Paste a Lesson</h3>
              <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: '1.6' }}>
                Drop in class notes, slides, or a lecture transcript
              </p>
            </div>
            <div className="text-center space-y-4 p-6 rounded-3xl card-premium hover-lift">
              <div className="mx-auto w-20 h-20 rounded-3xl flex items-center justify-center text-3xl font-bold" style={{ background: '#D1FAE5', color: '#047857' }}>
                2
              </div>
              <h3 className="font-bold text-xl" style={{ color: '#0f172a' }}>Generate the Pack</h3>
              <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: '1.6' }}>
                AccessEdu creates four accessibility formats at once
              </p>
            </div>
            <div className="text-center space-y-4 p-6 rounded-3xl card-premium hover-lift">
              <div className="mx-auto w-20 h-20 rounded-3xl flex items-center justify-center text-3xl font-bold" style={{ background: '#FEF3C7', color: '#b45309' }}>
                3
              </div>
              <h3 className="font-bold text-xl" style={{ color: '#0f172a' }}>Study in Your Mode</h3>
              <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: '1.6' }}>
                Use each tool separately or keep the full pack together
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center" style={{ background: '#1e293b', color: '#94a3b8' }}>
        <div className="max-w-6xl mx-auto px-6">
          <p style={{ fontSize: '1rem' }}>
            AccessEdu &mdash; Making education accessible for every student.
          </p>
          <p className="mt-3" style={{ color: '#64748b', fontSize: '0.95rem' }}>
            Built for The Merge 2026 Hackathon. All features include demo mode.
          </p>
        </div>
      </footer>
    </div>
  );
}
