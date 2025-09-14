"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import type { ContactFormResult } from "@/app/(main)/contact/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { contactPageData } from "../../../content/data/contact-page";

export default function ContactForm({
  action,
}: {
  action: (formData: FormData) => Promise<ContactFormResult>;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(
    async (_prev: ContactFormResult, formData: FormData) => action(formData),
    { success: false, message: "" } as ContactFormResult
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!state) return;
    if (state.fieldErrors)
      setErrors(state.fieldErrors as Record<string, string>);
    if (state.success) {
      setErrors({});
      formRef.current?.reset();
      toast.success("Message sent. Thanks for reaching out!");
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="z-10">
      <Card className="w-full backdrop-blur supports-[backdrop-filter]:bg-background/60 bg-background/80">
        <CardContent className="space-y-6 px-6 py-8 md:px-8 md:py-10">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Field
              label={contactPageData.form.labels.fullName}
              name="fullName"
              error={errors.fullName}
            >
              <Input
                id="fullName"
                name="fullName"
                placeholder="Joe Average"
                autoComplete="name"
                aria-invalid={Boolean(errors.fullName)}
              />
            </Field>
            <Field
              label={contactPageData.form.labels.company}
              name="company"
              error={errors.company}
            >
              <Input
                id="company"
                name="company"
                placeholder="Acme Corp"
                aria-invalid={Boolean(errors.company)}
              />
            </Field>
            <Field
              label={contactPageData.form.labels.phone}
              name="phone"
              error={errors.phone}
            >
              <Input
                id="phone"
                name="phone"
                placeholder="12 3456 7890"
                autoComplete="tel"
                aria-invalid={Boolean(errors.phone)}
              />
            </Field>
            <Field
              label={contactPageData.form.labels.email}
              name="email"
              error={errors.email}
            >
              <Input
                id="email"
                name="email"
                placeholder="name@company.com"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
              />
            </Field>
          </div>
          <Field
            label={contactPageData.form.labels.message}
            name="message"
            error={errors.message}
          >
            <Textarea
              id="message"
              name="message"
              placeholder="Tell me a bit about your project"
              aria-invalid={Boolean(errors.message)}
            />
          </Field>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <Field
              label={contactPageData.form.labels.country}
              name="country"
              error={errors.country}
            >
              <Select name="country">
                <SelectTrigger id="country">
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
            </Field>
            <Field
              label={contactPageData.form.labels.companySize}
              name="companySize"
              error={errors.companySize}
            >
              <Select name="companySize">
                <SelectTrigger id="companySize">
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
            </Field>
            <Field
              label={contactPageData.form.labels.referral}
              name="referral"
              hint="(Optional)"
              error={errors.referral}
            >
              <Select name="referral">
                <SelectTrigger id="referral">
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
            </Field>
          </div>
          <div className="flex w-full flex-col justify-end space-y-3 pt-2">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Sending..." : contactPageData.form.labels.cta}
            </Button>
            <div className="text-xs text-muted-foreground">
              {contactPageData.form.labels.privacyPrefix}
              <a href="#" className="underline">
                {contactPageData.form.labels.privacyLinkLabel}
              </a>
              .
            </div>
            {state?.message ? (
              <p
                className={`text-xs ${
                  state.success ? "text-green-600" : "text-destructive"
                }`}
              >
                {state.message}
              </p>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </form>
  );
}

function Field({
  label,
  name,
  error,
  hint,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2.5 text-sm font-medium">
        <label htmlFor={name}>
          {label}{" "}
          {hint ? <span className="text-muted-foreground">{hint}</span> : null}
        </label>
      </div>
      {children}
      {error ? (
        <p className="mt-1.5 text-xs text-destructive">{error}</p>
      ) : null}
    </div>
  );
}
