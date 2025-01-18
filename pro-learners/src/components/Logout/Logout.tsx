'use client';
import { useDispatch } from 'react-redux';
import { setAuthState, setUserDetails } from '@/store/userInfoSlice';
import { useRouter } from 'next/navigation';

const Logout = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const handleLogout = () => {
		dispatch(setAuthState(false));
		dispatch(
			setUserDetails({
				uid: '',
				name: '',
				email: '',
				photoURL: '',
			})
		);
		router.push('/login');
	};
	return (
		<div>
			<button onClick={handleLogout}>Logout</button>
		</div>
	);
};

export default Logout;
