"use client";

import React from "react";
import { DocsContent, Section, ComponentPreview, DemoCard, PropsTable } from "@/components/docs";
import { Typography } from "@/components/ui/typography";

export default function TypographyPage() {
  return (
    <DocsContent
      title="Typography"
      description="Styles for headings, paragraphs, lists...etc"
      importPath='import { Typography } from "@/components/ui/typography";'
    >
      <Section title="Headings" description="Use headings to create hierarchy in your content.">
        <ComponentPreview
          code={ `<Typography variant="h1">Heading 1</Typography>
<Typography variant="h2">Heading 2</Typography>
<Typography variant="h3">Heading 3</Typography>
<Typography variant="h4">Heading 4</Typography>`}
        >
          <div className="space-y-4 w-full">
            <Typography variant="h1">Heading 1</Typography>
            <Typography variant="h2">Heading 2</Typography>
            <Typography variant="h3">Heading 3</Typography>
            <Typography variant="h4">Heading 4</Typography>
          </div>
        </ComponentPreview>
      </Section>

      <Section title="Paragraphs & Text" description="Standard text styles for body content.">
        <ComponentPreview
          code={ `<Typography variant="p">
  The king thought long and hard, and finally, he decided to...
</Typography>
<Typography variant="lead">
  A modal dialog that interrupts the user with important content and expects a response.
</Typography>
<Typography variant="large">Are you absolutely sure?</Typography>
<Typography variant="small">Email address</Typography>
<Typography variant="muted">Enter your email address to receive updates.</Typography>`}
        >
          <div className="space-y-4 w-full">
            <Typography variant="p">
              The king thought long and hard, and finally, he decided to...
            </Typography>
            <Typography variant="lead">
              A modal dialog that interrupts the user with important content and expects a response.
            </Typography>
            <Typography variant="large">Are you absolutely sure?</Typography>
            <Typography variant="small">Email address</Typography>
            <Typography variant="muted">Enter your email address to receive updates.</Typography>
          </div>
        </ComponentPreview>
      </Section>

      <Section title="Other Elements" description="Blockquotes and inline code styles.">
        <ComponentPreview
          code={ `<Typography variant="blockquote">
  "After all," he said, "everyone enjoys a good joke now and then."
</Typography>
<Typography variant="code">@radix-ui/react-alert-dialog</Typography>`}
        >
          <div className="space-y-4 w-full">
            <Typography variant="blockquote">
              "After all," he said, "everyone enjoys a good joke now and then."
            </Typography>
            <Typography variant="code">@radix-ui/react-alert-dialog</Typography>
          </div>
        </ComponentPreview>
      </Section>

      <Section title="Props" description="Configuration options for the Typography component.">
        <PropsTable
          props={ [
            {
              name: "variant",
              type: '"h1" | "h2" | "h3" | "h4" | "p" | "blockquote" | "code" | "lead" | "large" | "small" | "muted"',
              default: '"p"',
              description: "The typographic style to apply.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional CSS classes to apply.",
            },
          ] }
        />
      </Section>
    </DocsContent>
  );
}
