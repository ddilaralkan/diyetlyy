import {
  Link,
  useLocation,
} from "react-router-dom";

import logo from "../../assets/logo.png";

function Sidebar({
  open = false,
  onClose,
}: {
  open?: boolean;
  onClose?: () => void;
}) {

  const location = useLocation();

  const menuItems = [
    {
      label: "Danışanlar",
      path: "/patients",
    },

    {
      label: "Diyet Editörü",
      path: "/diet-editor",
    },
  ];

  return (
    <>
      {/* OVERLAY */}
      <div
        className={`
          fixed
          inset-0
          z-40
          bg-black/30
          transition-opacity
          duration-300
          ${open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
          }
        `}
        onClick={() =>
          onClose && onClose()
        }
        aria-hidden={!open}
      />

      {/* SIDEBAR */}
      <aside
        className={`
          fixed
          left-0
          top-0
          z-50
          h-full
          w-72
          transform
          bg-white
          border-r
          border-gray-200
          px-6
          py-8
          transition-transform
          duration-300
          ${open
            ? "translate-x-0"
            : "-translate-x-full"
          }
        `}
      >

        {/* HEADER */}
        <div className="relative mb-10 flex items-center justify-center">

          {/* LOGO */}
          <img
            src={logo}
            alt="Dietly Logo"
            className="
              w-32
              object-contain
              select-none
            "
          />

          {/* CLOSE BUTTON */}
          <button
            onClick={() =>
              onClose && onClose()
            }
            aria-label="Close menu"
            className="
              absolute
              right-0
              top-0
              p-2
              rounded-xl
              hover:bg-gray-100
              transition
            "
          >

            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >

              <path
                d="M6 6l12 12M6 18L18 6"
                stroke="#374151"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

            </svg>

          </button>

        </div>

        {/* MENU */}
        <nav className="flex flex-col gap-3">

          {menuItems.map((item) => {

            const isActive =
              location.pathname.startsWith(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() =>
                  onClose && onClose()
                }
                className={`
                  px-5
                  py-3
                  rounded-2xl
                  text-sm
                  font-medium
                  transition-all
                  duration-200
                  ${isActive
                    ? `
                      bg-slate-900
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
    </>
  );
}

export default Sidebar;