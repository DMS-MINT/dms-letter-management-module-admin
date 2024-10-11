"use client";

import { useRouter } from "next/navigation";

import { CircleX } from "lucide-react";

import { Button } from "@/components/ui/button";

const ErrorPage = ({ error, reset }: { error: Error; reset: () => void }) => {
	const router = useRouter();
	return (
		<div className="min-h-screen flex flex-col items-center justify-center  text-center p-4">
			<CircleX className="text-red-500 mb-4 h-16 w-16" />
			<h1 className="text-3xl font-bold text-red-600 mb-4">
				Something went wrong
			</h1>
			<p className=" mb-6">
				Oops! It seems there an issue:{" "}
				<span className="font-semibold text-primary">{error.message}</span>
			</p>
			<div className="flex  gap-4">
				<Button onClick={reset}>Try Again</Button>
				<Button onClick={() => router.push("/")} variant={"outline"}>
					Go Back Home
				</Button>
			</div>
		</div>
	);
};

export default ErrorPage;
