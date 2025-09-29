export type ThemeName =
  | "green"
  | "purple"
  | "orange"
  | "blue"
  | "red"
  | "monochrome";

export const themes: Record<ThemeName, string> = {
  green: `:root {
  --background: oklch(0.995 0.002 155);
  --foreground: oklch(0.12 0.008 155);
  --card: oklch(0.99 0.002 155);
  --card-foreground: oklch(0.12 0.008 155);
  --popover: oklch(0.99 0.002 155);
  --popover-foreground: oklch(0.12 0.008 155);
  --primary: oklch(0.35 0.15 155);
  --primary-foreground: oklch(0.99 0.002 155);
  --secondary: oklch(0.995 0.002 155);
  --secondary-foreground: oklch(0.2 0.008 155);
  --muted: oklch(0.97 0.003 155);
  --muted-foreground: oklch(0.45 0.025 155);
  --accent: oklch(0.45 0.12 180);
  --accent-foreground: oklch(0.99 0.002 180);
  --destructive: oklch(0.55 0.15 25);
  --border: oklch(0.92 0.002 155);
  --input: oklch(0.9 0.002 155);
  --ring: oklch(0.4 0.12 155);
  --chart-1: oklch(0.5 0.15 155);
  --chart-2: oklch(0.45 0.12 165);
  --chart-3: oklch(0.4 0.1 145);
  --chart-4: oklch(0.55 0.13 160);
  --chart-5: oklch(0.52 0.11 150);
  --sidebar: oklch(0.99 0.002 155);
  --sidebar-foreground: oklch(0.12 0.008 155);
  --sidebar-primary: oklch(0.38 0.12 155);
  --sidebar-primary-foreground: oklch(0.99 0.002 155);
  --sidebar-accent: oklch(0.45 0.12 180);
  --sidebar-accent-foreground: oklch(0.99 0.002 180);
  --sidebar-border: oklch(0.9 0.002 155);
  --sidebar-ring: oklch(0.42 0.12 155);
}
.dark {
  --background: oklch(0.18 0.002 155);
  --foreground: oklch(0.94 0.008 155);
  --card: oklch(0.12 0.003 155);
  --card-foreground: oklch(0.94 0.008 155);
  --popover: oklch(0.12 0.003 155);
  --popover-foreground: oklch(0.94 0.008 155);
  --primary: oklch(0.65 0.12 155);
  --primary-foreground: oklch(1 0 0);
  --secondary: oklch(0.28 0.003 155);
  --secondary-foreground: oklch(0.9 0.008 155);
  --muted: oklch(0.28 0.003 155);
  --muted-foreground: oklch(0.9 0.025 155);
  --accent: oklch(0.55 0.12 180);
  --accent-foreground: oklch(0.08 0.002 180);
  --destructive: oklch(0.6 0.15 25);
  --border: oklch(0.25 0.008 155 / 50%);
  --input: oklch(0.25 0.008 155 / 60%);
  --ring: oklch(0.7 0.22 155);
  --chart-1: oklch(0.65 0.22 155);
  --chart-2: oklch(0.6 0.2 165);
  --chart-3: oklch(0.55 0.18 145);
  --chart-4: oklch(0.7 0.21 160);
  --chart-5: oklch(0.67 0.19 150);
  --sidebar: oklch(0.12 0.003 155);
  --sidebar-foreground: oklch(0.94 0.008 155);
  --sidebar-primary: oklch(0.65 0.22 155);
  --sidebar-primary-foreground: oklch(1 0 0);
  --sidebar-accent: oklch(0.55 0.12 180);
  --sidebar-accent-foreground: oklch(0.08 0.002 180);
  --sidebar-border: oklch(0.25 0.008 155 / 40%);
  --sidebar-ring: oklch(0.7 0.22 155);
}`,
  purple: `:root {
  --background: oklch(0.995 0.002 285);
  --foreground: oklch(0.12 0.008 285);
  --card: oklch(0.99 0.002 285);
  --card-foreground: oklch(0.12 0.008 285);
  --popover: oklch(0.99 0.002 285);
  --popover-foreground: oklch(0.12 0.008 285);
  --primary: oklch(0.38 0.15 285);
  --primary-foreground: oklch(0.99 0.002 285);
  --secondary: oklch(0.995 0.002 285);
  --secondary-foreground: oklch(0.2 0.008 285);
  --muted: oklch(0.97 0.003 285);
  --muted-foreground: oklch(0.45 0.025 285);
  --accent: oklch(0.48 0.12 320);
  --accent-foreground: oklch(0.99 0.002 320);
  --destructive: oklch(0.55 0.15 25);
  --border: oklch(0.92 0.002 285);
  --input: oklch(0.9 0.002 285);
  --ring: oklch(0.42 0.12 285);
  --chart-1: oklch(0.5 0.15 285);
  --chart-2: oklch(0.45 0.12 295);
  --chart-3: oklch(0.4 0.1 275);
  --chart-4: oklch(0.55 0.13 290);
  --chart-5: oklch(0.52 0.11 280);
  --sidebar: oklch(0.99 0.002 285);
  --sidebar-foreground: oklch(0.12 0.008 285);
  --sidebar-primary: oklch(0.4 0.12 285);
  --sidebar-primary-foreground: oklch(0.99 0.002 285);
  --sidebar-accent: oklch(0.48 0.12 320);
  --sidebar-accent-foreground: oklch(0.99 0.002 320);
  --sidebar-border: oklch(0.9 0.002 285);
  --sidebar-ring: oklch(0.44 0.12 285);
}
.dark {
  --background: oklch(0.18 0.002 285);
  --foreground: oklch(0.94 0.008 285);
  --card: oklch(0.12 0.003 285);
  --card-foreground: oklch(0.94 0.008 285);
  --popover: oklch(0.12 0.003 285);
  --popover-foreground: oklch(0.94 0.008 285);
  --primary: oklch(0.68 0.12 285);
  --primary-foreground: oklch(1 0 0);
  --secondary: oklch(0.28 0.003 285);
  --secondary-foreground: oklch(0.9 0.008 285);
  --muted: oklch(0.28 0.003 285);
  --muted-foreground: oklch(0.9 0.025 285);
  --accent: oklch(0.58 0.12 320);
  --accent-foreground: oklch(0.08 0.002 320);
  --destructive: oklch(0.6 0.15 25);
  --border: oklch(0.25 0.008 285 / 50%);
  --input: oklch(0.25 0.008 285 / 60%);
  --ring: oklch(0.72 0.22 285);
  --chart-1: oklch(0.68 0.22 285);
  --chart-2: oklch(0.63 0.2 295);
  --chart-3: oklch(0.58 0.18 275);
  --chart-4: oklch(0.73 0.21 290);
  --chart-5: oklch(0.7 0.19 280);
  --sidebar: oklch(0.12 0.003 285);
  --sidebar-foreground: oklch(0.94 0.008 285);
  --sidebar-primary: oklch(0.68 0.22 285);
  --sidebar-primary-foreground: oklch(1 0 0);
  --sidebar-accent: oklch(0.58 0.12 320);
  --sidebar-accent-foreground: oklch(0.08 0.002 320);
  --sidebar-border: oklch(0.25 0.008 285 / 40%);
  --sidebar-ring: oklch(0.72 0.22 285);
}`,
  orange: `:root {
  --background: oklch(0.995 0.002 50);
  --foreground: oklch(0.12 0.008 50);
  --card: oklch(0.99 0.002 50);
  --card-foreground: oklch(0.12 0.008 50);
  --popover: oklch(0.99 0.002 50);
  --popover-foreground: oklch(0.12 0.008 50);
  --primary: oklch(0.5 0.18 50);
  --primary-foreground: oklch(0.99 0.002 50);
  --secondary: oklch(0.995 0.002 50);
  --secondary-foreground: oklch(0.2 0.008 50);
  --muted: oklch(0.97 0.003 50);
  --muted-foreground: oklch(0.45 0.025 50);
  --accent: oklch(0.6 0.15 60);
  --accent-foreground: oklch(0.99 0.002 60);
  --destructive: oklch(0.55 0.15 25);
  --border: oklch(0.92 0.002 50);
  --input: oklch(0.9 0.002 50);
  --ring: oklch(0.55 0.15 50);
  --chart-1: oklch(0.6 0.18 50);
  --chart-2: oklch(0.55 0.15 55);
  --chart-3: oklch(0.5 0.12 45);
  --chart-4: oklch(0.65 0.16 52);
  --chart-5: oklch(0.62 0.14 48);
  --sidebar: oklch(0.99 0.002 50);
  --sidebar-foreground: oklch(0.12 0.008 50);
  --sidebar-primary: oklch(0.52 0.15 50);
  --sidebar-primary-foreground: oklch(0.99 0.002 50);
  --sidebar-accent: oklch(0.6 0.15 60);
  --sidebar-accent-foreground: oklch(0.99 0.002 60);
  --sidebar-border: oklch(0.9 0.002 50);
  --sidebar-ring: oklch(0.57 0.15 50);
}
.dark {
  --background: oklch(0.18 0.002 50);
  --foreground: oklch(0.94 0.008 50);
  --card: oklch(0.12 0.003 50);
  --card-foreground: oklch(0.94 0.008 50);
  --popover: oklch(0.12 0.003 50);
  --popover-foreground: oklch(0.94 0.008 50);
  --primary: oklch(0.7 0.22 50);
  --primary-foreground: oklch(1 0 0);
  --secondary: oklch(0.28 0.003 50);
  --secondary-foreground: oklch(0.9 0.008 50);
  --muted: oklch(0.28 0.003 50);
  --muted-foreground: oklch(0.9 0.025 50);
  --accent: oklch(0.75 0.15 60);
  --accent-foreground: oklch(0.08 0.002 60);
  --destructive: oklch(0.6 0.15 25);
  --border: oklch(0.25 0.008 50 / 50%);
  --input: oklch(0.25 0.008 50 / 60%);
  --ring: oklch(0.8 0.22 50);
  --chart-1: oklch(0.75 0.22 50);
  --chart-2: oklch(0.7 0.2 55);
  --chart-3: oklch(0.65 0.18 45);
  --chart-4: oklch(0.8 0.21 52);
  --chart-5: oklch(0.77 0.19 48);
  --sidebar: oklch(0.12 0.003 50);
  --sidebar-foreground: oklch(0.94 0.008 50);
  --sidebar-primary: oklch(0.75 0.22 50);
  --sidebar-primary-foreground: oklch(1 0 0);
  --sidebar-accent: oklch(0.75 0.15 60);
  --sidebar-accent-foreground: oklch(0.08 0.002 60);
  --sidebar-border: oklch(0.25 0.008 50 / 40%);
  --sidebar-ring: oklch(0.8 0.22 50);
}`,
  blue: `:root {
  --background: oklch(0.995 0.002 235);
  --foreground: oklch(0.12 0.008 235);
  --card: oklch(0.99 0.002 235);
  --card-foreground: oklch(0.12 0.008 235);
  --popover: oklch(0.99 0.002 235);
  --popover-foreground: oklch(0.12 0.008 235);
  --primary: oklch(0.42 0.22 235);
  --primary-foreground: oklch(0.99 0.002 235);
  --secondary: oklch(0.995 0.002 235);
  --secondary-foreground: oklch(0.2 0.008 235);
  --muted: oklch(0.97 0.003 235);
  --muted-foreground: oklch(0.45 0.025 235);
  --accent: oklch(0.5 0.12 200);
  --accent-foreground: oklch(0.99 0.002 200);
  --destructive: oklch(0.55 0.15 25);
  --border: oklch(0.92 0.002 235);
  --input: oklch(0.9 0.002 235);
  --ring: oklch(0.45 0.12 235);
  --chart-1: oklch(0.5 0.15 235);
  --chart-2: oklch(0.45 0.12 245);
  --chart-3: oklch(0.4 0.1 225);
  --chart-4: oklch(0.55 0.13 240);
  --chart-5: oklch(0.52 0.11 230);
  --sidebar: oklch(0.99 0.002 235);
  --sidebar-foreground: oklch(0.12 0.008 235);
  --sidebar-primary: oklch(0.42 0.12 235);
  --sidebar-primary-foreground: oklch(0.99 0.002 235);
  --sidebar-accent: oklch(0.5 0.12 200);
  --sidebar-accent-foreground: oklch(0.99 0.002 200);
  --sidebar-border: oklch(0.9 0.002 235);
  --sidebar-ring: oklch(0.47 0.12 235);
}
.dark {
  --background: oklch(0.18 0.002 235);
  --foreground: oklch(0.94 0.008 235);
  --card: oklch(0.12 0.003 235);
  --card-foreground: oklch(0.94 0.008 235);
  --popover: oklch(0.12 0.003 235);
  --popover-foreground: oklch(0.94 0.008 235);
  --primary: oklch(0.65 0.12 235);
  --primary-foreground: oklch(1 0 0);
  --secondary: oklch(0.28 0.003 235);
  --secondary-foreground: oklch(0.9 0.008 235);
  --muted: oklch(0.28 0.003 235);
  --muted-foreground: oklch(0.9 0.025 235);
  --accent: oklch(0.6 0.12 200);
  --accent-foreground: oklch(0.08 0.002 200);
  --destructive: oklch(0.6 0.15 25);
  --border: oklch(0.25 0.008 235 / 50%);
  --input: oklch(0.25 0.008 235 / 60%);
  --ring: oklch(0.7 0.22 235);
  --chart-1: oklch(0.65 0.22 235);
  --chart-2: oklch(0.6 0.2 245);
  --chart-3: oklch(0.55 0.18 225);
  --chart-4: oklch(0.7 0.21 240);
  --chart-5: oklch(0.67 0.19 230);
  --sidebar: oklch(0.12 0.003 235);
  --sidebar-foreground: oklch(0.94 0.008 235);
  --sidebar-primary: oklch(0.65 0.22 235);
  --sidebar-primary-foreground: oklch(1 0 0);
  --sidebar-accent: oklch(0.6 0.12 200);
  --sidebar-accent-foreground: oklch(0.08 0.002 200);
  --sidebar-border: oklch(0.25 0.008 235 / 40%);
  --sidebar-ring: oklch(0.7 0.22 235);
}`,
  red: `:root {
  --background: oklch(0.995 0.002 20);
  --foreground: oklch(0.12 0.008 20);
  --card: oklch(0.99 0.002 20);
  --card-foreground: oklch(0.12 0.008 20);
  --popover: oklch(0.99 0.002 20);
  --popover-foreground: oklch(0.12 0.008 20);
  --primary: oklch(0.45 0.18 20);
  --primary-foreground: oklch(0.99 0.002 20);
  --secondary: oklch(0.995 0.002 20);
  --secondary-foreground: oklch(0.2 0.008 20);
  --muted: oklch(0.97 0.003 20);
  --muted-foreground: oklch(0.45 0.025 20);
  --accent: oklch(0.55 0.15 30);
  --accent-foreground: oklch(0.99 0.002 30);
  --destructive: oklch(0.55 0.15 25);
  --border: oklch(0.92 0.002 20);
  --input: oklch(0.9 0.002 20);
  --ring: oklch(0.5 0.15 20);
  --chart-1: oklch(0.55 0.18 20);
  --chart-2: oklch(0.5 0.15 25);
  --chart-3: oklch(0.45 0.12 15);
  --chart-4: oklch(0.6 0.16 22);
  --chart-5: oklch(0.57 0.14 18);
  --sidebar: oklch(0.99 0.002 20);
  --sidebar-foreground: oklch(0.12 0.008 20);
  --sidebar-primary: oklch(0.47 0.15 20);
  --sidebar-primary-foreground: oklch(0.99 0.002 20);
  --sidebar-accent: oklch(0.55 0.15 30);
  --sidebar-accent-foreground: oklch(0.99 0.002 30);
  --sidebar-border: oklch(0.9 0.002 20);
  --sidebar-ring: oklch(0.52 0.15 20);
}
.dark {
  --background: oklch(0.18 0.002 20);
  --foreground: oklch(0.94 0.008 20);
  --card: oklch(0.12 0.003 20);
  --card-foreground: oklch(0.94 0.008 20);
  --popover: oklch(0.12 0.003 20);
  --popover-foreground: oklch(0.94 0.008 20);
  --primary: oklch(0.7 0.18 20);
  --primary-foreground: oklch(1 0 0);
  --secondary: oklch(0.28 0.003 20);
  --secondary-foreground: oklch(0.9 0.008 20);
  --muted: oklch(0.28 0.003 20);
  --muted-foreground: oklch(0.9 0.025 20);
  --accent: oklch(0.65 0.15 30);
  --accent-foreground: oklch(0.08 0.002 30);
  --destructive: oklch(0.6 0.15 25);
  --border: oklch(0.25 0.008 20 / 50%);
  --input: oklch(0.25 0.008 20 / 60%);
  --ring: oklch(0.75 0.22 20);
  --chart-1: oklch(0.7 0.22 20);
  --chart-2: oklch(0.65 0.2 25);
  --chart-3: oklch(0.6 0.18 15);
  --chart-4: oklch(0.75 0.21 22);
  --chart-5: oklch(0.72 0.19 18);
  --sidebar: oklch(0.12 0.003 20);
  --sidebar-foreground: oklch(0.94 0.008 20);
  --sidebar-primary: oklch(0.7 0.22 20);
  --sidebar-primary-foreground: oklch(1 0 0);
  --sidebar-accent: oklch(0.65 0.15 30);
  --sidebar-accent-foreground: oklch(0.08 0.002 30);
  --sidebar-border: oklch(0.25 0.008 20 / 40%);
  --sidebar-ring: oklch(0.75 0.22 20);
}`,
  monochrome: `:root {
  --background: oklch(0.985 0 0);
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
  --border: oklch(0.9 0 0);
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
  --background: oklch(0.17 0 0);
  --foreground: oklch(0.95 0 0);
  --card: oklch(0.18 0 0);
  --card-foreground: oklch(0.95 0 0);
  --popover: oklch(0.18 0 0);
  --popover-foreground: oklch(0.95 0 0);
  --primary: oklch(1 0 0);
  --primary-foreground: oklch(0.12 0 0);
  --secondary: oklch(0.24 0 0);
  --secondary-foreground: oklch(0.9 0 0);
  --muted: oklch(0.28 0 0);
  --muted-foreground: oklch(0.85 0 0);
  --accent: oklch(0.7 0 0);
  --accent-foreground: oklch(0.1 0 0);
  --destructive: oklch(0.55 0.02 25);
  --border: oklch(0.35 0 0);
  --input: oklch(0.25 0 0 / 60%);
  --ring: oklch(0.8 0 0);
  --chart-1: oklch(0.85 0 0);
  --chart-2: oklch(0.75 0 0);
  --chart-3: oklch(0.65 0 0);
  --chart-4: oklch(0.55 0 0);
  --chart-5: oklch(0.45 0 0);
  --sidebar: oklch(0.18 0 0);
  --sidebar-foreground: oklch(0.95 0 0);
  --sidebar-primary: oklch(0.85 0 0);
  --sidebar-primary-foreground: oklch(0.12 0 0);
  --sidebar-accent: oklch(0.7 0 0);
  --sidebar-accent-foreground: oklch(0.1 0 0);
  --sidebar-border: oklch(0.25 0 0 / 40%);
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
