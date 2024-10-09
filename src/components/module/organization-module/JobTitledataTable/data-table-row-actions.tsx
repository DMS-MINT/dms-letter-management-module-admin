"use client";

import { useRouter } from "next/navigation";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { type Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { jobTitleSchema } from "@/constants/data/schema";

interface DataTableRowActionsProps<TData> {
	row: Row<TData>;
}

// Extract handleEdit function
const handleEdit = (id: string, jobTitle: any, route: any) => {
	const queryParams = new URLSearchParams({
		id: id,
		title_en: jobTitle.title_en,
		title_am: jobTitle.title_am,
	}).toString();

	// Append query string to the URL
	route.push(`jobtitle?${queryParams}` as `/${string}`);
};

export function DataTableRowActions<TData>({
	row,
}: DataTableRowActionsProps<TData>) {
	const jobTitle = jobTitleSchema.parse(row.original);
	const route = useRouter();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
				>
					<DotsHorizontalIcon className="h-4 w-4" />
					<span className="sr-only">Open menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-[160px]">
				<DropdownMenuItem
					onClick={() => handleEdit(jobTitle.id, jobTitle, route)}
				>
					Edit
				</DropdownMenuItem>
				<DropdownMenuItem>Make a copy</DropdownMenuItem>
				<DropdownMenuItem>Favorite</DropdownMenuItem>
				<DropdownMenuSeparator />

				<DropdownMenuItem>
					Delete
					<DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
