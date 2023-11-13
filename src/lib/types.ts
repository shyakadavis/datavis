export type StudentData = {
	name: string;
	hours: number;
	grade: number;
};

export type Margin = {
	top: number;
	right: number;
	bottom: number;
	left: number;
};

export type TicksParams = {
	interval: number;
	array_length: number;
};

export type ComicCharacter = {
	id: number;
	name: string;
	slug: string;
	powerstats: {
		intelligence: number;
		strength: number;
		speed: number;
		durability: number;
		power: number;
		combat: number;
	};
	appearance: {
		gender: string;
		race: string | null;
		height: string[];
		weight: string[];
		eyeColor: string;
		hairColor: string;
	};
	biography: {
		fullName: string;
		alterEgos: string;
		aliases: string[];
		placeOfBirth: string;
		firstAppearance: string;
		publisher: string | null;
		alignment: string;
	};
	work: {
		occupation: string;
		base: string;
	};
	connections: {
		groupAffiliation: string;
		relatives: string;
	};
	images: {
		xs: string;
		sm: string;
		md: string;
		lg: string;
	};
};
