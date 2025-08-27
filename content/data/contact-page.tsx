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
  title: "Book free demo now",
  description:
    "In non libero bibendum odio pellentesque ullamcorper. Aenean condimentum, dolor commodo pulvinar bibendum.",
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
    "Detailed product presentation tailored to you",
    "Consulting on your messaging strategy",
    "Answers to all the questions you have",
  ],
  form: {
    labels: {
      fullName: "Full name",
      company: "Company",
      phone: "Phone number",
      email: "Email (business)",
      country: "Country",
      companySize: "Company size",
      referral: "How did you hear about us?",
      cta: "Book demo",
      privacyPrefix:
        "For more information about how we handle your personal information, please visit our ",
      privacyLinkLabel: "privacy policy",
    },
    countries: [{ value: "aus", label: "Australia" }],
    companySizes: ["1-10", "11-50", "51-200", "200+"],
    referrals: [{ value: "search", label: "Web Search" }],
  },
};
