"use client";

import Image from "next/image";
import { useParams } from "next/navigation";

import { DotIcon } from "lucide-react";

import { useFetchMemeberDetail } from "@/actions/Query/user-query/userQuery";
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
import { IMAGES } from "@/constants/files";
import { useAppDispatch } from "@/hooks/storehooks";

import UserDetailTable from "./UserDetailTable";

const UserDetailInfo = () => {
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const memberId: string = Array.isArray(id) ? id[0] : id; // Handle array case
	const { data: userDetail } = useFetchMemeberDetail(memberId);

	// if (isLoading) {
	// 	dispatch(SetLoading(true));
	// }

	// Personal Data

	const account_status = userDetail?.member_settings.is_verified
		? "active"
		: "deactivated";
	const userPersonalData = [
		{
			name: "Full Name",
			value: userDetail?.member_profile.full_name_en || "N/A",
		},
		{
			name: "Full Name (Amharic)",
			value: userDetail?.member_profile.full_name_am || "N/A",
		},
		{ name: "Email", value: userDetail?.email || "N/A" },
		{ name: "Phone", value: userDetail?.member_profile.phone_number || "N/A" },
	];

	// Organization Data
	const userOrganizationData = [
		{
			name: "Job Title",
			value: userDetail?.member_profile.job_title?.title_am || "N/A",
		},
		{
			name: "Department",
			value: userDetail?.member_profile.department?.department_name_en || "N/A",
		},
		{
			name: "Organization",
			value: "N/A",
		},
		{ name: "Address", value: "N/A" },
	];

	// Account Data
	const userAccountData = [
		{
			name: "Account Type",
			value: userDetail?.member_permissions.is_admin
				? "admin"
				: userDetail?.member_permissions.is_staff
					? "Record Officer"
					: "Member",
		},
		{
			name: "Account Verification",
			value: userDetail?.member_settings.is_verified
				? "Verified"
				: "Not Verified",
		},
		{
			name: "Account Status",
			value: userDetail?.member_settings.is_verified
				? "Acitivated"
				: "Deactivated",
		},
		{
			name: "Account Created",
			value: "N/A",
		},
		{ name: "Last Login", value: "N/A" },
		{
			name: "Last Login IP",
			value: "N/A",
		},
		{ name: "Last Updated", value: "N/A" },
		{ name: "Created By", value: "N/A" },
	];

	// Security Data
	const userSecurityData = [
		{
			name: "Last Password Change",
			value: "N/A",
		},
		{
			name: "Two Factor Authentication",
			value: userDetail?.member_settings.is_2fa_enabled
				? "Enabled"
				: "Disabled",
		},
		{
			name: "2FA (SMS)",
			value: "Enabled",
		},
		{
			name: "2FA (Google Authenticator)",
			value: "Disabled",
		},
		{
			name: "Password Strength",
			value: "N/A",
		},
	];

	// Preferences Data
	const userPreferencesData = [
		{ name: "Language", value: "N/A" },
		{ name: "Timezone", value: "N/A" },
		{
			name: "Email Notifications",
			value: "Disabled",
		},
		{
			name: "SMS Alerts",
			value: "Enabled",
		},
		{ name: "Theme", value: "N/A" },
	];

	const calculateProfileCompletion = () => {
		const totalFields = [
			...userPersonalData,
			...userOrganizationData,
			...userAccountData,
			...userSecurityData,
			...userPreferencesData,
		];

		// Count completed fields
		const completedFields = totalFields.filter(
			(field) =>
				field.value !== "N/A" &&
				field.value !== null &&
				field.value !== undefined
		).length;

		// Calculate completion percentage
		const profileCompletion = (completedFields / totalFields.length) * 100;

		return profileCompletion.toFixed(2); // Return percentage with 2 decimal places
	};
	const profileCompletionPercentage = calculateProfileCompletion();
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
							{userDetail?.member_profile.full_name_en || "N/A"}
						</CardTitle>
						<CardDescription>{userDetail?.email || "N/A"}</CardDescription>
					</div>
					<div className="lg:w-1/3 mt-4 lg:m-0 xl:flex-row flex flex-col w-full items-center lg:items-start space-y-2 lg:space-y-0 justify-center lg:justify-end">
						<Badge
							className={`flex xl:mx-4 ${account_status === "active" ? "bg-green-300" : "bg-red-300"} w-[130px] h-8 items-center justify-start hover:bg-transparent hover:border-green-500 border-2 border-transparent`}
						>
							<DotIcon
								size={48}
								strokeWidth={3}
								className={`${account_status === "active" ? "text-green-500" : "text-red-500"} `}
							/>
							<p className="text-black font-bold">
								{account_status === "active" ? "Active" : "Deactivated"}
							</p>
						</Badge>
						<div className="xl:w-[80%] w-full">
							<UserProfileCompletion
								profileCompletionPercentage={profileCompletionPercentage}
							/>
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
