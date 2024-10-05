import { Edit, File, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import UserDetailInfo from "./UserDetailInfo";
import UserDetailReport from "./UserDetailReport";
import UserDetailSetting from "./UserDetailSetting";
import SignatureUploadForm from "./UserForm/SignatureUploadForm";

type Props = {};

const UserDetailTabs = (props: Props) => {
	return (
		<div>
			<Tabs defaultValue="all">
				<div className="flex items-center">
					<TabsList className="h-8 bg-transparent">
						<TabsTrigger value="all">User Detail</TabsTrigger>
						<TabsTrigger value="signature">Signature setup</TabsTrigger>
						<TabsTrigger value="report">Report</TabsTrigger>
						<TabsTrigger value="setting">User Settings</TabsTrigger>
					</TabsList>
					<div className="ml-auto flex items-center gap-2">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline" size="sm" className="h-7 gap-1">
									<Menu className="h-3.5 w-3.5" />
									<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
										Menu
									</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuLabel>Menu</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuCheckboxItem checked>
									Active
								</DropdownMenuCheckboxItem>
								<DropdownMenuCheckboxItem>Trashed</DropdownMenuCheckboxItem>
							</DropdownMenuContent>
						</DropdownMenu>
						<Button size="sm" variant="outline" className="h-7 gap-1">
							<File className="h-3.5 w-3.5" />
							<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
								Export
							</span>
						</Button>

						<Button size="sm" className="h-7 text-white gap-1">
							<Edit className="h-3.5 w-3.5" />
							<span className="sr-only  font-bold sm:not-sr-only sm:whitespace-nowrap">
								Edit
							</span>
						</Button>
					</div>
				</div>
				<TabsContent value="all">
					<UserDetailInfo />
				</TabsContent>
				<TabsContent value="signature">
					<SignatureUploadForm />
				</TabsContent>
				<TabsContent value="report">
					<UserDetailReport />
				</TabsContent>
				<TabsContent value="setting">
					<UserDetailSetting />
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default UserDetailTabs;
