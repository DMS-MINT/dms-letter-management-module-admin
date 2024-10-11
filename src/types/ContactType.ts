import { type AddressType } from "./shared/AddressType";

export type NewContactType = {
	full_name_en: string;
	full_name_am: string;
	email?: string | null;
	phone_number?: number | null;
	address: AddressType;
};
