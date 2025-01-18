'use client';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import CourseCard from '../PathCard/PathCard';
import { PathData, PathsApiResponse } from '@/utils/types';
import { RootState } from '@/store/store';
import { setUserPaths } from '@/store/userPathsSlice';
import Logout from '../Logout/Logout';
const HomePage = () => {
	const dispatch = useDispatch();
	const [error, setError] = useState<string>('');
	const userData = useSelector((state: RootState) => state.user);
	const paths = useSelector((state: RootState) => state.userPaths.paths);
	if (!userData.authState) {
		const router = useRouter();
		router.push('/login');
	}
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
				dispatch(setUserPaths(pathsData));
			} catch (err) {
				setError('Failed to fetch courses');
			}
		};

		fetchCourses();
	}, [userData.userDetails.uid]);

	if (error) return <div>{error}</div>;

	return (
		<div>
			<Logout />
			<ul>
				{paths.map((path: PathData, index: number) => (
					<li key={`${path.pathCode}-${index}`}>
						<CourseCard {...path} />
					</li>
				))}
			</ul>
		</div>
	);
};

export default HomePage;
