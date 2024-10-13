import { type AddressType } from "./shared/AddressType";

export type EnterpriseType = {
	name_en: string;
	name_am: string;
	address: AddressType;
	email: string;
	phone_number: number;
	postal_code: number;
	logo?: File | null;
};

export type EnterpriseListType = {
	id: string;
	name_en: string;
	name_am: string;
	address: AddressType;
	email: string;
	phone_number: number;
	postal_code: number;
	logo?: File | null;
	type?: string;
};
