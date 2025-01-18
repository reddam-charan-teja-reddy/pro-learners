import { NextRequest, NextResponse } from 'next/server';
import connectDb from '@/hooks/db';
import UserPaths from '@/models/userPaths';
export const runtime = 'edge';

export async function GET(req: NextRequest) {
	try {
		const searchParams = new URL(req.url).searchParams;
		const userId = searchParams.get('userId');
		if (!userId) {
			return NextResponse.json({ error: 'UserId is required' }, { status: 400 });
		}
		// remove the coments after completion of generate path page and api
		/*
		await connectDb();
		const userCourses = await UserPaths.find({ userId }).exec();
		console.log(userCourses);
		*/

		// add code to fetch data from database using userId and return it
		const paths = [
			{
				title: 'Course 1',
				description: 'Description 1',
				courseCode: '1',
				assignedGoals: 10,
				completedGoals: 5,
			},
			{
				title: 'Course 2',
				description: 'Description 2',
				courseCode: '2',
				assignedGoals: 7,
				completedGoals: 5,
			},
		];

		return NextResponse.json({ paths, userId });
	} catch (error) {
		return NextResponse.json({ error: error }, { status: 500 });
	}
}
