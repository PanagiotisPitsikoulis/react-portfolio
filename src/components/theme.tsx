export type ThemeName = "green" | "purple" | "orange" | "blue" | "red";

export const themes: Record<ThemeName, string> = {
  green: `:root {
  --background: oklch(0.995 0.002 155);
  --foreground: oklch(0.12 0.004 155);
  --card: oklch(0.99 0.002 155);
  --card-foreground: oklch(0.12 0.004 155);
  --popover: oklch(0.99 0.002 155);
  --popover-foreground: oklch(0.12 0.004 155);
  --primary: oklch(0.35 0.15 155);
  --primary-foreground: oklch(0.99 0.002 155);
  --secondary: oklch(1 0 0);
  --secondary-foreground: oklch(0.2 0.004 155);
  --muted: oklch(0.97 0.004 155);
  --muted-foreground: oklch(0.45 0.008 155);
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
  --sidebar-foreground: oklch(0.12 0.004 155);
  --sidebar-primary: oklch(0.38 0.12 155);
  --sidebar-primary-foreground: oklch(0.99 0.002 155);
  --sidebar-accent: oklch(0.45 0.12 180);
  --sidebar-accent-foreground: oklch(0.99 0.002 180);
  --sidebar-border: oklch(0.9 0.002 155);
  --sidebar-ring: oklch(0.42 0.12 155);
}
.dark {
  --background: oklch(0.18 0.002 155);
  --foreground: oklch(0.94 0.002 155);
  --card: oklch(0.12 0.008 155);
  --card-foreground: oklch(0.94 0.002 155);
  --popover: oklch(0.12 0.008 155);
  --popover-foreground: oklch(0.94 0.002 155);
  --primary: oklch(0.65 0.12 155);
  --primary-foreground: oklch(1 0 0);
  --secondary: oklch(0.28 0.006 155);
  --secondary-foreground: oklch(0.9 0.002 155);
  --muted: oklch(0.28 0.006 155);
  --muted-foreground: oklch(0.9 0.008 155);
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
  --sidebar: oklch(0.12 0.006 155);
  --sidebar-foreground: oklch(0.94 0.002 155);
  --sidebar-primary: oklch(0.65 0.22 155);
  --sidebar-primary-foreground: oklch(1 0 0);
  --sidebar-accent: oklch(0.55 0.12 180);
  --sidebar-accent-foreground: oklch(0.08 0.002 180);
  --sidebar-border: oklch(0.25 0.008 155 / 40%);
  --sidebar-ring: oklch(0.7 0.22 155);
}`,
  purple: `:root {
  --background: oklch(0.995 0.002 285);
  --foreground: oklch(0.12 0.004 285);
  --card: oklch(0.99 0.002 285);
  --card-foreground: oklch(0.12 0.004 285);
  --popover: oklch(0.99 0.002 285);
  --popover-foreground: oklch(0.12 0.004 285);
  --primary: oklch(0.38 0.15 285);
  --primary-foreground: oklch(0.99 0.002 285);
  --secondary: oklch(1 0 0);
  --secondary-foreground: oklch(0.2 0.004 285);
  --muted: oklch(0.97 0.004 285);
  --muted-foreground: oklch(0.45 0.008 285);
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
  --sidebar-foreground: oklch(0.12 0.004 285);
  --sidebar-primary: oklch(0.4 0.12 285);
  --sidebar-primary-foreground: oklch(0.99 0.002 285);
  --sidebar-accent: oklch(0.48 0.12 320);
  --sidebar-accent-foreground: oklch(0.99 0.002 320);
  --sidebar-border: oklch(0.9 0.002 285);
  --sidebar-ring: oklch(0.44 0.12 285);
}
.dark {
  --background: oklch(0.18 0.002 285);
  --foreground: oklch(0.94 0.002 285);
  --card: oklch(0.12 0.008 285);
  --card-foreground: oklch(0.94 0.002 285);
  --popover: oklch(0.12 0.008 285);
  --popover-foreground: oklch(0.94 0.002 285);
  --primary: oklch(0.68 0.12 285);
  --primary-foreground: oklch(1 0 0);
  --secondary: oklch(0.28 0.006 285);
  --secondary-foreground: oklch(0.9 0.002 285);
  --muted: oklch(0.28 0.006 285);
  --muted-foreground: oklch(0.9 0.008 285);
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
  --sidebar: oklch(0.12 0.006 285);
  --sidebar-foreground: oklch(0.94 0.002 285);
  --sidebar-primary: oklch(0.68 0.22 285);
  --sidebar-primary-foreground: oklch(1 0 0);
  --sidebar-accent: oklch(0.58 0.12 320);
  --sidebar-accent-foreground: oklch(0.08 0.002 320);
  --sidebar-border: oklch(0.25 0.008 285 / 40%);
  --sidebar-ring: oklch(0.72 0.22 285);
}`,
  orange: `:root {
  --background: oklch(0.995 0.002 45);
  --foreground: oklch(0.12 0.004 45);
  --card: oklch(0.99 0.002 45);
  --card-foreground: oklch(0.12 0.004 45);
  --popover: oklch(0.99 0.002 45);
  --popover-foreground: oklch(0.12 0.004 45);
  --primary: oklch(0.45 0.15 45);
  --primary-foreground: oklch(0.99 0.002 45);
  --secondary: oklch(1 0 0);
  --secondary-foreground: oklch(0.2 0.004 45);
  --muted: oklch(0.97 0.004 45);
  --muted-foreground: oklch(0.45 0.008 45);
  --accent: oklch(0.55 0.12 65);
  --accent-foreground: oklch(0.99 0.002 65);
  --destructive: oklch(0.55 0.15 25);
  --border: oklch(0.92 0.002 45);
  --input: oklch(0.9 0.002 45);
  --ring: oklch(0.5 0.12 45);
  --chart-1: oklch(0.55 0.15 45);
  --chart-2: oklch(0.5 0.12 55);
  --chart-3: oklch(0.45 0.1 35);
  --chart-4: oklch(0.6 0.13 50);
  --chart-5: oklch(0.57 0.11 40);
  --sidebar: oklch(0.99 0.002 45);
  --sidebar-foreground: oklch(0.12 0.004 45);
  --sidebar-primary: oklch(0.47 0.12 45);
  --sidebar-primary-foreground: oklch(0.99 0.002 45);
  --sidebar-accent: oklch(0.55 0.12 65);
  --sidebar-accent-foreground: oklch(0.99 0.002 65);
  --sidebar-border: oklch(0.9 0.002 45);
  --sidebar-ring: oklch(0.52 0.12 45);
}
.dark {
  --background: oklch(0.18 0.002 45);
  --foreground: oklch(0.94 0.002 45);
  --card: oklch(0.12 0.008 45);
  --card-foreground: oklch(0.94 0.002 45);
  --popover: oklch(0.12 0.008 45);
  --popover-foreground: oklch(0.94 0.002 45);
  --primary: oklch(0.6 0.21 45);
  --primary-foreground: oklch(1 0 0);
  --secondary: oklch(0.28 0.006 45);
  --secondary-foreground: oklch(0.9 0.002 45);
  --muted: oklch(0.28 0.006 45);
  --muted-foreground: oklch(0.9 0.008 45);
  --accent: oklch(0.65 0.12 65);
  --accent-foreground: oklch(0.08 0.002 65);
  --destructive: oklch(0.6 0.15 25);
  --border: oklch(0.25 0.008 45 / 50%);
  --input: oklch(0.25 0.008 45 / 60%);
  --ring: oklch(0.75 0.22 45);
  --chart-1: oklch(0.7 0.22 45);
  --chart-2: oklch(0.65 0.2 55);
  --chart-3: oklch(0.6 0.18 35);
  --chart-4: oklch(0.75 0.21 50);
  --chart-5: oklch(0.72 0.19 40);
  --sidebar: oklch(0.12 0.006 45);
  --sidebar-foreground: oklch(0.94 0.002 45);
  --sidebar-primary: oklch(0.7 0.22 45);
  --sidebar-primary-foreground: oklch(1 0 0);
  --sidebar-accent: oklch(0.65 0.12 65);
  --sidebar-accent-foreground: oklch(0.08 0.002 65);
  --sidebar-border: oklch(0.25 0.008 45 / 40%);
  --sidebar-ring: oklch(0.75 0.22 45);
}`,
  blue: `:root {
  --background: oklch(0.995 0.002 235);
  --foreground: oklch(0.12 0.004 235);
  --card: oklch(0.99 0.002 235);
  --card-foreground: oklch(0.12 0.004 235);
  --popover: oklch(0.99 0.002 235);
  --popover-foreground: oklch(0.12 0.004 235);
  --primary: oklch(0.4 0.15 235);
  --primary-foreground: oklch(0.99 0.002 235);
  --secondary: oklch(1 0 0);
  --secondary-foreground: oklch(0.2 0.004 235);
  --muted: oklch(0.97 0.004 235);
  --muted-foreground: oklch(0.45 0.008 235);
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
  --sidebar-foreground: oklch(0.12 0.004 235);
  --sidebar-primary: oklch(0.42 0.12 235);
  --sidebar-primary-foreground: oklch(0.99 0.002 235);
  --sidebar-accent: oklch(0.5 0.12 200);
  --sidebar-accent-foreground: oklch(0.99 0.002 200);
  --sidebar-border: oklch(0.9 0.002 235);
  --sidebar-ring: oklch(0.47 0.12 235);
}
.dark {
  --background: oklch(0.18 0.002 235);
  --foreground: oklch(0.94 0.002 235);
  --card: oklch(0.12 0.008 235);
  --card-foreground: oklch(0.94 0.002 235);
  --popover: oklch(0.12 0.008 235);
  --popover-foreground: oklch(0.94 0.002 235);
  --primary: oklch(0.65 0.12 235);
  --primary-foreground: oklch(1 0 0);
  --secondary: oklch(0.28 0.006 235);
  --secondary-foreground: oklch(0.9 0.002 235);
  --muted: oklch(0.28 0.006 235);
  --muted-foreground: oklch(0.9 0.008 235);
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
  --sidebar: oklch(0.12 0.006 235);
  --sidebar-foreground: oklch(0.94 0.002 235);
  --sidebar-primary: oklch(0.65 0.22 235);
  --sidebar-primary-foreground: oklch(1 0 0);
  --sidebar-accent: oklch(0.6 0.12 200);
  --sidebar-accent-foreground: oklch(0.08 0.002 200);
  --sidebar-border: oklch(0.25 0.008 235 / 40%);
  --sidebar-ring: oklch(0.7 0.22 235);
}`,
  red: `:root {
  --background: oklch(0.995 0.002 15);
  --foreground: oklch(0.12 0.004 15);
  --card: oklch(0.99 0.002 15);
  --card-foreground: oklch(0.12 0.004 15);
  --popover: oklch(0.99 0.002 15);
  --popover-foreground: oklch(0.12 0.004 15);
  --primary: oklch(0.42 0.15 15);
  --primary-foreground: oklch(0.99 0.002 15);
  --secondary: oklch(1 0 0);
  --secondary-foreground: oklch(0.2 0.004 15);
  --muted: oklch(0.97 0.004 15);
  --muted-foreground: oklch(0.45 0.008 15);
  --accent: oklch(0.52 0.12 35);
  --accent-foreground: oklch(0.99 0.002 35);
  --destructive: oklch(0.55 0.15 25);
  --border: oklch(0.92 0.002 15);
  --input: oklch(0.9 0.002 15);
  --ring: oklch(0.47 0.12 15);
  --chart-1: oklch(0.52 0.15 15);
  --chart-2: oklch(0.47 0.12 25);
  --chart-3: oklch(0.42 0.1 5);
  --chart-4: oklch(0.57 0.13 20);
  --chart-5: oklch(0.54 0.11 10);
  --sidebar: oklch(0.99 0.002 15);
  --sidebar-foreground: oklch(0.12 0.004 15);
  --sidebar-primary: oklch(0.44 0.12 15);
  --sidebar-primary-foreground: oklch(0.99 0.002 15);
  --sidebar-accent: oklch(0.52 0.12 35);
  --sidebar-accent-foreground: oklch(0.99 0.002 35);
  --sidebar-border: oklch(0.9 0.002 15);
  --sidebar-ring: oklch(0.49 0.12 15);
}
.dark {
  --background: oklch(0.18 0.002 15);
  --foreground: oklch(0.94 0.002 15);
  --card: oklch(0.12 0.008 15);
  --card-foreground: oklch(0.94 0.002 15);
  --popover: oklch(0.12 0.008 15);
  --popover-foreground: oklch(0.94 0.002 15);
  --primary: oklch(0.67 0.12 15);
  --primary-foreground: oklch(1 0 0);
  --secondary: oklch(0.28 0.006 15);
  --secondary-foreground: oklch(0.9 0.002 15);
  --muted: oklch(0.28 0.006 15);
  --muted-foreground: oklch(0.9 0.008 15);
  --accent: oklch(0.62 0.12 35);
  --accent-foreground: oklch(0.08 0.002 35);
  --destructive: oklch(0.6 0.15 25);
  --border: oklch(0.25 0.008 15 / 50%);
  --input: oklch(0.25 0.008 15 / 60%);
  --ring: oklch(0.72 0.22 15);
  --chart-1: oklch(0.67 0.22 15);
  --chart-2: oklch(0.62 0.2 25);
  --chart-3: oklch(0.57 0.18 5);
  --chart-4: oklch(0.72 0.21 20);
  --chart-5: oklch(0.69 0.19 10);
  --sidebar: oklch(0.12 0.006 15);
  --sidebar-foreground: oklch(0.94 0.002 15);
  --sidebar-primary: oklch(0.67 0.22 15);
  --sidebar-primary-foreground: oklch(1 0 0);
  --sidebar-accent: oklch(0.62 0.12 35);
  --sidebar-accent-foreground: oklch(0.08 0.002 35);
  --sidebar-border: oklch(0.25 0.008 15 / 40%);
  --sidebar-ring: oklch(0.72 0.22 15);
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
