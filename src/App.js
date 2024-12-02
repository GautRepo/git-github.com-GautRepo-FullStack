import React, { useState, useEffect } from 'react';
import { getEmployees, createEmployee, updateEmployee, deleteEmployee, getEmployeeById } from './services/EmployeeService';

function App() {
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState({ name: '', role: '', department: '', email: '' });
  const [editEmployee, setEditEmployee] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const response = await getEmployees();
    setEmployees(response.data);
  };

  const handleCreate = async () => {
    await createEmployee(employee);
    fetchEmployees();
    setEmployee({ name: '', role: '', department: '', email: '' });
  };

  const handleUpdate = async () => {
    if (editEmployee) {
      await updateEmployee(editEmployee.id, editEmployee);
      fetchEmployees();
      setEditEmployee(null);
    }
  };

  const handleDelete = async (id) => {
    await deleteEmployee(id);
    fetchEmployees();
  };

  const handleEdit = (emp) => {
    setEditEmployee(emp);
    setEmployee(emp); // Load employee data into the form for editing
  };

  return (
    <div className="App">
      <h1>Employee Management</h1>

      <div>
        <h3>{editEmployee ? 'Edit Employee' : 'Add Employee'}</h3>
        <input
          type="text"
          placeholder="Name"
          value={employee.name}
          onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Role"
          value={employee.role}
          onChange={(e) => setEmployee({ ...employee, role: e.target.value })}
        />
        <input
          type="text"
          placeholder="Department"
          value={employee.department}
          onChange={(e) => setEmployee({ ...employee, department: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={employee.email}
          onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
        />
        <button onClick={editEmployee ? handleUpdate : handleCreate}>
          {editEmployee ? 'Update Employee' : 'Add Employee'}
        </button>
      </div>

      <h2>Employee List</h2>
      <ul>
        {employees.map((emp) => (
          <li key={emp.id}>
            {emp.name} ({emp.role}) - {emp.department} - {emp.email}
            <button onClick={() => handleEdit(emp)}>Edit</button>
            <button onClick={() => handleDelete(emp.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
