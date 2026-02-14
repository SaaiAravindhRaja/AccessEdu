import { ModeSelector } from "@/components/ModeSelector";
import { Heart, Shield, Sparkles, Users } from "lucide-react";

export default function Home() {
  return (
    <div style={{ background: '#FAFAF9' }}>
      {/* Hero */}
      <section className="relative overflow-hidden text-slate-900" style={{ background: 'linear-gradient(135deg, #BFDBFE 0%, #D1FAE5 50%, #FEF3C7 100%)' }}>
        <div className="absolute inset-0 opacity-20" aria-hidden="true">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl" style={{ background: '#93C5FD' }} />
          <div className="absolute bottom-10 right-20 w-96 h-96 rounded-full blur-3xl" style={{ background: '#A7F3D0' }} />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-24 sm:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold mb-8" style={{ background: 'rgba(96, 165, 250, 0.15)', color: '#1e40af' }}>
              <Sparkles size={20} aria-hidden="true" />
              <span className="text-base">AI-Powered Accessibility</span>
            </div>
            <h1 className="font-bold tracking-tight leading-tight" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#0f172a' }}>
              Education accessible
              <br />
              <span style={{ color: '#3B82F6' }}>for everyone</span>
            </h1>
            <p className="mt-8 leading-relaxed max-w-2xl" style={{ fontSize: '1.25rem', color: '#334155' }}>
              AccessEdu uses AI to make educational content accessible to students with
              visual impairments, hearing impairments, dyslexia, and ADHD.
            </p>
            <div className="mt-10 flex flex-wrap gap-5">
              <a
                href="#modes"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 font-bold rounded-2xl transition-all shadow-sm hover:shadow-md"
                style={{ background: '#3B82F6', color: 'white', minHeight: '56px', fontSize: '1.125rem' }}
              >
                Get Started
              </a>
              <a
                href="#impact"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 font-semibold rounded-2xl transition-all"
                style={{ background: 'rgba(96, 165, 250, 0.15)', color: '#1e40af', minHeight: '56px', fontSize: '1.125rem' }}
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Impact stats */}
      <section id="impact" className="py-20 border-b" style={{ background: 'white', borderColor: '#e5e7eb' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
            <div className="space-y-3">
              <div className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: '#BFDBFE' }}>
                <Users size={32} style={{ color: '#1e40af' }} aria-hidden="true" />
              </div>
              <p className="text-4xl font-bold" style={{ color: '#0f172a' }}>240M+</p>
              <p style={{ color: '#64748b', fontSize: '1rem' }}>Students with visual impairments globally</p>
            </div>
            <div className="space-y-3">
              <div className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: '#D1FAE5' }}>
                <Heart size={32} style={{ color: '#047857' }} aria-hidden="true" />
              </div>
              <p className="text-4xl font-bold" style={{ color: '#0f172a' }}>15-20%</p>
              <p style={{ color: '#64748b', fontSize: '1rem' }}>Of the population has dyslexia</p>
            </div>
            <div className="space-y-3">
              <div className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: '#FEF3C7' }}>
                <Shield size={32} style={{ color: '#b45309' }} aria-hidden="true" />
              </div>
              <p className="text-4xl font-bold" style={{ color: '#0f172a' }}>WCAG AAA</p>
              <p style={{ color: '#64748b', fontSize: '1rem' }}>Accessibility compliance standard</p>
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
            <div className="text-center space-y-4">
              <div className="mx-auto w-20 h-20 rounded-3xl flex items-center justify-center text-3xl font-bold" style={{ background: '#BFDBFE', color: '#1e40af' }}>
                1
              </div>
              <h3 className="font-bold text-xl" style={{ color: '#0f172a' }}>Choose a Mode</h3>
              <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: '1.6' }}>
                Select the accessibility tool that matches your learning needs
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="mx-auto w-20 h-20 rounded-3xl flex items-center justify-center text-3xl font-bold" style={{ background: '#D1FAE5', color: '#047857' }}>
                2
              </div>
              <h3 className="font-bold text-xl" style={{ color: '#0f172a' }}>Upload Content</h3>
              <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: '1.6' }}>
                Upload images, record lectures, or paste text for processing
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="mx-auto w-20 h-20 rounded-3xl flex items-center justify-center text-3xl font-bold" style={{ background: '#FEF3C7', color: '#b45309' }}>
                3
              </div>
              <h3 className="font-bold text-xl" style={{ color: '#0f172a' }}>Get Accessible Output</h3>
              <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: '1.6' }}>
                AI transforms your content into an accessible format instantly
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
