import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

type SafariMode = "default" | "simple";

export interface SafariProps extends React.HTMLAttributes<HTMLDivElement> {
  url?: string;
  imageSrc?: string;
  videoSrc?: string;
  width?: number;
  height?: number;
  mode?: SafariMode;
}

export function Safari({
  imageSrc,
  videoSrc,
  url,
  width = 1203,
  height = 753,
  mode = "default",
  className,
  ...props
}: SafariProps) {
  const topBarHeight = 40;
  const contentTop = Math.max(0, topBarHeight - 6);
  return (
    <>
      <div
        className="block lg:hidden relative overflow-hidden lg:rounded-2xl lg:border border-black/10 dark:border-white/10 bg-background"
        style={{
          width: "100%",
          maxWidth: width,
          aspectRatio: `${width}/${height}`,
        }}
      >
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={url || "safari-preview"}
            fill
            sizes="100vw"
            priority={false}
            draggable={false}
            className="object-cover object-top"
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

      <div
        className={cn(
          "hidden lg:block relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-background",
          className
        )}
        style={{
          width: "100%",
          maxWidth: width,
          aspectRatio: `${width}/${height}`,
        }}
        {...props}
      >
        <div
          className="absolute left-0 right-0"
          style={{ top: contentTop, bottom: 0 }}
        >
          <div className="size-full overflow-hidden rounded-b-xl bg-background">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={url || "safari-preview"}
                fill
                sizes="100vw"
                priority={false}
                draggable={false}
                className="object-cover object-top"
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

        {/* Overlay frame: only the rounded container + top bar */}
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${width} ${height}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="pointer-events-none absolute inset-0"
        >
          {/* Top bar controls */}
          <circle
            cx="27"
            cy="25"
            r="6"
            className="fill-[#E5E5E5] dark:fill-[#404040]"
          />
          <circle
            cx="47"
            cy="25"
            r="6"
            className="fill-[#E5E5E5] dark:fill-[#404040]"
          />
          <circle
            cx="67"
            cy="25"
            r="6"
            className="fill-[#E5E5E5] dark:fill-[#404040]"
          />
          <path
            d="M286 17C286 13.6863 288.686 11 292 11H946C949.314 11 952 13.6863 952 17V35C952 38.3137 949.314 41 946 41H292C288.686 41 286 38.3137 286 35V17Z"
            className="fill-[#E5E5E5] dark:fill-[#404040]"
          />
          {/* URL text */}
          <g className="mix-blend-luminosity">
            <text
              x="580"
              y="30"
              fill="#A3A3A3"
              fontSize="12"
              fontFamily="Arial, sans-serif"
            >
              {url}
            </text>
          </g>
        </svg>
      </div>
    </>
  );
}
