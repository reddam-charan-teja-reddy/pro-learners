import { TbCircleLetterC } from 'react-icons/tb';
import { FiPlus } from 'react-icons/fi';
import { AiOutlineHome } from 'react-icons/ai';
import Link from 'next/link';

const Navbar = () => {
	return (
		<nav>
			<ul>
				<li>
					<Link href='/home'>
						<AiOutlineHome />
					</Link>
				</li>
				<li>
					<Link href='/plus'>
						<FiPlus />
					</Link>
				</li>
				<li>
					<Link href='/course'>
						<TbCircleLetterC />
					</Link>
				</li>
			</ul>
		</nav>
	);
};
export default Navbar;
