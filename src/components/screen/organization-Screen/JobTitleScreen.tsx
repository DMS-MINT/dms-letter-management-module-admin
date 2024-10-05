"use client";

import { useState } from "react";

import { PlusCircleIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { columns } from "@/components/module/organization-module/JobTitledataTable/columns";
import { JobTitleDataTable } from "@/components/module/organization-module/JobTitledataTable/data-table";
import { JobTitleForm } from "@/components/module/organization-module/OrganizationForm/JobTitleForm";
import PageSubTitle from "@/components/shared/Titles/PageSubTitle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { users } from "@/constants/data/tobeChanged/schema";

const JobTitleScreen = () => {
	const t = useTranslations("JobTitleScreen");
	const [formOpen, setFormOpen] = useState(false);
	return (
		<div className="p-2 space-y-4 mb-20">
			<PageSubTitle title={t("title")} desc={t("description")} />
			<Separator />
			{/* Add Job Title */}
			<div className="flex justify-end w-full">
				<Button
					onClick={() => setFormOpen(!formOpen)}
					size={"sm"}
					className="flex gap-2"
				>
					<PlusCircleIcon size={20} />
					{t("addjobtitle")}
				</Button>
			</div>
			<div className="flex flex-col gap-4">
				{formOpen && <JobTitleForm />}

				<JobTitleDataTable data={users} columns={columns} />
			</div>
			{/* List Job Title */}
		</div>
	);
};

export default JobTitleScreen;
