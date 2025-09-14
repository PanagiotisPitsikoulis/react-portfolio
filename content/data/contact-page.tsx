export interface ContactPageData {
  title: string;
  description: string;
  avatars: { src: string; fallback: string }[];
  expectations: string[];
  form: {
    labels: {
      fullName: string;
      company: string;
      phone: string;
      email: string;
      message: string;
      country: string;
      companySize: string;
      referral: string;
      cta: string;
      privacyPrefix: string;
      privacyLinkLabel: string;
    };
    countries: { value: string; label: string }[];
    companySizes: string[];
    referrals: { value: string; label: string }[];
  };
}

export const contactPageData: ContactPageData = {
  title: "Let's build something great",
  description:
    "I design and ship fast, accessible web apps with Next.js and TypeScript. Share a few details about your project and I'll get back within 24–48 hours.",
  avatars: [
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
      fallback: "SB",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
      fallback: "RA",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
      fallback: "JS",
    },
  ],
  expectations: [
    "Personal reply (no bots or templates)",
    "Initial assessment with rough timeline",
    "Clear next steps — no spam, no pressure",
  ],
  form: {
    labels: {
      fullName: "Your name",
      company: "Company or organization",
      phone: "Phone (optional)",
      email: "Email",
      message: "Message",
      country: "Country",
      companySize: "Company size",
      referral: "How did you find me?",
      cta: "Send message",
      privacyPrefix:
        "For more information about how we handle your personal information, please visit our ",
      privacyLinkLabel: "privacy policy",
    },
    countries: [
      { value: "us", label: "United States" },
      { value: "uk", label: "United Kingdom" },
      { value: "de", label: "Germany" },
      { value: "gr", label: "Greece" },
      { value: "au", label: "Australia" },
      { value: "ca", label: "Canada" },
      { value: "other", label: "Other" },
    ],
    companySizes: ["Just me", "2-10", "11-50", "51-200", "200+"],
    referrals: [
      { value: "search", label: "Web search" },
      { value: "linkedin", label: "LinkedIn" },
      { value: "github", label: "GitHub" },
      { value: "twitter", label: "X/Twitter" },
      { value: "friend", label: "Friend/colleague" },
      { value: "portfolio", label: "This portfolio" },
    ],
  },
};
