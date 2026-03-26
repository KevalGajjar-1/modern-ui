"use client";

import React from "react";
import { DocsContent, Section, ComponentPreview, DemoCard } from "@/components/docs";
import {
  Select,
  SelectContent,
  SelectContentCard,
  SelectContentDropdown,
  SelectGroup,
  SelectItem,
  SelectItemIcon,
  SelectItemRadio,
  SelectLabel,
  SelectTrigger,
  SelectTriggerMinimal,
  SelectTriggerPill,
  SelectTriggerUnderline,
  SelectValue,
} from "@/components/ui/select";
import { Mail, User, Settings, Bell } from "lucide-react";

export default function SelectPage() {
  return (
    <DocsContent
      title="Select"
      description="Displays a list of options for the user to pick from — triggered by a button."
      importPath='import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";'
    >
      <Section title="Default" description="Standard bordered select with default styling.">
        <ComponentPreview
          code={`<Select>
  <SelectTrigger className="w-[200px]">
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Fruits</SelectLabel>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
      <SelectItem value="blueberry">Blueberry</SelectItem>
      <SelectItem value="grapes">Grapes</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`}
        >
          <Select>
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent className="w-[300px]">
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </ComponentPreview>
      </Section>

      <Section title="Minimal" description="Clean underline style for minimal interfaces.">
        <DemoCard>
          <div className="w-[200px]">
            <Select>
              <SelectTriggerMinimal>
                <SelectValue placeholder="Select language" />
              </SelectTriggerMinimal>
              <SelectContentDropdown>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
              </SelectContentDropdown>
            </Select>
          </div>
        </DemoCard>
      </Section>

      <Section title="Pill Style" description="Rounded pill design with shadow effects.">
        <DemoCard>
          <div className="w-[220px]">
            <Select>
              <SelectTriggerPill>
                <SelectValue placeholder="Choose plan" />
              </SelectTriggerPill>
              <SelectContentCard>
                <SelectItem value="free">Free Plan</SelectItem>
                <SelectItem value="pro">Pro Plan</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
              </SelectContentCard>
            </Select>
          </div>
        </DemoCard>
      </Section>

      <Section title="With Icons" description="Select items with leading icons for visual context.">
        <DemoCard>
          <div className="w-[220px]">
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItemIcon value="profile" icon={User}>Profile</SelectItemIcon>
                <SelectItemIcon value="messages" icon={Mail}>Messages</SelectItemIcon>
                <SelectItemIcon value="notifications" icon={Bell}>Notifications</SelectItemIcon>
                <SelectItemIcon value="settings" icon={Settings}>Settings</SelectItemIcon>
              </SelectContent>
            </Select>
          </div>
        </DemoCard>
      </Section>

      <Section title="Radio Style" description="Items with radio-style selection indicators.">
        <DemoCard>
          <div className="w-[200px]">
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContentDropdown>
                <SelectItemRadio value="xs">Extra Small</SelectItemRadio>
                <SelectItemRadio value="s">Small</SelectItemRadio>
                <SelectItemRadio value="m">Medium</SelectItemRadio>
                <SelectItemRadio value="l">Large</SelectItemRadio>
                <SelectItemRadio value="xl">Extra Large</SelectItemRadio>
              </SelectContentDropdown>
            </Select>
          </div>
        </DemoCard>
      </Section>

      <Section title="Underline" description="Simple underline style for clean forms.">
        <DemoCard>
          <div className="w-[200px]">
            <Select>
              <SelectTriggerUnderline>
                <SelectValue placeholder="Select country" />
              </SelectTriggerUnderline>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                <SelectItem value="au">Australia</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </DemoCard>
      </Section>
    </DocsContent>
  );
}
