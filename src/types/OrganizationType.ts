import { type AddressType } from "./shared/AddressType";

export type OrganizationType = {
	name_en: string;
	name_am: string;
	organization_slug: string;
	bio: string;
	contact_phone: string;
	contact_email: string;
	postal_code: string;
	address: AddressType;
};

// export type OrganizationType = {
// 	name_en: string;
// 	name_am: string;
// 	organization_slug: string;
// 	bio: string;
// 	contact_phone: string;
// 	contact_email: string;
// 	postal_code: string;
// 	address: Address;
// 	logo?: File | undefined;
// };
