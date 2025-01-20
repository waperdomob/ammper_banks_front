import { useState } from 'react';
import axiosClient from '../../AxiosClient';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.post('/api/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      alert('Login successful!');
    } catch (err) {
      alert(err.response?.data?.message || 'Error logging in');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="username"
        placeholder="Username"
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
