"use client";

import { DocsContent, Section, ComponentPreview, PropsTable, DemoCard } from "@/components/docs";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export default function LabelDocs() {
  return (
    <DocsContent 
      title="Label" 
      description="Renders an accessible label associated with a control."
      importPath='import { Label } from "@/components/ui/label";'
    >
      <Section title="Usage">
        <ComponentPreview 
          code={`import { Label } from "@/components/ui/label";\nimport { Checkbox } from "@/components/ui/checkbox";\n\n<div className="flex items-center space-x-2">\n  <Checkbox id="terms" />\n  <Label htmlFor="terms">Accept terms and conditions</Label>\n</div>`}
        >
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms">Accept terms and conditions</Label>
          </div>
        </ComponentPreview>
      </Section>

      <Section title="Examples">
        <DemoCard>
          <div className="space-y-8 w-full max-w-sm mx-auto">
            <div className="space-y-2">
              <Label htmlFor="email-label">Email Address</Label>
              <Input id="email-label" type="email" placeholder="name@example.com" />
              <p className="text-[10px] text-muted-foreground font-medium">Standard input label</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Switch id="airplane-mode" />
              <div className="space-y-0.5">
                <Label htmlFor="airplane-mode">Airplane Mode</Label>
                <p className="text-[10px] text-muted-foreground font-medium">Toggle label with description</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Checkbox id="marketing" />
              <Label htmlFor="marketing" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Receive marketing emails
              </Label>
            </div>
          </div>
        </DemoCard>
      </Section>

      <Section title="Accessibility">
        <p className="text-muted-foreground">
          The label component is built using standard HTML <code>label</code> elements, which ensures it is accessible to screen readers and correctly associates with the input it labels via the <code>htmlFor</code> prop.
        </p>
      </Section>
    </DocsContent>
  );
}
