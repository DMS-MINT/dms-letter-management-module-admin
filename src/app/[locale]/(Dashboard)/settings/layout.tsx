"use client";

import { type ReactNode } from "react";

import {
	LockKeyhole,
	Settings,
	Settings2,
	UserPen,
	Users2,
} from "lucide-react";
import { useTranslations } from "next-intl";

import SubNavLayout from "@/components/shared/Layouts/SubNavLayout";

export default function SettingsLayout({ children }: { children: ReactNode }) {
	return <SettingsLayoutContent>{children}</SettingsLayoutContent>;
}

function SettingsLayoutContent({ children }: { children: ReactNode }) {
	const t = useTranslations();
	const links = [
		{
			title: t("settings.general"),
			label: "128",
			icon: Settings2,
			variant: "ghost",
			href: "/settings",
		},
		{
			title: t("settings.team"),
			label: "9",
			icon: Users2,
			variant: "ghost",
			href: "/settings/team",
		},
		{
			title: t("settings.security"),
			label: "",
			icon: LockKeyhole,
			variant: "ghost",
			href: "/settings/security",
		},
		{
			title: t("settings.profile"),
			label: "128",
			icon: UserPen,
			variant: "ghost",
			href: "/settings/myProfile",
		},
	];

	return (
		<div className="flex flex-col h-full">
			<SubNavLayout
				defaultLayout={[265, 440, 655]}
				navCollapsedSize={50}
				links={links}
				separatorAfter={6}
				description={t("settings.description")}
				descIcon={<Settings className="text-primary" size={14} />}
			>
				{children}
			</SubNavLayout>
		</div>
	);
}
