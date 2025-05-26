import { configureStore } from "@reduxjs/toolkit";
import schoolReducer from "./slices/schoolSlice";
import headerReducer from "./slices/headerSlice";
import footerReducer from "./slices/footerSlice";
import websiteReducer from "./slices/websiteSlice";
import style1Reducer from './slices/style1Slice';

export const store = configureStore({
  reducer: {
    school: schoolReducer,
    header: headerReducer,
    footer: footerReducer,
    website: websiteReducer,
    style1: style1Reducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
