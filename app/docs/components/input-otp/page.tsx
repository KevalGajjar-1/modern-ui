"use client";

import React, { useState, useEffect } from "react";
import { DocsContent, Section, ComponentPreview, PropsTable } from "@/components/docs";
import { InputOTP, InputOTPGroup } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { CheckCircle2, RefreshCw, Mail, Smartphone } from "lucide-react";

export default function InputOTPPage() {
  const [ basic, setBasic ] = useState("");
  const [ controlled, setControlled ] = useState("");
  const [ status, setStatus ] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [ timer, setTimer ] = useState(0);
  const [ pinValue, setPinValue ] = useState("");

  // Countdown for resend button
  useEffect(() => {
    if (timer <= 0) return;
    const t = setTimeout(() => setTimer(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [ timer ]);

  const verifyOTP = async (val: string) => {
    setStatus("loading");
    await new Promise(r => setTimeout(r, 1500));
    setStatus(val === "123456" ? "success" : "error");
    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <DocsContent
      title="Input OTP"
      description="A one-time password input built from individual character slots. Supports paste, keyboard navigation, auto-advance, backspace handling, masking, and custom separators."
      importPath='import { InputOTP, InputOTPGroup } from "@/components/ui/input-otp";'
    >

      {/* ══════════════════════════════════════
          1. BASIC
      ══════════════════════════════════════ */}
      <Section
        id="basic"
        title="Basic"
        description="A 6-digit OTP input. Each slot advances focus automatically on input and retreats on backspace."
      >
        <ComponentPreview
          code={ `import { InputOTP } from "@/components/ui/input-otp";

const [value, setValue] = useState("");

<InputOTP
  length={6}
  value={value}
  onValueChange={setValue}
  onComplete={v => console.log("Complete:", v)}
/>`}
        >
          <div className="flex flex-col items-center gap-4">
            <InputOTP
              length={ 6 }
              value={ basic }
              onValueChange={ setBasic }
              autoFocus
            />
            <p className="text-xs font-mono text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-lg">
              value: "<strong>{ basic }</strong>" ({ basic.length }/6)
            </p>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          2. VARIANTS
      ══════════════════════════════════════ */}
      <Section
        id="variants"
        title="Variants"
        description="Four slot styles: default (bordered), outline (thick border), filled (muted background), and underline (minimal)."
      >
        <ComponentPreview
          code={ `<InputOTP variant="default"   length={4} />
<InputOTP variant="outline"   length={4} />
<InputOTP variant="filled"    length={4} />
<InputOTP variant="underline" length={4} />`}
        >
          <div className="flex flex-col gap-6 items-start">
            { ([ "default", "outline", "filled", "underline" ] as const).map(v => (
              <div key={ v } className="flex items-center gap-6">
                <span className="w-24 text-xs text-muted-foreground font-mono shrink-0">{ v }</span>
                <InputOTP variant={ v } length={ 4 } defaultValue="12" />
              </div>
            )) }
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          3. SIZES
      ══════════════════════════════════════ */}
      <Section
        id="sizes"
        title="Sizes"
        description="Three sizes: sm for compact layouts, md for standard usage, lg for prominent full-page verification screens."
      >
        <ComponentPreview
          code={ `<InputOTP size="sm" length={6} />
<InputOTP size="md" length={6} />
<InputOTP size="lg" length={6} />`}
        >
          <div className="flex flex-col gap-6 items-center">
            { ([ "sm", "md", "lg" ] as const).map(s => (
              <div key={ s } className="flex flex-col items-center gap-2">
                <InputOTP size={ s } length={ 6 } variant="default" defaultValue="123" />
                <span className="text-[10px] font-mono text-muted-foreground uppercase">{ s }</span>
              </div>
            )) }
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          4. SEPARATOR
      ══════════════════════════════════════ */}
      <Section
        id="separator"
        title="Separator"
        description="Use separatorAt to insert a visual divider every N slots. Common patterns: 3+3 for OTP, 4+4 for serial numbers."
      >
        <ComponentPreview
          code={ `{/* Dash every 3 digits */}
<InputOTP length={6} separatorAt={3} />

{/* Dot every 2 digits */}
<InputOTP
  length={8}
  separatorAt={2}
  separator={<span className="text-muted-foreground">·</span>}
/>

{/* Space every 4 digits (license key style) */}
<InputOTP length={16} separatorAt={4} pattern="alphanumeric" />`}
        >
          <div className="flex flex-col gap-6 items-center">
            <div className="flex flex-col items-center gap-2">
              <p className="text-xs text-muted-foreground">6-digit with middle dash</p>
              <InputOTP length={ 6 } separatorAt={ 3 } />
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="text-xs text-muted-foreground">8-digit with dot every 2</p>
              <InputOTP
                length={ 8 }
                separatorAt={ 2 }
                separator={ <span className="text-muted-foreground text-lg select-none">·</span> }
              />
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="text-xs text-muted-foreground">License key (alphanumeric, 4+4+4+4)</p>
              <InputOTP length={ 16 } separatorAt={ 4 } pattern="alphanumeric" size="sm"
                separator={ <span className="text-muted-foreground/50 text-sm select-none font-mono">-</span> }
              />
            </div>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          5. PATTERN
      ══════════════════════════════════════ */}
      <Section
        id="pattern"
        title="Input Pattern"
        description="Restrict accepted characters per slot. Invalid characters are silently rejected."
      >
        <ComponentPreview
          code={ `<InputOTP pattern="numeric"     length={6} /> {/* 0–9 only */}
<InputOTP pattern="alpha"       length={6} /> {/* a–z A–Z only */}
<InputOTP pattern="alphanumeric"length={6} /> {/* letters + digits */}
<InputOTP pattern="any"         length={6} /> {/* any character */}`}
        >
          <div className="flex flex-col gap-5 items-start">
            { ([ "numeric", "alpha", "alphanumeric", "any" ] as const).map(p => (
              <div key={ p } className="flex items-center gap-6">
                <span className="w-28 text-xs text-muted-foreground font-mono shrink-0">{ p }</span>
                <InputOTP pattern={ p } length={ 4 } variant="outline" />
              </div>
            )) }
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          6. STATUS STATES
      ══════════════════════════════════════ */}
      <Section
        id="status"
        title="Status States"
        description="Four statuses: idle (default), loading (dimmed), success (green slots), error (red slots)."
      >
        <ComponentPreview
          code={ `<InputOTP status="idle"    length={6} defaultValue="123456" />
<InputOTP status="loading" length={6} defaultValue="123456" />
<InputOTP status="success" length={6} defaultValue="123456" />
<InputOTP status="error"   length={6} defaultValue="123456" />`}
        >
          <div className="flex flex-col gap-5 items-start">
            { ([ "idle", "loading", "success", "error" ] as const).map(s => (
              <div key={ s } className="flex items-center gap-6">
                <span className="w-16 text-xs text-muted-foreground font-mono shrink-0">{ s }</span>
                <InputOTP status={ s } length={ 6 } defaultValue="123456" />
              </div>
            )) }
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          7. MASKED (password)
      ══════════════════════════════════════ */}
      <Section
        id="masked"
        title="Masked Input"
        description="Set mask={true} to display bullets instead of the typed characters — ideal for PIN entry."
      >
        <ComponentPreview
          code={ `const [pin, setPin] = useState("");

<InputOTP
  mask
  length={4}
  value={pin}
  onValueChange={setPin}
  aria-label="Enter your 4-digit PIN"
/>`}
        >
          <div className="flex flex-col items-center gap-4">
            <InputOTPGroup
              label="Enter your 4-digit PIN"
              description="This is your account security PIN"
              status={ pinValue.length === 4 ? "success" : "idle" }
              statusMessage={ pinValue.length === 4 ? "PIN accepted" : undefined }
            >
              <InputOTP
                mask
                length={ 4 }
                value={ pinValue }
                onValueChange={ setPinValue }
                variant="filled"
                size="lg"
                aria-label="PIN entry"
              />
            </InputOTPGroup>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          8. FULL VERIFY FLOW
      ══════════════════════════════════════ */}
      <Section
        id="verify-flow"
        title="Verify Flow"
        description="A complete email verification screen using InputOTPGroup with status feedback, auto-submit on complete, and a resend countdown."
      >
        <ComponentPreview
          code={ `const [status, setStatus] = useState("idle");
const [timer,  setTimer]  = useState(0);

const verify = async (val: string) => {
  setStatus("loading");
  await checkOTP(val);
  setStatus(valid ? "success" : "error");
};

<InputOTPGroup
  label="Verify your email"
  description="Enter the 6-digit code sent to alex@example.com"
  status={status}
  statusMessage={
    status === "success" ? "✓ Email verified!" :
    status === "error"   ? "✗ Invalid code. Try again." : undefined
  }
>
  <InputOTP
    length={6}
    status={status}
    onComplete={verify}
    autoFocus
  />
</InputOTPGroup>`}
        >
          <div className="w-full max-w-sm mx-auto">
            <div className="rounded-2xl border border-border/60 bg-card shadow-sm p-8">
              <div className="flex justify-center mb-6">
                <div className="w-12 h-12 rounded-2xl bg-violet-100 dark:bg-violet-950/50 flex items-center justify-center">
                  <Mail className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                </div>
              </div>

              <InputOTPGroup
                label="Verify your email"
                description="Enter the 6-digit code sent to alex@example.com. Try '123456' as the correct code."
                status={ status }
                statusMessage={
                  status === "success" ? "✓ Email verified successfully!" :
                    status === "error" ? "✗ Invalid code. Please try again." :
                      status === "loading" ? "Verifying…" : undefined
                }
              >
                <InputOTP
                  length={ 6 }
                  value={ controlled }
                  onValueChange={ v => { setControlled(v); setStatus("idle"); } }
                  onComplete={ verifyOTP }
                  status={ status }
                  variant="default"
                  size="md"
                  separatorAt={ 3 }
                  autoFocus
                />
              </InputOTPGroup>

              <div className="mt-6 flex flex-col items-center gap-3">
                { status === "loading" && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Spinner size="sm" /> Verifying code…
                  </div>
                ) }
                { status === "success" && (
                  <div className="flex items-center gap-2 text-sm text-emerald-600">
                    <CheckCircle2 className="h-4 w-4" /> Verification complete!
                  </div>
                ) }

                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span>Didn't receive a code?</span>
                  <button
                    disabled={ timer > 0 }
                    onClick={ () => { setTimer(30); setControlled(""); setStatus("idle"); } }
                    className="flex items-center gap-1 font-medium text-primary hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <RefreshCw className="h-3 w-3" />
                    { timer > 0 ? `Resend in ${timer}s` : "Resend code" }
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          9. PROPS
      ══════════════════════════════════════ */}
      <Section id="props" title="API Reference">
        <p className="text-sm font-semibold mb-3">InputOTP</p>
        <PropsTable props={ [
          { name: "length", type: "number", default: "6", description: "Number of OTP character slots to render." },
          { name: "value", type: "string", default: "—", description: "Controlled value. Each character maps to one slot." },
          { name: "defaultValue", type: "string", default: '""', description: "Initial value for uncontrolled usage." },
          { name: "onValueChange", type: "(value: string) => void", default: "—", description: "Called on every keystroke." },
          { name: "onComplete", type: "(value: string) => void", default: "—", description: "Called once when all slots are filled." },
          { name: "variant", type: '"default" | "outline" | "filled" | "underline"', default: '"default"', description: "Visual style of each slot." },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Size of each slot." },
          { name: "status", type: '"idle" | "loading" | "success" | "error"', default: '"idle"', description: "Visual feedback state applied to all slots." },
          { name: "pattern", type: '"numeric" | "alpha" | "alphanumeric" | "any"', default: '"numeric"', description: "Restricts which characters are accepted." },
          { name: "separatorAt", type: "number", default: "0", description: "Insert a separator element every N slots. 0 disables." },
          { name: "separator", type: "React.ReactNode", default: '"–"', description: "Custom separator element." },
          { name: "mask", type: "boolean", default: "false", description: "Display bullets instead of typed characters." },
          { name: "autoFocus", type: "boolean", default: "false", description: "Focus the first empty slot on mount." },
          { name: "disabled", type: "boolean", default: "false", description: "Disables all slots." },
          { name: "placeholder", type: "string", default: '"○"', description: "Character shown in empty slots." },
        ] } />
      </Section>

    </DocsContent>
  );
}
