import React from "react";

export type ServiceCardProps = {
  title: string;
  description: string;
  icon: string;
  href?: string;
  badge?: string;
  emphasis?: "large" | "tall";
};

export default function ServiceCard({
  title,
  description,
  icon,
  href,
  badge,
  emphasis,
}: ServiceCardProps) {
  const isLarge = emphasis === "large";
  const isTall = emphasis === "tall";

  const colSpanClass =
    isLarge && isTall
      ? "md:col-span-2 md:row-span-2"
      : isLarge
      ? "md:col-span-2"
      : isTall
      ? "md:row-span-2"
      : "";

  const Wrapper: any = href ? "a" : "div";

  return (
    <Wrapper
      href={href}
      className={`group flex flex-col justify-between rounded-3xl border border-slate-800 bg-slate-900/70 p-4 shadow-[0_18px_45px_-24px_rgba(15,23,42,1)] hover:-translate-y-1 hover:border-blue-500/60 hover:bg-slate-900/90 transition ${colSpanClass}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-800 text-lg">
            {icon}
          </span>
          <span className="text-base font-semibold text-slate-50">{title}</span>
        </div>

        {badge && (
          <span className="rounded-full bg-blue-500/20 px-2 py-1 text-[0.65rem] font-semibold tracking-wide text-blue-200 uppercase">
            {badge}
          </span>
        )}
      </div>

      <p className="text-xs text-slate-300 mt-3">{description}</p>

      <div className="flex justify-between items-center text-[0.75rem] text-slate-400 mt-4">
        <span className="inline-flex items-center gap-1">
          En savoir plus{" "}
          <span className="group-hover:translate-x-1 transition">→</span>
        </span>
        <span className="rounded-full border border-slate-700 px-2 py-0.5 text-[0.6rem] tracking-wider uppercase">
          AquaPro
        </span>
      </div>
    </Wrapper>
  );
}
