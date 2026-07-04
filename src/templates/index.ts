import WeeklyTable from "./WeeklyTable";
import DailyCards from "./DailyCards";
import ClinicalReport from "./ClinicalReport";
import FitnessPlan from "./FitnessPlan";
import CompactTable from "./CompactTable";
import KidsWeeklyPlanner from "./KidsWeeklyPlanner";
import KidsPastelSevenDay from "./KidsPastelSevenDay";
import MintSidebarWeekly from "./MintSidebarWeekly";
import ElegantEditorialPlan from "./ElegantEditorialPlan";
import ModernWellnessSheet from "./ModernWellnessSheet";
import BotanicalSoftCards from "./BotanicalSoftCards";
import CleanMagazinePlan from "./CleanMagazinePlan";
import PremiumWeeklyDashboard from "./PremiumWeeklyDashboard";
import CalmFlowCards from "./CalmFlowCards";

export const templateRegistry: Record<string, any> = {
  weekly_table: WeeklyTable,
  daily_cards: DailyCards,
  clinical_report: ClinicalReport,
  fitness_plan: FitnessPlan,
  compact_table: CompactTable,
  kids_weekly_planner: KidsWeeklyPlanner,
  kids_pastel_7_day: KidsPastelSevenDay,
  mint_sidebar_weekly: MintSidebarWeekly,
  elegant_editorial_plan: ElegantEditorialPlan,
  modern_wellness_sheet: ModernWellnessSheet,
  botanical_soft_cards: BotanicalSoftCards,
  clean_magazine_plan: CleanMagazinePlan,
  premium_weekly_dashboard: PremiumWeeklyDashboard,
  calm_flow_cards: CalmFlowCards,
};
