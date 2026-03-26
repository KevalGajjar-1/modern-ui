"use client";

import React, { useState } from "react";
import { DocsContent, Section, ComponentPreview, PropsTable } from "@/components/docs";
import { DataTable, ColumnDef } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal, Pencil, Trash2, Eye,
  UserCircle, Download, Plus, RefreshCw,
  ArrowUpRight, TrendingUp, TrendingDown,
} from "lucide-react";

// ─── Fake data generators ─────────────────────────────────
const STATUSES = [ "active", "inactive", "pending", "suspended" ] as const;
const ROLES = [ "Admin", "Editor", "Viewer", "Owner" ] as const;
const COUNTRIES = [ "India", "United States", "Germany", "United Kingdom", "Japan", "Australia" ] as const;

type UserRow = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  country: string;
  joined: string;
  revenue: number;
};

const USERS: UserRow[] = Array.from({ length: 47 }, (_, i) => ({
  id: i + 1,
  name: [ "Alex Johnson", "Maria García", "James Smith", "Priya Patel", "Chen Wei",
    "Sophie Martin", "Lucas Oliveira", "Amara Diallo", "Kenji Tanaka", "Elena Rossi" ][ i % 10 ],
  email: `user${i + 1}@example.com`,
  role: ROLES[ i % ROLES.length ],
  status: STATUSES[ i % STATUSES.length ],
  country: COUNTRIES[ i % COUNTRIES.length ],
  joined: `${2021 + (i % 4)}-${String((i % 12) + 1).padStart(2, "0")}-${String((i % 28) + 1).padStart(2, "0")}`,
  revenue: Math.round((Math.random() * 9000 + 1000) * 100) / 100,
}));

// ─── Status badge ─────────────────────────────────────────
const STATUS_VARIANT = {
  active: "text-emerald-700 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950/50",
  inactive: "text-zinc-600   bg-zinc-100   dark:text-zinc-400   dark:bg-zinc-800/60",
  pending: "text-amber-700  bg-amber-100  dark:text-amber-400  dark:bg-amber-950/50",
  suspended: "text-red-700    bg-red-100    dark:text-red-400    dark:bg-red-950/50",
} as const;

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={ `inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_VARIANT[ status as keyof typeof STATUS_VARIANT ] ?? ""}` }>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      { status }
    </span>
  );
}

export default function DataTablePage() {
  const [ selected, setSelected ] = useState<UserRow[]>([]);

  // ── Basic columns ──
  const basicColumns: ColumnDef<UserRow>[] = [
    {
      id: "name",
      header: "Name",
      accessorKey: "name",
      sortable: true,
      filterable: true,
      cell: ({ getValue }) => (
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-400 to-indigo-400 flex items-center justify-center shrink-0">
            <span className="text-white text-[10px] font-bold">
              { String(getValue()).slice(0, 2).toUpperCase() }
            </span>
          </div>
          <span className="font-medium">{ String(getValue()) }</span>
        </div>
      ),
    },
    {
      id: "email",
      header: "Email",
      accessorKey: "email",
      filterable: true,
      cell: ({ getValue }) => (
        <span className="text-muted-foreground font-mono text-xs">{ String(getValue()) }</span>
      ),
    },
    {
      id: "role",
      header: "Role",
      accessorKey: "role",
      sortable: true,
      filterable: true,
      cell: ({ getValue }) => (
        <Badge variant="outline" className="font-normal text-xs">{ String(getValue()) }</Badge>
      ),
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      sortable: true,
      filterable: true,
      cell: ({ getValue }) => <StatusBadge status={ String(getValue()) } />,
    },
    {
      id: "joined",
      header: "Joined",
      accessorKey: "joined",
      sortable: true,
      cell: ({ getValue }) => (
        <span className="text-muted-foreground text-xs">{ String(getValue()) }</span>
      ),
    },
    {
      id: "actions",
      header: "",
      hideable: false,
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-1">
          <button className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors">
            <Eye className="h-3.5 w-3.5" />
          </button>
          <button className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors">
            <Pencil className="h-3.5 w-3.5" />
          </button>
          <button className="p-1.5 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors">
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      ),
      align: "right",
      width: 100,
    },
  ];

  // ── Full columns (with revenue + country) ──
  const fullColumns: ColumnDef<UserRow>[] = [
    basicColumns[ 0 ], // name
    basicColumns[ 1 ], // email
    basicColumns[ 2 ], // role
    basicColumns[ 3 ], // status
    {
      id: "country",
      header: "Country",
      accessorKey: "country",
      sortable: true,
      filterable: true,
      cell: ({ getValue }) => (
        <span className="text-muted-foreground text-sm">{ String(getValue()) }</span>
      ),
    },
    {
      id: "revenue",
      header: "Revenue",
      accessorKey: "revenue",
      sortable: true,
      align: "right",
      cell: ({ getValue, rowIndex }) => {
        const val = getValue() as number;
        const prev = USERS[ (rowIndex + 1) % USERS.length ].revenue;
        const up = val >= prev;
        return (
          <div className="flex items-center justify-end gap-1.5">
            <span className={ up ? "text-emerald-600 dark:text-emerald-400" : "text-red-500" }>
              { up ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" /> }
            </span>
            <span className="font-medium font-mono">${ val.toLocaleString() }</span>
          </div>
        );
      },
    },
    basicColumns[ 4 ], // joined
    basicColumns[ 5 ], // actions
  ];

  return (
    <DocsContent
      title="Data Table"
      description="A fully-featured client-side data table with sorting, global search, pagination, column visibility toggles, row selection, and a flexible column definition API — zero external dependencies."
      importPath='import { DataTable, ColumnDef } from "@/components/ui/data-table";'
    >

      {/* ══════════════════════════════════════
          1. BASIC
      ══════════════════════════════════════ */}
      <Section
        id="basic"
        title="Basic"
        description="A searchable, sortable, paginated table. Click column headers to sort, type in the search box to filter globally."
      >
        <ComponentPreview
          code={ `type User = { id: number; name: string; email: string; role: string; status: string; };

const columns: ColumnDef<User>[] = [
  {
    id: "name",
    header: "Name",
    accessorKey: "name",
    sortable: true,
    filterable: true,
    cell: ({ getValue }) => <span className="font-medium">{String(getValue())}</span>,
  },
  {
    id: "email",
    header: "Email",
    accessorKey: "email",
    filterable: true,
    cell: ({ getValue }) => <span className="text-muted-foreground">{String(getValue())}</span>,
  },
  {
    id: "role",
    header: "Role",
    accessorKey: "role",
    sortable: true,
    cell: ({ getValue }) => <Badge variant="outline">{String(getValue())}</Badge>,
  },
  {
    id: "status",
    header: "Status",
    accessorKey: "status",
    sortable: true,
    cell: ({ getValue }) => <StatusBadge status={String(getValue())} />,
  },
];

<DataTable data={users} columns={columns} defaultPageSize={5} />`}
        >
          <DataTable
            data={ USERS }
            columns={ basicColumns }
            defaultPageSize={ 5 }
            pageSizeOptions={ [ 5, 10, 20 ] }
          />
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          2. ROW SELECTION
      ══════════════════════════════════════ */}
      <Section
        id="row-selection"
        title="Row Selection"
        description="Enable checkboxes with enableRowSelection. A header checkbox selects/deselects all rows on the current page."
      >
        <ComponentPreview
          code={ `const [selected, setSelected] = useState<User[]>([]);

<DataTable
  data={users}
  columns={columns}
  enableRowSelection
  onRowSelectionChange={setSelected}
  defaultPageSize={5}
  toolbar={
    selected.length > 0 && (
      <Button variant="destructive" size="sm">
        Delete {selected.length} selected
      </Button>
    )
  }
/>`}
        >
          <div className="space-y-3">
            <DataTable
              data={ USERS }
              columns={ basicColumns }
              enableRowSelection
              onRowSelectionChange={ setSelected }
              defaultPageSize={ 5 }
              pageSizeOptions={ [ 5, 10 ] }
              toolbar={
                selected.length > 0 ? (
                  <Button variant="destructive" size="sm" className="gap-1.5">
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete { selected.length }
                  </Button>
                ) : undefined
              }
            />
            { selected.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                { selected.slice(0, 5).map(u => (
                  <Badge key={ u.id } variant="secondary" className="text-[10px] font-mono">
                    { u.name }
                  </Badge>
                )) }
                { selected.length > 5 && (
                  <Badge variant="outline" className="text-[10px]">
                    +{ selected.length - 5 } more
                  </Badge>
                ) }
              </div>
            ) }
          </div>
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          3. FULL FEATURED
      ══════════════════════════════════════ */}
      <Section
        id="full-featured"
        title="Full Featured"
        description="All features combined: revenue column with trend icons, column visibility, selection, custom toolbar, and dense rows."
      >
        <ComponentPreview
          code={ `<DataTable
  data={users}
  columns={fullColumns}
  enableRowSelection
  enableColumnVisibility
  defaultPageSize={10}
  dense
  toolbar={
    <div className="flex gap-2">
      <Button variant="outline" size="sm"><Download /> Export</Button>
      <Button size="sm"><Plus /> Add user</Button>
    </div>
  }
/>`}
        >
          <DataTable
            data={ USERS }
            columns={ fullColumns }
            enableRowSelection
            enableColumnVisibility
            defaultPageSize={ 10 }
            pageSizeOptions={ [ 10, 20, 50 ] }
            dense
            toolbar={
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-1.5 text-xs h-8">
                  <Download className="h-3.5 w-3.5" /> Export
                </Button>
                <Button size="sm" className="gap-1.5 text-xs h-8">
                  <Plus className="h-3.5 w-3.5" /> Add user
                </Button>
              </div>
            }
          />
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          4. STRIPED & STICKY HEADER
      ══════════════════════════════════════ */}
      <Section
        id="striped-sticky"
        title="Striped & Sticky Header"
        description="Use striped for alternating row colors and stickyHeader to fix the header while the body scrolls."
      >
        <ComponentPreview
          code={ `<DataTable
  data={users}
  columns={columns}
  striped
  stickyHeader
  maxHeight="300px"
  enablePagination={false}
  enableSearch={false}
  enableColumnVisibility={false}
/>`}
        >
          <DataTable
            data={ USERS.slice(0, 15) }
            columns={ basicColumns.slice(0, 5) }
            striped
            stickyHeader
            maxHeight="280px"
            enablePagination={ false }
            enableSearch={ false }
            enableColumnVisibility={ false }
          />
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          5. CUSTOM EMPTY STATE
      ══════════════════════════════════════ */}
      <Section
        id="empty-state"
        title="Custom Empty State"
        description="Pass emptyState to render a custom no-results illustration."
      >
        <ComponentPreview
          code={ `<DataTable
  data={[]}
  columns={columns}
  enableSearch={false}
  emptyState={
    <div className="flex flex-col items-center gap-3 py-8">
      <UserCircle className="h-12 w-12 text-muted-foreground/20" />
      <p>No users yet.</p>
      <Button size="sm"><Plus /> Invite user</Button>
    </div>
  }
/>`}
        >
          <DataTable
            data={ [] }
            columns={ basicColumns }
            enableSearch={ false }
            enablePagination={ false }
            enableColumnVisibility={ false }
            emptyState={
              <div className="flex flex-col items-center gap-3 py-10">
                <UserCircle className="h-12 w-12 text-muted-foreground/20" />
                <p className="text-sm text-muted-foreground">No users found.</p>
                <Button size="sm" className="gap-1.5">
                  <Plus className="h-4 w-4" /> Invite your first user
                </Button>
              </div>
            }
          />
        </ComponentPreview>
      </Section>

      {/* ══════════════════════════════════════
          6. PROPS
      ══════════════════════════════════════ */}
      <Section id="props" title="API Reference">
        <p className="text-sm font-semibold mb-3">DataTable</p>
        <PropsTable props={ [
          { name: "data", type: "TData[]", default: "required", description: "Array of row data." },
          { name: "columns", type: "ColumnDef<TData>[]", default: "required", description: "Column definitions." },
          { name: "enableSearch", type: "boolean", default: "true", description: "Show global search input." },
          { name: "enableColumnVisibility", type: "boolean", default: "true", description: "Show column toggle dropdown." },
          { name: "enableRowSelection", type: "boolean", default: "false", description: "Enable checkbox row selection." },
          { name: "enablePagination", type: "boolean", default: "true", description: "Enable client-side pagination." },
          { name: "defaultPageSize", type: "number", default: "10", description: "Initial rows per page." },
          { name: "pageSizeOptions", type: "number[]", default: "[10,20,50,100]", description: "Dropdown options for rows per page." },
          { name: "striped", type: "boolean", default: "false", description: "Alternate row background colors." },
          { name: "dense", type: "boolean", default: "false", description: "Reduce row padding and font size." },
          { name: "stickyHeader", type: "boolean", default: "false", description: "Fix the header row during vertical scroll." },
          { name: "maxHeight", type: "string", default: '"500px"', description: "Table height when stickyHeader is true." },
          { name: "onRowSelectionChange", type: "(rows: TData[]) => void", default: "—", description: "Called when selection changes." },
          { name: "toolbar", type: "React.ReactNode", default: "—", description: "Slot rendered to the right of the search bar." },
          { name: "emptyState", type: "React.ReactNode", default: "—", description: "Custom content when no rows match." },
        ] } />

        <p className="text-sm font-semibold mb-3 mt-8">ColumnDef</p>
        <PropsTable props={ [
          { name: "id", type: "string", default: "required", description: "Unique column identifier." },
          { name: "header", type: "React.ReactNode | (ctx) => React.ReactNode", default: "required", description: "Column header content." },
          { name: "cell", type: "(ctx: CellContext<TData>) => React.ReactNode", default: "required", description: "Cell renderer function." },
          { name: "accessorKey", type: "keyof TData", default: "—", description: "Key for sorting and filtering." },
          { name: "sortable", type: "boolean", default: "false", description: "Enable click-to-sort on this column." },
          { name: "filterable", type: "boolean", default: "false", description: "Include in global search filter." },
          { name: "width", type: "number | string", default: "—", description: "Fixed column width." },
          { name: "minWidth", type: "number", default: "—", description: "Minimum column width." },
          { name: "align", type: '"left" | "center" | "right"', default: '"left"', description: "Cell content alignment." },
          { name: "hideable", type: "boolean", default: "true", description: "Allow hiding via column visibility toggle." },
        ] } />
      </Section>
    </DocsContent>
  );
}
