import { Check } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { contactPageData } from "../../../content/data/contact-page";

const Contact = () => {
  return (
    <section className="relative page-container pb-32 z-40">
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-x-0 -top-20 -bottom-20 bg-[radial-gradient(ellipse_35%_15%_at_40%_55%,hsl(var(--accent))_0%,transparent_100%)] lg:bg-[radial-gradient(ellipse_12%_20%_at_60%_45%,hsl(var(--accent))_0%,transparent_100%)]"></div>
      <div className="pointer-events-none absolute inset-x-0 -top-20 -bottom-20 bg-[radial-gradient(ellipse_35%_20%_at_70%_75%,hsl(var(--accent))_0%,transparent_80%)] lg:bg-[radial-gradient(ellipse_15%_30%_at_70%_65%,hsl(var(--accent))_0%,transparent_80%)]"></div>
      {/* Background pattern */}
      <div className="pointer-events-none absolute inset-x-0 -top-20 -bottom-20 bg-[radial-gradient(hsl(var(--accent-foreground)/0.1)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_60%_at_65%_50%,#000_0%,transparent_80%)] [background-size:8px_8px]"></div>
      <div className="grid w-full grid-cols-1 gap-x-32 overflow-hidden lg:grid-cols-2">
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
            <div className="space-y-16 pb-20 lg:pb-0">
              <div className="space-y-6">
                <div className="mt-16 flex overflow-hidden">
                  {contactPageData.avatars.map((a, idx) => (
                    <Avatar
                      key={a.src}
                      className={idx === 0 ? "size-11" : "-ml-4 size-11"}
                    >
                      <AvatarImage src={a.src} />
                      <AvatarFallback>{a.fallback}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
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
              {/* logos removed */}
            </div>
          </div>
        </div>
        <div className="flex w-full lg:mt-2.5">
          <div className="relative flex w-full flex-col overflow-visible">
            <form className="z-10 space-y-6">
              <div className="w-full space-y-6 rounded-xl border border-border bg-background px-6 py-10 shadow-sm">
                <div>
                  <div className="mb-2.5 text-sm font-medium">
                    <label htmlFor="fullName">
                      {contactPageData.form.labels.fullName}
                    </label>
                  </div>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="Joe Average"
                  />
                </div>
                <div>
                  <div className="mb-2.5 text-sm font-medium">
                    <label htmlFor="company">
                      {contactPageData.form.labels.company}
                    </label>
                  </div>
                  <Input id="company" name="company" placeholder="Acme Corp" />
                </div>
                <div>
                  <div className="mb-2.5 text-sm font-medium">
                    <label htmlFor="phone">
                      {contactPageData.form.labels.phone}
                    </label>
                  </div>
                  <Input id="phone" name="phone" placeholder="12 3456 7890" />
                </div>
                <div>
                  <div className="mb-2.5 text-sm font-medium">
                    <label htmlFor="email">
                      {contactPageData.form.labels.email}
                    </label>
                  </div>
                  <Input
                    id="email"
                    name="email"
                    placeholder="name@company.com"
                  />
                </div>
                <div>
                  <div className="mb-2.5 text-sm font-medium">
                    <label htmlFor="country">
                      {contactPageData.form.labels.country}
                    </label>
                  </div>
                  <Select>
                    <SelectTrigger id="country" name="country">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {contactPageData.form.countries.map((c) => (
                        <SelectItem key={c.value} value={c.value}>
                          {c.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <div className="mb-2.5 text-sm font-medium">
                    <label htmlFor="companySize">
                      {contactPageData.form.labels.companySize}
                    </label>
                  </div>
                  <Select>
                    <SelectTrigger id="companySize" name="companySize">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {contactPageData.form.companySizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <div className="mb-2.5 text-sm font-medium">
                    <label htmlFor="id">
                      {contactPageData.form.labels.referral}{" "}
                      <span className="text-muted-foreground">(Optional)</span>
                    </label>
                  </div>
                  <Select>
                    <SelectTrigger id="referral" name="referral">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {contactPageData.form.referrals.map((r) => (
                        <SelectItem key={r.value} value={r.value}>
                          {r.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex w-full flex-col justify-end space-y-3 pt-2">
                  <Button type="submit">
                    {contactPageData.form.labels.cta}
                  </Button>
                  <div className="text-xs text-muted-foreground">
                    {contactPageData.form.labels.privacyPrefix}
                    <a href="#" className="underline">
                      {contactPageData.form.labels.privacyLinkLabel}
                    </a>
                    .
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
