import { api } from "./api";
import type { DesignToken } from "../types/dietPlan";

// Plana ait tüm design'ları listele
export async function getDesignsByPlan(dietPlanId: string) {
  const response = await api.get(`/diet-plans/${dietPlanId}/designs`);
  return response.data;
}

// Plana yeni design ekle (token kaydet)
export async function createDietPlanDesign(
  dietPlanId: string,
  data: DesignToken
) {
  const response = await api.post(`/diet-plans/${dietPlanId}/designs`, data);
  return response.data;
}

// Tek design getir
export async function getDesignById(id: string): Promise<DesignToken> {
  const response = await api.get(`/diet-plan-designs/${id}`);
  return response.data;
}

// Design güncelle
export async function updateDesign(id: string, data: Partial<DesignToken>) {
  const response = await api.put(`/diet-plan-designs/${id}`, data);
  return response.data;
}

// Design sil
export async function deleteDesign(id: string) {
  const response = await api.delete(`/diet-plan-designs/${id}`);
  return response.data;
}
