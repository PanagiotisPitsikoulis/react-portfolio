"use client";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ContentItem, ContentType } from "@/lib/mdx";
import { SimpleMDXContent } from "@/lib/render-mdx";
import Image from "next/image";
import PostCard from "../post-viewer/post-card";

const PostPageClient = ({
  post,
  contentType,
  relatedPosts,
}: {
  post: ContentItem;
  contentType: ContentType;
  relatedPosts: ContentItem[];
}) => {
  return (
    <section className="page-container pb-5">
      <div className="">
        <div className="relative flex flex-col justify-between gap-6 lg:flex-row">
          <article className="max-w-2xl">
            {post.frontmatter.cover && (
              <Image
                src={post.frontmatter.cover}
                alt={post.frontmatter.title}
                width={1000}
                height={600}
                className="mb-4 mt-0 aspect-video w-full rounded-2xl object-cover"
              />
            )}
            <SimpleMDXContent source={post.body} />
          </article>
          <aside className="top-16 h-fit flex-shrink-0 lg:sticky lg:w-[280px] xl:w-[340px]">
            <Link
              className="text-muted-foreground hover:text-primary capitalize mb-3 flex items-center gap-1"
              href={`/${contentType}`}
            >
              <ChevronLeft className="h-full w-3.5" />
              All {contentType === "blog" ? "posts" : "projects"}
            </Link>
            <h1 className="mb-1.5 text-balance text-2xl font-bold lg:text-3xl">
              {post.frontmatter.title}
            </h1>
            <h3 className="text-muted-foreground text-base mb-4">
              {post.frontmatter.summary}
            </h3>
            <div className="flex gap-2">
              <Avatar className="size-6 rounded-full">
                <AvatarImage src="/author.jpeg" alt="Author Avatar" />
              </Avatar>
              <div>
                <h2 className="font-semibold">{post.frontmatter.authorName}</h2>
                <p className="text-muted-foreground text-xs">
                  {new Date(
                    post.frontmatter.date as string
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>
            {/* Recommended Articles Section */}
            {relatedPosts.length > 0 && (
              <div className="pt-8">
                <div className="flex flex-col gap-4">
                  {relatedPosts.map((relatedPost) => (
                    <PostCard
                      key={relatedPost.slug}
                      post={relatedPost}
                      contentType={contentType}
                    />
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
};

export default PostPageClient;
