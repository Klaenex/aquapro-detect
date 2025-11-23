import React from "react";

export default function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-6xl w-full px-4 md:px-6 ${className}`}>{children}</div>;
}
