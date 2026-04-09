import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Constants from 'expo-constants';


const debuggerHost = Constants.expoConfig?.hostUri || '';
const localhost = debuggerHost.split(':').shift(); 

const API_BASE_URL = localhost 
  ? `http://${localhost}:8000` 
  : 'http://10.0.2.2:8000';

console.log('API завантажено з адресою:', API_BASE_URL);

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: API_BASE_URL,
  }),
  tagTypes: ['User'],
  endpoints: () => ({}),
});