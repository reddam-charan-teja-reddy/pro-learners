'use client';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import CourseCard from '../PathCard/PathCard';
import { PathData, PathsApiResponse } from '@/utils/types';
import { RootState } from '@/store/store';
import { setUserPaths } from '@/store/userPathsSlice';
import Logout from '../Logout/Logout';
import Navbar from '@/components/Navbar/Navbar';
import ProfileButton from '../ProfileButton/ProfileButton';
import styles from '@/styles/shared.module.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

const HomePage = () => {
	const dispatch = useDispatch();
	const [error, setError] = useState<string>('');
	const [isLoading, setIsLoading] = useState(true);
	const userData = useSelector((state: RootState) => state.user);
	const paths = useSelector((state: RootState) => state.userPaths.paths);
	const router = useRouter();

	if (!userData.authState) {
		router.push('/login');
		return null;
	}

	useEffect(() => {
		const fetchCourses = async () => {
			if (!userData.authState) {
				setError('User not authenticated');
				return;
			}

			try {
				setIsLoading(true);
				const response = await fetch(
					`/api/userPaths?userId=${userData.userDetails.uid}`
				);
				if (!response.ok) {
					throw new Error('Failed to fetch courses');
				}
				const pathsData: PathsApiResponse = await response.json();
				dispatch(setUserPaths(pathsData));
			} catch (err) {
				setError('Failed to fetch courses');
			} finally {
				setIsLoading(false);
			}
		};

		fetchCourses();
	}, [userData.userDetails?.uid]);

	const renderContent = () => {
		if (error) {
			return (
				<div className='text-center py-12'>
					<ExclamationCircleIcon className='mx-auto h-12 w-12 text-red-500' />
					<h3 className='mt-2 text-sm font-semibold text-gray-900'>Error</h3>
					<p className='mt-1 text-sm text-gray-500'>{error}</p>
					<button
						onClick={() => window.location.reload()}
						className={clsx(styles.button, 'mt-6')}
					>
						Try again
					</button>
				</div>
			);
		}

		if (isLoading) {
			return (
				<div className={styles.gridLayout}>
					{[...Array(6)].map((_, index) => (
						<div key={index} className={styles.card}>
							<Skeleton height={24} width='60%' className='mb-4' />
							<Skeleton count={2} className='mb-4' />
							<Skeleton height={8} width='100%' className='mb-2' />
							<div className='flex justify-between items-center mt-4'>
								<Skeleton width={100} />
								<Skeleton width={80} height={36} />
							</div>
						</div>
					))}
				</div>
			);
		}

		if (paths.length === 0) {
			return (
				<div className='text-center py-12'>
					<h3 className='mt-2 text-sm font-semibold text-gray-900'>
						No paths found
					</h3>
					<p className='mt-1 text-sm text-gray-500'>
						Get started by creating a new learning path.
					</p>
					<button
						onClick={() => router.push('/plus')}
						className={clsx(styles.button, 'mt-6')}
					>
						Create Path
					</button>
				</div>
			);
		}

		return (
			<div className={styles.gridLayout}>
				{paths.map((path: PathData, index: number) => (
					<CourseCard key={`${path.pathCode}-${index}`} {...path} />
				))}
			</div>
		);
	};

	return (
		<div className='min-h-screen bg-gray-50'>
			<Navbar />
			<div className='pt-4 pb-24 sm:pt-16 sm:pb-0'>
				<div className={styles.container}>
					<div className='flex justify-between items-center mb-8'>
						<h1 className='text-2xl font-bold text-gray-900'>Your Learning Paths</h1>
						<div className='flex items-center space-x-4'>
							<ProfileButton />
							<Logout />
						</div>
					</div>
					{renderContent()}
				</div>
			</div>
		</div>
	);
};

export default HomePage;
