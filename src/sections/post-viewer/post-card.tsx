import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ContentItem, ContentType } from "@/lib/mdx";
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
      <div className="mb-4 flex overflow-clip md:mb-5">
        <div className="transition-opacity duration-300 group-hover:opacity-80">
          <Image
            height={400}
            width={400}
            src={post.frontmatter.cover || ""}
            alt={post.frontmatter.title}
            className="aspect-3/2 h-full w-full object-cover object-center rounded-3xl shadow"
          />
        </div>
      </div>

      <div>
        {post?.frontmatter?.tags?.length && (
          <Badge variant="secondary" className="capitalize">
            {post.frontmatter.tags?.join(", ")}
          </Badge>
        )}
      </div>
      <div className="mb-2 line-clamp-3 break-words pt-4 text-lg font-medium md:mb-3 md:pt-4 md:text-2xl lg:pt-4 lg:text-2xl">
        {post.frontmatter.title}
      </div>
      <div className="text-muted-foreground mb-4 line-clamp-2 text-sm md:mb-5 md:text-base">
        {post.frontmatter.summary}
      </div>
      <div className="flex items-center gap-2">
        <Avatar className="size-10">
          <AvatarImage src={"/author.jpeg"} />
          <AvatarFallback>{author.name?.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-px">
          <span className="text-sm font-medium">{author.name}</span>
          <span className="text-muted-foreground text-xs">
            {new Date(post.frontmatter.date as string).toLocaleDateString()}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
