import axios from 'axios';
import { useState, useEffect } from 'react';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' }
});

API.interceptors.response.use(
  (res) => res.data.data,
  (err: any) => Promise.reject(err)
);

export const getData: any = async () => {
  return await API.get('/');
}

export function useData() {
  const [data, setData] = useState('');

  const setIntialData = () => {
    (async() => {
      const initialData = await getData();
      setData(initialData)
    })()
  }

  useEffect(setIntialData, [data]);

  return data;
}
