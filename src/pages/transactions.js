import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axiosClient from '../services/AxiosClient';
import { AiOutlineArrowLeft } from 'react-icons/ai'; // Importamos el ícono de flecha
import "../styles/globals.css";

const Transactions = () => {
  const [transactionsData, setTransactionsData] = useState(null);
  const [loading, setLoading] = useState(true); // Establecer el estado de carga como true inicialmente
  const [error, setError] = useState(null);
  const router = useRouter();
  const { institution } = router.query; // Captura el parámetro de la URL

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!institution) return; // No hacer la solicitud si no hay institución
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem('token');
        axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const response = await axiosClient.post('/api/banks/transactions', {
          institution,
        });
        console.log(response.data);

        // Verificamos si la respuesta contiene las claves KPI y Movimientos
        if (response.data?.KPI && response.data?.Movimientos) {
          setTransactionsData(response.data); // Establecemos la data si ambas claves existen
        } else {
          setTransactionsData(null); // Si no hay datos válidos
        }
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.error || 'Error fetching transactions');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [institution]);

  const handleBackToBanks = () => {
    router.push('/banks'); // Redirige a la lista de bancos
  };

  return (
    <div className="p-4 pb-16 relative"> {/* Añadimos relative para posicionar el ícono */}
      <h1 className="text-3xl font-bold text-center mb-6">Transactions for {institution}</h1>

      {loading && !transactionsData && <p>Loading transactions...</p>} {/* Solo mostrar el mensaje mientras se carga */}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {transactionsData ? (
        <>
          {/* Mostrar KPI si existe */}
          <h2 className="text-2xl font-semibold mt-6">KPI</h2>
          {transactionsData.KPI ? (
            <>
              <p><strong>Balance:</strong> {transactionsData.KPI.Balance}</p>
              <p><strong>Ingresos:</strong> {transactionsData.KPI.Ingresos}</p>
              <p><strong>Egresos:</strong> {transactionsData.KPI.Egresos}</p>
            </>
          ) : (
            <p>No KPI data available.</p> // Mensaje si no hay datos de KPI
          )}

          {/* Mostrar Movimientos si existe */}
          <h2 className="text-2xl font-semibold mt-6">Movimientos</h2>
          {transactionsData.Movimientos && transactionsData.Movimientos.length > 0 ? (
            <ul>
              {transactionsData.Movimientos.map((txn) => (
                <li key={txn.id} className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
                  <p><strong>Type:</strong> {txn.type}</p>
                  <p><strong>Amount:</strong> {txn.amount}</p>
                  <p><strong>Description:</strong> {txn.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No Movimientos available.</p> // Mensaje si no hay movimientos
          )}
        </>
      ) : (
        !loading && <p>No transactions available for this bank.</p> // Solo mostrar este mensaje si ya terminó de cargar y no hay transacciones
      )}

      {/* Flecha de regreso en la parte superior derecha */}
      <button
        onClick={handleBackToBanks}
        className="absolute top-4 right-4 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
      >
        <AiOutlineArrowLeft size={24} /> {/* Icono de la flecha */}
      </button>
    </div>
  );
};

export default Transactions;
