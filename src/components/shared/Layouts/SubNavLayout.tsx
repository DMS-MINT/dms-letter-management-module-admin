"use client";

import { type ElementType, useState } from "react";

import { ChevronsLeft, ChevronsRight } from "lucide-react";
import useMedia from "use-media";

import { SmallSideNav } from "@/components/shared/Navigations/SmallSideNav";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface LayoutProps {
	defaultLayout: number[] | undefined;
	defaultCollapsed?: boolean;
	navCollapsedSize: number;
	children: React.ReactNode;
	links: {
		title: string;
		label: string;
		icon: ElementType;
		variant: string;
	}[];
	separatorAfter?: number;
	description?: string;
	descIcon?: React.ReactNode;
}

export function SubNavLayout({
	defaultLayout = [265, 440, 655],
	defaultCollapsed = false,
	navCollapsedSize,
	children,
	links,
	separatorAfter = 5,
	description,
	descIcon,
}: LayoutProps) {
	const isMobile = useMedia({ maxWidth: "767px" });
	const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed || !isMobile);

	// Toggle collapse/expand state
	const toggleCollapse = () => {
		setIsCollapsed((prev) => !prev);
		document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(!isCollapsed)}`;
	};
	// Handle link click
	return (
		<TooltipProvider delayDuration={0}>
			<ResizablePanelGroup
				direction="horizontal"
				onLayout={(sizes: number[]) => {
					document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
				}}
				className="h-screen items-stretch"
			>
				<ResizablePanel
					defaultSize={defaultLayout[0]}
					collapsedSize={navCollapsedSize}
					collapsible={true}
					minSize={10}
					maxSize={20}
					className={cn(
						isCollapsed &&
							"max-w-[50px] transition-all duration-300 ease-in-out"
					)}
				>
					{/* Toggle Button */}
					<div className="flex items-center justify-center">
						<div
							className={cn(
								"flex h-[44px] items-center justify-center",
								isCollapsed || isMobile ? "hidden" : "px-2"
							)}
						>
							<span className="text-xs font-bold text-center flex gap-2">
								{descIcon && descIcon}
								{description}
							</span>
						</div>

						<button
							onClick={toggleCollapse}
							className={cn(
								"p-2 flex items-center justify-center",
								isCollapsed ? "w-full" : ""
							)}
						>
							{isCollapsed ? (
								<ChevronsRight size={20} className="text-primary" />
							) : (
								<ChevronsLeft size={20} className="text-primary" />
							)}
						</button>
					</div>
					<Separator />
					<SmallSideNav
						isCollapsed={isCollapsed}
						links={links as any}
						separatorAfter={separatorAfter}
					/>
				</ResizablePanel>
				<ResizableHandle withHandle />
				<ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
					<div className="flex flex-col gap-4 overflow-y-auto p-1">
						{children}
					</div>
				</ResizablePanel>
			</ResizablePanelGroup>
		</TooltipProvider>
	);
}

export default SubNavLayout;
