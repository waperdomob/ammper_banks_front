import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axiosClient from '../../AxiosClient';

const BankDetails = () => {
  const [transactions, setTransactions] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchTransactions = async () => {
        const response = await axiosClient.post(`/api/banks/transactions/${id}`);
        setTransactions(response.data);
      };
      fetchTransactions();
    }
  }, [id]);

  const calculateBalance = () => {
    const income = transactions
      .filter((t) => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0);
    const expenses = transactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);
    return income - expenses;
  };

  return (
    <div>
      <h1>Bank Details</h1>
      <h2>Balance: {calculateBalance()}</h2>
      <ul>
        {transactions.map((t) => (
          <li key={t.id}>
            {t.type}: {t.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BankDetails;
