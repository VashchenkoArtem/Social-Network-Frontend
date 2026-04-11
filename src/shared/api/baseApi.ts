import AsyncStorage from '@react-native-async-storage/async-storage';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Constants from 'expo-constants';


const debuggerHost = Constants.expoConfig?.hostUri || '';
const localhost = debuggerHost.split(':').shift(); 

const API_BASE_URL = localhost 
  ? `http://192.168.0.106:8000` 
  : 'http://10.0.2.2:8000';

console.log('API завантажено з адресою:', API_BASE_URL);

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: "http://192.168.0.104:8000",
    prepareHeaders: async (headers, { getState }) => {
      const token = await AsyncStorage.getItem("token")
      console.log(localhost)
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  tagTypes: ['User'],
  endpoints: () => ({}),
});