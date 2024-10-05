import { CircleIcon } from "@radix-ui/react-icons";
import { Trash2 } from "lucide-react";

export const labels = [
	{
		value: "member",
		label: "Member",
	},
	{
		value: "admin",
		label: "Admin",
	},
	{
		value: "recordOfficer",
		label: "Record Officer",
	},
];

export const statuses = [
	{
		value: "active",
		label: "Active",
		icon: CircleIcon,
	},
	{
		value: "trashed",
		label: "Trashed",
		icon: Trash2,
	},
];

// user detail data table
export const userPersonalData = [
	{ name: "Full Name", value: "Kebede Abebe" },
	{ name: "Full Name (Amharic)", value: "ክብል አበባ" },
	{ name: "Email", value: "abekebede@gmail.com" },
	{ name: "Phone", value: "+234 800 900 900" },
];
export const userOrganizationData = [
	{ name: "Job Title", value: "Software Engineer" },
	{ name: "Department", value: "Engineering" },
	{ name: "Organization", value: "DMS" },
	{ name: "Address", value: "123 Main St, Addison, TX" },
];
export const userAccountData = [
	{ name: "Account Type", value: "Member" },
	{ name: "Account verification", value: "Verified" },
	{ name: "Account Status", value: "Active" },
	{ name: "Account created", value: "2023-01-01" },
	{ name: "Last Login", value: "2023-01-01" },
	{ name: "Last Login IP", value: "127.0.0.1" },
	{ name: "Last updated", value: "2023-01-01" },
	{ name: "Created by", value: "Kebede Abebe" },
];
export const userSecurityData = [
	{ name: "Last Password Change", value: "2023-01-01" },
	{ name: "Two Factor Authentication", value: "Enabled" },
	{ name: "2FA (SMS)", value: "Enabled" },
	{ name: "2FA (Google Authenticator)", value: "Enabled" },
	{ name: "Password Strength", value: "Weak" },
];

export const userPreferencesData = [
	{ name: "Language", value: "English" },
	{ name: "Timezone", value: "UTC+3" },
	{ name: "Email Notifications", value: "Enabled" },
	{ name: "SMS Alert", value: "Enabled" },
	{ name: "Theme", value: "Light" },
];

// Organization data table
export const organizationData = [
	{ name: "Organization Name", value: "DMS" },
	{ name: "Organization Name (Amharic)", value: "ድርጅት" },
	{
		name: "Description",
		value: "DMS is a platform for document management and collaboration.",
	},
	{ name: "Contact Phone", value: "+234 800 900 900" },
	{ name: "Contact Email", value: "abekebede@gmail.com" },
	{ name: "Address", value: "123 Main St, Addison, TX" },
	{ name: "Postal Code", value: "12345" },
	{ name: "Domain", value: "dms.com" },
];

export const organizationInfo = {
	organizationNameEn: "Tech Solutions Ltd",
	organizationNameAm: "ቴክ ሶሉሽንስ አ.ማ.",
	description: "A leading provider of software solutions.",
	contactPhone: "+251911123456",
	contactEmail: "info@techsolutions.com",
	address: "1234 Innovation St, Addis Ababa",
	postalCode: "1000",
	domain: "techsolutions.com",
};
