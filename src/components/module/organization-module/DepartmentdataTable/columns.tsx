"use client";

import { type ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { type Department } from "@/constants/data/tobeChanged/schema";

import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<Department>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
				className="translate-y-[2px]"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
				className="translate-y-[2px]"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},

	{
		accessorKey: "department_name_en", // Corrected from "depatment_name_en"
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Department Name" />
		),
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[600px] truncate font-medium flex gap-2">
						{row.getValue("department_name_en")}
						<span className="text-muted-foreground text-sm xl:flex">
							{row.getValue("department_name_am")}
						</span>
					</span>
				</div>
			);
		},
	},

	{
		accessorKey: "abbreviation_en",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Abbreviation" />
		),
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[600px] truncate font-medium flex gap-2">
						{row.getValue("abbreviation_en")}
						<span className="text-muted-foreground text-sm xl:flex">
							{row.getValue("abbreviation_am")}
						</span>
					</span>
				</div>
			);
		},
	},

	{
		accessorKey: "contact_phone",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Contact Phone" />
		),
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[500px] truncate font-medium">
						{row.getValue("contact_phone")}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: "contact_email",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Email" />
		),
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[500px] truncate font-medium">
						{row.getValue("contact_email")}
					</span>
				</div>
			);
		},
	},
	{
		id: "actions",
		cell: ({ row }) => <DataTableRowActions row={row} />,
	},
];
