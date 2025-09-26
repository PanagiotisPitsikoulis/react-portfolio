import { IconCloud } from "@/components/ui/icon-cloud";

export function TechCloud({ tech }: { tech: string[] }) {
  const images = tech.map((slug) => {
    const cleanSlug = slug.toLowerCase;
    return `https://cdn.simpleicons.org/${slug}/${slug}`;
  });

  return (
    <div className="relative flex size-full items-center justify-center overflow-hidden h-[20rem] bg-secondary shadow rounded-3xl">
      <IconCloud images={images} />
    </div>
  );
}
