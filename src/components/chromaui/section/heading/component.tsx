import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Size = "sm" | "md" | "lg" | "xl" | "2xl";
type Variant = "default" | "centered" | "minimal";

interface BadgeItem {
  label: string;
  variant?: "default" | "secondary" | "destructive" | "outline";
  className?: string;
}

interface CtaButton {
  label: string;
  href: string;
  external?: boolean;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

interface HeadingProps {
  // Content
  title: string;
  subtitle?: string;
  description?: string;

  // Badges and metadata
  badges?: BadgeItem[];
  maxVisibleBadges?: number;
  metadata?: {
    label?: string;
    value?: string;
    className?: string;
  }[];

  // Call to action
  cta?: CtaButton | CtaButton[];

  // Styling and layout
  size?: Size;
  variant?: Variant;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;

  // Layout options
  showBadges?: boolean;
  showMetadata?: boolean;
  showCta?: boolean;
}

const sizeConfig = {
  sm: {
    title: "text-3xl font-semibold lg:text-4xl",
    subtitle: "text-sm text-muted-foreground",
    description: "text-sm text-muted-foreground",
    spacing: "mb-3",
  },
  md: {
    title: "text-4xl font-semibold lg:text-5xl",
    subtitle: "text-base text-muted-foreground",
    description: "text-base text-muted-foreground",
    spacing: "mb-4",
  },
  lg: {
    title: "text-5xl font-semibold lg:text-5xl",
    subtitle: "text-lg text-muted-foreground",
    description: "text-lg text-muted-foreground",
    spacing: "mb-5",
  },
  xl: {
    title: "text-5xl font-semibold lg:text-7xl",
    subtitle: "text-xl text-muted-foreground",
    description: "text-xl text-muted-foreground",
    spacing: "mb-6",
  },
  "2xl": {
    title: "text-5xl font-semibold lg:text-8xl",
    subtitle: "text-2xl text-muted-foreground",
    description: "text-2xl text-muted-foreground",
    spacing: "mb-6",
  },
};

const variantConfig = {
  default: {
    container: "flex flex-col space-y-4",
    alignment: "text-left max-w-2xl",
    metadata: "justify-start",
    cta: "justify-start",
  },
  centered: {
    container: "flex flex-col text-center space-y-4",
    alignment: "mx-auto max-w-3xl",
    metadata: "justify-center",
    cta: "justify-center",
  },
  minimal: {
    container: "flex flex-col space-y-3",
    alignment: "text-left max-w-xl",
    metadata: "justify-start",
    cta: "justify-start",
  },
};

export const Heading = ({
  title,
  subtitle,
  description,
  badges = [],
  maxVisibleBadges = 3,
  metadata = [],
  cta,
  size = "lg",
  variant = "default",
  className = "",
  titleClassName = "",
  subtitleClassName = "",
  showBadges = true,
  showMetadata = true,
  showCta = true,
}: HeadingProps) => {
  const config = sizeConfig[size];
  const variantStyles = variantConfig[variant];
  const visibleBadges = badges.slice(0, maxVisibleBadges);
  const hiddenBadges = badges.slice(maxVisibleBadges);
  const ctaButtons = Array.isArray(cta) ? cta : cta ? [cta] : [];

  return (
    <div className={cn(variantStyles.container, className)}>
      {/* Metadata and badges section */}
      {(showMetadata && metadata.length > 0) ||
      (showBadges && badges.length > 0) ? (
        <div
          className={cn(
            "text-muted-foreground flex items-center flex-wrap gap-2 text-sm font-medium tracking-tight mb-4",
            variantStyles.metadata,
          )}
        >
          {/* Metadata items */}
          {showMetadata &&
            metadata.map((item, index) => (
              <div
                key={index}
                className={cn(
                  "bg-secondary rounded-full px-3 py-1.5 text-xs flex items-center gap-2",
                  item.className,
                )}
              >
                {item.label && (
                  <span className="inline-block size-2 rounded-full bg-accent" />
                )}
                <span>{item.value || item.label}</span>
              </div>
            ))}
        </div>
      ) : null}

      {/* Badges section */}
      {showBadges && badges.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-6">
          {visibleBadges.map((badge, index) => (
            <Badge
              key={index}
              variant={badge.variant || "secondary"}
              className={cn(
                "capitalize text-[10px] py-0.5 px-2 rounded-full font-medium bg-secondary/40 text-foreground",
                badge.className,
              )}
            >
              {badge.label}
            </Badge>
          ))}
          {hiddenBadges.length > 0 && (
            <HoverCard>
              <HoverCardTrigger asChild>
                <Badge
                  variant="secondary"
                  className="text-[10px] py-0.5 px-2 rounded-full font-medium bg-secondary/40 text-foreground cursor-pointer"
                >
                  +{hiddenBadges.length}
                </Badge>
              </HoverCardTrigger>
              <HoverCardContent className="p-2 space-x-1">
                <div className="flex flex-wrap gap-1">
                  {hiddenBadges.map((badge, index) => (
                    <Badge
                      key={index}
                      variant={badge.variant || "secondary"}
                      className={cn(
                        "capitalize text-[10px] py-0.5 px-2 rounded-full font-medium bg-secondary/40 text-foreground",
                        badge.className,
                      )}
                    >
                      {badge.label}
                    </Badge>
                  ))}
                </div>
              </HoverCardContent>
            </HoverCard>
          )}
        </div>
      )}

      {/* Title */}
      <h1
        className={cn(
          "text-foreground leading-tight text-pretty font-bold",
          config.title,
          titleClassName,
        )}
      >
        {title}
      </h1>

      {/* Subtitle */}
      {subtitle && (
        <p
          className={cn(
            "text-muted-foreground leading-relaxed max-w-xl text-sm mt-2",
            config.subtitle,
            subtitleClassName,
          )}
        >
          {subtitle}
        </p>
      )}

      {/* Description */}
      {description && (
        <p
          className={cn(
            "text-white/70 leading-relaxed mt-2",
            config.description,
          )}
        >
          {description}
        </p>
      )}

      {/* Call to action buttons */}
      {showCta && ctaButtons.length > 0 && (
        <div
          className={cn(
            "flex flex-col md:flex-row mt-12 relative gap-4",
            variantStyles.cta,
          )}
        >
          {ctaButtons.map((button, index) => (
            <Button
              key={index}
              size={button.size || "lg"}
              variant={button.variant || "default"}
              asChild
              className={cn(button.className, "w-fit")}
            >
              <Link
                href={button.href}
                target={button.external ? "_blank" : undefined}
                rel={button.external ? "noopener noreferrer" : undefined}
                className="flex items-center gap-2"
              >
                {button.label}
              </Link>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};
