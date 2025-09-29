import Wrapper from "@/components/chromaui/section/wrapper/component";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";

interface FooterBottomProps {
  config: {
    copyright?: string;
    legalLinks: Array<{ name: string; href: string; external?: boolean }>;
    showLegalLinks?: boolean;
  };
}

export const FooterBottom = ({ config }: FooterBottomProps) => {
  const { copyright, legalLinks, showLegalLinks = true } = config;

  if (!showLegalLinks && !copyright) {
    return null;
  }

  return (
    <div className="pb-1 bg-primary text-primary-foreground">
      <Wrapper className="flex justify-between flex-col lg:flex-row -space-y-1 items-center">
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
          </ul>
        </div>
      </Wrapper>
    </div>
  );
};
