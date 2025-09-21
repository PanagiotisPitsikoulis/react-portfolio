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
    "/images/Silhouette Flower Art.webp";

  const imageSrc = isProject
    ? post.frontmatter.url
      ? baseImage
      : post.frontmatter.cover || "/images/Silhouette Flower Art.webp"
    : post.frontmatter.cover || "/images/Silhouette Flower Art.webp";

  const isBlog = contentType === "blog";

  return (
    <Link
      key={post.slug}
      href={`/${contentType}/${post.slug}`}
      className="group flex h-full flex-col justify-between"
    >
      <div className="relative overflow-hidden rounded-lg transition-all duration-300 hover:opacity-95 mb-2  aspect-video">
        <Image
          src={imageSrc}
          alt={post.frontmatter.title}
          width={600}
          height={400}
          sizes="(max-width: 768px) 100vw, 600px"
          className="object-cover w-full h-auto"
          draggable={false}
          priority={false}
        />
      </div>

      {isBlog ? (
        <>
          <div className="mt-5">
            <h5 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
              {post.frontmatter.title}
            </h5>
            <p className="text-base text-muted-foreground line-clamp-2">
              {post.frontmatter.summary}
            </p>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <Avatar className="size-8">
              <AvatarImage alt={"Author " + author.name} src={"/author.jpeg"} />
              <AvatarFallback>{author.name?.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-muted-foreground">
              {author.name}
            </span>
          </div>
        </>
      ) : (
        <>
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
              <AvatarImage alt={"Author " + author.name} src={"/author.jpeg"} />
              <AvatarFallback>{author.name?.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-px ml-1">
              <span className="text-sm font-medium">{author.name}</span>
              <span className="text-muted-foreground text-[10px] -mt-1">
                {new Date(post.frontmatter.date as string).toLocaleDateString()}
              </span>
            </div>
          </div>
        </>
      )}
    </Link>
  );
}
export default PostCard;
