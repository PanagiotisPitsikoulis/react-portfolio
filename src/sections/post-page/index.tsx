import { ChevronLeft } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import PostPageClient from "./post-page-client";
import { ContentItem, ContentType, getContent } from "@/lib/mdx";
import { redirect } from "next/navigation";
import { renderMarkdownToHtml } from "@/lib/markdown";

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

    return <PostPageClient post={post} contentType={contentType} />;
  } catch (error) {
    redirect("/" + contentType);
  }
};

export default PostPage;
