import { RootState } from "../store";
import { AuthState } from "./auth.reducer";

export const selectAuthReducer = (state: RootState): AuthState => state.auth;
