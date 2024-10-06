"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { MoveRight, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const FormSchema = z.object({
	automatic_date: z.boolean().default(true),
	manual_date: z.boolean().default(false),
	date_option: z.string().optional(),
});

export function DateConfigForm() {
	const [isManual, setIsManual] = useState(false);
	const [selectedOption, setSelectedOption] = useState("");
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			automatic_date: true,
			manual_date: false,
		},
	});

	const onSubmit = (data: z.infer<typeof FormSchema>) => {
		toast.success("Date  Configuration Saved!");
		console.log(data);
	};

	const handleAutomaticToggle = (value: boolean) => {
		form.setValue("automatic_date", value);
		form.setValue("manual_date", !value);
		setIsManual(!value);
	};

	const handleManualToggle = (value: boolean) => {
		form.setValue("manual_date", value);
		form.setValue("automatic_date", !value);
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
						Date Configuration
					</legend>

					<div className="space-y-4">
						{/* Automatic Date  Field */}
						<FormField
							control={form.control}
							name="automatic_date"
							render={({ field }) => (
								<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
									<div className="space-y-0.5">
										<FormLabel>Automatic Date </FormLabel>
										<FormDescription>
											Automatically generate a Date for letters and documents.
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

						{/* Manual Date  Field */}
						<FormField
							control={form.control}
							name="manual_date"
							render={({ field }) => (
								<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
									<div className="space-y-0.5">
										<FormLabel>Manual Date </FormLabel>
										<FormDescription>
											Manually generate a Date for letters and documents.
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
							<div className="py-6 px-3">
								<Label htmlFor="" className="">
									Select a date range for manually configured Date to be applied
									:
								</Label>

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
							</div>
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
