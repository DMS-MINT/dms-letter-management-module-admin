import {
	ChartLine,
	Home,
	NotebookPen,
	Settings,
	ShoppingBasket,
	ShoppingCart,
} from "lucide-react";

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
			title: "Product",
			icon: <ShoppingCart className="h-6 w-6" />,
			href: "/product",
		},

		{
			title: "Order",
			icon: <ShoppingBasket className="h-6 w-6" />,
			href: "/order",
		},
		{
			title: "Dept",
			icon: <NotebookPen className="h-6 w-6" />,
			href: "/dept",
		},
		{
			title: "Settings",
			icon: <Settings className="h-6 w-6" />,
			href: "/settings",
		},
		{
			title: "Report",
			icon: <ChartLine className="h-6 w-6" />,
			href: "/report",
		},
	];

	return <FloatingDockMobile items={links} />;
}
