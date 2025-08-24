import Link from "next/link";
import { ContentType, listContent } from "@/lib/mdx";
import { siteMetadata } from "@/lib/data";
import SectionHeading from "@/components/section-heading";
import Image from "next/image";
import PostViewerClient from "./post-viewer-client";

export default async function PostViewer(props: {
  contentType: ContentType;
  title: string;
  description: string;
}) {
  const posts = await listContent(props.contentType);

  const images = [
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random14.jpeg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw9.jpeg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random11.jpeg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/landscape5.jpeg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random15.jpeg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw4.jpeg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw5.jpeg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw6.jpeg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw7.jpeg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw8.jpeg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/person1.jpeg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/person2.jpeg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/person3.jpeg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random1.jpeg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random11.jpeg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw1.jpeg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random3.jpeg",
  ];

  return <PostViewerClient {...props} posts={posts} images={images} />;
}
