"use client";

import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import {
	useAddOrganization,
	useUpdateOrganization,
} from "@/actions/Query/organization-query/organizationQuery";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
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
import {
	type TenantDataType,
	type TenantListType,
	type TenantToUpdateType,
} from "@/types/TenantType";

export function OrganizationForm({
	domainValue,
	lounchScreen = true,
	editOrganization = false,
	dataToEdit = undefined,
}: {
	domainValue?: string;
	lounchScreen?: boolean;
	editOrganization?: boolean;
	dataToEdit?: TenantListType;
}) {
	const t = useTranslations("organizationForm");
	const [file, setFile] = useState<File | null>(null);
	const [domain, setDomain] = useState<string | null>("");
	const { mutate: addOrganizationMutation } = useAddOrganization();
	const { mutate: updateOrganizationMutation } = useUpdateOrganization();

	// Validation schema using zod
	const organizationFormSchema = z.object({
		name_en: z.string().min(2, {
			message: t("fields.organizationNameEn.error"),
		}),
		name_am: z.string().min(2, {
			message: t("fields.organizationNameEn.error"),
		}),
		bio: z.string().optional(),
		contact_phone: z.union([
			z
				.string()
				.regex(/^\d*$/, "Phone number must be a numeric value")
				.transform((val) => (val === "" ? "" : Number(val))),
			z.literal(""),
		]),
		contact_email: z
			.string()
			.email({ message: t("fields.contactEmail.error") }),
		address: z.object({
			city_en: z.string().min(2, { message: t("fields.address.error") }),
			city_am: z.string().min(2, { message: t("fields.address.error") }),
		}),
		postal_code: z.union([
			z
				.string()
				.regex(/^\d*$/, "Postal code must be numeric")
				.transform((val) => (val === "" ? 0 : Number(val))),
			z.number(),
		]),
		tenant_slug: z.string().min(2, { message: t("fields.domain.error") }),
		logo: z.instanceof(File).optional(),
	});

	useEffect(() => {
		if (domainValue) {
			setDomain(domainValue);
		}
	}, [domainValue]);

	type OrganizationFormValues = z.infer<typeof organizationFormSchema>;

	const form = useForm<OrganizationFormValues>({
		resolver: zodResolver(organizationFormSchema),
		defaultValues: {
			name_en: dataToEdit?.name_en || "",
			name_am: dataToEdit?.name_am || "",
			bio: dataToEdit?.tenant_profile?.bio || "",
			contact_phone: dataToEdit?.tenant_profile?.contact_phone || 0,
			contact_email: dataToEdit?.tenant_profile?.contact_email || "",
			address: {
				city_en: dataToEdit?.tenant_profile.address?.city_en || "",
				city_am: dataToEdit?.tenant_profile.address?.city_am || "",
			},
			postal_code: dataToEdit?.tenant_profile.postal_code || 0,
			tenant_slug: domain || dataToEdit?.slug || "",
			logo: undefined,
		},
		mode: "onChange",
	});

	useEffect(() => {
		if (domain) {
			form.setValue("tenant_slug", domain);
		}
	}, [domain, form]);
	const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files?.[0]) {
			setFile(e.target.files[0]);
		}
	};
	function onSubmit(data: OrganizationFormValues) {
		// Destructure the necessary properties from data
		const {
			contact_phone,
			name_en,
			name_am,
			tenant_slug,
			postal_code,
			address,
			bio,
			contact_email,
		} = data;

		const contact_phones = Number(contact_phone);

		const TenantData = {
			id: dataToEdit?.id,
			name_en: name_en,
			name_am: name_am,
			slug: tenant_slug,
			tenant_profile: {
				bio: bio,
				contact_phone: contact_phones,
				contact_email: contact_email,
				address: address,
				postal_code: postal_code,
			},
		};
		const NewTenantData = {
			name_en: name_en,
			name_am: name_am,
			tenant_slug: tenant_slug,
			bio: bio,
			contact_phone: contact_phones,
			contact_email: contact_email,
			address: address,
			postal_code: postal_code,
		};

		if (editOrganization) {
			updateOrganizationMutation(TenantData as TenantToUpdateType);
			toast.success("Organization Edited!");
		} else {
			console.log("sendig data", NewTenantData);
			addOrganizationMutation(NewTenantData as TenantDataType);
			toast.success("Organization Created!");
		}
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
											<Input
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
												type="number"
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
								name="tenant_slug"
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t("fields.domain.label")}</FormLabel>
										<FormControl>
											<Input
												placeholder={t("fields.domain.placeholder")}
												{...field}
												disabled={!!domain}
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
