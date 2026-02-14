"use client";

import Link from "next/link";
import { Eye, Mic, BookOpen, Brain } from "lucide-react";

const modes = [
  {
    href: "/vision",
    icon: Eye,
    title: "Vision Aid",
    description: "AI describes images and diagrams in educational materials for visually impaired students",
    bgColor: "#BFDBFE",
    borderColor: "#93C5FD",
    hoverBorder: "#60A5FA",
    iconBg: "#93C5FD",
    iconColor: "#1e40af",
    tag: "Vision Impaired",
  },
  {
    href: "/caption",
    icon: Mic,
    title: "Lecture Captioner",
    description: "Real-time captions and AI-generated summaries from lecture audio",
    bgColor: "#D1FAE5",
    borderColor: "#A7F3D0",
    hoverBorder: "#6EE7B7",
    iconBg: "#A7F3D0",
    iconColor: "#047857",
    tag: "Hearing Impaired",
  },
  {
    href: "/dyslexia",
    icon: BookOpen,
    title: "Dyslexia Mode",
    description: "Text reformatted with dyslexia-friendly fonts, spacing, and color overlays",
    bgColor: "#FEF3C7",
    borderColor: "#FDE68A",
    hoverBorder: "#FCD34D",
    iconBg: "#FDE68A",
    iconColor: "#b45309",
    tag: "Dyslexia",
  },
  {
    href: "/adhd",
    icon: Brain,
    title: "ADHD Mode",
    description: "AI creates bite-sized summaries with key points highlighted and progress tracking",
    bgColor: "#BFDBFE",
    borderColor: "#93C5FD",
    hoverBorder: "#60A5FA",
    iconBg: "#93C5FD",
    iconColor: "#1e40af",
    tag: "ADHD",
  },
];

export function ModeSelector() {
  return (
    <section aria-label="Choose your accessibility mode">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {modes.map(({ href, icon: Icon, title, description, bgColor, borderColor, hoverBorder, iconBg, iconColor, tag }) => (
          <Link
            key={href}
            href={href}
            className="group block p-8 rounded-3xl border-3 hover-lift pressable transition-all duration-300"
            style={{
              background: bgColor,
              borderWidth: '3px',
              borderColor: borderColor,
              minHeight: '56px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = hoverBorder;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = borderColor;
            }}
          >
            <div className="flex items-start gap-5">
              <div className="p-4 rounded-2xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1" style={{ background: iconBg }}>
                <Icon size={36} aria-hidden="true" style={{ color: iconColor }} />
              </div>
              <div className="flex-1">
                <span className="tag-pill text-[0.7rem] mb-2" style={{ color: '#64748b' }}>
                  {tag}
                </span>
                <h3 className="font-bold mb-2" style={{ fontSize: '1.375rem', color: '#0f172a' }}>
                  {title}
                </h3>
                <p style={{ color: '#475569', fontSize: '1rem', lineHeight: '1.6' }}>
                  {description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
