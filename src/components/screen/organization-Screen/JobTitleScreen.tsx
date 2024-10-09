"use client";

import { useState } from "react";

import { PlusCircleIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { useFetchJobtitles } from "@/actions/Query/organization-query/jobTitleQuery";
import { columns } from "@/components/module/organization-module/JobTitledataTable/columns";
import { JobTitleDataTable } from "@/components/module/organization-module/JobTitledataTable/data-table";
import { JobTitleForm } from "@/components/module/organization-module/OrganizationForm/JobTitleForm";
import PageSubTitle from "@/components/shared/Titles/PageSubTitle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const JobTitleScreen = () => {
	const t = useTranslations("JobTitleScreen");
	const [formOpen, setFormOpen] = useState(false);
	const { data: jobTitles, isLoading } = useFetchJobtitles();
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
				{isLoading ? (
					<Skeleton />
				) : (
					<JobTitleDataTable data={jobTitles || []} columns={columns} />
				)}
			</div>
		</div>
	);
};

export default JobTitleScreen;
