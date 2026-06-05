import WeeklyTable from "./WeeklyTable";
import DailyCards from "./DailyCards";
import ClinicalReport from "./ClinicalReport";
import FitnessPlan from "./FitnessPlan";
import CompactTable from "./CompactTable";

export const templateRegistry: Record<string, any> = {
  weekly_table: WeeklyTable,
  daily_cards: DailyCards,
  clinical_report: ClinicalReport,
  fitness_plan: FitnessPlan,
  compact_table: CompactTable,
};