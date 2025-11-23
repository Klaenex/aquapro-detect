import React from "react";

type ContainerProps = React.HTMLAttributes<HTMLDivElement>;

export default function Container(props: ContainerProps) {
  const { className = "", children, ...rest } = props;

  return (
    <div
      {...rest}
      className={`mx-auto w-full max-w-6xl px-4 md:px-6 ${className}`}
    >
      {children}
    </div>
  );
}
