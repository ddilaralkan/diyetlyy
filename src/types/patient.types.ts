export type Gender = "male" | "female";

export interface Patient {
  id: number;

  fullName: string;

  gender: Gender;

  birthDate: string;

  phone: string;

  email: string;

  height: number;

  weight: number;

  notes: string;
}