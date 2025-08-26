import { ContentType, getContent, getRelatedPosts } from "@/lib/mdx";
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

    // Get related posts
    const relatedPosts = await getRelatedPosts(post, 3);

    return (
      <PostPageClient
        post={post}
        contentType={contentType}
        relatedPosts={relatedPosts}
      />
    );
  } catch (error) {
    redirect("/" + contentType);
  }
};

export default PostPage;
