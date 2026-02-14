"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Eye, Mic, BookOpen, Brain, Settings, Home } from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/vision", label: "Vision Aid", icon: Eye },
  { href: "/caption", label: "Captioner", icon: Mic },
  { href: "/dyslexia", label: "Dyslexia Mode", icon: BookOpen },
  { href: "/adhd", label: "ADHD Mode", icon: Brain },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function AccessibleNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav aria-label="Main navigation" className="sticky top-0 z-40 border-b border-slate-200/60 bg-white/75 backdrop-blur-xl shadow-[0_8px_30px_-20px_rgba(15,23,42,0.35)]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-lg text-blue-700"
            aria-label="AccessEdu home"
          >
            <span className="rounded-lg w-8 h-8 flex items-center justify-center text-sm font-bold shadow-sm" style={{ background: "linear-gradient(135deg, #1d4ed8, #38bdf8)" }} aria-hidden="true">
              AE
            </span>
            AccessEdu
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors min-h-[44px] ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon size={18} aria-hidden="true" />
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile nav */}
        {isOpen && (
          <div id="mobile-menu" className="md:hidden pb-4 mt-3 animate-fade-in glass rounded-2xl p-3" role="menu">
            {navItems.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors min-h-[44px] ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                  role="menuitem"
                >
                  <Icon size={20} aria-hidden="true" />
                  {label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
