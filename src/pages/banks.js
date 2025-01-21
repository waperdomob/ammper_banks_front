  import { useState, useEffect } from 'react';
  import axiosClient from '../services/AxiosClient';
  import { useRouter } from 'next/router';

  const Banks = () => {
    const [banks, setBanks] = useState([]);
    const router = useRouter();
    
    useEffect(() => {
      const fetchBanks = async () => {
        const token = localStorage.getItem('token');
        try {
          axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
          const response = await axiosClient.get('/api/banks/');
          setBanks(response.data.results || []);
        } catch (error) {
          alert('Error fetching banks',error);
        }
        
      };
      fetchBanks();
    }, []);
    const handleBankSelect = (bankName) => {
      // Lógica para seleccionar un banco y redirigir
      router.push(`/transactions?institution=${bankName}`); // Redirigir a la página de transacciones con el nombre del banco como parámetro.
    }; 
    return (
      <div>
        <h1>Banks</h1>
        <ul>
          {banks.map((bank) => (
            <li key={bank.id}>
              <button onClick={() => handleBankSelect(bank.name)}>
                {bank.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  export default Banks;
