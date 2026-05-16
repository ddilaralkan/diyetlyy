import { useState } from "react";

import { createPatient } from "../../services/patient.service";

function CreatePatientPage() {

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

  async function handleSubmit() {

    try {

      const payload = {
        ...formData,

        height: Number(formData.height),

        weight: Number(formData.weight),
      };

      const response =
        await createPatient(payload);

      console.log(response);

    } catch (error) {

      console.error(error);
    }
  }

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Yeni Hasta
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
          Kaydet
        </button>

      </div>

    </div>
  );
}

export default CreatePatientPage;