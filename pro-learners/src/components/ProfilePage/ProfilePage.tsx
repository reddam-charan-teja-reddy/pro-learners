import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import Intrests from '../Intrests/Intrests';
import Skills from '../Skills/Skills';
import PathManagement from '../PathManagement/PathManagement';
import Logout from '../Logout/Logout';

const ProfilePage = () => {
	const user = useSelector((state: RootState) => state.user);

	return (
		<div>
			<ul>
				<li>
					<button>
						<Image
							src={user.userDetails.photoURL}
							alt='profile'
							width={50}
							height={50}
						/>
					</button>
				</li>
				<li>{user.userDetails.name}</li>
				<li>
					<Intrests />
				</li>
				<li>
					<Skills />
				</li>
				<li>
					<PathManagement />
				</li>
				<li>
					<button>
						<Logout />
					</button>
				</li>
			</ul>
		</div>
	);
};

export default ProfilePage;
