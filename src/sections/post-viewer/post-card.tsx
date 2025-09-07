import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ContentItem, ContentType } from "@/lib/md/mdx";
import Image from "next/image";
import Link from "next/link";
import { author } from "../../../content/data";

function PostCard({
  post,
  contentType,
}: {
  post: ContentItem;
  contentType: ContentType;
}) {
  const isProject = (post as any).postType
    ? (post as any).postType === "project"
    : post.type === "projects";

  const mergedTags = (post as any).mergedTags || post.frontmatter.tags || [];

  const baseImage =
    (post as any).heroImageDesktop ||
    post.screenshots?.desktop ||
    post.frontmatter.cover ||
    "/images/window.png";

  const imageSrc = isProject
    ? post.frontmatter.url
      ? baseImage
      : post.frontmatter.cover || "/images/window.png"
    : post.frontmatter.cover || "/images/window.png";

  return (
    <Link
      key={post.slug}
      href={`/${contentType}/${post.slug}`}
      className="group flex h-full flex-col justify-between"
    >
      <div
        className={
          "relative overflow-hidden rounded-3xl transition-all duration-300 hover:opacity-90"
        }
      >
        <div className="relative w-full bg-black">
          <Image
            src={imageSrc}
            alt={post.frontmatter.title}
            width={400}
            height={600}
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover object-top aspect-video"
            draggable={false}
            priority={false}
          />
        </div>
      </div>

      <div className="mt-2">
        {mergedTags?.length
          ? (() => {
              const tags = mergedTags as string[];
              const visible = tags.slice(0, 3);
              const hidden = tags.slice(3);
              return (
                <div className="flex flex-wrap gap-1.5">
                  {visible.map((t) => (
                    <Badge
                      key={t}
                      variant="secondary"
                      className="capitalize text-[10px] py-0.5 px-1.5"
                    >
                      {t}
                    </Badge>
                  ))}
                  {hidden.length > 0 ? (
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <Badge
                          variant="secondary"
                          className="text-[10px] py-0.5 px-1.5"
                        >
                          +{hidden.length}
                        </Badge>
                      </HoverCardTrigger>
                      <HoverCardContent className="p-2 space-x-1">
                        <div className="flex flex-wrap gap-1">
                          {hidden.map((t) => (
                            <Badge
                              key={t}
                              variant="secondary"
                              className="capitalize text-[10px] py-0.5 px-1.5"
                            >
                              {t}
                            </Badge>
                          ))}
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  ) : null}
                </div>
              );
            })()
          : null}
      </div>
      <div className="mb-1 line-clamp-2 break-words pt-2 text-base font-medium md:pt-2 md:text-lg lg:pt-2 lg:text-xl">
        {post.frontmatter.title}
      </div>
      <div className="text-muted-foreground mb-2 line-clamp-1 text-xs md:mb-3 md:text-sm">
        {post.frontmatter.summary}
      </div>
      <div className="flex items-center gap-1">
        <Avatar className="size-8">
          <AvatarImage src={"/author.jpeg"} />
          <AvatarFallback>{author.name?.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-px">
          <span className="text-xs font-medium">{author.name}</span>
          <span className="text-muted-foreground text-[10px]">
            {new Date(post.frontmatter.date as string).toLocaleDateString()}
          </span>
        </div>
      </div>
    </Link>
  );
}
export default PostCard;
