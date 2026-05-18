import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";

function Sidebar() {

  const location = useLocation();

  const menuItems = [
    {
      label: "Hastalar",
      path: "/patients",
    },

    {
      label: "Diyet Planları",
      path: "/diet-editor",
    },
  ];

  return (
    <aside className="
      w-[260px]
      bg-white
      border-r
      border-gray-200
      min-h-screen
      px-6
      py-8
    ">

      <div className="mb-14">

            <div className="
  flex
  items-center
  justify-center
  mb-6
">

  <img
    src={logo}
    alt="Dietly Logo"
    className="
      w-28
      object-contain
    "
  />

</div>


      </div>

      <nav className="flex flex-col gap-3">

        {menuItems.map((item) => {

          const isActive =
            location.pathname.startsWith(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                px-5
                py-4
                rounded-2xl
                transition-all
                duration-200
                text-sm
                font-medium

                ${
                  isActive
                    ? `
                      bg-gray-900
                      text-white
                      shadow-lg
                    `
                    : `
                      text-gray-600
                      hover:bg-gray-100
                    `
                }
              `}
            >
              {item.label}
            </Link>
          );
        })}

      </nav>

    </aside>
  );
}

export default Sidebar;