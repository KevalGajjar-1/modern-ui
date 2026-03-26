"use client";

import { DocsContent, Section, ComponentPreview, PropsTable, DemoCard } from "@/components/docs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function TextareaDocs() {
  return (
    <DocsContent 
      title="Textarea" 
      description="A multi-line text input field."
      importPath='import { Textarea } from "@/components/ui/textarea";'
    >
      <Section title="Usage">
        <ComponentPreview 
          code={`import { Textarea } from "@/components/ui/textarea";\nimport { Label } from "@/components/ui/label";\n\n<div className="grid w-full gap-1.5">\n  <Label htmlFor="message">Your message</Label>\n  <Textarea placeholder="Type your message here." id="message" />\n</div>`}
        >
          <div className="grid w-full gap-1.5 max-w-sm">
            <Label htmlFor="message">Your message</Label>
            <Textarea placeholder="Type your message here." id="message" />
          </div>
        </ComponentPreview>
      </Section>

      <Section title="Examples">
        <DemoCard>
          <div className="space-y-8 w-full max-w-md mx-auto">
            <div className="space-y-2">
              <Label htmlFor="bio">Biography</Label>
              <Textarea 
                id="bio" 
                placeholder="Tell us a little bit about yourself" 
                className="min-h-[120px] resize-none"
              />
              <p className="text-[10px] text-muted-foreground font-medium">You can @mention other users and organizations.</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="feedback" className="text-destructive">Feedback</Label>
              <Textarea 
                id="feedback" 
                placeholder="What can we improve?" 
                className="border-destructive focus-visible:ring-destructive"
              />
              <p className="text-[10px] text-destructive font-medium">Please provide at least 10 characters.</p>
            </div>

            <div className="flex justify-end">
              <Button size="sm">Submit Feedback</Button>
            </div>
          </div>
        </DemoCard>
      </Section>

      <Section title="States">
        <DemoCard>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl mx-auto">
            <div className="space-y-2">
              <Label className="text-muted-foreground">Disabled</Label>
              <Textarea disabled placeholder="This textarea is disabled" />
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground">Read Only</Label>
              <Textarea readOnly value="This content is read-only and cannot be edited." />
            </div>
          </div>
        </DemoCard>
      </Section>
    </DocsContent>
  );
}
