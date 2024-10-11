"use client";

import Image from "next/image";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Save } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useSignUp } from "@/actions/Query/user-query/authQuery";
import { type ICredentials } from "@/actions/auth/action";
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
import { Skeleton } from "@/components/ui/skeleton";
import { IMAGES } from "@/constants/files";
import { useAppDispatch } from "@/hooks/storehooks";
import { SetLoading } from "@/lib/store/redux/loadersSlice";

export default function SignUpScreen() {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const t = useTranslations("SignUpForm");

	// Validation schema using Zod
	const signupFormSchema = z
		.object({
			first_name: z.string().min(2, {
				message: "First Name must be at least 2 characters long.",
			}),
			last_name: z.string().min(2, {
				message: "Last Name must be at least 2 characters long.",
			}),
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
			first_name: "",
			last_name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
		mode: "onChange",
	});

	const { mutate, isSuccess, isPending } = useSignUp();

	function onSubmit(values: z.infer<typeof signupFormSchema>) {
		dispatch(SetLoading(true));
		const { email, password } = values;
		const value = { email, password };
		mutate(value as ICredentials);

		setTimeout(() => {
			dispatch(SetLoading(false));
		}, 500);
	}

	return !isSuccess ? (
		<div className="flex-col items-center justify-center py-2 lg:py-12 md:flex ">
			<BackButton label="Go to Login" href="/auth/sign-in" />
			<Card>
				<CardContent>
					<div className="mx-auto mt-4 grid w-[350px] gap-6">
						<div className="my-4 flex items-center justify-center lg:hidden xl:hidden ">
							<Image
								src={IMAGES.adminLogo}
								alt="Image"
								width="150"
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
								className="space-y-5"
							>
								<div className="grid gap-4">
									<div className="grid grid-cols-2 gap-4">
										<div className="grid gap-2">
											<FormField
												control={form.control}
												name="first_name"
												render={({ field }) => (
													<FormItem>
														<FormLabel>
															{t("fields.first_name.label")}
														</FormLabel>
														<FormControl>
															<Input
																type="text"
																readOnly={isPending}
																placeholder={t("fields.first_name.placeholder")}
																{...field}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
										<div className="grid gap-2">
											<FormField
												control={form.control}
												name="last_name"
												render={({ field }) => (
													<FormItem>
														<FormLabel>{t("fields.last_name.label")}</FormLabel>
														<FormControl>
															<Input
																type="text"
																readOnly={isPending}
																placeholder={t("fields.last_name.placeholder")}
																{...field}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
									</div>
									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem>
												<FormLabel>{t("fields.email.label")}</FormLabel>
												<FormControl>
													<Input
														type="email"
														readOnly={isPending}
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
													<div className="relative ">
														<Input
															readOnly={isPending}
															type={showPassword ? "text" : "password"}
															tabIndex={2}
															placeholder={t("fields.password.placeholder")}
															{...field}
														/>
														<Button
															type="button"
															size={"icon"}
															variant={"ghost"}
															aria-pressed={showPassword}
															className="absolute right-1 top-0 hover:bg-transparent"
															onClick={() => setShowPassword(!showPassword)}
														>
															{showPassword ? (
																<Eye size={20} />
															) : (
																<EyeOff size={20} />
															)}
														</Button>
													</div>
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
													<div className="relative ">
														<Input
															readOnly={isPending}
															type={showPassword ? "text" : "password"}
															tabIndex={2}
															placeholder={t(
																"fields.confirmPassword.placeholder"
															)}
															{...field}
														/>
														<Button
															type="button"
															size={"icon"}
															variant={"ghost"}
															aria-pressed={showPassword}
															className="absolute right-1 top-0 hover:bg-transparent"
															onClick={() => setShowPassword(!showPassword)}
														>
															{showPassword ? (
																<Eye size={20} />
															) : (
																<EyeOff size={20} />
															)}
														</Button>
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<Button
										disabled={isPending}
										type="submit"
										variant="secondary"
										className="flex w-full items-center gap-2"
										tabIndex={3}
									>
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
	) : (
		<Skeleton />
	);
}
