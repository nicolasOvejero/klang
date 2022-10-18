import { RootState } from "../store";
import { LangState } from "./lang.reducer";

export const selectLangReducer = (state: RootState): LangState => state.lang;
