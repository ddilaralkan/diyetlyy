import { api } from "./api";
import type { DietPlan } from "../types/dietPlan";

// Hasta için yeni diyet planı oluştur
export async function createDietPlan(
  patientId: string,
  data: {
    title: string;
    dayCount: number;
    contentJson: unknown;
  }
) {
  const response = await api.post(`/patients/${patientId}/diet-plans`, data);
  return response.data;
}

// Hastanın tüm diyet planlarını listele
export async function getDietPlansByPatient(patientId: string): Promise<DietPlan[]> {
  const response = await api.get(`/patients/${patientId}/diet-plans`);
  return response.data;
}

// Tek bir diyet planını getir
export async function getDietPlanById(planId: string): Promise<DietPlan> {
  const response = await api.get(`/diet-plans/${planId}`);
  return response.data;
}

// Diyet planını güncelle
export async function updateDietPlan(
  planId: string,
  data: Partial<DietPlan>
) {
  const response = await api.put(`/diet-plans/${planId}`, data);
  return response.data;
}

// Diyet planını sil
export async function deleteDietPlan(planId: string) {
  const response = await api.delete(`/diet-plans/${planId}`);
  return response.data;
}