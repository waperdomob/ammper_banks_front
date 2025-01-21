import { useState, useEffect } from 'react';
import axiosClient from '../services/AxiosClient';
import { useRouter } from 'next/router';
import "../styles/globals.css";

const Banks = () => {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true); // Nuevo estado para controlar el cargando
  const [error, setError] = useState(null); // Nuevo estado para manejar errores
  const router = useRouter();

  useEffect(() => {
    const fetchBanks = async () => {
      const token = localStorage.getItem('token');
      try {
        axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axiosClient.get('/api/banks/');
        setBanks(response.data.results || []);
      } catch (error) {
        setError('Error fetching banks. Please try again later.');
      } finally {
        setLoading(false); // Cambiar el estado de cargando después de la solicitud
      }
    };
    fetchBanks();
  }, []);

  const handleBankSelect = (bankName) => {
    // Lógica para seleccionar un banco y redirigir
    router.push(`/transactions?institution=${bankName}`); // Redirigir a la página de transacciones con el nombre del banco como parámetro.
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Banks</h1>
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <ul className="space-y-4">
          {banks.map((bank) => (
            <li key={bank.id} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md hover:bg-gray-200">
              <span className="text-lg font-semibold">{bank.name}</span>
              <button
                onClick={() => handleBankSelect(bank.name)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
              >
                Select
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Banks;
