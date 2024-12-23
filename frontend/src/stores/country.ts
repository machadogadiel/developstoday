import { create } from "zustand";

export type Country = {
	name: string;
	countryCode: string;
	commonName: string;
	region: string;
	flag: string;
	borders: Country[];
	populationHistory: {
		country: string;
		code: string;
		iso3: string;
		populationCounts: {
			year: number;
			value: number;
		}[];
	};
};

interface Store {
	countries: Country[];
	country: Country | null;
	fetch_countries: () => Promise<void>;
	get_country: (code: string) => Promise<void>;
}

const useCountryStore = create<Store>((set) => ({
	country: null,
	countries: [],
	fetch_countries: async () => {
		const request = await fetch(`${import.meta.env.VITE_API_URL}/countries`);

		const { response } = (await request.json()) as Record<string, unknown>;

		set({ countries: response as Country[] });
	},
	get_country: async (code: string) => {
		const request = await fetch(`${import.meta.env.VITE_API_URL}/countries/${code}`);

		const { response } = (await request.json()) as Record<string, unknown>;

		set({ country: response as Country });
	},
}));

export default useCountryStore;
