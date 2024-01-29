// import {
//   all,
//   call,
//   put,
//   take,
//   takeEvery,
//   takeLatest,
//   takeLeading,
// } from "redux-saga/effects";
// import axios from "axios";
// import {
//   setLoading,
//   getAllStudentsSuccess,
//   getAllStudentsFailure,
//   addStudentSuccess,
//   addStudentFailure,
//   editStudentSuccess,
//   editStudentFailure,
//   deleteStudentSuccess,
//   deleteStudentFailure,
// } from "./slice";
// import { act } from "react-dom/test-utils";
// import { GridRowId, GridValidRowModel } from "@mui/x-data-grid";
// import { PayloadAction } from "@reduxjs/toolkit";

// interface IStudent {
//   id: number;
//   name: string;
//   age: number;
//   gender: string;
//   address: string;
//   mobile: string;
//   dob: Date;
//   isNew?: boolean;
// }

// const BASE_URL = "http://localhost:5000/student";

// function* getAllStudentsWorker(): Generator<any, any, any> {
//   try {
//     yield put(setLoading(true));
//     const response = yield call(axios.get, `${BASE_URL}/allStudents`);
//     yield put(getAllStudentsSuccess(response.data));
//   } catch (error) {
//     yield put(getAllStudentsFailure(error as string));
//   }
// }

// function* addStudentWorker(
//   action: PayloadAction<GridValidRowModel>
// ): Generator<any, any, any> {
//   console.log("hello 1");
//   try {
//     yield put(setLoading(true));
//     const newStudent = {
//       id: action.payload.id,
//       name: action.payload.name,
//       gender: action.payload.gender,
//       address: action.payload.address,
//       mobile: action.payload.mobile,
//       dob: action.payload.dob,
//       age: action.payload.age,
//     };
//     const response = yield call(axios.post, `${BASE_URL}/add`, newStudent);
//     console.log("response", response);
//     // Assuming that the API response contains the newly added student
//     const addedStudent = response.data;
//     console.log("added student", addedStudent);

//     yield put(addStudentSuccess(addedStudent));
//   } catch (error) {
//     yield put(addStudentFailure(error as string));
//   }
// }

// function* editStudentWorker(
//   action: PayloadAction<GridValidRowModel>
// ): Generator<any, any, any> {
//   try {
//     yield put(setLoading(true));
//     const editedStudent = {
//       id: action.payload.id,
//       name: action.payload.name,
//       gender: action.payload.gender,
//       address: action.payload.address,
//       mobile: action.payload.mobile,
//       dob: action.payload.dob,
//       age: action.payload.age,
//     };
//     yield call(
//       axios.put,
//       `${BASE_URL}/edit/${editedStudent.id}`,
//       editedStudent
//     );
//     yield put(editStudentSuccess());
//   } catch (error) {
//     yield put(editStudentFailure(error as string));
//   }
// }

// function* deleteStudentWorker(
//   action: PayloadAction<GridRowId>
// ): Generator<any, any, any> {
//   try {
//     yield put(setLoading(true));
//     yield call(axios.delete, `${BASE_URL}/delete/${action.payload}`);
//     yield put(deleteStudentSuccess());
//   } catch (error) {
//     yield put(deleteStudentFailure(error as string));
//   }
// }

// function* getAllStudentsWatcher() {
//   console.log("getAllStudentsWatcher");
//   yield takeLatest("student/getAllStudents", getAllStudentsWorker);
// }

// function* addStudentWatcher() {
//   console.log("addStudentWatcher");
//   yield takeLatest("student/addStudent", addStudentWorker);
// }

// function* editStudentWatcher() {
//   yield takeLeading("student/editStudent", editStudentWorker);
// }

// function* deleteStudentWatcher() {
//   yield takeLeading("student/deleteStudent", deleteStudentWorker);
// }

// export function* studentSaga() {
//   yield all([
//     getAllStudentsWatcher(),
//     addStudentWatcher(),
//     editStudentWatcher(),
//     deleteStudentWatcher(),
//   ]);
// }

import { all, call, put, takeLatest, takeLeading } from "redux-saga/effects";
import axios from "axios";
import { GridRowId, GridValidRowModel } from "@mui/x-data-grid";

import {
  updateStudent,
  fetchAllStudentsSuccess,
  fetchStudentsError,
  addStudentSuccess,
  addStudentError,
  removeStudentSuccess,
  removeStudentError,
  editStudentSuccess,
  editStudentError,
} from "./slice";

import { PayloadAction } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:5000/student";

function* getAllStudentsWorker(): Generator<any, any, any> {
  try {
    const { data } = yield call(
      axios.get<GridValidRowModel[]>,
      "http://localhost:5000/student/allStudents"
    );
    console.log("data", data);
    yield put(updateStudent(data));
    yield put(fetchAllStudentsSuccess);
    //const response = yield call(axios.get, `${BASE_URL}/allStudents`);
    //yield put(fetchAllStudentsSuccess(response.data));
  } catch (error: any) {
    yield put(fetchStudentsError(error));
  }
}

function* addNewStudentWorker(
  action: PayloadAction<GridValidRowModel>
): Generator<any, any, any> {
  console.log("adding", action.payload);

  const newStudent = {
    id: action.payload.id,
    name: action.payload.name,
    gender: action.payload.gender,
    address: action.payload.address,
    mobile: action.payload.mobile,
    dob: action.payload.dob,
    age: action.payload.age,
  };
  console.log("newstudent", newStudent);
  try {
    console.log(newStudent);
    yield call(
      axios.post<GridValidRowModel>,
      "http://localhost:5000/student/add",
      newStudent
    );
    yield put(fetchAllStudentsSuccess);
  } catch (error: any) {
    console.log("hello adding error");
    console.log(error);
    yield put(addStudentError());

    return error;
  }
}

function* updateStudentWorker(action: PayloadAction<GridValidRowModel>) {
  const updatedStudent = {
    name: action.payload.name,
    gender: action.payload.gender,
    address: action.payload.address,
    mobile: action.payload.mobile,
    dob: action.payload.dob,
    age: action.payload.age,
  };
  console.log("updatedStudent", updateStudent);
  try {
    yield call(
      axios.put<GridValidRowModel>,
      `http://localhost:5000/student/edit/${action.payload.id}`,
      updatedStudent
    );
    yield put(fetchAllStudentsSuccess);
  } catch (error: any) {
    yield put(editStudentError(error));

    return error;
  }
}

function* deleteStudentWorker(action: PayloadAction<GridRowId>) {
  try {
    yield call(
      axios.delete<GridRowId>,
      `http://localhost:5000/student/delete/${action.payload}`
    );
  } catch (error: any) {
    yield put(removeStudentError(error));

    return error;
  }
}

function* getAllStudentsWatcher() {
  yield takeLatest(fetchAllStudentsSuccess, getAllStudentsWorker);
}

function* addNewStudentWatcher() {
  yield takeLeading(addStudentSuccess.type, addNewStudentWorker);
}

function* updateStudentWatcher() {
  yield takeLeading(editStudentSuccess.type, updateStudentWorker);
}

function* deleteStudentWatcher() {
  yield takeLeading(removeStudentSuccess, deleteStudentWorker);
}

export function* studentSaga() {
  yield all([
    getAllStudentsWatcher(),
    addNewStudentWatcher(),
    updateStudentWatcher(),
    deleteStudentWatcher(),
  ]);
}
