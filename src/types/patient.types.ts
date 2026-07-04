export type Gender = "male" | "female";

export interface Patient {
  id: string;

  fullName: string;

  gender: Gender | null;

  birthDate: string | null;

  phone: string | null;

  email: string | null;

  height: number | null;

  weight: number | null;

  notes: string | null;
}
