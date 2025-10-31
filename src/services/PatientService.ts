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
  baseURL: 'https://jsw1rv1g-3000.inc1.devtunnels.ms/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add Patient Data
export async function AddPatient(patientData = {}): Promise<PatientData> {
  const response: AxiosResponse<PatientData> = await apiClient.post('/patients/AddPatient', patientData);
  return response.data;
}

// Get Patient and its Address
export async function GetPatientData(): Promise<PatientData[]> {
  const response: AxiosResponse<PatientData[]> = await apiClient.get('/patients/GetAllPatient');
  return response.data;
}

// Delete Patient
export async function DeletePatient(id : number): Promise<PatientData> {
  const response: AxiosResponse<PatientData> = await apiClient.delete('/patients/DeletePatient/' + id);
  return response.data;
}