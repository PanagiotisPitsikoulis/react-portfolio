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
  return (
    <Link
      key={post.slug}
      href={`/${contentType}/${post.slug}`}
      className="group flex flex-col h-full justify-between"
    >
      <div className="transition-opacity duration-300 group-hover:opacity-80">
        {post.type === "projects" ? (
          <Image
            height={400}
            width={800}
            src={
              post.frontmatter.url
                ? post.screenshots?.desktop ||
                  post.frontmatter.cover ||
                  "/default-cover.png"
                : post.frontmatter.cover || "/default-cover.png"
            }
            alt={post.frontmatter.title}
            className="w-full object-cover object-center rounded-3xl shadow"
          />
        ) : (
          <Image
            height={400}
            width={800}
            src={post.frontmatter.cover || "/default-cover.png"}
            alt={post.frontmatter.title}
            className="w-full object-contain object-center rounded-3xl shadow aspect-video h-full"
          />
        )}
      </div>

      <div className="mt-2">
        {post?.frontmatter?.tags?.length
          ? (() => {
              const tags = post.frontmatter.tags || [];
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
