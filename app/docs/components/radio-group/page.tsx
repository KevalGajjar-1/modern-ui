"use client";

import React from "react";
import { DocsContent, Section, ComponentPreview, DemoCard, PropsTable } from "@/components/docs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function RadioGroupPage() {
  return (
    <DocsContent
      title="Radio Group"
      description="A set of checkable buttons—known as radio buttons—where no more than one button can be checked at a time."
      importPath='import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";'
    >
      <Section title="Usage" description="Basic radio group with labels.">
        <ComponentPreview
          code={`<RadioGroup defaultValue="option-one">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-one" id="option-one" />
    <Label htmlFor="option-one">Option One</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-two" id="option-two" />
    <Label htmlFor="option-two">Option Two</Label>
  </div>
</RadioGroup>`}
        >
          <RadioGroup defaultValue="option-one">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-one" id="option-one" />
              <Label htmlFor="option-one">Option One</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-two" id="option-two" />
              <Label htmlFor="option-two">Option Two</Label>
            </div>
          </RadioGroup>
        </ComponentPreview>
      </Section>

      <Section title="Orientation" description="Radio groups can be oriented horizontally.">
        <ComponentPreview
          code={`<RadioGroup defaultValue="comfortable" className="flex gap-6">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="default" id="r1" />
    <Label htmlFor="r1">Default</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="comfortable" id="r2" />
    <Label htmlFor="r2">Comfortable</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="compact" id="r3" />
    <Label htmlFor="r3">Compact</Label>
  </div>
</RadioGroup>`}
        >
          <RadioGroup defaultValue="comfortable" className="flex gap-6">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="default" id="r1" />
              <Label htmlFor="r1">Default</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="comfortable" id="r2" />
              <Label htmlFor="r2">Comfortable</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="compact" id="r3" />
              <Label htmlFor="r3">Compact</Label>
            </div>
          </RadioGroup>
        </ComponentPreview>
      </Section>

      <Section title="Props" description="Configuration options for the Radio Group components.">
        <h3 className="text-lg font-semibold mb-4">RadioGroup</h3>
        <PropsTable
          props={[
            {
              name: "defaultValue",
              type: "string",
              description: "The value of the radio item that should be checked by default.",
            },
            {
              name: "onValueChange",
              type: "(value: string) => void",
              description: "Event handler called when the value changes.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional CSS classes to apply.",
            },
          ]}
        />
        <h3 className="text-lg font-semibold mb-4 mt-8">RadioGroupItem</h3>
        <PropsTable
          props={[
            {
              name: "value",
              type: "string",
              description: "The value of the radio item.",
            },
            {
              name: "id",
              type: "string",
              description: "The unique ID for the radio item.",
            },
          ]}
        />
      </Section>
    </DocsContent>
  );
}
