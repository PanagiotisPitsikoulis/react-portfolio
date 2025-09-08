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

    return (
      <section className="page-container pb-5">
        <PostPageClient post={post} mdx={mdx} />
      </section>
    );
  } catch (error) {
    redirect("/" + contentType);
  }
};

export default PostPage;
