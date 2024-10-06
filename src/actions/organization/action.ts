"use server";

import axiosInstance from "@/actions/axiosInstance";
import { type OrganizationType } from "@/types/OrganizationType";

import getErrorMessage from "../getErrorMessage";

export async function setOrganization(data: OrganizationType) {
	try {
		const response = await axiosInstance.post("organizations/create/", data);

		return { ok: true, message: response.data };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(error) };
	}
}

export async function getOrganization() {
	try {
		const response = await axiosInstance.get("organizations/");
		return response.data;
	} catch (error: any) {
		throw error.message;
	}
}

export async function getEnterprises() {
	try {
		const response = await axiosInstance.get("enterprises/");

		return { ok: true, message: response.data.enterprises };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(error) };
	}
}
