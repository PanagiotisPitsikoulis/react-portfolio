import { FooterBottom } from "./components/footer-bottom";
import { FooterBrand } from "./components/footer-brand";
import { FooterColumns } from "./components/footer-columns";
import { FooterCommandBar } from "./components/footer-command-bar";
import { FooterSocial } from "./components/footer-social";

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
  maxWidth?: string;
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
    maxWidth = "max-w-6xl",
    showBottomBar = true,
    className = "",
  } = config;

  return (
    <footer className={`w-full bg-background relative ${className}`}>
      <div className={`mx-auto ${maxWidth} px-4 sm:px-6 lg:px-8`}>
        <div
          className={`grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-12 gap-4 lg:gap-6 py-12 w-full`}
        >
          {/* Logo + Command bar */}
          <div className="col-span-full lg:col-span-4 flex flex-col gap-10">
            <div className="flex flex-row gap-3 w-full mb-5">
              <FooterBrand config={config} />
              {showCommandBar && (
                <FooterCommandBar projects={projects} blog={blog} />
              )}
            </div>
          </div>

          {/* Columns */}
          <div className="grid grid-cols-2 w-full gap-6 md:grid-cols-4 lg:gap-12 col-span-full lg:col-span-full">
            {/* Social Links */}
            {showSocialLinks && <FooterSocial socialLinks={socialLinks} />}

            {/* Dynamic Columns */}
            <FooterColumns columns={columns} />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      {showBottomBar && <FooterBottom config={config} />}
    </footer>
  );
};
