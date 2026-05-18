import { useEffect, useState } from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getPatientById,
  updatePatient,
} from "../../services/patient.service";

function EditPatientPage() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    gender: "female",
    birthDate: "",
    phone: "",
    email: "",
    height: "",
    weight: "",
    notes: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function fetchPatient() {

    try {

      if (!id) return;

      const data =
        await getPatientById(id);

      setFormData({
        fullName: data.fullName,
        gender: data.gender,
        birthDate: data.birthDate?.split("T")[0],
        phone: data.phone,
        email: data.email,
        height: String(data.height),
        weight: String(data.weight),
        notes: data.notes || "",
      });

    } catch (error) {

      console.error(error);
    }
  }

  async function handleSubmit() {

    try {

      if (!id) return;

      const payload = {
        ...formData,

        height: Number(formData.height),

        weight: Number(formData.weight),
      };

      await updatePatient(id, payload);

      navigate(`/patients/${id}`);

    } catch (error) {

      console.error(error);
    }
  }

  useEffect(() => {

    fetchPatient();

  }, []);

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Hastayı Düzenle
      </h1>

      <div className="bg-white rounded-2xl p-6 shadow-sm">

        <div className="grid grid-cols-2 gap-4">

          <input
            type="text"
            name="fullName"
            placeholder="Ad Soyad"
            value={formData.fullName}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <input
            type="text"
            name="phone"
            placeholder="Telefon"
            value={formData.phone}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <input
            type="number"
            name="height"
            placeholder="Boy"
            value={formData.height}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <input
            type="number"
            name="weight"
            placeholder="Kilo"
            value={formData.weight}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border rounded-lg p-3"
          >

            <option value="female">
              Kadın
            </option>

            <option value="male">
              Erkek
            </option>

          </select>

        </div>

        <textarea
          name="notes"
          placeholder="Notlar"
          value={formData.notes}
          onChange={handleChange}
          className="border rounded-lg p-3 w-full mt-4 h-32"
        />

        <button
          onClick={handleSubmit}
          className="bg-gray-900 text-white px-5 py-3 rounded-xl mt-6"
        >
          Güncelle
        </button>

      </div>

    </div>
  );
}

export default EditPatientPage;