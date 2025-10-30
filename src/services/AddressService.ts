import axios, { type AxiosResponse } from "axios";

export interface PatientAddressData {
  id: number;
  patientId: number;
  address1: string;
  city: string;
  pincode: number;
  country: string;
}

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add Patient Address Data
export async function AddPatientAddress(): Promise<PatientAddressData[]> {
  const response: AxiosResponse<PatientAddressData[]> = await apiClient.post('/patient/addAddress?_limit=5');
  return response.data;
}