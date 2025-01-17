import { PathData } from '@/utils/types';
const PathCard = (pathDetails: PathData) => {
	const { title, description, assignedGoals, completedGoals, pathCode } =
		pathDetails;
	//  the course code will be later used to retrive the course created for the user
	// from mongoDb and display the data and the resume button will redirect it to the course page
	return (
		<div>
			<h2>{title}</h2>
			<p>{description}</p>
			{/* the assigned goals and completed goals will be used to show the progress of the user */}
			{/** the path code will be used to redirect to the path/:id page later */}
			<button id={pathCode}>resume</button>
		</div>
	);
};
export default PathCard;
