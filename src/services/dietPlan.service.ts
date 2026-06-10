import { api } from "./api";

export async function createDietPlan(
  patientId: string,
  data: {
    title: string;
    dayCount: number;
    contentJson: unknown;
  }
) {
  const response = await api.post(
    `/patients/${patientId}/diet-plans`,
    data
  );

  return response.data;
}

export async function getPatientDietPlans(
  patientId: string
) {
  const response = await api.get(
    `/patients/${patientId}/diet-plans`
  );

  return response.data;
}

export async function getDietPlanById(
  id: string
) {
  const response = await api.get(
    `/diet-plans/${id}`
  );

  return response.data;
}

export async function updateDietPlan(
  id: string,
  data: {
    title: string;
    dayCount: number;
    contentJson: unknown;
    status: string;
  }
) {
  const response = await api.put(
    `/diet-plans/${id}`,
    data
  );

  return response.data;
}

export async function deleteDietPlan(
  id: string
) {
  const response = await api.delete(
    `/diet-plans/${id}`
  );

  return response.data;
}