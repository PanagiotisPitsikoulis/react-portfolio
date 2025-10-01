import { ContentType, getContent } from "@/lib/md/mdx";
import { serializeMDXServer } from "@/lib/md/ssr-serialize";
import { redirect } from "next/navigation";
import { ProjectPage } from "./project-page";
import { Content4 } from "./index.client";

const PostPage = async ({
  slug,
  contentType,
}: {
  slug: string;
  contentType: ContentType;
}) => {
  const post = await getContent(contentType, slug);
  if (!post) {
    throw new Error("Post not found");
  }

  const mdx = await serializeMDXServer(post.body);

  return <Content4 />;
};

export default PostPage;
