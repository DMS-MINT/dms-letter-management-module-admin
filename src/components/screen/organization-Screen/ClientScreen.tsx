"use client";

import { useState } from "react";

import { File, PlusCircle } from "lucide-react";

import { useFetchEnterprises } from "@/actions/Query/organization-query/enterpriseQuery";
import { columns } from "@/components/module/organization-module/ClientdataTable/columns";
import { ClientDataTable } from "@/components/module/organization-module/ClientdataTable/data-table";
import { CustomClientSheet } from "@/components/module/organization-module/OrganizationForm/CustomClientSheet";
import PageSubTitle from "@/components/shared/Titles/PageSubTitle";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const ClientScreen = () => {
	const [isSheetOpen, setIsSheetOpen] = useState(false);
	const isAdding = true;

	const handleCloseSheet = () => {
		setIsSheetOpen(false);
	};

	const { data: clients, isLoading } = useFetchEnterprises();
	console.log("Enterprise data", clients);
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
						onClick={() => setIsSheetOpen(true)}
					>
						<PlusCircle className="h-3.5 w-3.5" />
						<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
							Add Client
						</span>
					</Button>
				</div>
			</div>
			{isLoading ? (
				<Skeleton />
			) : (
				<ClientDataTable data={clients || []} columns={columns} />
			)}
			<CustomClientSheet
				isAdding={isAdding}
				isOpen={isSheetOpen}
				onClose={handleCloseSheet}
			/>
		</div>
	);
};

export default ClientScreen;
