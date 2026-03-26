"use client";

import React, { useState, useEffect } from "react";
import { DocsContent, Section, ComponentPreview, PropsTable } from "@/components/docs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ProgressPage() {
  const [ value, setValue ] = useState(65);
  const [ simulating, setSimulating ] = useState(false);
  const [ simValue, setSimValue ] = useState(0);

  // Simulate a real upload
  useEffect(() => {
    if (!simulating) return;
    if (simValue >= 100) { setSimulating(false); return; }
    const id = setTimeout(() =>
      setSimValue(v => Math.min(100, v + Math.random() * 12 + 3)), 250
    );
    return () => clearTimeout(id);
  }, [ simulating, simValue ]);

  const startSim = () => { setSimValue(0); setSimulating(true); };

  return (
    <DocsContent
      title="Progress"
      description="A flexible progress bar supporting determinate, indeterminate, striped, and animated variants. Fully accessible with role=progressbar and aria values. Includes label positions, size variants, and mount animation."
      importPath='import { Progress } from "@/components/ui/progress";'
    >

      {/* ══════════════════════════════════════
          1. BASIC
      ══════════════════════════════════════ */}
      <Section id="basic" title="Basic"
        description="Pass a value between 0–100. The bar animates on mount by default.">
        <ComponentPreview code={ `<Progress value={65} />` }>
          <div className="flex flex-col gap-4 max-w-md">
            <Progress value={ value } />
            <div className="flex items-center gap-3">
              <input
                type="range" min={ 0 } max={ 100 }
                value={ value }
                onChange={ e => setValue(Number(e.target.value)) }
                className="flex-1 accent-primary"
              />
              <Badge variant="secondary" className="font-mono text-xs w-12 justify-center">
                { value }%
              </Badge>
            </div>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          2. VARIANTS
      ══════════════════════════════════════ */}
      <Section id="variants" title="Variants"
        description="Five semantic colour variants.">
        <ComponentPreview code={ `<Progress value={70} variant="default" />
<Progress value={80} variant="success" />
<Progress value={45} variant="error"   />
<Progress value={60} variant="warning" />
<Progress value={55} variant="info"    />`}>
          <div className="flex flex-col gap-3 max-w-md">
            { ([ "default", "success", "error", "warning", "info" ] as const).map(v => (
              <div key={ v } className="flex items-center gap-3">
                <span className="text-xs font-mono text-muted-foreground w-16">{ v }</span>
                <Progress value={ 65 } variant={ v } className="flex-1" />
              </div>
            )) }
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          3. SIZES
      ══════════════════════════════════════ */}
      <Section id="sizes" title="Sizes"
        description="Four sizes from xs (1px) to lg (16px).">
        <ComponentPreview code={ `<Progress value={65} size="xs" />
<Progress value={65} size="sm" />
<Progress value={65} size="md" />
<Progress value={65} size="lg" />`}>
          <div className="flex flex-col gap-4 max-w-md">
            { ([ "xs", "sm", "md", "lg" ] as const).map(s => (
              <div key={ s } className="flex items-center gap-3">
                <span className="text-xs font-mono text-muted-foreground w-6">{ s }</span>
                <Progress value={ 65 } size={ s } className="flex-1" />
              </div>
            )) }
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          4. LABELS
      ══════════════════════════════════════ */}
      <Section id="labels" title="Labels"
        description="Show a label above, to the right, or inside the bar (lg size only).">
        <ComponentPreview code={ `<Progress value={72} showLabel labelPosition="above" />
<Progress value={72} showLabel labelPosition="right" />
<Progress value={72} showLabel labelPosition="inside" size="lg" />`}>
          <div className="flex flex-col gap-5 max-w-md">
            <Progress value={ 72 } showLabel labelPosition="above" />
            <Progress value={ 72 } showLabel labelPosition="right" />
            <Progress value={ 72 } showLabel labelPosition="inside" size="lg" />
            <Progress value={ 72 } showLabel label="72 / 100 tasks" labelPosition="right" />
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          5. STRIPED
      ══════════════════════════════════════ */}
      <Section id="striped" title="Striped"
        description="Add a diagonal stripe pattern. Enable animateStripes for a marching-ants effect.">
        <ComponentPreview code={ `<Progress value={65} striped />
<Progress value={65} striped animateStripes variant="success" />`}>
          <div className="flex flex-col gap-3 max-w-md">
            <Progress value={ 65 } striped size="lg" />
            <Progress value={ 65 } striped animateStripes size="lg" variant="success" />
            <Progress value={ 65 } striped animateStripes size="lg" variant="info" />
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          6. INDETERMINATE
      ══════════════════════════════════════ */}
      <Section id="indeterminate" title="Indeterminate"
        description="Use when the total progress is unknown — shows a looping animation.">
        <ComponentPreview code={ `<Progress indeterminate />
<Progress indeterminate variant="info" size="sm" />`}>
          <div className="flex flex-col gap-3 max-w-md">
            <Progress indeterminate />
            <Progress indeterminate variant="info" size="sm" />
            <Progress indeterminate variant="warning" size="lg" />
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          7. SIMULATED UPLOAD
      ══════════════════════════════════════ */}
      <Section id="simulated" title="Real-world: File Upload"
        description="Combining controlled value, label, and variant changes as progress advances.">
        <ComponentPreview code={ `const [progress, setProgress] = useState(0);

toast.promise(uploadFile(), {
  loading: "Uploading…",
  success: "Upload complete!",
  error:   "Upload failed",
});

<Progress
  value={progress}
  variant={progress === 100 ? "success" : "default"}
  showLabel
  labelPosition="right"
  label={progress === 100 ? "Complete!" : \`\${Math.round(progress)}%\`}
/>`}>
          <div className="flex flex-col gap-3 max-w-md">
            <Progress
              value={ simValue }
              variant={ simValue === 100 ? "success" : simulating ? "info" : "default" }
              showLabel
              labelPosition="right"
              size="md"
              label={
                simValue === 100 ? "Complete! ✓"
                  : simulating ? `${Math.round(simValue)}%`
                    : "Click to start"
              }
            />
            <Button
              size="sm"
              variant={ simValue === 100 ? "outline" : "default" }
              className="self-start"
              disabled={ simulating }
              onClick={ startSim }
            >
              { simValue === 100 ? "Upload again" : simulating ? "Uploading…" : "Simulate upload" }
            </Button>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          8. PROPS
      ══════════════════════════════════════ */}
      <Section id="props" title="API Reference">
        <PropsTable props={ [
          { name: "value", type: "number", default: "0", description: "Progress value 0–100." },
          { name: "indeterminate", type: "boolean", default: "false", description: "Show a looping animation when total is unknown." },
          { name: "variant", type: '"default"|"success"|"error"|"warning"|"info"', default: '"default"', description: "Fill colour." },
          { name: "size", type: '"xs"|"sm"|"md"|"lg"', default: '"md"', description: "Bar height." },
          { name: "showLabel", type: "boolean", default: "false", description: "Show a percentage or custom label." },
          { name: "labelPosition", type: '"above"|"right"|"inside"', default: '"right"', description: "Where to render the label." },
          { name: "label", type: "string", default: "x%", description: "Override the auto-generated percentage label." },
          { name: "animate", type: "boolean", default: "true", description: "Animate fill width on mount." },
          { name: "rounded", type: "boolean", default: "true", description: "Round bar ends." },
          { name: "striped", type: "boolean", default: "false", description: "Add diagonal stripe pattern." },
          { name: "animateStripes", type: "boolean", default: "false", description: "March the stripes." },
          { name: "trackClassName", type: "string", default: "—", description: "Extra class for the track element." },
          { name: "fillClassName", type: "string", default: "—", description: "Extra class for the fill element." },
        ] } />
      </Section>
    </DocsContent>
  );
}
