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
	email: z.string().email(), // Ensures the email is a valid email format
	status: z.string(),
	label: z.string(),
});

export type User = z.infer<typeof userSchema>;

export const users = [
	{
		id: "1",
		first_name_en: "Betelhem",
		middle_name_en: "Mekdes",
		last_name_en: "Asfaw",
		first_name_am: "ቤተልሄም",
		middle_name_am: "መካድስ",
		last_name_am: "አስፋው",
		department_name: "Strategic Affairs CEO",
		email: "betelhem.asfaw@mint.com",
		status: "active",
		label: "admin",
	},
	{
		id: "2",
		first_name_en: "Abel",
		middle_name_en: "Getachew",
		last_name_en: "Gebremeskel",
		first_name_am: "አቤል",
		middle_name_am: "ጌታቸው",
		last_name_am: "ገብረመስቀል",
		department_name: "Finance Department",
		email: "abel.gebremeskel@mint.com",
		status: "active",
		label: "recordOfficer",
	},
	{
		id: "3",
		first_name_en: "Sara",
		middle_name_en: "Tadesse",
		last_name_en: "Abebe",
		first_name_am: "ሳራ",
		middle_name_am: "ታደሰ",
		last_name_am: "አበበ",
		department_name: "IT Department",
		email: "sara.abebe@mint.com",
		status: "trashed",
		label: "member",
	},
	{
		id: "4",
		first_name_en: "Mulu",
		middle_name_en: "Bekele",
		last_name_en: "Demissie",
		first_name_am: "ሙሉ",
		middle_name_am: "በቀለ",
		last_name_am: "ደምሴ",
		department_name: "Human Resources",
		email: "mulu.demissie@mint.com",
		status: "active",
		label: "recordOfficer",
	},
	{
		id: "5",
		first_name_en: "Yared",
		middle_name_en: "Fekadu",
		last_name_en: "Tefera",
		first_name_am: "ያሬድ",
		middle_name_am: "ፈቃዱ",
		last_name_am: "ተፈራ",
		department_name: "Marketing Department",
		email: "yared.tefera@mint.com",
		status: "trashed",
		label: "member",
	},
	{
		id: "2",
		first_name_en: "Abel",
		middle_name_en: "Getachew",
		last_name_en: "Gebremeskel",
		first_name_am: "አቤል",
		middle_name_am: "ጌታቸው",
		last_name_am: "ገብረመስቀል",
		department_name: "Finance Department",
		email: "abel.gebremeskel@mint.com",
		status: "active",
		label: "recordOfficer",
	},
	{
		id: "3",
		first_name_en: "Sara",
		middle_name_en: "Tadesse",
		last_name_en: "Abebe",
		first_name_am: "ሳራ",
		middle_name_am: "ታደሰ",
		last_name_am: "አበበ",
		department_name: "IT Department",
		email: "sara.abebe@mint.com",
		status: "trashed",
		label: "member",
	},
	{
		id: "4",
		first_name_en: "Mulu",
		middle_name_en: "Bekele",
		last_name_en: "Demissie",
		first_name_am: "ሙሉ",
		middle_name_am: "በቀለ",
		last_name_am: "ደምሴ",
		department_name: "Human Resources",
		email: "mulu.demissie@mint.com",
		status: "active",
		label: "recordOfficer",
	},
	{
		id: "5",
		first_name_en: "Yared",
		middle_name_en: "Fekadu",
		last_name_en: "Tefera",
		first_name_am: "ያሬድ",
		middle_name_am: "ፈቃዱ",
		last_name_am: "ተፈራ",
		department_name: "Marketing Department",
		email: "yared.tefera@mint.com",
		status: "trashed",
		label: "member",
	},
];

// Define the department schema
export const departmentSchema = z.object({
	id: z.string(), // Department ID as a string
	department_name_en: z.string(), // English department name
	department_name_am: z.string(), // Amharic department name
	abbreviation_en: z.string(), // English abbreviation
	abbreviation_am: z.string(), // Amharic abbreviation
	description: z.string(), // Department description
	contact_phone: z.number().min(1000000000, "Invalid phone number"), // Phone number with validation for a reasonable length
	contact_email: z.string().email("Invalid email format"), // Ensures a valid email format
});

// Infer the DepartmentType from the schema
export type Department = z.infer<typeof departmentSchema>;

// Example department data array
export const departments: Department[] = [
	{
		id: "1",
		department_name_en: "Finance Department",
		department_name_am: "ገንዘብ ቢሮ",
		abbreviation_en: "FD",
		abbreviation_am: "ገቢ",
		description: "Handles all financial matters",
		contact_phone: 251912345678,
		contact_email: "finance@organization.com",
	},
	{
		id: "2",
		department_name_en: "Human Resources",
		department_name_am: "ሰው ኃብት",
		abbreviation_en: "HR",
		abbreviation_am: "ሰው ኃብት",
		description: "Manages employee relations and recruitment",
		contact_phone: 251911234567,
		contact_email: "hr@organization.com",
	},
];
