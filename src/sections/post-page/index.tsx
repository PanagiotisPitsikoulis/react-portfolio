import { ContentType, getContent } from "@/lib/md/mdx";
import { MDXContent } from "@/lib/md/render-mdx";
import { serializeMDXServer } from "@/lib/md/ssr-serialize";
import { getScreenshotOrCover } from "@/lib/server-files";
import { redirect } from "next/navigation";
import PostCarousel from "./post-carousel";
import PostHero from "./post-hero";

const PostPage = async ({
  slug,
  contentType,
}: {
  slug: string;
  contentType: ContentType;
}) => {
  try {
    const post = await getContent(contentType, slug);
    if (!post) {
      throw new Error("Post not found");
    }

    const mdx = await serializeMDXServer(post.body);

    const isProject = post.type === "projects";
    const heroImage = await getScreenshotOrCover(
      post.slug,
      post.frontmatter.cover,
      { mobile: false }
    );
    const hasExternalUrl = Boolean(isProject && post.frontmatter.url);
    const tags = [
      ...(post.frontmatter.tags || []),
      ...(post.frontmatter.categories || []),
    ];
    return (
      <section className="page-container pb-5">
        <div className="relative flex flex-col justify-between gap-6 lg:flex-row">
          <article className="w-full">
            <PostHero
              title={post.frontmatter.title || post.slug}
              subtitle={
                post.frontmatter.summary ||
                post.frontmatter.metaDescription ||
                ""
              }
              imageSrc={heroImage}
              url={isProject ? post.frontmatter.url : undefined}
              isProject={isProject}
              hasExternalUrl={hasExternalUrl}
              tags={tags}
              date={
                post.frontmatter.date
                  ? String(post.frontmatter.date)
                  : undefined
              }
            />
            {isProject && (post.imagesDesktop?.length || 0) > 0 ? (
              <div className="mt-6">
                {(() => {
                  const images = (post.imagesDesktop || []).filter(Boolean);
                  if (images.length === 0) return null;
                  return (
                    <PostCarousel
                      images={images}
                      projectUrl={post.frontmatter.url}
                    />
                  );
                })()}
              </div>
            ) : null}
            <div className="max-w-2xl">
              <MDXContent source={mdx} />
            </div>
          </article>
        </div>
      </section>
    );
  } catch (error) {
    redirect("/" + contentType);
  }
};

export default PostPage;
