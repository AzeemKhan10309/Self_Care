import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL =
  Platform.OS === "web"
    ? "http://localhost:5000/api"
    : "http://192.168.11.123:5000/api";

type Method = "GET" | "POST" | "PUT" | "DELETE"| "PATCH";

type RequestBody = Record<string, any> | FormData | null;

export const apiRequest = async <T = any>(
  endpoint: string,
  method: Method = "GET",
  body: RequestBody = null
): Promise<T | { error: true; message: string }> => {
  try {
    const token = await AsyncStorage.getItem("token");
    const isFormData = body instanceof FormData;

    const headers: Record<string, string> = {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(body && !isFormData ? { "Content-Type": "application/json" } : {}),
    };

    const config: AxiosRequestConfig = {
      url: `${BASE_URL}${endpoint}`,
      method,
      headers,
    };

    if (method === "GET" && body) {
      config.params = body;
    } else if (body) {
      config.data = body;
    }

    const response: AxiosResponse<T> = await axios.request(config);
    return response.data;
  } catch (error: any) {
    const message = error?.response?.data?.message || "Something went wrong";
    console.error("❌ API Error:", message);

    return { error: true, message };
  }
};
