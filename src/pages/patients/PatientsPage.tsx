import { mockPatients } from "../../data/mockPatients";
import { calculateAge } from "../../utils/calculateAge";
import { Link } from "react-router-dom";

function PatientsPage() {
  return (
    <div>

      <div className="flex items-center justify-between mb-6">

        <h1 className="text-3xl font-bold">
          Hastalar
        </h1>

        <button className="bg-gray-900 text-white px-4 py-2 rounded-lg">
          Yeni Hasta
        </button>

      </div>

      <div className="grid grid-cols-3 gap-4">

        {mockPatients.map((patient) => (
          <Link
                 to={`/patients/${patient.id}`}
                 key={patient.id}
                 className="bg-white rounded-2xl p-5 shadow-sm block"
                 >

            <h2 className="text-xl font-semibold mb-2">
              {patient.fullName}
            </h2>

            <p>Yaş: {calculateAge(patient.birthDate)}</p>
            <p>Cinsiyet: {patient.gender}</p>
            <p>Telefon: {patient.phone}</p>

          </Link>
        ))}

      </div>

    </div>
  );
}

export default PatientsPage;