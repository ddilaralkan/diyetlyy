import { useEffect, useState } from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import { calculateAge } from "../../utils/calculateAge";

import {
  deletePatient,
  getPatientById,
} from "../../services/patient.service";

function PatientDetailPage() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [patient, setPatient] = useState<any>(null);

  async function fetchPatient() {

    try {

      if (!id) return;

      const data =
        await getPatientById(id);

      setPatient(data);

    } catch (error) {

      console.error(error);
    }
  }

  async function handleDelete() {

    const confirmed =
      window.confirm(
        "Hastayı silmek istediğinize emin misiniz?"
      );

    if (!confirmed) return;

    try {

      if (!id) return;

      await deletePatient(id);

      navigate("/patients");

    } catch (error) {

      console.error(error);
    }
  }

  useEffect(() => {

    fetchPatient();

  }, []);

  if (!patient) {

    return (
      <div>
        Hasta bulunamadı
      </div>
    );
  }

  return (
    <div>
       
      <Link
  to="/patients"
  className="inline-block mb-4 text-gray-600 hover:text-black"
>
  ← Hastalara Dön
</Link>

      <div className="bg-white rounded-2xl p-6 shadow-sm">

        <h1 className="text-3xl font-bold mb-4">
          {patient.fullName}
        </h1>

        <div className="grid grid-cols-2 gap-4">

          <p>
            <strong>Yaş:</strong>{" "}
            {calculateAge(patient.birthDate)}
          </p>

          <p>
            <strong>Cinsiyet:</strong>{" "}
            {patient.gender}
          </p>

          <p>
            <strong>Telefon:</strong>{" "}
            {patient.phone}
          </p>

          <p>
            <strong>E-mail:</strong>{" "}
            {patient.email}
          </p>

          <p>
            <strong>Boy:</strong>{" "}
            {patient.height} cm
          </p>

          <p>
            <strong>Kilo:</strong>{" "}
            {patient.weight} kg
          </p>

        </div>

        <div className="mt-6">

          <div className="flex items-center mb-6">

            <Link
              to={`/patients/${patient.id}/edit`}
              className="bg-gray-900 text-white px-4 py-2 rounded-lg"
            >
              Düzenle
            </Link>

            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded-lg ml-3"
            >
              Hastayı Sil
            </button>

          </div>

          <h2 className="text-xl font-semibold mb-2">
            Notlar
          </h2>

          <p>
            {patient.notes || "Not bulunmuyor."}
          </p>

        </div>

      </div>

    </div>
  );
}

export default PatientDetailPage;