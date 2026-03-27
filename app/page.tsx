"use client";

import Link from "next/link";
import {
  ArrowRight, ChevronRight, Copy, Check, Zap, Layers, Palette,
  LayoutGrid, Sliders, Layers2, MessageSquare, MousePointerClick,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";

// ─── Accent palette ───────────────────────────────────────
const A = {
  violet: {
    border: "border-violet-200/60 dark:border-violet-800/40",
    dot: "bg-violet-500",
    badge: "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950 dark:text-violet-300 dark:border-violet-800",
    hover: "hover:border-violet-300/80 hover:bg-violet-50/40 dark:hover:border-violet-700/60 dark:hover:bg-violet-950/30",
  },
  blue: {
    border: "border-blue-200/60 dark:border-blue-800/40",
    dot: "bg-blue-500",
    badge: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
    hover: "hover:border-blue-300/80 hover:bg-blue-50/40 dark:hover:border-blue-700/60 dark:hover:bg-blue-950/30",
  },
  indigo: {
    border: "border-indigo-200/60 dark:border-indigo-800/40",
    dot: "bg-indigo-500",
    badge: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950 dark:text-indigo-300 dark:border-indigo-800",
    hover: "hover:border-indigo-300/80 hover:bg-indigo-50/40 dark:hover:border-indigo-700/60 dark:hover:bg-indigo-950/30",
  },
  pink: {
    border: "border-pink-200/60 dark:border-pink-800/40",
    dot: "bg-pink-500",
    badge: "bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-950 dark:text-pink-300 dark:border-pink-800",
    hover: "hover:border-pink-300/80 hover:bg-pink-50/40 dark:hover:border-pink-700/60 dark:hover:bg-pink-950/30",
  },
  rose: {
    border: "border-rose-200/60 dark:border-rose-800/40",
    dot: "bg-rose-500",
    badge: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800",
    hover: "hover:border-rose-300/80 hover:bg-rose-50/40 dark:hover:border-rose-700/60 dark:hover:bg-rose-950/30",
  },
  emerald: {
    border: "border-emerald-200/60 dark:border-emerald-800/40",
    dot: "bg-emerald-500",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",
    hover: "hover:border-emerald-300/80 hover:bg-emerald-50/40 dark:hover:border-emerald-700/60 dark:hover:bg-emerald-950/30",
  },
} as const;

type AccentKey = keyof typeof A;

// ─── ShowcaseCard ─────────────────────────────────────────
function ShowcaseCard({
  title, desc, accent = "violet", href, children, className,
}: {
  title: string; desc: string; accent?: AccentKey;
  href: string; children: React.ReactNode; className?: string;
}) {
  const a = A[ accent ];
  return (
    <div className={ `
      group relative rounded-2xl border
      ${a.border} ${a.hover}
      bg-white dark:bg-card
      shadow-sm hover:shadow-md
      transition-all duration-200
      overflow-hidden flex flex-col
      ${className ?? ""}
    `}>
      {/* Header */ }
      <div className="flex items-start justify-between px-4 pt-4 pb-2">
        <div className="flex items-center gap-2">
          <span className={ `w-1.5 h-1.5 rounded-full ${a.dot} shrink-0 mt-0.5` } />
          <div>
            <p className="text-sm font-semibold leading-none text-foreground">{ title }</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">{ desc }</p>
          </div>
        </div>
        <Link
          href={ href }
          className={ `
            flex items-center gap-1 text-[9px] font-semibold px-2 py-1 rounded-lg border
            ${a.badge}
            opacity-0 group-hover:opacity-100
            transition-all duration-200 shrink-0
          `}
        >
          Docs <ArrowRight className="h-2.5 w-2.5" />
        </Link>
      </div>
      {/* Preview */ }
      <div className="flex-1 flex items-center justify-center px-4 pb-4 pt-1 min-h-[120px]">
        { children }
      </div>
    </div>
  );
}

// ─── Bento Grid (All tab) ─────────────────────────────────
function BentoGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-[minmax(160px,auto)]">

      {/* Button — 2×2 */ }
      <ShowcaseCard title="Button" desc="5 variants · 4 sizes · icons" accent="violet"
        href="/docs/components/button" className="sm:col-span-2 row-span-2">
        <div className="space-y-3 w-full">
          <div className="flex flex-wrap gap-2">
            <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 border-0 shadow-sm">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
          <Separator />
          <div className="flex flex-wrap gap-2 items-center">
            <Button size="sm">Small</Button>
            <Button>Default</Button>
            <Button size="lg">Large</Button>
            <Button disabled>Disabled</Button>
          </div>
          <Separator />
          <div className="flex flex-wrap gap-2">
            <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 border-0 shadow-sm">
              <Zap className="mr-1.5 h-3.5 w-3.5" />With Icon
            </Button>
            <Button variant="outline">
              Loading
              <span className="ml-2 w-3 h-3 rounded-full border-2 border-current border-t-transparent animate-spin" />
            </Button>
          </div>
        </div>
      </ShowcaseCard>

      {/* Input */ }
      <ShowcaseCard title="Input" desc="Form text field" accent="blue" href="/docs/components/input">
        <div className="space-y-2 w-full">
          <Input placeholder="Enter email" type="email" />
          <Input placeholder="Password" type="password" />
        </div>
      </ShowcaseCard>

      {/* Switch */ }
      <ShowcaseCard title="Switch" desc="Toggle control" accent="blue" href="/docs/components/switch">
        <div className="space-y-3 w-full">
          { [ { l: "Airplane Mode", on: true }, { l: "Notifications", on: false }, { l: "Dark Mode", on: true } ].map(s => (
            <div key={ s.l } className="flex items-center justify-between">
              <Label className="text-sm">{ s.l }</Label>
              <Switch defaultChecked={ s.on } />
            </div>
          )) }
        </div>
      </ShowcaseCard>

      {/* Badge */ }
      <ShowcaseCard title="Badge" desc="Status labels" accent="pink" href="/docs/components/badge">
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Alert</Badge>
          <Badge className="bg-emerald-100 text-emerald-700 border-0 hover:bg-emerald-200 dark:bg-emerald-950 dark:text-emerald-300">Success</Badge>
          <Badge className="bg-amber-100 text-amber-700 border-0 hover:bg-amber-200 dark:bg-amber-950 dark:text-amber-300">Warning</Badge>
        </div>
      </ShowcaseCard>

      {/* Avatar */ }
      <ShowcaseCard title="Avatar" desc="User profile image" accent="pink" href="/docs/components/avatar">
        <div className="w-full space-y-3">
          <div className="flex items-center gap-3">
            <Avatar className="ring-2 ring-violet-200">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="bg-gradient-to-br from-violet-400 to-indigo-400 text-white">SC</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold">shadcn</p>
              <p className="text-xs text-muted-foreground">@shadcn</p>
            </div>
            <Badge variant="secondary" className="shrink-0 text-[10px]">Pro</Badge>
          </div>
          <div className="flex -space-x-2">
            { [ "SC", "JD", "AB", "KL" ].map((f, i) => (
              <Avatar key={ i } className="ring-2 ring-background w-8 h-8">
                <AvatarFallback className="text-xs bg-gradient-to-br from-violet-300 to-pink-300 text-white">{ f }</AvatarFallback>
              </Avatar>
            )) }
            <div className="w-8 h-8 rounded-full ring-2 ring-background bg-muted flex items-center justify-center text-xs text-muted-foreground">+8</div>
          </div>
        </div>
      </ShowcaseCard>

      {/* Select */ }
      <ShowcaseCard title="Select" desc="Dropdown menu" accent="indigo" href="/docs/components/select">
        <div className="space-y-2 w-full">
          <Select>
            <SelectTrigger><SelectValue placeholder="Select framework" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="next">Next.js</SelectItem>
              <SelectItem value="react">React</SelectItem>
              <SelectItem value="vue">Vue</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger><SelectValue placeholder="Select plan" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="free">Free</SelectItem>
              <SelectItem value="pro">Pro</SelectItem>
              <SelectItem value="ent">Enterprise</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </ShowcaseCard>

      {/* Checkbox */ }
      <ShowcaseCard title="Checkbox" desc="Boolean input" accent="indigo" href="/docs/components/checkbox">
        <div className="space-y-2.5 w-full">
          { [ "Accept terms", "Subscribe to newsletter", "Enable notifications" ].map(l => (
            <div key={ l } className="flex items-center gap-2">
              <Checkbox id={ `c-${l}` } defaultChecked={ l === "Accept terms" } />
              <Label htmlFor={ `c-${l}` } className="text-sm">{ l }</Label>
            </div>
          )) }
        </div>
      </ShowcaseCard>

      {/* Slider — 2 wide */ }
      <ShowcaseCard title="Slider" desc="Range input" accent="violet"
        href="/docs/components/slider" className="sm:col-span-2">
        <div className="space-y-4 w-full">
          { [ { l: "Volume", v: 75 }, { l: "Brightness", v: 40 }, { l: "Contrast", v: 60 } ].map(s => (
            <div key={ s.l } className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <Label>{ s.l }</Label>
                <span className="text-muted-foreground font-medium text-xs">{ s.v }%</span>
              </div>
              <Slider defaultValue={ [ s.v ] } max={ 100 } step={ 1 } />
            </div>
          )) }
        </div>
      </ShowcaseCard>

      {/* Progress */ }
      <ShowcaseCard title="Progress" desc="Completion indicator" accent="rose" href="/docs/components/progress">
        <div className="space-y-3 w-full">
          { [ { l: "Design", v: 95 }, { l: "Development", v: 68 }, { l: "Testing", v: 42 }, { l: "Deployment", v: 15 } ].map(p => (
            <div key={ p.l } className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium">{ p.l }</span>
                <span className="text-muted-foreground">{ p.v }%</span>
              </div>
              <Progress value={ p.v } className="h-1.5" />
            </div>
          )) }
        </div>
      </ShowcaseCard>

      {/* Radio Group */ }
      <ShowcaseCard title="Radio Group" desc="Single selection" accent="blue" href="/docs/components/radio-group">
        <RadioGroup defaultValue="p" className="space-y-2.5 w-full">
          { [ { v: "s", l: "Starter — Free" }, { v: "p", l: "Pro — $19/mo" }, { v: "e", l: "Enterprise — Custom" } ].map(o => (
            <div key={ o.v } className="flex items-center gap-2">
              <RadioGroupItem value={ o.v } id={ `r-${o.v}` } />
              <Label htmlFor={ `r-${o.v}` } className="text-sm">{ o.l }</Label>
            </div>
          )) }
        </RadioGroup>
      </ShowcaseCard>

      {/* Textarea — 2 wide */ }
      <ShowcaseCard title="Textarea" desc="Multi-line input" accent="blue"
        href="/docs/components/textarea" className="sm:col-span-2">
        <Textarea placeholder="Type your message here..." className="min-h-[90px] resize-none w-full" />
      </ShowcaseCard>

      {/* Alert — 2 wide */ }
      <ShowcaseCard title="Alert" desc="Notifications & messages" accent="rose"
        href="/docs/components/alert" className="sm:col-span-2">
        <div className="space-y-2 w-full">
          <Alert className="border-emerald-200 bg-emerald-50 dark:bg-emerald-950/30 dark:border-emerald-800 py-2.5">
            <Check className="h-4 w-4 text-emerald-600" />
            <AlertTitle className="text-emerald-800 dark:text-emerald-300 text-sm">Success</AlertTitle>
            <AlertDescription className="text-emerald-700 dark:text-emerald-400 text-xs">Changes saved successfully.</AlertDescription>
          </Alert>
          <Alert variant="destructive" className="bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800 py-2.5">
            <AlertTitle className="text-sm">Error</AlertTitle>
            <AlertDescription className="text-xs">There was a problem processing your request.</AlertDescription>
          </Alert>
          <Alert className="border-amber-200 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-800 py-2.5">
            <AlertTitle className="text-amber-800 dark:text-amber-300 text-sm">Warning</AlertTitle>
            <AlertDescription className="text-amber-700 dark:text-amber-400 text-xs">Your subscription expires in 3 days.</AlertDescription>
          </Alert>
        </div>
      </ShowcaseCard>

      {/* Skeleton */ }
      <ShowcaseCard title="Skeleton" desc="Loading placeholder" accent="indigo" href="/docs/components/skeleton">
        <div className="space-y-3 w-full">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full shrink-0" />
            <div className="space-y-1.5 flex-1">
              <Skeleton className="h-2.5 w-3/4" />
              <Skeleton className="h-2.5 w-1/2" />
            </div>
          </div>
          <Skeleton className="h-20 w-full rounded-xl" />
          <Skeleton className="h-2.5 w-full" />
          <Skeleton className="h-2.5 w-4/5" />
          <Skeleton className="h-2.5 w-2/3" />
        </div>
      </ShowcaseCard>

      {/* Separator */ }
      <ShowcaseCard title="Separator" desc="Visual divider" accent="pink" href="/docs/components/separator">
        <div className="w-full space-y-3">
          <p className="text-sm font-medium">Section A</p>
          <Separator />
          <div className="flex items-center gap-3 h-5">
            <span className="text-sm text-muted-foreground">Left</span>
            <Separator orientation="vertical" className="h-full" />
            <span className="text-sm text-muted-foreground">Center</span>
            <Separator orientation="vertical" className="h-full" />
            <span className="text-sm text-muted-foreground">Right</span>
          </div>
          <div className="relative py-1">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-card px-2 text-[10px] text-muted-foreground">OR</span>
          </div>
        </div>
      </ShowcaseCard>
      {/* Accordion — 2 wide */ }
      <ShowcaseCard title="Accordion" desc="Collapsible content" accent="pink"
        href="/docs/components/accordion" className="sm:col-span-2">
        <Accordion type="single" collapsible className="w-full">
          { [
            { q: "What is shadcn/ui?", a: "A collection of re-usable components built with Tailwind CSS." },
            { q: "Is it free?", a: "Yes, completely free and open source under the MIT license." },
            { q: "Can I customize it?", a: "Absolutely. Copy the code and modify it to fit your needs." },
          ].map((item, i) => (
            <AccordionItem key={ i } value={ `ac-${i}` } className={ i === 2 ? "border-b-0" : "" }>
              <AccordionTrigger className="text-sm hover:text-violet-600 transition-colors">{ item.q }</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{ item.a }</AccordionContent>
            </AccordionItem>
          )) }
        </Accordion>
      </ShowcaseCard>

      {/* Tooltip */ }
      <ShowcaseCard title="Tooltip" desc="Hover information" accent="indigo" href="/docs/components/tooltip">
        <div className="flex gap-2 flex-wrap">
          <TooltipProvider>
            { [
              { l: "Edit", t: "Edit this item" },
              { l: "Copy", t: "Copy to clipboard" },
              { l: "Delete", t: "Remove permanently" },
            ].map(t => (
              <Tooltip key={ t.l } delayDuration={ 0 } content={ <p className="text-xs">{ t.t }</p> }>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm">{ t.l }</Button>
                </TooltipTrigger>
              </Tooltip>
            )) }
          </TooltipProvider>
        </div>
      </ShowcaseCard>

      {/* Dialog */ }
      <ShowcaseCard title="Dialog" desc="Modal window" accent="violet" href="/docs/components/dialog">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 border-0">Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Example Dialog</DialogTitle>
              <DialogDescription>This is a modal dialog with content inside.</DialogDescription>
            </DialogHeader>
            <div className="flex gap-2 pt-2">
              <Button size="sm" className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 border-0">Confirm</Button>
              <Button size="sm" variant="outline" className="flex-1">Cancel</Button>
            </div>
          </DialogContent>
        </Dialog>
      </ShowcaseCard>

      {/* Popover */ }
      <ShowcaseCard title="Popover" desc="Floating panel" accent="violet" href="/docs/components/popover">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Open Popover</Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-4">
            <p className="text-sm font-semibold mb-1">Popover Title</p>
            <p className="text-xs text-muted-foreground">Context-aware floating content with smart positioning.</p>
            <Button size="sm" className="w-full mt-3 text-xs">Learn more</Button>
          </PopoverContent>
        </Popover>
      </ShowcaseCard>


      {/* Pagination — 3 wide */ }
      <ShowcaseCard title="Pagination" desc="Page navigation" accent="blue"
        href="/docs/components/pagination" className="sm:col-span-2 lg:col-span-3">
        <Pagination>
          <PaginationContent>
            <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
            { [ 1, 2, 3, 4, 5 ].map(p => (
              <PaginationItem key={ p }>
                <PaginationLink href="#" isActive={ p === 2 }>{ p }</PaginationLink>
              </PaginationItem>
            )) }
            <PaginationItem><PaginationNext href="#" /></PaginationItem>
          </PaginationContent>
        </Pagination>
      </ShowcaseCard>

      {/* Table — full width */ }
      <ShowcaseCard title="Table" desc="Structured data display" accent="rose"
        href="/docs/components/table" className="sm:col-span-2 lg:col-span-3 xl:col-span-4">
        <div className="w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                { [ "ID", "Name", "Email", "Status", "Action" ].map(h => (
                  <TableHead key={ h } className={ `font-semibold text-xs ${h === "Action" ? "text-right" : ""}` }>{ h }</TableHead>
                )) }
              </TableRow>
            </TableHeader>
            <TableBody>
              { [
                { id: "#001", name: "John Doe", email: "john@example.com", status: "Active", c: "emerald" },
                { id: "#002", name: "Jane Smith", email: "jane@example.com", status: "Active", c: "violet" },
                { id: "#003", name: "Alex Chen", email: "alex@example.com", status: "Pending", c: "amber" },
                { id: "#004", name: "Sara Lee", email: "sara@example.com", status: "Inactive", c: "rose" },
              ].map(row => (
                <TableRow key={ row.id } className="hover:bg-violet-50/30 dark:hover:bg-violet-950/20 transition-colors">
                  <TableCell className="font-mono text-xs text-muted-foreground">{ row.id }</TableCell>
                  <TableCell className="font-medium text-sm">{ row.name }</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{ row.email }</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={
                      row.c === "emerald" ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300" :
                        row.c === "violet" ? "bg-violet-100  text-violet-700  hover:bg-violet-100  dark:bg-violet-950  dark:text-violet-300" :
                          row.c === "amber" ? "bg-amber-100   text-amber-700   hover:bg-amber-100   dark:bg-amber-950   dark:text-amber-300" :
                            "bg-rose-100    text-rose-700    hover:bg-rose-100    dark:bg-rose-950    dark:text-rose-300"
                    }>
                      { row.status }
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="hover:text-violet-600 text-xs h-7">Edit</Button>
                  </TableCell>
                </TableRow>
              )) }
            </TableBody>
          </Table>
        </div>
      </ShowcaseCard>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────
export default function Home() {
  const [ copied, setCopied ] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("npx shadcn-ui@latest init");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <style>{ `
        @keyframes blob {
          0%   { transform: translate(0,0) scale(1); }
          33%  { transform: translate(40px,-60px) scale(1.15); }
          66%  { transform: translate(-30px,30px) scale(0.88); }
          100% { transform: translate(0,0) scale(1); }
        }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        .animate-blob  { animation: blob  8s infinite ease-in-out; }
        .delay-2000    { animation-delay: 2s; }
        .delay-4000    { animation-delay: 4s; }
        .delay-6000    { animation-delay: 6s; }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .gradient-text {
          background: linear-gradient(135deg,#6366f1,#8b5cf6,#d946ef);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
        }
      `}</style>

      <div className="min-h-screen bg-background overflow-x-hidden">

        {/* ══════════ HERO ══════════ */ }
        <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-violet-50/40 to-fuchsia-50/50 dark:from-background dark:via-violet-950/10 dark:to-fuchsia-950/10">
          {/* Blobs */ }
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="animate-blob delay-0    absolute -top-52 -left-52  w-[520px] h-[520px] rounded-full bg-violet-200/50 dark:bg-violet-900/20 blur-[90px]" />
            <div className="animate-blob delay-2000 absolute top-10  right-0    w-[420px] h-[420px] rounded-full bg-pink-200/50   dark:bg-pink-900/20  blur-[80px]" />
            <div className="animate-blob delay-4000 absolute bottom-0 left-1/3  w-[380px] h-[380px] rounded-full bg-blue-200/45  dark:bg-blue-900/15  blur-[80px]" />
            <div className="animate-blob delay-6000 absolute bottom-10 right-10 w-[300px] h-[300px] rounded-full bg-indigo-200/40 dark:bg-indigo-900/15 blur-[70px]" />
            <div className="absolute inset-0 opacity-[0.035]"
              style={ { backgroundImage: "radial-gradient(circle,#6366f1 1px,transparent 1px)", backgroundSize: "28px 28px" } }
            />
          </div>

          <div className="relative container mx-auto px-4 py-28 md:py-36">
            <div className="flex flex-col items-center text-center space-y-8">
              <div className="animate-float">
                <Badge variant="secondary" className="px-5 py-2 text-sm font-semibold bg-white/80 dark:bg-white/10 backdrop-blur-md border border-violet-100 dark:border-violet-800 shadow-md rounded-full">
                  ✨ Modern UI Components for Next.js
                </Badge>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl leading-[1.1]">
                The Foundation for your{ " " }
                <span className="gradient-text">Design System</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                Beautifully designed components you can customize, extend, and build on.{ " " }
                <span className="font-semibold text-foreground">Open Source. Open Code.</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button size="lg" className="px-8 h-12 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-lg shadow-violet-300/50 dark:shadow-violet-900/50 border-0 font-semibold" >
                  <Link href="/docs" className="flex items-center gap-2">View Components <ChevronRight className="h-4 w-4" /></Link>
                </Button>
                <Button size="lg" variant="outline" className="px-8 h-12 bg-white/70 dark:bg-white/5 backdrop-blur-sm border-gray-200 dark:border-white/10 hover:bg-white dark:hover:bg-white/10 shadow-sm font-semibold" >
                  <Link href="/docs/installation" className="flex items-center gap-2">Installation Guide <ArrowRight className="h-4 w-4" /></Link>
                </Button>
              </div>
              {/* Stats */ }
              <div className="flex flex-wrap gap-10 justify-center pt-4">
                { [
                  { value: "50+", label: "Components" },
                  { value: "200k+", label: "Weekly Downloads" },
                  { value: "65k+", label: "GitHub Stars" },
                ].map(s => (
                  <div key={ s.label } className="text-center">
                    <p className="text-2xl font-extrabold gradient-text">{ s.value }</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{ s.label }</p>
                  </div>
                )) }
              </div>
            </div>
          </div>
        </section>
        {/* ══════════ COMPONENT SHOWCASE ══════════ */ }
        <section className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-[10px] font-bold tracking-[0.15em] uppercase">Components</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">50+ Ready-to-Use Components</h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm">
              Browse by category. Each component is accessible, customizable, and production-ready.
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-center mb-10">
              <TabsList className="bg-muted/70 backdrop-blur-sm border border-border/50 rounded-2xl p-1.5 gap-1 flex-wrap h-auto">
                { [
                  { value: "all", label: "All", icon: <LayoutGrid className="h-3.5 w-3.5" /> },
                  { value: "forms", label: "Forms", icon: <Sliders className="h-3.5 w-3.5" /> },
                  { value: "display", label: "Display", icon: <Layers2 className="h-3.5 w-3.5" /> },
                  { value: "overlay", label: "Overlay", icon: <MousePointerClick className="h-3.5 w-3.5" /> },
                  { value: "feedback", label: "Feedback", icon: <MessageSquare className="h-3.5 w-3.5" /> },
                ].map(t => (
                  <TabsTrigger key={ t.value } value={ t.value }
                    className="flex items-center gap-1.5 rounded-xl text-xs font-medium px-4 py-2 data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-violet-700 dark:data-[state=active]:text-violet-400 transition-all">
                    { t.icon }{ t.label }
                  </TabsTrigger>
                )) }
              </TabsList>
            </div>

            {/* All */ }
            <TabsContent value="all"><BentoGrid /></TabsContent>

            {/* Forms */ }
            <TabsContent value="forms">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[minmax(160px,auto)]">
                <ShowcaseCard title="Input" desc="Text input field" accent="violet" href="/docs/components/input">
                  <div className="space-y-2 w-full">
                    <Input placeholder="Enter your email" type="email" />
                    <Input placeholder="Password" type="password" />
                  </div>
                </ShowcaseCard>
                <ShowcaseCard title="Textarea" desc="Multi-line input" accent="violet" href="/docs/components/textarea">
                  <Textarea placeholder="Type your message..." className="min-h-[80px] resize-none w-full" />
                </ShowcaseCard>
                <ShowcaseCard title="Select" desc="Dropdown selection" accent="violet" href="/docs/components/select">
                  <Select>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Select framework" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="next">Next.js</SelectItem>
                      <SelectItem value="react">React</SelectItem>
                      <SelectItem value="vue">Vue</SelectItem>
                    </SelectContent>
                  </Select>
                </ShowcaseCard>
                <ShowcaseCard title="Checkbox" desc="Boolean input" accent="violet" href="/docs/components/checkbox">
                  <div className="space-y-2 w-full">
                    { [ "Accept terms", "Subscribe newsletter", "Enable notifications" ].map(l => (
                      <div key={ l } className="flex items-center gap-2">
                        <Checkbox id={ l } defaultChecked={ l === "Accept terms" } />
                        <Label htmlFor={ l } className="text-sm">{ l }</Label>
                      </div>
                    )) }
                  </div>
                </ShowcaseCard>
                <ShowcaseCard title="Radio Group" desc="Single selection" accent="violet" href="/docs/components/radio-group">
                  <RadioGroup defaultValue="opt-1" className="space-y-2 w-full">
                    { [ "Starter", "Professional", "Enterprise" ].map((o, i) => (
                      <div key={ o } className="flex items-center gap-2">
                        <RadioGroupItem value={ `opt-${i + 1}` } id={ `rg-${i + 1}` } />
                        <Label htmlFor={ `rg-${i + 1}` } className="text-sm">{ o }</Label>
                      </div>
                    )) }
                  </RadioGroup>
                </ShowcaseCard>
                <ShowcaseCard title="Switch" desc="Toggle control" accent="violet" href="/docs/components/switch">
                  <div className="space-y-3 w-full">
                    { [ { l: "Airplane Mode", on: true }, { l: "Notifications", on: false }, { l: "Dark Mode", on: true } ].map(s => (
                      <div key={ s.l } className="flex items-center justify-between">
                        <Label className="text-sm">{ s.l }</Label>
                        <Switch defaultChecked={ s.on } />
                      </div>
                    )) }
                  </div>
                </ShowcaseCard>
                <ShowcaseCard title="Slider" desc="Range input" accent="violet" href="/docs/components/slider" className="sm:col-span-2">
                  <div className="space-y-4 w-full">
                    { [ { l: "Volume", v: 75 }, { l: "Brightness", v: 40 }, { l: "Contrast", v: 60 } ].map(s => (
                      <div key={ s.l } className="space-y-1.5">
                        <div className="flex justify-between text-sm"><Label>{ s.l }</Label><span className="text-muted-foreground text-xs">{ s.v }%</span></div>
                        <Slider defaultValue={ [ s.v ] } max={ 100 } step={ 1 } />
                      </div>
                    )) }
                  </div>
                </ShowcaseCard>
              </div>
            </TabsContent>

            {/* Display */ }
            <TabsContent value="display">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[minmax(160px,auto)]">
                <ShowcaseCard title="Badge" desc="Status indicator" accent="pink" href="/docs/components/badge">
                  <div className="flex flex-wrap gap-2">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                    <Badge className="bg-emerald-100 text-emerald-700 border-0">Success</Badge>
                    <Badge className="bg-amber-100 text-amber-700 border-0">Warning</Badge>
                  </div>
                </ShowcaseCard>
                <ShowcaseCard title="Avatar" desc="User profile image" accent="pink" href="/docs/components/avatar">
                  <div className="w-full space-y-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="ring-2 ring-violet-200">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback className="bg-gradient-to-br from-violet-400 to-indigo-400 text-white">SC</AvatarFallback>
                      </Avatar>
                      <div className="flex-1"><p className="text-sm font-semibold">shadcn</p><p className="text-xs text-muted-foreground">@shadcn</p></div>
                      <Badge variant="secondary" className="text-xs">Admin</Badge>
                    </div>
                    <div className="flex -space-x-2">
                      { [ "SC", "JD", "AB", "KL" ].map((f, i) => (
                        <Avatar key={ i } className="ring-2 ring-background w-8 h-8">
                          <AvatarFallback className="text-xs bg-gradient-to-br from-violet-300 to-pink-300 text-white">{ f }</AvatarFallback>
                        </Avatar>
                      )) }
                      <div className="w-8 h-8 rounded-full ring-2 ring-background bg-muted flex items-center justify-center text-xs text-muted-foreground">+8</div>
                    </div>
                  </div>
                </ShowcaseCard>
                <ShowcaseCard title="Accordion" desc="Collapsible content" accent="pink" href="/docs/components/accordion">
                  <Accordion type="single" collapsible className="w-full">
                    { [ { q: "What is it?", a: "Re-usable components built with Tailwind." }, { q: "Is it free?", a: "Yes, MIT license." }, { q: "Customizable?", a: "Fully. Copy and modify." } ].map((item, i) => (
                      <AccordionItem key={ i } value={ `a${i}` } className={ i === 2 ? "border-b-0" : "" }>
                        <AccordionTrigger className="text-sm">{ item.q }</AccordionTrigger>
                        <AccordionContent className="text-xs text-muted-foreground">{ item.a }</AccordionContent>
                      </AccordionItem>
                    )) }
                  </Accordion>
                </ShowcaseCard>
                <ShowcaseCard title="Skeleton" desc="Loading placeholder" accent="pink" href="/docs/components/skeleton">
                  <div className="space-y-3 w-full">
                    <div className="flex items-center gap-3"><Skeleton className="h-10 w-10 rounded-full shrink-0" /><div className="space-y-2 flex-1"><Skeleton className="h-2.5 w-3/4" /><Skeleton className="h-2.5 w-1/2" /></div></div>
                    <Skeleton className="h-20 w-full rounded-xl" />
                    <Skeleton className="h-2.5 w-full" /><Skeleton className="h-2.5 w-4/5" />
                  </div>
                </ShowcaseCard>
                <ShowcaseCard title="Separator" desc="Visual divider" accent="pink" href="/docs/components/separator">
                  <div className="w-full space-y-3">
                    <div className="text-sm font-medium">Horizontal</div><Separator />
                    <div className="flex items-center gap-3 h-5">
                      <span className="text-sm text-muted-foreground">L</span><Separator orientation="vertical" className="h-full" />
                      <span className="text-sm text-muted-foreground">M</span><Separator orientation="vertical" className="h-full" />
                      <span className="text-sm text-muted-foreground">R</span>
                    </div>
                    <div className="relative py-1"><Separator /><span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-card px-2 text-[10px] text-muted-foreground">OR</span></div>
                  </div>
                </ShowcaseCard>
                <ShowcaseCard title="Table" desc="Data display" accent="pink" href="/docs/components/table" className="sm:col-span-2 lg:col-span-3">
                  <div className="w-full overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/40 hover:bg-muted/40">
                          { [ "Name", "Email", "Status", "Action" ].map(h => (
                            <TableHead key={ h } className={ `font-semibold text-xs ${h === "Action" ? "text-right" : ""}` }>{ h }</TableHead>
                          )) }
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        { [ { name: "John Doe", email: "john@example.com", status: "Active", c: "emerald" }, { name: "Jane Smith", email: "jane@example.com", status: "Active", c: "violet" }, { name: "Alex Chen", email: "alex@example.com", status: "Pending", c: "amber" } ].map(row => (
                          <TableRow key={ row.name } className="hover:bg-violet-50/30">
                            <TableCell className="font-medium text-sm">{ row.name }</TableCell>
                            <TableCell className="text-muted-foreground text-sm">{ row.email }</TableCell>
                            <TableCell><Badge variant="secondary" className={ row.c === "emerald" ? "bg-emerald-100 text-emerald-700" : row.c === "violet" ? "bg-violet-100 text-violet-700" : "bg-amber-100 text-amber-700" }>{ row.status }</Badge></TableCell>
                            <TableCell className="text-right"><Button variant="ghost" size="sm" className="text-xs h-7">Edit</Button></TableCell>
                          </TableRow>
                        )) }
                      </TableBody>
                    </Table>
                  </div>
                </ShowcaseCard>
              </div>
            </TabsContent>

            {/* Overlay */ }
            <TabsContent value="overlay">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[minmax(160px,auto)]">
                <ShowcaseCard title="Dialog" desc="Modal window" accent="indigo" href="/docs/components/dialog">
                  <Dialog>
                    <DialogTrigger asChild><Button className="bg-gradient-to-r from-violet-600 to-indigo-600 border-0">Open Dialog</Button></DialogTrigger>
                    <DialogContent>
                      <DialogHeader><DialogTitle>Example Dialog</DialogTitle><DialogDescription>A modal dialog with content.</DialogDescription></DialogHeader>
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 border-0">Confirm</Button>
                        <Button size="sm" variant="outline" className="flex-1">Cancel</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </ShowcaseCard>
                <ShowcaseCard title="Popover" desc="Floating panel" accent="indigo" href="/docs/components/popover">
                  <Popover>
                    <PopoverTrigger asChild><Button variant="outline">Open Popover</Button></PopoverTrigger>
                    <PopoverContent className="w-52 p-4">
                      <p className="text-sm font-semibold mb-1">Popover</p>
                      <p className="text-xs text-muted-foreground">Context-aware floating content.</p>
                    </PopoverContent>
                  </Popover>
                </ShowcaseCard>
                <ShowcaseCard title="Tooltip" desc="Hover information" accent="indigo" href="/docs/components/tooltip">
                  <div className="flex gap-2 flex-wrap">
                    <TooltipProvider>
                      { [ { l: "Edit", t: "Edit item" }, { l: "Copy", t: "Copy" }, { l: "Delete", t: "Remove" } ].map(t => (
                        <Tooltip key={ t.l } content={ <p className="text-xs">{ t.t }</p> }>
                          <TooltipTrigger asChild><Button variant="outline" size="sm">{ t.l }</Button></TooltipTrigger>
                        </Tooltip>
                      )) }
                    </TooltipProvider>
                  </div>
                </ShowcaseCard>
                <ShowcaseCard title="Pagination" desc="Page navigation" accent="indigo" href="/docs/components/pagination" className="sm:col-span-2">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
                      { [ 1, 2, 3, 4, 5 ].map(p => (
                        <PaginationItem key={ p }><PaginationLink href="#" isActive={ p === 2 }>{ p }</PaginationLink></PaginationItem>
                      )) }
                      <PaginationItem><PaginationNext href="#" /></PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </ShowcaseCard>
              </div>
            </TabsContent>

            {/* Feedback */ }
            <TabsContent value="feedback">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[minmax(160px,auto)]">
                <ShowcaseCard title="Alert" desc="Notifications" accent="rose" href="/docs/components/alert" className="sm:col-span-2">
                  <div className="space-y-2.5 w-full">
                    <Alert className="border-emerald-200 bg-emerald-50 dark:bg-emerald-950/30 py-2.5">
                      <Check className="h-4 w-4 text-emerald-600" />
                      <AlertTitle className="text-emerald-800 dark:text-emerald-300 text-sm">Success</AlertTitle>
                      <AlertDescription className="text-emerald-700 dark:text-emerald-400 text-xs">Changes saved.</AlertDescription>
                    </Alert>
                    <Alert variant="destructive" className="bg-red-50 dark:bg-red-950/30 border-red-200 py-2.5">
                      <AlertTitle className="text-sm">Error</AlertTitle>
                      <AlertDescription className="text-xs">Request failed.</AlertDescription>
                    </Alert>
                    <Alert className="border-amber-200 bg-amber-50 dark:bg-amber-950/30 py-2.5">
                      <AlertTitle className="text-amber-800 dark:text-amber-300 text-sm">Warning</AlertTitle>
                      <AlertDescription className="text-amber-700 dark:text-amber-400 text-xs">Subscription expires in 3 days.</AlertDescription>
                    </Alert>
                  </div>
                </ShowcaseCard>
                <ShowcaseCard title="Progress" desc="Completion indicator" accent="rose" href="/docs/components/progress">
                  <div className="space-y-3 w-full">
                    { [ { l: "Design", v: 95 }, { l: "Development", v: 68 }, { l: "Testing", v: 42 }, { l: "Deployment", v: 15 } ].map(p => (
                      <div key={ p.l } className="space-y-1">
                        <div className="flex justify-between text-xs"><span className="font-medium">{ p.l }</span><span className="text-muted-foreground">{ p.v }%</span></div>
                        <Progress value={ p.v } className="h-1.5" />
                      </div>
                    )) }
                  </div>
                </ShowcaseCard>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* ══════════ FEATURES ══════════ */ }
        <section className="container mx-auto px-4 py-20">
          <div className="text-center mb-14">
            <Badge variant="outline" className="mb-4 text-[10px] font-bold tracking-[0.15em] uppercase">Why choose us</Badge>
            <h2 className="text-3xl md:text-4xl font-bold">Everything you need</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            { [
              { icon: <Zap className="h-6 w-6 text-violet-600" />, iconBg: "bg-violet-100 dark:bg-violet-950", bg: "from-violet-50/80 to-indigo-50/60 dark:from-violet-950/30 dark:to-indigo-950/20", title: "Fast by Default", desc: "Built with Next.js App Router and Tailwind CSS for maximum performance." },
              { icon: <Palette className="h-6 w-6 text-pink-600" />, iconBg: "bg-pink-100 dark:bg-pink-950", bg: "from-pink-50/80 to-rose-50/60 dark:from-pink-950/30 dark:to-rose-950/20", title: "Fully Customizable", desc: "Every component uses Tailwind CSS — tweak tokens to match your brand." },
              { icon: <Check className="h-6 w-6 text-emerald-600" />, iconBg: "bg-emerald-100 dark:bg-emerald-950", bg: "from-emerald-50/80 to-teal-50/60 dark:from-emerald-950/30 dark:to-teal-950/20", title: "Accessible", desc: "WAI-ARIA compliant so your app works beautifully for every user." },
            ].map(f => (
              <Card key={ f.title } className={ `border-0 shadow-md bg-gradient-to-br ${f.bg} text-center hover:shadow-lg transition-shadow duration-200` }>
                <CardContent className="py-10 space-y-4">
                  <div className={ `inline-flex h-14 w-14 items-center justify-center rounded-2xl ${f.iconBg} shadow-sm` }>{ f.icon }</div>
                  <h3 className="text-xl font-bold">{ f.title }</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{ f.desc }</p>
                </CardContent>
              </Card>
            )) }
          </div>
        </section>

        {/* ══════════ CTA ══════════ */ }
        <section className="container mx-auto px-4 pb-24">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 px-8 py-20 md:px-20 text-center text-white">
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-white/10 blur-3xl pointer-events-none" />
            <div className="relative space-y-6">
              <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">Get Started Today</Badge>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                Ready to build something<br className="hidden md:block" /> beautiful?
              </h2>
              <p className="text-lg text-white/80 max-w-xl mx-auto">
                Start building stunning applications with our fully accessible component collection.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                <Button size="lg" className="px-8 h-12 bg-white text-violet-700 hover:bg-white/90 font-bold shadow-xl" >
                  <Link href="/docs" className="flex items-center gap-2">Browse Components <ArrowRight className="h-4 w-4" /></Link>
                </Button>
                <Button size="lg" variant="outline" className="px-8 h-12 bg-transparent border-white/40 text-white hover:bg-white/10 font-semibold" >
                  <Link href="/docs/installation" className="flex items-center gap-2">Installation Guide <ChevronRight className="h-4 w-4" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ FOOTER ══════════ */ }
        <footer className="border-t py-10">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-gradient-to-br from-violet-600 to-indigo-600 shadow-sm" />
              <p className="text-sm text-muted-foreground">Built with Next.js, Tailwind CSS</p>
            </div>
            <div className="flex gap-6">
              { [ { label: "Documentation", href: "/docs" }, { label: "GitHub", href: "https://github.com" }, { label: "Twitter", href: "#" } ].map(l => (
                <Link key={ l.label } href={ l.href } className="text-sm text-muted-foreground hover:text-foreground transition-colors">{ l.label }</Link>
              )) }
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
