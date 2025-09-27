import { AppIcon } from "@/components/app-icon";
import Link from "next/link";

export const NavbarBrand = () => {
  return (
    <Link href="/" className="flex items-center cursor-pointer">
      <AppIcon />
    </Link>
  );
};
