"use client";

import { DocsContent, Section, ComponentPreview, PropsTable, DemoCard } from "@/components/docs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function InputDocs() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <DocsContent 
      title="Input" 
      description="Displays a form input field or a component that looks like an input field."
      importPath='import { Input } from "@/components/ui/input";'
    >
      <Section title="Usage">
        <ComponentPreview 
          code={`import { Input } from "@/components/ui/input";\n\n<Input placeholder="Enter your name" />`}
        >
          <Input placeholder="Enter your name" className="max-w-sm" />
        </ComponentPreview>
      </Section>

      <Section title="Examples">
        <DemoCard>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-2xl mx-auto">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input id="email" type="email" className="pl-10" placeholder="name@example.com" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    className="pl-10 pr-10" 
                    placeholder="••••••••" 
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input id="search" className="pl-10 rounded-full" placeholder="Search components..." />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="file">Upload File</Label>
                <Input id="file" type="file" className="cursor-pointer file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-muted file:text-foreground hover:file:bg-muted/80" />
              </div>
            </div>
          </div>
        </DemoCard>
      </Section>

      <Section title="States">
        <DemoCard>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl mx-auto">
            <div className="space-y-2">
              <Label className="text-muted-foreground">Disabled</Label>
              <Input disabled placeholder="You cannot type here" />
            </div>
            <div className="space-y-2">
              <Label className="text-destructive">Error State</Label>
              <Input className="border-destructive focus-visible:ring-destructive" placeholder="Invalid input" />
              <p className="text-[10px] text-destructive font-medium">This field is required.</p>
            </div>
          </div>
        </DemoCard>
      </Section>

      <Section title="Props">
        <PropsTable 
          props={[
            { name: "type", type: "string", default: "'text'", description: "The type of input to display." },
            { name: "placeholder", type: "string", default: "-", description: "The placeholder text to display." },
            { name: "disabled", type: "boolean", default: "false", description: "Whether the input is disabled." },
            { name: "className", type: "string", default: "-", description: "Additional CSS classes to apply." },
          ]}
        />
      </Section>
    </DocsContent>
  );
}
