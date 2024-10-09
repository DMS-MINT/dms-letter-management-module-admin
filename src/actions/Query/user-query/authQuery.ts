import { useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import {
	type ICredentials,
	signIn,
	signOut,
	signUp,
} from "@/actions/auth/action";
import useToastMutation from "@/hooks/useToastMutation";

export const useLogout = () => {
	const router = useRouter(); // Initialize the router

	return useMutation({
		mutationKey: ["signOut"],
		mutationFn: signOut,
		onMutate: () => {
			toast.dismiss();
			toast.loading("በመውጣት ላይ፣ እባክዎን ትንሽ ይጠብቁ...");
		},
		onSuccess: () => {
			toast.dismiss();
			toast.success("Logout... 👋🏾BYE!");
			router.push("/auth/sign-in" as `/${string}`);
		},
		onError: (errorMessage: string) => {
			toast.dismiss();
			toast.error(errorMessage);
		},
	});
};

export const useSignIn = () => {
	// const { refetch } = useFetchMe();
	const router = useRouter();
	return useToastMutation<ICredentials>(
		"signIn",
		signIn,
		"ኢሜልዎን እና የይለፍ ቃልዎን በማረጋገጥ ላይ፣ እባክዎ ይጠብቁ...",
		{
			onSuccess: async (variables) => {
				try {
					// await refetch();
					console.log("Signed up and fetched profile successfully:", variables);
					router.push("/home");
				} catch (error) {
					console.error("Error fetching profile after signup:", error);
				}
			},
		}
	);
};

export const useSignUp = () => {
	const router = useRouter();
	return useToastMutation<ICredentials>(
		"signUp",
		signUp,
		"ኢሜልዎን እና የይለፍ ቃልዎን በማረጋገጥ ላይ፣ እባክዎ ይጠብቁ...",
		{
			onSuccess: (variables) => {
				router.push("/auth/sign-in" as `/${string}`);
				console.log("Signed in successfully:", variables);
			},
		}
	);
};
