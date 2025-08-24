"use client";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ContentItem, ContentType } from "@/lib/mdx";
import Image from "next/image";
import { SimpleMDXContent } from "@/lib/render-mdx";

const PostPageClient = ({
  post,
  contentType,
}: {
  post: ContentItem;
  contentType: ContentType;
}) => {
  return (
    <section className="px-6 lg:px-12 py-10">
      <div className="">
        <div className="relative flex flex-col justify-between gap-10 lg:flex-row">
          <aside className="top-10 h-fit flex-shrink-0 lg:sticky lg:w-[300px] xl:w-[400px]">
            <Link
              className="text-muted-foreground hover:text-primary capitalize mb-5 flex items-center gap-1"
              href={"/" + contentType}
            >
              <ChevronLeft className="h-full w-4" />
              All {contentType} posts
            </Link>
            <h1 className="mb-2 text-balance text-3xl font-bold lg:text-4xl">
              {post.frontmatter.title}
            </h1>
            <h3 className="text-muted-foreground text-lg mb-5">
              {post.frontmatter.summary}
            </h3>
            <div className="flex gap-3">
              <Avatar className="size-7 rounded-full">
                <AvatarImage src="/author.jpeg" alt="Author Avatar" />
              </Avatar>
              <div>
                <h2 className="font-semibold">{post.frontmatter.authorName}</h2>
                <p className="text-muted-foreground text-xs">
                  {new Date(
                    post.frontmatter.date as string,
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>
          </aside>

          <article className="">
            {post.frontmatter.cover && (
              <Image
                src={post.frontmatter.cover}
                alt={post.frontmatter.title}
                width={1000}
                height={600}
                className="mb-8 mt-0 aspect-video w-full rounded-lg object-cover"
              />
            )}
            <SimpleMDXContent source={post.body} />
          </article>
        </div>
      </div>
    </section>
  );
};

export default PostPageClient;
