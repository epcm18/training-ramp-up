import { configureStore } from "@reduxjs/toolkit";
import studentSlice from "./student/slice";
import createSagaMiddleware from "redux-saga";
import { studentSaga } from "./student/saga";

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    student: studentSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(studentSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
