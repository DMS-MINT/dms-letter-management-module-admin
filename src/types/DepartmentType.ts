export type DepartmentType = {
	department_name_en: string;
	department_name_am: string;
	abbreviation_en: string;
	abbreviation_am: string;
	description: string;
	contact_phone: number;
	contact_email: string;
};

export type DepartmentListType = {
	id: string;
	department_name_en: string;
	department_name_am: string;
	abbreviation_en: string;
	abbreviation_am: string;
};
export type DepartmentTypeToUpdate = {
	id: string;
	department_name_en: string;
	department_name_am: string;
	abbreviation_en: string;
	abbreviation_am: string;
	description: string;
	contact_phone: number;
	contact_email: string;
};

export type JobTitleListType = {
	id: string;
	title_en: string;
	title_am: string;
};

export type JobTitleType = {
	title_en: string;
	title_am: string;
};

export type DepartmentNameType = {
	department_name_en: string;
	department_name_am: string;
};
