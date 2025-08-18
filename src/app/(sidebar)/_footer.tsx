import { ArrowUpRight } from "lucide-react";
import { VideoText } from "@/components/magicui/video-text";

const Footer = () => {
  const navigation = [
    { name: "Product", href: "#" },
    { name: "About Us", href: "#" },
    { name: "Pricing", href: "#" },
    { name: "FAQ", href: "#" },
    { name: "Contact", href: "#" },
  ];

  const social = [
    { name: "Twitter", href: "#" },
    { name: "LinkedIn", href: "#" },
  ];

  const legal = [{ name: "Privacy Policy", href: "#" }];

  return (
    <section className="flex flex-col items-center gap-14 pb-10 pt-12 bg-black rounded-b-xl rounded-t-4xl border dark:bg-background">
      <nav className="container flex flex-col items-center gap-4">
        <ul className="flex flex-wrap items-center justify-center gap-6 px-6 text-white">
          {navigation.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="font-medium transition-opacity hover:opacity-75"
              >
                {item.name}
              </a>
            </li>
          ))}
          {social.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="flex items-center gap-0.5 font-medium transition-opacity hover:opacity-75"
              >
                {item.name} <ArrowUpRight className="size-4" />
              </a>
            </li>
          ))}
        </ul>
        <ul className="flex flex-wrap items-center justify-center gap-6">
          {legal.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="text-sm text-stone-400 hover:opacity-75"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="relative h-[250px] w-full overflow-hidden">
        <VideoText src="https://videos.pexels.com/video-files/2081238/2081238-uhd_2560_1440_24fps.mp4">
          Panos
        </VideoText>
      </div>
    </section>
  );
};

export default Footer;
