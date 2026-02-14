export function getContrastColors(highContrast: boolean) {
  if (highContrast) {
    return {
      bg: "bg-black",
      text: "text-white",
      border: "border-yellow-400",
      accent: "text-yellow-400",
      cardBg: "bg-gray-900",
    };
  }
  return {
    bg: "bg-slate-50",
    text: "text-slate-800",
    border: "border-slate-200",
    accent: "text-blue-600",
    cardBg: "bg-white",
  };
}

export function getOverlayStyle(overlay: string): React.CSSProperties {
  const overlays: Record<string, React.CSSProperties> = {
    none: {},
    yellow: { backgroundColor: "rgba(255, 255, 0, 0.08)" },
    blue: { backgroundColor: "rgba(0, 100, 255, 0.06)" },
    green: { backgroundColor: "rgba(0, 200, 100, 0.06)" },
    pink: { backgroundColor: "rgba(255, 100, 150, 0.06)" },
  };
  return overlays[overlay] || {};
}

export function announceToScreenReader(message: string): void {
  const el = document.createElement("div");
  el.setAttribute("role", "status");
  el.setAttribute("aria-live", "polite");
  el.setAttribute("aria-atomic", "true");
  el.className = "sr-only";
  el.textContent = message;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1000);
}
