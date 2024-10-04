import AddUserForm from "@/components/module/user-module/UserForm/AddUserForm";
import PageSubTitle from "@/components/shared/Titles/PageSubTitle";
import { Separator } from "@/components/ui/separator";

const AddUserScreen = () => {
	return (
		<div className="p-2 space-y-4">
			<PageSubTitle
				title="Add Organization Memeber 👤"
				desc="Here add all the valuable infomation to create a member for DMS"
			/>
			<Separator />
			<AddUserForm />
		</div>
	);
};

export default AddUserScreen;
