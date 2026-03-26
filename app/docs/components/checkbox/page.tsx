"use client";

import { DocsContent, Section, ComponentPreview, PropsTable, DemoCard } from "@/components/docs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function CheckboxDocs() {
  return (
    <DocsContent 
      title="Checkbox" 
      description="A control that allows the user to toggle between checked and not checked."
      importPath='import { Checkbox } from "@/components/ui/checkbox";'
    >
      <Section title="Usage">
        <ComponentPreview 
          code={`import { Checkbox } from "@/components/ui/checkbox";\nimport { Label } from "@/components/ui/label";\n\n<div className="flex items-center space-x-2">\n  <Checkbox id="terms" />\n  <Label htmlFor="terms">Accept terms and conditions</Label>\n</div>`}
        >
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms">Accept terms and conditions</Label>
          </div>
        </ComponentPreview>
      </Section>

      <Section title="States">
        <DemoCard>
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <Checkbox id="checked" defaultChecked />
              <Label htmlFor="checked">Checked</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="disabled" disabled />
              <Label htmlFor="disabled" className="opacity-50">Disabled</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="disabled-checked" disabled defaultChecked />
              <Label htmlFor="disabled-checked" className="opacity-50">Disabled Checked</Label>
            </div>
          </div>
        </DemoCard>
      </Section>

      <Section title="Accessibility">
        <p className="text-muted-foreground">
          The checkbox component is built using a native checkbox input for accessibility, following the WAI-ARIA Checkbox pattern. It handles keyboard navigation (Space) and state management automatically.
        </p>
      </Section>
    </DocsContent>
  );
}
