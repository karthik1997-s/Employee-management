import axios from "axios";
import type { Employee } from "../types/employee";

// Get all employees
export const getEmployees = () => {
  return axios({ 
    method: "GET", 
    url: "/employees"
  });
};

// Get single employee by ID
export const getEmployee = (id: number) => {
  return axios({ 
    method: "GET", 
    url: `/employees/${id}` 
  });
};

// Create new employee
export const createEmployee = (data: Omit<Employee, "id" | "createdAt" | "updatedAt">) => {
  return axios({ 
    method: "POST", 
    url: "/employees", 
    data: data 
  });
};

// Update employee
export const updateEmployee = (id: number, data: Partial<Omit<Employee, "id" | "createdAt">>) => {
  return axios({ 
    method: "PUT", 
    url: `/employees/${id}`, 
    data: data 
  });
};

// Delete employee
export const deleteEmployee = (id: number) => {
  return axios({ 
    method: "DELETE", 
    url: `/employees/${id}` 
  });
};

// Toggle employee active status
export const toggleEmployeeStatus = (id: number, isActive: boolean) => {
  return updateEmployee(id, { isActive });
};
