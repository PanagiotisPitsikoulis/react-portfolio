import Link from "next/link";

interface FooterColumn {
  title: string;
  items: Array<{ label: string; href: string; external?: boolean }>;
  fallback?: { label: string; href: string; external?: boolean };
}

interface FooterColumnsProps {
  columns: FooterColumn[];
}

export const FooterColumns = ({ columns }: FooterColumnsProps) => {
  return (
    <>
      {columns.map((col) => (
        <div key={col.title} className="text-left">
          <h4 className="mb-2 text-base font-semibold text-foreground">
            {col.title}
          </h4>
          <ul className="text-sm text-muted-foreground space-y-2">
            {col.items.length > 0 ?
              col.items.map((item) => (
                <li key={item.href} className="hover:text-primary">
                  <Link
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))
            : col.fallback ?
              <li className="hover:text-primary">
                <Link
                  href={col.fallback.href}
                  target={col.fallback.external ? "_blank" : undefined}
                  rel={
                    col.fallback.external ? "noopener noreferrer" : undefined
                  }
                >
                  {col.fallback.label}
                </Link>
              </li>
            : null}
          </ul>
        </div>
      ))}
    </>
  );
};
