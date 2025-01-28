'use client';

import { useState } from 'react';
import styles from './PlusPage.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { addRoadmap, setLoading, setError } from '@/store/roadmapsSlice';
import { useRouter } from 'next/navigation';
import { RoadmapData } from '@/utils/types';
import { FiArrowRight, FiLoader } from 'react-icons/fi';
import Navbar from '../Navbar/Navbar';

const PlusPage = () => {
	const [input, setInput] = useState('');
	const dispatch = useDispatch();
	const router = useRouter();

	const isLoading = useSelector((state: RootState) => state.roadmaps.loading);
	const error = useSelector((state: RootState) => state.roadmaps.error);
	const pathManagementState = useSelector(
		(state: RootState) => state.userPathManagement
	);
	const userInterests = useSelector((state: RootState) => state.userInterests);
	const userSkills = useSelector((state: RootState) => state.userSkills);
	const user = useSelector((state: RootState) => state.user.userDetails);

	const generateRoadmap = async () => {
		console.log('input', input);
		try {
			dispatch(setLoading(true));
			dispatch(setError(null));

			// Generate roadmap using AI
			const aiResponse = await fetch('/api/plus', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					query: input,
					interests: userInterests.interests,
					education: pathManagementState.currentEducation,
					country: pathManagementState.country,
					customMsg: pathManagementState.customMsg,
					skills: userSkills.skills,
				}),
			});

			if (!aiResponse.ok) {
				throw new Error('Failed to generate roadmap');
			}

			const data: RoadmapData = await aiResponse.json();

			// Create roadmap object
			const newRoadmap = {
				id: Date.now().toString(),
				userId: user.uid,
				title: input,
				goal: data.goal,
				milestones: data.milestones.map((milestone) => ({
					...milestone,
					isCompleted: false,
				})),
				createdAt: new Date().toISOString(),
				progress: 0,
			};

			// Save to database
			const dbResponse = await fetch('/api/roadmaps', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newRoadmap),
			});

			if (!dbResponse.ok) {
				throw new Error('Failed to save roadmap');
			}

			const savedRoadmap = await dbResponse.json();

			// Add to Redux store
			dispatch(addRoadmap(savedRoadmap));

			// Clear input and redirect to roadmaps page
			setInput('');
			router.push('/roadmaps');
		} catch (error) {
			console.error('Error:', error);
			dispatch(
				setError(error instanceof Error ? error.message : 'An error occurred')
			);
		} finally {
			dispatch(setLoading(false));
		}
	};

	return (
		<div className={styles.pageContainer}>
			<Navbar />
			<div className={styles.contentWrapper}>
				<div className={styles.headerSection}>
					<h1 className={styles.title}>Create Your Learning Journey</h1>
					<p className={styles.subtitle}>
						Tell us what you want to learn, and we'll create a personalized roadmap
						just for you.
					</p>
				</div>

				<div className={styles.inputSection}>
					<div className={styles.inputWrapper}>
						<input
							type='text'
							className={styles.input}
							placeholder='What do you want to learn? (e.g., I want to become a Data Scientist)'
							value={input}
							onChange={(e) => setInput(e.target.value)}
							disabled={isLoading}
						/>
						<button
							className={styles.generateButton}
							onClick={generateRoadmap}
							disabled={isLoading || !input.trim()}
						>
							{isLoading ? (
								<span className={styles.loadingWrapper}>
									<FiLoader size={20} />
									Generating...
								</span>
							) : (
								<span className={styles.buttonContent}>
									Generate Roadmap
									<FiArrowRight size={20} />
								</span>
							)}
						</button>
					</div>
					{error && <div className={styles.errorMessage}>{error}</div>}
				</div>

				{isLoading && (
					<div className={styles.loadingSection}>
						<div className={styles.loadingCard}>
							<FiLoader size={32} />
							<p>Creating your personalized learning roadmap...</p>
							<p className={styles.loadingSubtext}>This may take a minute</p>
						</div>
					</div>
				)}

				<div className={styles.featuresSection}>
					<div className={styles.featureCard}>
						<h3>Personalized Learning Path</h3>
						<p>Get a customized roadmap based on your goals and interests</p>
					</div>
					<div className={styles.featureCard}>
						<h3>Structured Milestones</h3>
						<p>Break down your learning journey into achievable steps</p>
					</div>
					<div className={styles.featureCard}>
						<h3>Curated Resources</h3>
						<p>Access hand-picked courses and materials from trusted sources</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PlusPage;
