import { toast } from "sonner";

import { setOrganization } from "@/actions/organization/action";
import useToastMutation from "@/hooks/useToastMutation";
import { type OrganizationType } from "@/types/OrganizationType";

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

// export const useFetchConsumptions = () => {
// 	return useQuery({
// 		queryKey: ["consumptions"],
// 		queryFn: fetchConsumptions,
// 	});
// };

// export const useDeleteConsumption = () => {
// 	return useToastMutation<string>(
// 		"deleteConsumption",
// 		DeleteConsumption,
// 		"Deleting consumption, please wait..."
// 	);
// };
