import { api } from "./api";

export async function createDietPlanDesign(
    dietPlanId: string,
    data: {
        gender: string;
        templateFamilyKey: string;
        themeKey: string;
        colorPaletteKey: string;
        goalKey: string;
        designTokensJson: unknown;
    }
) {
    const response = await api.post(
        `/diet-plans/${dietPlanId}/designs`,
        data
    );

    return response.data;
}