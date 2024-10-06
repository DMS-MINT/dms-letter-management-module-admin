import Link from "next/link";

import { useTranslations } from "next-intl";

import { OrganizationForm } from "@/components/module/organization-module/OrganizationForm/OrganizationForm";
import { SubDomainForm } from "@/components/module/organization-module/SubDomainForm";
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
				<SubDomainForm />
				<OrganizationForm />
			</div>
		</div>
	);
};

export default LaunchScreen;
