import { useState } from 'react';
import { useRouter } from 'next/router';
import axiosClient from '@/services/AxiosClient';

const LoginForm = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
        alert('Please fill in both fields');
        return;
      }
    try {
      const response = await axiosClient.post('/api/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      alert('Login successful!');
      router.push('/banks'); // Redirige a la página de bancos
    } catch (err) {
      alert(err.response?.data?.message || 'Error logging in');
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
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
