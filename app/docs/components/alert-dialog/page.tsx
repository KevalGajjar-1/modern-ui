"use client";

import React, { useState } from "react";
import { DocsContent, Section, ComponentPreview, PropsTable } from "@/components/docs";
import {
  AlertDialog, AlertDialogTrigger, AlertDialogContent,
  AlertDialogHeader, AlertDialogTitle, AlertDialogDescription,
  AlertDialogFooter, AlertDialogAction, AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import {
  Trash2, LogOut, Shield, Upload,
  AlertTriangle, CheckCircle2, RefreshCw,
  Lock, CreditCard,
} from "lucide-react";

export default function AlertDialogPage() {
  const [ deleteStatus, setDeleteStatus ] = useState<"idle" | "loading" | "done">("idle");
  const [ confirmText, setConfirmText ] = useState("");
  const [ logoutOpen, setLogoutOpen ] = useState(false);

  const handleDelete = async () => {
    setDeleteStatus("loading");
    await new Promise(r => setTimeout(r, 2000));
    setDeleteStatus("done");
  };

  return (
    <DocsContent
      title="Alert Dialog"
      description="A modal dialog that interrupts the user with important content and expects a response. Built with a focus trap, Escape key dismissal, body scroll lock, and full ARIA alertdialog semantics."
      importPath='import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";'
    >

      {/* ══════════════════════════════════════
          1. BASIC
      ══════════════════════════════════════ */}
      <Section
        id="basic"
        title="Basic"
        description="A simple confirmation dialog with a cancel and confirm action."
      >
        <ComponentPreview
          code={ `<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="outline">Open dialog</Button>
  </AlertDialogTrigger>

  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your
        account and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`}
        >
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Open dialog</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your
                  account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          2. VARIANTS
      ══════════════════════════════════════ */}
      <Section
        id="variants"
        title="Variants"
        description="Each variant changes the header icon color and suggested action button color."
      >
        <ComponentPreview
          code={ `{/* Destructive */}
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive"><Trash2 /> Delete account</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader variant="destructive">
      <AlertDialogTitle>Delete account</AlertDialogTitle>
      <AlertDialogDescription>…</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`}
        >
          <div className="flex flex-wrap gap-3">
            {/* Destructive */ }
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4" /> Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader variant="destructive" />
                <div className="px-6 pb-2 text-center space-y-1.5">
                  <AlertDialogTitle>Delete account</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete your account and all associated data.
                    This action cannot be undone.
                  </AlertDialogDescription>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction variant="destructive">
                    <Trash2 className="h-4 w-4" /> Delete account
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* Warning */ }
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="border-amber-300 text-amber-700 hover:bg-amber-50 dark:border-amber-700 dark:text-amber-400">
                  <AlertTriangle className="h-4 w-4" /> Warning
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader variant="warning" />
                <div className="px-6 pb-2 text-center space-y-1.5">
                  <AlertDialogTitle>Unsaved changes</AlertDialogTitle>
                  <AlertDialogDescription>
                    You have unsaved changes. Leaving this page will discard them.
                    Are you sure you want to continue?
                  </AlertDialogDescription>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel>Stay on page</AlertDialogCancel>
                  <AlertDialogAction variant="destructive">Leave anyway</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* Success */ }
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" /> Success
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader variant="success" />
                <div className="px-6 pb-2 text-center space-y-1.5">
                  <AlertDialogTitle>Deployment complete</AlertDialogTitle>
                  <AlertDialogDescription>
                    Your application has been deployed successfully to production.
                    It's now live at your domain.
                  </AlertDialogDescription>
                </div>
                <AlertDialogFooter>
                  <AlertDialogAction>View deployment</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* Info */ }
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-400">
                  <Shield className="h-4 w-4" /> Info
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader variant="info" />
                <div className="px-6 pb-2 text-center space-y-1.5">
                  <AlertDialogTitle>Privacy policy updated</AlertDialogTitle>
                  <AlertDialogDescription>
                    We've updated our privacy policy to comply with new regulations.
                    Please review the changes before continuing.
                  </AlertDialogDescription>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel>Remind me later</AlertDialogCancel>
                  <AlertDialogAction>I understand</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          3. CONFIRM TO PROCEED (type to confirm)
      ══════════════════════════════════════ */}
      <Section
        id="type-to-confirm"
        title="Type to Confirm"
        description="For high-stakes destructive actions, require the user to type a specific phrase before the action button enables."
      >
        <ComponentPreview
          code={ `const [text, setText] = useState("");
const CONFIRM_PHRASE  = "delete my account";

<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive"><Trash2 /> Delete account</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader variant="destructive" />
    <div className="px-6 pb-2 text-center">
      <AlertDialogTitle>This is irreversible</AlertDialogTitle>
      <AlertDialogDescription>
        Type <strong>delete my account</strong> to confirm.
      </AlertDialogDescription>
    </div>
    <div className="px-6 pb-2">
      <Input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="delete my account"
      />
    </div>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction
        variant="destructive"
        disabled={text !== CONFIRM_PHRASE}
      >
        Delete permanently
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`}
        >
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="h-4 w-4" /> Delete account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent closeOnBackdrop={ false }>
              <AlertDialogHeader variant="destructive" />
              <div className="px-6 pb-1 text-center space-y-1.5">
                <AlertDialogTitle>This is irreversible</AlertDialogTitle>
                <AlertDialogDescription>
                  All your data will be permanently deleted. Type{ " " }
                  <strong className="text-foreground font-mono text-xs bg-muted px-1.5 py-0.5 rounded">
                    delete my account
                  </strong>{ " " }
                  to confirm.
                </AlertDialogDescription>
              </div>
              <div className="px-6 pb-2 mt-2">
                <Input
                  value={ confirmText }
                  onChange={ e => setConfirmText(e.target.value) }
                  placeholder="delete my account"
                  className="text-center font-mono text-sm"
                  autoFocus={ false }
                />
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={ () => setConfirmText("") }>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  variant="destructive"
                  disabled={ confirmText !== "delete my account" }
                  onClick={ () => setConfirmText("") }
                >
                  <Trash2 className="h-4 w-4" /> Delete permanently
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          4. ASYNC ACTION WITH LOADING
      ══════════════════════════════════════ */}
      <Section
        id="async-action"
        title="Async Action"
        description="Show a spinner inside the action button while an async operation is in progress."
      >
        <ComponentPreview
          code={ `const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

const handleAction = async () => {
  setStatus("loading");
  await deleteAccount();
  setStatus("done");
};

<AlertDialogAction
  onClick={handleAction}
  disabled={status === "loading"}
  variant="destructive"
>
  {status === "loading"
    ? <><Spinner size="xs" className="text-white" /> Deleting…</>
    : "Delete account"
  }
</AlertDialogAction>`}
        >
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="h-4 w-4" /> Delete with loading
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader variant="destructive" />
              <div className="px-6 pb-2 text-center space-y-1.5">
                <AlertDialogTitle>Delete account</AlertDialogTitle>
                <AlertDialogDescription>
                  { deleteStatus === "done"
                    ? "Your account has been deleted successfully."
                    : "This will permanently delete your account. This action cannot be undone."
                  }
                </AlertDialogDescription>
              </div>
              <AlertDialogFooter>
                { deleteStatus !== "done" && (
                  <AlertDialogCancel disabled={ deleteStatus === "loading" }>
                    Cancel
                  </AlertDialogCancel>
                ) }
                <AlertDialogAction
                  variant={ deleteStatus === "done" ? "default" : "destructive" }
                  onClick={ deleteStatus === "done" ? undefined : handleDelete }
                  disabled={ deleteStatus === "loading" }
                >
                  { deleteStatus === "loading" && <Spinner size="xs" className="text-white" /> }
                  { deleteStatus === "idle" && <><Trash2 className="h-4 w-4" /> Delete account</> }
                  { deleteStatus === "loading" && "Deleting…" }
                  { deleteStatus === "done" && <><CheckCircle2 className="h-4 w-4" /> Done</> }
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          5. CONTROLLED
      ══════════════════════════════════════ */}
      <Section
        id="controlled"
        title="Controlled"
        description="Manage dialog open state externally for programmatic control, e.g. triggered from a menu or keyboard shortcut."
      >
        <ComponentPreview
          code={ `const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>
  <LogOut className="h-4 w-4" /> Sign out
</Button>

<AlertDialog open={open} onOpenChange={setOpen}>
  <AlertDialogContent>
    <AlertDialogHeader variant="default">
      <AlertDialogTitle>Sign out</AlertDialogTitle>
      <AlertDialogDescription>…</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Stay signed in</AlertDialogCancel>
      <AlertDialogAction onClick={() => setOpen(false)}>
        Sign out
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`}
        >
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={ () => setLogoutOpen(true) }
            >
              <LogOut className="h-4 w-4" /> Sign out (controlled)
            </Button>
            <AlertDialog open={ logoutOpen } onOpenChange={ setLogoutOpen }>
              <AlertDialogContent>
                <AlertDialogHeader variant="default" showIcon={ false } />
                <div className="px-6 pb-2 pt-6 text-center space-y-1.5">
                  <AlertDialogTitle>Sign out of your account?</AlertDialogTitle>
                  <AlertDialogDescription>
                    You will be redirected to the login page. Any unsaved work
                    will be lost.
                  </AlertDialogDescription>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel>Stay signed in</AlertDialogCancel>
                  <AlertDialogAction onClick={ () => setLogoutOpen(false) }>
                    <LogOut className="h-4 w-4" /> Sign out
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          6. CLOSE ON BACKDROP
      ══════════════════════════════════════ */}
      <Section
        id="backdrop"
        title="Close on Backdrop"
        description="Set closeOnBackdrop to allow dismissing by clicking outside the dialog card. Disabled by default for alertdialogs to prevent accidental dismissal."
      >
        <ComponentPreview
          code={ `<AlertDialogContent closeOnBackdrop>
  …
</AlertDialogContent>`}
        >
          <div className="flex gap-3">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm">closeOnBackdrop</Button>
              </AlertDialogTrigger>
              <AlertDialogContent closeOnBackdrop>
                <div className="px-6 py-6 text-center space-y-1.5">
                  <AlertDialogTitle>Click outside to close</AlertDialogTitle>
                  <AlertDialogDescription>
                    This dialog closes when you click the backdrop behind it.
                  </AlertDialogDescription>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel>Close</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm">With close button</Button>
              </AlertDialogTrigger>
              <AlertDialogContent showClose closeOnBackdrop>
                <div className="px-6 py-6 text-center space-y-1.5">
                  <AlertDialogTitle>Has close button</AlertDialogTitle>
                  <AlertDialogDescription>
                    The ✕ button in the corner also dismisses this dialog.
                  </AlertDialogDescription>
                </div>
                <AlertDialogFooter>
                  <AlertDialogAction>Got it</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          7. REAL-WORLD — BILLING CANCEL
      ══════════════════════════════════════ */}
      <Section
        id="billing"
        title="Cancel Subscription"
        description="A real-world example with feature-loss details inside the dialog body."
      >
        <ComponentPreview code={ `<AlertDialog>…</AlertDialog>` }>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" className="text-muted-foreground">
                <CreditCard className="h-4 w-4" /> Cancel subscription
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent width="30rem">
              <AlertDialogHeader variant="warning" />
              <div className="px-6 pb-2 text-center space-y-1.5">
                <AlertDialogTitle>Cancel your Pro subscription?</AlertDialogTitle>
                <AlertDialogDescription>
                  You'll lose access to these features at the end of your billing period on{ " " }
                  <strong className="text-foreground">April 26, 2026</strong>:
                </AlertDialogDescription>
              </div>
              <ul className="mx-6 mb-2 space-y-2 rounded-xl bg-muted/50 border border-border/40 px-4 py-3">
                { [
                  "Unlimited projects",
                  "Priority support",
                  "Advanced analytics",
                  "Custom domains",
                ].map(f => (
                  <li key={ f } className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                    { f }
                  </li>
                )) }
              </ul>
              <AlertDialogFooter>
                <AlertDialogCancel>Keep subscription</AlertDialogCancel>
                <AlertDialogAction variant="destructive">
                  Yes, cancel
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          8. PROPS
      ══════════════════════════════════════ */}
      <Section id="props" title="API Reference">
        <p className="text-sm font-semibold mb-3">AlertDialog</p>
        <PropsTable props={ [
          { name: "open", type: "boolean", default: "—", description: "Controlled open state." },
          { name: "defaultOpen", type: "boolean", default: "false", description: "Initial open state for uncontrolled usage." },
          { name: "onOpenChange", type: "(open: boolean) => void", default: "—", description: "Callback when open state changes." },
        ] } />

        <p className="text-sm font-semibold mb-3 mt-8">AlertDialogContent</p>
        <PropsTable props={ [
          { name: "variant", type: '"default" | "destructive" | "warning" | "success" | "info"', default: '"default"', description: "Passed to AlertDialogHeader to set icon color." },
          { name: "showClose", type: "boolean", default: "false", description: "Show an ✕ close button in the top-right corner." },
          { name: "closeOnBackdrop", type: "boolean", default: "false", description: "Close dialog when clicking the backdrop." },
          { name: "width", type: "string", default: '"28rem"', description: "Max-width of the dialog card." },
        ] } />

        <p className="text-sm font-semibold mb-3 mt-8">AlertDialogHeader</p>
        <PropsTable props={ [
          { name: "variant", type: '"default" | "destructive" | "warning" | "success" | "info"', default: '"default"', description: "Sets the icon background and color." },
          { name: "icon", type: "React.ReactNode", default: "—", description: "Override the default variant icon." },
          { name: "showIcon", type: "boolean", default: "true", description: "Hide the icon circle entirely." },
        ] } />

        <p className="text-sm font-semibold mb-3 mt-8">AlertDialogAction</p>
        <PropsTable props={ [
          { name: "variant", type: '"default" | "destructive" | "outline" | "ghost" | "secondary"', default: '"default"', description: "Visual style of the action button." },
        ] } />
      </Section>
    </DocsContent>
  );
}
