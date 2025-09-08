"use client";

/*
If condition is true, render the first child, otherwise render the second child.
*/
export default function RenderConditionally({
  children,
  condition,
  className,
}: {
  children: React.ReactNode[];
  condition: boolean;
  className?: string;
}) {
  if (children.length !== 2) {
    throw new Error("RenderDynamically must have exactly 2 children");
  }
  return (
    <div className={className}>{condition ? children[0] : children[1]}</div>
  );
}
