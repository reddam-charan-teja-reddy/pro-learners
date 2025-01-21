// components/Interests.tsx
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	Button,
	useDisclosure,
	Input,
} from '@heroui/react'; // Changed from @heroui/react to @nextui-org/react
import { useState, useEffect } from 'react';
import { RootState } from '@/store/store';
import { useSelector, useDispatch } from 'react-redux';
import { setUserInterests } from '@/store/userInterestsSlice';

const Interests = () => {
	const dispatch = useDispatch();
	const [newInterest, setNewInterest] = useState<string>('');
	const userInterests = useSelector((state: RootState) => state.userInterests);
	const user = useSelector((state: RootState) => state.user);
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	// Function to add new interest
	const addInterest = async () => {
		if (!newInterest.trim()) return;

		try {
			const res = await fetch('/api/interests', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					userId: user.userDetails.uid,
					interest: newInterest.trim(),
				}),
			});
			if (res.ok) {
				const data = await res.json();
				dispatch(
					setUserInterests({
						interests: data.interests,
						userId: user.userDetails.uid,
					})
				);
				setNewInterest(''); // Clear input after successful addition
				console.log(data);
			} else {
				console.log('res', res);
			}
		} catch (error) {
			console.error('Error adding interest:', error);
		}
	};

	// Function to get the user's interests
	const getInterests = async () => {
		try {
			const res = await fetch(`/api/interests?userId=${user.userDetails.uid}`);
			const data = await res.json();
			return data.interests || [];
		} catch (error) {
			console.error('Error fetching interests:', error);
			return [];
		}
	};

	// Fetch interests on component mount and user change
	useEffect(() => {
		const fetchInterests = async () => {
			const interestsArr = await getInterests();
			dispatch(
				setUserInterests({
					interests: interestsArr,
					userId: user.userDetails.uid,
				})
			);
		};

		if (user.userDetails?.uid) {
			fetchInterests();
		}
	}, [user.userDetails?.uid]);

	return (
		<div>
			<Button onPress={onOpen}>Interests</Button>
			<Modal isOpen={isOpen} placement='top-center' onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className='flex flex-col gap-1'>
								Manage Interests
							</ModalHeader>
							<ModalBody>
								<div className='mb-4'>
									{userInterests.interests.length > 0 ? (
										<ul className='list-disc pl-4'>
											{userInterests.interests.map((interest, index) => (
												<li key={index} className='mb-2'>
													{interest}
												</li>
											))}
										</ul>
									) : (
										<p>No interests added yet</p>
									)}
								</div>

								<div className='flex gap-2'>
									<Input
										value={newInterest}
										onChange={(e) => setNewInterest(e.target.value)}
										label='Interest'
										placeholder='Enter your interest'
										className='flex-1'
									/>
								</div>

								<div className='flex justify-end gap-2 mt-4'>
									<Button color='danger' variant='light' onPress={onClose}>
										Close
									</Button>
									<Button color='primary' onPress={addInterest}>
										Add Interest
									</Button>
								</div>
							</ModalBody>
						</>
					)}
				</ModalContent>
			</Modal>
		</div>
	);
};

export default Interests;
