import { useRouter } from "next/navigation";

import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

interface BackButtonProps {
	label: string; // Text to display
	href: string; // Link to navigate
	className?: string; // Optional custom styles for the wrapper
}

const BackButton = ({ label, href, className = "" }: BackButtonProps) => {
	const router = useRouter();

	return (
		<div
			className={`mb-5 ml-2 flex cursor-pointer gap-4 bg-muted/20 items-center ${className}`}
			onClick={() => router.push(href as `/${string}`)}
		>
			<Button variant="outline" size="icon" className="h-7 w-7">
				<ChevronLeft className="h-4 w-4 text-customOrange" />
				<span className="sr-only">Back</span>
			</Button>
			<h1 className="flex-1 shrink-0 whitespace-nowrap text-sm font-semibold tracking-tight text-primary sm:grow-0">
				{label}
			</h1>
		</div>
	);
};

export default BackButton;
