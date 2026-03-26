"use client";

import React from "react";
import { DocsContent, Section, ComponentPreview } from "@/components/docs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export default function TooltipPage() {
  return (
    <DocsContent
      title="Tooltip"
      description="A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it."
      importPath='import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";'
    >
      <Section title="Usage" description="A basic tooltip.">
        <ComponentPreview
          code={`<TooltipProvider>
  <Tooltip content="Add to library">
    <TooltipTrigger asChild>
      <Button variant="outline">Hover me</Button>
    </TooltipTrigger>
  </Tooltip>
</TooltipProvider>`}
        >
          <TooltipProvider>
            <Tooltip content="Add to library">
              <TooltipTrigger asChild>
                <Button variant="outline">Hover me</Button>
              </TooltipTrigger>
            </Tooltip>
          </TooltipProvider>
        </ComponentPreview>
      </Section>
    </DocsContent>
  );
}
