"use client";

import { useState } from "react";

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
import { enterpriseSchema } from "@/constants/data/schema";

import { CustomClientSheet } from "../OrganizationForm/CustomClientSheet";

interface DataTableRowActionsProps<TData> {
	row: Row<TData>;
}

export function DataTableRowActions<TData>({
	row,
}: DataTableRowActionsProps<TData>) {
	const [isSheetOpen, setIsSheetOpen] = useState(false);
	const enterprise = enterpriseSchema.parse(row.original);
	const isAdding = false;
	const handleCloseSheet = () => {
		setIsSheetOpen(false);
	};
	return (
		<>
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
					<DropdownMenuItem onClick={() => setIsSheetOpen(!isSheetOpen)}>
						Edit
					</DropdownMenuItem>
					<DropdownMenuItem>Make a copy</DropdownMenuItem>
					<DropdownMenuItem>Favorite</DropdownMenuItem>
					<DropdownMenuSeparator />

					<DropdownMenuSeparator />
					<DropdownMenuItem>
						Delete
						<DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<CustomClientSheet
				isAdding={isAdding}
				isOpen={isSheetOpen}
				onClose={handleCloseSheet}
				client={enterprise}
			/>
		</>
	);
}
