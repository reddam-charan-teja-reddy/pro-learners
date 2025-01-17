export type PathData = {
	title: string;
	description: string;
	assignedGoals: number;
	completedGoals: number;
	pathCode: string;
};

export type PathsApiResponse = {
	paths: PathData[];
	userId: string;
};
