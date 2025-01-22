import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	Button,
	useDisclosure,
	Input,
} from '@heroui/react';
import { useState, useEffect } from 'react';
import { RootState } from '@/store/store';
import { useSelector, useDispatch } from 'react-redux';
import { setUserSkills } from '@/store/userSkillsSlice';

const Skills = () => {
	const dispatch = useDispatch();
	const [newSkill, setNewSkill] = useState<string>('');
	const userSkills = useSelector((state: RootState) => state.userSkills);
	const user = useSelector((state: RootState) => state.user);
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	// Function to add new skill
	const addSkill = async () => {
		if (!newSkill.trim()) return;

		try {
			const res = await fetch('/api/skills', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					userId: user.userDetails.uid,
					skill: newSkill.trim(),
				}),
			});

			if (res.ok) {
				const data = await res.json();
				dispatch(
					setUserSkills({
						skills: data.skills,
						userId: user.userDetails.uid,
					})
				);
				setNewSkill(''); // Clear input after successful addition
			} else {
				console.error('Failed to add skill');
			}
		} catch (error) {
			console.error('Error adding skill:', error);
		}
	};

	// Function to remove skill
	const removeSkill = async (skillToRemove: string) => {
		try {
			const res = await fetch('/api/skills', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					userId: user.userDetails.uid,
					skill: skillToRemove,
				}),
			});

			if (res.ok) {
				const data = await res.json();
				dispatch(
					setUserSkills({
						skills: data.skills,
						userId: user.userDetails.uid,
					})
				);
			} else {
				console.error('Failed to remove skill');
			}
		} catch (error) {
			console.error('Error removing skill:', error);
		}
	};

	return (
		<div>
			<Button onPress={onOpen}>Add Skills</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					<ModalHeader>Add Your Skills</ModalHeader>
					<ModalBody>
						<div className='flex flex-col gap-4'>
							<Input
								label='New Skill'
								placeholder='Enter a skill'
								value={newSkill}
								onChange={(e) => setNewSkill(e.target.value)}
								onKeyPress={(e) => {
									if (e.key === 'Enter') {
										addSkill();
									}
								}}
							/>
							<Button onClick={addSkill}>Add Skill</Button>
							<div className='flex flex-wrap gap-2'>
								{userSkills?.skills?.map((skill: string, index: number) => (
									<div
										key={index}
										className='bg-gray-200 rounded-full px-3 py-1 flex items-center gap-2'
									>
										<span>{skill}</span>
										<button
											onClick={() => removeSkill(skill)}
											className='text-red-500 hover:text-red-700'
										>
											×
										</button>
									</div>
								))}
							</div>
						</div>
					</ModalBody>
				</ModalContent>
			</Modal>
		</div>
	);
};

export default Skills;
