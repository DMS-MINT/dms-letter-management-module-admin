"use client";

import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eraser, Save } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import { toast } from "sonner";
import { z } from "zod";

import { useFetchDepartments } from "@/actions/Query/organization-query/departmentQuery";
import { useFetchJobtitles } from "@/actions/Query/organization-query/jobTitleQuery";
import { useUpdateUser } from "@/actions/Query/user-query/userQuery";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { PhoneInput } from "@/components/ui/custom/phone-input";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	type DepartmentTypeToUpdate,
	type JobTitleListType,
} from "@/types/DepartmentType";
import { type UserListType } from "@/types/user/UserType";

export function UpdateUserForm({ data }: { data: UserListType }) {
	const t = useTranslations("userForm");
	const [departmentData, setDepartmentData] = useState<
		DepartmentTypeToUpdate[]
	>([]); // Properly typed array
	const [jobTitleData, setJobTitleData] = useState<JobTitleListType[]>([]);
	const UserRole = [
		{
			id: "admin",
			label: t("admin"),
			description: t("adminDesc"),
		},
		{
			id: "record_officer",
			label: t("record_officer"),
			description: t("record_officerDesc"),
		},
	] as const;
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
		department: z.string().optional(),
		phone_number: z
			.string()
			.refine(isValidPhoneNumber, {
				message: t("fields.phone_number.error"),
			})
			.or(z.literal("")),
		email: z.string().email({ message: t("fields.email.error") }),
		role: z.array(z.string()).refine((value) => value.some((item) => item), {
			message: "You have to select at least one item.",
		}),
		is_staff: z.boolean().optional(),
		is_superuser: z.boolean().optional(),
	});

	// TypeScript types inferred from the schema
	type UserFormValues = z.infer<typeof userFormSchema>;

	const form = useForm<UserFormValues>({
		resolver: zodResolver(userFormSchema),
		defaultValues: {
			first_name_en: data.first_name_am || "",
			middle_name_en: data.middle_name_am || "",
			last_name_en: data.last_name_am || "",
			first_name_am: data.first_name_en || "",
			middle_name_am: data.middle_name_en || "",
			last_name_am: data.last_name_en || "",
			job_title: data.job_title || "",
			department: data.department || "",
			phone_number: data.phone_number || "",
			email: data.email || "",
			role: [data.is_staff ? "record_officer" : "admin"],
			is_staff: data.is_staff || false,
			is_superuser: data.is_superuser || false,
		},
		mode: "onChange",
	});

	const { mutate: updateUserMutation } = useUpdateUser();
	const { data: departmentDataFetched } = useFetchDepartments();
	const { data: jobTitleDataFetched } = useFetchJobtitles();

	useEffect(() => {
		if (departmentDataFetched) {
			setDepartmentData(departmentDataFetched);
		}
		if (jobTitleDataFetched) {
			setJobTitleData(jobTitleDataFetched);
		}
	}, [departmentDataFetched, jobTitleDataFetched]);

	function onSubmit(data: UserFormValues) {
		toast.success("Form Submitted!");

		if (data.role.includes("admin")) {
			data.is_superuser = true;
		}
		if (data.role.includes("record_officer")) {
			data.is_staff = true;
		}
		const { role, ...userdata } = data;
		updateUserMutation(userdata as UserListType);
		console.log("User data", userdata);
	}

	return (
		<div id="userForm">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<div className="grid grid-cols-1 gap-4 lg:grid-cols-2 pt-2">
						<fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4  rounded-lg border p-4">
							<legend className="-ml-1 px-1 text-sm font-medium">
								{t("personalInfo")}
							</legend>

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
						<div>
							<fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg border p-4">
								<legend className="-ml-1 px-1 text-sm font-medium">
									{t("organizationInfo")}
								</legend>
								<FormField
									control={form.control}
									name="job_title"
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t("fields.job_title.label")}</FormLabel>
											<FormControl>
												<Select>
													<SelectTrigger
														id="model"
														className="items-start [&_[data-description]]:hidden"
													>
														<SelectValue
															placeholder={t("fields.job_title.placeholder")}
														/>
													</SelectTrigger>
													<SelectContent>
														{jobTitleData.map((job) => (
															<SelectItem key={job.id} value={job.id}>
																<div className="flex items-start gap-3 text-muted-foreground">
																	<div className="grid gap-0.5">
																		<p>
																			{job.title_en} /
																			<span
																				className="font-medium text-foreground"
																				data-description
																			>
																				{" "}
																				{job.title_am}{" "}
																			</span>
																		</p>
																	</div>
																</div>
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="department"
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t("fields.department_name.label")}</FormLabel>
											<FormControl>
												<Select>
													<SelectTrigger
														id="model"
														className="items-start [&_[data-description]]:hidden"
													>
														<SelectValue
															placeholder={t(
																"fields.department_name.placeholder"
															)}
														/>
													</SelectTrigger>
													<SelectContent>
														{departmentData.map((department) => (
															<SelectItem
																key={department.id}
																value={department.id}
															>
																<div className="flex items-start gap-3 text-muted-foreground">
																	<div className="grid gap-0.5">
																		<p>
																			{department.department_name_en} /
																			<span
																				className="font-medium text-foreground"
																				data-description
																			>
																				{" "}
																				{department.department_name_am}{" "}
																			</span>
																		</p>
																	</div>
																</div>
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</fieldset>
							<fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg border p-4">
								<legend className="-ml-1 px-1 text-sm font-medium">
									{t("addressInfo")}
								</legend>

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
						</div>
						<fieldset className="grid grid-cols-1 gap-4 rounded-lg border p-4">
							<legend className="-ml-1 px-1 text-sm font-medium">
								{t("role_permissions")}
							</legend>

							<FormField
								control={form.control}
								name="role"
								render={() => (
									<FormItem>
										<div className="mb-4">
											<FormLabel className="text-base">
												{t("fields.role.label")}
											</FormLabel>
											<FormDescription>
												{t("fields.role.description")}
											</FormDescription>
										</div>
										{UserRole.map((item) => (
											<FormField
												key={item.id}
												control={form.control}
												name="role"
												render={({ field }) => {
													return (
														<FormItem
															key={item.id}
															// className="flex flex-row items-start space-x-3 space-y-0"
															className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow"
														>
															<FormControl>
																<Checkbox
																	checked={field.value?.includes(item.id)}
																	onCheckedChange={(checked) => {
																		return checked
																			? field.onChange([
																					...field.value,
																					item.id,
																				])
																			: field.onChange(
																					field.value?.filter(
																						(value) => value !== item.id
																					)
																				);
																	}}
																/>
															</FormControl>
															<div className="space-y-1 leading-none">
																<FormLabel className="text-sm font-normal">
																	{item.label}
																</FormLabel>
																<FormDescription>
																	{item.description}{" "}
																</FormDescription>
															</div>
														</FormItem>
													);
												}}
											/>
										))}
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
								{t("button.submitUpdate")}
							</Button>
						</div>
					</div>
				</form>
			</Form>
		</div>
	);
}
