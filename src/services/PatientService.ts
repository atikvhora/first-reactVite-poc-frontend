import axios, { type AxiosResponse } from "axios";

export interface PatientData {
  id: number;
  name: string;
  username: string;
  email: string;
  gender: string;
  phone: string;
  address1: string;
  city: string;
  pincode: string;
  country: string;
}

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add Patient Data
export async function AddPatient(patientData = {}): Promise<PatientData> {
  const response: AxiosResponse<PatientData> = await apiClient.post('/patients/addPatient', patientData);
  return response.data;
}

// Get Patient and its Address
export async function GetPatientData(): Promise<PatientData[]> {
  const response: AxiosResponse<PatientData[]> = await apiClient.get('/patients');
  return response.data;
}