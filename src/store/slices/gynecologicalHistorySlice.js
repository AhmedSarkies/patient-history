import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import Http from "../../Http";

const initialState = {
  loading: false,
  gynecologicalHistory: [],
  error: null,
  newGynecologicalHistory: [],
};

// Add Gynecological History data
export const addGynecologicalHistory = createAsyncThunk(
  "gynecologicalHistory/addGynecologicalHistory",
  async (data, { rejectWithValue }) => {
    try {
      await Http({
        method: "POST",
        url: "/gynaecological",
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

const gynecologicalHistorySlice = createSlice({
  name: "gynecologicalHistory",
  initialState,
  reducers: {
    // Add gynecological History data
    addGynecologicalHistoryData: (state, { payload }) => {
      state.newGynecologicalHistory = payload;
    },
  },
  extraReducers: (builder) => {
    // Add gynecological History data
    builder.addCase(addGynecologicalHistory.pending, (state, { payload }) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addGynecologicalHistory.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.gynecologicalHistory = payload.examination;
    });
    builder.addCase(addGynecologicalHistory.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const { addGynecologicalHistoryData } =
  gynecologicalHistorySlice.actions;
export default gynecologicalHistorySlice.reducer;
