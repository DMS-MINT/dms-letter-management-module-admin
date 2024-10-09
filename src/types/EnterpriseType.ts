import { type AddressType } from "./shared/AddressType";

export type EnterpriseType = {
	id: string;
	full_name_en: string;
	full_name_am: string;
	address: AddressType;
	email: string;
	phone_number: string;
	type: string;
	logo?: File | null;
};
