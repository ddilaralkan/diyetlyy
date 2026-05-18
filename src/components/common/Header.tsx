import { useNavigate } from "react-router-dom";

function Header() {

  const navigate = useNavigate();

  function handleLogout() {

    localStorage.removeItem("token");

    navigate("/login");
  }

  return (
    <header className="
      h-24
      flex
      items-center
      justify-between
      px-10
    ">

      <div>

        <h2 className="
          text-3xl
          font-bold
          tracking-tight
          text-gray-900
        ">
          Dashboard
        </h2>

        <p className="text-gray-500 mt-1">
          Welcome back 👋
        </p>

      </div>

      <button
        onClick={handleLogout}
        className="
          bg-white
          border
          border-gray-200
          px-5
          py-3
          rounded-2xl
          text-sm
          font-semibold
          hover:bg-gray-100
          transition-all
        "
      >
        Çıkış Yap
      </button>

    </header>
  );
}

export default Header;