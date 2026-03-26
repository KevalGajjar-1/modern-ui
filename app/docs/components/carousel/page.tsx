"use client";

import React, { useState } from "react";
import { DocsContent, Section, ComponentPreview, PropsTable } from "@/components/docs";
import {
  Carousel, CarouselItem,
  CarouselPrevButton, CarouselNextButton,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SLIDES = [
  { bg: "from-violet-500 to-indigo-600", label: "Slide 1", sub: "Design systems" },
  { bg: "from-rose-500   to-pink-600", label: "Slide 2", sub: "Components" },
  { bg: "from-amber-500  to-orange-600", label: "Slide 3", sub: "Animations" },
  { bg: "from-emerald-500 to-teal-600", label: "Slide 4", sub: "Accessibility" },
  { bg: "from-sky-500    to-blue-600", label: "Slide 5", sub: "Dark mode" },
];

function Slide({ bg, label, sub }: typeof SLIDES[ number ]) {
  return (
    <div className={ cn(
      "w-full h-48 flex flex-col items-center justify-center gap-2 rounded-2xl",
      "bg-gradient-to-br text-white select-none", bg
    ) }>
      <span className="text-2xl font-bold tracking-tight">{ label }</span>
      <span className="text-sm text-white/80">{ sub }</span>
    </div>
  );
}

export default function CarouselPage() {
  const [ api, setApi ] = useState<CarouselApi | undefined>();
  const [ current, setCurrent ] = useState(0);

  // Keep current in sync with the API carousel
  React.useEffect(() => {
    if (!api) return;
    const id = setInterval(() => setCurrent(api.selectedIndex), 100);
    return () => clearInterval(id);
  }, [ api ]);

  return (
    <DocsContent
      title="Carousel"
      description="A zero-dependency carousel with smooth CSS scroll-snap, drag-to-navigate, keyboard arrows, auto-play, dot indicators, loop mode, and a composable API. Supports horizontal and vertical orientations, partial slides, and fully custom controls."
      importPath='import { Carousel, CarouselItem } from "@/components/ui/carousel";'
    >

      {/* 1. BASIC */ }
      <Section id="basic" title="Basic"
        description="Full-width slides. Hover to reveal arrows. Drag or use ← → keys to navigate.">
        <ComponentPreview code={ `<Carousel>
  {slides.map((s, i) => (
    <CarouselItem key={i}>
      <Slide {...s} />
    </CarouselItem>
  ))}
</Carousel>`}>
          {/* ✅ overflow-hidden on a wrapper div — NOT on Carousel */ }
          <div className="rounded-2xl overflow-hidden">
            <Carousel>
              { SLIDES.map((s, i) => (
                <CarouselItem key={ i }><Slide { ...s } /></CarouselItem>
              )) }
            </Carousel>
          </div>
        </ComponentPreview>
      </Section>

      {/* 2. PARTIAL SLIDES */ }
      <Section id="partial" title="Partial Slides"
        description="Set basis on CarouselItem to show multiple slides at once.">
        <ComponentPreview code={ `<Carousel showDots={false}>
  {slides.map((s, i) => (
    <CarouselItem key={i} basis="50%" className="px-1.5">
      <Slide {...s} />
    </CarouselItem>
  ))}
</Carousel>`}>
          <Carousel showDots={ false }>
            { SLIDES.map((s, i) => (
              <CarouselItem key={ i } basis="50%" className="px-1.5">
                <div className={ cn(
                  "h-36 rounded-xl flex flex-col items-center justify-center gap-1 text-white select-none",
                  "bg-gradient-to-br", s.bg
                ) }>
                  <span className="font-bold">{ s.label }</span>
                  <span className="text-xs text-white/80">{ s.sub }</span>
                </div>
              </CarouselItem>
            )) }
          </Carousel>
        </ComponentPreview>
      </Section>

      {/* 3. AUTO-PLAY & LOOP */ }
      <Section id="autoplay" title="Auto-Play & Loop"
        description="autoPlay={3000} advances every 3s. loop wraps from last back to first.">
        <ComponentPreview code={ `<Carousel autoPlay={3000} loop>
  {slides.map((s, i) => (
    <CarouselItem key={i}><Slide {...s} /></CarouselItem>
  ))}
</Carousel>`}>
          <div className="rounded-2xl overflow-hidden">
            <Carousel autoPlay={ 3000 } loop>
              { SLIDES.map((s, i) => (
                <CarouselItem key={ i }><Slide { ...s } /></CarouselItem>
              )) }
            </Carousel>
          </div>
        </ComponentPreview>
      </Section>

      {/* 4. VERTICAL */ }
      <Section id="vertical" title="Vertical"
        description="Set orientation='vertical'. Use ↑ ↓ keys or arrow buttons to navigate.">
        <ComponentPreview code={ `<Carousel orientation="vertical" className="h-48">
  {slides.map((s, i) => (
    <CarouselItem key={i}><Slide {...s} /></CarouselItem>
  ))}
</Carousel>`}>
          <div className="max-w-xs rounded-2xl overflow-hidden h-48">
            <Carousel orientation="vertical" className="h-48">
              { SLIDES.map((s, i) => (
                <CarouselItem key={ i }><Slide { ...s } /></CarouselItem>
              )) }
            </Carousel>
          </div>
        </ComponentPreview>
      </Section>

      {/* 5. IMPERATIVE API */ }
      <Section id="api" title="Imperative API"
        description="Pass setApi to get a handle. Call scrollTo, scrollPrev, scrollNext from outside.">
        <ComponentPreview code={ `const [api, setApi] = useState<CarouselApi>();

<Carousel setApi={setApi} showArrows={false} showDots={false}>
  {slides.map((s, i) => (
    <CarouselItem key={i}><Slide {...s} /></CarouselItem>
  ))}
</Carousel>

<Button onClick={() => api?.scrollPrev()}>Prev</Button>
<Button onClick={() => api?.scrollNext()}>Next</Button>`}>
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl overflow-hidden">
              <Carousel setApi={ setApi } showArrows={ false } showDots={ false }>
                { SLIDES.map((s, i) => (
                  <CarouselItem key={ i }><Slide { ...s } /></CarouselItem>
                )) }
              </Carousel>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <Button size="sm" variant="outline" onClick={ () => api?.scrollPrev() }>← Prev</Button>
              <Button size="sm" variant="outline" onClick={ () => api?.scrollNext() }>Next →</Button>
              <div className="flex gap-1.5">
                { SLIDES.map((_, i) => (
                  <Button
                    key={ i } size="sm"
                    variant={ current === i ? "default" : "outline" }
                    className="w-8 h-8 p-0 text-xs"
                    onClick={ () => api?.scrollTo(i) }
                  >
                    { i + 1 }
                  </Button>
                )) }
              </div>
              <Badge variant="secondary" className="text-xs font-mono ml-auto">
                { current + 1 } / { SLIDES.length }
              </Badge>
            </div>
          </div>
        </ComponentPreview>
      </Section>

      {/* 6. CARD CAROUSEL */ }
      <Section id="cards" title="Card Carousel"
        description="Real-world product cards with partial slide peek to hint at swiping.">
        <ComponentPreview code={ `<Carousel showDots={false} loop>
  {products.map((p, i) => (
    <CarouselItem key={i} basis="75%" className="pl-3">
      <ProductCard {...p} />
    </CarouselItem>
  ))}
</Carousel>`}>
          <Carousel showDots={ false } loop>
            { [
              { name: "Pro Plan", price: "$49/mo", desc: "For growing teams", badge: "Popular" },
              { name: "Starter Plan", price: "$19/mo", desc: "Perfect for solo devs", badge: "Free trial" },
              { name: "Enterprise", price: "Custom", desc: "Unlimited everything", badge: "Contact us" },
              { name: "Student Pack", price: "$0/mo", desc: "Free for verified students", badge: "Free" },
            ].map((p, i) => (
              <CarouselItem key={ i } basis="75%" className="pl-3">
                <div className="rounded-2xl border border-border/60 bg-card p-5 h-36 flex flex-col justify-between shadow-sm">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm">{ p.name }</span>
                      <Badge variant="secondary" className="text-[10px]">{ p.badge }</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{ p.desc }</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold">{ p.price }</span>
                    <Button size="sm">Select</Button>
                  </div>
                </div>
              </CarouselItem>
            )) }
          </Carousel>
        </ComponentPreview>
      </Section>

      {/* 7. PROPS */ }
      <Section id="props" title="API Reference">
        <p className="text-sm font-semibold mb-3">Carousel</p>
        <PropsTable props={ [
          { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Scroll axis." },
          { name: "autoPlay", type: "number", default: "0", description: "Auto-advance interval in ms. 0 = disabled." },
          { name: "loop", type: "boolean", default: "false", description: "Wrap from last slide back to first." },
          { name: "showDots", type: "boolean", default: "true", description: "Show dot indicator strip." },
          { name: "showArrows", type: "boolean", default: "true", description: "Show prev/next arrow buttons." },
          { name: "dragEnabled", type: "boolean", default: "true", description: "Enable pointer drag to swipe." },
          { name: "setApi", type: "(api: CarouselApi) => void", default: "—", description: "Receive an imperative API handle." },
        ] } />

        <p className="text-sm font-semibold mb-3 mt-8">CarouselItem</p>
        <PropsTable props={ [
          { name: "basis", type: "string", default: '"100%"', description: "CSS flex-basis. 50% = 2-up, 33.33% = 3-up." },
        ] } />
      </Section>

    </DocsContent>
  );
}
