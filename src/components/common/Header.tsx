import {
  useNavigate,
} from "react-router-dom";

import {
  Search,
  LogOut,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import logo from "../../assets/logo.png";

import { getPatients } from "../../services/patient.service";

function Header({
  onToggleSidebar,
}: {
  onToggleSidebar?: () => void;
}) {

  const navigate = useNavigate();

  const [patients, setPatients] = useState<any[]>([]);

  const [search, setSearch] = useState("");

  async function fetchPatients() {

    try {

      const data = await getPatients();

      setPatients(data);

    } catch (error) {

      console.error(error);
    }
  }

  useEffect(() => {

    fetchPatients();

  }, []);

  const filteredPatients = useMemo(() => {

    if (!search.trim()) return [];

    return patients.filter((patient) =>
      patient.fullName
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  }, [search, patients]);

  function handleLogout() {

    localStorage.removeItem("token");

    navigate("/login");
  }

  function goToPatient(id: string) {

    setSearch("");

    navigate(`/patients/${id}`);
  }

  return (
    <header className="bg-white">

      <div className="w-full px-8">

        <div className="relative flex items-center justify-between h-24">

          {/* LEFT SIDE */}
          <div className="flex items-center gap-2 min-w-fit">

            {/* MENU BUTTON */}
            <button
              onClick={() =>
                onToggleSidebar &&
                onToggleSidebar()
              }
              aria-label="Open menu"
              className="
                p-2
                rounded-xl
                hover:bg-black/5
                transition-all
                duration-200
              "
            >

              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >

                <path
                  d="M3 6h18M3 12h18M3 18h18"
                  stroke="#111827"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

              </svg>

            </button>

            {/* LOGO */}
            <img
              src={logo}
              alt="Dietly"
              className="
                w-40
                sm:w-48
                object-contain
                select-none
                block
              "
            />

          </div>

          {/* CENTER */}
          <div className="absolute left-1/2 -translate-x-1/2">

            <div className="relative w-[340px]">

              {/* SEARCH BAR */}
              <div
                className="
                  flex
                  items-center
                  gap-2
                  h-11
                  px-4
                  rounded-2xl
                  bg-[#F8F8F7]
                  border border-black/5
                  shadow-sm
                "
              >

                <Search
                  size={17}
                  strokeWidth={1.8}
                  className="text-gray-400"
                />

                <input
                  type="text"
                  placeholder="Danışan ara..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  className="
                    bg-transparent
                    outline-none
                    border-none
                    text-sm
                    text-black
                    placeholder:text-gray-400
                    w-full
                  "
                />

              </div>

              {/* SEARCH RESULTS */}
              {filteredPatients.length > 0 && (

                <div
                  className="
                    absolute
                    top-14
                    left-0
                    w-full
                    bg-white
                    border border-gray-200
                    rounded-2xl
                    shadow-xl
                    overflow-hidden
                    z-50
                  "
                >

                  {filteredPatients.map((patient) => (

                    <button
                      key={patient.id}
                      onClick={() =>
                        goToPatient(patient.id)
                      }
                      className="
                        w-full
                        px-4
                        py-3
                        text-left
                        text-sm
                        hover:bg-gray-50
                        transition
                        border-b
                        border-gray-100
                        last:border-b-0
                      "
                    >

                      {patient.fullName}

                    </button>

                  ))}

                </div>

              )}

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="flex justify-end min-w-fit">

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="
                w-11 h-11
                rounded-2xl
                bg-white
                border border-black/5
                flex items-center justify-center
                hover:bg-gray-50
                transition-all
                duration-200
                shadow-sm
              "
            >

              <LogOut
                size={18}
                strokeWidth={1.8}
              />

            </button>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Header;