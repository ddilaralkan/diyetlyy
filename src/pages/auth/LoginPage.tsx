import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { login } from "../../services/auth.service";

function LoginPage() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit() {

    try {

      const response = await login(formData);

      console.log(response);

      localStorage.setItem(
        "token",
        response.token
      );

      navigate("/patients");

    } catch (error) {

      console.error(error);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow-sm w-full max-w-md">

        <h1 className="text-3xl font-bold mb-6">
          Giriş Yap
        </h1>

        <div className="flex flex-col gap-4">

          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <input
            type="password"
            name="password"
            placeholder="Şifre"
            value={formData.password}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <button
            onClick={handleSubmit}
            className="bg-gray-900 text-white p-3 rounded-xl"
          >
            Giriş Yap
          </button>

        </div>

      </div>

    </div>
  );
}

export default LoginPage;