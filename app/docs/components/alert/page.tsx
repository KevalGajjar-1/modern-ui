"use client";

import { DocsContent, Section, ComponentPreview, PropsTable, DemoCard } from "@/components/docs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, Info, CheckCircle2, AlertCircle } from "lucide-react";

export default function AlertDocs() {
  return (
    <DocsContent 
      title="Alert" 
      description="Displays a callout for user attention."
      importPath='import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";'
    >
      <Section title="Usage">
        <ComponentPreview 
          code={`import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";\n\n<Alert>\n  <AlertTitle>Heads up!</AlertTitle>\n  <AlertDescription>\n    You can add components to your app using the cli.\n  </AlertDescription>\n</Alert>`}
        >
          <Alert className="max-w-md">
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              You can add components to your app using the cli.
            </AlertDescription>
          </Alert>
        </ComponentPreview>
      </Section>

      <Section title="Variants">
        <DemoCard>
          <div className="space-y-4 w-full max-w-md mx-auto">
            <Alert variant="default">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Default</AlertTitle>
              <AlertDescription>This is a default alert.</AlertDescription>
            </Alert>
            <Alert variant="info">
              <Info className="h-4 w-4" />
              <AlertTitle>Info</AlertTitle>
              <AlertDescription>This is an informational alert.</AlertDescription>
            </Alert>
            <Alert variant="success">
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>Your changes have been saved.</AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Something went wrong. Please try again.</AlertDescription>
            </Alert>
          </div>
        </DemoCard>
      </Section>

      <Section title="Props">
        <PropsTable 
          props={[
            { name: "variant", type: "'default' | 'destructive' | 'success' | 'info'", default: "'default'", description: "The visual style of the alert." },
            { name: "className", type: "string", default: "-", description: "Additional CSS classes to apply." },
          ]}
        />
      </Section>
    </DocsContent>
  );
}
