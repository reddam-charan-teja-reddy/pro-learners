import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import CourseCard from '../PathCard/PathCard';
import { PathData, PathsApiResponse } from '@/utils/types';
import { RootState } from '@/store/store';

const HomePage = () => {
	const [paths, setPaths] = useState<PathData[]>([]);
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
					`/api/userPaths?userId=${userData.userDetails.uid}`
				);
				const pathsData: PathsApiResponse = await response.json();
				setPaths(pathsData.paths);
			} catch (err) {
				setError('Failed to fetch courses');
			}
		};

		fetchCourses();
	}, [userData.userDetails.uid]);

	if (error) return <div>{error}</div>;

	return (
		<div>
			{paths.map((path: PathData) => (
				<CourseCard key={path.pathCode} {...path} />
			))}
		</div>
	);
};

export default HomePage;
