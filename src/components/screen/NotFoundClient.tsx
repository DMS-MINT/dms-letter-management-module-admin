"use client";

import Image from "next/image";
import Link from "next/link";

import { MoveUpLeft } from "lucide-react";
import { useTranslations } from "next-intl";

import { IMAGES } from "@/constants/files";

export default function NotFoundClient() {
	const t = useTranslations();

	return (
		<main className="flex h-screen flex-col items-center justify-center">
			<Image
				src={IMAGES.adminLogo}
				alt="logo"
				height={200}
				width={200}
				className="mb-8"
			/>
			<h2 className="font-bold text-primary">{t("Error.title")}</h2>
			<p>{t("Error.description")}</p>
			<p>
				{t("Error.GoBack")}{" "}
				<Link href="/" className="text-primary italic">
					{t("Error.dashboard")}{" "}
					<MoveUpLeft className="inline-block" size={14} />
				</Link>
			</p>
		</main>
	);
}
