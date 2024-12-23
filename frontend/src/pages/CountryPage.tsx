import CountryPopulationChart from "@/components/charts/CountryPopulationChart";
import CountryList from "@/components/list/CountryList";
import useCountryStore from "@/stores/country";
import { useEffect } from "react";
interface Props {
	code: string;
}

export default function CountryDetailsPage({
	code,
}: Props): React.ReactElement {
	const { country, get_country } = useCountryStore();

	useEffect(() => {
		get_country(code);
	}, [code, get_country]);

	return (
		<div className="flex h-screen w-screen flex-col items-center">
			<div className="max-w-md rounded-md border border-gray-200 bg-white shadow">
				<img className="rounded-t-lg" src={country?.flag} alt="" />

				<div className="p-5">
					<h5 className="text-2xl font-bold tracking-tight text-gray-900">
						{country?.commonName}
					</h5>

					<div className="mb-5 font-normal">
						<span className="my-3">
							Countries that share a border with {country?.commonName}:{" "}
						</span>

						<CountryList countries={country?.borders || []} />
					</div>

					<div> Population growth over time:</div>
					<div>
						{country?.populationHistory.populationCounts && (
							<CountryPopulationChart
								seriesData={[
									{
										name: "Population",
										data: country.populationHistory.populationCounts.map((pop) => pop.value),
									},
								]}
								categories={country.populationHistory.populationCounts.map((pop) =>
									pop.year.toString(),
								)}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
