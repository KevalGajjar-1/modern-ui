"use client";

import React from "react";
import { DocsContent, Section, ComponentPreview, DemoCard, PropsTable } from "@/components/docs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function AvatarPage() {
  return (
    <DocsContent
      title="Avatar"
      description="An image element with a fallback for representing the user."
      importPath='import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";'
    >
      <Section title="Usage" description="The standard avatar with an image and fallback.">
        <ComponentPreview
          code={`<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>`}
        >
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </ComponentPreview>
      </Section>

      <Section title="Fallback" description="The fallback is shown when the image fails to load.">
        <ComponentPreview
          code={`<Avatar>
  <AvatarImage src="/broken-image.jpg" alt="@user" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>`}
        >
          <Avatar>
            <AvatarImage src="/broken-image.jpg" alt="@user" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </ComponentPreview>
      </Section>

      <Section title="Sizes" description="Avatars can be sized using standard Tailwind classes.">
        <ComponentPreview
          code={`<div className="flex items-end gap-4">
  <Avatar className="h-8 w-8">
    <AvatarImage src="https://github.com/shadcn.png" />
    <AvatarFallback>SM</AvatarFallback>
  </Avatar>
  <Avatar className="h-12 w-12">
    <AvatarImage src="https://github.com/shadcn.png" />
    <AvatarFallback>MD</AvatarFallback>
  </Avatar>
  <Avatar className="h-16 w-16">
    <AvatarImage src="https://github.com/shadcn.png" />
    <AvatarFallback>LG</AvatarFallback>
  </Avatar>
</div>`}
        >
          <div className="flex items-end gap-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>SM</AvatarFallback>
            </Avatar>
            <Avatar className="h-12 w-12">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>MD</AvatarFallback>
            </Avatar>
            <Avatar className="h-16 w-16">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>LG</AvatarFallback>
            </Avatar>
          </div>
        </ComponentPreview>
      </Section>

      <Section title="Props" description="Configuration options for the Avatar components.">
        <h3 className="text-lg font-semibold mb-4">Avatar</h3>
        <PropsTable
          props={[
            {
              name: "className",
              type: "string",
              description: "Additional CSS classes to apply.",
            },
          ]}
        />
        <h3 className="text-lg font-semibold mb-4 mt-8">AvatarImage</h3>
        <PropsTable
          props={[
            {
              name: "src",
              type: "string",
              description: "The source URL of the image.",
            },
            {
              name: "alt",
              type: "string",
              description: "The alternative text for the image.",
            },
          ]}
        />
      </Section>
      <Section title="Accessibility">
        <p className="text-muted-foreground">
          The avatar component is built with primitives to ensure it follows the WAI-ARIA Avatar pattern. It handles image loading states and provides a fallback for screen readers.
        </p>
      </Section>
    </DocsContent>
  );
}
