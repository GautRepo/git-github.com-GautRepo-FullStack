import axios from 'axios';

const API_URL = 'http://localhost:9191/api/employees/';

export const getEmployees = () => axios.get(API_URL+'getAll');
export const getEmployeeById = (id) => axios.get(`${API_URL+'byId'}/${id}`);
export const createEmployee = (employee) => axios.post(API_URL+'saveEmp', employee);
export const updateEmployee = (id, employee) => axios.put(`${API_URL+'update'}/${id}`, employee);
export const deleteEmployee = (id) => axios.delete(`${API_URL+'remove'}/${id}`);
