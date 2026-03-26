import { DocsContent, Section, CodeBlock } from "@/components/docs";
import { BookOpen, Code, Layers, Palette } from "lucide-react";

export default function DocsPage() {
  return (
    <DocsContent 
      title="Introduction" 
      description="Welcome to the Modern UI documentation. This project is a production-ready Next.js boilerplate with a built-in documentation system for all your UI components."
    >
      <Section title="Overview">
        <p className="text-muted-foreground mb-10">
          Modern UI is designed to help you build and document your UI library with ease. 
          It comes with a set of pre-built documentation helpers that make it simple to showcase 
          your components, explain their props, and provide interactive previews.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="p-8 border border-border/60 rounded-3xl bg-card shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center mb-6">
              <Layers className="text-primary" size={24} />
            </div>
            <h4 className="text-lg font-bold mb-2">Component-Driven</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">Focus on building reusable components and let the docs handle the rest.</p>
          </div>
          <div className="p-8 border border-border/60 rounded-3xl bg-card shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center mb-6">
              <Code className="text-primary" size={24} />
            </div>
            <h4 className="text-lg font-bold mb-2">Interactive Previews</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">Live previews with copyable code snippets for every component.</p>
          </div>
          <div className="p-8 border border-border/60 rounded-3xl bg-card shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center mb-6">
              <Palette className="text-primary" size={24} />
            </div>
            <h4 className="text-lg font-bold mb-2">Tailwind Powered</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">Fully styled with Tailwind CSS v4 for modern, responsive designs.</p>
          </div>
          <div className="p-8 border border-border/60 rounded-3xl bg-card shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center mb-6">
              <BookOpen className="text-primary" size={24} />
            </div>
            <h4 className="text-lg font-bold mb-2">Developer Experience</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">TypeScript first with clear prop definitions and usage guidelines.</p>
          </div>
        </div>
      </Section>

      <Section title="Quick Start">
        <p className="text-muted-foreground mb-6">
          To get started, you can install the dependencies and start the development server.
        </p>
        <CodeBlock code="npm install\nnpm run dev" />
      </Section>

      <Section title="Usage Guidelines">
        <p className="text-muted-foreground mb-6">
          When building and documenting new components, follow these best practices:
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-muted-foreground">
          <li className="p-4 bg-muted border border-border/60 rounded-xl text-sm">
            <strong className="block text-foreground mb-1">Component Location</strong>
            Store all reusable UI components in <code>components/ui/</code>.
          </li>
          <li className="p-4 bg-muted border border-border/60 rounded-xl text-sm">
            <strong className="block text-foreground mb-1">Documentation Route</strong>
            Create a new page in <code>app/docs/components/[name]/page.tsx</code>.
          </li>
          <li className="p-4 bg-muted border border-border/60 rounded-xl text-sm">
            <strong className="block text-foreground mb-1">Sidebar Navigation</strong>
            Add the new component to the <code>DOCS_NAVIGATION</code> constant.
          </li>
          <li className="p-4 bg-muted border border-border/60 rounded-xl text-sm">
            <strong className="block text-foreground mb-1">Interactive Previews</strong>
            Use the <code>&lt;ComponentPreview /&gt;</code> helper for live demos.
          </li>
        </ul>
      </Section>

      <Section title="Keyboard Accessibility">
        <p className="text-muted-foreground mb-6">
          All components are built with accessibility in mind, following WAI-ARIA patterns. Common patterns include:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 border border-border/60 rounded-xl text-center">
            <code className="block text-primary font-bold mb-1">Tab</code>
            <span className="text-xs text-muted-foreground">Move focus</span>
          </div>
          <div className="p-4 border border-border/60 rounded-xl text-center">
            <code className="block text-primary font-bold mb-1">Enter / Space</code>
            <span className="text-xs text-muted-foreground">Activate</span>
          </div>
          <div className="p-4 border border-border/60 rounded-xl text-center">
            <code className="block text-primary font-bold mb-1">Arrow Keys</code>
            <span className="text-xs text-muted-foreground">Navigate</span>
          </div>
          <div className="p-4 border border-border/60 rounded-xl text-center">
            <code className="block text-primary font-bold mb-1">Esc</code>
            <span className="text-xs text-muted-foreground">Close</span>
          </div>
        </div>
      </Section>
    </DocsContent>
  );
}
