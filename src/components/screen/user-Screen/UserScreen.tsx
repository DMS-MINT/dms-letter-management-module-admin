"use client";

import { useRouter } from "next/navigation";

import { File, PlusCircle } from "lucide-react";

import { useFetchAllUsers } from "@/actions/Query/user-query/userQuery";
import { columns } from "@/components/module/user-module/UserdataTable/columns";
import { DataTable } from "@/components/module/user-module/UserdataTable/data-table";
import PageSubTitle from "@/components/shared/Titles/PageSubTitle";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const UserScreen = () => {
	const route = useRouter();
	const { data: users, isLoading, isSuccess } = useFetchAllUsers();

	return isSuccess ? (
		<div className="p-4 space-y-6 mb-20">
			<div className="flex items-center justify-between space-y-2">
				<PageSubTitle
					title="All Organization Memeber"
					desc="Here are a list of your member for DMS"
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
							route.push("/user/add" as `/${string}`);
						}}
					>
						<PlusCircle className="h-3.5 w-3.5" />
						<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
							Add Member
						</span>
					</Button>
				</div>
			</div>
			{isLoading ? (
				<Skeleton />
			) : (
				<DataTable data={users || []} columns={columns} />
			)}
		</div>
	) : (
		<Skeleton />
	);
};

export default UserScreen;
