import { api } from "./api";

// Kullanılabilir tüm design seçeneklerini getir (tema/palet listesi)
export async function getDesignOptions() {
  const response = await api.get(`/design-options`);
  return response.data;
}