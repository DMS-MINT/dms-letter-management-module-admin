import { Building2, Home, MonitorCog, Settings, Users } from "lucide-react";

import { FloatingDockMobile } from "@/components/ui/custom/floatingDockMobile";

export function MobileNavigation() {
	const links = [
		// {
		// 	title: "",
		// 	icon: (
		// 		<Image src={IMAGES.colLogo} width={40} height={40} alt="Aceternity Logo" />
		// 	),
		// 	href: "#",
		// },
		{
			title: "Home",
			icon: <Home className="h-6 w-6" />,
			href: "/home",
		},
		{
			title: "User",
			icon: <Users className="h-6 w-6" />,
			href: "/user",
		},

		{
			title: "Organization",
			icon: <Building2 className="h-6 w-6" />,
			href: "/organization",
		},
		{
			title: "System",
			icon: <MonitorCog className="h-6 w-6" />,
			href: "/system",
		},
		{
			title: "Settings",
			icon: <Settings className="h-6 w-6" />,
			href: "/settings",
		},
	];

	return <FloatingDockMobile items={links} />;
}
