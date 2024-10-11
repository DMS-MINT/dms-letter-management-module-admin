import { z } from "zod";

export const userSchema = z.object({
	id: z.string(),
	first_name_en: z.string(),
	middle_name_en: z.string(),
	last_name_en: z.string(),
	first_name_am: z.string(),
	middle_name_am: z.string(),
	last_name_am: z.string(),
	department_name: z.string(),
	email: z.string(),
	status: z.string(),
	label: z.string(),
});
export type User = z.infer<typeof userSchema>;

export const departmentSchema = z.object({
	id: z.string(),
	department_name_en: z.string(),
	department_name_am: z.string(),
	abbreviation_en: z.string(),
	abbreviation_am: z.string(),
	// description: z.string(),
	// contact_phone: z.string(),
	// contact_email: z.string(),
});
export type Department = z.infer<typeof departmentSchema>;

export const enterpriseSchema = z.object({
	id: z.string(),
	full_name_en: z.string(),
	full_name_am: z.string(),
	address: z.object({
		city_en: z.string(),
		city_am: z.string(),
	}),
	email: z.string(),
	phone_number: z.string(),
	type: z.string(),
	logo: z.string(),
});
export type Enterprises = z.infer<typeof enterpriseSchema>;

export const jobTitleSchema = z.object({
	id: z.string(),
	title_en: z.string(),
	title_am: z.string(),
});

export type JobTitle = z.infer<typeof jobTitleSchema>;
