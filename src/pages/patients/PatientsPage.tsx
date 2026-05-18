import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { calculateAge } from "../../utils/calculateAge";

import { getPatients } from "../../services/patient.service";

function PatientsPage() {

  const [patients, setPatients] = useState([]);

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

  return (
    <div>

      <div className="flex items-center justify-between mb-6">

        <h1 className="text-3xl font-bold">
          Hastalar
        </h1>

        <Link
          to="/patients/new"
          className="bg-gray-900 text-white px-4 py-2 rounded-lg"
        >
          Yeni Hasta
        </Link>

      </div>

      <div className="grid grid-cols-3 gap-4">

        {patients.map((patient: any) => (

          <Link
            key={patient.id}
            to={`/patients/${patient.id}`}
            className="bg-white rounded-2xl p-5 shadow-sm block"
          >

            <h2 className="text-xl font-semibold mb-2">
              {patient.fullName}
            </h2>

            <p>
              Yaş: {calculateAge(patient.birthDate)}
            </p>

            <p>
              Cinsiyet: {patient.gender}
            </p>

            <p>
              Telefon: {patient.phone}
            </p>

          </Link>
        ))}

      </div>

    </div>
  );
}

export default PatientsPage;