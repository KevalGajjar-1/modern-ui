"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  ChevronUp, ChevronDown, ChevronsUpDown,
  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight,
  Search, X, Settings2, Eye, EyeOff, Download,
} from "lucide-react";

// ─── Core Types ───────────────────────────────────────────
export type SortDirection = "asc" | "desc" | false;
export type ColumnPinning = "left" | "right" | false;

export interface ColumnDef<TData = unknown> {
  /** Unique column id */
  id: string;
  /** Header label */
  header: React.ReactNode | ((ctx: HeaderContext<TData>) => React.ReactNode);
  /** Cell renderer */
  cell: (ctx: CellContext<TData>) => React.ReactNode;
  /** Key used for built-in sorting */
  accessorKey?: keyof TData;
  /** Enable sorting on this column */
  sortable?: boolean;
  /** Enable column-level filtering */
  filterable?: boolean;
  /** Fixed width */
  width?: number | string;
  /** Min width */
  minWidth?: number;
  /** Column can be hidden */
  hideable?: boolean;
  /** Pin column */
  pin?: ColumnPinning;
  /** Extra class for header cell */
  headerClassName?: string;
  /** Extra class for data cell */
  cellClassName?: string;
  /** Align cell content */
  align?: "left" | "center" | "right";
}

export interface HeaderContext<TData> {
  column: ColumnDef<TData>;
  table: DataTableInstance<TData>;
}

export interface CellContext<TData> {
  row: TData;
  rowIndex: number;
  column: ColumnDef<TData>;
  table: DataTableInstance<TData>;
  getValue: () => unknown;
}

export interface DataTableInstance<TData> {
  rows: TData[];
  filteredRows: TData[];
  columns: ColumnDef<TData>[];
  sorting: SortState;
  setSorting: (s: SortState) => void;
  globalFilter: string;
  setGlobalFilter: (v: string) => void;
  pagination: PaginationState;
  setPagination: (p: PaginationState) => void;
  visibleCols: Set<string>;
  toggleCol: (id: string) => void;
  rowSelection: Set<number>;
  toggleRow: (i: number) => void;
  toggleAllRows: () => void;
}

export interface SortState {
  id: string | null;
  direction: SortDirection;
}

export interface PaginationState {
  pageIndex: number;
  pageSize: number;
}

export interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  /** Global search placeholder */
  searchPlaceholder?: string;
  /** Show global search bar */
  enableSearch?: boolean;
  /** Show column visibility toggle */
  enableColumnVisibility?: boolean;
  /** Show row selection checkboxes */
  enableRowSelection?: boolean;
  /** Rows per page options */
  pageSizeOptions?: number[];
  /** Initial page size */
  defaultPageSize?: number;
  /** Enable client-side pagination */
  enablePagination?: boolean;
  /** Called when selection changes */
  onRowSelectionChange?: (rows: TData[]) => void;
  /** Toolbar slot (right side) */
  toolbar?: React.ReactNode;
  /** Empty state content */
  emptyState?: React.ReactNode;
  /** Show dense rows */
  dense?: boolean;
  /** Zebra striping */
  striped?: boolean;
  /** Sticky header */
  stickyHeader?: boolean;
  /** Table max-height when stickyHeader is true */
  maxHeight?: string;
  className?: string;
}

// ─── Default sort comparator ──────────────────────────────
function defaultSort<TData>(
  a: TData, b: TData,
  key: keyof TData,
  dir: "asc" | "desc"
): number {
  const av = a[ key ];
  const bv = b[ key ];
  if (av === bv) return 0;
  const cmp = av < bv ? -1 : 1;
  return dir === "asc" ? cmp : -cmp;
}

// ─── DataTable ────────────────────────────────────────────
export function DataTable<TData extends object>({
  data,
  columns,
  searchPlaceholder = "Search…",
  enableSearch = true,
  enableColumnVisibility = true,
  enableRowSelection = false,
  pageSizeOptions = [ 10, 20, 50, 100 ],
  defaultPageSize = 10,
  enablePagination = true,
  onRowSelectionChange,
  toolbar,
  emptyState,
  dense = false,
  striped = false,
  stickyHeader = false,
  maxHeight = "500px",
  className,
}: DataTableProps<TData>) {
  // ── State ──
  const [ sorting, setSorting ] = React.useState<SortState>({ id: null, direction: false });
  const [ globalFilter, setGlobalFilter ] = React.useState("");
  const [ pagination, setPagination ] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: defaultPageSize,
  });
  const [ visibleCols, setVisibleCols ] = React.useState<Set<string>>(
    () => new Set(columns.map(c => c.id))
  );
  const [ rowSelection, setRowSelection ] = React.useState<Set<number>>(new Set());
  const [ colVisOpen, setColVisOpen ] = React.useState(false);

  // ── Filtering ──
  const filteredRows = React.useMemo(() => {
    if (!globalFilter) return data;
    const q = globalFilter.toLowerCase();
    return data.filter(row =>
      columns.some(col => {
        if (!col.filterable && !col.accessorKey) return false;
        const key = col.accessorKey;
        if (!key) return false;
        const val = row[ key ];
        return String(val).toLowerCase().includes(q);
      })
    );
  }, [ data, globalFilter, columns ]);

  // ── Sorting ──
  const sortedRows = React.useMemo(() => {
    if (!sorting.id || !sorting.direction) return filteredRows;
    const col = columns.find(c => c.id === sorting.id);
    if (!col?.accessorKey) return filteredRows;
    return [ ...filteredRows ].sort((a, b) =>
      defaultSort(a, b, col.accessorKey!, sorting.direction as "asc" | "desc")
    );
  }, [ filteredRows, sorting, columns ]);

  // ── Pagination ──
  const totalRows = sortedRows.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / pagination.pageSize));
  const safePageIndex = Math.min(pagination.pageIndex, totalPages - 1);

  const pagedRows = React.useMemo(() => {
    if (!enablePagination) return sortedRows;
    const start = safePageIndex * pagination.pageSize;
    return sortedRows.slice(start, start + pagination.pageSize);
  }, [ sortedRows, safePageIndex, pagination.pageSize, enablePagination ]);

  // ── Row selection ──
  const toggleRow = React.useCallback((i: number) => {
    setRowSelection(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }, []);

  const toggleAllRows = React.useCallback(() => {
    setRowSelection(prev => {
      if (prev.size === pagedRows.length) return new Set();
      return new Set(pagedRows.map((_, i) => safePageIndex * pagination.pageSize + i));
    });
  }, [ pagedRows, safePageIndex, pagination.pageSize ]);

  React.useEffect(() => {
    if (onRowSelectionChange) {
      const selected = [ ...rowSelection ].map(i => sortedRows[ i ]).filter(Boolean);
      onRowSelectionChange(selected);
    }
  }, [ rowSelection, sortedRows, onRowSelectionChange ]);

  // ── Column toggle ──
  const toggleCol = React.useCallback((id: string) => {
    setVisibleCols(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  // ── Table instance ──
  const table: DataTableInstance<TData> = {
    rows: data, filteredRows, columns, sorting, setSorting,
    globalFilter, setGlobalFilter, pagination, setPagination,
    visibleCols, toggleCol, rowSelection, toggleRow, toggleAllRows,
  };

  const visibleColumns = columns.filter(c => visibleCols.has(c.id));

  // Reset page when filter changes
  React.useEffect(() => {
    setPagination(p => ({ ...p, pageIndex: 0 }));
  }, [ globalFilter ]);

  // ── Sort handler ──
  const handleSort = (col: ColumnDef<TData>) => {
    if (!col.sortable) return;
    setSorting(prev => {
      if (prev.id !== col.id) return { id: col.id, direction: "asc" };
      if (prev.direction === "asc") return { id: col.id, direction: "desc" };
      return { id: null, direction: false };
    });
  };

  const startRow = safePageIndex * pagination.pageSize + 1;
  const endRow = Math.min((safePageIndex + 1) * pagination.pageSize, totalRows);

  return (
    <div className={ cn("flex flex-col gap-3 w-full", className) }>

      {/* ── Toolbar ── */ }
      { (enableSearch || enableColumnVisibility || toolbar) && (
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            { enableSearch && (
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <input
                  type="text"
                  value={ globalFilter }
                  onChange={ e => setGlobalFilter(e.target.value) }
                  placeholder={ searchPlaceholder }
                  className={ cn(
                    "w-full pl-9 pr-8 py-2 rounded-xl border border-input bg-background",
                    "text-sm placeholder:text-muted-foreground/50",
                    "focus:outline-none focus:border-ring focus:outline-2 focus:outline-ring/25",
                    "transition-all duration-150"
                  ) }
                />
                { globalFilter && (
                  <button
                    onClick={ () => setGlobalFilter("") }
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-muted-foreground rounded p-0.5 transition-colors"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                ) }
              </div>
            ) }
          </div>

          <div className="flex items-center gap-2 shrink-0">
            { toolbar }

            {/* Column visibility toggle */ }
            { enableColumnVisibility && (
              <div className="relative">
                <button
                  onClick={ () => setColVisOpen(v => !v) }
                  className={ cn(
                    "inline-flex items-center gap-1.5 rounded-xl border border-input px-3 py-2",
                    "text-sm font-medium text-foreground/80",
                    "hover:bg-muted/60 transition-colors",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    colVisOpen && "bg-muted/60"
                  ) }
                >
                  <Settings2 className="h-4 w-4" />
                  Columns
                </button>

                { colVisOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={ () => setColVisOpen(false) }
                    />
                    <div className={ cn(
                      "absolute right-0 top-full mt-1.5 z-50",
                      "min-w-[160px] rounded-2xl border border-border/60 bg-popover p-1.5",
                      "shadow-xl shadow-black/[0.08]",
                      "animate-in fade-in zoom-in-95 duration-150 origin-top-right"
                    ) }>
                      { columns.filter(c => c.hideable !== false).map(col => (
                        <button
                          key={ col.id }
                          onClick={ () => toggleCol(col.id) }
                          className="w-full flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm hover:bg-muted/70 transition-colors text-left"
                        >
                          { visibleCols.has(col.id)
                            ? <Eye className="h-3.5 w-3.5 text-primary shrink-0" />
                            : <EyeOff className="h-3.5 w-3.5 text-muted-foreground/40 shrink-0" />
                          }
                          <span className={ cn(!visibleCols.has(col.id) && "text-muted-foreground/50") }>
                            { typeof col.header === "string" ? col.header : col.id }
                          </span>
                        </button>
                      )) }
                    </div>
                  </>
                ) }
              </div>
            ) }
          </div>
        </div>
      ) }

      {/* ── Table ── */ }
      <div
        className={ cn(
          "w-full rounded-2xl border border-border/60 overflow-hidden",
          stickyHeader && "overflow-auto",
        ) }
        style={ stickyHeader ? { maxHeight } : undefined }
      >
        <table className="w-full border-collapse text-sm">
          {/* Head */ }
          <thead className={ cn(
            "bg-muted/40",
            stickyHeader && "sticky top-0 z-10"
          ) }>
            <tr>
              {/* Selection checkbox */ }
              { enableRowSelection && (
                <th className="w-10 px-3 py-3 text-left border-b border-border/60">
                  <input
                    type="checkbox"
                    className="rounded border-border"
                    checked={ rowSelection.size === pagedRows.length && pagedRows.length > 0 }
                    onChange={ toggleAllRows }
                    aria-label="Select all"
                  />
                </th>
              ) }

              { visibleColumns.map(col => {
                const isSorted = sorting.id === col.id;
                return (
                  <th
                    key={ col.id }
                    onClick={ () => handleSort(col) }
                    className={ cn(
                      "px-4 border-b border-border/60 font-semibold text-foreground/70",
                      "whitespace-nowrap select-none",
                      dense ? "py-2 text-xs" : "py-3 text-sm",
                      col.sortable && "cursor-pointer hover:bg-muted/60 hover:text-foreground transition-colors",
                      col.align === "center" && "text-center",
                      col.align === "right" && "text-right",
                      col.headerClassName
                    ) }
                    style={ {
                      width: col.width,
                      minWidth: col.minWidth,
                    } }
                  >
                    <div className={ cn(
                      "inline-flex items-center gap-1.5",
                      col.align === "center" && "justify-center",
                      col.align === "right" && "flex-row-reverse",
                    ) }>
                      { typeof col.header === "function"
                        ? col.header({ column: col, table })
                        : col.header }
                      { col.sortable && (
                        <span className="text-muted-foreground/40 shrink-0">
                          { isSorted && sorting.direction === "asc" && <ChevronUp className="h-3.5 w-3.5 text-primary" /> }
                          { isSorted && sorting.direction === "desc" && <ChevronDown className="h-3.5 w-3.5 text-primary" /> }
                          { !isSorted && <ChevronsUpDown className="h-3.5 w-3.5" /> }
                        </span>
                      ) }
                    </div>
                  </th>
                );
              }) }
            </tr>
          </thead>

          {/* Body */ }
          <tbody>
            { pagedRows.length === 0 ? (
              <tr>
                <td
                  colSpan={ visibleColumns.length + (enableRowSelection ? 1 : 0) }
                  className="px-4 py-16 text-center text-sm text-muted-foreground"
                >
                  { emptyState ?? (
                    <div className="flex flex-col items-center gap-2">
                      <Search className="h-8 w-8 opacity-20" />
                      <p>No results{ globalFilter ? ` for "${globalFilter}"` : "" }.</p>
                    </div>
                  ) }
                </td>
              </tr>
            ) : (
              pagedRows.map((row, rowIdx) => {
                const absIdx = safePageIndex * pagination.pageSize + rowIdx;
                const isSelected = rowSelection.has(absIdx);
                return (
                  <tr
                    key={ rowIdx }
                    data-selected={ isSelected }
                    className={ cn(
                      "border-b border-border/40 last:border-0",
                      "transition-colors duration-100",
                      striped && rowIdx % 2 === 1 && "bg-muted/20",
                      isSelected && "bg-primary/5",
                      enableRowSelection && "cursor-pointer hover:bg-muted/30",
                      !enableRowSelection && "hover:bg-muted/20"
                    ) }
                    onClick={ () => enableRowSelection && toggleRow(absIdx) }
                  >
                    { enableRowSelection && (
                      <td className="w-10 px-3" onClick={ e => e.stopPropagation() }>
                        <input
                          type="checkbox"
                          className="rounded border-border"
                          checked={ isSelected }
                          onChange={ () => toggleRow(absIdx) }
                          aria-label={ `Select row ${absIdx + 1}` }
                        />
                      </td>
                    ) }
                    { visibleColumns.map(col => {
                      const key = col.accessorKey;
                      const value = key ? row[ key ] : undefined;
                      return (
                        <td
                          key={ col.id }
                          className={ cn(
                            "px-4 text-foreground/85",
                            dense ? "py-2 text-xs" : "py-3 text-sm",
                            col.align === "center" && "text-center",
                            col.align === "right" && "text-right",
                            col.cellClassName
                          ) }
                        >
                          { col.cell({
                            row,
                            rowIndex: absIdx,
                            column: col,
                            table,
                            getValue: () => value,
                          }) }
                        </td>
                      );
                    }) }
                  </tr>
                );
              })
            ) }
          </tbody>
        </table>
      </div>

      {/* ── Pagination ── */ }
      { enablePagination && (
        <div className="flex items-center justify-between gap-4 flex-wrap text-sm text-muted-foreground">
          {/* Row count */ }
          <div className="flex items-center gap-3">
            { enableRowSelection && rowSelection.size > 0 && (
              <span className="text-primary font-medium">
                { rowSelection.size } selected
              </span>
            ) }
            <span>
              { totalRows === 0
                ? "No rows"
                : `${startRow}–${endRow} of ${totalRows} rows` }
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Page size selector */ }
            <div className="flex items-center gap-2">
              <span className="text-xs whitespace-nowrap">Rows per page</span>
              <select
                value={ pagination.pageSize }
                onChange={ e => setPagination({ pageIndex: 0, pageSize: Number(e.target.value) }) }
                className={ cn(
                  "rounded-lg border border-input bg-background px-2 py-1",
                  "text-sm focus:outline-none focus:border-ring",
                  "transition-colors"
                ) }
              >
                { pageSizeOptions.map(s => (
                  <option key={ s } value={ s }>{ s }</option>
                )) }
              </select>
            </div>

            {/* Page navigation */ }
            <div className="flex items-center gap-1">
              <PageBtn onClick={ () => setPagination(p => ({ ...p, pageIndex: 0 })) } disabled={ safePageIndex === 0 }>
                <ChevronsLeft className="h-4 w-4" />
              </PageBtn>
              <PageBtn onClick={ () => setPagination(p => ({ ...p, pageIndex: p.pageIndex - 1 })) } disabled={ safePageIndex === 0 }>
                <ChevronLeft className="h-4 w-4" />
              </PageBtn>

              <span className="px-2 text-xs whitespace-nowrap font-medium">
                { safePageIndex + 1 } / { totalPages }
              </span>

              <PageBtn onClick={ () => setPagination(p => ({ ...p, pageIndex: p.pageIndex + 1 })) } disabled={ safePageIndex >= totalPages - 1 }>
                <ChevronRight className="h-4 w-4" />
              </PageBtn>
              <PageBtn onClick={ () => setPagination(p => ({ ...p, pageIndex: totalPages - 1 })) } disabled={ safePageIndex >= totalPages - 1 }>
                <ChevronsRight className="h-4 w-4" />
              </PageBtn>
            </div>
          </div>
        </div>
      ) }
    </div>
  );
}

// ─── PageBtn ──────────────────────────────────────────────
function PageBtn({
  children,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={ onClick }
      disabled={ disabled }
      className={ cn(
        "flex h-8 w-8 items-center justify-center rounded-lg border border-input",
        "transition-colors hover:bg-muted/60",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "disabled:pointer-events-none disabled:opacity-40"
      ) }
    >
      { children }
    </button>
  );
}
