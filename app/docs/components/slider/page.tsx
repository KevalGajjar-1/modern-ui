"use client";

import React from "react";
import { DocsContent, Section, ComponentPreview, DemoCard } from "@/components/docs";
import { Slider, SliderMinimal, SliderThick, SliderDouble } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

export default function SliderPage() {
  return (
    <DocsContent
      title="Slider"
      description="An input where the user selects a value from a range."
      importPath='import { Slider } from "@/components/ui/slider";'
    >
      <Section title="Default" description="Standard slider with thumb control.">
        <ComponentPreview
          code={`<Slider defaultValue={[50]} max={100} step={1} className="w-[200px]" />`}
        >
          <Slider defaultValue={[50]} max={100} step={1} className="w-[200px]" />
        </ComponentPreview>
      </Section>

      <Section title="Minimal" description="Thin, minimal slider without thumb.">
        <DemoCard>
          <div className="w-[200px]">
            <SliderMinimal defaultValue={[60]} max={100} step={1} />
          </div>
        </DemoCard>
      </Section>

      <Section title="Thick" description="Bold slider with large thumb and gradient track.">
        <DemoCard>
          <div className="w-[200px]">
            <SliderThick defaultValue={[70]} max={100} step={1} />
          </div>
        </DemoCard>
      </Section>

      <Section title="Double Handle" description="Range slider with two thumbs for min/max selection.">
        <DemoCard>
          <div className="w-[200px]">
            <SliderDouble defaultValue={[25, 75]} max={100} step={1} />
          </div>
        </DemoCard>
      </Section>

      <Section title="With Tooltip" description="Slider showing current value in tooltip.">
        <DemoCard>
          <div className="w-[200px]">
            <Slider defaultValue={[45]} max={100} step={1} showTooltip />
          </div>
        </DemoCard>
      </Section>

      <Section title="With Label" description="Slider with descriptive label and value display.">
        <DemoCard>
          <div className="w-[200px] space-y-4">
            <div className="flex justify-between">
              <Label htmlFor="volume">Volume</Label>
              <span className="text-sm text-muted-foreground">65%</span>
            </div>
            <Slider defaultValue={[65]} max={100} step={1} id="volume" />
          </div>
        </DemoCard>
      </Section>

      <Section title="Disabled" description="Slider in disabled state.">
        <DemoCard>
          <div className="w-[200px] space-y-4">
            <Slider defaultValue={[40]} max={100} step={1} disabled />
            <SliderDouble defaultValue={[20, 80]} max={100} step={1} disabled />
          </div>
        </DemoCard>
      </Section>
    </DocsContent>
  );
}
