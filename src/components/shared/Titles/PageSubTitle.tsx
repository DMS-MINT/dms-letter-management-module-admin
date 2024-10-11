type PageSubTitleProps = {
	title: string;
	desc: string;
};
const PageSubTitle = ({ title, desc }: PageSubTitleProps) => {
	return (
		<div>
			<h2 className="md:text-2xl text-lg font-bold tracking-tight">{title}</h2>
			<p className="text-muted-foreground text-sm md:text-md">{desc}</p>
		</div>
	);
};

export default PageSubTitle;
