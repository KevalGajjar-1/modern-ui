"use client";

import React from "react";
import { DocsContent, Section, ComponentPreview } from "@/components/docs";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function SheetPage() {
  return (
    <DocsContent
      title="Sheet"
      description="Extends the Dialog component to display content that complements the main content of the screen."
      importPath='import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";'
    >
      <Section title="Usage" description="A basic sheet that slides in from the right.">
        <ComponentPreview
          code={`<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Open Sheet</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Edit profile</SheetTitle>
      <SheetDescription>
        Make changes to your profile here. Click save when you're done.
      </SheetDescription>
    </SheetHeader>
    <div className="grid gap-4 py-4">
      <p className="text-sm text-muted-foreground">
        This is where your form fields or other content would go.
      </p>
    </div>
  </SheetContent>
</Sheet>`}
        >
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Open Sheet</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Edit profile</SheetTitle>
                <SheetDescription>
                  Make changes to your profile here. Click save when you're done.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <p className="text-sm text-muted-foreground">
                  This is where your form fields or other content would go.
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </ComponentPreview>
      </Section>

      <Section title="Sides" description="The sheet can slide in from any side.">
        <div className="grid grid-cols-2 gap-4">
          <ComponentPreview
            code={`<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Top</Button>
  </SheetTrigger>
  <SheetContent side="top">
    <SheetHeader>
      <SheetTitle>Top Sheet</SheetTitle>
    </SheetHeader>
  </SheetContent>
</Sheet>`}
          >
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">Top</Button>
              </SheetTrigger>
              <SheetContent side="top">
                <SheetHeader>
                  <SheetTitle>Top Sheet</SheetTitle>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </ComponentPreview>

          <ComponentPreview
            code={`<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Bottom</Button>
  </SheetTrigger>
  <SheetContent side="bottom">
    <SheetHeader>
      <SheetTitle>Bottom Sheet</SheetTitle>
    </SheetHeader>
  </SheetContent>
</Sheet>`}
          >
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">Bottom</Button>
              </SheetTrigger>
              <SheetContent side="bottom">
                <SheetHeader>
                  <SheetTitle>Bottom Sheet</SheetTitle>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </ComponentPreview>

          <ComponentPreview
            code={`<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Left</Button>
  </SheetTrigger>
  <SheetContent side="left">
    <SheetHeader>
      <SheetTitle>Left Sheet</SheetTitle>
    </SheetHeader>
  </SheetContent>
</Sheet>`}
          >
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">Left</Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Left Sheet</SheetTitle>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </ComponentPreview>

          <ComponentPreview
            code={`<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Right</Button>
  </SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Right Sheet</SheetTitle>
    </SheetHeader>
  </SheetContent>
</Sheet>`}
          >
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">Right</Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Right Sheet</SheetTitle>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </ComponentPreview>
        </div>
      </Section>
    </DocsContent>
  );
}
