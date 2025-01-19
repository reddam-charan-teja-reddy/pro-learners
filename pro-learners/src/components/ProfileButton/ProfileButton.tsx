import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	useDisclosure,
} from '@heroui/modal';
import ProfilePage from '../ProfilePage/ProfilePage';

const ProfileButton = () => {
	const user = useSelector((state: RootState) => state.user);
	// follow the following documentation for any changes or references: https://www.heroui.com/docs/components/modal
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	return (
		<div>
			<button onClick={onOpen}>
				<Image
					src={user.userDetails.photoURL}
					alt='profile'
					width={50}
					height={50}
				/>
			</button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ProfilePage />
						</>
					)}
				</ModalContent>
			</Modal>
		</div>
	);
};

export default ProfileButton;
