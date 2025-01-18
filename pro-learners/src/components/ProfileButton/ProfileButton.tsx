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

const ProfileButton = () => {
	const user = useSelector((state: RootState) => state.user);
	// later add onclick event to conditional render profile view as a <modal />
	// follow the following documentation: https://www.heroui.com/docs/components/modal
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
							<p>profile</p>
						</>
					)}
				</ModalContent>
			</Modal>
		</div>
	);
};

export default ProfileButton;
