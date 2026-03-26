"use client";

import { DocsContent, Section, ComponentPreview, PropsTable, DemoCard } from "@/components/docs";
import { Button } from "@/components/ui/button";
import { Mail, Loader2, ArrowRight } from "lucide-react";

export default function ButtonDocs() {
  return (
    <DocsContent 
      title="Button" 
      description="Displays a button or a component that looks like a button."
      importPath='import { Button } from "@/components/ui/button";'
    >
      <Section title="Usage">
        <ComponentPreview 
          code={`import { Button } from "@/components/ui/button";\n\n<Button>Click me</Button>`}
        >
          <Button>Click me</Button>
        </ComponentPreview>
      </Section>

      <Section title="Variants">
        <DemoCard>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center gap-3">
              <Button variant="default">Default</Button>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Default</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Button variant="secondary">Secondary</Button>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Secondary</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Button variant="outline">Outline</Button>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Outline</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Button variant="destructive">Destructive</Button>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Destructive</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Button variant="ghost">Ghost</Button>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Ghost</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Button variant="link">Link</Button>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Link</span>
            </div>
          </div>
        </DemoCard>
      </Section>

      <Section title="Sizes">
        <DemoCard>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <div className="flex flex-col items-center gap-3">
              <Button size="sm">Small</Button>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">sm</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Button size="default">Default</Button>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">default</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Button size="lg">Large</Button>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">lg</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Button size="icon"><Mail size={16} /></Button>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">icon</span>
            </div>
          </div>
        </DemoCard>
      </Section>

      <Section title="States">
        <DemoCard>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <Button disabled>Disabled</Button>
            <Button>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
            <Button>
              Login <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </DemoCard>
      </Section>

      <Section title="Props">
        <PropsTable 
          props={[
            { name: "variant", type: "'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'", default: "'default'", description: "The visual style of the button." },
            { name: "size", type: "'default' | 'sm' | 'lg' | 'icon'", default: "'default'", description: "The size of the button." },
            { name: "asChild", type: "boolean", default: "false", description: "Change the default rendered element for the one passed as a child, merging their props and behavior." },
            { name: "className", type: "string", default: "-", description: "Additional CSS classes to apply." },
          ]}
        />
      </Section>

      <Section title="Accessibility">
        <p className="text-muted-foreground">
          The button component uses standard HTML <code>&lt;button&gt;</code> element, ensuring it is keyboard accessible and screen reader friendly by default.
        </p>
      </Section>
    </DocsContent>
  );
}
