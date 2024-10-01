import {
	Activity,
	Archive,
	BellRing,
	ChartNoAxesCombined,
	Download,
	LockKeyhole,
	MessagesSquare,
	Trash2,
	Users2,
} from "lucide-react";

import SubNavLayout from "@/components/shared/Layouts/SubNavLayout";

const links = [
	{
		title: "Members",
		label: "128",
		icon: Users2,
		variant: "ghost",
		href: "/",
	},
	{
		title: "Status",
		label: "9",
		icon: ChartNoAxesCombined,
		variant: "ghost",
		href: "/user/status",
	},
	{
		title: "Security",
		label: "",
		icon: LockKeyhole,
		variant: "ghost",
		href: "/user/security",
	},
	{
		title: "Activity",
		label: "23",
		icon: Activity,
		variant: "ghost",
		href: "/user/activity",
	},
	{
		title: "Trash",
		label: "",
		icon: Trash2,
		variant: "ghost",
		href: "/user/trash",
	},
	{
		title: "Bulk Actions",
		label: "",
		icon: Archive,
		variant: "ghost",
		href: "/user/bulk-actions",
	},
	{
		title: "Export",
		label: "972",
		icon: Download,
		variant: "ghost",
		href: "/user/export",
	},

	{
		title: "Feedback",
		label: "128",
		icon: MessagesSquare,
		variant: "ghost",
		href: "/user/feedback",
	},
	{
		title: "Notify",
		label: "21",
		icon: BellRing,
		variant: "ghost",
		href: "/user/notify",
	},
];

// Define the UserLayout as a function component

export default function UserLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col h-screen">
			<SubNavLayout
				defaultLayout={[265, 440, 655]}
				navCollapsedSize={50}
				links={links}
				separatorAfter={6}
			>
				{children}
			</SubNavLayout>
		</div>
	);
}
