"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useTranslations } from "next-intl";

import BackButton from "@/components/shared/Button/BackButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IMAGES } from "@/constants/files";
import { useAppDispatch } from "@/hooks/storehooks";
import { SetLoading } from "@/lib/store/redux/loadersSlice";

const SigninScreen = () => {
	const t = useTranslations();
	const router = useRouter();
	const dispatch = useAppDispatch();
	const handleLogin = () => {
		dispatch(SetLoading(true));

		setTimeout(() => {
			dispatch(SetLoading(false));
			router.push("/home");
		}, 10000);
	};
	return (
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
						<div className="grid gap-4">
							<div className="grid gap-2">
								<Label htmlFor="email">{t("SignInForm.email")}</Label>
								<Input
									id="email"
									type="email"
									className="h-14 ring-2 ring-primary md:h-10 md:ring-0"
									placeholder="m@example.com"
									required
								/>
							</div>
							<div className="grid gap-2">
								<div className="flex items-center">
									<Label htmlFor="password">{t("SignInForm.password")}</Label>
									<Link
										href="/forgot-password"
										className="ml-auto inline-block text-sm underline"
									>
										{t("SignInForm.forget-password")}
									</Link>
								</div>
								<Input
									id="password"
									type="password"
									required
									placeholder="password"
									className="h-14 ring-2 ring-primary md:h-10 md:ring-0"
								/>
							</div>
							<Button
								type="submit"
								onClick={() => handleLogin()}
								className="mt-4 w-full  font-bold md:mt-0 "
							>
								{t("SignInForm.login")}
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default SigninScreen;
