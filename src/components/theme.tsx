export type ThemeName =
  | "green"
  | "purple"
  | "orange"
  | "blue"
  | "red"
  | "monochrome";

export const themes: Record<ThemeName, string> = {
  green: `:root {
  --background: oklch(0.99 0.001 155);
  --foreground: oklch(0.12 0 0);
  --card: oklch(0.99 0 0);
  --card-foreground: oklch(0.12 0 0);
  --popover: oklch(0.99 0 0);
  --popover-foreground: oklch(0.12 0 0);
  --primary: oklch(0.4 0.18 155);
  --primary-foreground: oklch(0.98 0 0);
  --secondary: oklch(1 0 0);
  --secondary-foreground: oklch(0.2 0 0);
  --muted: oklch(0.95 0 0);
  --muted-foreground: oklch(0.4 0 0);
  --accent: oklch(0.85 0 0);
  --accent-foreground: oklch(0.12 0 0);
  --destructive: oklch(0.4 0.02 25);
  --border: oklch(0.95 0 0);
  --input: oklch(0.88 0 0);
  --ring: oklch(0.4 0.18 155);
  --chart-1: oklch(0.4 0.18 155);
  --chart-2: oklch(0.45 0.15 165);
  --chart-3: oklch(0.5 0.12 145);
  --chart-4: oklch(0.55 0.16 160);
  --chart-5: oklch(0.6 0.14 150);
  --sidebar: oklch(0.99 0 0);
  --sidebar-foreground: oklch(0.12 0 0);
  --sidebar-primary: oklch(0.4 0.18 155);
  --sidebar-primary-foreground: oklch(0.98 0 0);
  --sidebar-accent: oklch(0.85 0 0);
  --sidebar-accent-foreground: oklch(0.12 0 0);
  --sidebar-border: oklch(0.9 0 0);
  --sidebar-ring: oklch(0.4 0.18 155);
}
.dark {
  --background: oklch(0.08 0 0);
  --foreground: oklch(0.95 0 0);
  --card: oklch(0.12 0 0);
  --card-foreground: oklch(0.95 0 0);
  --popover: oklch(0.12 0 0);
  --popover-foreground: oklch(0.95 0 0);
  --primary: oklch(0.55 0.14 155);
  --primary-foreground: oklch(0.98 0 0);
  --secondary: oklch(0.16 0 0);
  --secondary-foreground: oklch(0.9 0 0);
  --muted: oklch(0.16 0 0);
  --muted-foreground: oklch(0.85 0 0);
  --accent: oklch(0.24 0 0);
  --accent-foreground: oklch(0.95 0 0);
  --destructive: oklch(0.55 0.02 25);
  --border: oklch(0.25 0 0 / 60%);
  --input: oklch(0.20 0 0 / 80%);
  --ring: oklch(0.55 0.14 155);
  --chart-1: oklch(0.55 0.14 155);
  --chart-2: oklch(0.6 0.12 165);
  --chart-3: oklch(0.65 0.1 145);
  --chart-4: oklch(0.7 0.13 160);
  --chart-5: oklch(0.75 0.11 150);
  --sidebar: oklch(0.12 0 0);
  --sidebar-foreground: oklch(0.95 0 0);
  --sidebar-primary: oklch(0.55 0.14 155);
  --sidebar-primary-foreground: oklch(0.98 0 0);
  --sidebar-accent: oklch(0.24 0 0);
  --sidebar-accent-foreground: oklch(0.95 0 0);
  --sidebar-border: oklch(0.25 0 0 / 60%);
  --sidebar-ring: oklch(0.55 0.14 155);
}`,
  purple: `:root {
  --background: oklch(0.99 0.001 285);
  --foreground: oklch(0.12 0 0);
  --card: oklch(0.99 0 0);
  --card-foreground: oklch(0.12 0 0);
  --popover: oklch(0.99 0 0);
  --popover-foreground: oklch(0.12 0 0);
  --primary: oklch(0.42 0.18 285);
  --primary-foreground: oklch(0.98 0 0);
  --secondary: oklch(1 0 0);
  --secondary-foreground: oklch(0.2 0 0);
  --muted: oklch(0.95 0 0);
  --muted-foreground: oklch(0.4 0 0);
  --accent: oklch(0.85 0 0);
  --accent-foreground: oklch(0.12 0 0);
  --destructive: oklch(0.4 0.02 25);
  --border: oklch(0.95 0 0);
  --input: oklch(0.88 0 0);
  --ring: oklch(0.42 0.18 285);
  --chart-1: oklch(0.42 0.18 285);
  --chart-2: oklch(0.47 0.15 295);
  --chart-3: oklch(0.52 0.12 275);
  --chart-4: oklch(0.57 0.16 290);
  --chart-5: oklch(0.62 0.14 280);
  --sidebar: oklch(0.99 0 0);
  --sidebar-foreground: oklch(0.12 0 0);
  --sidebar-primary: oklch(0.42 0.18 285);
  --sidebar-primary-foreground: oklch(0.98 0 0);
  --sidebar-accent: oklch(0.85 0 0);
  --sidebar-accent-foreground: oklch(0.12 0 0);
  --sidebar-border: oklch(0.9 0 0);
  --sidebar-ring: oklch(0.42 0.18 285);
}
.dark {
  --background: oklch(0.08 0 0);
  --foreground: oklch(0.95 0 0);
  --card: oklch(0.12 0 0);
  --card-foreground: oklch(0.95 0 0);
  --popover: oklch(0.12 0 0);
  --popover-foreground: oklch(0.95 0 0);
  --primary: oklch(0.58 0.14 285);
  --primary-foreground: oklch(0.98 0 0);
  --secondary: oklch(0.16 0 0);
  --secondary-foreground: oklch(0.9 0 0);
  --muted: oklch(0.16 0 0);
  --muted-foreground: oklch(0.85 0 0);
  --accent: oklch(0.24 0 0);
  --accent-foreground: oklch(0.95 0 0);
  --destructive: oklch(0.55 0.02 25);
  --border: oklch(0.25 0 0 / 60%);
  --input: oklch(0.20 0 0 / 80%);
  --ring: oklch(0.58 0.14 285);
  --chart-1: oklch(0.58 0.14 285);
  --chart-2: oklch(0.63 0.12 295);
  --chart-3: oklch(0.68 0.1 275);
  --chart-4: oklch(0.73 0.13 290);
  --chart-5: oklch(0.78 0.11 280);
  --sidebar: oklch(0.12 0 0);
  --sidebar-foreground: oklch(0.95 0 0);
  --sidebar-primary: oklch(0.5858 0.1414 285);
  --sidebar-primary-foreground: oklch(0.98 0 0);
  --sidebar-accent: oklch(0.24 0 0);
  --sidebar-accent-foreground: oklch(0.95 0 0);
  --sidebar-border: oklch(0.2525 0 0 / 6060%);
  --sidebar-ring: oklch(0.5858 0.1414 285);
}`,
  orange: `:root {
  --background: oklch(0.99 0.001 50);
  --foreground: oklch(0.12 0 0);
  --card: oklch(0.99 0 0);
  --card-foreground: oklch(0.12 0 0);
  --popover: oklch(0.99 0 0);
  --popover-foreground: oklch(0.12 0 0);
  --primary: oklch(0.5 0.20 50);
  --primary-foreground: oklch(0.98 0 0);
  --secondary: oklch(1 0 0);
  --secondary-foreground: oklch(0.2 0 0);
  --muted: oklch(0.95 0 0);
  --muted-foreground: oklch(0.4 0 0);
  --accent: oklch(0.85 0 0);
  --accent-foreground: oklch(0.12 0 0);
  --destructive: oklch(0.4 0.02 25);
  --border: oklch(0.95 0 0);
  --input: oklch(0.88 0 0);
  --ring: oklch(0.5 0.20 50);
  --chart-1: oklch(0.5 0.20 50);
  --chart-2: oklch(0.45 0.18 55);
  --chart-3: oklch(0.4 0.15 45);
  --chart-4: oklch(0.55 0.18 52);
  --chart-5: oklch(0.6 0.16 48);
  --sidebar: oklch(0.99 0 0);
  --sidebar-foreground: oklch(0.12 0 0);
  --sidebar-primary: oklch(0.5 0.20 50);
  --sidebar-primary-foreground: oklch(0.98 0 0);
  --sidebar-accent: oklch(0.85 0 0);
  --sidebar-accent-foreground: oklch(0.12 0 0);
  --sidebar-border: oklch(0.9 0 0);
  --sidebar-ring: oklch(0.5 0.20 50);
}
.dark {
  --background: oklch(0.08 0 0);
  --foreground: oklch(0.95 0 0);
  --card: oklch(0.12 0 0);
  --card-foreground: oklch(0.95 0 0);
  --popover: oklch(0.12 0 0);
  --popover-foreground: oklch(0.95 0 0);
  --primary: oklch(0.60 0.16 50);
  --primary-foreground: oklch(0.98 0 0);
  --secondary: oklch(0.16 0 0);
  --secondary-foreground: oklch(0.9 0 0);
  --muted: oklch(0.16 0 0);
  --muted-foreground: oklch(0.85 0 0);
  --accent: oklch(0.24 0 0);
  --accent-foreground: oklch(0.95 0 0);
  --destructive: oklch(0.55 0.02 25);
  --border: oklch(0.25 0 0 / 60%);
  --input: oklch(0.20 0 0 / 80%);
  --ring: oklch(0.60 0.16 50);
  --chart-1: oklch(0.60 0.16 50);
  --chart-2: oklch(0.65 0.14 55);
  --chart-3: oklch(0.70 0.12 45);
  --chart-4: oklch(0.75 0.15 52);
  --chart-5: oklch(0.8 0.13 48);
  --sidebar: oklch(0.12 0 0);
  --sidebar-foreground: oklch(0.95 0 0);
  --sidebar-primary: oklch(0.60 0.16 50);
  --sidebar-primary-foreground: oklch(0.98 0 0);
  --sidebar-accent: oklch(0.24 0 0);
  --sidebar-accent-foreground: oklch(0.95 0 0);
  --sidebar-border: oklch(0.25 0 0 / 60%);
  --sidebar-ring: oklch(0.60 0.16 50);
}`,
  blue: `:root {
  --background: oklch(0.99 0.001 235);
  --foreground: oklch(0.12 0 0);
  --card: oklch(0.99 0 0);
  --card-foreground: oklch(0.12 0 0);
  --popover: oklch(0.99 0 0);
  --popover-foreground: oklch(0.12 0 0);
  --primary: oklch(0.42 0.20 235);
  --primary-foreground: oklch(0.98 0 0);
  --secondary: oklch(1 0 0);
  --secondary-foreground: oklch(0.2 0 0);
  --muted: oklch(0.95 0 0);
  --muted-foreground: oklch(0.4 0 0);
  --accent: oklch(0.85 0 0);
  --accent-foreground: oklch(0.12 0 0);
  --destructive: oklch(0.4 0.02 25);
  --border: oklch(0.95 0 0);
  --input: oklch(0.88 0 0);
  --ring: oklch(0.42 0.20 235);
  --chart-1: oklch(0.42 0.20 235);
  --chart-2: oklch(0.37 0.18 245);
  --chart-3: oklch(0.32 0.15 225);
  --chart-4: oklch(0.47 0.18 240);
  --chart-5: oklch(0.52 0.16 230);
  --sidebar: oklch(0.99 0 0);
  --sidebar-foreground: oklch(0.12 0 0);
  --sidebar-primary: oklch(0.42 0.20 235);
  --sidebar-primary-foreground: oklch(0.98 0 0);
  --sidebar-accent: oklch(0.85 0 0);
  --sidebar-accent-foreground: oklch(0.12 0 0);
  --sidebar-border: oklch(0.9 0 0);
  --sidebar-ring: oklch(0.42 0.20 235);
}
.dark {
  --background: oklch(0.08 0 0);
  --foreground: oklch(0.95 0 0);
  --card: oklch(0.12 0 0);
  --card-foreground: oklch(0.95 0 0);
  --popover: oklch(0.12 0 0);
  --popover-foreground: oklch(0.95 0 0);
  --primary: oklch(0.58 0.16 235);
  --primary-foreground: oklch(0.98 0 0);
  --secondary: oklch(0.16 0 0);
  --secondary-foreground: oklch(0.9 0 0);
  --muted: oklch(0.16 0 0);
  --muted-foreground: oklch(0.85 0 0);
  --accent: oklch(0.24 0 0);
  --accent-foreground: oklch(0.95 0 0);
  --destructive: oklch(0.55 0.02 25);
  --border: oklch(0.25 0 0 / 60%);
  --input: oklch(0.20 0 0 / 80%);
  --ring: oklch(0.58 0.16 235);
  --chart-1: oklch(0.58 0.16 235);
  --chart-2: oklch(0.63 0.14 245);
  --chart-3: oklch(0.68 0.12 225);
  --chart-4: oklch(0.73 0.15 240);
  --chart-5: oklch(0.78 0.13 230);
  --sidebar: oklch(0.12 0 0);
  --sidebar-foreground: oklch(0.95 0 0);
  --sidebar-primary: oklch(0.58 0.16 235);
  --sidebar-primary-foreground: oklch(0.98 0 0);
  --sidebar-accent: oklch(0.24 0 0);
  --sidebar-accent-foreground: oklch(0.95 0 0);
  --sidebar-border: oklch(0.25 0 0 / 60%);
  --sidebar-ring: oklch(0.58 0.16 235);
}`,
  red: `:root {
  --background: oklch(0.99 0.001 20);
  --foreground: oklch(0.12 0 0);
  --card: oklch(0.99 0 0);
  --card-foreground: oklch(0.12 0 0);
  --popover: oklch(0.99 0 0);
  --popover-foreground: oklch(0.12 0 0);
  --primary: oklch(0.45 0.18 20);
  --primary-foreground: oklch(0.98 0 0);
  --secondary: oklch(1 0 0);
  --secondary-foreground: oklch(0.2 0 0);
  --muted: oklch(0.95 0 0);
  --muted-foreground: oklch(0.4 0 0);
  --accent: oklch(0.85 0 0);
  --accent-foreground: oklch(0.12 0 0);
  --destructive: oklch(0.4 0.02 25);
  --border: oklch(0.95 0 0);
  --input: oklch(0.88 0 0);
  --ring: oklch(0.45 0.18 20);
  --chart-1: oklch(0.45 0.18 20);
  --chart-2: oklch(0.4 0.15 25);
  --chart-3: oklch(0.35 0.12 15);
  --chart-4: oklch(0.5 0.16 22);
  --chart-5: oklch(0.55 0.14 18);
  --sidebar: oklch(0.99 0 0);
  --sidebar-foreground: oklch(0.12 0 0);
  --sidebar-primary: oklch(0.45 0.18 20);
  --sidebar-primary-foreground: oklch(0.98 0 0);
  --sidebar-accent: oklch(0.85 0 0);
  --sidebar-accent-foreground: oklch(0.12 0 0);
  --sidebar-border: oklch(0.9 0 0);
  --sidebar-ring: oklch(0.45 0.18 20);
}
.dark {
  --background: oklch(0.08 0 0);
  --foreground: oklch(0.95 0 0);
  --card: oklch(0.12 0 0);
  --card-foreground: oklch(0.95 0 0);
  --popover: oklch(0.12 0 0);
  --popover-foreground: oklch(0.95 0 0);
  --primary: oklch(0.60 0.14 20);
  --primary-foreground: oklch(0.98 0 0);
  --secondary: oklch(0.16 0 0);
  --secondary-foreground: oklch(0.9 0 0);
  --muted: oklch(0.16 0 0);
  --muted-foreground: oklch(0.85 0 0);
  --accent: oklch(0.24 0 0);
  --accent-foreground: oklch(0.95 0 0);
  --destructive: oklch(0.55 0.02 25);
  --border: oklch(0.25 0 0 / 60%);
  --input: oklch(0.20 0 0 / 80%);
  --ring: oklch(0.60 0.14 20);
  --chart-1: oklch(0.60 0.14 20);
  --chart-2: oklch(0.65 0.12 25);
  --chart-3: oklch(0.70 0.10 15);
  --chart-4: oklch(0.75 0.13 22);
  --chart-5: oklch(0.80 0.11 18);
  --sidebar: oklch(0.12 0 0);
  --sidebar-foreground: oklch(0.95 0 0);
  --sidebar-primary: oklch(0.60 0.14 20);
  --sidebar-primary-foreground: oklch(0.98 0 0);
  --sidebar-accent: oklch(0.24 0 0);
  --sidebar-accent-foreground: oklch(0.95 0 0);
  --sidebar-border: oklch(0.25 0 0 / 60%);
  --sidebar-ring: oklch(0.60 0.14 20);
}`,
  monochrome: `:root {
  --background: oklch(0.99 0 0);
  --foreground: oklch(0.12 0 0);
  --card: oklch(0.99 0 0);
  --card-foreground: oklch(0.12 0 0);
  --popover: oklch(0.99 0 0);
  --popover-foreground: oklch(0.12 0 0);
  --primary: oklch(0.25 0 0);
  --primary-foreground: oklch(0.98 0 0);
  --secondary: oklch(1 0 0);
  --secondary-foreground: oklch(0.2 0 0);
  --muted: oklch(0.95 0 0);
  --muted-foreground: oklch(0.4 0 0);
  --accent: oklch(0.85 0 0);
  --accent-foreground: oklch(0.12 0 0);
  --destructive: oklch(0.4 0.02 25);
  --border: oklch(0.95 0 0);
  --input: oklch(0.88 0 0);
  --ring: oklch(0.3 0 0);
  --chart-1: oklch(0.25 0 0);
  --chart-2: oklch(0.35 0 0);
  --chart-3: oklch(0.45 0 0);
  --chart-4: oklch(0.55 0 0);
  --chart-5: oklch(0.65 0 0);
  --sidebar: oklch(0.99 0 0);
  --sidebar-foreground: oklch(0.12 0 0);
  --sidebar-primary: oklch(0.25 0 0);
  --sidebar-primary-foreground: oklch(0.98 0 0);
  --sidebar-accent: oklch(0.85 0 0);
  --sidebar-accent-foreground: oklch(0.12 0 0);
  --sidebar-border: oklch(0.9 0 0);
  --sidebar-ring: oklch(0.3 0 0);
}
.dark {
  --background: oklch(0.08 0 0);
  --foreground: oklch(0.95 0 0);
  --card: oklch(0.12 0 0);
  --card-foreground: oklch(0.95 0 0);
  --popover: oklch(0.12 0 0);
  --popover-foreground: oklch(0.95 0 0);
  --primary: oklch(1 0 0);
  --primary-foreground: oklch(0.08 0 0);
  --secondary: oklch(0.16 0 0);
  --secondary-foreground: oklch(0.9 0 0);
  --muted: oklch(0.16 0 0);
  --muted-foreground: oklch(0.85 0 0);
  --accent: oklch(0.24 0 0);
  --accent-foreground: oklch(0.95 0 0);
  --destructive: oklch(0.55 0.02 25);
  --border: oklch(0.25 0 0 / 60%);
  --input: oklch(0.20 0 0 / 80%);
  --ring: oklch(0.8 0 0);
  --chart-1: oklch(0.85 0 0);
  --chart-2: oklch(0.75 0 0);
  --chart-3: oklch(0.65 0 0);
  --chart-4: oklch(0.55 0 0);
  --chart-5: oklch(0.45 0 0);
  --sidebar: oklch(0.12 0 0);
  --sidebar-foreground: oklch(0.95 0 0);
  --sidebar-primary: oklch(0.85 0 0);
  --sidebar-primary-foreground: oklch(0.08 0 0);
  --sidebar-accent: oklch(0.24 0 0);
  --sidebar-accent-foreground: oklch(0.95 0 0);
  --sidebar-border: oklch(0.25 0 0 / 60%);
  --sidebar-ring: oklch(0.8 0 0);
}`,
};

export function Theme({
  name,
  className,
  children,
}: {
  name: ThemeName;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={className}>
      <style dangerouslySetInnerHTML={{ __html: themes[name] }} />
      {children}
    </div>
  );
}
