import { NextResponse } from 'next/server';
import { doc, setDoc } from 'firebase/firestore';
import connectDb from '@/hooks/db';
import PathManagement from '@/models/PathManagement';

export async function POST(request: Request) {
	try {
		await connectDb();

		const body = await request.json();
		const { userId, customMsg, learningSpeed, currentEducation, country } = body;

		if (!userId) {
			return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
		}

		const pathManagementData = {
			customMsg: customMsg.trim(),
			learningSpeed,
			currentEducation: currentEducation.trim(),
			country: country.trim(),
			updatedAt: new Date().toISOString(),
		};

		await PathManagement.findOneAndUpdate(
			{ userId },
			{ $set: pathManagementData },
			{ upsert: true, new: true }
		);

		return NextResponse.json(pathManagementData);
	} catch (error) {
		console.error('Error updating path management:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
