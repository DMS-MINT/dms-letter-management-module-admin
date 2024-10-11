"use client";

import { type ReactNode } from "react";

import { BellDot, FolderDot, LockKeyhole, Settings } from "lucide-react";
import { useTranslations } from "next-intl";

import SubNavLayout from "@/components/shared/Layouts/SubNavLayout";

export default function SettingsLayout({ children }: { children: ReactNode }) {
	return <SettingsLayoutContent>{children}</SettingsLayoutContent>;
}

function SettingsLayoutContent({ children }: { children: ReactNode }) {
	const t = useTranslations();
	const links = [
		{
			title: t("system.document"),
			label: "128",
			icon: FolderDot,
			variant: "ghost",
			href: "/system",
		},
		{
			title: t("system.notification"),
			label: "128",
			icon: BellDot,
			variant: "ghost",
			href: "/system/notification",
		},

		{
			title: t("system.security"),
			label: "",
			icon: LockKeyhole,
			variant: "ghost",
			href: "/system/security",
		},
	];

	return (
		<div className="flex flex-col h-full">
			<SubNavLayout
				defaultLayout={[265, 440, 655]}
				navCollapsedSize={50}
				links={links}
				separatorAfter={6}
				description={t("system.description")}
				descIcon={<Settings className="text-primary" size={14} />}
			>
				{children}
			</SubNavLayout>
		</div>
	);
}
