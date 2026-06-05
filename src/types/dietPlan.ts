export interface Meals {
  breakfast: string;
  snack1: string;
  lunch: string;
  snack2: string;
  dinner: string;
}

export interface DayPlan {
  dayIndex: number;
  dayName: string;
  meals: Meals;
}

export interface ContentJson {
  patientId: string;
  patientFullName: string;
  startDay: string;
  dayCount: number;
  days: DayPlan[];
}

export interface DietPlan {
  id: string;
  patientId: string;
  title: string;
  dayCount: number;
  contentJson: ContentJson;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface DesignToken {
  id?: string;
  dietPlanId?: string;
  gender: string;
  templateFamilyKey: string;
  themeKey: string;
  colorPaletteKey: string;
  goalKey: string;
  designTokensJson: string;
  createdAt?: string;
  updatedAt?: string;
}