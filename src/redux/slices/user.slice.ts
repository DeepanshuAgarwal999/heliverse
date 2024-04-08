// import { scope } from "@/utils/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

const initialState: UserState = {
	userDetails: null,
	token: null,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setCredentials: (state, action: PayloadAction<UserState>) => {
			const { token, userDetails } = action.payload;
			state.token = token;
			state.userDetails = userDetails;
		},
		logOut: (state) => {
			state.token = null;
			state.userDetails = null;
		},
	},
});

export const { setCredentials, logOut } = userSlice.actions;
export default userSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.user;
