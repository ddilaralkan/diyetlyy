"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPatients } from "../../services/patient.service";
import { createDietPlan } from "../../services/dietPlan.service";
import { ClipboardList, UserCheck, ChevronDown } from "lucide-react";

const meals = [
  { key: "breakfast", label: "Kahvaltı" },
  { key: "snack1", label: "Ara Öğün 1" },
  { key: "lunch", label: "Öğle Yemeği" },
  { key: "snack2", label: "Ara Öğün 2" },
  { key: "dinner", label: "Akşam Yemeği" },
];

const weekDays = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"];

function DietPlanPage() {
  const navigate = useNavigate();

  const [patients, setPatients] = useState<any[]>([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [planDuration, setPlanDuration] = useState("7");
  const [startDay, setStartDay] = useState("Pazartesi");
  const [activeDay, setActiveDay] = useState(0);
  const [mealPlans, setMealPlans] = useState<Record<number, Record<string, string>>>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    getPatients().then(setPatients).catch(console.error);
  }, []);

  const generatedDays = Array.from({ length: Number(planDuration) }, (_, index) => {
    const startIndex = weekDays.indexOf(startDay);
    return {
      id: index,
      name: weekDays[(startIndex + index) % weekDays.length],
    };
  });

  function handleMealChange(dayId: number, mealKey: string, value: string) {
    setMealPlans((prev) => ({
      ...prev,
      [dayId]: { ...prev[dayId], [mealKey]: value },
    }));
  }

  async function savePlan() {
    if (!selectedPatient) {
      alert("Lütfen bir danışan seçiniz.");
      return null;
    }

    const selectedPatientData = patients.find((p) => p.id === selectedPatient);

    const dietContentJson = {
      patientId: selectedPatient,
      patientFullName: selectedPatientData?.fullName || "",
      startDay,
      dayCount: Number(planDuration),
      days: generatedDays.map((day) => ({
        dayIndex: day.id + 1,
        dayName: day.name,
        meals: {
          breakfast: mealPlans[day.id]?.breakfast || "",
          snack1: mealPlans[day.id]?.snack1 || "",
          lunch: mealPlans[day.id]?.lunch || "",
          snack2: mealPlans[day.id]?.snack2 || "",
          dinner: mealPlans[day.id]?.dinner || "",
        },
      })),
    };

    const response = await createDietPlan(selectedPatient, {
      title: `${selectedPatientData?.fullName || "Danışan"} Diyet Listesi`,
      dayCount: Number(planDuration),
      contentJson: dietContentJson,
    });

    return response;
  }

  async function handleSave() {
    try {
      setIsSaving(true);
      await savePlan();
      alert("Diyet listesi kaydedildi.");
    } catch (error) {
      console.error(error);
      alert("Kayıt sırasında hata oluştu.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleSaveAndDesign() {
    try {
      setIsSaving(true);
      const response = await savePlan();
      if (response) {
        navigate(`/design?patientId=${selectedPatient}&planId=${response.id}`);
      }
    } catch (error) {
      console.error(error);
      alert("Kayıt sırasında hata oluştu.");
    } finally {
      setIsSaving(false);
    }
  }

  function renderSelect(
    label: string,
    icon: React.ReactNode,
    value: string,
    setValue: (value: string) => void,
    options: string[],
    fieldKey: string
  ) {
    return (
      <div>
        <div className="flex items-center gap-2 mb-3 pl-0.5">
          {icon}
          <label className="text-sm font-bold uppercase tracking-wider text-gray-400">
            {label}
          </label>
        </div>
        <div className="relative group">
          <select
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocusedField(fieldKey)}
            onBlur={() => setFocusedField(null)}
            className={`w-full appearance-none rounded-xl border px-5 py-3.5 text-sm font-medium text-gray-900 outline-none cursor-pointer transition-all duration-200 bg-gray-50/30 border-gray-200 shadow-sm ${
              focusedField === fieldKey
                ? "border-[#557A2B] bg-white ring-4 ring-[#557A2B]/5"
                : "hover:border-gray-300"
            }`}
          >
            {options.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 group-focus-within:text-[#557A2B] transition-colors">
            <ChevronDown className="h-4 w-4 stroke-[2.5]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F7F5] px-4 py-8 sm:px-10 sm:py-10">
      <div className="w-full max-w-7xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="mb-2 pl-1">
          <h1 className="text-xl sm:text-2xl font-semibold tracking-[-0.02em] text-[#111827]">
            Diyet Listesi Oluştur
          </h1>
        </div>

        {/* CONTENT */}
        <div className="flex flex-col xl:flex-row gap-6 items-start">

          {/* LEFT PANEL */}
          <div className="w-full xl:w-[340px] bg-white rounded-[24px] border border-gray-100 p-6 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.03)] space-y-5 sticky top-6">

            {/* PATIENT */}
            <div>
              <div className="flex items-center gap-2 mb-3 pl-0.5">
                <UserCheck className="h-4 w-4 text-[#557A2B]" />
                <label className="text-sm font-bold uppercase tracking-wider text-gray-400">
                  Danışan Seç
                </label>
              </div>
              <div className="relative group">
                <select
                  value={selectedPatient}
                  onChange={(e) => setSelectedPatient(e.target.value)}
                  onFocus={() => setFocusedField("patient")}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full appearance-none rounded-xl border px-5 py-3.5 text-sm font-medium text-gray-900 outline-none cursor-pointer transition-all duration-200 bg-gray-50/30 border-gray-200 shadow-sm ${
                    focusedField === "patient"
                      ? "border-[#557A2B] bg-white ring-4 ring-[#557A2B]/5"
                      : "hover:border-gray-300"
                  }`}
                >
                  <option value="">Danışan seçiniz</option>
                  {patients.map((patient) => (
                    <option key={patient.id} value={patient.id}>{patient.fullName}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 group-focus-within:text-[#557A2B] transition-colors">
                  <ChevronDown className="h-4 w-4 stroke-[2.5]" />
                </div>
              </div>
            </div>

            {/* PLAN DURATION */}
            {renderSelect(
              "Plan Süresi",
              <ClipboardList className="h-4 w-4 text-[#557A2B]" />,
              planDuration,
              setPlanDuration,
              ["7", "10"],
              "duration"
            )}

            {/* START DAY */}
            {renderSelect(
              "Başlangıç Günü",
              <ClipboardList className="h-4 w-4 text-[#557A2B]" />,
              startDay,
              (value) => { setStartDay(value); setActiveDay(0); },
              weekDays,
              "startDay"
            )}

            {/* BUTONLAR */}
            <div className="flex flex-col gap-3 pt-2">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full h-12 rounded-xl border-2 border-gray-900 text-gray-900 font-semibold text-sm transition-all duration-300 hover:bg-gray-900 hover:text-white disabled:opacity-50 disabled:pointer-events-none"
              >
                {isSaving ? "Kaydediliyor..." : "💾 Kaydet"}
              </button>

              <button
                onClick={handleSaveAndDesign}
                disabled={isSaving}
                className="w-full h-12 rounded-xl bg-gray-900 text-white font-semibold text-sm shadow-md transition-all duration-300 hover:bg-[#557A2B] hover:shadow-[#557A2B]/20 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none"
              >
                {isSaving ? "Kaydediliyor..." : "🎨 Kaydet ve Tasarım Yap"}
              </button>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex-1 w-full">

            {/* DAY TABS */}
            <div className="flex flex-wrap gap-3 mb-6">
              {generatedDays.map((day) => (
                <button
                  key={day.id}
                  onClick={() => setActiveDay(day.id)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    activeDay === day.id
                      ? "bg-[#557A2B] text-white shadow-md"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {day.id + 1}. Gün • {day.name}
                </button>
              ))}
            </div>

            {/* MEALS */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {meals.map((meal) => (
                <div
                  key={meal.key}
                  className="rounded-[24px] border border-gray-100 bg-white p-6 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.03)] transition-all duration-300 hover:shadow-[0_16px_48px_-12px_rgba(0,0,0,0.05)]"
                >
                  <div className="flex items-center gap-2 mb-4 pl-0.5">
                    <ClipboardList className={`h-4 w-4 transition-colors duration-200 ${focusedField === meal.key ? "text-[#557A2B]" : "text-gray-400"}`} />
                    <h2 className="text-base font-bold text-gray-800 tracking-tight">{meal.label}</h2>
                  </div>
                  <textarea
                    value={mealPlans[activeDay]?.[meal.key] || ""}
                    onChange={(e) => handleMealChange(activeDay, meal.key, e.target.value)}
                    onFocus={() => setFocusedField(meal.key)}
                    onBlur={() => setFocusedField(null)}
                    placeholder={`${meal.label} planını yazın...`}
                    className={`w-full min-h-[150px] resize-none rounded-xl border p-4 text-sm text-gray-900 leading-relaxed outline-none transition-all duration-200 bg-gray-50/30 border-gray-200 placeholder:text-gray-400 placeholder:font-medium font-medium ${
                      focusedField === meal.key
                        ? "border-[#557A2B] bg-white ring-4 ring-[#557A2B]/5 shadow-sm"
                        : "hover:border-gray-300"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DietPlanPage;