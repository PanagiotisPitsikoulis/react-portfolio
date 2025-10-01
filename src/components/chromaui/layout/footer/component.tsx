import React from "react";
import { FooterBottom } from "./components/footer-bottom";
import { FooterBrand } from "./components/footer-brand";
import { FooterColumns } from "./components/footer-columns";
import { FooterCommandBar } from "./components/footer-command-bar";
import { FooterSocial } from "./components/footer-social";
import Wrapper from "../../section/wrapper/component";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { theme } from "../../themes";

interface FooterConfig {
  // Branding
  logo?: React.ReactNode;
  brandName?: string;
  brandUrl?: string;

  // Content
  columns: Array<{
    title: string;
    items: Array<{ label: string; href: string; external?: boolean }>;
    fallback?: { label: string; href: string; external?: boolean };
  }>;
  socialLinks: Array<{
    label: string;
    href: string;
    external?: boolean;
    icon?: React.ReactNode;
  }>;
  legalLinks: Array<{ name: string; href: string; external?: boolean }>;
  copyright: string;

  // Features
  showCommandBar?: boolean;
  showThemeToggle?: boolean;
  showSocialLinks?: boolean;
  showLegalLinks?: boolean;

  // Styling
  className?: string;

  // Layout
  showBottomBar?: boolean;
}

interface FooterProps {
  config: FooterConfig;
  projects?: Array<{ title: string; url: string }>;
  blog?: Array<{ title: string; url: string }>;
}

export const Footer = ({ config, projects = [], blog = [] }: FooterProps) => {
  const {
    columns,
    socialLinks,
    showCommandBar = true,
    showSocialLinks = true,
    showBottomBar = true,
    className = "",
  } = config;

  return (
    <footer
      style={theme.primary}
      className={cn(`w-full bg-background relative`, className)}
    >
      <Wrapper>
        <div
          className={`grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-12 gap-4 lg:gap-6 py-12 w-full`}
        >
          {/* Logo + Command bar + Theme Toggle */}
          <div className="flex flex-row gap-3 w-full mb-5 items-center justify-between col-span-full">
            <div className="flex flex-row gap-3 items-center">
              <FooterBrand config={config} />
              {showCommandBar && (
                <FooterCommandBar projects={projects} blog={blog} />
              )}
            </div>
            {config.showThemeToggle && (
              <div className="flex-shrink-0">
                <ThemeToggle />
              </div>
            )}
          </div>

          {/* Columns */}
          <div className="grid grid-cols-2 w-full gap-12 lg:gap-0 md:grid-cols-4 col-span-full lg:col-span-full">
            {/* Social Links */}
            {showSocialLinks && <FooterSocial socialLinks={socialLinks} />}

            {/* Dynamic Columns */}
            <FooterColumns columns={columns} />
          </div>
        </div>
      </Wrapper>

      {/* Bottom bar */}
      {showBottomBar && <FooterBottom config={config} />}
    </footer>
  );
};
