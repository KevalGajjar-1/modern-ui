"use client";

import { DocsContent, Section, ComponentPreview, PropsTable, DemoCard } from "@/components/docs";
import { Badge } from "@/components/ui/badge";

export default function BadgeDocs() {
  return (
    <DocsContent 
      title="Badge" 
      description="Displays a badge or a component that looks like a badge."
      importPath='import { Badge } from "@/components/ui/badge";'
    >
      <Section title="Usage">
        <ComponentPreview 
          code={`import { Badge } from "@/components/ui/badge";\n\n<Badge>Badge</Badge>`}
        >
          <Badge>Badge</Badge>
        </ComponentPreview>
      </Section>

      <Section title="Variants">
        <DemoCard>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <div className="flex flex-col items-center gap-3">
              <Badge variant="default">Default</Badge>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Default</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Badge variant="secondary">Secondary</Badge>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Secondary</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Badge variant="outline">Outline</Badge>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Outline</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Badge variant="destructive">Destructive</Badge>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Destructive</span>
            </div>
          </div>
        </DemoCard>
      </Section>

      <Section title="Props">
        <PropsTable 
          props={[
            { name: "variant", type: "'default' | 'secondary' | 'outline' | 'destructive'", default: "'default'", description: "The visual style of the badge." },
            { name: "className", type: "string", default: "-", description: "Additional CSS classes to apply." },
          ]}
        />
      </Section>
    </DocsContent>
  );
}
