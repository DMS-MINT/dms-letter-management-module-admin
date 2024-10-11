import { type AddressType } from "./shared/AddressType";

export type DomainType = {
	domain: string;
	is_primary: boolean;
};

export type TenantSettingsType = {
	auto_ref_number_letters: boolean;
	auto_date_letters: boolean;
};

export type TenantType = {
	id: string;
	name_en: string;
	name_am: string;
	slug: string;
	domains: DomainType[];
	created_at: string;
	updated_at: string;
	tenant_settings: TenantSettingsType;
};

// TenantProfile interface for tenant's profile details
export type TenantProfileType = {
	bio?: string;
	contact_phone: number;
	contact_email: string;
	address: AddressType;
	postal_code?: number;
};

export type TenantListType = {
	id: string;
	name_en: string;
	name_am: string;
	slug: string;
	domains: DomainType[];
	created_at: string;
	updated_at: string;
	tenant_profile: TenantProfileType;
	tenant_settings: TenantSettingsType;
};
export type TenantToUpdateType = {
	id: string;
	name_en: string;
	name_am: string;
	slug: string;
	tenant_profile: TenantProfileType;
};

export type TenantDataType = {
	name_en: string;
	name_am: string;
	tenant_slug: string;
	bio: string;
	contact_phone: number;
	contact_email: string;
	postal_code: number;
	address: AddressType;
};
