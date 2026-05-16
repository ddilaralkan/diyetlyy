import type { Patient } from "../types/patient.types";

export const mockPatients: Patient[] = [
  {
    id: 1,

    fullName: "Ayşe Yılmaz",

    gender: "female",

    birthDate: "1995-05-10",

    phone: "05554443322",

    email: "ayse@test.com",

    height: 166,

    weight: 60,

    notes: "Kilo kaybı hedefi mevcut.",
  },

  {
    id: 2,

    fullName: "Mehmet Kaya",

    gender: "male",

    birthDate: "1990-03-15",

    phone: "05551112233",

    email: "mehmet@test.com",

    height: 180,

    weight: 85,

    notes: "Kas kazanımı hedefleniyor.",
  },
];