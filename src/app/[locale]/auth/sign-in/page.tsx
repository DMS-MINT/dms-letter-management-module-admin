import { type Metadata } from "next";
import Image from "next/image";

import { getTranslations } from "next-intl/server";

import { siteConfig } from "@/app";
import SigninScreen from "@/components/screen/auth-Screen/SigninScreen";
import { IMAGES } from "@/constants/files";

export async function generateMetadata() {
	// useTranslations works both on the server and client;
	// we only need the getTranslations on async functions.
	const t = await getTranslations();

	const metadata: Metadata = {
		title: `${t("metadata.title.signin")} - ${siteConfig.appNameDesc}`,
	};

	return metadata;
}
const SignInpage = () => {
	return (
		<section>
			<div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
				<SigninScreen />
				<div className="hidden items-center justify-center bg-muted lg:flex ">
					<Image
						src={IMAGES.adminLogo}
						alt="Image"
						width="500"
						height="500"
						className="object-contain "
					/>
				</div>
			</div>
		</section>
	);
};

export default SignInpage;
