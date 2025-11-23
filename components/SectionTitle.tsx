import React from "react";

export default function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="space-y-1">
      <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-slate-50">{title}</h2>
      {subtitle && <p className="text-sm text-slate-300">{subtitle}</p>}
    </div>
  );
}
