import React, { useState } from 'react';
import { authAPI } from '../../services/api';

const Register: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'patient' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authAPI.register(form);
      alert('Registration successful! Please login.');
      setForm({ name: '', email: '', password: '', role: 'patient' });
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="border p-2 w-full mb-2"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="border p-2 w-full mb-2"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="border p-2 w-full mb-2"
        required
      />
      <select
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
        className="border p-2 w-full mb-2"
      >
        <option value="patient">Patient</option>
        <option value="doctor">Doctor</option>
      </select>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Register</button>
    </form>
  );
};

export default Register;