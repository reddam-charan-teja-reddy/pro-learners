import { PathData, Roadmap } from '@/utils/types';
import styles from '@/styles/shared.module.css';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const PathCard = (roadmap: Roadmap) => {
	const { id, userId, title, goal, milestones, createdAt, progress } = roadmap;
	const progressPercentage =
		milestones.length > 0 ? (milestones.length / milestones.length) * 100 : 0;

	return (
		<motion.div
			whileHover={{ scale: 1.02 }}
			className={clsx(styles.card, 'relative overflow-hidden')}
		>
			<div className='space-y-4'>
				<h2 className='text-xl font-semibold text-gray-900'>{title}</h2>
				<p className='text-gray-600 text-sm line-clamp-2'>{goal}</p>

				<div className='mt-4'>
					<div className='flex justify-between text-sm text-gray-600 mb-2'>
						<span>Progress</span>
						<span>{Math.round(progressPercentage)}%</span>
					</div>
					<div className='w-full bg-gray-200 rounded-full h-2'>
						<motion.div
							initial={{ width: 0 }}
							animate={{ width: `${progress}%` }}
							transition={{ duration: 0.5, ease: 'easeOut' }}
							className='h-full bg-indigo-600 rounded-full'
						/>
					</div>
				</div>

				<div className='flex justify-between items-center mt-6'>
					<div className='space-y-1'>
						<p className='text-sm text-gray-600'>Goals</p>
						<p className='text-sm font-medium'>
							{milestones.length} / {milestones.length} completed
						</p>
					</div>
					<button id={id} className={clsx(styles.button, 'group')}>
						Resume
						<ArrowRightIcon className='ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform' />
					</button>
				</div>
			</div>
		</motion.div>
	);
};

export default PathCard;
