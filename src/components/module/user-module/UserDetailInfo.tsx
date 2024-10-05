import Image from "next/image";

import { DotIcon } from "lucide-react";

import { UserProfileCompletion } from "@/components/shared/Charts/UserProfileStatus";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	userAccountData,
	userOrganizationData,
	userPersonalData,
	userPreferencesData,
	userSecurityData,
} from "@/constants/data/userData";
import { IMAGES } from "@/constants/files";

import UserDetailTable from "./UserDetailTable";

type Props = {};

const UserDetailInfo = (props: Props) => {
	return (
		<Card>
			<CardHeader>
				<div className="lg:flex-row flex lg:justify-between flex-col ">
					<div className="lg:w-2/3 w-full flex flex-col justify-center items-center gap-2">
						<Image
							src={IMAGES.profilePic}
							alt="profile"
							width={150}
							height={150}
							className="rounded-full border-2 border-primary border-dashed"
						/>
						<CardTitle className="flex gap-0 items-center ">
							Abebe Kebede Ayele{" "}
						</CardTitle>
						<CardDescription>example@example.com</CardDescription>
					</div>
					<div className="lg:w-1/3 mt-4 lg:m-0 xl:flex-row flex flex-col w-full items-center lg:items-start space-y-2 lg:space-y-0 justify-center lg:justify-end">
						<Badge className="flex xl:mx-4 bg-green-300 w-[130px] h-8 items-center justify-start hover:bg-transparent hover:border-green-500 border-2 border-transparent">
							<DotIcon size={48} strokeWidth={3} className="text-green-500 " />
							<p className="text-black font-bold">Active</p>
						</Badge>
						<div className="xl:w-[80%] w-full">
							<UserProfileCompletion />
						</div>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<UserDetailTable
						data={userPersonalData}
						title="Personal details"
						desc="Here are a list of personal Information for the user"
					/>
					<UserDetailTable
						data={userOrganizationData}
						title="Organization details"
						desc="Here are a list of organization Information for the user"
					/>

					<UserDetailTable
						data={userSecurityData}
						title="Security details"
						desc="Here are a list of security Information for the user"
					/>
					<UserDetailTable
						data={userPreferencesData}
						title="Preferences details"
						desc="Here are a list of preferences Information for the user"
					/>
					<UserDetailTable
						data={userAccountData}
						title="Account details"
						desc="Here are a list of account Information for the user"
					/>
				</div>
			</CardContent>
			<CardFooter>
				<div className="text-xs text-muted-foreground">
					Showing <strong>DMS</strong> user information
				</div>
			</CardFooter>
		</Card>
	);
};

export default UserDetailInfo;
