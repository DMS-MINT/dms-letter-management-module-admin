import Link from "next/link";
import { type FC, useState } from "react";

import { motion } from "framer-motion";

export const FloatingDockMobile: FC<{
	items: { title: string; icon: React.ReactNode; href: string }[];
	className?: string;
}> = ({ items, className }) => {
	const [activeIndex, setActiveIndex] = useState<number | null>(null);

	return (
		<div
			className={`fixed bottom-0 left-0 w-full rounded-t-xl border-t-2 border-primary bg-muted px-4 ${className}`}
		>
			<div className="flex h-16 items-center justify-around">
				{items.map((item, index) => (
					<Link
						key={item.title}
						href={item.href as `/${string}`}
						className="relative flex h-12 w-12 flex-col items-center justify-center"
						onClick={() => setActiveIndex(index)}
					>
						<motion.div
							className={`flex h-12 w-12 items-center justify-center rounded-full transition-transform duration-300 ${
								index === activeIndex
									? "bg-primary text-white shadow-lg"
									: "bg-transparent text-primary"
							}`}
							initial={{ scale: 1, y: 0 }}
							animate={{
								scale: index === activeIndex ? 1.2 : 1,
								y: index === activeIndex ? -20 : 0,
							}}
							transition={{ type: "tween", duration: 0.1 }}
							// transition={{ type: "spring", stiffness: 100, damping: 10 }}
						>
							{item.icon}
						</motion.div>
						<motion.span
							className={`absolute bottom-0 mt-1 text-xs transition-opacity duration-300 ${
								index === activeIndex ? "opacity-100" : "opacity-0"
							}`}
							initial={{ opacity: 0, y: 10 }}
							animate={{
								opacity: index === activeIndex ? 1 : 0,
								y: index === activeIndex ? 0 : 10,
							}}
							transition={{ type: "tween", duration: 0.1 }} //faster opacity
							// transition={{ duration: 0.2 }} //faster opacity
						>
							{item.title}
						</motion.span>
					</Link>
				))}
			</div>
		</div>
	);
};
