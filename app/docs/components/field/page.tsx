"use client";

import React, { useState } from "react";
import { DocsContent, Section, ComponentPreview, PropsTable } from "@/components/docs";
import {
  Field, FieldLabel, FieldHint, FieldMessage, PasswordInput,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Info, HelpCircle } from "lucide-react";

export default function FieldPage() {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ bio, setBio ] = useState("");
  const [ submitted, setSubmitted ] = useState(false);

  const emailError = submitted && !email.includes("@") ? "Enter a valid email address." : "";
  const passwordError = submitted && password.length < 8 ? "Password must be at least 8 characters." : "";
  const bioWarning = bio.length > 140 ? `${bio.length - 140} characters over limit.` : "";

  return (
    <DocsContent
      title="Field"
      description="A form field wrapper that wires up label, hint, and validation message with correct ARIA attributes. Automatically links label → input via id, injects aria-describedby, and broadcasts aria-invalid when in error state."
      importPath='import { Field, FieldLabel, FieldHint, FieldMessage } from "@/components/ui/field";'
    >

      {/* ══════════════════════════════════════
          1. BASIC
      ══════════════════════════════════════ */}
      <Section
        id="basic"
        title="Basic"
        description="Wrap any input with Field and pass a label. The id link is managed automatically."
      >
        <ComponentPreview
          code={ `import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

<Field label="Email address">
  <Input type="email" placeholder="you@example.com" />
</Field>`}
        >
          <div className="w-full max-w-sm">
            <Field label="Email address">
              <Input type="email" placeholder="you@example.com" />
            </Field>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          2. WITH HINT
      ══════════════════════════════════════ */}
      <Section
        id="hint"
        title="With Hint"
        description="Pass hint to render helper text below the input. It's linked via aria-describedby."
      >
        <ComponentPreview
          code={ `<Field
  label="Username"
  hint="Must be 3–20 characters. Letters, numbers, and underscores only."
>
  <Input placeholder="alex_99" />
</Field>`}
        >
          <div className="w-full max-w-sm space-y-4">
            <Field
              label="Username"
              hint="Must be 3–20 characters. Letters, numbers, and underscores only."
            >
              <Input placeholder="alex_99" />
            </Field>

            <Field
              label="Invite code"
              hint="Ask your team admin for an invite code."
            >
              <Input placeholder="XXXX-XXXX" className="font-mono tracking-widest" />
            </Field>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          3. REQUIRED & OPTIONAL
      ══════════════════════════════════════ */}
      <Section
        id="required-optional"
        title="Required & Optional"
        description="Use required for a red asterisk and optional for a subtle badge. Never show both on the same field."
      >
        <ComponentPreview
          code={ `<Field label="Full name" required>
  <Input placeholder="Alex Johnson" />
</Field>

<Field label="Company" optional>
  <Input placeholder="Modern UI." />
</Field>`}
        >
          <div className="w-full max-w-sm space-y-4">
            <Field label="Full name" required hint="First and last name.">
              <Input placeholder="Alex Johnson" />
            </Field>
            <Field label="Website" optional hint="Include https://">
              <Input placeholder="https://example.com" />
            </Field>
            <Field label="Company" optional>
              <Input placeholder="Modern UI." />
            </Field>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          4. LABEL SUFFIX (tooltip)
      ══════════════════════════════════════ */}
      <Section
        id="label-suffix"
        title="Label Suffix"
        description="Pass labelSuffix to add any node after the label — commonly an info icon tooltip."
      >
        <ComponentPreview
          code={ `<Field
  label="API key"
  labelSuffix={
    <HelpCircle className="h-3.5 w-3.5 cursor-help" />
  }
  hint="Your secret key. Never share this publicly."
>
  <Input type="password" placeholder="sk_live_…" />
</Field>`}
        >
          <div className="w-full max-w-sm space-y-4">
            <Field
              label="API key"
              required
              labelSuffix={
                <span title="Your secret API key — never share this">
                  <HelpCircle className="h-3.5 w-3.5 text-muted-foreground/60 cursor-help" />
                </span>
              }
              hint="Starts with sk_live_ for production keys."
            >
              <Input type="password" placeholder="sk_live_…" />
            </Field>

            <Field
              label="Tax rate"
              labelSuffix={
                <Badge variant="outline" className="text-[9px] h-4 px-1.5 font-normal">
                  % per transaction
                </Badge>
              }
            >
              <Input type="number" placeholder="7.5" step="0.1" min="0" max="100" />
            </Field>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          5. STATUS MESSAGES
      ══════════════════════════════════════ */}
      <Section
        id="status"
        title="Validation States"
        description="Pass status and message to show inline validation feedback. error triggers aria-invalid and role='alert'."
      >
        <ComponentPreview
          code={ `<Field label="Email" status="error" message="This email is already taken.">
  <Input type="email" defaultValue="taken@example.com" />
</Field>

<Field label="Username" status="success" message="Username is available!">
  <Input defaultValue="alex_99" />
</Field>

<Field label="Bio" status="warning" message="140 characters max recommended.">
  <Textarea defaultValue="A really long bio…" />
</Field>`}
        >
          <div className="w-full max-w-sm space-y-5">
            <Field
              label="Email"
              status="error"
              message="This email is already taken. Try another."
              required
            >
              <Input
                type="email"
                defaultValue="taken@example.com"
                className="border-red-500 focus:border-red-500 focus:outline-red-500/25"
              />
            </Field>

            <Field
              label="Username"
              status="success"
              message="Username is available!"
            >
              <Input
                defaultValue="alex_99"
                className="border-emerald-500 focus:border-emerald-500 "
              />
            </Field>

            <Field
              label="Bio"
              status="warning"
              message="Keeping it under 140 characters improves readability."
              hint="Short bios get 3x more profile views."
            >
              <Textarea
                defaultValue="I'm a designer and developer who loves open source, clean code, and great coffee. I work at Vercel and build things."
                rows={ 3 }
              />
            </Field>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          6. HORIZONTAL LAYOUT
      ══════════════════════════════════════ */}
      <Section
        id="horizontal"
        title="Horizontal Layout"
        description="Set layout='horizontal' to place the label to the left. Adjust labelWidth to align a stack of fields."
      >
        <ComponentPreview
          code={ `<Field label="First name" layout="horizontal" labelWidth="8rem" required>
  <Input placeholder="Alex" />
</Field>
<Field label="Last name" layout="horizontal" labelWidth="8rem">
  <Input placeholder="Johnson" />
</Field>
<Field label="Email" layout="horizontal" labelWidth="8rem" required
  hint="We'll send a confirmation.">
  <Input type="email" placeholder="alex@example.com" />
</Field>`}
        >
          <div className="w-full max-w-lg space-y-4">
            { [
              { label: "First name", required: true, placeholder: "Alex", type: "text" },
              { label: "Last name", required: false, placeholder: "Johnson", type: "text" },
              { label: "Email", required: true, placeholder: "alex@example.com", type: "email" },
            ].map(f => (
              <Field
                key={ f.label }
                label={ f.label }
                layout="horizontal"
                labelWidth="8rem"
                required={ f.required }
              >
                <Input type={ f.type } placeholder={ f.placeholder } />
              </Field>
            )) }
            <Field
              label="Role"
              layout="horizontal"
              labelWidth="8rem"
              hint="Determines access level"
            >
              <NativeSelect defaultValue="member">
                <NativeSelectOption value="owner">Owner</NativeSelectOption>
                <NativeSelectOption value="admin">Admin</NativeSelectOption>
                <NativeSelectOption value="member">Member</NativeSelectOption>
                <NativeSelectOption value="viewer">Viewer</NativeSelectOption>
              </NativeSelect>
            </Field>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          7. WITH DIFFERENT INPUTS
      ══════════════════════════════════════ */}
      <Section
        id="input-types"
        title="With Any Input"
        description="Field wraps any input type — text, textarea, select, switch, checkbox. The id and aria wiring works universally."
      >
        <ComponentPreview
          code={ `{/* Textarea */}
<Field label="Bio" hint="Max 140 characters">
  <Textarea rows={3} />
</Field>

{/* Select */}
<Field label="Country" required>
  <NativeSelect placeholder="Select country">…</NativeSelect>
</Field>

{/* Password with toggle */}
<Field label="Password" hint="Min 8 characters" required>
  <PasswordInput placeholder="••••••••" />
</Field>

{/* Switch */}
<Field label="Email notifications" layout="horizontal">
  <Switch />
</Field>`}
        >
          <div className="w-full max-w-sm space-y-5">
            <Field label="Bio" hint="Write a short bio — max 140 characters." optional>
              <Textarea
                rows={ 3 }
                placeholder="I'm a developer who…"
                value={ bio }
                onChange={ e => setBio(e.target.value) }
              />
              { bioWarning && (
                <FieldMessage status="warning" icon>{ bioWarning }</FieldMessage>
              ) }
            </Field>

            <Field label="Country" required>
              <NativeSelect placeholder="Select your country" defaultValue="">
                <NativeSelectOption value="in">🇮🇳 India</NativeSelectOption>
                <NativeSelectOption value="us">🇺🇸 United States</NativeSelectOption>
                <NativeSelectOption value="gb">🇬🇧 United Kingdom</NativeSelectOption>
              </NativeSelect>
            </Field>

            <Field
              label="Password"
              required
              hint="Min 8 characters with at least one number."
            >
              <PasswordInput
                placeholder="••••••••"
                value={ password }
                onChange={ e => setPassword(e.target.value) }
              />
            </Field>

            <Field
              label="Marketing emails"
              layout="horizontal"
              hint="Receive product updates and offers."
            >
              <div className="pt-0.5">
                <Switch />
              </div>
            </Field>

            <Field label="Agree to terms" required>
              <div className="flex items-start gap-2.5">
                <Checkbox id="terms" className="mt-0.5" />
                <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                  I agree to the{ " " }
                  <a href="#" className="text-primary underline">Terms of Service</a>{ " " }
                  and{ " " }
                  <a href="#" className="text-primary underline">Privacy Policy</a>.
                </label>
              </div>
            </Field>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          8. COMPLETE FORM EXAMPLE
      ══════════════════════════════════════ */}
      <Section
        id="form-example"
        title="Full Form Example"
        description="Field used throughout a real sign-up form. Validation fires on submit."
      >
        <ComponentPreview
          code={ `const [submitted, setSubmitted] = useState(false);
const emailError   = submitted && !email.includes("@")  ? "Enter a valid email." : "";
const passwordError = submitted && password.length < 8   ? "Min 8 characters."   : "";

<form onSubmit={e => { e.preventDefault(); setSubmitted(true); }}>
  <Field label="Email" required
    status={emailError ? "error" : "idle"}
    message={emailError}>
    <Input type="email" value={email} onChange={…} placeholder="you@example.com" />
  </Field>

  <Field label="Password" required
    status={passwordError ? "error" : "idle"}
    message={passwordError}
    hint="Min 8 characters.">
    <PasswordInput value={password} onChange={…} />
  </Field>

  <Button type="submit">Create account</Button>
</form>`}
        >
          <div className="w-full max-w-sm">
            <form
              onSubmit={ e => { e.preventDefault(); setSubmitted(true); } }
              className="space-y-4"
              noValidate
            >
              <Field
                label="Email address"
                required
                status={ emailError ? "error" : email && email.includes("@") ? "success" : "idle" }
                message={ emailError || (email && email.includes("@") ? "Looks good!" : "") }
              >
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={ email }
                  onChange={ e => { setEmail(e.target.value); setSubmitted(false); } }
                  className={ cn(
                    emailError && "border-red-500 focus:border-red-500 focus:outline-red-500/25",
                    !emailError && email.includes("@") && "border-emerald-500 focus:border-emerald-500 "
                  ) }
                />
              </Field>

              <Field
                label="Password"
                required
                hint="At least 8 characters with one number."
                status={ passwordError ? "error" : password.length >= 8 ? "success" : "idle" }
                message={ passwordError || (password.length >= 8 ? "Strong password!" : "") }
              >
                <PasswordInput
                  placeholder="••••••••"
                  value={ password }
                  onChange={ e => { setPassword(e.target.value); setSubmitted(false); } }
                  className={ cn(
                    passwordError && "border-red-500 focus:border-red-500 focus:outline-red-500/25",
                    !passwordError && password.length >= 8 && "border-emerald-500 focus:border-emerald-500 "
                  ) }
                />
              </Field>

              <Field label="Role" optional>
                <NativeSelect defaultValue="member">
                  <NativeSelectOption value="admin">Admin</NativeSelectOption>
                  <NativeSelectOption value="member">Member</NativeSelectOption>
                  <NativeSelectOption value="viewer">Viewer</NativeSelectOption>
                </NativeSelect>
              </Field>

              <Button type="submit" className="w-full">
                Create account
              </Button>

              { submitted && !emailError && !passwordError && (
                <p className="text-xs text-emerald-600 text-center font-medium">
                  ✓ Form submitted successfully!
                </p>
              ) }
            </form>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          9. PROPS
      ══════════════════════════════════════ */}
      <Section id="props" title="API Reference">
        <p className="text-sm font-semibold mb-3">Field</p>
        <PropsTable props={ [
          { name: "label", type: "string", default: "—", description: "Label text rendered above (or beside) the input." },
          { name: "htmlFor", type: "string", default: "auto", description: "id linking label to input. Auto-generated if omitted." },
          { name: "hint", type: "string", default: "—", description: "Helper text shown below the input." },
          { name: "message", type: "string", default: "—", description: "Validation message — colour driven by status." },
          { name: "status", type: '"idle" | "error" | "success" | "warning"', default: '"idle"', description: "Controls message colour and injects aria-invalid on error." },
          { name: "required", type: "boolean", default: "false", description: "Shows a red asterisk next to the label." },
          { name: "optional", type: "boolean", default: "false", description: "Shows an 'optional' badge next to the label." },
          { name: "labelSuffix", type: "React.ReactNode", default: "—", description: "Extra content rendered after the label text." },
          { name: "layout", type: '"vertical" | "horizontal"', default: '"vertical"', description: "Vertical stacks label above input; horizontal places it to the left." },
          { name: "labelWidth", type: "string", default: '"9rem"', description: "Width of the label column in horizontal layout." },
          { name: "disabled", type: "boolean", default: "false", description: "Dims the field and disables the child input." },
        ] } />

        <p className="text-sm font-semibold mb-3 mt-8">FieldMessage</p>
        <PropsTable props={ [
          { name: "status", type: '"idle" | "error" | "success" | "warning"', default: '"idle"', description: "Sets text colour and icon." },
          { name: "icon", type: "boolean", default: "true", description: "Show status icon before the message text." },
        ] } />

        <p className="text-sm font-semibold mb-3 mt-8">PasswordInput</p>
        <PropsTable props={ [
          { name: "showToggle", type: "boolean", default: "true", description: "Show eye icon button to toggle password visibility." },
        ] } />
      </Section>
    </DocsContent>
  );
}

// tiny cn helper for inline use
function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}
