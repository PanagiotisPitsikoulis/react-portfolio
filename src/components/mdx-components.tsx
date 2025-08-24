"use client";

import * as React from "react";
import type { MDXComponents as MDXComponentsMap } from "mdx/types";
import Link from "next/link";
import { cn } from "@/lib/utils";

// shadcn/ui primitives
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableFooter,
  TableRow,
} from "@/components/ui/table";

type MDXComponentProps = React.HTMLAttributes<HTMLElement> & {
  className?: string;
};

function AnchorTag(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isExternal = props.href?.startsWith("http");
  return (
    <Link
      href={props.href || "#"}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={cn(
        "text-primary underline underline-offset-4 hover:decoration-2",
        props.className,
      )}
    >
      {props.children}
    </Link>
  );
}

function Paragraph({ className, ...props }: MDXComponentProps) {
  return (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  );
}

function Heading({
  level,
  className,
  ...props
}: MDXComponentProps & { level: 1 | 2 | 3 | 4 | 5 | 6 }) {
  const Tag = `h${level}` as unknown as any;
  const base =
    level === 1
      ? "mt-10 scroll-m-20 text-4xl/tight font-bold"
      : level === 2
        ? "mt-10 scroll-m-20 text-3xl/tight font-semibold"
        : level === 3
          ? "mt-8 scroll-m-20 text-2xl/tight font-semibold"
          : level === 4
            ? "mt-8 scroll-m-20 text-xl/tight font-semibold"
            : level === 5
              ? "mt-6 scroll-m-20 text-lg/tight font-semibold"
              : "mt-6 scroll-m-20 text-base/tight font-semibold";
  return <Tag className={cn(base, className)} {...props} />;
}

function List({ className, ...props }: MDXComponentProps) {
  return (
    <ul
      className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)}
      {...props}
    />
  );
}

function OrderedList({ className, ...props }: MDXComponentProps) {
  return (
    <ol
      className={cn("my-6 ml-6 list-decimal [&>li]:mt-2", className)}
      {...props}
    />
  );
}

function Blockquote({ className, ...props }: MDXComponentProps) {
  return (
    <blockquote
      className={cn(
        "mt-6 border-l-2 pl-6 italic text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

function InlineCode({ className, ...props }: MDXComponentProps) {
  return (
    <code
      className={cn(
        "bg-muted rounded px-1.5 py-0.5 font-mono text-[0.85em]",
        className,
      )}
      {...props}
    />
  );
}

function Pre({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) {
  // Keep it simple; syntax highlighting can be handled by rehype-pretty-code styles
  return (
    <pre
      className={cn(
        "bg-muted/50 relative mt-6 overflow-x-auto rounded-md border p-4",
        className,
      )}
      {...props}
    />
  );
}

function HorizontalRule(props: React.HTMLAttributes<HTMLHRElement>) {
  return <hr className="my-8 border-t" {...props} />;
}

function ImageTag(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    // Using img for flexibility with MDX content dimensions
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={props.alt || ""}
      className={cn("rounded-md border", props.className)}
      {...props}
    />
  );
}

// Convenience component to render callouts from MDX
function Callout({
  title,
  children,
  variant = "default",
  className,
}: {
  title?: React.ReactNode;
  children?: React.ReactNode;
  variant?: "default" | "destructive";
  className?: string;
}) {
  return (
    <Alert variant={variant} className={cn("my-6", className)}>
      {title ? <AlertTitle>{title}</AlertTitle> : null}
      {children ? <AlertDescription>{children}</AlertDescription> : null}
    </Alert>
  );
}

// MDX components map
export const mdxComponents = {
  h1: (props: MDXComponentProps) => <Heading level={1} {...props} />,
  h2: (props: MDXComponentProps) => <Heading level={2} {...props} />,
  h3: (props: MDXComponentProps) => <Heading level={3} {...props} />,
  h4: (props: MDXComponentProps) => <Heading level={4} {...props} />,
  h5: (props: MDXComponentProps) => <Heading level={5} {...props} />,
  h6: (props: MDXComponentProps) => <Heading level={6} {...props} />,
  p: Paragraph,
  a: AnchorTag,
  ul: List,
  ol: OrderedList,
  li: (props: MDXComponentProps) => (
    <li className={cn("mt-2", props.className)} {...props} />
  ),
  blockquote: Blockquote,
  hr: HorizontalRule,
  img: ImageTag,
  code: InlineCode,
  pre: Pre,
  // Tables
  table: (props: React.ComponentProps<typeof Table>) => <Table {...props} />,
  thead: (props: React.ComponentProps<typeof TableHeader>) => (
    <TableHeader {...props} />
  ),
  tbody: (props: React.ComponentProps<typeof TableBody>) => (
    <TableBody {...props} />
  ),
  tfoot: (props: React.ComponentProps<typeof TableFooter>) => (
    <TableFooter {...props} />
  ),
  tr: (props: React.ComponentProps<typeof TableRow>) => <TableRow {...props} />,
  th: (props: React.ComponentProps<typeof TableHead>) => (
    <TableHead {...props} />
  ),
  td: (props: React.ComponentProps<typeof TableCell>) => (
    <TableCell {...props} />
  ),
  caption: (props: React.ComponentProps<typeof TableCaption>) => (
    <TableCaption {...props} />
  ),
  // Callouts
  Callout,
} as const;

// For @mdx-js/react provider integration
export function useMDXComponents(
  components: MDXComponentsMap,
): MDXComponentsMap {
  return { ...(mdxComponents as unknown as MDXComponentsMap), ...components };
}
