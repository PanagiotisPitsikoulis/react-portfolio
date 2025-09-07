import { SectionDivider } from "@/components/section-divider";
import { ContentType, getContent } from "@/lib/md/mdx";
import { MDXContent } from "@/lib/md/render-mdx";
import { serializeMDXServer } from "@/lib/md/ssr-serialize";
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

    const isProject = post.postType
      ? post.postType === "project"
      : post.type === "projects";

    return (
      <section className="page-container pb-5">
        <div className="relative flex flex-col justify-between gap-6 lg:flex-row">
          <article className="w-full max-w-5xl mx-auto">
            <PostHero post={post} />
            {isProject && (post.imagesDesktop?.length || 0) > 0 ? (
              <div className="mt-6">
                <PostCarousel post={post} />
              </div>
            ) : null}
            <SectionDivider label={post.frontmatter.title} />
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
