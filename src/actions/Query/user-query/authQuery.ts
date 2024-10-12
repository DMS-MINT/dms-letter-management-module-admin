"use client";

import { useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import {
	type ICredentials,
	signIn,
	signOut,
	signUp,
} from "@/actions/auth/action";
import { useAppDispatch } from "@/hooks/storehooks";
import useToastMutation from "@/hooks/useToastMutation";
import {
	ClearTenants,
	SetHaveMultiTenant,
	SetTenants,
} from "@/lib/store/redux/tenatsSlice";
import { ClearCurrentUser } from "@/lib/store/redux/usersSlice";
import { type TenantType } from "@/types/TenantType";

type SignInResponseData = {
	session: string;
	tenants: TenantType[] | null;
};

export const useLogout = () => {
	const router = useRouter(); // Initialize the router
	const dispatch = useAppDispatch();
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
			dispatch(ClearTenants());
			dispatch(ClearCurrentUser());
			router.push("/auth/sign-in" as `/${string}`);
		},
		onError: (errorMessage: string) => {
			toast.dismiss();
			toast.error(errorMessage);
		},
	});
};
export const useSignIn = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	// const { refetch } = useFetchMe();

	return useToastMutation<ICredentials>(
		"signIn",
		signIn,
		"ኢሜልዎን እና የይለፍ ቃልዎን በማረጋገጥ ላይ፣ እባክዎ ይጠብቁ...",
		{
			onSuccess: async (variables) => {
				try {
					const data = variables.data as SignInResponseData;

					// If tenants array is empty or null
					if (!Array.isArray(data.tenants) || data.tenants.length === 0) {
						console.error("No tenants available");
						router.push("/launchPad");
						return;
					}

					// If there are multiple tenants
					if (data.tenants.length >= 2) {
						console.error("More than one tenant available");
						dispatch(SetHaveMultiTenant(true));
						dispatch(SetTenants(data.tenants));
						return;
					}

					// Single tenant case
					// await refetch();

					const firstTenant = data.tenants[0];
					console.log("First tenant:", firstTenant);

					dispatch(SetTenants(firstTenant));
					router.push("/home");
				} catch (error) {
					// Handle error
					console.error("Error fetching profile after signup:", error);
					toast.error("An error occurred while signing in.");
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
