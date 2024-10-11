"use client";

import { type ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { type EnterpriseType } from "@/types/EnterpriseType";

import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const types = [
	{
		value: "member",
		label: "Member",
	},
	{
		value: "admin",
		label: "Admin",
	},
	{
		value: "recordOfficer",
		label: "Record Officer",
	},
];

export const columns: ColumnDef<EnterpriseType>[] = [
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
		accessorKey: "full_name_en",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Client Name" />
		),
		cell: ({ row }) => {
			const label = types.find((label) => label.value === row.original.type);
			const fullName = row.original.full_name_en;
			const fullNameAm = row.original.full_name_am;

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
		accessorKey: "address",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Address" />
		),
		cell: ({ row }) => {
			const addressEn = row.original.address.city_en;
			const addressAm = row.original.address.city_am;

			return (
				<div className="flex space-x-2">
					<span className="max-w-[300px] truncate font-medium flex gap-2">
						{addressEn}
						<span className="text-muted-foreground text-sm hidden xl:flex">
							{addressAm}
						</span>
					</span>
				</div>
			);
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
					<span className="max-w-[200px] truncate font-medium">
						{row.getValue("email")}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: "phone_number",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Phone Number" />
		),
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[100px] truncate font-medium">
						{row.getValue("phone_number")}
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
