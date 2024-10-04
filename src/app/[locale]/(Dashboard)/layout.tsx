import type { ReactNode } from "react";

import { useTranslations } from "next-intl";

import FloatingButton from "@/components/shared/Button/FloatingButton";
import ResponsiveSidebar from "@/components/shared/Navigations/ResponsiveSideBar";
import TopNav from "@/components/shared/Navigations/TopNav";
import { GeneralShell } from "@/components/shared/Wrappers/GeneralShell";

// Import the new sidebar component

export default function DashboardLayout({ children }: { children: ReactNode }) {
	return <DashboardLayoutContent>{children}</DashboardLayoutContent>;
}

function DashboardLayoutContent({ children }: { children: ReactNode }) {
	const t = useTranslations();
	return (
		<GeneralShell>
			<div className="flex flex-col h-screen md:flex-row">
				<ResponsiveSidebar />
				<main className="flex w-full flex-col md:w-[92%] lg:w-[84%] xl:w-[86%]">
					{/* Top Nav */}
					<TopNav />

					{/* Main Content */}
					<>
						<div className="flex h-screen flex-col gap-4 !overflow-y-auto p-1">
							{children}
						</div>
					</>
					{/* floating button */}
					<FloatingButton />
				</main>
			</div>
		</GeneralShell>
	);
}
