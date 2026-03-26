"use client";

import { DocsContent, Section, ComponentPreview, PropsTable, DemoCard } from "@/components/docs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function AccordionDocs() {
  return (
    <DocsContent 
      title="Accordion" 
      description="A vertically stacked set of interactive headings that each reveal a section of content."
      importPath='import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";'
    >
      <Section title="Usage">
        <ComponentPreview 
          code={`import {\n  Accordion,\n  AccordionContent,\n  AccordionItem,\n  AccordionTrigger,\n} from "@/components/ui/accordion";\n\n<Accordion type="single" className="w-full">\n  <AccordionItem value="item-1">\n    <AccordionTrigger>Is it accessible?</AccordionTrigger>\n    <AccordionContent>\n      Yes. It adheres to the WAI-ARIA design pattern.\n    </AccordionContent>\n  </AccordionItem>\n  <AccordionItem value="item-2">\n    <AccordionTrigger>Is it styled?</AccordionTrigger>\n    <AccordionContent>\n      Yes. It comes with default styles that matches the other components&apos; aesthetic.\n    </AccordionContent>\n  </AccordionItem>\n  <AccordionItem value="item-3">\n    <AccordionTrigger>Is it animated?</AccordionTrigger>\n    <AccordionContent>\n      Yes. It&apos;s animated by default, but you can disable it if you prefer.\n    </AccordionContent>\n  </AccordionItem>\n</Accordion>`}
        >
          <Accordion type="single" className="w-full max-w-md">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it styled?</AccordionTrigger>
              <AccordionContent>
                Yes. It comes with default styles that matches the other components' aesthetic.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is it animated?</AccordionTrigger>
              <AccordionContent>
                Yes. It's animated by default, but you can disable it if you prefer.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ComponentPreview>
      </Section>

      <Section title="Multiple">
        <DemoCard>
          <div className="w-full max-w-md mx-auto">
            <Accordion type="multiple">
              <AccordionItem value="item-1">
                <AccordionTrigger>Can I open multiple items?</AccordionTrigger>
                <AccordionContent>
                  Yes, by setting the `type` prop to `multiple`.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is there a limit?</AccordionTrigger>
                <AccordionContent>
                  No, you can open as many items as you want in multiple mode.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </DemoCard>
      </Section>

      <Section title="Accessibility">
        <p className="text-muted-foreground">
          The accordion component is built with custom logic to ensure it follows the WAI-ARIA Accordion pattern. It handles keyboard navigation and state management automatically.
        </p>
      </Section>
    </DocsContent>
  );
}
