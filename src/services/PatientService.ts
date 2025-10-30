import axios, { type AxiosResponse } from "axios";

export interface PatientData {
  id: number;
  name: string;
  username: string;
  email: string;
  gender: string;
  phone: number;
}

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add Patient Data
export async function AddPatient(): Promise<PatientData[]> {
  const response: AxiosResponse<PatientData[]> = await apiClient.post('/patient/addPatient?_limit=5');
  return response.data;
}

// Get Patient and its Address
export async function GetPatientData(): Promise<PatientData[]> {
  const response: AxiosResponse<PatientData[]> = await apiClient.post('/patient/getPatientData?_limit=5');
  return response.data;
}