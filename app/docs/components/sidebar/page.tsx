"use client";

import React from "react";
import { DocsContent, Section, ComponentPreview, DemoCard, PropsTable } from "@/components/docs";
import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarItem } from "@/components/ui/sidebar";
import { Home, Settings, User, Mail, Bell, Search } from "lucide-react";

export default function SidebarPage() {
  return (
    <DocsContent
      title="Sidebar"
      description="A vertical navigation component for sidebars."
      importPath='import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarItem } from "@/components/ui/sidebar";'
    >
      <Section title="Usage" description="Basic sidebar structure.">
        <ComponentPreview
          code={`<Sidebar className="h-[400px] border rounded-xl">
  <SidebarHeader>
    <span className="font-bold">App Logo</span>
  </SidebarHeader>
  <SidebarContent>
    <div className="space-y-1">
      <SidebarItem active><Home className="mr-2 h-4 w-4" /> Dashboard</SidebarItem>
      <SidebarItem><User className="mr-2 h-4 w-4" /> Profile</SidebarItem>
      <SidebarItem><Mail className="mr-2 h-4 w-4" /> Messages</SidebarItem>
      <SidebarItem><Bell className="mr-2 h-4 w-4" /> Notifications</SidebarItem>
    </div>
  </SidebarContent>
  <SidebarFooter>
    <SidebarItem><Settings className="mr-2 h-4 w-4" /> Settings</SidebarItem>
  </SidebarFooter>
</Sidebar>`}
        >
          <Sidebar className="h-[400px] border rounded-xl">
            <SidebarHeader>
              <span className="font-bold">App Logo</span>
            </SidebarHeader>
            <SidebarContent>
              <div className="space-y-1">
                <SidebarItem active><Home className="mr-2 h-4 w-4" /> Dashboard</SidebarItem>
                <SidebarItem><User className="mr-2 h-4 w-4" /> Profile</SidebarItem>
                <SidebarItem><Mail className="mr-2 h-4 w-4" /> Messages</SidebarItem>
                <SidebarItem><Bell className="mr-2 h-4 w-4" /> Notifications</SidebarItem>
              </div>
            </SidebarContent>
            <SidebarFooter>
              <SidebarItem><Settings className="mr-2 h-4 w-4" /> Settings</SidebarItem>
            </SidebarFooter>
          </Sidebar>
        </ComponentPreview>
      </Section>
    </DocsContent>
  );
}
