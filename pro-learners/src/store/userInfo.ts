import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface userData {
	authState: boolean;
	userDetails: {
		name: string;
		email: string;
		photoURL: string;
	};
}

const userInfo: userData = {
	authState: false,
	userDetails: {
		name: '',
		email: '',
		photoURL: '',
	},
};

const userInfoSlice = createSlice({
	name: 'userInfo',
	initialState: userInfo,
	reducers: {
		setAuthState: (state, action: PayloadAction<boolean>) => {
			state.authState = action.payload;
		},
		setUserDetails: (
			state,
			action: PayloadAction<{
				name: string;
				email: string;
				photoURL: string;
			}>
		) => {
			state.userDetails = action.payload;
		},
	},
});

export const { setAuthState, setUserDetails } = userInfoSlice.actions;

export default userInfoSlice.reducer;
