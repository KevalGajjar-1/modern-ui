"use client";

import { DocsContent, Section, ComponentPreview, PropsTable, DemoCard } from "@/components/docs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function TabsDocs() {
  return (
    <DocsContent 
      title="Tabs" 
      description="A set of layered sections of content—known as tab panels—that are displayed one at a time."
      importPath='import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";'
    >
      <Section title="Usage">
        <ComponentPreview 
          code={`import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";\n\n<Tabs defaultValue="account" className="w-[400px]">\n  <TabsList>\n    <TabsTrigger value="account">Account</TabsTrigger>\n    <TabsTrigger value="password">Password</TabsTrigger>\n  </TabsList>\n  <TabsContent value="account">\n    Make changes to your account here.\n  </TabsContent>\n  <TabsContent value="password">\n    Change your password here.\n  </TabsContent>\n</Tabs>`}
        >
          <Tabs defaultValue="account" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account</CardTitle>
                  <CardDescription>
                    Make changes to your account here. Click save when you're done.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="Pedro Duarte" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="@peduarte" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="password">
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>
                    Change your password here. After saving, you'll be logged out.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="current">Current password</Label>
                    <Input id="current" type="password" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="new">New password</Label>
                    <Input id="new" type="password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save password</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </ComponentPreview>
      </Section>

      <Section title="Examples">
        <DemoCard>
          <div className="w-full max-w-md mx-auto">
            <Tabs defaultValue="music" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="music">Music</TabsTrigger>
                <TabsTrigger value="podcasts">Podcasts</TabsTrigger>
                <TabsTrigger value="live">Live</TabsTrigger>
              </TabsList>
              <TabsContent value="music" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold">Recently Played</h4>
                  <Button variant="link" className="text-xs h-auto p-0">View all</Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="space-y-2">
                      <div className="aspect-square rounded-md bg-muted animate-pulse" />
                      <div className="space-y-1">
                        <p className="text-xs font-medium">Album Title {i}</p>
                        <p className="text-[10px] text-muted-foreground">Artist Name</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="podcasts" className="text-center py-12">
                <p className="text-sm text-muted-foreground">No podcasts found.</p>
              </TabsContent>
              <TabsContent value="live" className="text-center py-12">
                <p className="text-sm text-muted-foreground">No live streams available.</p>
              </TabsContent>
            </Tabs>
          </div>
        </DemoCard>
      </Section>

      <Section title="Accessibility">
        <p className="text-muted-foreground">
          The tabs component is built using standard HTML elements and React Context, ensuring it follows the WAI-ARIA Tabs pattern. It handles keyboard navigation (Arrow keys, Home, End) and focus management automatically.
        </p>
      </Section>
    </DocsContent>
  );
}
