import { ActiveUserChart } from "@/components/shared/Charts/ActiveUserChart";
import { UserNumberPieChart } from "@/components/shared/Charts/UserNumberPieChart";

type Props = {};

const UserStatus = (props: Props) => {
	return (
		<div>
			<div className="flex flex-col gap-4 md:flex-row flex-wrap items-center justify-center">
				<UserNumberPieChart />
				<ActiveUserChart />
				<ActiveUserChart />
			</div>
		</div>
	);
};

export default UserStatus;
