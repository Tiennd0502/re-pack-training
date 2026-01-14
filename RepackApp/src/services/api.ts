import axios, { AxiosRequestConfig } from 'axios';

const API_URL = (process.env.API_URL || '').trim();

const defaultOptions: any = {
  headers: {
    accept: 'application/json',
  },
};

if (API_URL) {
  defaultOptions.baseURL = API_URL;
}

const instanceAxios = axios.create(defaultOptions);

export const GET = async <T>(url: string, config?: AxiosRequestConfig) => {
  try {
    const response = await instanceAxios.get<T>(url, config);

    return response?.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw error;
    }

    throw new Error('Something was wrong');
  }
};

export const POST = async <T, P>(
  url: string,
  payload: P,
  config?: AxiosRequestConfig,
) => {
  try {
    const response = await instanceAxios.post<T>(url, payload, config);

    return response?.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw error;
    }

    throw new Error('Something was wrong');
  }
};

export const PATCH = async <T, P>(
  url: string,
  payload: P,
  config?: AxiosRequestConfig,
) => {
  try {
    const response = await instanceAxios.patch<T>(url, payload, config);

    return response?.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw error;
    }

    throw new Error('Something was wrong');
  }
};
