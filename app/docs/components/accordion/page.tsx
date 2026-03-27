"use client";

import React, { useState } from "react";
import { DocsContent, Section, ComponentPreview, PropsTable } from "@/components/docs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ChevronRight,
  HelpCircle,
  Settings,
  Users,
  CreditCard,
  Shield,
  Zap,
  FileText,
  Download,
  Star,
  CheckCircle2,
  AlertCircle,
  Info,
  Plus,
  Minus,
  Layout,
  Clock,
} from "lucide-react";

export default function AccordionPage() {
  const [value, setValue] = useState("item-1");
  const [multipleValue, setMultipleValue] = useState<string[]>(["item-1"]);

  return (
    <DocsContent
      title="Accordion"
      description="A vertically stacked set of interactive headings that reveal sections of content. Supports single and multiple selection modes, custom triggers, icons, and disabled states."
      importPath='import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";'
    >

      {/* ══════════════════════════════════════
          1. BASIC SINGLE
      ══════════════════════════════════════ */}
      <Section
        id="basic"
        title="Single Selection"
        description="Only one item can be expanded at a time. Clicking another item automatically closes the previous one."
      >
        <ComponentPreview
          code={`<Accordion type="single" defaultValue="item-1" className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Is it styled?</AccordionTrigger>
    <AccordionContent>
      Yes. It comes with default styles that match the design system.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-3">
    <AccordionTrigger>Is it animated?</AccordionTrigger>
    <AccordionContent>
      Yes. It's animated by default, but you can disable it.
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
        >
          <div className="w-full max-w-md">
            <Accordion type="single" defaultValue="item-1" className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>
                  Yes. It comes with default styles that match the design system.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is it animated?</AccordionTrigger>
                <AccordionContent>
                  Yes. It's animated by default, but you can disable it.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          2. MULTIPLE SELECTION
      ══════════════════════════════════════ */}
      <Section
        id="multiple"
        title="Multiple Selection"
        description="Allow multiple items to be expanded simultaneously. Perfect for FAQ sections or settings panels."
      >
        <ComponentPreview
          code={`const [value, setValue] = useState<string[]>(["item-1"]);

<Accordion type="multiple" value={value} onValueChange={setValue} className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger>Can I open multiple items?</AccordionTrigger>
    <AccordionContent>
      Yes, by setting the type prop to "multiple".
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Is there a limit?</AccordionTrigger>
    <AccordionContent>
      No, you can open as many items as you want in multiple mode.
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
        >
          <div className="w-full max-w-md">
            <Accordion type="multiple" value={multipleValue} onValueChange={(value) => setMultipleValue(value as string[])} className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Can I open multiple items?</AccordionTrigger>
                <AccordionContent>
                  Yes, by setting the type prop to "multiple".
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is there a limit?</AccordionTrigger>
                <AccordionContent>
                  No, you can open as many items as you want in multiple mode.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Can I control it programmatically?</AccordionTrigger>
                <AccordionContent>
                  Yes, use the value and onValueChange props for full control.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="mt-3 text-xs text-muted-foreground">
              Selected: {multipleValue.join(", ") || "None"}
            </div>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          3. CUSTOM ICONS
      ══════════════════════════════════════ */}
      <Section
        id="icons"
        title="Custom Icons"
        description="Replace the default chevron with any icon. Perfect for different contexts like settings, help sections, or documentation."
      >
        <ComponentPreview
          code={`<Accordion type="single" className="w-full">
  <AccordionItem value="settings">
    <AccordionTrigger>
      <Settings className="h-4 w-4 mr-2" />
      Account Settings
    </AccordionTrigger>
    <AccordionContent>
      Manage your account preferences and security settings.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="billing">
    <AccordionTrigger>
      <CreditCard className="h-4 w-4 mr-2" />
      Billing & Plans
    </AccordionTrigger>
    <AccordionContent>
      View your subscription and payment methods.
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
        >
          <div className="w-full max-w-md">
            <Accordion type="single" className="w-full">
              <AccordionItem value="settings">
                <AccordionTrigger>
                  <Settings className="h-4 w-4 mr-2" />
                  Account Settings
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Email Notifications</span>
                      <Button size="sm" variant="outline">Configure</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Two-Factor Auth</span>
                      <Badge variant="secondary">Enabled</Badge>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="billing">
                <AccordionTrigger>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Billing & Plans
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Current Plan</span>
                      <Badge>Pro</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Next Billing</span>
                      <span className="text-sm text-muted-foreground">Dec 1, 2025</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="security">
                <AccordionTrigger>
                  <Shield className="h-4 w-4 mr-2" />
                  Security
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pb-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Password protection enabled</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Login monitoring active</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          4. DISABLED ITEMS
      ══════════════════════════════════════ */}
      <Section
        id="disabled"
        title="Disabled Items"
        description="Disable individual accordion items to prevent interaction while keeping them visible."
      >
        <ComponentPreview
          code={`<Accordion type="single" className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger>Available Feature</AccordionTrigger>
    <AccordionContent>
      This feature is ready to use.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2" disabled>
    <AccordionTrigger>Coming Soon</AccordionTrigger>
    <AccordionContent>
      This feature is not available yet.
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
        >
          <div className="w-full max-w-md">
            <Accordion type="single" className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <Zap className="h-4 w-4 mr-2" />
                  Performance Analytics
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 pb-4">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">Page load time: 1.2s</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">Core Web Vitals: Good</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" disabled>
                <AccordionTrigger>
                  <Users className="h-4 w-4 mr-2" />
                  Team Collaboration (Coming Soon)
                </AccordionTrigger>
                <AccordionContent>
                  This feature will be available in the next release.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          5. RICH CONTENT
      ══════════════════════════════════════ */}
      <Section
        id="rich-content"
        title="Rich Content"
        description="Accordion items can contain any content - forms, lists, images, or complex layouts."
      >
        <ComponentPreview
          code={`<Accordion type="multiple" className="w-full">
  <AccordionItem value="documents">
    <AccordionTrigger>
      <FileText className="h-4 w-4 mr-2" />
      Documents
    </AccordionTrigger>
    <AccordionContent>
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 border rounded-lg">
          <span className="text-sm">Q4 Report.pdf</span>
          <Button size="sm" variant="outline">
            <Download className="h-3 w-3 mr-1" />
            Download
          </Button>
        </div>
        <div className="flex items-center justify-between p-3 border rounded-lg">
          <span className="text-sm">Budget.xlsx</span>
          <Button size="sm" variant="outline">
            <Download className="h-3 w-3 mr-1" />
            Download
          </Button>
        </div>
      </div>
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
        >
          <div className="w-full max-w-md">
            <Accordion type="multiple" defaultValue={["documents"]} className="w-full">
              <AccordionItem value="documents">
                <AccordionTrigger>
                  <FileText className="h-4 w-4 mr-2" />
                  Documents (3)
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 pb-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">Q4 Report.pdf</span>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Budget.xlsx</span>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-orange-500" />
                        <span className="text-sm">Presentation.pptx</span>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="notifications">
                <AccordionTrigger>
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Notifications
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pb-4">
                    <div className="flex items-start gap-3 p-3 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/20">
                      <Info className="h-4 w-4 text-blue-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">System Update</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          New features available in v2.4.0
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20">
                      <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Storage Warning</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          You're using 85% of your storage
                        </p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          6. CONTROLLED STATE
      ══════════════════════════════════════ */}
      <Section
        id="controlled"
        title="Controlled State"
        description="Programmatically control which items are expanded using the value and onValueChange props."
      >
        <ComponentPreview
          code={`const [value, setValue] = useState("item-1");

const handleExpand = (item: string) => {
  setValue(value === item ? "" : item);
};

<Accordion type="single" value={value} onValueChange={setValue} className="w-full">
  {/* Items */}
</Accordion>

<div className="flex gap-2 mt-4">
  <Button size="sm" onClick={() => setValue("item-1")}>Expand 1</Button>
  <Button size="sm" onClick={() => setValue("")}>Collapse All</Button>
</div>`}
        >
          <div className="w-full max-w-md">
            <Accordion type="single" value={value} onValueChange={(newValue) => setValue(newValue as string)} className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>First Item</AccordionTrigger>
                <AccordionContent>
                  This item is controlled programmatically.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Second Item</AccordionTrigger>
                <AccordionContent>
                  This item is also controlled programmatically.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Third Item</AccordionTrigger>
                <AccordionContent>
                  This item is also controlled programmatically.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="flex gap-2 mt-4">
              <Button size="sm" onClick={() => setValue("item-1")}>
                <Plus className="h-3 w-3 mr-1" />
                Expand 1
              </Button>
              <Button size="sm" onClick={() => setValue("item-2")}>
                <Plus className="h-3 w-3 mr-1" />
                Expand 2
              </Button>
              <Button size="sm" onClick={() => setValue("")}>
                <Minus className="h-3 w-3 mr-1" />
                Collapse All
              </Button>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              Current: {value || "None"}
            </div>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          7. DESIGN VARIATIONS
      ══════════════════════════════════════ */}
      <Section
        id="design-variations"
        title="Design Variations"
        description="Different accordion styles for various use cases and design systems."
      >
        {/* Bordered Style */}
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-semibold mb-3">Bordered Style</h4>
            <ComponentPreview
              code={`<Accordion type="single" className="w-full border rounded-lg">
  <AccordionItem value="item-1" className="border-b last:border-b-0">
    <AccordionTrigger className="px-4 hover:bg-muted/50">
      What payment methods do you accept?
    </AccordionTrigger>
    <AccordionContent className="px-4">
      We accept all major credit cards, PayPal, and bank transfers.
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
            >
              <div className="w-full max-w-md">
                <Accordion type="single" className="w-full border rounded-lg">
                  <AccordionItem value="item-1" className="border-b last:border-b-0">
                    <AccordionTrigger className="px-4 hover:bg-muted/50">
                      <CreditCard className="h-4 w-4 mr-2" />
                      What payment methods do you accept?
                    </AccordionTrigger>
                    <AccordionContent className="px-4">
                      <div className="space-y-2 pb-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Credit Cards (Visa, Mastercard, Amex)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span className="text-sm">PayPal</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Bank Transfers</span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2" className="border-b last:border-b-0">
                    <AccordionTrigger className="px-4 hover:bg-muted/50">
                      <Shield className="h-4 w-4 mr-2" />
                      Is my payment information secure?
                    </AccordionTrigger>
                    <AccordionContent className="px-4">
                      <div className="space-y-2 pb-4">
                        <p className="text-sm text-muted-foreground">
                          Yes, we use industry-standard SSL encryption and never store your payment details.
                        </p>
                        <Badge variant="secondary" className="text-xs">PCI Compliant</Badge>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </ComponentPreview>
          </div>

          {/* Card Style */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Card Style</h4>
            <ComponentPreview
              code={`<Accordion type="single" className="w-full space-y-3">
  <AccordionItem value="item-1" className="border rounded-lg shadow-sm">
    <AccordionTrigger className="px-4 hover:no-underline">
      Getting Started
    </AccordionTrigger>
    <AccordionContent className="px-4">
      Welcome to our platform! Here's how to begin.
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
            >
              <div className="w-full max-w-md">
                <Accordion type="single" className="w-full space-y-3">
                  <AccordionItem value="item-1" className="border rounded-lg shadow-sm">
                    <AccordionTrigger className="px-4 hover:no-underline">
                      <Zap className="h-4 w-4 mr-2 text-blue-500" />
                      Getting Started
                    </AccordionTrigger>
                    <AccordionContent className="px-4">
                      <div className="space-y-3 pb-4">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-xs font-semibold text-blue-600 dark:text-blue-300">1</div>
                          <div>
                            <p className="text-sm font-medium">Create your account</p>
                            <p className="text-xs text-muted-foreground">Sign up with your email or social accounts</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-xs font-semibold text-blue-600 dark:text-blue-300">2</div>
                          <div>
                            <p className="text-sm font-medium">Choose your plan</p>
                            <p className="text-xs text-muted-foreground">Select the subscription that fits your needs</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-xs font-semibold text-blue-600 dark:text-blue-300">3</div>
                          <div>
                            <p className="text-sm font-medium">Start building</p>
                            <p className="text-xs text-muted-foreground">Access all features and start creating</p>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2" className="border rounded-lg shadow-sm">
                    <AccordionTrigger className="px-4 hover:no-underline">
                      <Users className="h-4 w-4 mr-2 text-green-500" />
                      Team Collaboration
                    </AccordionTrigger>
                    <AccordionContent className="px-4">
                      <div className="space-y-3 pb-4">
                        <p className="text-sm text-muted-foreground">
                          Work together seamlessly with your team members.
                        </p>
                        <div className="flex gap-2">
                          <Badge variant="outline" className="text-xs">Real-time sync</Badge>
                          <Badge variant="outline" className="text-xs">Comments</Badge>
                          <Badge variant="outline" className="text-xs">Permissions</Badge>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </ComponentPreview>
          </div>

          {/* Minimal Style */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Minimal Style</h4>
            <ComponentPreview
              code={`<Accordion type="single" className="w-full">
  <AccordionItem value="item-1" className="border-none">
    <AccordionTrigger className="px-0 py-2 hover:no-underline text-sm">
      Terms of Service
    </AccordionTrigger>
    <AccordionContent className="px-0 pb-4">
      By using our service, you agree to our terms.
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
            >
              <div className="w-full max-w-md">
                <Accordion type="single" className="w-full">
                  <AccordionItem value="item-1" className="border-none">
                    <AccordionTrigger className="px-0 py-2 hover:no-underline text-sm font-medium">
                      Terms of Service
                    </AccordionTrigger>
                    <AccordionContent className="px-0 pb-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        By using our service, you agree to our terms and conditions. We respect your privacy and are committed to protecting your personal data.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2" className="border-none">
                    <AccordionTrigger className="px-0 py-2 hover:no-underline text-sm font-medium">
                      Privacy Policy
                    </AccordionTrigger>
                    <AccordionContent className="px-0 pb-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Your privacy is important to us. This policy explains how we collect, use, and protect your information.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3" className="border-none">
                    <AccordionTrigger className="px-0 py-2 hover:no-underline text-sm font-medium">
                      Cookie Policy
                    </AccordionTrigger>
                    <AccordionContent className="px-0 pb-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        We use cookies to enhance your experience and analyze site traffic.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </ComponentPreview>
          </div>

          {/* FAQ Style */}
          <div>
            <h4 className="text-sm font-semibold mb-3">FAQ Style</h4>
            <ComponentPreview
              code={`<Accordion type="multiple" className="w-full space-y-2">
  <AccordionItem value="item-1" className="border rounded-lg bg-muted/30">
    <AccordionTrigger className="px-4 hover:no-underline">
      <HelpCircle className="h-4 w-4 mr-2" />
      How do I reset my password?
    </AccordionTrigger>
    <AccordionContent className="px-4">
      Click the "Forgot Password" link on the login page.
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
            >
              <div className="w-full max-w-md">
                <Accordion type="multiple" className="w-full space-y-2">
                  <AccordionItem value="item-1" className="border rounded-lg bg-muted/30">
                    <AccordionTrigger className="px-4 hover:no-underline">
                      <HelpCircle className="h-4 w-4 mr-2 text-blue-500" />
                      How do I reset my password?
                    </AccordionTrigger>
                    <AccordionContent className="px-4">
                      <div className="space-y-2 pb-4">
                        <p className="text-sm">Follow these simple steps:</p>
                        <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                          <li>Go to the login page</li>
                          <li>Click "Forgot Password"</li>
                          <li>Enter your email address</li>
                          <li>Check your email for reset link</li>
                          <li>Create a new password</li>
                        </ol>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2" className="border rounded-lg bg-muted/30">
                    <AccordionTrigger className="px-4 hover:no-underline">
                      <HelpCircle className="h-4 w-4 mr-2 text-blue-500" />
                      Can I change my plan later?
                    </AccordionTrigger>
                    <AccordionContent className="px-4">
                      <div className="space-y-2 pb-4">
                        <p className="text-sm">Yes! You can upgrade or downgrade your plan at any time.</p>
                        <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
                          <p className="text-xs text-blue-700 dark:text-blue-300">
                            💡 Tip: Changes take effect at the next billing cycle.
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3" className="border rounded-lg bg-muted/30">
                    <AccordionTrigger className="px-4 hover:no-underline">
                      <HelpCircle className="h-4 w-4 mr-2 text-blue-500" />
                      Is there a free trial?
                    </AccordionTrigger>
                    <AccordionContent className="px-4">
                      <div className="space-y-2 pb-4">
                        <p className="text-sm">Yes! We offer a 14-day free trial with full access to all features.</p>
                        <div className="flex gap-2">
                          <Badge className="text-xs">No credit card required</Badge>
                          <Badge className="text-xs">Cancel anytime</Badge>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </ComponentPreview>
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════
          8. ANIMATION VARIATIONS
      ══════════════════════════════════════ */}
      <Section
        id="animations"
        title="Animation Variations"
        description="Control accordion animations and transitions. Choose between smooth animations or instant state changes."
      >
        {/* With Animation */}
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-semibold mb-3">With Animation (Default)</h4>
            <ComponentPreview
              code={`<Accordion type="single" className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger className="hover:no-underline">
      Smooth animated transition
    </AccordionTrigger>
    <AccordionContent>
      Content slides in with smooth animation by default.
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
            >
              <div className="w-full max-w-md">
                <Accordion type="single" className="w-full">
                  <AccordionItem value="item-1" className="border rounded-lg">
                    <AccordionTrigger className="hover:no-underline px-4">
                      <Zap className="h-4 w-4 mr-2 text-blue-500" />
                      Smooth animated transition
                    </AccordionTrigger>
                    <AccordionContent className="px-4">
                      <div className="space-y-3 pb-4">
                        <p className="text-sm text-muted-foreground">
                          Content slides in with smooth animation by default using CSS transitions.
                        </p>
                        <div className="flex gap-2">
                          <Badge variant="outline" className="text-xs">Animated</Badge>
                          <Badge variant="outline" className="text-xs">Smooth</Badge>
                          <Badge variant="outline" className="text-xs">Default</Badge>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2" className="border rounded-lg">
                    <AccordionTrigger className="hover:no-underline px-4">
                      <Settings className="h-4 w-4 mr-2 text-green-500" />
                      Animation settings
                    </AccordionTrigger>
                    <AccordionContent className="px-4">
                      <div className="space-y-3 pb-4">
                        <p className="text-sm text-muted-foreground">
                          The accordion content uses slide-in animation with fade effect.
                        </p>
                        <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
                          <p className="text-xs text-blue-700 dark:text-blue-300">
                            🎨 Uses animate-in and slide-in-from-top-1 classes
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </ComponentPreview>
          </div>

          {/* Without Animation */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Without Animation (Instant)</h4>
            <ComponentPreview
              code={`<Accordion type="single" className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger className="hover:no-underline">
      Instant open/close
    </AccordionTrigger>
    <AccordionContent className="animate-none">
      Content appears instantly without animation.
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
            >
              <div className="w-full max-w-md">
                <Accordion type="single" className="w-full">
                  <AccordionItem value="item-1" className="border rounded-lg">
                    <AccordionTrigger className="hover:no-underline px-4">
                      <Zap className="h-4 w-4 mr-2 text-orange-500" />
                      Instant open/close
                    </AccordionTrigger>
                    <AccordionContent className="px-4 animate-none">
                      <div className="space-y-3 pb-4">
                        <p className="text-sm text-muted-foreground">
                          Content appears instantly without any transition effects.
                        </p>
                        <div className="flex gap-2">
                          <Badge variant="outline" className="text-xs">No Animation</Badge>
                          <Badge variant="outline" className="text-xs">Instant</Badge>
                          <Badge variant="outline" className="text-xs">Fast</Badge>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2" className="border rounded-lg">
                    <AccordionTrigger className="hover:no-underline px-4">
                      <Settings className="h-4 w-4 mr-2 text-purple-500" />
                      Performance mode
                    </AccordionTrigger>
                    <AccordionContent className="px-4 animate-none">
                      <div className="space-y-3 pb-4">
                        <p className="text-sm text-muted-foreground">
                          Perfect for performance-critical applications or users who prefer instant feedback.
                        </p>
                        <div className="bg-orange-50 dark:bg-orange-950/20 p-3 rounded-lg">
                          <p className="text-xs text-orange-700 dark:text-orange-300">
                            ⚡ Uses animate-none class for instant transitions
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </ComponentPreview>
          </div>

          {/* Custom Animation */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Custom Animation Speed</h4>
            <ComponentPreview
              code={`<Accordion type="single" className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger className="hover:no-underline">
      Slow animation
    </AccordionTrigger>
    <AccordionContent className="duration-500">
      Content slides in slowly for dramatic effect.
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
            >
              <div className="w-full max-w-md">
                <Accordion type="single" className="w-full">
                  <AccordionItem value="item-1" className="border rounded-lg">
                    <AccordionTrigger className="hover:no-underline px-4">
                      <Clock className="h-4 w-4 mr-2 text-indigo-500" />
                      Slow animation
                    </AccordionTrigger>
                    <AccordionContent className="px-4 duration-500">
                      <div className="space-y-3 pb-4">
                        <p className="text-sm text-muted-foreground">
                          Content slides in slowly with a 500ms duration for dramatic effect.
                        </p>
                        <div className="flex gap-2">
                          <Badge variant="outline" className="text-xs">Slow</Badge>
                          <Badge variant="outline" className="text-xs">500ms</Badge>
                          <Badge variant="outline" className="text-xs">Dramatic</Badge>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2" className="border rounded-lg">
                    <AccordionTrigger className="hover:no-underline px-4">
                      <Clock className="h-4 w-4 mr-2 text-pink-500" />
                      Fast animation
                    </AccordionTrigger>
                    <AccordionContent className="px-4 duration-150">
                      <div className="space-y-3 pb-4">
                        <p className="text-sm text-muted-foreground">
                          Quick transition with 150ms duration for snappy interactions.
                        </p>
                        <div className="flex gap-2">
                          <Badge variant="outline" className="text-xs">Fast</Badge>
                          <Badge variant="outline" className="text-xs">150ms</Badge>
                          <Badge variant="outline" className="text-xs">Snappy</Badge>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </ComponentPreview>
          </div>

          {/* No Underline Variations */}
          <div>
            <h4 className="text-sm font-semibold mb-3">No Underline Styles</h4>
            <ComponentPreview
              code={`<Accordion type="single" className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger className="hover:no-underline">
      Clean trigger without underline
    </AccordionTrigger>
    <AccordionContent>
      No underline on hover or focus states.
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
            >
              <div className="w-full max-w-md">
                <Accordion type="single" className="w-full space-y-3">
                  <AccordionItem value="item-1" className="border rounded-lg shadow-sm">
                    <AccordionTrigger className="hover:no-underline px-4">
                      <HelpCircle className="h-4 w-4 mr-2 text-blue-500" />
                      Clean FAQ style
                    </AccordionTrigger>
                    <AccordionContent className="px-4">
                      <div className="space-y-2 pb-4">
                        <p className="text-sm text-muted-foreground">
                          No underline on hover for a cleaner, more modern appearance.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2" className="border rounded-lg shadow-sm">
                    <AccordionTrigger className="hover:no-underline px-4">
                      <FileText className="h-4 w-4 mr-2 text-green-500" />
                      Document style
                    </AccordionTrigger>
                    <AccordionContent className="px-4">
                      <div className="space-y-2 pb-4">
                        <p className="text-sm text-muted-foreground">
                          Perfect for documentation and content-heavy applications.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3" className="border rounded-lg shadow-sm">
                    <AccordionTrigger className="hover:no-underline px-4">
                      <Settings className="h-4 w-4 mr-2 text-purple-500" />
                      Settings panel
                    </AccordionTrigger>
                    <AccordionContent className="px-4">
                      <div className="space-y-2 pb-4">
                        <p className="text-sm text-muted-foreground">
                          Clean interface for configuration panels and settings.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </ComponentPreview>
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════
          9. ADVANCED EXAMPLES
      ══════════════════════════════════════ */}
      <Section
        id="advanced"
        title="Advanced Examples"
        description="Complex accordion implementations with forms, search, and dynamic content."
      >
        {/* Searchable FAQ */}
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-semibold mb-3">Searchable FAQ</h4>
            <ComponentPreview
              code={`const [searchTerm, setSearchTerm] = useState("");
const faqs = [
  { q: "How do I get started?", a: "Sign up for a free account..." },
  { q: "What payment methods?", a: "We accept credit cards..." }
];

<Accordion type="multiple" className="w-full">
  {faqs.filter(faq => 
    faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.a.toLowerCase().includes(searchTerm.toLowerCase())
  ).map((faq, i) => (
    <AccordionItem key={i} value={\`item-\${i}\`}>
      <AccordionTrigger>{faq.q}</AccordionTrigger>
      <AccordionContent>{faq.a}</AccordionContent>
    </AccordionItem>
  ))}
</Accordion>`}
            >
              <div className="w-full max-w-md">
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Search FAQs..."
                    className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => {
                      // In a real app, you'd filter based on search
                    }}
                  />
                </div>
                <Accordion type="multiple" className="w-full space-y-2">
                  <AccordionItem value="item-1" className="border rounded-lg">
                    <AccordionTrigger className="px-4">
                      <HelpCircle className="h-4 w-4 mr-2" />
                      How do I get started?
                    </AccordionTrigger>
                    <AccordionContent className="px-4">
                      <div className="space-y-2 pb-4">
                        <p className="text-sm">Sign up for a free account and follow our onboarding process. It takes just 2 minutes!</p>
                        <Button size="sm" className="w-full">Get Started</Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2" className="border rounded-lg">
                    <AccordionTrigger className="px-4">
                      <HelpCircle className="h-4 w-4 mr-2" />
                      What payment methods do you accept?
                    </AccordionTrigger>
                    <AccordionContent className="px-4">
                      <div className="space-y-2 pb-4">
                        <p className="text-sm">We accept all major credit cards, PayPal, and bank transfers.</p>
                        <div className="flex gap-2">
                          <Badge variant="outline">Visa</Badge>
                          <Badge variant="outline">Mastercard</Badge>
                          <Badge variant="outline">PayPal</Badge>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </ComponentPreview>
          </div>

          {/* Form in Accordion */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Interactive Forms</h4>
            <ComponentPreview
              code={`<Accordion type="single" className="w-full">
  <AccordionItem value="profile" className="border rounded-lg">
    <AccordionTrigger className="px-4">
      <User className="h-4 w-4 mr-2" />
      Edit Profile
    </AccordionTrigger>
    <AccordionContent className="px-4">
      <form className="space-y-4 pb-4">
        <input placeholder="Name" className="w-full px-3 py-2 border rounded" />
        <input placeholder="Email" className="w-full px-3 py-2 border rounded" />
        <Button type="submit" className="w-full">Save Changes</Button>
      </form>
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
            >
              <div className="w-full max-w-md">
                <Accordion type="single" className="w-full">
                  <AccordionItem value="profile" className="border rounded-lg">
                    <AccordionTrigger className="px-4">
                      <Users className="h-4 w-4 mr-2" />
                      Edit Profile
                    </AccordionTrigger>
                    <AccordionContent className="px-4">
                      <form className="space-y-4 pb-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Name</label>
                          <input
                            type="text"
                            placeholder="John Doe"
                            className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Email</label>
                          <input
                            type="email"
                            placeholder="john@example.com"
                            className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Bio</label>
                          <textarea
                            placeholder="Tell us about yourself..."
                            rows={3}
                            className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <Button type="submit" className="w-full">Save Changes</Button>
                      </form>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="preferences" className="border rounded-lg">
                    <AccordionTrigger className="px-4">
                      <Settings className="h-4 w-4 mr-2" />
                      Preferences
                    </AccordionTrigger>
                    <AccordionContent className="px-4">
                      <form className="space-y-4 pb-4">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium">Email Notifications</label>
                          <input type="checkbox" className="rounded" />
                        </div>
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium">Two-Factor Auth</label>
                          <input type="checkbox" className="rounded" />
                        </div>
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium">Marketing Emails</label>
                          <input type="checkbox" className="rounded" />
                        </div>
                        <Button type="submit" variant="outline" className="w-full">Update Preferences</Button>
                      </form>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </ComponentPreview>
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════
          9. PROPS
      ══════════════════════════════════════ */}
      <Section id="props" title="API Reference">
        <p className="text-sm font-semibold mb-3">Accordion</p>
        <PropsTable props={[
          { name: "type", type: '"single" | "multiple"', default: '"single"', description: "Selection behavior." },
          { name: "value", type: "string | string[]", default: "—", description: "Controlled expanded value(s)." },
          { name: "defaultValue", type: "string | string[]", default: "—", description: "Initial expanded value(s)." },
          { name: "onValueChange", type: "(value: string | string[]) => void", default: "—", description: "Called when expanded items change." },
          { name: "disabled", type: "boolean", default: "false", description: "Disable all items." },
          { name: "collapsible", type: "boolean", default: "true", description: "Allow collapsing when already expanded." },
        ]} />

        <p className="text-sm font-semibold mb-3 mt-8">AccordionItem</p>
        <PropsTable props={[
          { name: "value", type: "string", default: "required", description: "Unique identifier for the item." },
          { name: "disabled", type: "boolean", default: "false", description: "Disable this specific item." },
          { name: "className", type: "string", default: "—", description: "Additional CSS classes." },
        ]} />

        <p className="text-sm font-semibold mb-3 mt-8">AccordionTrigger</p>
        <PropsTable props={[
          { name: "className", type: "string", default: "—", description: "Additional CSS classes." },
        ]} />

        <p className="text-sm font-semibold mb-3 mt-8">AccordionContent</p>
        <PropsTable props={[
          { name: "className", type: "string", default: "—", description: "Additional CSS classes." },
        ]} />
      </Section>
    </DocsContent>
  );
}
