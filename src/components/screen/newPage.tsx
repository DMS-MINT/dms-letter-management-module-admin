"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/storehooks";
import { SetLoading } from "@/lib/store/redux/loadersSlice";

type Props = {};

const NewPage = (props: Props) => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const handleLoading = () => {
		dispatch(SetLoading(true));

		setTimeout(() => {
			dispatch(SetLoading(false));
			router.push("/");
		}, 10000);
	};
	return (
		<div>
			<Button onClick={() => handleLoading()}>loading</Button>
		</div>
	);
};

export default NewPage;
