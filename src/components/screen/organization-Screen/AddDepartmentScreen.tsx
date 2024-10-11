"use client";

import { useParams } from "next/navigation";

import { Delete } from "lucide-react";
import { useTranslations } from "next-intl";

import {
	useDeleteDepartment,
	useFetchOneDepartments,
} from "@/actions/Query/organization-query/departmentQuery";
import { DepartmentForm } from "@/components/module/organization-module/OrganizationForm/DepartmentForm";
import PageSubTitle from "@/components/shared/Titles/PageSubTitle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const AddDepartmentScreen = ({ isEdit = false }: { isEdit?: boolean }) => {
	const t = useTranslations("DepartmentForm");
	const { id } = useParams();
	const departmentId: string | undefined = Array.isArray(id) ? id[0] : id;

	const { data: department } = useFetchOneDepartments(
		departmentId || "",
		isEdit && !!departmentId
	);

	const { mutate: deleteDepartment } = useDeleteDepartment();
	const handleDelete = () => {
		console.log("Delete Department");
		deleteDepartment(departmentId || "");
	};

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
						<Button
							size="sm"
							variant={"destructive"}
							className="h-7 gap-1"
							onClick={() => {
								handleDelete();
							}}
						>
							<Delete className="h-3.5 w-3.5" />
							<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
								{t("deleteDepartment")}
							</span>
						</Button>
					)}
				</div>
			</div>
			<Separator />
			{/* Pass department data only when editing */}
			<DepartmentForm isEdit={isEdit} data={isEdit ? department : undefined} />
		</div>
	);
};

export default AddDepartmentScreen;
