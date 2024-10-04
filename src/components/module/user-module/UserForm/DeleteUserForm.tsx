"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

// Example reasons for user deletion
const deletionReasons = [
	{ value: "inactivity", label: "Inactivity for a long period" },
	{ value: "violation", label: "Violation of terms of service" },
	{ value: "requested", label: "User requested deletion" },
	{ value: "security", label: "Security concerns" },
	{ value: "other", label: "Other reasons" },
];

export default function DeleteUserForm() {
	const [selectedReason, setSelectedReason] = useState("");
	const [otherReason, setOtherReason] = useState(""); // State for the 'other' input field

	const isOtherSelected = selectedReason === "other"; // Check if "Other" is selected

	return (
		<Card className="sm:col-span-2 m-4 border-2 border-dashed border-destructive">
			<CardHeader className="pb-3 mb-4">
				<CardTitle>Permanent Delete User Account</CardTitle>
				<CardDescription className="text-balance max-w-lg leading-relaxed">
					To delete this account, please provide a reason for doing so.
				</CardDescription>
			</CardHeader>

			<CardContent>
				<div className="grid gap-6">
					<div className="grid gap-3">
						<Label htmlFor="reason">Reason for Deletion</Label>
						<Select onValueChange={setSelectedReason}>
							<SelectTrigger id="reason" aria-label="Select reason">
								<SelectValue placeholder="Select reason" />
							</SelectTrigger>
							<SelectContent>
								{deletionReasons.map((reason) => (
									<SelectItem key={reason.value} value={reason.value}>
										{reason.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					{/* Conditionally render the input field for 'Other reasons' */}
					{isOtherSelected && (
						<div className="grid gap-3">
							<Label htmlFor="other-reason">Please specify other reason</Label>
							<Input
								id="other-reason"
								placeholder="Enter your reason"
								value={otherReason}
								onChange={(e) => setOtherReason(e.target.value)}
							/>
						</div>
					)}
				</div>
			</CardContent>

			<CardFooter>
				<Button
					variant={"destructive"}
					disabled={!selectedReason || (isOtherSelected && !otherReason)} // Disable if reason is not selected, or 'Other' is empty
				>
					Delete Account
				</Button>
			</CardFooter>
		</Card>
	);
}
