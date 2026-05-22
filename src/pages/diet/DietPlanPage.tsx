"use client";

import { useEffect, useState } from "react";

import { getPatients } from "../../services/patient.service";
import { createDietPlan } from "../../services/dietPlan.service";
import { createDietPlanDesign } from "../../services/dietPlanDesign.service";

import {
  ClipboardList,
  UserCheck,
  ChevronDown,
  Palette,
  LayoutTemplate,
  Target,
  Sparkles,
} from "lucide-react";

const meals = [
  {
    key: "breakfast",
    label: "Kahvaltı",
  },

  {
    key: "snack1",
    label: "Ara Öğün 1",
  },

  {
    key: "lunch",
    label: "Öğle Yemeği",
  },

  {
    key: "snack2",
    label: "Ara Öğün 2",
  },

  {
    key: "dinner",
    label: "Akşam Yemeği",
  },
];

const templates = [
  "Haftalık Tablo",
  "Günlük Kartlar",
  "Klinik Rapor",
  "Fitness Planı",
  "Kompakt Tablo",
];

const themes = [
  "Minimal Professional",
  "Wellness Pastel",
  "Dark Fitness",
  "Clinical Clean",
  "Luxury",
];

const palettes = [
  "Dark Green",
  "Medical Blue",
  "Soft Pink",
  "Lavender",
  "Peach",
  "Black Gold",
];

const goals = [
  "Kilo Kaybı",
  "Kilo Alma",
  "Kas Yapma",
  "Sağlıklı Yaşam",
  "Diyabet",
  "Spor Performansı",
];

const weekDays = [
  "Pazartesi",
  "Salı",
  "Çarşamba",
  "Perşembe",
  "Cuma",
  "Cumartesi",
  "Pazar",
];

const templateKeyMap: Record<string, string> = {
  "Haftalık Tablo": "weekly_table",
  "Günlük Kartlar": "daily_cards",
  "Klinik Rapor": "clinical_report",
  "Fitness Planı": "fitness_plan",
  "Kompakt Tablo": "compact_table",
};

const themeKeyMap: Record<string, string> = {
  "Minimal Professional": "minimal_professional",
  "Wellness Pastel": "wellness_pastel",
  "Dark Fitness": "dark_fitness",
  "Clinical Clean": "clinical_clean",
  Luxury: "luxury",
};

const paletteKeyMap: Record<string, string> = {
  "Dark Green": "dark_green",
  "Medical Blue": "medical_blue",
  "Soft Pink": "soft_pink",
  Lavender: "lavender",
  Peach: "peach",
  "Black Gold": "black_gold",
};

const goalKeyMap: Record<string, string> = {
  "Kilo Kaybı": "weight_loss",
  "Kilo Alma": "weight_gain",
  "Kas Yapma": "muscle_gain",
  "Sağlıklı Yaşam": "healthy_lifestyle",
  Diyabet: "diabetes",
  "Spor Performansı": "sports_performance",
};

function DietPlanPage() {
  const [patients, setPatients] =
      useState<any[]>([]);

  const [selectedPatient, setSelectedPatient] =
      useState("");

  const [selectedTemplate, setSelectedTemplate] =
      useState("Klinik Rapor");

  const [selectedTheme, setSelectedTheme] =
      useState("Minimal Professional");

  const [selectedPalette, setSelectedPalette] =
      useState("Dark Green");

  const [selectedGoal, setSelectedGoal] =
      useState("Kilo Kaybı");

  const [planDuration, setPlanDuration] =
      useState("7");

  const [startDay, setStartDay] =
      useState("Pazartesi");

  const [activeDay, setActiveDay] =
      useState(0);

  const [mealPlans, setMealPlans] =
      useState<
          Record<number, Record<string, string>>
      >({});

  const [focusedField, setFocusedField] =
      useState<string | null>(null);

  const [isSaving, setIsSaving] =
      useState(false);

  async function fetchPatients() {
    try {
      const data =
          await getPatients();

      setPatients(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchPatients();
  }, []);

  const generatedDays = Array.from(
      { length: Number(planDuration) },
      (_, index) => {
        const startIndex =
            weekDays.indexOf(startDay);

        return {
          id: index,

          name:
              weekDays[
              (startIndex + index) %
              weekDays.length
                  ],
        };
      }
  );

  function handleMealChange(
      dayId: number,
      mealKey: string,
      value: string
  ) {
    setMealPlans((prev) => ({
      ...prev,

      [dayId]: {
        ...prev[dayId],

        [mealKey]: value,
      },
    }));
  }

  async function handleGenerate() {
    try {
      if (!selectedPatient) {
        alert("Lütfen bir danışan seçiniz.");
        return;
      }

      setIsSaving(true);

      const selectedPatientData =
          patients.find(
              (patient) =>
                  patient.id === selectedPatient
          );

      const templateFamilyKey =
          templateKeyMap[selectedTemplate];

      const themeKey =
          themeKeyMap[selectedTheme];

      const colorPaletteKey =
          paletteKeyMap[selectedPalette];

      const goalKey =
          goalKeyMap[selectedGoal];

      if (
          !templateFamilyKey ||
          !themeKey ||
          !colorPaletteKey ||
          !goalKey
      ) {
        alert("Seçilen stil parametreleri hatalı.");
        return;
      }

      let gender = "general";

      if (selectedPatientData?.gender === "female") {
        gender = "female";
      }

      if (selectedPatientData?.gender === "male") {
        gender = "male";
      }

      if (selectedPatientData?.gender === "Kadın") {
        gender = "female";
      }

      if (selectedPatientData?.gender === "Erkek") {
        gender = "male";
      }

      const dietContentJson = {
        patientId: selectedPatient,

        patientFullName:
            selectedPatientData?.fullName || "",

        startDay,

        dayCount: Number(planDuration),

        days: generatedDays.map((day) => ({
          dayIndex: day.id + 1,

          dayName: day.name,

          meals: {
            breakfast:
                mealPlans[day.id]?.breakfast || "",

            snack1:
                mealPlans[day.id]?.snack1 || "",

            lunch:
                mealPlans[day.id]?.lunch || "",

            snack2:
                mealPlans[day.id]?.snack2 || "",

            dinner:
                mealPlans[day.id]?.dinner || "",
          },
        })),
      };

      const dietPlanResponse =
          await createDietPlan(
              selectedPatient,
              {
                title: `${
                    selectedPatientData?.fullName ||
                    "Danışan"
                } Diyet Listesi`,

                dayCount: Number(planDuration),

                contentJson: dietContentJson,
              }
          );

      await createDietPlanDesign(
          dietPlanResponse.id,
          {
            gender,

            templateFamilyKey,

            themeKey,

            colorPaletteKey,

            goalKey,

            designTokensJson: {},
          }
      );

      alert(
          "Diyet listesi ve stil seçimleri veritabanına kaydedildi."
      );

      console.log(
          "Kaydedilen diyet JSON:",
          dietContentJson
      );

      console.log(
          "Kaydedilen stil parametreleri:",
          {
            gender,
            templateFamilyKey,
            themeKey,
            colorPaletteKey,
            goalKey,
            designTokensJson: {},
          }
      );
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

            <label
                className="
              text-sm
              font-bold
              uppercase
              tracking-wider
              text-gray-400
            "
            >
              {label}
            </label>
          </div>

          <div className="relative group">
            <select
                value={value}
                onChange={(e) =>
                    setValue(e.target.value)
                }
                onFocus={() =>
                    setFocusedField(fieldKey)
                }
                onBlur={() =>
                    setFocusedField(null)
                }
                className={`
              w-full
              appearance-none
              rounded-xl
              border
              px-5
              py-3.5
              text-sm
              font-medium
              text-gray-900
              outline-none
              cursor-pointer
              transition-all
              duration-200
              bg-gray-50/30
              border-gray-200
              shadow-sm
              ${
                    focusedField === fieldKey
                        ? "border-[#557A2B] bg-white ring-4 ring-[#557A2B]/5"
                        : "hover:border-gray-300"
                }
            `}
            >
              {options.map((option) => (
                  <option
                      key={option}
                      value={option}
                  >
                    {option}
                  </option>
              ))}
            </select>

            <div
                className="
              pointer-events-none
              absolute
              inset-y-0
              right-0
              flex
              items-center
              pr-4
              text-gray-400
              group-focus-within:text-[#557A2B]
              transition-colors
            "
            >
              <ChevronDown
                  className="h-4 w-4 stroke-[2.5]"
              />
            </div>
          </div>
        </div>
    );
  }

  return (
      <div
          className="
        min-h-screen
        bg-[#F7F7F5]
        px-4
        py-8
        sm:px-10
        sm:py-10
      "
      >
        <div
            className="
          w-full
          max-w-7xl
          mx-auto
          space-y-6
        "
        >
          {/* HEADER */}
          <div className="mb-2 pl-1">
            <h1
                className="
              text-xl
            sm:text-2xl
              font-semibold
              tracking-[-0.02em]
              text-[#111827]
            "
            >
              Diyet Listesi Oluştur
            </h1>
          </div>

          {/* CONTENT */}
          <div className="flex flex-col xl:flex-row gap-6 items-start">
            {/* LEFT PANEL */}
            <div
                className="
              w-full
              xl:w-[340px]
              bg-white
              rounded-[24px]
              border
              border-gray-100
              p-6
              shadow-[0_12px_40px_-12px_rgba(0,0,0,0.03)]
              space-y-5
              sticky
              top-6
            "
            >
              {/* PATIENT */}
              <div>
                <div className="flex items-center gap-2 mb-3 pl-0.5">
                  <UserCheck
                      className="
                    h-4
                    w-4
                    text-[#557A2B]
                  "
                  />

                  <label
                      className="
                    text-sm
                    font-bold
                    uppercase
                    tracking-wider
                    text-gray-400
                  "
                  >
                    Danışan Seç
                  </label>
                </div>

                <div className="relative group">
                  <select
                      value={selectedPatient}
                      onChange={(e) =>
                          setSelectedPatient(
                              e.target.value
                          )
                      }
                      onFocus={() =>
                          setFocusedField("patient")
                      }
                      onBlur={() =>
                          setFocusedField(null)
                      }
                      className={`
                    w-full
                    appearance-none
                    rounded-xl
                    border
                    px-5
                    py-3.5
                    text-sm
                    font-medium
                    text-gray-900
                    outline-none
                    cursor-pointer
                    transition-all
                    duration-200
                    bg-gray-50/30
                    border-gray-200
                    shadow-sm
                    ${
                          focusedField === "patient"
                              ? "border-[#557A2B] bg-white ring-4 ring-[#557A2B]/5"
                              : "hover:border-gray-300"
                      }
                  `}
                  >
                    <option value="">
                      Danışan seçiniz
                    </option>

                    {patients.map((patient) => (
                        <option
                            key={patient.id}
                            value={patient.id}
                        >
                          {patient.fullName}
                        </option>
                    ))}
                  </select>

                  <div
                      className="
                    pointer-events-none
                    absolute
                    inset-y-0
                    right-0
                    flex
                    items-center
                    pr-4
                    text-gray-400
                    group-focus-within:text-[#557A2B]
                    transition-colors
                  "
                  >
                    <ChevronDown
                        className="
                      h-4
                      w-4
                      stroke-[2.5]
                    "
                    />
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
                  (value) => {
                    setStartDay(value);

                    setActiveDay(0);
                  },
                  weekDays,
                  "startDay"
              )}

              {/* TEMPLATE */}
              {renderSelect(
                  "Template",
                  <LayoutTemplate className="h-4 w-4 text-[#557A2B]" />,
                  selectedTemplate,
                  setSelectedTemplate,
                  templates,
                  "template"
              )}

              {/* THEME */}
              {renderSelect(
                  "Theme",
                  <Sparkles className="h-4 w-4 text-[#557A2B]" />,
                  selectedTheme,
                  setSelectedTheme,
                  themes,
                  "theme"
              )}

              {/* PALETTE */}
              {renderSelect(
                  "Palette",
                  <Palette className="h-4 w-4 text-[#557A2B]" />,
                  selectedPalette,
                  setSelectedPalette,
                  palettes,
                  "palette"
              )}

              {/* GOAL */}
              {renderSelect(
                  "Goal",
                  <Target className="h-4 w-4 text-[#557A2B]" />,
                  selectedGoal,
                  setSelectedGoal,
                  goals,
                  "goal"
              )}
            </div>

            {/* RIGHT SIDE */}
            <div className="flex-1 w-full">
              {/* DAY TABS */}
              <div className="flex flex-wrap gap-3 mb-6">
                {generatedDays.map((day) => (
                    <button
                        key={day.id}
                        onClick={() =>
                            setActiveDay(day.id)
                        }
                        className={`
                    px-5
                    py-2.5
                    rounded-xl
                    text-sm
                    font-semibold
                    transition-all
                    duration-200
                    ${
                            activeDay === day.id
                                ? `
                          bg-[#557A2B]
                          text-white
                          shadow-md
                        `
                                : `
                          bg-white
                          text-gray-600
                          border border-gray-200
                          hover:border-gray-300
                        `
                        }
                  `}
                    >
                      {indexLabel(day.id)}. Gün •{" "}
                      {day.name}
                    </button>
                ))}
              </div>

              {/* MEALS */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {meals.map((meal) => (
                    <div
                        key={meal.key}
                        className="
                    rounded-[24px]
                    border
                    border-gray-100
                    bg-white
                    p-6
                    shadow-[0_12px_40px_-12px_rgba(0,0,0,0.03)]
                    transition-all
                    duration-300
                    hover:shadow-[0_16px_48px_-12px_rgba(0,0,0,0.05)]
                  "
                    >
                      <div className="flex items-center gap-2 mb-4 pl-0.5">
                        <ClipboardList
                            className={`
                        h-4
                        w-4
                        transition-colors
                        duration-200
                        ${
                                focusedField === meal.key
                                    ? "text-[#557A2B]"
                                    : "text-gray-400"
                            }
                      `}
                        />

                        <h2
                            className="
                        text-base
                        font-bold
                        text-gray-800
                        tracking-tight
                      "
                        >
                          {meal.label}
                        </h2>
                      </div>

                      <textarea
                          value={
                              mealPlans[activeDay]?.[
                                  meal.key
                                  ] || ""
                          }
                          onChange={(e) =>
                              handleMealChange(
                                  activeDay,
                                  meal.key,
                                  e.target.value
                              )
                          }
                          onFocus={() =>
                              setFocusedField(meal.key)
                          }
                          onBlur={() =>
                              setFocusedField(null)
                          }
                          placeholder={`${meal.label} planını yazın...`}
                          className={`
                      w-full
                      min-h-[150px]
                      resize-none
                      rounded-xl
                      border
                      p-4
                      text-sm
                      text-gray-900
                      leading-relaxed
                      outline-none
                      transition-all
                      duration-200
                      bg-gray-50/30
                      border-gray-200
                      placeholder:text-gray-400
                      placeholder:font-medium
                      font-medium
                      ${
                              focusedField === meal.key
                                  ? "border-[#557A2B] bg-white ring-4 ring-[#557A2B]/5 shadow-sm"
                                  : "hover:border-gray-300"
                          }
                    `}
                      />
                    </div>
                ))}
              </div>

              {/* BUTTON */}
              <div className="pt-6 flex justify-end">
                <button
                    onClick={handleGenerate}
                    disabled={isSaving}
                    className="
                  w-full
                  sm:w-auto
                  min-w-[160px]
                  h-12
                  rounded-xl
                  bg-gray-900
                  text-white
                  font-semibold
                  text-sm
                  shadow-md
                  shadow-gray-950/10
                  transition-all
                  duration-300
                  hover:bg-[#557A2B]
                  hover:shadow-[#557A2B]/20
                  hover:-translate-y-0.5
                  active:translate-y-0
                  disabled:opacity-50
                  disabled:pointer-events-none
                "
                >
                  {isSaving
                      ? "Kaydediliyor..."
                      : "Oluştur"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

function indexLabel(index: number) {
  return index + 1;
}

export default DietPlanPage;