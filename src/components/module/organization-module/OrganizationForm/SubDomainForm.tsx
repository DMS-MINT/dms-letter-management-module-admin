"use client";

import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert, CircleCheck, CircleX, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import { useAppDispatch } from "@/hooks/storehooks";
import { SetLoading } from "@/lib/store/redux/loadersSlice";

export function SubDomainForm({
	onDomainSubmit,
}: {
	onDomainSubmit: (value: string) => void;
}) {
	const t = useTranslations("SubDomainForm");
	const [iconCheck, setIconCheck] = useState(false);
	const dispatch = useAppDispatch();

	const subdomainFormSchema = z.object({
		domain: z
			.string()
			.min(2, { message: t("domainError") })
			.regex(/^[a-z]+$/, { message: t("domainPatternError") }),
		allowAdminChange: z.boolean(),
	});

	type SubDomainFormValues = z.infer<typeof subdomainFormSchema>;

	const form = useForm<SubDomainFormValues>({
		resolver: zodResolver(subdomainFormSchema),
		defaultValues: {
			domain: "",
			allowAdminChange: false,
		},
		mode: "onChange",
	});

	useEffect(() => {
		if (form.formState.errors.domain) {
			setIconCheck(false);
		} else {
			setIconCheck(true);
		}
	}, [form.formState.errors]);

	function onSubmit(data: SubDomainFormValues) {
		dispatch(SetLoading(true));

		setTimeout(() => {
			dispatch(SetLoading(false));
			onDomainSubmit(data.domain);
		}, 1000);
		toast.success(t("successMessage"));
	}

	return (
		<div id="subdomainForm">
			<Card className="relative">
				<div className="absolute -top-1 -left-3 ">
					<span className="flex items-center rounded-full bg-primary w-6 h-6 justify-center text-white text-sm">
						1
					</span>
				</div>
				<CardHeader>
					<CardTitle>{t("title")}</CardTitle>
					<CardDescription>{t("description")}</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="flex flex-col gap-4"
						>
							<FormField
								control={form.control}
								name="domain"
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t("enterDomain")}</FormLabel>
										<FormControl>
											<div className="flex items-center border rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:border-primary">
												<div className="flex-grow flex items-center">
													<Input
														type="text"
														id="domain"
														placeholder={t("domainPlaceholder")}
														{...field}
														className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
													/>
													<span className=" pr-3 text-sm">
														{t("domainSuffix")}
													</span>
													<span className=" pr-3">
														{iconCheck ? (
															<CircleCheck className="text-green-500" />
														) : form.formState.errors.domain ? (
															<CircleX className="text-red-500" />
														) : (
															<CircleAlert />
														)}
													</span>
												</div>
											</div>
										</FormControl>
										<FormDescription>
											{t("domainFormDescription")}
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="allowAdminChange"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<div className="flex items-center space-x-2">
												<Checkbox
													id="include"
													checked={field.value}
													onCheckedChange={field.onChange}
												/>
												<label
													htmlFor="include"
													className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
												>
													{t("allowAdminChange")}
												</label>
											</div>
										</FormControl>
									</FormItem>
								)}
							/>

							<CardFooter className="border-t flex justify-end px-2 py-4">
								<Button
									type="submit"
									size={"sm"}
									className="flex items-center gap-2"
								>
									{t("submitButton")}
									<Send size={20} />
								</Button>
							</CardFooter>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
