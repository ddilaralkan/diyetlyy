import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { login } from "../../services/auth.service";

import logo from "../../assets/logo.png";

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

      const response =
        await login(formData);

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
    <div className="
      min-h-screen
      bg-[#F7F7F5]
      flex
      items-center
      justify-center
      px-6
    ">

      <div className="
        w-full
        max-w-6xl
        bg-white
        rounded-[40px]
        overflow-hidden
        shadow-xl
        border
        border-gray-100
        grid
        grid-cols-1
        lg:grid-cols-2
      ">

        <div className="
          hidden
          lg:flex
          flex-col
          justify-between
          bg-[#111111]
          p-16
          text-white
        ">

          <div className="
  flex
  items-center
  justify-center
  h-full
  w-full
">

  <img
    src={logo}
    alt="Dietly Logo"
    className="
      w-[420px]
      object-contain
      opacity-95
    "
  />

</div>


        </div>

        <div className="
          flex
          items-center
          justify-center
          p-10
          lg:p-20
        ">

          <div className="w-full max-w-md">

            <div className="mb-10">

              <h1 className="
                text-4xl
                font-bold
                tracking-tight
                text-gray-900
              ">
                Hoşgeldiniz!
              </h1>

              <p className="
                text-gray-500
                mt-3
                text-lg
              ">
                Giriş Yapınız
              </p>

            </div>

            <div className="flex flex-col gap-5">

              <input
                type="email"
                name="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={handleChange}
                className="
                  h-14
                  rounded-2xl
                  border
                  border-gray-200
                  px-5
                  bg-gray-50
                  outline-none
                  focus:border-gray-900
                  transition-all
                "
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="
                  h-14
                  rounded-2xl
                  border
                  border-gray-200
                  px-5
                  bg-gray-50
                  outline-none
                  focus:border-gray-900
                  transition-all
                "
              />

              <button
                onClick={handleSubmit}
                className="
                  h-14
                  rounded-2xl
                  bg-gray-900
                  text-white
                  font-semibold
                  hover:opacity-90
                  transition-all
                  mt-2
                "
              >
                Sign In
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default LoginPage;