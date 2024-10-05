"use client";

import { type ReactNode } from "react";

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
import { useTranslations } from "next-intl";

import SubNavLayout from "@/components/shared/Layouts/SubNavLayout";

export default function UserLayout({ children }: { children: ReactNode }) {
	return <UserLayoutContent>{children}</UserLayoutContent>;
}

function UserLayoutContent({ children }: { children: ReactNode }) {
	const t = useTranslations();
	const links = [
		{
			title: t("User.members"),
			label: "128",
			icon: Users2,
			variant: "ghost",
			href: "/user",
		},
		{
			title: t("User.status"),
			label: "9",
			icon: ChartNoAxesCombined,
			variant: "ghost",
			href: "/user/status",
		},
		{
			title: t("User.security"),
			label: "",
			icon: LockKeyhole,
			variant: "ghost",
			href: "/user/security",
		},
		{
			title: t("User.activity"),
			label: "23",
			icon: Activity,
			variant: "ghost",
			href: "/user/activity",
		},
		{
			title: t("User.trash"),
			label: "",
			icon: Trash2,
			variant: "ghost",
			href: "/user/trash",
		},
		{
			title: t("User.bulkActions"),
			label: "",
			icon: Archive,
			variant: "ghost",
			href: "/user/bulk",
		},
		{
			title: t("User.export"),
			label: "972",
			icon: Download,
			variant: "ghost",
			href: "/user/export",
		},
		{
			title: t("User.feedback"),
			label: "128",
			icon: MessagesSquare,
			variant: "ghost",
			href: "/user/feedback",
		},
		{
			title: t("User.notify"),
			label: "21",
			icon: BellRing,
			variant: "ghost",
			href: "/user/notify",
		},
	];

	return (
		<div className="flex flex-col">
			<SubNavLayout
				defaultLayout={[265, 440, 655]}
				navCollapsedSize={50}
				links={links}
				separatorAfter={6}
				description={t("User.description")}
				descIcon={<Users2 className="text-primary" size={14} />}
			>
				{children}
			</SubNavLayout>
		</div>
	);
}
