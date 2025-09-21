import { ContentItem } from "@/lib/md/mdx";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function Portfolio({
  projects,
  heading,
  cta,
}: {
  projects: ContentItem[];
  heading: { title: string; subtitle: string };
  cta: { label: string; href: string };
}) {
  return (
    <>
      <section className="py-12 sm:py-16 relative bg-background">
        <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="mb-8 sm:mb-12 lg:mb-16 flex justify-center items-center flex-col gap-x-0 gap-y-6 lg:gap-y-0 lg:flex-row lg:justify-between max-md:max-w-lg max-md:mx-auto">
            <div className="relative w-full text-center lg:text-left lg:w-2/4">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight sm:leading-[3.25rem] lg:mb-6 mx-auto max-w-max lg:max-w-md lg:mx-0">
                {heading.title}
              </h2>
            </div>
            <div className="relative w-full text-center  lg:text-left lg:w-2/4">
              <p className="text-base sm:text-lg font-normal text-muted-foreground mb-5">
                {heading.subtitle}
              </p>
              <Link
                href={cta.href}
                className="flex flex-row items-center justify-center gap-2 text-base font-semibold text-primary lg:justify-start hover:text-primary/90 relative z-40"
              >
                {cta.label} <ChevronRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
        <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="mt-6 sm:mt-8 bg-muted rounded-3xl overflow-hidden sm:overflow-visible relative h-[42svh] sm:h-[60svh] lg:h-[80svh]">
            {/* <ProjectPreview
              items={projects}
              isLink
              className="max-w-4xl mx-auto pb-10 rounded-3xl"
            /> */}
            <div className="relative w-full h-full">
              <Image
                src="/safari.png"
                alt="Portfolio"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1000px"
                className="object-cover object-center mx-auto rounded-b-3xl sm:absolute sm:-bottom-5 sm:-right-5"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Portfolio;
