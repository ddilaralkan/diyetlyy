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