import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Http from "../../Http";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  generalExamination: [],
  error: null,
  newGeneralExamination: [],
};

// Get General Examination data
export const getGeneralExamination = createAsyncThunk(
  "generalExamination/getGeneralExamination",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Http({
        method: "GET",
        url: `/general-examination`,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add patient data
export const addGeneralExamination = createAsyncThunk(
  "generalExamination/addGeneralExamination",
  async (data, { rejectWithValue }) => {
    try {
      await Http({
        method: "POST",
        url: `/general-examination`,
        data,
      }).then((response) => {
        toast.success("تم تحديث العالم بنجاح");
        return response.data;
      });
    } catch (error) {
      toast.error("حدث خطأ أثناء تحديث العالم");
      return rejectWithValue(error.message);
    }
  }
);

const generalExaminationSlice = createSlice({
  name: "generalExamination",
  initialState,
  reducers: {
    // Add general examination data
    addGeneralExaminationData: (state, { payload }) => {
      state.newGeneralExamination = payload;
    },
  },
  extraReducers: (builder) => {
    // Add General Examination data
    builder.addCase(addGeneralExamination.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addGeneralExamination.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.generalExamination = payload.examination;
    });
    builder.addCase(addGeneralExamination.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const { addGeneralExaminationData } = generalExaminationSlice.actions;
export default generalExaminationSlice.reducer;
