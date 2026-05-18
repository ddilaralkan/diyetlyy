import { api } from "./api";

export async function createPatient(data: unknown) {

  const response =
    await api.post("/patients", data);

  return response.data;
}

export async function getPatients() {

  const response =
    await api.get("/patients");

  return response.data;
}
export async function updatePatient(
  id: string,
  data: unknown
) {

  const response =
    await api.put(`/patients/${id}`, data);

  return response.data;
}
export async function deletePatient(id: string) {

  const response =
    await api.delete(`/patients/${id}`);

  return response.data;
}

export async function getPatientById(id: string) {

  const response =
    await api.get(`/patients/${id}`);

  return response.data;
}