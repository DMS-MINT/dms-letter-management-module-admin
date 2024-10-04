"use client";

import { useRouter } from "next/navigation";

import { File, PlusCircle } from "lucide-react";

import { columns } from "@/components/module/user-module/UserdataTable/columns";
import { DataTable } from "@/components/module/user-module/UserdataTable/data-table";
import { ActiveUserChart } from "@/components/shared/Charts/ActiveUserChart";
import { UserNumberPieChart } from "@/components/shared/Charts/UserNumberPieChart";
import { Button } from "@/components/ui/button";
import { users } from "@/constants/data/tobeChanged/schema";

const UserScreen = () => {
	const router = useRouter();
	return (
		<div className="flex flex-col gap-4 p-4 ">
			<div className="flex flex-col gap-4 md:flex-row flex-wrap items-center justify-center">
				<UserNumberPieChart />
				<ActiveUserChart />
				<ActiveUserChart />
			</div>
			<div className="flex items-center justify-between space-y-2">
				<div>
					<h2 className="md:text-2xl text-lg font-bold tracking-tight">
						All Organization Memeber
					</h2>
					<p className="text-muted-foreground text-sm md:text-md">
						Here are a list of your member for DMS
					</p>
				</div>
				<div className="flex items-center space-x-2">
					<Button size="sm" variant="outline" className="h-7 gap-1">
						<File className="h-3.5 w-3.5" />
						<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
							Export
						</span>
					</Button>
					<Button
						size="sm"
						className="h-7 gap-1"
						onClick={() => {
							router.push("/user/add");
						}}
					>
						<PlusCircle className="h-3.5 w-3.5" />
						<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
							Add Member
						</span>
					</Button>
				</div>
			</div>
			<DataTable data={users} columns={columns} />
		</div>
	);
};

export default UserScreen;
