import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GridRowId, GridValidRowModel } from "@mui/x-data-grid";
// import { RootState } from "../../path-to-your-root-reducer";

interface IStudentState {
  userFetchingError: boolean;
  userAddingError: boolean;
  userUpdatingError: boolean;
  removeStudentError: boolean;
  isLoading: boolean;
  students: GridValidRowModel[];
}

const initialState: IStudentState = {
  userFetchingError: false,
  userAddingError: false,
  userUpdatingError: false,
  removeStudentError: false,
  isLoading: true,
  students: [],
};

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    updateStudent: (state, action: PayloadAction<GridValidRowModel[]>) => {
      console.log("update student action.payload", action.payload);

      state.isLoading = false;
      state.userAddingError = false;
      state.userUpdatingError = false;
      state.students = action.payload;
      console.log("state students", state.students);
    },
    fetchAllStudentsSuccess: (state) => {
      // console.log("fetchAllStudentsStart hello 2", action.payload);
      state.isLoading = false;
      // state.students = action.payload;
    },
    fetchStudentsError: (state) => {
      state.isLoading = true;
      state.userFetchingError = true;
    },

    addStudentSuccess: (state, action: PayloadAction<GridValidRowModel>) => {
      state.isLoading = false;
      state.students = state.students.map((student) =>
        student.id === action.payload.id ? action.payload : student
      );
    },
    addStudentError: (state) => {
      state.isLoading = true;
      state.userAddingError = true;
    },

    removeStudentSuccess: (state, action: PayloadAction<GridRowId>) => {
      state.isLoading = false;
      state.students = state.students.filter(
        (student) => student.id !== action.payload
      );
    },
    removeStudentError: (state) => {
      state.isLoading = true;
      state.removeStudentError = true;
    },

    editStudentSuccess: (state, action: PayloadAction<GridValidRowModel>) => {
      state.isLoading = false;
      state.students = state.students.map((student) =>
        student.id === action.payload.id ? action.payload : student
      );
    },
    editStudentError: (state) => {
      state.isLoading = true;
      state.userUpdatingError = true;
    },
  },
});

export const {
  updateStudent,

  fetchAllStudentsSuccess,
  fetchStudentsError,

  addStudentSuccess,
  addStudentError,

  removeStudentSuccess,
  removeStudentError,

  editStudentSuccess,
  editStudentError,
} = studentSlice.actions;

export default studentSlice.reducer;
