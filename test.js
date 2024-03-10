// const fetchData = async () =>
        //   await fetch("http://127.0.0.1:8000/api/patients", {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //       Accept: "application/json",
        //     },
        //     body: JSON.stringify(values),
        //   })
        //     .then((response) => {
        //       if (!response.ok) {
        //         toast.error("Failed to add patient");
        //         throw new Error("Failed to post patient");
        //       }
        //       return response.json();
        //     })
        //     .then((data) => {
        //       dispatch(addPatientData(data.patient));
        //       formik.resetForm();
        //       toast.success("Patient added successfully");
        //       navigate(`/personal-information/${data.patient.patient_code}`);
        //       return data;
        //     });
        // fetchData();


        
// // Get patient data by id
// export const getPatient = createAsyncThunk(
//         "patient/getPatient",
//         async (patient_code) => {
//           return await Http({
//             method: "GET",
//             url: `/patients/search/${patient_code}`,
//           }).then((response) => {
//             if (!response.ok) {
//               throw new Error("Failed to fetch patient");
//             }
//             return response.json();
//           });
//         }
//       );
      
//       // Add patient data
//       export const addPatient = createAsyncThunk(
//         "patient/addPatient",
//         async (data) => {
//           return await Http({
//             method: "POST",
//             url: "/patients",
//             data,
//           }).then((response) => {
//             if (!response.ok) {
//               throw new Error("Failed to post patient");
//             }
//             return response.json();
//           });
//         }
//       );
      
//       // Update patient data
//       export const updatePatient = createAsyncThunk(
//         "patient/updatePatient",
//         async (data) => {
//           return await Http(`/patients/${data.id}`, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               Accept: "application/json",
//             },
//             data,
//           }).then((response) => {
//             if (!response.ok) {
//               throw new Error("Failed to update patient");
//             }
//             return response.json();
//           });
//         }
//       );
      