import CountryList from "@/components/list/CountryList";
import useCountryStore from "@/stores/country";
import { useEffect } from "react";

export default function Home(): React.ReactElement {
	const { countries, fetch_countries } = useCountryStore();

	useEffect(() => {
		fetch_countries();
	}, [fetch_countries]);

	return (
		<div className="flex min-h-screen flex-col items-center">
			<h1 className="m-6 font-mono text-lg font-extrabold text-blue-700">
				Country check (click on country to see more details)
			</h1>

			<div>
				<div style={{ width: 500 }}>
					<CountryList countries={countries} />
				</div>
			</div>
		</div>
	);
}
