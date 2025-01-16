'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import {
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
} from 'firebase/auth';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { auth } from '../../app/firebase/config';

const Auth = () => {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const uri = process.env.MONGODB_URI;

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		try {
			const res = await signInWithEmailAndPassword(auth, email, password);
			console.log(res);
			router.push('/home');
		} catch (error) {
			setLoading(false);
			console.log(error);
			setError('Invalid email or password');
		}
	};

	const handleGoogleSignIn = async () => {
		try {
			const provider = new GoogleAuthProvider();
			const res = await signInWithPopup(auth, provider);
			console.log(res);
			router.push('/home');
		} catch (error) {
			setLoading(false);
			setError('Failed to sign in with google');
			console.log(error);
		}
	};

	return (
		<div>
			<div>
				<h1>PathLearn</h1>
				<h2>Login</h2>
				{error && <p style={{ color: 'red' }}>{error}</p>}
				<form onSubmit={handleLogin}>
					<input
						type='email'
						placeholder='Enter your email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type='password'
						placeholder='Enter your password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button type='submit'>Login</button>
				</form>
				<p>or</p>
				<button onClick={handleGoogleSignIn}>Sign in with google</button>
				<p>
					Don&apos;t have an account? <a href='#'>Sign up</a>
				</p>
			</div>
		</div>
	);
};

export default Auth;
