import type { Country } from "@/stores/country";

interface Props {
	countries: Country[];
}

export default function CountryList(props: Props): React.ReactElement {
	return (
		<ol className="divide-y divide-gray-200">
			{props.countries.map((country) => (
				<li
					className="flex cursor-pointer py-2 text-lg font-medium text-gray-900 hover:text-blue-700"
					key={country.name || country.commonName}
				>
					<a
						href={`/country/${country.countryCode}`}
					>{`${country.name || country.commonName}`}</a>
				</li>
			))}
		</ol>
	);
}
