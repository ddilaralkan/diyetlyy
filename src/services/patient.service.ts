import { api } from "./api";

export async function createPatient(
  data: any
) {

  const response = await api.post(
    "/patients",
    data
  );

  return response.data;
}