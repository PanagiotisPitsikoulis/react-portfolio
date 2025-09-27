import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";

interface FooterBottomProps {
  config: {
    copyright?: string;
    legalLinks: Array<{ name: string; href: string; external?: boolean }>;
    showThemeToggle?: boolean;
    showLegalLinks?: boolean;
  };
}

export const FooterBottom = ({ config }: FooterBottomProps) => {
  const {
    copyright,
    legalLinks,
    showThemeToggle = true,
    showLegalLinks = true,
  } = config;

  if (!showThemeToggle && !showLegalLinks && !copyright) {
    return null;
  }

  return (
    <div className="py-1 bg-primary text-primary-foreground">
      <div className="flex justify-between flex-col lg:flex-row gap-2 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 items-center">
        {copyright && <span className="text-xs">{copyright}</span>}
        <div className="flex items-center gap-4">
          <ul className="flex items-center gap-2">
            {showLegalLinks &&
              legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs hover:underline underline-offset-2"
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            {showThemeToggle && (
              <li>
                <ThemeToggle />
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
