import { ContentType, listContent } from "@/lib/mdx";
import { Suspense } from "react";
import PostViewerClient from "./post-viewer-client";

export default async function PostViewer(props: {
  contentType: ContentType;
  title: string;
  description: string;
}) {
  const posts = await listContent(props.contentType);

  return (
    <Suspense fallback={<></>}>
      <PostViewerClient {...props} posts={posts} />
    </Suspense>
  );
}
