"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import { toast } from "sonner";
import { z } from "zod";

import { useAddOrganization } from "@/actions/Query/organization-query/organizationQuery";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
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
import { Textarea } from "@/components/ui/textarea";
import { CityData } from "@/constants/data/cityData";
import { type OrganizationType } from "@/types/OrganizationType";

export function OrganizationForm({
	lounchScreen = true,
	editOrganization = false,
	dataToEdit = undefined,
}: {
	lounchScreen?: boolean;
	editOrganization?: boolean;
	dataToEdit?: OrganizationType;
}) {
	const t = useTranslations("organizationForm");
	const [file, setFile] = useState<File | null>(null);

	const { mutate: addOrganizationMutation } = useAddOrganization();

	// Validation schema using zod
	const organizationFormSchema = z.object({
		name_en: z.string().min(2, {
			message: t("fields.organizationNameEn.error"),
		}),
		name_am: z.string().optional(),
		bio: z.string().optional(),
		contact_phone: z
			.string()
			.refine(isValidPhoneNumber, {
				message: t("fields.contactPhone.error"),
			})
			.or(z.literal("")),
		contact_email: z
			.string()
			.email({ message: t("fields.contactEmail.error") }),
		address: z.object({
			city_en: z.string().min(2, { message: t("fields.address.error") }),
			city_am: z.string().min(2, { message: t("fields.address.error") }),
		}),
		postal_code: z.string().optional(),
		organization_slug: z.string().min(2, { message: t("fields.domain.error") }),
		logo: z.instanceof(File).optional(),
	});

	// TypeScript types inferred from the schema
	type OrganizationFormValues = z.infer<typeof organizationFormSchema>;

	const form = useForm<OrganizationFormValues>({
		resolver: zodResolver(organizationFormSchema),
		defaultValues: {
			name_en: dataToEdit?.name_en || "",
			name_am: dataToEdit?.name_am || "",
			bio: dataToEdit?.bio || "",
			contact_phone: dataToEdit?.contact_phone || "",
			contact_email: dataToEdit?.contact_email || "",
			address: {
				city_en: dataToEdit?.address?.city_en || "",
				city_am: dataToEdit?.address?.city_am || "",
			},
			postal_code: dataToEdit?.postal_code || "",
			organization_slug: dataToEdit?.organization_slug || "",
			logo: undefined,
		},
		mode: "onChange",
	});

	const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files?.[0]) {
			setFile(e.target.files[0]);
		}
	};

	function onSubmit(data: OrganizationFormValues) {
		toast.success("Organization Created!");

		console.log("data", data);
		addOrganizationMutation(data as OrganizationType);
	}

	return (
		<div id="organizationForm">
			<Card className="relative">
				{lounchScreen && (
					<div className="absolute -top-1 -left-3 ">
						<span className="flex items-center rounded-full bg-primary w-6 h-6 justify-center text-white text-sm">
							2
						</span>
					</div>
				)}
				<CardHeader>
					<CardTitle>{t("title")}</CardTitle>
					<CardDescription>{t("description")}</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							<FormField
								control={form.control}
								name="name_en"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											{t("fields.organizationNameEn.label")}
										</FormLabel>
										<FormControl>
											<Input
												placeholder={t("fields.organizationNameEn.placeholder")}
												{...field}
											/>
										</FormControl>
										<FormDescription>
											{t("fields.organizationNameEn.description")}
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="name_am"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											{t("fields.organizationNameAm.label")}
										</FormLabel>
										<FormControl>
											<Input
												placeholder={t("fields.organizationNameAm.placeholder")}
												{...field}
											/>
										</FormControl>
										<FormDescription>
											{t("fields.organizationNameAm.description")}
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="bio"
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t("fields.description.label")}</FormLabel>
										<FormControl>
											<Textarea
												placeholder={t("fields.description.placeholder")}
												{...field}
											/>
										</FormControl>
										<FormDescription>
											{t("fields.description.description")}
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="contact_phone"
								render={({ field }) => (
									<FormItem className="flex flex-col items-start">
										<FormLabel className="text-left">
											{t("fields.contactPhone.label")}
										</FormLabel>
										<FormControl className="w-full">
											<PhoneInput
												placeholder={t("fields.contactPhone.placeholder")}
												{...field}
											/>
										</FormControl>
										<FormDescription className="text-left">
											{t("fields.contactPhone.description")}
										</FormDescription>
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
										<FormDescription>
											{t("fields.contactEmail.description")}
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* <FormField
								control={form.control}
								name="address"
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t("fields.address.label")}</FormLabel>
										<FormControl>
											<Select>
												<SelectTrigger
													id="model"
													className="items-start [&_[data-description]]:hidden"
												>
													<SelectValue
														placeholder={t("fields.address.placeholder")}
													/>
												</SelectTrigger>
												<SelectContent>
													{CityData.map((city) => (
														<SelectItem key={city.city_en} value={city.city_en, city.city_am}>
															<div className="flex items-start gap-3 text-muted-foreground">
																<span
																	className={`size-5 fi fi-${city.conutrycode}`}
																></span>{" "}
																<div className="grid gap-0.5">
																	<p>
																		{city.city_en} /
																		<span className="font-medium text-foreground">
																			{" "}
																			{city.city_am}{" "}
																		</span>
																	</p>
																	<p className="text-xs" data-description>
																		Country: {city.country}
																	</p>
																</div>
															</div>
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
										<FormDescription>
											{t("fields.address.description")}
										</FormDescription>
									</FormItem>
								)}
							/> */}
							<FormField
								control={form.control}
								name="address"
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t("fields.address.label")}</FormLabel>
										<FormControl>
											<Select
												onValueChange={(value) => {
													const selectedCity = CityData.find(
														(city) => city.city_en === value
													);
													if (selectedCity) {
														// Set the city_en and city_am in the form
														form.setValue(
															"address.city_en",
															selectedCity.city_en
														);
														form.setValue(
															"address.city_am",
															selectedCity.city_am
														);
													}
												}}
											>
												<SelectTrigger
													id="model"
													className="items-start [&_[data-description]]:hidden"
												>
													<SelectValue
														placeholder={t("fields.address.placeholder")}
													/>
												</SelectTrigger>
												<SelectContent>
													{CityData.map((city) => (
														<SelectItem key={city.city_en} value={city.city_en}>
															<div className="flex items-start gap-3 text-muted-foreground">
																<span
																	className={`size-5 fi fi-${city.countrycode}`}
																></span>
																<div className="grid gap-0.5">
																	<p>
																		{city.city_en} /
																		<span className="font-medium text-foreground">
																			{" "}
																			{city.city_am}{" "}
																		</span>
																	</p>
																	<p className="text-xs" data-description>
																		Country: {city.country}
																	</p>
																</div>
															</div>
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
										<FormDescription>
											{t("fields.address.description")}
										</FormDescription>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="postal_code"
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t("fields.postalCode.label")}</FormLabel>
										<FormControl>
											<Input
												placeholder={t("fields.postalCode.placeholder")}
												{...field}
											/>
										</FormControl>
										<FormMessage />
										<FormDescription>
											{t("fields.postalCode.description")}
										</FormDescription>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="organization_slug"
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t("fields.domain.label")}</FormLabel>
										<FormControl>
											<Input
												placeholder={t("fields.domain.placeholder")}
												{...field}
											/>
										</FormControl>
										<FormDescription>
											{t("fields.domain.description")}
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormItem>
								<FormLabel>{t("fields.logo.label")}</FormLabel>
								<FormControl>
									<Input type="file" onChange={handleLogoChange} />
								</FormControl>
							</FormItem>

							<Button type="submit">{t("button.submit")}</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
