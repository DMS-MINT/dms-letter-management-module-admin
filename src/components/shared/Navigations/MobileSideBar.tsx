import Link from "next/link";
import { type FC, useState } from "react";

import {
	ChartLine,
	Home,
	type LucideIcon,
	NotebookPen,
	Settings,
	ShoppingBasket,
	ShoppingCart,
} from "lucide-react";

type MenuItem = {
	name: string;
	icon: LucideIcon;
	dis: string;
	link: string;
};

const MobileSideBar: FC = () => {
	const Menus: MenuItem[] = [
		{ name: "Home", icon: Home, dis: "translate-x-[-4px]", link: "/home" },
		{
			name: "Product",
			icon: ShoppingCart,
			dis: "translate-x-14",
			link: "/product",
		},
		{
			name: "Order",
			icon: ShoppingBasket,
			dis: "translate-x-28",
			link: "/order",
		},
		{
			name: "Dept",
			icon: NotebookPen,
			dis: "translate-x-[169px]",
			link: "/dept",
		},
		{
			name: "Settings",
			icon: Settings,
			dis: "translate-x-[226px]",
			link: "/settings",
		},
		{
			name: "Report",
			icon: ChartLine,
			dis: "translate-x-[282px]",
			link: "/report",
		},
	];

	const [active, setActive] = useState<number>(0);

	return (
		<div className="max-h-[4.4rem] rounded-t-xl border-t border-customOrange bg-primary-foreground  px-6">
			<ul className="relative flex">
				<span
					className={`z-40 bg-customOrange duration-500 ${Menus[active].dis} absolute -top-5 h-16 w-16 rounded-full border-4 border-gray-900`}
				>
					<span className=" absolute -left-[18px] top-4 h-3.5 w-3.5 rounded-tr-[11px] bg-transparent"></span>
					<span className=" absolute -right-[18px] top-4 h-3.5 w-3.5 rounded-tl-[11px] bg-transparent"></span>
				</span>
				{Menus.map((menu, i) => (
					<li key={i} className="w-16">
						<Link
							href={menu.link as `/${string}`}
							className="flex flex-col pt-6 text-center"
							onClick={() => setActive(i)}
						>
							<span
								className={`z-50 cursor-pointer text-xl duration-500 ${
									i === active && "-mt-6 "
								}`}
							>
								<menu.icon className="mx-auto" />
							</span>
							<span
								className={`${
									active === i
										? "translate-y-4 opacity-100 duration-700"
										: "translate-y-10 opacity-0"
								}`}
							>
								{menu.name}
							</span>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default MobileSideBar;
