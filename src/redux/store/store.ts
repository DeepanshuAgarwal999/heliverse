import { persistReducer, persistStore } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../slices/user.slice";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

type NoopStorage = {
	getItem(_key: string): Promise<null>;
	setItem(_key: string, value: any): Promise<any>;
	removeItem(_key: string): Promise<void>;
};
type CreateNoopStorage = () => NoopStorage;

const createNoopStorage: CreateNoopStorage = () => {
	return {
		getItem(_key) {
			return Promise.resolve(null);
		},
		setItem(_key, value) {
			return Promise.resolve(value);
		},
		removeItem(_key) {
			return Promise.resolve();
		},
	};
};

const storage =
	typeof window === "undefined"
		? createNoopStorage()
		: createWebStorage("local");

const persistConfig = {
	key: "root",
	version: 1,
	// timeout: 500,
	storage,
};

const rootReducer = combineReducers({
	user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});
export { store };
export const persistor = persistStore(store);
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
