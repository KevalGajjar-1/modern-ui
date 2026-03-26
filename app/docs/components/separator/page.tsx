import { DocsContent, Section, ComponentPreview, PropsTable, DemoCard } from "@/components/docs";
import { Separator } from "@/components/ui/separator";

export default function SeparatorDocs() {
  return (
    <DocsContent 
      title="Separator" 
      description="Visually or semantically separates content."
      importPath='import { Separator } from "@/components/ui/separator";'
    >
      <Section title="Usage">
        <ComponentPreview 
          code={`import { Separator } from "@/components/ui/separator";\n\n<div>\n  <div className="space-y-1">\n    <h4 className="text-sm font-medium leading-none">UI Boilerplate</h4>\n    <p className="text-sm text-muted-foreground">A custom design system built with Tailwind CSS.</p>\n  </div>\n  <Separator className="my-4" />\n  <div className="flex h-5 items-center space-x-4 text-sm">\n    <div>Blog</div>\n    <Separator orientation="vertical" />\n    <div>Docs</div>\n    <Separator orientation="vertical" />\n    <div>Source</div>\n  </div>\n</div>`}
        >
          <div className="max-w-md">
            <div className="space-y-1">
              <h4 className="text-sm font-medium leading-none">UI Boilerplate</h4>
              <p className="text-sm text-muted-foreground">A custom design system built with Tailwind CSS.</p>
            </div>
            <Separator className="my-4" />
            <div className="flex h-5 items-center space-x-4 text-sm">
              <div>Blog</div>
              <Separator orientation="vertical" />
              <div>Docs</div>
              <Separator orientation="vertical" />
              <div>Source</div>
            </div>
          </div>
        </ComponentPreview>
      </Section>

      <Section title="Examples">
        <DemoCard>
          <div className="flex flex-col items-center gap-8 py-4">
            <div className="w-full max-w-xs space-y-4">
              <div className="flex items-center justify-between px-2">
                <span className="text-sm font-medium">Notifications</span>
                <span className="text-xs text-primary font-medium">Enabled</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between px-2">
                <span className="text-sm font-medium">Dark Mode</span>
                <span className="text-xs text-muted-foreground">System</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between px-2">
                <span className="text-sm font-medium">Language</span>
                <span className="text-xs text-muted-foreground">English</span>
              </div>
            </div>

            <div className="flex h-10 items-center gap-6 px-6 py-2 rounded-full bg-muted/50 border border-border">
              <span className="text-xs font-medium text-muted-foreground">Profile</span>
              <Separator orientation="vertical" className="h-4" />
              <span className="text-xs font-medium text-muted-foreground">Settings</span>
              <Separator orientation="vertical" className="h-4" />
              <span className="text-xs font-medium text-muted-foreground">Logout</span>
            </div>
          </div>
        </DemoCard>
      </Section>

      <Section title="Props">
        <PropsTable 
          props={[
            { name: "orientation", type: "'horizontal' | 'vertical'", default: "'horizontal'", description: "The orientation of the separator." },
            { name: "decorative", type: "boolean", default: "true", description: "Whether the separator is decorative only." },
            { name: "className", type: "string", default: "-", description: "Additional CSS classes to apply." },
          ]}
        />
      </Section>
    </DocsContent>
  );
}
