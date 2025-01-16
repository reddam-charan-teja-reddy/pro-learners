import { CourseData } from '@/utils/types';
const CourseCard = (courseDetails: CourseData) => {
	const { title, description, courseCode } = courseDetails;
	//  the course code will be later used to retrive the course created for the user
	// from mongoDb and display the data and the resume button will redirect it to the course page
	return (
		<div>
			<h2>{title}</h2>
			<p>{description}</p>
			<button id={courseCode}>resume</button>
		</div>
	);
};
export default CourseCard;
