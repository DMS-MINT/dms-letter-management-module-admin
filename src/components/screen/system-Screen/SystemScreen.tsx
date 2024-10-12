"use client";

import { useFetchOrganization } from "@/actions/Query/organization-query/organizationQuery";
import { DateConfigForm } from "@/components/module/system-module/SystemForm/DateConfigForm";
import { ReferenceNoForm } from "@/components/module/system-module/SystemForm/ReferenceNoForm";
import PageSubTitle from "@/components/shared/Titles/PageSubTitle";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { useAppSelector } from "@/hooks/storehooks";

const SystemScreen = () => {
	const Organization = useAppSelector((state) => state.tenants.tenants);

	// TODO Must have to be changed
	const { data: organization } = useFetchOrganization(Organization.id);
	return (
		<div className="p-2">
			<Accordion type="single" collapsible className="w-full">
				<AccordionItem value="item-1">
					<AccordionTrigger className="hover:no-underline text-start">
						<PageSubTitle
							title="Reference Number 🔢"
							desc="Reference Number is a unique identifier for a letter or a document."
						/>
					</AccordionTrigger>
					<AccordionContent>
						{organization && <ReferenceNoForm organization={organization} />}
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-2">
					<AccordionTrigger className="hover:no-underline text-start">
						<PageSubTitle
							title="Date Automation 📅"
							desc="Automation of date and time for letters and documents."
						/>
					</AccordionTrigger>
					<AccordionContent>
						{organization && <DateConfigForm organization={organization} />}
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
};

export default SystemScreen;
