import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { metadata } from "@/lib/data";
import { ContentItem, ContentType } from "@/lib/mdx";
import Image from "next/image";
import Link from "next/link";

const PostCards = ({
  posts,
  contentType,
}: {
  posts: ContentItem[];
  contentType: ContentType;
}) => {
  return (
    <section>
      <div>
        <div className="grid gap-x-4 gap-y-8 md:grid-cols-2 lg:gap-x-6 lg:gap-y-12 2xl:grid-cols-3">
          {posts.map((post) => (
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
                    className="aspect-3/2 h-full w-full object-cover object-center border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <Badge variant="secondary" className="capitalize">
                  {post.frontmatter.tags?.join(", ")}
                </Badge>
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
                  <AvatarFallback>
                    {post.frontmatter.authorName?.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-px">
                  <span className="text-xs font-medium">
                    {post.frontmatter.authorName}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {new Date(
                      post.frontmatter.date as string,
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 flex flex-col items-center py-2 md:hidden">
          <Button className="w-full sm:w-fit">View all posts</Button>
        </div>
      </div>
    </section>
  );
};

export default PostCards;
