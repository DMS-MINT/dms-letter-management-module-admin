"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useSignIn } from "@/actions/Query/user-query/authQuery";
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

const formSchema = z.object({
	email: z.string().email({ message: "እባክዎ ትክክለኛ ኢሜል ያስገቡ።" }),
	password: z.string().min(1, { message: "እባክዎ የይለፍ ቃልዎን ያስገቡ።" }),
});

export default function SigninScreen() {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const t = useTranslations();
	const router = useRouter();
	const dispatch = useAppDispatch();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const { mutate: signInMutation, isSuccess, isPending } = useSignIn();
	function onSubmit(values: z.infer<typeof formSchema>) {
		dispatch(SetLoading(true));
		signInMutation(values as ICredentials);

		setTimeout(() => {
			dispatch(SetLoading(false));
			router.push("/home");
		}, 500);
	}

	return !isSuccess ? (
		<div className="flex-col items-center justify-center py-12 md:flex">
			<BackButton label="Go to Signup" href="/auth/sign-up" left={false} />

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
							<h1 className="text-3xl font-bold">{t("SignInForm.title")}</h1>
							<p className="text-balance text-sm text-muted-foreground">
								{t("SignInForm.description")}
							</p>
						</div>

						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-5"
							>
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t("SignInForm.email")}</FormLabel>
											<FormControl>
												<Input readOnly={isPending} tabIndex={1} {...field} />
											</FormControl>
											<FormMessage className="form-error-message" />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="flex justify-between">
												{t("SignInForm.password")}
											</FormLabel>
											<FormControl>
												<div className="relative ">
													<Input
														readOnly={isPending}
														type={showPassword ? "text" : "password"}
														tabIndex={2}
														{...field}
													/>
													<Button
														type="button"
														size={"icon"}
														variant={"ghost"}
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
											<FormMessage className="form-error-message" />
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
									<LogIn size={20} />
									{t("SignInForm.login")}
								</Button>
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
