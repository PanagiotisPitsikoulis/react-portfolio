import { Check } from "lucide-react";
import Image from "next/image";

import { sendContact } from "@/app/(main)/contact/actions";
import { contactPageData } from "../../../content/data/contact-page";
import ContactForm from "./form-client";

const Contact = () => {
  return (
    <section className="relative page-container pb-32 z-40 mt-16">
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-x-0 -top-20 -bottom-20 bg-[radial-gradient(ellipse_35%_15%_at_40%_55%,hsl(var(--accent))_0%,transparent_100%)] lg:bg-[radial-gradient(ellipse_12%_20%_at_60%_45%,hsl(var(--accent))_0%,transparent_100%)]"></div>
      <div className="pointer-events-none absolute inset-x-0 -top-20 -bottom-20 bg-[radial-gradient(ellipse_35%_20%_at_70%_75%,hsl(var(--accent))_0%,transparent_80%)] lg:bg-[radial-gradient(ellipse_15%_30%_at_70%_65%,hsl(var(--accent))_0%,transparent_80%)]"></div>
      {/* Background pattern */}
      <div className="pointer-events-none absolute inset-x-0 -top-20 -bottom-20 bg-[radial-gradient(hsl(var(--accent-foreground)/0.1)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_60%_at_65%_50%,#000_0%,transparent_80%)] [background-size:8px_8px]"></div>
      <div className="grid w-full grid-cols-1 gap-x-12 overflow-hidden lg:grid-cols-2">
        <div className="w-full pb-10 md:space-y-10 md:pb-0">
          <div className="space-y-4">
            <h1 className="text-4xl font-medium lg:text-5xl">
              {contactPageData.title}
            </h1>
            <div className="text-muted-foreground md:text-base lg:text-lg lg:leading-7">
              {contactPageData.description}
            </div>
          </div>
          <div className="hidden md:block">
            <div className="space-y-8 pb-12 lg:pb-0">
              <div className="space-y-4">
                <p className="text-sm font-semibold">What you can expect:</p>
                {contactPageData.expectations.map((item) => (
                  <div key={item} className="flex items-center space-x-2.5">
                    <Check className="size-5 shrink-0 text-muted-foreground" />
                    <p className="text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="relative mt-8 flex w-full flex-col overflow-visible md:mt-0">
            <ContactForm action={sendContact} />
          </div>
        </div>
        <div className="relative hidden w-full lg:mt-2.5 lg:block">
          <div className="relative h-full min-h-[560px] w-full overflow-hidden rounded-xl border border-border shadow-sm">
            <Image
              src="/images/Texture and Color Contrast.png"
              alt="Background texture"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-background/20 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
