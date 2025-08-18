import Link from "next/link";
import { listContent } from "@/lib/mdx";
import { siteMetadata } from "@/lib/data";

export const revalidate = 60;

export async function generateMetadata() {
  return {
    title: `Blog | ${siteMetadata.title}`,
    description: siteMetadata.description,
  };
}

export default async function BlogPosts() {
  const posts = await listContent("blog");
  return (
    <section className="px-6 lg:px-12 pb-32 pt-10">
      <div className="container">
        <div className="mb-8 md:mb-14 lg:mb-16">
          <div className="flex items-start justify-between gap-8">
            <div>
              <h1 className="mb-4 w-full text-4xl font-medium md:mb-5 md:text-5xl lg:mb-6 lg:text-6xl">
                Blog
              </h1>
            </div>
          </div>
          <p>
            Insights, tutorials, and thoughts on modern software development
          </p>
        </div>
        <div className="grid gap-x-4 gap-y-8 md:grid-cols-2 lg:gap-x-6 lg:gap-y-12 2xl:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.frontmatter.slug || post.slug}`}
              className="group flex flex-col"
            >
              {post.frontmatter.cover ? (
                <div className="mb-4 flex overflow-clip rounded-xl md:mb-5">
                  <div className="transition-opacity duration-300 group-hover:opacity-80">
                    <img
                      src={post.frontmatter.cover}
                      alt={post.frontmatter.title || post.slug}
                      className="aspect-3/2 h-full w-full object-cover object-center"
                    />
                  </div>
                </div>
              ) : null}
              <div className="text-muted-foreground mb-4 flex items-center gap-2 text-xs">
                {post.frontmatter.date ? (
                  <span>
                    {new Date(post.frontmatter.date).toLocaleDateString()}
                  </span>
                ) : null}
              </div>
              <h2 className="mb-2 line-clamp-3 break-words text-lg font-medium md:mb-3 md:text-2xl">
                {post.frontmatter.title || post.slug}
              </h2>
              {post.frontmatter.summary ? (
                <div className="text-muted-foreground line-clamp-2 text-sm md:text-base">
                  {post.frontmatter.summary}
                </div>
              ) : null}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
