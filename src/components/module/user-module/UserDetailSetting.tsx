import DeactivateUserForm from "./UserForm/DeactivateUserForm";
import DeleteUserForm from "./UserForm/DeleteUserForm";

type Props = {};

const UserDetailSetting = (props: Props) => {
	return (
		<div>
			<DeactivateUserForm />
			<div className="text-sm text-muted-foreground justify-end flex mx-10">
				Once you delete a user, there is no going back. Please be certain.
			</div>
			<DeleteUserForm />
		</div>
	);
};

export default UserDetailSetting;
