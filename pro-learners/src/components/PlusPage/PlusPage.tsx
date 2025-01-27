'use client';

import { useState } from 'react';

const PlusPage = () => {
	const [input, setInput] = useState('');
    

	return (
		<div>
			<input
				type='text'
				placeholder='Enter Enter Your goal/skil you want to learn'
				value={input}
				onChange={(e) => setInput(e.target.value)}
			/>
			<button>Submit</button>
			<button>Cancel</button>
			<div>
				<p> Output </p>
			</div>
		</div>
	);
};

export default PlusPage;
