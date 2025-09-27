import { cn } from "@/lib/utils";
import Image from "next/image";

interface BackgroundImage {
  src: string;
  alt: string;
  zIndex?: number;
  opacity?: number;
  className?: string;
  objectPosition?: string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
}

interface BackgroundElementsProps {
  images: BackgroundImage[];
  className?: string;
}

export const BackgroundElements = ({
  images,
  className = "",
}: BackgroundElementsProps) => {
  return (
    <div className={cn("absolute inset-0", className)}>
      {images.map((image, index) => {
        const {
          src,
          alt,
          zIndex = -10,
          opacity = 1,
          className: imageClassName = "",
          objectPosition = "center",
          objectFit = "cover",
        } = image;

        const imageStyle = {
          opacity,
          zIndex,
        };

        return (
          <Image
            key={`bg-image-${index}`}
            src={src}
            alt={alt}
            fill
            className={cn("absolute", imageClassName)}
            style={{
              ...imageStyle,
              objectPosition,
              objectFit,
            }}
          />
        );
      })}
    </div>
  );
};

// Example layered background configurations
export const backgroundExamples = {
  postHero: [
    {
      src: "/texture.svg",
      alt: "Background texture",
      zIndex: -20,
      opacity: 0.3,
      objectFit: "cover" as const,
    },
    {
      src: "/gradients/blue-purple.jpg",
      alt: "Blue purple gradient",
      zIndex: -30,
      opacity: 0.8,
      objectFit: "cover" as const,
    },
  ],
  minimal: [
    {
      src: "/gradients/light-blue.jpg",
      alt: "Light blue gradient",
      zIndex: -10,
      opacity: 0.5,
      objectFit: "cover" as const,
    },
  ],
  layered: [
    {
      src: "/gradients/blue.jpg",
      alt: "Blue gradient base",
      zIndex: -40,
      opacity: 1,
      objectFit: "cover" as const,
    },
    {
      src: "/gradients/forest.svg",
      alt: "Forest overlay",
      zIndex: -30,
      opacity: 0.6,
      objectFit: "cover" as const,
    },
    {
      src: "/texture.svg",
      alt: "Texture overlay",
      zIndex: -20,
      opacity: 0.3,
      objectFit: "cover" as const,
    },
  ],
};
