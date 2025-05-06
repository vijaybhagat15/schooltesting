import { configureStore } from "@reduxjs/toolkit";
import styleReducer from "./slices/styleSlice";
import academicsReducer from "./slices/academicsSlice";
import contactReducer from "./slices/contactSlice";
import schoolReducer from "./slices/schoolSlice";
import section2Reducer from "./slices/section2Slice";
import section3Reducer from "./slices/section3Slice";
import section4Reducer from "./slices/section4Slice";
import section5Reducer from "./slices/section5Slice";
import section6Reducer from "./slices/section6Slice";
import headerReducer from "./slices/headerSlice";
import footerReducer from "./slices/footerSlice";
import websiteReducer from "./slices/websiteSlice";
import style1Reducer from './slices/style1Slice';

export const store = configureStore({
  reducer: {
    style: styleReducer,
    academics: academicsReducer,
    contact: contactReducer,
    school: schoolReducer,
    section2: section2Reducer,
    section3: section3Reducer,
    section4:section4Reducer, 
    section5:section5Reducer,
    section6:section6Reducer,
    header: headerReducer,
    footer: footerReducer,
    website: websiteReducer,
    style1: style1Reducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
