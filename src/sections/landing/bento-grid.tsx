import { Clock, Zap } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export interface BentoStat {
  value: string;
  labelLines: string[];
}

export interface BentoAvatar {
  imageSrc: string;
  fallback: string;
}

export interface BentoImageTile {
  imageSrc: string;
  alt: string;
  headline?: string;
  icon?: React.ReactNode;
}

export interface BentoPricing {
  price: string;
  label: string;
  cta: { label: string; href: string };
}

export interface BentoGridProps {
  leadTile: BentoImageTile;
  secondaryTile: BentoImageTile;
  stat: BentoStat;
  avatarStrip: BentoAvatar[];
  wideImageTile: BentoImageTile;
  highlightTile: {
    imageSrc: string;
    alt: string;
    titleTop: string;
    titleBottom: string;
  };
  pricing: BentoPricing;
}

const BentoGrid: React.FC<BentoGridProps> = ({
  leadTile,
  secondaryTile,
  stat,
  avatarStrip,
  wideImageTile,
  highlightTile,
  pricing,
}) => {
  return (
    <section>
      <div className="container">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-6 lg:grid-cols-12">
          <div className="relative h-60 overflow-hidden rounded-3xl md:col-span-2 md:row-span-2 md:h-[400px] lg:col-span-4 lg:h-full">
            <img
              src={leadTile.imageSrc}
              alt={leadTile.alt}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0" />
            <div className="absolute bottom-6 left-6 z-10 text-white">
              {leadTile.headline ? (
                <p className="text-lg font-medium">{leadTile.headline}</p>
              ) : null}
            </div>
            <div className="absolute right-6 top-6 z-10">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                {leadTile.icon ?? <Zap className="h-5 w-5 text-white" />}
              </div>
            </div>
          </div>

          <div className="relative h-60 overflow-hidden rounded-3xl border md:col-span-2 md:row-span-2 md:h-[400px] lg:col-span-4 lg:h-full">
            <img
              src={secondaryTile.imageSrc}
              alt={secondaryTile.alt}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute bottom-6 left-6 right-6 z-10">
              <h2 className="text-sm font-medium leading-tight md:text-base lg:text-xl">
                {secondaryTile.headline}
              </h2>
            </div>
          </div>

          <Card className="col-span-1 rounded-3xl md:col-span-2 md:row-span-1 md:h-[192px] lg:col-span-2">
            <CardContent className="flex h-full flex-col justify-center p-4 md:p-6">
              <div className="mb-2 text-4xl font-bold md:text-4xl lg:text-6xl">
                {stat.value}
                <span className="align-top text-2xl md:text-xl lg:text-3xl">
                  {stat.value.endsWith("%") ? "" : ""}
                </span>
              </div>
              <p className="text-sm leading-tight md:text-sm">
                {stat.labelLines.map((line, idx) => (
                  <span key={idx}>
                    {line}
                    {idx !== stat.labelLines.length - 1 ? <br /> : null}
                  </span>
                ))}
              </p>
            </CardContent>
          </Card>

          <div className="relative col-span-1 h-60 overflow-hidden rounded-3xl border md:col-span-2 md:row-span-1 md:h-[192px] lg:col-span-2">
            <img
              src={wideImageTile.imageSrc}
              alt={wideImageTile.alt}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <Card className="bg-muted col-span-1 rounded-3xl md:col-span-4 md:row-span-1 md:h-[300px] lg:col-span-4">
            <CardContent className="h-full p-4 md:p-5">
              <div className="flex h-full flex-col justify-end">
                <div className="space-y-2">
                  <div className="text-4xl font-normal md:text-5xl lg:text-6xl">
                    {pricing.price}
                  </div>
                  <div className="text-muted-foreground">
                    {pricing.label}
                  </div>
                  <a href={pricing.cta.href}>
                    <Button>{pricing.cta.label}</Button>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1 rounded-3xl md:col-span-2 md:row-span-1 md:h-[300px] lg:col-span-3">
            <CardContent className="flex h-full flex-col justify-center p-4 md:p-5">
              <div className="mb-3">
                <span className="text-4xl font-bold md:text-3xl lg:text-6xl">
                  {avatarStrip.length}
                </span>
                <span className="align-top text-2xl font-bold md:text-xl lg:text-3xl">
                  +
                </span>
              </div>
              <p className="mb-4 text-sm md:text-sm">Happy collaborators</p>
              <div className="flex -space-x-2">
                {avatarStrip.map((avatar, i) => (
                  <Avatar
                    key={i}
                    className="border-border h-8 w-8 border-2 md:h-8 md:w-8 lg:h-10 lg:w-10"
                  >
                    <AvatarImage src={avatar.imageSrc} />
                    <AvatarFallback>{avatar.fallback}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="relative col-span-1 h-60 overflow-hidden rounded-3xl md:col-span-3 md:row-span-1 md:h-[300px] lg:col-span-5">
            <img
              src={highlightTile.imageSrc}
              alt={highlightTile.alt}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </Card>

          <Card className="relative col-span-1 h-60 overflow-hidden rounded-3xl md:col-span-3 md:row-span-1 md:h-[300px] lg:col-span-4">
            <img
              src={highlightTile.imageSrc}
              alt={highlightTile.alt}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
            <div className="absolute inset-0 z-10 flex items-center justify-start p-4 md:p-6">
              <div className="text-white">
                <div className="mb-2 flex items-center gap-2 md:gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 md:h-7 md:w-7">
                    <Clock className="h-3 w-3 md:h-4 md:w-4" />
                  </div>
                  <span className="text-base font-semibold md:text-lg">
                    {highlightTile.titleTop}
                  </span>
                </div>
                <p className="text-sm opacity-90 md:text-sm">
                  {highlightTile.titleBottom}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
