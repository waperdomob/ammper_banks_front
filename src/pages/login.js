import LoginForm from "@/components/LoginForm";
import "../styles/globals.css";

const Login = () => {
  return (
    <main className="flex justify-center min-h-screen bg-gray-100 mt-8">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-6xl font-bold text-center text-blue-500 mb-6">
          Login
        </h1>
        <LoginForm />
      </div>
    </main>
  );
};

export default Login;
