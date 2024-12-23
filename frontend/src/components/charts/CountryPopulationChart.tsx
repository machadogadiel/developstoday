import ReactApexChart from "react-apexcharts";
interface Props {
	categories: string[];
	seriesData: {
		name: string;
		data: number[];
	}[];
}
export default function CountryPopulationChart({
	categories,
	seriesData,
}: Props): React.ReactElement {
	const chartOptions = {
		chart: {
			type: "line",
		},
		series: seriesData,
		xaxis: {
			categories: categories,
		},
	};

	return (
		<div id="chart">
			<ReactApexChart
				// @ts-ignore
				options={chartOptions}
				series={chartOptions.series}
				type="area"
				height={350}
			/>
		</div>
	);
}
