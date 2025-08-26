import { Button } from "@/components/ui/button";
import { ContentItem, ContentType } from "@/lib/mdx";
import PostCard from "./post-card";

const PostCards = ({
  posts,
  contentType,
}: {
  posts: ContentItem[];
  contentType: ContentType;
}) => {
  return (
    <section>
      <div>
        <div className="grid gap-x-4 gap-y-8 md:grid-cols-2 lg:gap-x-6 lg:gap-y-12 2xl:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} contentType={contentType} />
          ))}
        </div>
        <div className="mt-8 flex flex-col items-center py-2 md:hidden">
          <Button className="w-full sm:w-fit">
            View all {contentType === "blog" ? "posts" : "projects"}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PostCards;
