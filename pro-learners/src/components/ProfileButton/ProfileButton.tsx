import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { Modal, ModalContent, useDisclosure } from '@nextui-org/react';
import ProfilePage from '../ProfilePage/ProfilePage';
import styles from '@/styles/shared.module.css';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useState } from 'react';

const ProfileButton = () => {
	const user = useSelector((state: RootState) => state.user);
	// follow the following documentation for any changes or references: https://www.heroui.com/docs/components/modal
	const [modalIsOpen, setModalIsOpen] = useState(true);

	return (
		<div className='relative'>
			<motion.button
				onClick={() => setModalIsOpen(true)}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				className={clsx(
					'relative rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
					'group'
				)}
			>
				<Image
					src={user.userDetails.photoURL}
					alt={`${user.userDetails.name}'s profile`}
					width={40}
					height={40}
					className={clsx(
						styles.profileImage,
						'group-hover:border-indigo-500 transition-colors duration-200'
					)}
				/>
				<motion.div
					className='absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-white'
					animate={{
						scale: [1, 1.2, 1],
					}}
					transition={{
						duration: 2,
						repeat: Infinity,
						repeatType: 'reverse',
					}}
				/>
			</motion.button>

			<Modal
				isOpen={modalIsOpen}
				onOpenChange={() => setModalIsOpen(!modalIsOpen)}
				className={styles.modalContent}
				size='2xl'
				scrollBehavior='inside'
			>
				<ModalContent>
					{(onClose: () => void) => (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 20 }}
						>
							<ProfilePage />
						</motion.div>
					)}
				</ModalContent>
			</Modal>
		</div>
	);
};

export default ProfileButton;
