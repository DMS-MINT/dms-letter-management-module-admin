"use client";

import { CircleIcon } from "@radix-ui/react-icons";
import { type ColumnDef } from "@tanstack/react-table";
import { CircleX } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
// Updated import path
import { type memeberType } from "@/types/user/UserType";

import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

// Generate labels based on is_staff and is_superuser
export const labels = [
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

// Example statuses based on account status
export const statuses = [
	{
		value: "active",
		label: "Active",
		icon: CircleIcon,
	},
	{
		value: "deactivated",
		label: "Deactivated",
		icon: CircleX,
	},
];

export const columns: ColumnDef<memeberType>[] = [
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
		accessorKey: "name",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="FullName" />
		),
		cell: ({ row }) => {
			const labelValue = row.original.member_permissions?.is_staff
				? "admin"
				: row.original.member_permissions.is_staff
					? "recordOfficer"
					: "member";

			const label = labels.find((label) => label.value === labelValue);
			const fullName = `${row.original.member_profile?.full_name_en}`;
			const fullNameAm = `${row.original.member_profile?.full_name_am}`;

			return (
				<div className="flex space-x-2">
					{label && <Badge>{label.label}</Badge>}
					<span className="max-w-[400px] truncate font-medium flex gap-2">
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
			const statusValue = row.getValue("account_status") || "active"; // Assuming account_status exists
			const status = statuses.find((status) => status.value === statusValue);

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
					<span className="max-w-[200px] truncate font-medium">
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
			const departmentAm =
				`${row.original.member_profile?.department?.department_name_am}` || "";
			const departmentEn =
				`${row.original.member_profile?.department?.department_name_en}` || "";

			return (
				<div className="flex space-x-2">
					<span className="max-w-[300px] truncate font-medium flex gap-2">
						{departmentEn}
						<span className="text-muted-foreground text-sm hidden xl:flex">
							{departmentAm}
						</span>
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
