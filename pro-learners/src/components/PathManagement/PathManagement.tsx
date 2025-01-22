import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	Button,
	useDisclosure,
	Input,
	Select,
	SelectItem,
} from '@heroui/react';
import { useState, useEffect } from 'react';
import { RootState } from '@/store/store';
import { useSelector, useDispatch } from 'react-redux';
import { setUserPathManagement } from '@/store/userPathManagementSlice';

const PathManagement = () => {
	const dispatch = useDispatch();
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [formData, setFormData] = useState({
		customMsg: '',
		learningSpeed: 'medium',
		currentEducation: '',
		country: '',
	});

	const pathManagement = useSelector(
		(state: RootState) => state.userPathManagement
	);
	const user = useSelector((state: RootState) => state.user);
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	useEffect(() => {
		setFormData({
			customMsg: pathManagement.customMsg,
			learningSpeed: pathManagement.learningSpeed,
			currentEducation: pathManagement.currentEducation,
			country: pathManagement.country,
		});
	}, [pathManagement]);

	const handleSubmit = async () => {
		console.log(formData);
		if (!formData.customMsg.trim()) return;

		try {
			const res = await fetch('/api/pathManagement', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					userId: user.userDetails.uid,
					...formData,
				}),
			});

			if (res.ok) {
				const data = await res.json();
				dispatch(
					setUserPathManagement({
						...data,
						userId: user.userDetails.uid,
					})
				);
				setIsEditing(false);
			} else {
				console.error('Failed to update path management data');
			}
		} catch (error) {
			console.error('Error updating path management:', error);
		}
	};

	return (
		<div>
			<Button onPress={onOpen}>Path Management</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					<ModalHeader>Path Management</ModalHeader>
					<ModalBody>
						<div className='flex flex-col gap-4'>
							{isEditing ? (
								<>
									<Input
										label='Custom Message'
										placeholder='Enter a custom message'
										value={formData.customMsg}
										onChange={(e) =>
											setFormData((prev) => ({ ...prev, customMsg: e.target.value }))
										}
									/>
									<Input
										label='Current Education'
										placeholder='Enter your current education'
										value={formData.currentEducation}
										onChange={(e) =>
											setFormData((prev) => ({
												...prev,
												currentEducation: e.target.value,
											}))
										}
									/>
									<Input
										label='Country'
										placeholder='Enter your country'
										value={formData.country}
										onChange={(e) =>
											setFormData((prev) => ({ ...prev, country: e.target.value }))
										}
									/>
									<Select
										label='Learning Speed'
										value={formData.learningSpeed}
										onChange={(e) =>
											setFormData((prev) => ({ ...prev, learningSpeed: e.target.value }))
										}
										selectedKeys={[formData.learningSpeed]}
									>
										<SelectItem key='slow' value='slow'>
											Slow
										</SelectItem>
										<SelectItem key='medium' value='medium'>
											Medium
										</SelectItem>
										<SelectItem key='fast' value='fast'>
											Fast
										</SelectItem>
									</Select>{' '}
								</>
							) : (
								<div className='flex flex-col gap-2'>
									<div className='p-2 border rounded'>
										<p>
											<strong>Custom Message:</strong>{' '}
											{pathManagement.customMsg || 'Not set'}
										</p>
										<p>
											<strong>Current Education:</strong>{' '}
											{pathManagement.currentEducation || 'Not set'}
										</p>
										<p>
											<strong>Country:</strong> {pathManagement.country || 'Not set'}
										</p>
										<p>
											<strong>Learning Speed:</strong> {pathManagement.learningSpeed}
										</p>
									</div>
								</div>
							)}
							<Button
								onPress={() => {
									if (isEditing) {
										handleSubmit();
									} else {
										setIsEditing(true);
									}
								}}
							>
								{isEditing ? 'Save Changes' : 'Edit Details'}
							</Button>
						</div>
					</ModalBody>
				</ModalContent>
			</Modal>
		</div>
	);
};

export default PathManagement;
