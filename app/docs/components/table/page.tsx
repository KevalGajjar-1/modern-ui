"use client";

import { DocsContent, Section, ComponentPreview, PropsTable, DemoCard } from "@/components/docs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  TablePagination,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
];

export default function TableDocs() {
  return (
    <DocsContent 
      title="Table" 
      description="A responsive table component for displaying data sets."
      importPath='import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption } from "@/components/ui/table";'
    >
      <Section title="Usage">
        <ComponentPreview 
          code={`import {\n  Table,\n  TableBody,\n  TableCaption,\n  TableCell,\n  TableFooter,\n  TableHead,\n  TableHeader,\n  TableRow,\n} from "@/components/ui/table";\n\n<Table>\n  <TableCaption>A list of your recent invoices.</TableCaption>\n  <TableHeader>\n    <TableRow>\n      <TableHead className="w-[100px]">Invoice</TableHead>\n      <TableHead>Status</TableHead>\n      <TableHead>Method</TableHead>\n      <TableHead className="text-right">Amount</TableHead>\n    </TableRow>\n  </TableHeader>\n  <TableBody>\n    {invoices.map((invoice) => (\n      <TableRow key={invoice.invoice}>\n        <TableCell className="font-medium">{invoice.invoice}</TableCell>\n        <TableCell>{invoice.paymentStatus}</TableCell>\n        <TableCell>{invoice.paymentMethod}</TableCell>\n        <TableCell className="text-right">{invoice.totalAmount}</TableCell>\n      </TableRow>\n    ))}\n  </TableBody>\n</Table>`}
        >
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.invoice}>
                  <TableCell className="font-medium">{invoice.invoice}</TableCell>
                  <TableCell>{invoice.paymentStatus}</TableCell>
                  <TableCell>{invoice.paymentMethod}</TableCell>
                  <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ComponentPreview>
      </Section>

      <Section title="Examples">
        <DemoCard>
          <div className="w-full space-y-6">
            <div className="rounded-md border border-border overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: "John Doe", email: "john@example.com", status: "Active", plan: "Pro", amount: "$29.00" },
                    { name: "Jane Smith", email: "jane@example.com", status: "Inactive", plan: "Free", amount: "$0.00" },
                    { name: "Bob Johnson", email: "bob@example.com", status: "Active", plan: "Enterprise", amount: "$299.00" },
                  ].map((user) => (
                    <TableRow key={user.email}>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">{user.name}</span>
                          <span className="text-xs text-muted-foreground">{user.email}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.status === "Active" ? "default" : "secondary"} className="text-[10px] px-2 py-0">
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{user.plan}</TableCell>
                      <TableCell className="text-right font-mono text-sm">{user.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <TablePagination 
              currentPage={1} 
              totalPages={5} 
              onPageChange={() => {}} 
            />
          </div>
        </DemoCard>
      </Section>

      <Section title="Accessibility">
        <p className="text-muted-foreground">
          The table component uses standard HTML table elements (<code>&lt;table&gt;</code>, <code>&lt;thead&gt;</code>, <code>&lt;tbody&gt;</code>, <code>&lt;tr&gt;</code>, <code>&lt;th&gt;</code>, <code>&lt;td&gt;</code>), ensuring it is accessible to screen readers and other assistive technologies.
        </p>
      </Section>
    </DocsContent>
  );
}
