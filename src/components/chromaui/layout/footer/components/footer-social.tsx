import Link from "next/link";

interface FooterSocialProps {
  socialLinks: Array<{
    label: string;
    href: string;
    external?: boolean;
    icon?: React.ReactNode;
  }>;
}

export const FooterSocial = ({ socialLinks }: FooterSocialProps) => {
  if (socialLinks.length === 0) return null;

  return (
    <div>
      <h4 className="mb-2 text-base font-semibold text-foreground">Follow</h4>
      <nav aria-label="Social links">
        <ul className="space-y-2 text-sm text-muted-foreground">
          {socialLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                rel="noopener noreferrer"
                target={
                  link.external || link.href.startsWith("http") ?
                    "_blank"
                  : undefined
                }
                className="hover:text-primary transition-colors flex items-center gap-2"
              >
                {link.icon}
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
