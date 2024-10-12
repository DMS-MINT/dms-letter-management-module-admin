import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
	deleteOrganization,
	getOrganization,
	setOrganization,
	updateOrganization,
} from "@/actions/organization/action";
import { useAppDispatch } from "@/hooks/storehooks";
import useToastMutation from "@/hooks/useToastMutation";
import { SetLoading } from "@/lib/store/redux/loadersSlice";
import {
	type TenantDataType,
	type TenantListType,
	type TenantToUpdateType,
} from "@/types/TenantType";

import { useLogout } from "../user-query/authQuery";

export const useAddOrganization = () => {
	const { mutate: logout } = useLogout();
	const dispatch = useAppDispatch();
	return useToastMutation<TenantDataType>(
		"addOrganization",
		setOrganization,
		"Adding organization, please wait...",
		{
			onSuccess: (data, variables) => {
				dispatch(SetLoading(true));
				setTimeout(() => {
					dispatch(SetLoading(false));
					toast.success(
						`Organization ${variables.name_en} created successfully!`
					);
					toast.success("logout...");
					logout();
				}, 1000);
			},
			onError: (error) => {
				console.error("Error creating organization:", error);
			},
		}
	);
};

export const useUpdateOrganization = () => {
	const queryClient = useQueryClient();
	return useToastMutation<TenantToUpdateType>(
		"updateDepartment",
		updateOrganization,
		"የመምሪያው መገለጫ በማሻሻል...",
		{
			onSuccess: (data, variables) => {
				queryClient.invalidateQueries({ queryKey: ["getOrganization"] });
				console.log("Orgnaization updated successfully:", data.message);
				console.log("New Oranization Data:", variables);
			},
			onError: (error) => {
				console.error("Error creating organization:", error);
			},
		}
	);
};

export const useFetchOrganization = (id: string) => {
	return useQuery<TenantListType>({
		queryKey: ["getOrganization"],
		queryFn: async () => {
			try {
				const data = await getOrganization(id);

				return data.data.tenant as TenantListType;
			} catch (error: any) {
				toast.error(error.message);
				throw error;
			}
		},
		enabled: true,
	});
};

export const useDeleteOrganization = () => {
	return useToastMutation<string>(
		"deleteOrganization",
		deleteOrganization,
		"የመምሪያው መገለጫ በማሻሻል...",
		{
			onSuccess: (data, variables) => {
				// 'data' contains the response from the server
				// 'variables' contains the department data you passed in
				console.log("Organization deleted successfully:", data.message);
				console.log("New Department Data:", variables);
			},
			onError: (error) => {
				console.error("Error creating department:", error);
			},
		}
	);
};
