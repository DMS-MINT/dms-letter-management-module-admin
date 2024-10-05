import { Card } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

type UserDetailProps = {
	data: { name: string; value: string }[];
	title: string;
	desc: string;
};

const UserDetailTable = ({ data, title, desc }: UserDetailProps) => {
	return (
		<Card>
			<Table>
				<TableCaption>{desc}</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="font-bold" colSpan={2}>
							{title}
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.map((item, index) => (
						<TableRow key={index}>
							<TableCell className="font-medium w-1/2">{item.name}</TableCell>
							<TableCell>{item.value}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Card>
	);
};

export default UserDetailTable;
