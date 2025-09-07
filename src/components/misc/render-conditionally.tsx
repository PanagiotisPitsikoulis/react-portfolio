"use client";

/*
If condition is true, render the first child, otherwise render the second child.
*/
export default function RenderConditionally({
  children,
  condition,
}: {
  children: React.ReactNode[];
  condition: boolean;
}) {
  if (children.length !== 2) {
    throw new Error("RenderDynamically must have exactly 2 children");
  }
  return <>{condition ? children[0] : children[1]}</>;
}
