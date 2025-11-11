import axios, { type AxiosResponse } from "axios";

export interface Payload {
    title: string,
    body: string
}

export interface PushNotification {
    subscription: {
        endpoint: string,
    },
    payload: {
        title: string,
        body: string
    }
}

const apiClient = axios.create({
  baseURL: 'https://jsw1rv1g-3000.inc1.devtunnels.ms/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function Subscribe(Payload = {}): Promise<string> {
  const response: AxiosResponse<string> = await apiClient.post('/notifications/subscribe', Payload);
  return response.data;
}

export async function SendPushNotification(PushNotification = {}): Promise<string> {
  const response: AxiosResponse<string> = await apiClient.post('/notifications/send', PushNotification);
  return response.data;
}