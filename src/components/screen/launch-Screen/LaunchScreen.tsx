"use client";

import Link from "next/link";
import { useState } from "react";

import { useTranslations } from "next-intl";

import { OrganizationForm } from "@/components/module/organization-module/OrganizationForm/OrganizationForm";
import { SubDomainForm } from "@/components/module/organization-module/OrganizationForm/SubDomainForm";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const LaunchScreen = () => {
	// Load translations
	const t = useTranslations("LaunchScreen");
	const [domainValue, setDomainValue] = useState("");
	// Handler to receive domain value from SubDomainForm submission
	const handleDomainSubmit = (value: string) => {
		setDomainValue(value); // This updates the state in the parent
		console.log("Domain Value Updated: ", value);
	};

	return (
		<div className="flex flex-col gap-4 p-4">
			<Card className="border-primary border-dashed border-2 rounded-lg">
				<CardHeader>
					<CardTitle>{t("welcomeTitle")}</CardTitle>
					<CardDescription>{t("welcomeDescription")}</CardDescription>
				</CardHeader>
				<CardContent>
					<ul className="space-y-2">
						<li>
							{t("firstStep")}{" "}
							<Link
								href="#subdomainForm"
								className="text-primary font-extrabold text-xl"
							>
								{t("here")}
							</Link>
							.
						</li>
						<li>
							{t("secondStep")}{" "}
							<Link
								href="#organizationForm"
								className="text-primary font-extrabold text-xl"
							>
								{t("here")}
							</Link>
							.
						</li>
					</ul>
				</CardContent>
				<CardFooter>
					<div className="flex gap-2">
						<span className="text-primary font-bold">{t("note")}</span>
						<span>{t("noteDetails")}</span>
					</div>
				</CardFooter>
			</Card>

			<div className="grid md:grid-cols-2 grid-cols-1 mb-20 gap-4">
				<SubDomainForm onDomainSubmit={handleDomainSubmit} />
				{domainValue && <OrganizationForm domainValue={domainValue} />}
			</div>
		</div>
	);
};

export default LaunchScreen;
