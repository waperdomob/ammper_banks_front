import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axiosClient from '../services/AxiosClient';

const Transactions = () => {
  const [transactionsData, setTransactionsData] = useState(null);
  const [loading, setLoading] = useState(false);
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
        
        setTransactionsData(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Error fetching transactions');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [institution]);

  return (
    <div>
      <h1>Transactions for {institution}</h1>
      {loading && <p>Loading transactions...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {transactionsData && (
        <div>
          <h2>KPI</h2>
          <p><strong>Balance:</strong> {transactionsData.KPI.Balance}</p>
          <p><strong>Ingresos:</strong> {transactionsData.KPI.Ingresos}</p>
          <p><strong>Egresos:</strong> {transactionsData.KPI.Egresos}</p>

          <h2>Movimientos</h2>
          <ul>
            {transactionsData.Movimientos.map((txn) => (
              <li key={txn.id}>
                <p><strong>Type:</strong> {txn.type}</p>
                <p><strong>Amount:</strong> {txn.amount}</p>
                <p><strong>Description:</strong> {txn.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Transactions;
