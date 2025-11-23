import React from "react";

export type ServiceCardProps = {
  title: string;
  description: string;
  icon: string;
  href?: string;
  badge?: string;
  emphasis?: "large" | "tall";
};

export default function ServiceCard(props: ServiceCardProps) {
  const { title, description, icon, href, badge, emphasis } = props;

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

  const baseClassName =
    "group flex flex-col justify-between rounded-3xl border border-slate-800 " +
    "bg-slate-900/70 p-4 text-sm text-slate-200 " +
    "shadow-[0_18px_45px_-24px_rgba(15,23,42,1)] " +
    "transition hover:-translate-y-1 hover:border-blue-500/60 hover:bg-slate-900/90 " +
    colSpanClass;

  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 text-base font-semibold text-slate-50">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-800/80 text-lg">
            {icon}
          </span>
          <span className="text-sm md:text-base">{title}</span>
        </div>
        {badge ? (
          <span className="rounded-full bg-blue-500/20 px-2 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-blue-200">
            {badge}
          </span>
        ) : null}
      </div>

      <p className="mt-3 text-xs text-slate-300 md:text-sm">{description}</p>

      <div className="mt-4 flex items-center justify-between text-[0.75rem] text-slate-400">
        <span className="inline-flex items-center gap-1">
          En savoir plus
          <span className="transition group-hover:translate-x-0.5">→</span>
        </span>
        <span className="rounded-full border border-slate-700 px-2 py-0.5 text-[0.65rem] uppercase tracking-[0.16em] text-slate-500">
          Service AquaPro
        </span>
      </div>
    </>
  );

  if (href) {
    return (
      <a href={href} className={baseClassName}>
        {content}
      </a>
    );
  }

  return <div className={baseClassName}>{content}</div>;
}
