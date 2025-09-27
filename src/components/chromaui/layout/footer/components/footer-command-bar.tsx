import CommandBar from "@/components/command-bar";

export const FooterCommandBar = ({
  projects = [],
  blog = [],
}: {
  projects?: Array<{ title: string; url: string }>;
  blog?: Array<{ title: string; url: string }>;
}) => {
  return (
    <section
      className="flex flex-col w-full"
      aria-labelledby="footer-primary-heading"
    >
      <h2 id="footer-primary-heading" className="sr-only">
        Quick find
      </h2>
      <CommandBar projects={projects} blog={blog} />
    </section>
  );
};
