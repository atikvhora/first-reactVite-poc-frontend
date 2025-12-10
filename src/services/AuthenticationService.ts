import { HTTP } from "@cerbos/http";
import axios, { type AxiosResponse } from "axios";
import CryptoJS from "crypto-js";

export interface loginData {
  email: string;
  password: string;
}

export interface principal {
  id: string;
  roles: string[];
}
export interface resource {
  id: string;
  kind: string;
  attr: { owner: string };
}

const SECRET_KEY = import.meta.env.VITE_STORAGE_SECRET;
const apiClient = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Login User
export async function LoginUser(loginData = {}): Promise<any> {
  if (loginData != null) {
    const response: AxiosResponse<any> = await apiClient.post(
      "/auth/login",
      loginData
    );
    return response;
  } else {
    return null;
  }
}

export async function CerboseCheckPermission({
  principal,
  resource,
  actions,
  action,
}: {
  principal: principal;
  resource: resource;
  actions: string[];
  action: string;
}): Promise<boolean> {
  const cerbos = new HTTP("http://localhost:3592"); // Cerbos PDP URL

  actions = ["view", "update", "delete", "create"]; // Possible actions
  const decision = await cerbos.checkResource({
    principal,
    resource: resource,
    actions: actions,
  });
  return decision.isAllowed(action) ? true : false;
}

export function encryptData(data: any) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), "SECRET_KEY").toString();
}

export function decryptData(cipher: string) {
  const bytes = CryptoJS.AES.decrypt(cipher, "SECRET_KEY");
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}
