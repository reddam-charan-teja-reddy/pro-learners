import { PathData } from '@/utils/types';
import styles from '@/styles/shared.module.css';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const PathCard = (pathDetails: PathData) => {
	const { title, description, assignedGoals, completedGoals, pathCode } =
		pathDetails;
	const progress = completedGoals ? (completedGoals / assignedGoals) * 100 : 0;

	return (
		<motion.div
			whileHover={{ scale: 1.02 }}
			className={clsx(styles.card, 'relative overflow-hidden')}
		>
			<div className='space-y-4'>
				<h2 className='text-xl font-semibold text-gray-900'>{title}</h2>
				<p className='text-gray-600 text-sm line-clamp-2'>{description}</p>

				<div className='mt-4'>
					<div className='flex justify-between text-sm text-gray-600 mb-2'>
						<span>Progress</span>
						<span>{Math.round(progress)}%</span>
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
							{completedGoals} / {assignedGoals} completed
						</p>
					</div>
					<button id={pathCode} className={clsx(styles.button, 'group')}>
						Resume
						<ArrowRightIcon className='ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform' />
					</button>
				</div>
			</div>
		</motion.div>
	);
};

export default PathCard;
