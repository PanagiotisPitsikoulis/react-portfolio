import { SectionDivider } from "@/components/section-divider";
import SectionHeading from "@/components/section-heading";
import { cn } from "@/lib/utils";

export interface SectionProps {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  className?: string;
  children: React.ReactNode;
}

export function Section({
  id,
  label,
  title,
  subtitle,
  className,
  children,
}: SectionProps) {
  return (
    <section id={id} className={cn(className)}>
      <SectionDivider label={label} />
      <div>
        <SectionHeading>
          <>{title}</>
          <>{subtitle}</>
        </SectionHeading>
        {children}
      </div>
    </section>
  );
}
