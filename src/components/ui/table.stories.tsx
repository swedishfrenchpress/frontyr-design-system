import type { Story } from "@ladle/react";
import * as React from "react";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableCellAction,
  TableCellIcon,
  TableCellBadge,
  TablePagination,
} from "./table";

/* Check icon for the icon column */
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="size-4">
    <path d="M13 4L6.5 10.5L3 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* Demo data */
const rows = [
  { name: "Table text goes here", desc: "Description Text", amount: "$120.00", total: "$120.00", check: true },
  { name: "Table text goes here", desc: undefined, amount: "$110.00", total: "$110.00", check: true },
  { name: "Table text goes here", desc: "Description Text", amount: "$120.80", total: "$110.80", check: true },
  { name: "Table text goes here", desc: undefined, amount: "$120.80", total: "$120.80", check: true },
  { name: "Table text goes here", desc: "Description Text", amount: "$120.80", total: "$120.80", check: true },
  { name: "Table text goes here", desc: undefined, amount: "$120.80", total: "$110.80", check: true },
  { name: "Table text goes here", desc: "Description Text", amount: "$120.80", total: "$110.80", check: true },
  { name: "Table text goes here", desc: "Description Text", amount: "$120.00", total: "$110.80", check: true },
];

/* ---- Main demo (matches Figma screenshot) ---- */

export const Demo: Story = () => (
  <Table className="max-w-[1024px]">
    <TableHeader>
      <TableHead width={400} sortable>Title</TableHead>
      <TableHead width={250}>Title</TableHead>
      <TableHead width={124} align="center">Title</TableHead>
      <TableHead width={250}>Title</TableHead>
    </TableHeader>
    <TableBody>
      {rows.map((row, i) => (
        <TableRow key={i}>
          <TableCell width={400} description={row.desc}>{row.name}</TableCell>
          <TableCell width={250}>{row.amount}</TableCell>
          <TableCellIcon width={124} icon={<CheckIcon />} />
          <TableCell width={250}>{row.total}</TableCell>
        </TableRow>
      ))}
    </TableBody>
    <TablePagination total={30} page={1} pageSize={7} />
  </Table>
);

/* ---- With actions ---- */

export const WithActions: Story = () => (
  <Table className="max-w-[800px]">
    <TableHeader>
      <TableHead width={300}>Name</TableHead>
      <TableHead width={200}>Status</TableHead>
      <TableHead width={300} align="right">Actions</TableHead>
    </TableHeader>
    <TableBody>
      {["Agent Alpha", "Agent Beta", "Agent Gamma"].map((name) => (
        <TableRow key={name}>
          <TableCell width={300}>{name}</TableCell>
          <TableCellBadge width={200} label="Active" color="green" />
          <TableCellAction width={300} actions={[{ label: "Edit" }]} />
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

/* ---- With badges ---- */

export const WithBadges: Story = () => (
  <Table className="max-w-[700px]">
    <TableHeader>
      <TableHead width={300}>Campaign</TableHead>
      <TableHead width={200}>Status</TableHead>
      <TableHead width={200} align="right">Spend</TableHead>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell width={300}>Summer Outreach</TableCell>
        <TableCellBadge width={200} label="Active" color="green" />
        <TableCell width={200} align="right">$4,200</TableCell>
      </TableRow>
      <TableRow>
        <TableCell width={300}>Q4 Retention</TableCell>
        <TableCellBadge width={200} label="Paused" color="yellow" />
        <TableCell width={200} align="right">$1,800</TableCell>
      </TableRow>
      <TableRow>
        <TableCell width={300}>Cold Leads</TableCell>
        <TableCellBadge width={200} label="Stopped" color="red" />
        <TableCell width={200} align="right">$320</TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

/* ---- Dark mode ---- */

const DarkWrapper = ({ children }: { children: React.ReactNode }) => (
  <div data-theme="dark" className="bg-[var(--background-primary)] text-[color:var(--content-primary)] p-6 rounded-lg">
    {children}
  </div>
);

export const DarkMode: Story = () => (
  <DarkWrapper>
    <Table className="max-w-[1024px]">
      <TableHeader>
        <TableHead width={400} sortable>Title</TableHead>
        <TableHead width={250}>Amount</TableHead>
        <TableHead width={124} align="center">Status</TableHead>
        <TableHead width={250}>Total</TableHead>
      </TableHeader>
      <TableBody>
        {rows.slice(0, 4).map((row, i) => (
          <TableRow key={i}>
            <TableCell width={400} description={row.desc}>{row.name}</TableCell>
            <TableCell width={250}>{row.amount}</TableCell>
            <TableCellIcon width={124} icon={<CheckIcon />} />
            <TableCell width={250}>{row.total}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TablePagination total={30} page={1} pageSize={4} />
    </Table>
  </DarkWrapper>
);

export default {
  title: "Components / Table",
};
