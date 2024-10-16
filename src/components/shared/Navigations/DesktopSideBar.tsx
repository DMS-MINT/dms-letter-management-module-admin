"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
	Building2,
	HomeIcon,
	LogOutIcon,
	MonitorCog,
	NotebookIcon,
	Settings,
	Users,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { useLogout } from "@/actions/Query/user-query/authQuery";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { IMAGES } from "@/constants/files";
import { useAppSelector } from "@/hooks/storehooks";
import { type RootState } from "@/lib/store/store";
import { type SidebarItemProps } from "@/types/UI/DashboardTypes";

const DesktopSideBar = () => {
	const t = useTranslations();
	const [selectedScreen, setSelectedScreen] = useState<string>("home");
	const route = useRouter();
	const haveTenant = useAppSelector(
		(state: RootState) => state.tenants.sysTenant.haveTenant
	);

	const { mutate: logOut } = useLogout();
	return (
		<section className="flex h-full flex-col justify-between ">
			<div>
				<div className="h-20 border-b-8 border-primary p-4 pl-1 pt-1 text-xl font-bold">
					<div className="m-2 flex h-full w-full items-center justify-center gap-2 border-2 border-dashed border-primary bg-primary-foreground">
						<Link href={"/"}>
							<Image src={IMAGES.adminLogo} width={40} alt="profile" />
						</Link>
						<Badge className="cursor-pointer bg-primary/70 md:hidden lg:block">
							{t("sideBar.title")}
						</Badge>
					</div>
				</div>
				<div className="mt-2 px-1 md:hidden lg:block">
					<Input placeholder="Search..." />
				</div>
				<nav className="flex-grow p-2">
					<ul className="space-y-2 lg:space-y-2">
						{!haveTenant ? (
							<SidebarItem
								icon={NotebookIcon}
								label={t("sideBar.launchPad")}
								tag={"2"}
								// tag={t("sideBar.new")}
								onClick={() => {
									route.push("/launchPad");
									setSelectedScreen("launchPad");
								}}
								active={selectedScreen === "launchPad"}
							/>
						) : (
							<>
								<SidebarItem
									icon={HomeIcon}
									label={t("sideBar.home")}
									tag={"2"}
									// tag={t("sideBar.new")}
									onClick={() => {
										route.push("/home");
										setSelectedScreen("home");
									}}
									active={selectedScreen === "home"}
								/>
								<SidebarItem
									icon={Users}
									label={t("sideBar.user")}
									onClick={() => {
										route.push("/user");
										setSelectedScreen("user");
									}}
									active={selectedScreen === "user"}
								/>
								<SidebarItem
									icon={Building2}
									label={t("sideBar.organization")}
									onClick={() => {
										route.push("/organization");
										setSelectedScreen("organization");
									}}
									active={selectedScreen === "organization"}
								/>
								<SidebarItem
									icon={MonitorCog}
									label={t("sideBar.system")}
									onClick={() => {
										route.push("/system");
										setSelectedScreen("system");
									}}
									active={selectedScreen === "system"}
								/>
							</>
						)}
					</ul>
				</nav>
			</div>
			<div className="flex flex-col ">
				<Card className="hidden xl:block">
					<CardHeader className="p-2 pt-0 md:p-4">
						<CardTitle>{t("sideBar.upgrade")}</CardTitle>
						<CardDescription>{t("sideBar.UpgradeDescription")}</CardDescription>
					</CardHeader>
					<CardContent className="p-2 pt-0 md:p-4 md:pt-0">
						<Button size="sm" className="w-full bg-primary">
							{t("sideBar.UpgradeButton")}
						</Button>
					</CardContent>
				</Card>

				<nav className="flex-grow ">
					<ul className="space-y-2 border-t  border-primary p-2 lg:space-y-2">
						<SidebarItem
							icon={Settings}
							label={t("sideBar.settings")}
							onClick={() => {
								route.push("/settings");
								setSelectedScreen("settings");
							}}
							active={selectedScreen === "settings"}
						/>

						<SidebarItem
							icon={LogOutIcon}
							label={t("sideBar.logout")}
							onClick={() => {
								logOut();
							}}
							active={selectedScreen === "logout"}
						/>
					</ul>
				</nav>
			</div>
		</section>
	);
};

export default DesktopSideBar;

function SidebarItem({
	icon: Icon,
	label,
	tag,
	onClick,
	active,
}: SidebarItemProps) {
	return (
		<li className="mb-1 flex w-full items-center justify-center">
			<Button
				onClick={onClick}
				variant={"outline"}
				className={`mt-1 flex w-full items-center justify-center rounded p-1 transition lg:justify-start ${active ? " border-2 border-primary text-primary" : "hover:text-primary hover:border-primary"} border-2 border-transparent`}
			>
				<Icon className=" h-8 w-8 lg:h-6 lg:w-6" />
				<span className={"hidden w-full text-start text-base lg:ml-2 lg:block"}>
					{label}
				</span>

				{tag ? (
					<Badge className="hidden bg-primary text-xs md:ml-2 lg:block">
						{tag}
					</Badge>
				) : null}
			</Button>
		</li>
	);
}
