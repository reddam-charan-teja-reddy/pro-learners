'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthState, setUserDetails } from '@/store/userInfo';
import {
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';
import { auth } from '../../app/firebase/config';

type userProps = {
	displayName: string;
	email: string;
	photoURL: string;
};

const Auth = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const handleGoogleSignIn = async () => {
		try {
			const provider = new GoogleAuthProvider();
			const res = await signInWithPopup(auth, provider);
			console.log(res);
			const { user } = res;
			const { displayName, email, photoURL } = user;
			if (!displayName || !email || !photoURL) {
				throw new Error('Missing user details');
			}
			await addUserDetails({ displayName, email, photoURL });
			
			// Update Redux state
			dispatch(setAuthState(true));
			dispatch(setUserDetails({
				name: displayName,
				email,
				photoURL,
			}));

			router.push('/home');
		} catch (error) {
			setLoading(false);
			setError('Failed to sign in with google');
			console.log(error);
		}
	};

	const addUserDetails = async (user: userProps) => {
		const { displayName, email, photoURL } = user;
		const res = await fetch('/api/userLogin', {
			method: 'POST',
			body: JSON.stringify({ name: displayName, email, photoURL }),
			headers: { 'Content-Type': 'application/json' },
		});
		const response = await res.json();
		console.log(response);
		if (!res.ok) {
			throw new Error('Failed to add user details');
		}
	};

	return (
		<div>
			<div>
				<h1>PathLearn</h1>
				<h2>Login</h2>
				<button onClick={handleGoogleSignIn}>Sign in with google</button>
				<p>
					Don&apos;t have an account? <a href='#'>Sign up</a>
				</p>
			</div>
		</div>
	);
};

export default Auth;
