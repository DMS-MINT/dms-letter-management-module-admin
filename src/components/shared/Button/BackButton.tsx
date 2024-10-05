import { useRouter } from "next/navigation";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

interface BackButtonProps {
	label: string; // Text to display
	href: string; // Link to navigate
	className?: string; // Optional custom styles for the wrapper
	left?: boolean; // Whether to place the button on the left side
}

const BackButton = ({
	label,
	href,
	className = "",
	left = true,
}: BackButtonProps) => {
	const router = useRouter();

	return (
		<div
			className={`mb-5 ml-2 flex ${!left && "flex-row-reverse"} cursor-pointer gap-4 bg-muted p-1 px-3 rounded-lg items-center ${className}`}
			onClick={() => router.push(href as `/${string}`)}
		>
			<Button variant="outline" size="icon" className="h-7 w-7">
				{left ? (
					<ChevronLeft className="h-4 w-4 text-customOrange" />
				) : (
					<ChevronRight className="h-4 w-4 text-customOrange" />
				)}
				<span className="sr-only">Back</span>
			</Button>
			<h1 className="flex-1 shrink-0 whitespace-nowrap text-sm font-semibold tracking-tight  sm:grow-0">
				{label}
			</h1>
		</div>
	);
};

export default BackButton;
