import { useState, useEffect } from 'react';
import axiosClient from '../../AxiosClient';

const Banks = () => {
  const [banks, setBanks] = useState([]);

  useEffect(() => {
    const fetchBanks = async () => {
      const response = await axiosClient.get('/api/banks');
      setBanks(response.data);
    };
    fetchBanks();
  }, []);

  return (
    <div>
      <h1>Banks</h1>
      <ul>
        {banks.map((bank) => (
          <li key={bank.id}>
            <a href={`/bank/${bank.id}`}>{bank.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Banks;
