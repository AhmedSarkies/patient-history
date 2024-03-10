import axios from "axios";

const Http = axios.create({
  baseURL: process.env.REACT_APP_PATIENT_HISTORY_MANAGEMENT_API_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
  },
});

export default Http;
