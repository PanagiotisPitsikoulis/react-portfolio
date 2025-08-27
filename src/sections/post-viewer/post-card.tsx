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
      <div className="transition-opacity duration-300 group-hover:opacity-80">
        <Image
          height={400}
          width={400}
          src={post.frontmatter.cover || ""}
          alt={post.frontmatter.title}
          className="w-full object-cover object-center aspect-video rounded-2xl"
        />
      </div>

      <div className="mt-2">
        {post?.frontmatter?.tags?.length && (
          <Badge
            variant="secondary"
            className="capitalize text-[10px] py-0.5 px-1.5"
          >
            {post.frontmatter.tags?.join(", ")}
          </Badge>
        )}
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
