import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import storage from '@/hooks/storage';
import userInfoSlice from './userInfoSlice';
import userPathsSlice from './userPathsSlice';
import userInterestsSlice from './userInterestsSlice';
import userSkillsSlice from './userSkillsSlice';
import userPathManagementSlice from './userPathManagementSlice';
const persistConfig = {
	key: 'root',
	storage,
	whitelist: [
		'user',
		'userPaths',
		'userInterests',
		'userSkills',
		'userPathManagement',
	], // only persist these reducers
};

const rootReducer = combineReducers({
	user: userInfoSlice,
	userPaths: userPathsSlice,
	userInterests: userInterestsSlice,
	userSkills: userSkillsSlice,
	userPathManagement: userPathManagementSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
