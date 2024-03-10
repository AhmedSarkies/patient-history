import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Http from "../../Http";
import { toast } from "react-toastify";

const initialState = { loading: false, data: [], error: null, newPatient: [] };

// Get patients data
export const getPatients = createAsyncThunk(
  "patient/getPatients",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Http({
        method: "GET",
        url: `/patients`,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Get patient data by id
export const getPatient = createAsyncThunk(
  "patient/getPatient",
  async (patient_code, { rejectWithValue }) => {
    try {
      const response = await Http({
        method: "GET",
        url: `/patients/search/${patient_code}`,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add patient data
export const addPatient = createAsyncThunk(
  "patient/addPatient",
  async (data, { rejectWithValue }) => {
    try {
      await Http({
        method: "POST",
        url: "/patients",
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

// Update patient data
export const updatePatient = createAsyncThunk(
  "patient/updatePatient",
  async (data, { rejectWithValue }) => {
    try {
      await Http({
        method: "PUT",
        url: `/patients/${data.id}`,
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

const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    // Add patient data
    addPatientData: (state, { payload }) => {
      state.newPatient = payload;
    },
  },
  extraReducers: (builder) => {
    // Get patients data
    builder.addCase(getPatients.pending, (state, { payload }) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getPatients.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data = payload;
    });
    builder.addCase(getPatients.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = true;
    });
    // Get patient data by id
    builder.addCase(getPatient.pending, (state, { payload }) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getPatient.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data = payload;
    });
    builder.addCase(getPatient.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = true;
    });
    // Add patient data
    builder.addCase(addPatient.pending, (state, { payload }) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addPatient.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data = payload;
    });
    builder.addCase(addPatient.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = true;
    });
    // Update patient data
    builder.addCase(updatePatient.pending, (state, { payload }) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updatePatient.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data = payload;
    });
    builder.addCase(updatePatient.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const { addPatientData } = patientSlice.actions;
export default patientSlice.reducer;
