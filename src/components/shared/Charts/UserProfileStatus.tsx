"use client";

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

// Profile completion data
const profileCompletionData = [
	{ name: "Profile Completion", value: 75, value_left: 25 }, // 75% completed, 25% remaining
];

const chartConfig = {
	completion: {
		label: "Profile Completion",
		color: "hsl(var(--chart-1))", // color for the completion bar
	},
	leftValueToComplete: {
		label: "Left Percentage",
		color: "hsl(var(--chart-2))", // color for the remaining bar
	},
} satisfies ChartConfig;

export function UserProfileCompletion() {
	const profileCompletion = profileCompletionData[0].value;

	return (
		<Card className="flex flex-col ">
			<CardHeader className="items-center pb-0">
				<CardTitle>Profile Completion</CardTitle>
				<CardDescription>Your progress so far</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-1 items-center pb-0">
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square w-full max-w-[150px]"
				>
					<RadialBarChart
						data={profileCompletionData}
						endAngle={180}
						innerRadius={60} // Adjusted inner radius
						outerRadius={100} // Adjusted outer radius
						barSize={10}
					>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
							<Label
								content={({ viewBox }) => {
									if (viewBox && "cx" in viewBox && "cy" in viewBox) {
										return (
											<text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy || 0) - 16}
													className="fill-foreground text-2xl font-bold"
												>
													{profileCompletion}%
												</tspan>
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy || 0) + 4}
													className="fill-muted-foreground"
												>
													Complete
												</tspan>
											</text>
										);
									}
								}}
							/>
						</PolarRadiusAxis>
						<RadialBar
							dataKey="value"
							cornerRadius={5}
							stackId="a"
							fill="var(--color-completion)"
							className="stroke-transparent stroke-2"
						/>
						<RadialBar
							dataKey="value_left"
							stackId="a"
							cornerRadius={5}
							fill="var(--color-leftValueToComplete)"
							className="stroke-transparent stroke-2"
						/>
					</RadialBarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
