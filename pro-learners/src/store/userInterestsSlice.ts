import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PathData } from '@/utils/types';
interface userInterestsData {
	interests: String[];
	userId: string;
}
const userInterests: userInterestsData = {
	interests: [],
	userId: '',
};

const userInterestsSlice = createSlice({
	name: 'userInterests',
	initialState: userInterests,
	reducers: {
		setUserInterests: (state, action: PayloadAction<userInterestsData>) => {
			state.interests = action.payload.interests;
			state.userId = action.payload.userId;
		},
	},
});

export const { setUserInterests } = userInterestsSlice.actions;
export default userInterestsSlice.reducer;
