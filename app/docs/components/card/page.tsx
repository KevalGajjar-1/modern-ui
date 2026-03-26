"use client";

import { DocsContent, Section, ComponentPreview, PropsTable, DemoCard } from "@/components/docs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CardDocs() {
  return (
    <DocsContent 
      title="Card" 
      description="Displays a card with header, content, and footer."
      importPath='import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";'
    >
      <Section title="Usage">
        <ComponentPreview 
          code={`import {\n  Card,\n  CardContent,\n  CardDescription,\n  CardFooter,\n  CardHeader,\n  CardTitle,\n} from "@/components/ui/card";\n\n<Card className="w-[350px]">\n  <CardHeader>\n    <CardTitle>Create project</CardTitle>\n    <CardDescription>Deploy your new project in one-click.</CardDescription>\n  </CardHeader>\n  <CardContent>\n    <form>\n      <div className="grid w-full items-center gap-4">\n        <div className="flex flex-col space-y-1.5">\n          <Label htmlFor="name">Name</Label>\n          <Input id="name" placeholder="Name of your project" />\n        </div>\n      </div>\n    </form>\n  </CardContent>\n  <CardFooter className="flex justify-between">\n    <Button variant="outline">Cancel</Button>\n    <Button>Deploy</Button>\n  </CardFooter>\n</Card>`}
        >
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Create project</CardTitle>
              <CardDescription>Deploy your new project in one-click.</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Name of your project" />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Deploy</Button>
            </CardFooter>
          </Card>
        </ComponentPreview>
      </Section>

      <Section title="Examples">
        <DemoCard>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Notifications</CardTitle>
                <CardDescription>You have 3 unread messages.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 border border-border">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">New message from User {i}</p>
                        <p className="text-xs text-muted-foreground">2 minutes ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Mark all as read</Button>
              </CardFooter>
            </Card>

            <Card className="bg-foreground text-background border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg text-background">Premium Plan</CardTitle>
                <CardDescription className="text-background/70">Unlock all features and support.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-4 text-background">$29<span className="text-sm font-normal text-background/70">/mo</span></div>
                <ul className="space-y-2 text-sm text-background/80">
                  <li>✓ Unlimited Projects</li>
                  <li>✓ 24/7 Support</li>
                  <li>✓ Advanced Analytics</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-background text-foreground hover:bg-background/90">Get Started</Button>
              </CardFooter>
            </Card>
          </div>
        </DemoCard>
      </Section>
    </DocsContent>
  );
}
