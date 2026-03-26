import { DocsContent, Section, CodeBlock } from "@/components/docs";
import { Palette, Type, Moon, Sun } from "lucide-react";

export default function ThemingPage() {
  return (
    <DocsContent 
      title="Theming" 
      description="Customize the look and feel of your documentation and components."
    >
      <Section title="Overview">
        <p className="text-muted-foreground mb-6">
          Modern UI uses Tailwind CSS v4 for styling. You can customize the theme by editing the <code>@theme</code> block in your <code>app/globals.css</code> file. This allows you to define custom fonts, colors, and other design tokens.
        </p>
        
        <CodeBlock code={`@theme {\n  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;\n  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;\n  --color-primary: var(--primary);\n  --color-secondary: var(--secondary);\n}`} />
      </Section>

      <Section title="Colors">
        <p className="text-muted-foreground mb-6 flex items-center gap-2">
          <Palette className="w-4 h-4 text-primary" />
          Define custom colors and use them throughout your application.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 border border-border rounded-2xl flex flex-col items-center gap-3 bg-card shadow-sm">
            <div className="w-12 h-12 bg-primary rounded-full shadow-inner" />
            <span className="text-xs font-mono font-medium text-muted-foreground">primary</span>
          </div>
          <div className="p-4 border border-border rounded-2xl flex flex-col items-center gap-3 bg-card shadow-sm">
            <div className="w-12 h-12 bg-foreground rounded-full shadow-inner" />
            <span className="text-xs font-mono font-medium text-muted-foreground">foreground</span>
          </div>
          <div className="p-4 border border-border rounded-2xl flex flex-col items-center gap-3 bg-card shadow-sm">
            <div className="w-12 h-12 bg-destructive rounded-full shadow-inner" />
            <span className="text-xs font-mono font-medium text-muted-foreground">destructive</span>
          </div>
          <div className="p-4 border border-border rounded-2xl flex flex-col items-center gap-3 bg-card shadow-sm">
            <div className="w-12 h-12 bg-secondary rounded-full border border-border shadow-inner" />
            <span className="text-xs font-mono font-medium text-muted-foreground">secondary</span>
          </div>
        </div>
      </Section>

      <Section title="Typography">
        <p className="text-muted-foreground mb-6 flex items-center gap-2">
          <Type className="w-4 h-4 text-primary" />
          The boilerplate uses <strong>Inter</strong> for sans-serif text and <strong>JetBrains Mono</strong> for monospaced text by default.
        </p>
        <CodeBlock code={`body {\n  font-family: var(--font-sans);\n}\n\ncode {\n  font-family: var(--font-mono);\n}`} />
      </Section>

      <Section title="Dark Mode">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-2 rounded-lg bg-muted">
            <Sun className="w-5 h-5 text-orange-500" />
          </div>
          <div className="p-2 rounded-lg bg-foreground">
            <Moon className="w-5 h-5 text-primary" />
          </div>
          <p className="text-muted-foreground">
            Dark mode is supported via the <code>.dark</code> class. You can toggle it using a theme provider.
          </p>
        </div>
        <CodeBlock code={`:root {\n  --background: #ffffff;\n  --foreground: #171717;\n}\n\n.dark {\n  --background: #0a0a0a;\n  --foreground: #ededed;\n}`} />
      </Section>
    </DocsContent>
  );
}
