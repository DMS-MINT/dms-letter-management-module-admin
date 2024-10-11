"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { MoveRight, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { useUpdateRefConfig } from "@/actions/Query/system-query/documentQuery";
import { Button } from "@/components/ui/button";
import DatePickerWithRange from "@/components/ui/custom/date-picker-with-range";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { type RefConfigType } from "@/types/SystemType";

const FormSchema = z.object({
	automatic_reference: z.boolean().default(true),
	manual_reference: z.boolean().default(false),
	date_option: z.string().optional(),
});

export function ReferenceNoForm() {
	const [isManual, setIsManual] = useState(false);
	const [selectedOption, setSelectedOption] = useState("");
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			automatic_reference: true,
			manual_reference: false,
		},
	});

	const { mutate: updateRefConfig } = useUpdateRefConfig();

	const onSubmit = (data: z.infer<typeof FormSchema>) => {
		toast.success("Reference Number Configuration Saved!");
		const value = {
			auto_ref_number_letters: data.automatic_reference ? true : false,
		};

		updateRefConfig(value as RefConfigType);
		// TODO the manual selected date range is not saved in the database
	};

	const handleAutomaticToggle = (value: boolean) => {
		form.setValue("automatic_reference", value);
		form.setValue("manual_reference", !value);
		setIsManual(!value);
	};

	const handleManualToggle = (value: boolean) => {
		form.setValue("manual_reference", value);
		form.setValue("automatic_reference", !value);
		setIsManual(value);
	};

	// Prevent form submission when selecting a date option
	const handleDateSelection = (option: string, e: React.MouseEvent) => {
		e.preventDefault(); // Prevent form submission
		setSelectedOption(option);
		form.setValue("date_option", option);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
				<fieldset className="rounded-lg border border-primary p-4">
					<legend className="-ml-1 px-1 text-sm font-medium">
						Reference Number Configuration
					</legend>

					<div className="space-y-4">
						{/* Automatic Reference Number Field */}
						<FormField
							control={form.control}
							name="automatic_reference"
							render={({ field }) => (
								<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
									<div className="space-y-0.5">
										<FormLabel>Automatic Reference Number</FormLabel>
										<FormDescription>
											Automatically generate a reference number for letters and
											documents.
										</FormDescription>
									</div>
									<FormControl>
										<Switch
											checked={field.value}
											onCheckedChange={(checked) =>
												handleAutomaticToggle(checked)
											}
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						{/* Manual Reference Number Field */}
						<FormField
							control={form.control}
							name="manual_reference"
							render={({ field }) => (
								<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
									<div className="space-y-0.5">
										<FormLabel>Manual Reference Number</FormLabel>
										<FormDescription>
											Manually generate a reference number for letters and
											documents.
										</FormDescription>
									</div>
									<FormControl>
										<Switch
											checked={field.value}
											onCheckedChange={(checked) => handleManualToggle(checked)}
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						{/* Date Range Selection (only visible when manual is selected) */}
						{isManual && (
							<>
								<p>
									Select a date range for manually configured reference numbers:
								</p>

								<div className="flex flex-col space-y-4 items-start">
									<div className="flex space-x-16 justify-center items-center">
										<Button
											className={`${selectedOption === "date-range" ? "bg-primary text-white" : ""} w-[260px] justify-start `}
											variant={"outline"}
											onClick={(e) => handleDateSelection("date-range", e)}
										>
											Select a Date Range
										</Button>

										{selectedOption === "date-range" && (
											<div className="flex gap-4 items-center">
												<MoveRight size={20} />
												<DatePickerWithRange className="[&>button]:w-[260px]" />
											</div>
										)}
									</div>

									<Button
										className={`${selectedOption === "annual" ? "bg-primary text-white" : ""} w-[260px] `}
										variant={"outline"}
										onClick={(e) => handleDateSelection("annual", e)}
									>
										Annually Starting From This Date
									</Button>

									<Button
										className={`${selectedOption === "month" ? "bg-primary text-white" : ""} w-[260px] `}
										variant={"outline"}
										onClick={(e) => handleDateSelection("month", e)}
									>
										This Month Starting From This Date
									</Button>

									<Button
										className={`${selectedOption === "week" ? "bg-primary text-white" : ""}  w-[260px] `}
										variant={"outline"}
										onClick={(e) => handleDateSelection("week", e)}
									>
										This Week Starting From This Date
									</Button>
								</div>
							</>
						)}
					</div>
					<div className="my-4 flex justify-end w-full">
						<Button
							type="submit"
							size={"sm"}
							className="flex gap-2 items-center"
						>
							<Send size={20} />
							Submit
						</Button>
					</div>
				</fieldset>
			</form>
		</Form>
	);
}
