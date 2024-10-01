"use client";

// Import useState
import Link from "next/link";
import React, { useState } from "react";

import { type LucideIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface NavProps {
	isCollapsed: boolean;
	links: {
		title: string;
		label?: string;
		icon: LucideIcon;
		href: string; // Add href property for routing
	}[];
	separatorAfter?: number; // Add an optional prop for the separator
}

export function SmallSideNav({
	isCollapsed,
	links,
	separatorAfter = 5,
}: NavProps) {
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null); // Initialize state

	return (
		<div
			data-collapsed={isCollapsed}
			className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
		>
			<nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
				{links.map((link, index) => {
					const isSelected = selectedIndex === index; // Check if the link is selected
					const variant = isSelected ? "default" : "ghost"; // Set variant based on selection

					return (
						<React.Fragment key={index}>
							{index === separatorAfter && <Separator />}
							{isCollapsed ? (
								<Tooltip delayDuration={0}>
									<TooltipTrigger asChild>
										<Link
											href={link.href as `/${string}`}
											className={cn(
												buttonVariants({ variant, size: "icon" }),
												"h-9 w-9",
												variant === "default" &&
													"dark:bg-primary dark:text-white dark:hover:bg-muted dark:hover:text-white"
											)}
											onClick={() => setSelectedIndex(index)} // Set the selected index on click
										>
											<link.icon className="h-4 w-4" />
											<span className="sr-only">{link.title}</span>
										</Link>
									</TooltipTrigger>
									<TooltipContent
										side="right"
										className="flex items-center gap-4"
									>
										{link.title}
										{link.label && (
											<span className="ml-auto">{link.label}</span>
										)}
									</TooltipContent>
								</Tooltip>
							) : (
								<Link
									href={link.href as `/${string}`}
									className={cn(
										buttonVariants({ variant, size: "sm" }),
										variant === "default" &&
											"dark:bg-primary dark:text-white dark:hover:bg-muted dark:hover:text-white",
										"justify-start"
									)}
									onClick={() => setSelectedIndex(index)} // Set the selected index on click
								>
									<link.icon className="mr-2 h-4 w-4" />
									{link.title}
									{link.label && (
										<span
											className={cn(
												"ml-auto",
												variant === "default" &&
													"text-background dark:text-white"
											)}
										>
											{link.label}
										</span>
									)}
								</Link>
							)}
						</React.Fragment>
					);
				})}
			</nav>
		</div>
	);
}
