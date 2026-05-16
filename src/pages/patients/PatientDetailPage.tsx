import { useParams } from "react-router-dom";

import { mockPatients } from "../../data/mockPatients";

import { calculateAge } from "../../utils/calculateAge";

function PatientDetailPage() {

  const { id } = useParams();

  const patient = mockPatients.find(
    (p) => p.id === Number(id)
  );

  if (!patient) {
    return <div>Patient not found</div>;
  }

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        {patient.fullName}
      </h1>

      <div className="bg-white rounded-2xl p-6 shadow-sm">

        <p className="mb-2">
          Yaş: {calculateAge(patient.birthDate)}
        </p>

        <p className="mb-2">
          Cinsiyet: {patient.gender}
        </p>

        <p className="mb-2">
          Telefon: {patient.phone}
        </p>

        <p className="mb-2">
          Email: {patient.email}
        </p>

        <p className="mb-2">
          Boy: {patient.height} cm
        </p>

        <p className="mb-2">
          Kilo: {patient.weight} kg
        </p>

        <p className="mt-4">
          Notlar:
        </p>

        <p className="text-gray-600">
          {patient.notes}
        </p>

      </div>

    </div>
  );
}

export default PatientDetailPage;