import axios, { type AxiosResponse } from "axios";

export interface PatientData {
  id: number;
  name: string;
  username: string;
  email: string;
  gender: string;
  phone: string;
  address: AddressData;
  city: string;
  pincode: string;
  country: string;
}
export interface AddressData {
  id?: number;
  patientId: number;
  address1: string;
  city?: string;
  pincode?: string;
  country?: string;
}

console.log("create", import.meta.env.PORT_API_URL)
const apiClient = axios.create({
  baseURL: "http://localhost:5000",
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

// Get Patient and its Address
export async function GetPatientDetail(id : string): Promise<PatientData> {
  const response: AxiosResponse<PatientData> = await apiClient.get('/patients/' + id);
  return response.data;
}

// Delete Patient
export async function DeletePatient(id : number): Promise<PatientData> {
  const response: AxiosResponse<PatientData> = await apiClient.delete('/patients/DeletePatient/' + id);
  return response.data;
}