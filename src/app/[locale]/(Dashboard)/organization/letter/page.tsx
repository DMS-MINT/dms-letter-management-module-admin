import PageSubTitle from "@/components/shared/Titles/PageSubTitle";

type Props = {};

const LetterManagementPage = (props: Props) => {
	return (
		<div>
			<div className="p-4 space-y-6 mb-20">
				<div className="flex items-center justify-between space-y-2">
					<PageSubTitle
						title="All letter Management "
						desc="Here are a list of your letter for DMS"
					/>
					Deleted letter retrival , letter template
				</div>
			</div>
		</div>
	);
};

export default LetterManagementPage;
