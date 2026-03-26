"use client";

import React from "react";
import { DocsContent, Section, ComponentPreview, DemoCard, PropsTable } from "@/components/docs";
import { InputGroup, InputGroupText } from "@/components/ui/input-group";
import { Input } from "@/components/ui/input";
import { Search, Mail, AtSign, DollarSign } from "lucide-react";

export default function InputGroupPage() {
  return (
    <DocsContent
      title="Input Group"
      description="A component for grouping inputs with icons, text, or buttons."
      importPath='import { InputGroup, InputGroupText } from "@/components/ui/input-group";'
    >
      <Section title="Usage" description="Basic input groups with text or icons.">
        <ComponentPreview
          code={`<div className="space-y-4 w-full max-w-sm">
  <InputGroup>
    <InputGroupText>@</InputGroupText>
    <Input className="rounded-l-none" placeholder="username" />
  </InputGroup>

  <InputGroup>
    <Input className="rounded-r-none" placeholder="Recipient's username" />
    <InputGroupText>@example.com</InputGroupText>
  </InputGroup>

  <InputGroup>
    <InputGroupText>$</InputGroupText>
    <Input className="rounded-none" placeholder="Amount" />
    <InputGroupText>.00</InputGroupText>
  </InputGroup>
</div>`}
        >
          <div className="space-y-4 w-full max-w-sm">
            <InputGroup>
              <InputGroupText>@</InputGroupText>
              <Input className="rounded-l-none" placeholder="username" />
            </InputGroup>

            <InputGroup>
              <Input className="rounded-r-none" placeholder="Recipient's username" />
              <InputGroupText>@example.com</InputGroupText>
            </InputGroup>

            <InputGroup>
              <InputGroupText>$</InputGroupText>
              <Input className="rounded-none" placeholder="Amount" />
              <InputGroupText>.00</InputGroupText>
            </InputGroup>
          </div>
        </ComponentPreview>
      </Section>

      <Section title="Icons" description="Using icons within input groups.">
        <ComponentPreview
          code={`<div className="space-y-4 w-full max-w-sm">
  <div className="relative">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
    <Input className="pl-10" placeholder="Search..." />
  </div>

  <div className="relative">
    <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
    <Input className="pr-10" placeholder="Email address" />
  </div>
</div>`}
        >
          <div className="space-y-4 w-full max-w-sm">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <Input className="pl-10" placeholder="Search..." />
            </div>

            <div className="relative">
              <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <Input className="pr-10" placeholder="Email address" />
            </div>
          </div>
        </ComponentPreview>
      </Section>
    </DocsContent>
  );
}
