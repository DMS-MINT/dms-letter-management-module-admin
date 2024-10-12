"use client";

import { useRouter } from "next/navigation";

import { File, PlusCircle } from "lucide-react";

import { useFetchDepartments } from "@/actions/Query/organization-query/departmentQuery";
import { columns } from "@/components/module/organization-module/DepartmentdataTable/columns";
import { DepartmentDataTable } from "@/components/module/organization-module/DepartmentdataTable/data-table";
import PageSubTitle from "@/components/shared/Titles/PageSubTitle";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const DepartmentScreen = () => {
	const route = useRouter();
	const { data: departments, isLoading } = useFetchDepartments();
	return (
		<div className="p-4 space-y-6 mb-20">
			<div className="flex items-center justify-between space-y-2">
				<PageSubTitle
					title="Department Settings"
					desc="Here are a list of your department for DMS"
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
						onClick={() => {
							route.push("department/add" as `/${string}`);
						}}
					>
						<PlusCircle className="h-3.5 w-3.5" />
						<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
							Add Department
						</span>
					</Button>
				</div>
			</div>
			{isLoading ? (
				<Skeleton />
			) : (
				<DepartmentDataTable data={departments || []} columns={columns} />
			)}
		</div>
	);
};

export default DepartmentScreen;
