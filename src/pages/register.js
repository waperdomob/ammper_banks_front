import RegisterForm from '@/components/RegisterForm';
import "../styles/globals.css";

const Register = () => {
  return (
    <main className="flex mt-8 justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-center text-blue-500 mb-6">Register</h1>
        <RegisterForm />
      </div>
    </main>
  );
};

export default Register;
