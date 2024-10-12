import {
	type DepartmentNameType,
	type DepartmentType,
	type JobTitleType,
} from "../DepartmentType";

export type UserType = {
	first_name_en: string;
	middle_name_en: string;
	last_name_en: string;
	first_name_am: string;
	middle_name_am: string;
	last_name_am: string;
	job_title: string;
	department: string;
	phone_number: string;
	password: string;
	email: string;
	is_staff: false;
	is_admin: false;
};

export type UserListType = {
	id: string;
	first_name_en: string;
	middle_name_en: string;
	last_name_en: string;
	first_name_am: string;
	middle_name_am: string;
	last_name_am: string;
	job_title: string;
	department: string;
	phone_number: string;
	email: string;
	is_staff: false;
	is_superuser: false;
};

export type CurrentUserType = {
	id: string;
	first_name_en: string;
	middle_name_en: string;
	last_name_en: string;
	first_name_am: string;
	middle_name_am: string;
	last_name_am: string;
	full_name_en: string;
	full_name_am: string;
	job_title: JobTitleType;
	department: DepartmentType;
	phone_number: number;
	email: string;
	is_2fa_enabled: boolean;
	is_staff: boolean;
	is_superuser: boolean;
};

export type memeberType = {
	id: string;
	email: string;
	member_profile: member_profile;
	member_permissions: member_permissions;
};
export type member_settings = {
	is_2fa_enabled: false;
	is_verified: false;
};
export type memeberDetailType = {
	id: string;
	email: string;
	member_profile: member_profile;
	member_permissions: member_permissions;
	member_settings: member_settings;
};
export type member_profile = {
	full_name_en: string;
	full_name_am: string;
	phone_number: string;
	job_title: JobTitleType;
	department: DepartmentNameType;
};

export type member_permissions = {
	is_admin: false;
	is_staff: false;
};

// user detail type
export type UserPersonalData = {
	full_name_en: string;
	full_name_am: string;
	email: string;
	phone_number: string;
};

export type UserOrganizationData = {
	job_title: string;
	department: string;
	organization: string;
	address: string;
};

export type UserAccountData = {
	account_type: string;
	account_verification: string;
	account_status: string;
	account_created: string;
	last_login: string;
	last_login_ip: string;
	last_updated: string;
	created_by: string;
};

export type UserSecurityData = {
	last_password_change: string;
	is_2fa_enabled: boolean;
	is_sms_2fa_enabled: boolean;
	is_google_authenticator_enabled: boolean;
	password_strength: string;
};

export type UserPreferencesData = {
	language: string;
	timezone: string;
	email_notifications: boolean;
	sms_alert: boolean;
	theme: string;
};

export type UserDetailType = {
	id: string;
	personal: UserPersonalData;
	organization: UserOrganizationData;
	account: UserAccountData;
	security: UserSecurityData;
	preferences: UserPreferencesData;
};
