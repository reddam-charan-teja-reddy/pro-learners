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

export interface HowTo {
	type: 'resource' | 'course' | 'activity';
	description: string;
}

export interface Milestone {
	title: string;
	outcome: string;
	how_to: HowTo[];
	isCompleted?: boolean;
	rating?: number;
}

export interface RoadmapData {
	goal: string;
	milestones: Milestone[];
}

export interface Roadmap {
	id: string;
	userId: string;
	title: string;
	goal: string;
	milestones: Milestone[];
	createdAt: string;
	progress: number;
}
