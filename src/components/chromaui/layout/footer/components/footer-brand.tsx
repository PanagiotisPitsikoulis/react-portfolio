import { AppIcon } from "@/components/app-icon";
import Link from "next/link";

interface FooterBrandProps {
  config: {
    logo?: React.ReactNode;
    brandName?: string;
    brandUrl?: string;
  };
}

export const FooterBrand = ({ config }: FooterBrandProps) => {
  const { logo, brandName, brandUrl = "/" } = config;

  return (
    <Link
      href={brandUrl}
      className="flex justify-start rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label={brandName ? `Back to ${brandName}` : "Back to Home"}
      title={brandName ? `Back to ${brandName}` : "Back to Home"}
    >
      {logo || <AppIcon />}
    </Link>
  );
};
