import { postSystemConfig } from "@/actions/system/action";
import useToastMutation from "@/hooks/useToastMutation";

export const useUpdateSystemConfig = () => {
	return useToastMutation<any>(
		"SystemConfig",
		postSystemConfig,
		"post System Config, please wait...",
		{
			onSuccess: (data, variables) => {
				console.log("System Config created successfully:", data.message);
				console.log("New System Config Data:", variables);
			},
			onError: (error) => {
				console.error("Error creating department:", error);
			},
		}
	);
};
