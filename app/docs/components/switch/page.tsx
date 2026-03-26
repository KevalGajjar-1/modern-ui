"use client";

import { DocsContent, Section, ComponentPreview, DemoCard } from "@/components/docs";
import { Switch, SwitchMinimal, SwitchRounded, SwitchWithIcon } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Check, X } from "lucide-react";

export default function SwitchDocs() {
  return (
    <DocsContent
      title="Switch"
      description="A control that allows the user to toggle between checked and not checked."
      importPath='import { Switch } from "@/components/ui/switch";'
    >
      <Section title="Default" description="Standard toggle switch.">
        <ComponentPreview
          code={`<Switch defaultChecked />`}
        >
          <div className="flex items-center space-x-2">
            <Switch defaultChecked />
            <Label>Airplane Mode</Label>
          </div>
        </ComponentPreview>
      </Section>

      <Section title="Minimal" description="Simple, minimal toggle without border.">
        <DemoCard>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <SwitchMinimal defaultChecked />
              <Label>Wi-Fi</Label>
            </div>
            <div className="flex items-center gap-2">
              <SwitchMinimal />
              <Label>Bluetooth</Label>
            </div>
          </div>
        </DemoCard>
      </Section>

      <Section title="Rounded" description="Soft rounded design with subtle colors.">
        <DemoCard>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <SwitchRounded defaultChecked />
              <Label>Notifications</Label>
            </div>
            <div className="flex items-center gap-2">
              <SwitchRounded />
              <Label>Dark Mode</Label>
            </div>
          </div>
        </DemoCard>
      </Section>

      <Section title="With Icons" description="Toggle with check/cross icons.">
        <DemoCard>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <SwitchWithIcon 
                defaultChecked 
                onIcon={<Check className="h-3 w-3 text-primary" />}
                offIcon={<X className="h-3 w-3 text-muted-foreground" />}
              />
              <Label>Enabled</Label>
            </div>
            <div className="flex items-center gap-2">
              <SwitchWithIcon 
                onIcon={<Check className="h-3 w-3 text-primary" />}
                offIcon={<X className="h-3 w-3 text-muted-foreground" />}
              />
              <Label>Disabled</Label>
            </div>
          </div>
        </DemoCard>
      </Section>

      <Section title="Sizes" description="Different sizes for various contexts.">
        <DemoCard>
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <Switch size="sm" defaultChecked />
              <Label className="text-xs">Small</Label>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Switch size="md" defaultChecked />
              <Label className="text-xs">Medium</Label>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Switch size="lg" defaultChecked />
              <Label className="text-xs">Large</Label>
            </div>
          </div>
        </DemoCard>
      </Section>

      <Section title="States" description="Different states of the switch.">
        <DemoCard>
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <Switch defaultChecked />
              <Label>Checked</Label>
            </div>
            <div className="flex items-center gap-3">
              <Switch />
              <Label>Unchecked</Label>
            </div>
            <div className="flex items-center gap-3">
              <Switch disabled />
              <Label className="opacity-50">Disabled</Label>
            </div>
            <div className="flex items-center gap-3">
              <Switch disabled defaultChecked />
              <Label className="opacity-50">Disabled Checked</Label>
            </div>
          </div>
        </DemoCard>
      </Section>

      <Section title="Form Group" description="Switch in a settings form layout.">
        <DemoCard>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive email updates</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive push notifications</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Marketing Emails</Label>
                <p className="text-sm text-muted-foreground">Receive marketing content</p>
              </div>
              <SwitchRounded />
            </div>
          </div>
        </DemoCard>
      </Section>
    </DocsContent>
  );
}
