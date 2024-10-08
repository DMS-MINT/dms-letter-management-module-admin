"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eraser, Save } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/ui/custom/phone-input";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function DepartmentForm() {
	const t = useTranslations("DepartmentForm");
	// Define the validation schema using Zod
	const departmentFormSchema = z.object({
		department_name_en: z
			.string()
			.min(2, { message: t("fields.departmentNameEn.error") }),
		department_name_am: z
			.string()
			.min(2, { message: t("fields.departmentNameAm.error") }),
		abbreviation_en: z
			.string()
			.min(1, { message: t("fields.abbreviationEn.error") }),
		abbreviation_am: z
			.string()
			.min(1, { message: t("fields.abbreviationAm.error") }),
		description: z.string().min(5, { message: t("fields.description.error") }),
		contact_phone: z
			.string()
			.refine(isValidPhoneNumber, {
				message: t("fields.contactPhone.error"),
			})
			.or(z.literal("")),
		contact_email: z
			.string()
			.email({ message: t("fields.contactEmail.error") }),
	});

	// TypeScript type inferred from the Zod schema
	type DepartmentFormValues = z.infer<typeof departmentFormSchema>;

	const form = useForm<DepartmentFormValues>({
		resolver: zodResolver(departmentFormSchema),
		defaultValues: {
			department_name_en: "",
			department_name_am: "",
			abbreviation_en: "",
			abbreviation_am: "",
			description: "",
			contact_phone: "",
			contact_email: "",
		},
		mode: "onChange",
	});

	function onSubmit(data: DepartmentFormValues) {
		toast.success("Department Created!");
		console.log("data", data);
	}

	return (
		<div id="departmentForm">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg border p-4">
						<legend className="-ml-1 px-1 text-sm font-medium">
							{t("depratmentInfo")}
						</legend>

						<FormField
							control={form.control}
							name="department_name_en"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("fields.departmentNameEn.label")}</FormLabel>
									<FormControl>
										<Input
											placeholder={t("fields.departmentNameEn.placeholder")}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="department_name_am"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("fields.departmentNameAm.label")}</FormLabel>
									<FormControl>
										<Input
											placeholder={t("fields.departmentNameAm.placeholder")}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="abbreviation_en"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("fields.abbreviationEn.label")}</FormLabel>
									<FormControl>
										<Input
											placeholder={t("fields.abbreviationEn.placeholder")}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="abbreviation_am"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("fields.abbreviationAm.label")}</FormLabel>
									<FormControl>
										<Input
											placeholder={t("fields.abbreviationAm.placeholder")}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("fields.description.label")}</FormLabel>
									<FormControl>
										<Textarea
											placeholder={t("fields.description.placeholder")}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</fieldset>

					<fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg border p-4">
						<legend className="-ml-1 px-1 text-sm font-medium">
							{t("contactInfo")}
						</legend>

						<FormField
							control={form.control}
							name="contact_phone"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("fields.contactPhone.label")}</FormLabel>
									<FormControl>
										<PhoneInput
											placeholder={t("fields.contactPhone.placeholder")}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="contact_email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("fields.contactEmail.label")}</FormLabel>
									<FormControl>
										<Input
											type="email"
											placeholder={t("fields.contactEmail.placeholder")}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</fieldset>

					<div className="flex items-center justify-center gap-14">
						<Button
							type="reset"
							variant={"outline"}
							onClick={() => form.reset()}
							className="flex items-center gap-2"
						>
							<Eraser size={20} />
							{t("button.clear")}
						</Button>
						<Button type="submit" className="flex items-center gap-2">
							<Save size={20} />
							{t("button.submit")}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
