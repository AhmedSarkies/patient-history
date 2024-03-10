import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Http from "../../Http";
const initialState = { loading: false, data: [], error: null };

// Get Doctors List
export const getDoctor = createAsyncThunk("doctor/getDoctor", () => {
  return Http({
    method: "GET",
    url: "/doctors",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch doctor");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    });
});

// Post Doctor
export const addDoctor = createAsyncThunk(
  "doctor/addDoctor",
  async (doctor) => {
    return await Http({
      method: "POST",
      url: "/doctors",
      data: JSON.stringify(doctor),
    }).then((response) => response.json());
  }
);

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  extraReducers: (builder) => {
    // Fetch Posts
    builder.addCase(getDoctor.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getDoctor.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getDoctor.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {} = doctorSlice.actions;
export default doctorSlice.reducer;
