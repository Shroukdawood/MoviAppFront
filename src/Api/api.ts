
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api',
});
export default API;


export const fetchEntries = (page: number) => API.get('/entries?page=${page}');
export const addEntry = (data: any) => API.post('/entries', data);
export const updateEntry = (id: number, data: any) => API.put('/entries/${id}, data');
export const deleteEntry = (id: number) => API.delete('/entries/${id}');