"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CheckCircle, Copy, ExternalLink } from "lucide-react";
import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

// Helper function to generate heading IDs
const generateId = (text: string): string => {
  if (typeof text !== "string") {
    return "";
  }
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
};

// Extract language from className
const getLanguage = (className: string): string => {
  const match = className?.match(/language-(\w+)/);
  return match ? match[1] : "text";
};

// Extract text content from React children recursively
const extractTextContent = (children: any): string => {
  if (typeof children === "string") {
    return children;
  }

  if (typeof children === "number") {
    return children.toString();
  }

  if (Array.isArray(children)) {
    return children.map(extractTextContent).join("");
  }

  if (React.isValidElement(children)) {
    return extractTextContent((children.props as any).children);
  }

  return "";
};

// Copy Button Component
const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-8 w-8 p-0 hover:bg-muted transition-colors"
          >
            {copied ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{copied ? "Copied!" : "Copy code"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => {
      const id = generateId(String(children));
      return (
        <h1
          id={id}
          className="text-4xl md:text-5xl font-bold text-foreground mt-12 mb-8 first:mt-0 scroll-mt-24 leading-tight"
        >
          {children}
        </h1>
      );
    },
    h2: ({ children }) => {
      const id = generateId(String(children));
      return (
        <h2
          id={id}
          className="text-3xl font-bold text-foreground mt-12 mb-6 scroll-mt-24 leading-tight"
        >
          {children}
        </h2>
      );
    },
    h3: ({ children }) => {
      const id = generateId(String(children));
      return (
        <h3
          id={id}
          className="text-2xl font-semibold text-foreground mt-10 mb-4 scroll-mt-24 leading-tight"
        >
          {children}
        </h3>
      );
    },
    h4: ({ children }) => {
      const id = generateId(String(children));
      return (
        <h4
          id={id}
          className="text-xl font-semibold text-foreground mt-8 mb-3 scroll-mt-24 leading-tight"
        >
          {children}
        </h4>
      );
    },
    h5: ({ children }) => {
      const id = generateId(String(children));
      return (
        <h5
          id={id}
          className="text-lg font-semibold text-foreground mt-6 mb-3 scroll-mt-24 leading-tight"
        >
          {children}
        </h5>
      );
    },
    h6: ({ children }) => {
      const id = generateId(String(children));
      return (
        <h6
          id={id}
          className="text-base font-semibold text-foreground mt-6 mb-2 scroll-mt-24 leading-tight uppercase tracking-wide"
        >
          {children}
        </h6>
      );
    },
    p: ({ children }) => (
      <p className="mb-6 leading-relaxed text-foreground/90 text-base">
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-outside mb-6 ml-6 space-y-2 text-foreground marker:text-primary">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-outside mb-6 ml-6 space-y-2 text-foreground marker:text-primary marker:font-medium">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="leading-relaxed pl-1">{children}</li>,
    blockquote: ({ children }) => (
      <div className="my-8 pl-6 border-l-4 border-primary/60 bg-muted/50 py-4 pr-4 rounded-r-lg">
        <div className="italic text-foreground/90 text-lg leading-relaxed">
          {children}
        </div>
      </div>
    ),
    pre: ({ children }) => {
      // Extract code content and language properly
      let codeText = "";
      let language = "text";

      // Handle different types of children structures
      if (React.isValidElement(children)) {
        const codeElement = children;
        const props = codeElement.props as any;

        // Extract language from className
        if (props.className) {
          language = getLanguage(props.className);
        }

        // Extract text content recursively
        codeText = extractTextContent(props.children);
      } else if (Array.isArray(children)) {
        // Find the code element in the array
        const codeElement = children.find(
          (child) => React.isValidElement(child) && child.type === "code"
        );

        if (React.isValidElement(codeElement)) {
          const props = codeElement.props as any;
          if (props.className) {
            language = getLanguage(props.className);
          }
          codeText = extractTextContent(props.children);
        } else {
          // Fallback: extract from all children
          codeText = extractTextContent(children);
        }
      } else {
        // Fallback for other cases
        codeText = extractTextContent(children);
      }

      // Choose theme based on dark mode
      const syntaxTheme = oneDark;

      return (
        <Card className="overflow-hidden shadow-sm border border-border/50 py-0">
          <CardContent className="p-0">
            {/* Safari-style header */}
            <div className="flex items-center justify-between bg-muted px-4 py-3 border-b border-border/50">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">
                  {language === "text" ? "Code" : language.toUpperCase()}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Copy Button */}
                <CopyButton text={codeText.trim()} />
              </div>
            </div>

            {/* Code content */}
            <div className="relative">
              <SyntaxHighlighter
                language={language}
                style={syntaxTheme}
                customStyle={{
                  margin: 0,
                  padding: "1.5rem",
                  fontSize: "0.875rem",
                  lineHeight: "1.6",
                  fontFamily:
                    "ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace",
                }}
                showLineNumbers={true}
                wrapLongLines={true}
              >
                {codeText.trim()}
              </SyntaxHighlighter>
            </div>
          </CardContent>
        </Card>
      );
    },
    code: ({ children, className }) => {
      const isInline = !className;

      if (isInline) {
        return (
          <Badge
            variant="secondary"
            className="text-sm px-2 py-1 bg-muted text-primary font-medium rounded-md"
          >
            {children}
          </Badge>
        );
      }

      // For code blocks, this will be handled by the pre component
      return <code className={className}>{children}</code>;
    },
    a: ({ children, href }) => {
      const isExternal = href?.startsWith("http");
      return (
        <a
          href={href}
          className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors font-medium inline-flex items-center gap-1"
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
        >
          {children}
          {isExternal && <ExternalLink className="h-3 w-3" />}
        </a>
      );
    },
    strong: ({ children }) => (
      <strong className="font-bold text-foreground">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-foreground">{children}</em>
    ),
    hr: () => <Separator className="my-12" />,
    table: ({ children }) => (
      <div className="my-8 overflow-x-auto">
        <Card className="shadow-sm">
          <CardContent className="p-0">
            <table className="min-w-full">{children}</table>
          </CardContent>
        </Card>
      </div>
    ),
    thead: ({ children }) => <thead className="bg-muted">{children}</thead>,
    tbody: ({ children }) => (
      <tbody className="divide-y divide-border/50">{children}</tbody>
    ),
    tr: ({ children }) => (
      <tr className="hover:bg-muted/50 transition-colors">{children}</tr>
    ),
    th: ({ children }) => (
      <th className="px-6 py-4 text-left font-semibold text-foreground text-sm">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-6 py-4 text-foreground text-sm leading-relaxed">
        {children}
      </td>
    ),
    // Custom components for better visuals
    img: ({ src, alt, ...props }) => (
      <figure className="my-8">
        <Card className="overflow-hidden shadow-sm">
          <CardContent className="p-0">
            <Image
              src={src}
              alt={alt}
              width={1000}
              height={1000}
              className="w-full h-auto object-cover"
              loading="lazy"
              {...props}
            />
          </CardContent>
        </Card>
        {alt && (
          <figcaption className="mt-3 text-center text-sm text-muted-foreground italic">
            {alt}
          </figcaption>
        )}
      </figure>
    ),
    ...components,
  };
}
