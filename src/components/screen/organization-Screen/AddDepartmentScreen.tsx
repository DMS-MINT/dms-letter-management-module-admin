"use client";

import { Delete } from "lucide-react";
import { useTranslations } from "next-intl";

import { DepartmentForm } from "@/components/module/organization-module/OrganizationForm/DepartmentForm";
import PageSubTitle from "@/components/shared/Titles/PageSubTitle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const AddDepartmentScreen = ({ isEdit = false }: { isEdit?: boolean }) => {
	const t = useTranslations("DepartmentForm");
	return (
		<div className="p-4 space-y-4 mb-20">
			<div className="flex items-center justify-between space-y-2">
				{isEdit ? (
					<PageSubTitle title={t("titleEdit")} desc={t("descriptionEdit")} />
				) : (
					<PageSubTitle title={t("title")} desc={t("description")} />
				)}
				<div className="flex items-center space-x-2">
					{isEdit && (
						<Button size="sm" variant={"destructive"} className="h-7 gap-1">
							<Delete className="h-3.5 w-3.5" />
							<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
								{t("deleteDepartment")}
							</span>
						</Button>
					)}
				</div>
			</div>
			<Separator />
			{/* Add Department */}
			<DepartmentForm />
		</div>
	);
};

export default AddDepartmentScreen;
