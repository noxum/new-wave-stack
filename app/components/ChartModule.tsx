import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Legend,
	Pie,
	PieChart,
	Tooltip,
	XAxis,
	YAxis,
	ResponsiveContainer,
} from "recharts";
import { ChartModuleReferences, ChartModuleDataProps } from "~/api/api.types";
import { Grid } from "./Grid";

export interface IChartModuleProps extends ChartModuleDataProps, ChartModuleReferences {}

export default function ChartModule({ chartType, chartItems }: IChartModuleProps) {
	const dataProps = chartItems.map((ci) => {
		return { title: ci.props.title, value: ci.props.chartValue };
	});

	return (
		<Grid medium className="relative rounded-sm border pr-5 pb-5">
			<div className=" h-[400px] w-full">
				<>
					{chartType === "bar" && (
						<ResponsiveContainer width="100%" height="100%">
							<BarChart
								data={dataProps}
								width={300}
								height={200}
								maxBarSize={40}
								className="mx-auto mb-3"
							>
								<CartesianGrid strokeDasharray="2 2" />
								<XAxis dataKey="title" />
								<YAxis />
								<Tooltip content={<CustomTooltip />} wrapperStyle={{ outline: "none" }} />
								<Legend />
								<Bar dataKey="value">
									{chartItems.map((entry, index) => (
										<Cell key={`cell-${index}`} fill={entry.props.chartColor as string} />
									))}
								</Bar>
							</BarChart>
						</ResponsiveContainer>
					)}
					{chartType === "column" && (
						<ResponsiveContainer width="100%" height="100%">
							<BarChart
								data={dataProps}
								layout="vertical"
								width={300}
								height={200}
								maxBarSize={40}
								className="mx-auto mb-3"
							>
								<CartesianGrid strokeDasharray="2 2" />
								<XAxis type="number" />
								<YAxis type="category" dataKey="title" />
								<Tooltip content={<CustomTooltip />} wrapperStyle={{ outline: "none" }} />
								<Legend />
								<Bar dataKey="value">
									{chartItems.map((entry, index) => (
										<Cell key={`cell-${index}`} fill={entry.props.chartColor as string} />
									))}
								</Bar>
							</BarChart>
						</ResponsiveContainer>
					)}
					{(chartType === "doughnut" || chartType === "pie") && (
						<ResponsiveContainer width="100%" height="100%">
							<PieChart width={300} height={200} className="mx-auto mb-3">
								<Tooltip content={<CustomTooltip />} wrapperStyle={{ outline: "none" }} />
								<Legend />
								<Pie
									data={dataProps}
									innerRadius={chartType == "doughnut" ? 40 : 0}
									outerRadius={100}
									dataKey="value"
									label
								>
									{chartItems.map((entry, index) => (
										<Cell
											name={entry.props.title as string}
											key={`cell-${index}`}
											fill={entry.props.chartColor as string}
										/>
									))}
								</Pie>
							</PieChart>
						</ResponsiveContainer>
					)}
				</>
			</div>
		</Grid>
	);
}

const CustomTooltip = ({ active, payload, label }: any) => {
	if (active && payload && payload.length) {
		return (
			<div className="custom-tooltip rounded-sm bg-white p-3 shadow-lg">
				<p className="label prose text-sm">{`${label ?? payload[0].payload.title} : ${payload[0].value}`}</p>
			</div>
		);
	}
	return null;
};
