import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Banks from './components/Banks';
import Transactions from '@/pages/transactions';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/banks" element={<Banks />} />
      <Route path="/transaction" element={<Transactions />} />

    </Routes>
  );
};

export default App;
