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
		// set((state) => ({ count_zustand: state.count_zustand - 1 })),
		const request = await fetch("http://localhost:3000/countries");

		const { response } = (await request.json()) as Record<string, unknown>;

		set({ countries: response as Country[] });
	},
	get_country: async (code: string) => {
		// set((state) => ({ count_zustand: state.count_zustand - 1 })),
		const request = await fetch(`http://localhost:3000/countries/${code}`);

		const { response } = (await request.json()) as Record<string, unknown>;

		set({ country: response as Country });
	},
}));

export default useCountryStore;
