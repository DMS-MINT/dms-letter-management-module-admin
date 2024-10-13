import { z } from "zod";

export const userSchema = z.object({
	id: z.string(),
	email: z.string(),
	member_profile: z
		.object({
			full_name_en: z.string(),
			full_name_am: z.string(),
			job_title: z
				.object({
					title_en: z.string(),
					title_am: z.string(),
				})
				.nullable(),
			department: z
				.object({
					department_name_en: z.string(),
					department_name_am: z.string(),
				})
				.nullable(),
		})
		.nullable(),
	member_permissions: z
		.object({
			is_admin: z.boolean(),
			is_staff: z.boolean(),
		})
		.nullable(),
	status: z.string().optional(),
	label: z.string().optional(),
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
	name_en: z.string(),
	name_am: z.string(),
	address: z.object({
		city_en: z.string(),
		city_am: z.string(),
	}),
	email: z.string(),
	phone_number: z.number(),
	postal_code: z.number(),
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
