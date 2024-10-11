"use client";

import { useMedia } from "use-media";

// Import use-media hook
import DesktopSideBar from "./DesktopSideBar";
import { MobileNavigation } from "./MobileNavigation";

export default function ResponsiveSidebar() {
	// Use use-media to determine if the screen width is less than 768px
	const isMobile = useMedia({ maxWidth: "767px" });

	return (
		<aside
			className={`${
				isMobile
					? "fixed bottom-0 w-full"
					: "h-full w-[8%] border-r bg-primary-foreground lg:w-[14%] xl:w-[16%]"
			}`}
		>
			{isMobile ? <MobileNavigation /> : <DesktopSideBar />}
		</aside>
	);
}
