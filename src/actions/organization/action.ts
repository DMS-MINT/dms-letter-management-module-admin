"use server";

import axiosInstance from "@/actions/axiosInstance";
import { type EnterpriseType } from "@/types/EnterpriseType";
import { type OrganizationType } from "@/types/OrganizationType";

import getErrorMessage from "../getErrorMessage";

export async function setOrganization(data: OrganizationType) {
	try {
		const response = await axiosInstance.post("organizations/create/", data);
		console.log("Organization created:", response.data);
		return { ok: true, message: "አዲስ ድርጅት በተሳካ ሁኔታ ፈጥረዋል!" };
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

		return { ok: true, message: response.data };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(error) };
	}
}
export async function setEnterprises(data: EnterpriseType) {
	try {
		const response = await axiosInstance.post("enterprises/create/", data);

		return { ok: true, message: response.data };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(error) };
	}
}
export async function getDepartment() {
	try {
		const response = await axiosInstance.get("departments/");

		return { ok: true, message: response.data };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(error) };
	}
}
export async function setDepartment(data: EnterpriseType) {
	try {
		const response = await axiosInstance.post("departments/create/", data);

		return { ok: true, message: response.data };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(error) };
	}
}
export async function getJobTitle() {
	try {
		const response = await axiosInstance.get("job_titles/");

		return { ok: true, message: response.data };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(error) };
	}
}
export async function setJobTitle(data: EnterpriseType) {
	try {
		const response = await axiosInstance.post("job_titles/create/", data);

		return { ok: true, message: response.data };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(error) };
	}
}
