"use client";

import React, { useState } from "react";
import { DocsContent, Section, ComponentPreview, PropsTable } from "@/components/docs";
import { Portal } from "@/components/ui/portal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function PortalPage() {
  const [showModal, setShowModal] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <DocsContent
      title="Portal"
      description="A utility component that renders its children outside the normal DOM hierarchy. Perfect for modals, tooltips, and overlays that need to break out of container constraints."
      importPath='import { Portal } from "@/components/ui/portal";'
    >

      <Section id="basic" title="Basic Modal"
        description="Portal renders children at document.body level, escaping any overflow:hidden or z-index stacking contexts.">
        <ComponentPreview code={`const [open, setOpen] = useState(false);

<Portal>
  {open && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="p-6 max-w-sm">
        <h3 className="text-lg font-semibold mb-2">Modal Content</h3>
        <p className="text-sm text-muted-foreground mb-4">
          This modal is portaled to document.body.
        </p>
        <Button onClick={() => setOpen(false)}>Close</Button>
      </Card>
    </div>
  )}
</Portal>`}>
        <div>
          <Button onClick={() => setShowModal(true)}>Open Modal</Button>
          
          <Portal>
            {showModal && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <Card className="p-6 max-w-sm">
                  <h3 className="text-lg font-semibold mb-2">Portal Modal</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    This modal renders at document.body level.
                  </p>
                  <Button onClick={() => setShowModal(false)}>Close</Button>
                </Card>
              </div>
            )}
          </Portal>
        </div>
      </ComponentPreview>
      </Section>

      <Section id="props" title="API Reference">
        <PropsTable props={[
          { name: "children", type: "React.ReactNode", default: "required", description: "Content to render in the portal." },
        ]} />
      </Section>
    </DocsContent>
  );
}
