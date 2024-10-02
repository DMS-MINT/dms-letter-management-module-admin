"use client";

import { useRouter } from "next/navigation";

import { CircleUser, MoveUpRight } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/custom/modeToggle";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import LocaleSwitcher from "../DropDown/LocaleSwitcher";

const TopNav = () => {
	const router = useRouter();

	return (
		<nav className="sticky top-0 z-30 h-14 w-full bg-primary-foreground px-4 py-2 backdrop-blur-sm">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<div className="text-xl font-bold">DMS</div>
					<Badge
						className="text-lg font-bold text-primary flex items-center gap-2 hover:cursor-pointer"
						onClick={() => toast.success("Redirecting to frontend...")}
						variant={"outline"}
					>
						Frontend redirect <MoveUpRight size={15} />
					</Badge>
				</div>
				<div className="mr-0 flex items-center gap-2 md:mr-2">
					<LocaleSwitcher />
					<ModeToggle />

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="secondary" size="icon" className="rounded-full">
								<CircleUser className="h-5 w-5" />
								<span className="sr-only">Toggle user menu</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-56">
							<DropdownMenuLabel className="flex gap-2 text-sm text-customOrange">
								{/* <span>{userRole}:</span>
								<span>{user}</span> */}
								kebede
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem className="cursor-pointer">
								My Account
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem className="cursor-pointer">
								Settings
							</DropdownMenuItem>
							<DropdownMenuItem className="cursor-pointer">
								Support
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								onClick={() => {
									// logout();
									router.push("/auth/sign-in" as `/${string}`);
									toast.success("Logout... 👋🏾BYE!");
								}}
							>
								Logout
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</nav>
	);
};

export default TopNav;
