import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export interface Iphone15ProProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: number;
  height?: number;
  src?: string;
  videoSrc?: string;
}

export default function Iphone15Pro({
  width = 433,
  height = 882,
  src,
  videoSrc,
  className,
  style,
  ...props
}: Iphone15ProProps) {
  const inset = 8;
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#262626] shadow-sm",
        className
      )}
      style={{
        width: "100%",
        maxWidth: width,
        aspectRatio: `${width}/${height}`,
        ...style,
      }}
      {...props}
    >
      {/* Bezel inner glow */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-black/5 dark:ring-white/10" />

      {/* Screen */}
      <div
        className="absolute overflow-hidden bg-black"
        style={{
          top: inset,
          bottom: inset,
          left: inset,
          right: inset,
          borderRadius: 15,
        }}
      >
        {src ? (
          <Image
            src={src}
            alt="iphone-preview"
            fill
            sizes="(max-width: 768px) 100vw, 389px"
            priority={false}
            draggable={false}
            className="object-cover"
          />
        ) : videoSrc ? (
          <video
            className="size-full object-cover"
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
          />
        ) : null}
      </div>
    </div>
  );
}
