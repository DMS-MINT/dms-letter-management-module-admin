import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import {
	deleteOrganization,
	getOrganization,
	setOrganization,
	updateOrganization,
} from "@/actions/organization/action";
import useToastMutation from "@/hooks/useToastMutation";
import {
	type OrganizationListType,
	type OrganizationType,
} from "@/types/OrganizationType";

import { useLogout } from "../user-query/authQuery";

export const useAddOrganization = () => {
	// const queryClient = useQueryClient();
	const { mutate: logout } = useLogout();
	return useToastMutation<OrganizationType>(
		"addOrganization",
		setOrganization,
		"Adding organization, please wait...",
		{
			onSuccess: (data, variables) => {
				// 'data' contains the response from the server
				// 'variables' contains the organization data you passed in
				console.log("Organization created successfully:", data.message);
				console.log("New Organization Data:", variables);
				// queryClient.invalidateQueries({ queryKey: ["organizations"] });
				// Example: Display a message with the organization name
				toast.success(
					`Organization ${variables.name_en} created successfully!`
				);
				logout();
			},
			onError: (error) => {
				console.error("Error creating organization:", error);
			},
		}
	);
};

export const useUpdateOrganization = () => {
	return useToastMutation<OrganizationListType>(
		"updateDepartment",
		updateOrganization,
		"የመምሪያው መገለጫ በማሻሻል...",
		{
			onSuccess: (data, variables) => {
				// 'data' contains the response from the server
				// 'variables' contains the department data you passed in
				console.log("Orgnaization updated successfully:", data.message);
				console.log("New Oranization Data:", variables);
			},
			onError: (error) => {
				console.error("Error creating organization:", error);
			},
		}
	);
};

export const useFetchOrganization = () => {
	return useQuery<OrganizationListType>({
		queryKey: ["getOrganization"],
		queryFn: async () => {
			try {
				const data = await getOrganization();
				return data.data;
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
