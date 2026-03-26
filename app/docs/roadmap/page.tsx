import { DocsContent, Section, DemoCard } from "@/components/docs";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle2, Clock, Construction } from "lucide-react";

const roadmapData = [
  { component: "Accordion", status: "Completed", version: "1.0.0" },
  { component: "Alert", status: "Completed", version: "1.0.0" },
  { component: "Avatar", status: "Completed", version: "1.0.0" },
  { component: "Badge", status: "Completed", version: "1.0.0" },
  { component: "Breadcrumb", status: "Completed", version: "1.0.0" },
  { component: "Button", status: "Completed", version: "1.0.0" },
  { component: "Card", status: "Completed", version: "1.0.0" },
  { component: "Checkbox", status: "Completed", version: "1.0.0" },
  { component: "Dialog", status: "Completed", version: "1.0.0" },
  { component: "Dropdown Menu", status: "Completed", version: "1.0.0" },
  { component: "Input", status: "Completed", version: "1.0.0" },
  { component: "Input Group", status: "Completed", version: "1.0.0" },
  { component: "Label", status: "Completed", version: "1.0.0" },
  { component: "Pagination", status: "Completed", version: "1.0.0" },
  { component: "Popover", status: "Completed", version: "1.0.0" },
  { component: "Progress", status: "Completed", version: "1.0.0" },
  { component: "Radio Group", status: "Completed", version: "1.0.0" },
  { component: "Select", status: "Completed", version: "1.0.0" },
  { component: "Separator", status: "Completed", version: "1.0.0" },
  { component: "Sheet", status: "Completed", version: "1.0.0" },
  { component: "Sidebar", status: "Completed", version: "1.0.0" },
  { component: "Skeleton", status: "Completed", version: "1.0.0" },
  { component: "Slider", status: "Completed", version: "1.0.0" },
  { component: "Switch", status: "Completed", version: "1.0.0" },
  { component: "Table", status: "Completed", version: "1.0.0" },
  { component: "Tabs", status: "Completed", version: "1.0.0" },
  { component: "Textarea", status: "Completed", version: "1.0.0" },
  { component: "Toast", status: "Completed", version: "1.0.0" },
  { component: "Tooltip", status: "Completed", version: "1.0.0" },
  { component: "Typography", status: "Completed", version: "1.0.0" },
  { component: "Calendar", status: "Planned", version: "1.1.0" },
  { component: "Command", status: "Planned", version: "1.1.0" },
  { component: "Date Picker", status: "Planned", version: "1.1.0" },
];

export default function RoadmapPage() {
  return (
    <DocsContent 
      title="Roadmap" 
      description="Track the progress of component development for the Modern UI library."
    >
      <Section title="Current Progress">
        <p className="text-muted-foreground mb-8">
          The following table lists all planned components and their current development status. We aim for full accessibility and high performance for every component.
        </p>
        
        <DemoCard className="p-0 overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="px-6 py-4">Component</TableHead>
                <TableHead className="px-6 py-4">Status</TableHead>
                <TableHead className="px-6 py-4">Version</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roadmapData.map((item) => (
                <TableRow key={item.component} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="px-6 py-4 font-medium">{item.component}</TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {item.status === "Completed" ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                      ) : (
                        <Clock className="w-3.5 h-3.5 text-orange-500" />
                      )}
                      <Badge variant={item.status === "Completed" ? "default" : "secondary"} className="text-[10px] px-2 py-0">
                        {item.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-muted-foreground font-mono text-xs">{item.version}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DemoCard>
      </Section>

      <Section title="Future Plans">
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl border border-border/60 bg-card shadow-sm">
            <div className="w-10 h-10 rounded-2xl bg-primary/5 flex items-center justify-center mb-4">
              <Construction className="text-primary" size={20} />
            </div>
            <h4 className="font-bold mb-2">Upcoming Components</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Date Picker</li>
              <li>• Command Palette</li>
              <li>• Data Grid (Advanced)</li>
              <li>• Charts & Visualization</li>
            </ul>
          </div>
          <div className="p-6 rounded-3xl border border-border/60 bg-card shadow-sm">
            <div className="w-10 h-10 rounded-2xl bg-primary/5 flex items-center justify-center mb-4">
              <Clock className="text-primary" size={20} />
            </div>
            <h4 className="font-bold mb-2">Release Schedule</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We release major updates every two weeks, focusing on stability and new component requests from the community.
            </p>
          </div>
        </div>
      </Section>
    </DocsContent>
  );
}
