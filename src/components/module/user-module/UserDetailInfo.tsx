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
	const { data: userDetail, isLoading } = useFetchMemeberDetail(memberId);

	// if (isLoading) {
	// 	dispatch(SetLoading(true));
	// }

	// Personal Data
	// Personal Data
	const userPersonalData = [
		{ name: "Full Name", value: userDetail?.personal.full_name_en || "N/A" },
		{
			name: "Full Name (Amharic)",
			value: userDetail?.personal.full_name_am || "N/A",
		},
		{ name: "Email", value: userDetail?.personal.email || "N/A" },
		{ name: "Phone", value: userDetail?.personal.phone_number || "N/A" },
	];

	// Organization Data
	const userOrganizationData = [
		{ name: "Job Title", value: userDetail?.organization.job_title || "N/A" },
		{ name: "Department", value: userDetail?.organization.department || "N/A" },
		{
			name: "Organization",
			value: userDetail?.organization.organization || "N/A",
		},
		{ name: "Address", value: userDetail?.organization.address || "N/A" },
	];

	// Account Data
	const userAccountData = [
		{ name: "Account Type", value: userDetail?.account.account_type || "N/A" },
		{
			name: "Account Verification",
			value: userDetail?.account.account_verification || "N/A",
		},
		{
			name: "Account Status",
			value: userDetail?.account.account_status || "N/A",
		},
		{
			name: "Account Created",
			value: userDetail?.account.account_created || "N/A",
		},
		{ name: "Last Login", value: userDetail?.account.last_login || "N/A" },
		{
			name: "Last Login IP",
			value: userDetail?.account.last_login_ip || "N/A",
		},
		{ name: "Last Updated", value: userDetail?.account.last_updated || "N/A" },
		{ name: "Created By", value: userDetail?.account.created_by || "N/A" },
	];

	// Security Data
	const userSecurityData = [
		{
			name: "Last Password Change",
			value: userDetail?.security.last_password_change || "N/A",
		},
		{
			name: "Two Factor Authentication",
			value: userDetail?.security.is_2fa_enabled ? "Enabled" : "Disabled",
		},
		{
			name: "2FA (SMS)",
			value: userDetail?.security.is_sms_2fa_enabled ? "Enabled" : "Disabled",
		},
		{
			name: "2FA (Google Authenticator)",
			value: userDetail?.security.is_google_authenticator_enabled
				? "Enabled"
				: "Disabled",
		},
		{
			name: "Password Strength",
			value: userDetail?.security.password_strength || "N/A",
		},
	];

	// Preferences Data
	const userPreferencesData = [
		{ name: "Language", value: userDetail?.preferences.language || "N/A" },
		{ name: "Timezone", value: userDetail?.preferences.timezone || "N/A" },
		{
			name: "Email Notifications",
			value: userDetail?.preferences.email_notifications
				? "Enabled"
				: "Disabled",
		},
		{
			name: "SMS Alerts",
			value: userDetail?.preferences.sms_alert ? "Enabled" : "Disabled",
		},
		{ name: "Theme", value: userDetail?.preferences.theme || "N/A" },
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
							{userDetail?.personal.full_name_en || "N/A"}
						</CardTitle>
						<CardDescription>
							{userDetail?.personal.email || "N/A"}
						</CardDescription>
					</div>
					<div className="lg:w-1/3 mt-4 lg:m-0 xl:flex-row flex flex-col w-full items-center lg:items-start space-y-2 lg:space-y-0 justify-center lg:justify-end">
						<Badge
							className={`flex xl:mx-4 ${userDetail?.account.account_status === "active" ? "bg-green-300" : "bg-red-300"} w-[130px] h-8 items-center justify-start hover:bg-transparent hover:border-green-500 border-2 border-transparent`}
						>
							<DotIcon
								size={48}
								strokeWidth={3}
								className={`${userDetail?.account.account_status === "active" ? "text-green-500" : "text-red-500"} `}
							/>
							<p className="text-black font-bold">
								{userDetail?.account.account_status === "active"
									? "Active"
									: "Deactivated"}
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
