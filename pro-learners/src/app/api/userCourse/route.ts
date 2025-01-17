import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, ServerApiVersion } from 'mongodb';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
	try {
		const searchParams = new URL(req.url).searchParams;
		const userId = searchParams.get('userId');
		const uri = process.env.MONGODB_URI;
		if (!uri) {
			throw new Error(
				'Please define the MONGODB_URI environment variable inside .env.local'
			);
		}
		const client = new MongoClient(uri, {
			serverApi: {
				version: ServerApiVersion.v1,
				strict: true,
				deprecationErrors: true,
			},
		});

		if (!userId) {
			return NextResponse.json({ error: 'UserId is required' }, { status: 400 });
		}

		// add code to fetch data from database using userId and return it
		const data = [
			{ title: 'Course 1', description: 'Description 1', courseCode: 'course1' },
			{ title: 'Course 2', description: 'Description 2', courseCode: 'course2' },
		];

		return NextResponse.json({ data, userId });
	} catch (error) {
		return NextResponse.json({ error: error }, { status: 500 });
	}
}
