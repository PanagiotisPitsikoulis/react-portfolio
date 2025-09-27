import { ContentType, getContent } from "@/lib/md/mdx";
import { serializeMDXServer } from "@/lib/md/ssr-serialize";
import { redirect } from "next/navigation";
import PostPageClient from "./post-page-client";

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

    // Extract post data similar to PostHero
    const title = post.frontmatter.title || post.slug;
    const subtitle =
      post.frontmatter.summary || post.frontmatter.metaDescription || "";
    const isProject =
      post.postType ? post.postType === "project" : post.type === "projects";
    const hasExternalUrl = Boolean(isProject && post.frontmatter.url);
    const imageSrc =
      hasExternalUrl ?
        post.screenshots?.mobile ||
        post.frontmatter.cover ||
        "/images/Silhouette Flower Art.webp"
      : post.frontmatter.cover ||
        post.screenshots?.desktop ||
        "/images/Silhouette Flower Art.webp";
    const url = isProject ? post.frontmatter.url : undefined;
    const tags = post.mergedTags || [
      ...(post.frontmatter.tags || []),
      ...(post.frontmatter.categories || []),
    ];
    const date =
      post.frontmatter.date ? String(post.frontmatter.date) : undefined;
    const formattedDate =
      date ?
        new Date(date).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "2-digit",
        })
      : undefined;

    const hasButton = isProject && hasExternalUrl;
    const primaryCtaHref = hasButton ? url : undefined;

    const mobileImages = (post.imagesMobile || []).filter(Boolean) as string[];
    const marqueeImages = mobileImages.length > 0 ? mobileImages : [imageSrc];

    // Convert tags to badge format
    const badges = tags.map((tag: string) => ({
      label: tag,
      variant: "secondary" as const,
    }));

    // Convert metadata
    const metadata = [
      {
        label: isProject ? "Project" : "Blog",
        value: isProject ? "Project" : "Blog",
      },
      ...(formattedDate ? [{ label: "", value: formattedDate }] : []),
    ];

    // Convert CTA
    const cta =
      hasButton ?
        {
          label: "Visit project",
          href: primaryCtaHref!,
          external: true,
          variant: "default" as const,
          size: "lg" as const,
        }
      : undefined;

    // Create carousel images for mobile shots
    const carouselImages = marqueeImages.map((src, index) => ({
      src,
      alt: `Project mobile screenshot ${index + 1}`,
      className: "aspect-[9/16] object-cover min-h-[10svh] lg:min-h-[30svh]",
    }));

    return <PostPageClient post={post} mdx={mdx} />;
  } catch (error) {
    redirect("/" + contentType);
  }
};

export default PostPage;
