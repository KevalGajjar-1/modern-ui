import { DocsContent, Section, CodeBlock } from "@/components/docs";
import { Terminal, Package, GitBranch, Layout } from "lucide-react";

export default function InstallationPage() {
  return (
    <DocsContent 
      title="Installation" 
      description="How to install and set up the Modern UI boilerplate in your own project."
    >
      <Section title="Prerequisites">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-border bg-muted/30">
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-primary" />
              Node.js
            </h3>
            <p className="text-sm text-muted-foreground">Version 18.17 or later is required for Next.js 15 compatibility.</p>
          </div>
          <div className="p-4 rounded-xl border border-border bg-muted/30">
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <Package className="w-4 h-4 text-primary" />
              Package Manager
            </h3>
            <p className="text-sm text-muted-foreground">Supports npm, yarn, or pnpm for dependency management.</p>
          </div>
        </div>
      </Section>

      <Section title="New Project">
        <p className="text-muted-foreground mb-6">
          The easiest way to get started is by cloning the boilerplate repository. This includes all components, documentation system, and pre-configured Tailwind CSS.
        </p>
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <GitBranch className="w-4 h-4" />
            Clone the repository
          </div>
          <CodeBlock code="git clone https://github.com/your-repo/modern-ui-docs.git\ncd modern-ui-docs\nnpm install" />
        </div>
      </Section>

      <Section title="Manual Installation">
        <p className="text-muted-foreground mb-6">
          If you want to add the documentation system to an existing Next.js project, you'll need to install the core dependencies first.
        </p>
        <CodeBlock code="npm install lucide-react motion clsx tailwind-merge" />
        
        <div className="mt-8 p-4 rounded-xl border border-primary/20 bg-primary/5">
          <h3 className="font-medium mb-2 flex items-center gap-2 text-primary">
            <Layout className="w-4 h-4" />
            Copy Components
          </h3>
          <p className="text-sm text-muted-foreground">
            Then, copy the <code>components/docs</code> directory and the <code>app/docs</code> route into your project to enable the documentation system.
          </p>
        </div>
      </Section>

      <Section title="Tailwind CSS v4">
        <p className="text-muted-foreground mb-6">
          This project uses Tailwind CSS v4. Make sure your <code>globals.css</code> imports tailwind correctly:
        </p>
        <CodeBlock code='@import "tailwindcss";' />
      </Section>
    </DocsContent>
  );
}
