"use client";

import { useState } from "react";

import { Layers2 } from "lucide-react";

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";

const FloatingButton = () => {
	const [open, setOpen] = useState(false);

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<button
				className="fixed bottom-[5.3rem] right-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-lg hover:bg-primary/60 focus:outline-none focus:ring-2 focus:ring-primary md:bottom-4"
				onClick={() => setOpen(true)}
			>
				<span>
					<Layers2 />
				</span>
			</button>

			<SheetContent side="top">
				<SheetHeader>
					<div className="flex flex-col gap-1">
						<SheetTitle>settings</SheetTitle>
						<SheetDescription>settings</SheetDescription>
					</div>
				</SheetHeader>
				Hello world
			</SheetContent>
		</Sheet>
	);
};

export default FloatingButton;
