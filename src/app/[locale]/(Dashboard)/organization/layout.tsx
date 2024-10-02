"use client";

import { type ReactNode } from "react";

import {
	Activity,
	Building,
	Building2,
	Download,
	Route,
	UserCheck,
	Workflow,
} from "lucide-react";
import { useTranslations } from "next-intl";

import SubNavLayout from "@/components/shared/Layouts/SubNavLayout";

export default function OrganizationLayout({
	children,
}: {
	children: ReactNode;
}) {
	return <OrganizationLayoutContent>{children}</OrganizationLayoutContent>;
}

function OrganizationLayoutContent({ children }: { children: ReactNode }) {
	const t = useTranslations();
	const links = [
		{
			title: t("organization.orgProfile"),
			label: "128",
			icon: Building,
			variant: "ghost",
			href: "/organization",
		},
		{
			title: t("organization.workflow"),
			label: "128",
			icon: Workflow,
			variant: "ghost",
			href: "/organization/workflow",
		},
		{
			title: t("organization.letterRoute"),
			label: "9",
			icon: Route,
			variant: "ghost",
			href: "/organization/letter",
		},
		{
			title: t("organization.roleConfig"),
			label: "",
			icon: UserCheck,
			variant: "ghost",
			href: "/organization/role",
		},
		{
			title: t("organization.activity"),
			label: "23",
			icon: Activity,
			variant: "ghost",
			href: "/organization/activity",
		},

		{
			title: t("User.export"),
			label: "972",
			icon: Download,
			variant: "ghost",
			href: "/organization/export",
		},
	];

	return (
		<div className="flex flex-col h-screen">
			<SubNavLayout
				defaultLayout={[265, 440, 655]}
				navCollapsedSize={50}
				links={links}
				separatorAfter={4}
				description={t("organization.description")}
				descIcon={<Building2 className="text-primary" size={14} />}
			>
				{children}
			</SubNavLayout>
		</div>
	);
}
