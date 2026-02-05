import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./index";

export const useZDispatch = () => useDispatch<AppDispatch>();
export const useZSelector: TypedUseSelectorHook<RootState> = useSelector;
