import connectDb from '@/hooks/db';
import User from '@/models/users';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	try {
		await connectDb();
		const { name, email, photoURL } = await req.json();

		// Check if user already exists
		const existingUser = await User.findOne({ email });

		if (existingUser) {
			return NextResponse.json({ user: existingUser });
		}

		const newUser = await User.create({ name, email, photoURL });

		if (!newUser) {
			return NextResponse.json(
				{ error: 'Failed to create user' },
				{ status: 400 }
			);
		}

		return NextResponse.json({ user: newUser });
	} catch (error) {
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
