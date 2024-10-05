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

export function AddUserForm() {
	const t = useTranslations("userForm");

	// Validation schema using Zod
	const userFormSchema = z.object({
		first_name_en: z.string().min(2, {
			message: t("fields.first_name_en.error"),
		}),
		middle_name_en: z.string().min(2, {
			message: t("fields.middle_name_en.error"),
		}),
		last_name_en: z.string().min(2, {
			message: t("fields.last_name_en.error"),
		}),
		first_name_am: z.string().min(2, {
			message: t("fields.first_name_am.error"),
		}),
		middle_name_am: z.string().min(2, {
			message: t("fields.middle_name_am.error"),
		}),
		last_name_am: z.string().min(2, {
			message: t("fields.last_name_am.error"),
		}),
		job_title: z.string().optional(),
		department_name: z.string().optional(),
		phone_number: z
			.string()
			.refine(isValidPhoneNumber, {
				message: t("fields.phone_number.error"),
			})
			.or(z.literal("")),
		email: z.string().email({ message: t("fields.email.error") }),
	});

	// TypeScript types inferred from the schema
	type UserFormValues = z.infer<typeof userFormSchema>;

	const form = useForm<UserFormValues>({
		resolver: zodResolver(userFormSchema),
		defaultValues: {
			first_name_en: "",
			middle_name_en: "",
			last_name_en: "",
			first_name_am: "",
			middle_name_am: "",
			last_name_am: "",
			job_title: "",
			department_name: "",
			phone_number: "",
			email: "",
		},
		mode: "onChange",
	});

	function onSubmit(data: UserFormValues) {
		toast.success("Form Submitted!");
		console.log("data", data);
	}

	return (
		<div id="userForm">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3 rounded-lg border p-4">
						<legend className="-ml-1 px-1 text-sm font-medium">Name</legend>

						<FormField
							control={form.control}
							name="first_name_en"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("fields.first_name_en.label")}</FormLabel>
									<FormControl>
										<Input
											placeholder={t("fields.first_name_en.placeholder")}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="middle_name_en"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("fields.middle_name_en.label")}</FormLabel>
									<FormControl>
										<Input
											placeholder={t("fields.middle_name_en.placeholder")}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="last_name_en"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("fields.last_name_en.label")}</FormLabel>
									<FormControl>
										<Input
											placeholder={t("fields.last_name_en.placeholder")}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="first_name_am"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("fields.first_name_am.label")}</FormLabel>
									<FormControl>
										<Input
											placeholder={t("fields.first_name_am.placeholder")}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="middle_name_am"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("fields.middle_name_am.label")}</FormLabel>
									<FormControl>
										<Input
											placeholder={t("fields.middle_name_am.placeholder")}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="last_name_am"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("fields.last_name_am.label")}</FormLabel>
									<FormControl>
										<Input
											placeholder={t("fields.last_name_am.placeholder")}
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
							Organization
						</legend>
						<FormField
							control={form.control}
							name="job_title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("fields.job_title.label")}</FormLabel>
									<FormControl>
										<Input
											placeholder={t("fields.job_title.placeholder")}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="department_name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("fields.department_name.label")}</FormLabel>
									<FormControl>
										<Input
											placeholder={t("fields.department_name.placeholder")}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</fieldset>
					<fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg border p-4">
						<legend className="-ml-1 px-1 text-sm font-medium">Address</legend>

						<FormField
							control={form.control}
							name="phone_number"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("fields.phone_number.label")}</FormLabel>
									<FormControl>
										<PhoneInput
											placeholder={t("fields.phone_number.placeholder")}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("fields.email.label")}</FormLabel>
									<FormControl>
										<Input
											type="email"
											placeholder={t("fields.email.placeholder")}
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
