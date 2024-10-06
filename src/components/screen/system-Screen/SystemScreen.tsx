import { DateConfigForm } from "@/components/module/system-module/SystemForm/DateConfigForm";
import { ReferenceNoForm } from "@/components/module/system-module/SystemForm/ReferenceNoForm";
import PageSubTitle from "@/components/shared/Titles/PageSubTitle";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

const SystemScreen = () => {
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
						<ReferenceNoForm />
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
						<DateConfigForm />
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
};

export default SystemScreen;
