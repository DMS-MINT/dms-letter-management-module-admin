"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { File, PlusCircle } from "lucide-react";

import { columns } from "@/components/module/user-module/UserdataTable/columns";
import { DataTable } from "@/components/module/user-module/UserdataTable/data-table";
import PageSubTitle from "@/components/shared/Titles/PageSubTitle";
import { Button } from "@/components/ui/button";
import { users } from "@/constants/data/tobeChanged/schema";

import { CustomClientSheet } from "../../module/organization-module/OrganizationForm/CustomClientSheet";

const ClientScreen = () => {
	const [isSheetOpen, setIsSheetOpen] = useState(false);

	const [isAdding, setIsAdding] = useState(false);

	const handleOpenSheet = (isAdding: boolean = false) => {
		setIsAdding(isAdding);
		setIsSheetOpen(true);
	};

	const handleCloseSheet = () => {
		setIsSheetOpen(false);
	};
	const route = useRouter();
	return (
		<div className="p-4 space-y-6 mb-20">
			<div className="flex items-center justify-between space-y-2">
				<PageSubTitle
					title="All Client Enterprise"
					desc="Here are a list of your client for DMS"
				/>
				<div className="flex items-center space-x-2">
					<Button size="sm" variant="outline" className="h-7 gap-1">
						<File className="h-3.5 w-3.5" />
						<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
							Export
						</span>
					</Button>
					<Button
						size="sm"
						className="h-7 gap-1 font-bold text-white"
						onClick={() => handleOpenSheet()}
					>
						<PlusCircle className="h-3.5 w-3.5" />
						<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
							Add Client
						</span>
					</Button>
				</div>
			</div>
			<DataTable data={users} columns={columns} />
			<CustomClientSheet
				isAdding={isAdding}
				isOpen={isSheetOpen}
				onClose={handleCloseSheet}
			/>
		</div>
	);
};

export default ClientScreen;
