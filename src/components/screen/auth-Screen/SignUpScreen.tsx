"use client";

import Image from "next/image";

import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import BackButton from "@/components/shared/Button/BackButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IMAGES } from "@/constants/files";

export function SignUpScreen() {
	const t = useTranslations("SignUpForm");

	// Validation schema using Zod
	const signupFormSchema = z
		.object({
			email: z.string().email({
				message: "Please enter a valid email address.",
			}),
			password: z.string().min(8, {
				message: "Password must be at least 8 characters long.",
			}),
			confirmPassword: z.string().min(8, {
				message: "Confirm Password must be at least 8 characters long.",
			}),
		})
		.refine((data) => data.password === data.confirmPassword, {
			message: "Passwords must match!",
			path: ["confirmPassword"], // Targeting confirmPassword field for the error
		});

	// TypeScript types inferred from the schema
	type SignupFormValues = z.infer<typeof signupFormSchema>;

	const form = useForm<SignupFormValues>({
		resolver: zodResolver(signupFormSchema),
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
		},
		mode: "onChange",
	});

	function onSubmit(data: SignupFormValues) {
		toast.success("Signup Successful!");
		console.log("Signup data", data);
	}

	return (
		<div className="flex-col items-center justify-center py-12 md:flex">
			<BackButton label="Go to Login" href="/auth/sign-in" />
			<Card>
				<CardContent>
					<div className="mx-auto mt-4 grid w-[350px] gap-6">
						<div className="my-4 flex items-center justify-center lg:hidden xl:hidden ">
							<Image
								src={IMAGES.adminLogo}
								alt="Image"
								width="200"
								height="200"
								className="object-contain "
							/>
						</div>
						<div className="grid gap-2 text-center">
							<h1 className="text-3xl font-bold">{t("title")}</h1>
							<p className="text-balance text-sm text-muted-foreground">
								{t("description")}
							</p>
						</div>

						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-6"
							>
								<div className="grid gap-4">
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

									<FormField
										control={form.control}
										name="password"
										render={({ field }) => (
											<FormItem>
												<FormLabel>{t("fields.password.label")}</FormLabel>
												<FormControl>
													<Input
														type="password"
														placeholder={t("fields.password.placeholder")}
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="confirmPassword"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													{t("fields.confirmPassword.label")}
												</FormLabel>
												<FormControl>
													<Input
														type="password"
														placeholder={t(
															"fields.confirmPassword.placeholder"
														)}
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<Button type="submit" className="flex items-center gap-2">
										<Save size={20} />
										{t("submit")}
									</Button>
								</div>
							</form>
						</Form>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
