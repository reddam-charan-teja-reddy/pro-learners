'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthState, setUserDetails } from '@/store/userInfoSlice';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/app/firebase/config';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

const Auth = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const userData = useSelector((state: RootState) => state.user);
	if (userData.authState) {
		router.push('/');
	}

	const handleGoogleSignIn = async () => {
		try {
			setLoading(true);
			const provider = new GoogleAuthProvider();
			const res = await signInWithPopup(auth, provider);
			const { user } = res;
			const { displayName, email, photoURL } = user;
			if (!displayName || !email || !photoURL) {
				throw new Error('Missing user details');
			}
			const response = await fetch('/api/userLogin', {
				method: 'POST',
				body: JSON.stringify({ name: displayName, email, photoURL }),
				headers: { 'Content-Type': 'application/json' },
			});
			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.error || 'Failed to sign in');
			}
			dispatch(setAuthState(true));
			dispatch(
				setUserDetails({
					uid: data.user._id,
					name: displayName,
					email,
					photoURL,
				})
			);
			router.push('/');
		} catch (error) {
			setError('Failed to sign in with Google');
			console.error(error);
		} finally {
			setLoading(false);
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
