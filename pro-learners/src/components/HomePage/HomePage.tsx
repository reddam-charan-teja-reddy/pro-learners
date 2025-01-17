import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import CourseCard from '../CourseCard/CourseCard';
import { CourseData, CourseApiResponse } from '@/utils/types';
import { RootState } from '@/store/store';

const HomePage = () => {
	const [courses, setCourses] = useState<CourseData[]>([]);
	const [error, setError] = useState<string>('');
	const userData = useSelector((state: RootState) => state.user);

	useEffect(() => {
		const fetchCourses = async () => {
			if (!userData.authState) {
				setError('User not authenticated');
				return;
			}

			try {
				const response = await fetch(
					`/api/userCourses?userId=${userData.userDetails.uid}`
				);
				const coursesData: CourseApiResponse = await response.json();
				setCourses(coursesData.data);
			} catch (err) {
				setError('Failed to fetch courses');
			}
		};

		fetchCourses();
	}, [userData.userDetails.uid]);

	if (error) return <div>{error}</div>;

	return (
		<div>
			{courses.map((course: CourseData) => (
				<CourseCard key={course.courseCode} {...course} />
			))}
		</div>
	);
};

export default HomePage;
