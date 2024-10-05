import { type Metadata } from "next";

import { getTranslations } from "next-intl/server";

import { siteConfig } from "@/app";
import { BrowserUserChart } from "@/components/shared/Charts/BrowserUserChart";
import { MobileUserChart } from "@/components/shared/Charts/MobileUserChart";
import { NumberOfLetterChart } from "@/components/shared/Charts/NumberOfLetterChart";
import { SystemVisterChart } from "@/components/shared/Charts/SystemVisiterChart";

export async function generateMetadata() {
	// useTranslations works both on the server and client;
	// we only need the getTranslations on async functions.
	const t = await getTranslations();

	const metadata: Metadata = {
		title: `${t("metadata.title.home")} - ${siteConfig.appNameDesc}`,
	};

	return metadata;
}

export default function HomePage() {
	// const t = useTranslations();

	return (
		<div className="flex flex-col gap-4 p-4">
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				<SystemVisterChart />
				<BrowserUserChart />
				<NumberOfLetterChart />
			</div>
			<MobileUserChart />
		</div>
	);
}
