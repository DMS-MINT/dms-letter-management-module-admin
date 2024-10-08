"use client";

import { type ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { type User } from "@/constants/data/tobeChanged/schema";
import { labels, statuses } from "@/constants/data/userData";

import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

// "first_name_en": "Betelhem",
// "middle_name_en": "Mekdes",
// "last_name_en": "Asfaw",
// "first_name_am": "ቤተልሄም",
// "middle_name_am": "መካድስ",
// "last_name_am": "አስፋው",

// "department_name": "Strategic Affairs CEO",

// "email": "betelhem.asfaw@mint.com",
export const columns: ColumnDef<User>[] = [
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
		accessorKey: "id",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Id" />
		),
		cell: ({ row }) => <div className="w-[20px]">{row.getValue("id")}</div>,
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "name",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="FullName" />
		),
		cell: ({ row }) => {
			const label = labels.find((label) => label.value === row.original.label);
			const fullName = `${row.original.first_name_en} ${row.original.middle_name_en} ${row.original.last_name_en}`;
			const fullNameAm = `${row.original.first_name_am} ${row.original.middle_name_am} ${row.original.last_name_am}`;

			return (
				<div className="flex space-x-2">
					{label && <Badge>{label.label}</Badge>}
					<span className="max-w-[500px] truncate font-medium flex gap-2">
						{fullName}
						<span className="text-muted-foreground text-sm hidden xl:flex">
							{fullNameAm}
						</span>
					</span>
				</div>
			);
		},
	},

	{
		accessorKey: "status",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Status" />
		),
		cell: ({ row }) => {
			const status = statuses.find(
				(status) => status.value === row.getValue("status")
			);

			if (!status) {
				return null;
			}

			return (
				<div className="flex w-[100px] items-center">
					{status.icon && (
						<status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
					)}
					<span>{status.label}</span>
				</div>
			);
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		accessorKey: "email",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Email" />
		),
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[500px] truncate font-medium">
						{row.getValue("email")}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: "department_name",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Department" />
		),
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[500px] truncate font-medium">
						{row.getValue("department_name")}
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
