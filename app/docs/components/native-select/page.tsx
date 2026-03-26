"use client";

import React, { useState } from "react";
import { DocsContent, Section, ComponentPreview, PropsTable } from "@/components/docs";
import {
  NativeSelect,
  NativeSelectOption,
  NativeSelectGroup,
} from "@/components/ui/native-select";
import {
  Globe, MapPin, Palette, CreditCard,
  Building2, Flag, Cpu, Languages,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function NativeSelectPage() {
  const [ country, setCountry ] = useState("");
  const [ currency, setCurrency ] = useState("usd");
  const [ theme, setTheme ] = useState("system");

  return (
    <DocsContent
      title="Native Select"
      description="A styled wrapper around the native HTML <select> element. Fully accessible by default, works on all platforms including mobile, and supports icons, variants, sizes, groups, and validation states."
      importPath='import { NativeSelect, NativeSelectOption, NativeSelectGroup } from "@/components/ui/native-select";'
    >

      {/* ══════════════════════════════════════
          1. BASIC
      ══════════════════════════════════════ */}
      <Section
        id="basic"
        title="Basic"
        description="A simple dropdown. Uses the browser's native select — no JavaScript popup required."
      >
        <ComponentPreview
          code={ `import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";

<NativeSelect placeholder="Select a framework" defaultValue="">
  <NativeSelectOption value="next">Next.js</NativeSelectOption>
  <NativeSelectOption value="remix">Remix</NativeSelectOption>
  <NativeSelectOption value="astro">Astro</NativeSelectOption>
  <NativeSelectOption value="sveltekit">SvelteKit</NativeSelectOption>
</NativeSelect>`}
        >
          <div className="w-full max-w-xs">
            <NativeSelect placeholder="Select a framework" defaultValue="">
              <NativeSelectOption value="next">Next.js</NativeSelectOption>
              <NativeSelectOption value="remix">Remix</NativeSelectOption>
              <NativeSelectOption value="astro">Astro</NativeSelectOption>
              <NativeSelectOption value="sveltekit">SvelteKit</NativeSelectOption>
              <NativeSelectOption value="nuxt">Nuxt</NativeSelectOption>
            </NativeSelect>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          2. VARIANTS
      ══════════════════════════════════════ */}
      <Section
        id="variants"
        title="Variants"
        description="Five visual styles to match any design context."
      >
        <ComponentPreview
          code={ `<NativeSelect variant="default"   defaultValue="next">…</NativeSelect>
<NativeSelect variant="outline"   defaultValue="next">…</NativeSelect>
<NativeSelect variant="filled"    defaultValue="next">…</NativeSelect>
<NativeSelect variant="ghost"     defaultValue="next">…</NativeSelect>
<NativeSelect variant="underline" defaultValue="next">…</NativeSelect>`}
        >
          <div className="flex flex-col gap-3 w-full max-w-xs">
            { ([ "default", "outline", "filled", "ghost", "underline" ] as const).map(v => (
              <div key={ v } className="flex items-center gap-4">
                <span className="w-24 text-xs text-muted-foreground font-mono shrink-0 capitalize">
                  { v }
                </span>
                <NativeSelect variant={ v } defaultValue="next" className="flex-1">
                  <NativeSelectOption value="next">Next.js</NativeSelectOption>
                  <NativeSelectOption value="remix">Remix</NativeSelectOption>
                  <NativeSelectOption value="astro">Astro</NativeSelectOption>
                </NativeSelect>
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
        description="Five sizes — xs for compact table cells, xl for prominent form inputs."
      >
        <ComponentPreview
          code={ `<NativeSelect size="xs" defaultValue="usd">…</NativeSelect>
<NativeSelect size="sm" defaultValue="usd">…</NativeSelect>
<NativeSelect size="md" defaultValue="usd">…</NativeSelect>
<NativeSelect size="lg" defaultValue="usd">…</NativeSelect>
<NativeSelect size="xl" defaultValue="usd">…</NativeSelect>`}
        >
          <div className="flex flex-col gap-3 w-full max-w-xs">
            { ([ "xs", "sm", "md", "lg", "xl" ] as const).map(s => (
              <div key={ s } className="flex items-center gap-4">
                <span className="w-8 text-xs text-muted-foreground font-mono uppercase shrink-0">
                  { s }
                </span>
                <NativeSelect size={ s } defaultValue="usd" className="flex-1">
                  <NativeSelectOption value="usd">USD — US Dollar</NativeSelectOption>
                  <NativeSelectOption value="eur">EUR — Euro</NativeSelectOption>
                  <NativeSelectOption value="gbp">GBP — British Pound</NativeSelectOption>
                </NativeSelect>
              </div>
            )) }
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          4. WITH LEFT ICON
      ══════════════════════════════════════ */}
      <Section
        id="icons"
        title="With Icons"
        description="Add a leftIcon for context. Pair with variant='filled' or 'default' for the best visual result."
      >
        <ComponentPreview
          code={ `<NativeSelect leftIcon={<Globe className="h-4 w-4" />} placeholder="Select language">
  <NativeSelectOption value="en">English</NativeSelectOption>
  <NativeSelectOption value="hi">Hindi</NativeSelectOption>
  <NativeSelectOption value="fr">French</NativeSelectOption>
</NativeSelect>

<NativeSelect leftIcon={<MapPin className="h-4 w-4" />} placeholder="Select country">
  <NativeSelectOption value="in">India</NativeSelectOption>
  <NativeSelectOption value="us">United States</NativeSelectOption>
</NativeSelect>`}
        >
          <div className="flex flex-col gap-3 w-full max-w-xs">
            <NativeSelect
              leftIcon={ <Globe className="h-4 w-4" /> }
              placeholder="Select language"
              defaultValue=""
            >
              <NativeSelectOption value="en">English</NativeSelectOption>
              <NativeSelectOption value="hi">Hindi — हिन्दी</NativeSelectOption>
              <NativeSelectOption value="fr">French — Français</NativeSelectOption>
              <NativeSelectOption value="de">German — Deutsch</NativeSelectOption>
              <NativeSelectOption value="ja">Japanese — 日本語</NativeSelectOption>
            </NativeSelect>

            <NativeSelect
              leftIcon={ <MapPin className="h-4 w-4" /> }
              placeholder="Select country"
              defaultValue=""
            >
              <NativeSelectOption value="in">🇮🇳 India</NativeSelectOption>
              <NativeSelectOption value="us">🇺🇸 United States</NativeSelectOption>
              <NativeSelectOption value="gb">🇬🇧 United Kingdom</NativeSelectOption>
              <NativeSelectOption value="de">🇩🇪 Germany</NativeSelectOption>
              <NativeSelectOption value="jp">🇯🇵 Japan</NativeSelectOption>
            </NativeSelect>

            <NativeSelect
              leftIcon={ <CreditCard className="h-4 w-4" /> }
              defaultValue="usd"
              variant="filled"
            >
              <NativeSelectOption value="usd">USD — US Dollar</NativeSelectOption>
              <NativeSelectOption value="eur">EUR — Euro</NativeSelectOption>
              <NativeSelectOption value="inr">INR — Indian Rupee</NativeSelectOption>
              <NativeSelectOption value="gbp">GBP — British Pound</NativeSelectOption>
            </NativeSelect>

            <NativeSelect
              leftIcon={ <Palette className="h-4 w-4" /> }
              value={ theme }
              onChange={ e => setTheme(e.target.value) }
              variant="outline"
            >
              <NativeSelectOption value="light">Light theme</NativeSelectOption>
              <NativeSelectOption value="dark">Dark theme</NativeSelectOption>
              <NativeSelectOption value="system">System default</NativeSelectOption>
            </NativeSelect>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          5. OPTION GROUPS
      ══════════════════════════════════════ */}
      <Section
        id="groups"
        title="Option Groups"
        description="Use NativeSelectGroup (optgroup) to categorize options into labelled sections."
      >
        <ComponentPreview
          code={ `import { NativeSelect, NativeSelectGroup, NativeSelectOption } from "@/components/ui/native-select";

<NativeSelect defaultValue="" placeholder="Select a city">
  <NativeSelectGroup label="India">
    <NativeSelectOption value="mumbai">Mumbai</NativeSelectOption>
    <NativeSelectOption value="delhi">New Delhi</NativeSelectOption>
    <NativeSelectOption value="bangalore">Bangalore</NativeSelectOption>
  </NativeSelectGroup>
  <NativeSelectGroup label="United States">
    <NativeSelectOption value="nyc">New York</NativeSelectOption>
    <NativeSelectOption value="sf">San Francisco</NativeSelectOption>
  </NativeSelectGroup>
  <NativeSelectGroup label="Europe">
    <NativeSelectOption value="london">London</NativeSelectOption>
    <NativeSelectOption value="berlin">Berlin</NativeSelectOption>
    <NativeSelectOption value="paris">Paris</NativeSelectOption>
  </NativeSelectGroup>
</NativeSelect>`}
        >
          <div className="w-full max-w-xs">
            <NativeSelect
              defaultValue=""
              placeholder="Select a city"
              leftIcon={ <Building2 className="h-4 w-4" /> }
            >
              <NativeSelectGroup label="🇮🇳 India">
                <NativeSelectOption value="mumbai">Mumbai</NativeSelectOption>
                <NativeSelectOption value="delhi">New Delhi</NativeSelectOption>
                <NativeSelectOption value="bangalore">Bangalore</NativeSelectOption>
                <NativeSelectOption value="ahmedabad">Ahmedabad</NativeSelectOption>
              </NativeSelectGroup>
              <NativeSelectGroup label="🇺🇸 United States">
                <NativeSelectOption value="nyc">New York</NativeSelectOption>
                <NativeSelectOption value="sf">San Francisco</NativeSelectOption>
                <NativeSelectOption value="chicago">Chicago</NativeSelectOption>
              </NativeSelectGroup>
              <NativeSelectGroup label="🇪🇺 Europe">
                <NativeSelectOption value="london">London</NativeSelectOption>
                <NativeSelectOption value="berlin">Berlin</NativeSelectOption>
                <NativeSelectOption value="paris">Paris</NativeSelectOption>
                <NativeSelectOption value="amsterdam">Amsterdam</NativeSelectOption>
              </NativeSelectGroup>
            </NativeSelect>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          6. VALIDATION STATES
      ══════════════════════════════════════ */}
      <Section
        id="validation"
        title="Validation States"
        description="Use error and success props to communicate form validation feedback."
      >
        <ComponentPreview
          code={ `{/* Error */}
<NativeSelect error defaultValue="">
  <NativeSelectOption value="" disabled>Select a country</NativeSelectOption>
  <NativeSelectOption value="in">India</NativeSelectOption>
</NativeSelect>
<p className="text-xs text-red-500 mt-1">Please select your country</p>

{/* Success */}
<NativeSelect success defaultValue="in">
  <NativeSelectOption value="in">India</NativeSelectOption>
</NativeSelect>
<p className="text-xs text-emerald-600 mt-1">Looks good!</p>`}
        >
          <div className="flex flex-col gap-5 w-full max-w-xs">
            <div className="space-y-1">
              <NativeSelect error defaultValue="">
                <NativeSelectOption value="" disabled>Select a country</NativeSelectOption>
                <NativeSelectOption value="in">India</NativeSelectOption>
                <NativeSelectOption value="us">United States</NativeSelectOption>
              </NativeSelect>
              <p className="text-xs text-red-500 flex items-center gap-1">
                <span>●</span> Please select your country of residence
              </p>
            </div>

            <div className="space-y-1">
              <NativeSelect success defaultValue="in">
                <NativeSelectOption value="in">India</NativeSelectOption>
                <NativeSelectOption value="us">United States</NativeSelectOption>
              </NativeSelect>
              <p className="text-xs text-emerald-600 flex items-center gap-1">
                <span>✓</span> Looks good!
              </p>
            </div>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          7. DISABLED
      ══════════════════════════════════════ */}
      <Section
        id="disabled"
        title="Disabled"
        description="Set disabled to prevent interaction. Both the select and wrapper are visually dimmed."
      >
        <ComponentPreview
          code={ `<NativeSelect disabled defaultValue="next">
  <NativeSelectOption value="next">Next.js</NativeSelectOption>
</NativeSelect>

<NativeSelect disabled defaultValue="" placeholder="Unavailable">
</NativeSelect>`}
        >
          <div className="flex flex-col gap-3 w-full max-w-xs">
            <NativeSelect disabled defaultValue="next">
              <NativeSelectOption value="next">Next.js</NativeSelectOption>
              <NativeSelectOption value="remix">Remix</NativeSelectOption>
            </NativeSelect>
            <NativeSelect disabled placeholder="Not available" defaultValue="" />
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          8. CONTROLLED
      ══════════════════════════════════════ */}
      <Section
        id="controlled"
        title="Controlled"
        description="Bind value and onChange to manage selection state externally."
      >
        <ComponentPreview
          code={ `const [country, setCountry] = useState("");

<NativeSelect
  value={country}
  onChange={e => setCountry(e.target.value)}
  leftIcon={<Flag className="h-4 w-4" />}
  placeholder="Select country"
>
  <NativeSelectOption value="in">India</NativeSelectOption>
  <NativeSelectOption value="us">United States</NativeSelectOption>
</NativeSelect>

<p>Selected: {country || "none"}</p>`}
        >
          <div className="flex flex-col gap-3 w-full max-w-xs">
            <NativeSelect
              value={ country }
              onChange={ e => setCountry(e.target.value) }
              leftIcon={ <Flag className="h-4 w-4" /> }
              placeholder="Select country"
            >
              <NativeSelectOption value="in">🇮🇳 India</NativeSelectOption>
              <NativeSelectOption value="us">🇺🇸 United States</NativeSelectOption>
              <NativeSelectOption value="gb">🇬🇧 United Kingdom</NativeSelectOption>
              <NativeSelectOption value="de">🇩🇪 Germany</NativeSelectOption>
              <NativeSelectOption value="au">🇦🇺 Australia</NativeSelectOption>
            </NativeSelect>
            <p className="text-xs font-mono bg-muted/50 px-3 py-1.5 rounded-lg text-muted-foreground">
              country: <strong>"{ country || "" }"</strong>
            </p>
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          9. PROPS
      ══════════════════════════════════════ */}
      <Section id="props" title="API Reference">
        <PropsTable props={ [
          { name: "variant", type: '"default" | "outline" | "filled" | "ghost" | "underline"', default: '"default"', description: "Visual style of the select input." },
          { name: "size", type: '"xs" | "sm" | "md" | "lg" | "xl"', default: '"md"', description: "Height and font size." },
          { name: "error", type: "boolean", default: "false", description: "Red border and ring indicating validation failure." },
          { name: "success", type: "boolean", default: "false", description: "Green border and ring indicating valid input." },
          { name: "leftIcon", type: "React.ReactNode", default: "—", description: "Icon rendered inside the left side of the select." },
          { name: "rightIcon", type: "React.ReactNode", default: "—", description: "Override the default ChevronDown caret." },
          { name: "hideIcon", type: "boolean", default: "false", description: "Remove the caret icon entirely." },
          { name: "placeholder", type: "string", default: "—", description: "Renders a disabled hidden option as the default empty state." },
          { name: "wrapperClassName", type: "string", default: "—", description: "Classes applied to the outer wrapper div." },
        ] } />
      </Section>
    </DocsContent>
  );
}
