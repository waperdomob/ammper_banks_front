import { useState } from "react";
import { useRouter } from "next/router";
import axiosClient from "@/services/AxiosClient";

const LoginForm = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      alert("Por favor, llena ambos campos");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axiosClient.post("/api/auth/login", formData);
      localStorage.setItem("token", response.data.token);
      console.log("¡Login exitoso!");
      router.push("/banks");
    } catch (err) {
      alert(err.response?.data?.message || "Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          id="username"
          placeholder="Ingresa tu usuario"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <input
          type="password"
          id="password"
          placeholder="Ingresa tu contraseña"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-2 text-white rounded-lg shadow ${
          isLoading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {isLoading ? "Cargando..." : "Iniciar sesión"}
      </button>
    </form>
  );
};

export default LoginForm;
