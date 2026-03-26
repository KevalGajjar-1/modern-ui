"use client";

import { DocsContent, Section, ComponentPreview, PropsTable, DemoCard } from "@/components/docs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DialogDocs() {
  return (
    <DocsContent 
      title="Dialog" 
      description="A window overlaid on either the primary window or another dialog window, rendering the content underneath inert."
      importPath='import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";'
    >
      <Section title="Usage">
        <ComponentPreview 
          code={`import {\n  Dialog,\n  DialogContent,\n  DialogDescription,\n  DialogFooter,\n  DialogHeader,\n  DialogTitle,\n  DialogTrigger,\n} from "@/components/ui/dialog";\n\n<Dialog>\n  <DialogTrigger asChild>\n    <Button variant="outline">Edit Profile</Button>\n  </DialogTrigger>\n  <DialogContent className="sm:max-w-[425px]">\n    <DialogHeader>\n      <DialogTitle>Edit profile</DialogTitle>\n      <DialogDescription>\n        Make changes to your profile here. Click save when you're done.\n      </DialogDescription>\n    </DialogHeader>\n    <div className="grid gap-4 py-4">\n      <div className="grid grid-cols-4 items-center gap-4">\n        <Label htmlFor="name" className="text-right">Name</Label>\n        <Input id="name" value="Pedro Duarte" className="col-span-3" />\n      </div>\n      <div className="grid grid-cols-4 items-center gap-4">\n        <Label htmlFor="username" className="text-right">Username</Label>\n        <Input id="username" value="@peduarte" className="col-span-3" />\n      </div>\n    </div>\n    <DialogFooter>\n      <Button type="submit">Save changes</Button>\n    </DialogFooter>\n  </DialogContent>\n</Dialog>`}
        >
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">Username</Label>
                  <Input id="username" defaultValue="@peduarte" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </ComponentPreview>
      </Section>

      <Section title="Examples">
        <DemoCard>
          <div className="flex items-center justify-center gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button>Standard Dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Standard Dialog</DialogTitle>
                  <DialogDescription>This is a standard dialog window.</DialogDescription>
                </DialogHeader>
                <div className="py-6">
                  <p className="text-sm text-muted-foreground">You can put any content here.</p>
                </div>
                <DialogFooter>
                  <Button variant="outline">Close</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive">Destructive Action</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button variant="destructive">Delete Account</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </DemoCard>
      </Section>

      <Section title="Accessibility">
        <p className="text-muted-foreground">
          The dialog component is built using standard HTML elements and React Context, ensuring it follows the WAI-ARIA Dialog (Modal) pattern. It handles focus management, keyboard navigation (Escape to close), and screen reader announcements automatically.
        </p>
      </Section>
    </DocsContent>
  );
}
