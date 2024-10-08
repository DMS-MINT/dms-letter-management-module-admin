"use server";

import axiosInstance from "@/actions/axiosInstance";
import { type UserType } from "@/types/user/UserType";

import getErrorMessage from "../getErrorMessage";

export async function getMyProfile() {
	try {
		const response = await axiosInstance.get("auth/me/");
		console.log("Me:", response.data);
		return response.data;
	} catch (error: any) {
		throw error.message;
	}
}

export async function getRecordOfficers() {
	try {
		const is_staff: boolean = true;
		const response = await axiosInstance.get(`users/?is_staff=${is_staff}`);

		return { ok: true, message: response.data.users };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(error) };
	}
}
export async function getMemberUsers() {
	try {
		const is_staff: boolean = false;
		const response = await axiosInstance.get(`users/?is_staff=${is_staff}`);

		return { ok: true, message: response.data.users };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(error) };
	}
}

export async function updateProfile(data: UserType) {
	try {
		const response = await axiosInstance.patch("users/profile/", data);

		return { ok: true, message: response.data };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(error) };
	}
}
