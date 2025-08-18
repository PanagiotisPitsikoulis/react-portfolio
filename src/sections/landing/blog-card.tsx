import { ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { listContent } from "@/lib/mdx";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface BlogCardProps {
  sectionTitle: string;
  sectionSubtitle: string;
  readMoreLabel: string;
  readMoreHref: string;
  authorAvatarSrc: string;
  labels: {
    tooltipGoToBlog: string;
    tooltipOpenPost: string;
    tooltipViewPost: string;
  };
}

const BlogCard = async ({
  sectionTitle,
  sectionSubtitle,
  readMoreLabel,
  readMoreHref,
  authorAvatarSrc,
  labels,
}: BlogCardProps) => {
  const posts = await listContent("blog");
  const [featured, ...rest] = posts;
  const secondary = rest.slice(0, 3);
  return (
    <section className="dark relative bg-background p-4 lg:p-12 rounded-3xl">
      <div className="container">
        {/* Title Section - Updated layout */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            {sectionTitle}
          </h1>

          <div className="mt-4 flex justify-start">
            <span className="mt-2 block text-sm text-muted-foreground md:text-base">
              {sectionSubtitle}
            </span>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="ml-auto rounded-full border-foreground text-foreground"
                  asChild
                >
                  <Link href={readMoreHref}>
                    {readMoreLabel}
                    <ArrowRight className="h-4 w-4 md:h-6 md:w-6" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                {labels.tooltipGoToBlog}
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
          {/* Main Featured Post */}
          <div className="mb-4">
            {featured?.frontmatter.cover ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={`/blog/${featured.frontmatter.slug || featured.slug}`}
                    aria-label={featured.frontmatter.title || featured.slug}
                    className="group relative block"
                  >
                    <Image
                      className="w-full rounded-lg object-cover aspect-[3/2]"
                      src={featured.frontmatter.cover}
                      alt={featured.frontmatter.title || featured.slug}
                      width={1200}
                      height={800}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <ArrowUpRight className="text-white/90 absolute right-3 top-3 hidden size-5 rounded-md bg-black/40 p-0.5 backdrop-blur-sm group-hover:block" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="top">
                  {labels.tooltipOpenPost}
                </TooltipContent>
              </Tooltip>
            ) : null}
            <div className="mt-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={`/blog/${featured?.frontmatter.slug || featured?.slug || ""}`}
                    className="inline-flex items-center gap-2"
                  >
                    <h1 className="text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
                      {featured?.frontmatter.title ||
                        featured?.slug ||
                        "Latest post"}
                    </h1>
                    <ArrowUpRight className="text-muted-foreground size-5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="top">
                  {labels.tooltipOpenPost}
                </TooltipContent>
              </Tooltip>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={`/blog/${featured?.frontmatter.slug || featured?.slug || ""}`}
                  className="mt-6 flex items-center gap-3 md:mt-8 md:gap-4"
                  aria-label="Open featured post"
                >
                  <Avatar className="h-8 w-8 rounded-full md:h-12 md:w-12">
                    <AvatarImage src={authorAvatarSrc} />
                  </Avatar>
                  <span className="text-sm md:text-base inline-flex items-center gap-2">
                    <span className="block text-foreground">
                      {featured?.frontmatter.authorName || "Author"}
                    </span>
                    <ChevronRight className="text-muted-foreground size-4" />
                    <span className="text-xs text-muted-foreground md:text-sm">
                      {featured?.frontmatter.date
                        ? new Date(
                            featured.frontmatter.date,
                          ).toLocaleDateString()
                        : ""}
                    </span>
                  </span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="top">
                {labels.tooltipViewPost}
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Secondary Posts List */}
          <div className="space-y-6 text-foreground md:space-y-8">
            {secondary.map((post, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <Link
                    href={`/blog/${post.frontmatter.slug || post.slug}`}
                    className="flex items-start gap-4 border-b pb-6 last:border-b-0 group"
                  >
                    <div className="w-1/4 shrink-0 md:w-1/5">
                      {post.frontmatter.cover ? (
                        <Image
                          className="rounded-md object-cover w-full h-auto aspect-[3/2]"
                          src={post.frontmatter.cover}
                          alt={post.frontmatter.title || post.slug}
                          width={240}
                          height={160}
                          sizes="(max-width: 768px) 25vw, 15vw"
                        />
                      ) : null}
                    </div>
                    <div className="w-3/4 md:w-4/5 flex items-center justify-between gap-2">
                      <p className="text-sm leading-relaxed md:text-base">
                        {post.frontmatter.title || post.slug}
                      </p>
                      <ArrowRight className="text-muted-foreground size-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="top">
                  {labels.tooltipOpenPost}
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogCard;
