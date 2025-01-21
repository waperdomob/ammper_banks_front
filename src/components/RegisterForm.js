import { useState } from 'react';
import axiosClient from '@/services/AxiosClient';


const RegisterForm = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
        alert('Please fill in both fields');
        return;
      }
    try {
      const response = await axiosClient.post('/api/auth/register', formData);
      alert('Registration successful!');
    } catch (err) {
      alert(err.response?.data?.message || 'Error registering');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="username"
        placeholder="username"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
