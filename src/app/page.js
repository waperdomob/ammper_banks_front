"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import { Button } from '@mui/material';

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/banks');
    }
  }, [router]);

  const goToLogin = () => {
    router.push('/login');  // Redirige a /login
  };

  const goToRegister = () => {
    router.push('/register');  // Redirige a /register
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Bienvenido</h1>
        <p className="text-xl text-gray-600 mb-6">Por favor, selecciona una opción:</p>

        <div className="flex flex-col gap-4">
          <Button variant="contained" color="primary" onClick={goToLogin}>
            Iniciar sesión
          </Button>
          <Button variant="outlined" color="secondary" onClick={goToRegister}>
            Registrarse
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
