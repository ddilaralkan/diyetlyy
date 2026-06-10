import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getDietPlansByPatient, getDietPlanById } from "../services/dietPlan.service";
import { getDesignsByPlan } from "../services/dietPlanDesign.service";
import { getDesignOptions } from "../services/designOptionsService";
import { getPatients } from "../services/patient.service";
import TemplateRenderer from "../design-engine/TemplateRenderer";
import type { DietPlan } from "../types/dietPlan";

export const DesignPage = () => {
  const [searchParams] = useSearchParams();
  const [patients, setPatients] = useState<any[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [plans, setPlans] = useState<DietPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<DietPlan | null>(null);
  const [options, setOptions] = useState<any>(null);
  const [gender, setGender] = useState("");
  const [templateFamily, setTemplateFamily] = useState("");
  const [themeKey, setThemeKey] = useState("");
  const [paletteKey, setPaletteKey] = useState("");
  const [goalKey, setGoalKey] = useState("");
  const [appliedConfig, setAppliedConfig] = useState<any>(null);

  const handleSelectPlan = async (planId: string) => {
    if (!planId) return;
    try {
      const [plan, designs] = await Promise.all([
        getDietPlanById(planId),
        getDesignsByPlan(planId),
      ]);
      setSelectedPlan(plan);
      if (designs.length > 0) {
        const d = designs[0];
        setGender(d.gender);
        setTemplateFamily(d.templateFamilyKey);
        setThemeKey(d.themeKey);
        setPaletteKey(d.colorPaletteKey);
        setGoalKey(d.goalKey);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Tek useEffect — sayfa açılınca
  useEffect(() => {
    const patientId = searchParams.get("patientId");
    const planId = searchParams.get("planId");

    getDesignOptions().then(setOptions).catch(console.error);
    getPatients().then(setPatients).catch(console.error);

    if (patientId) {
      setSelectedPatientId(patientId);
      getDietPlansByPatient(patientId)
        .then((fetchedPlans) => {
          setPlans(fetchedPlans);
          if (planId) {
            handleSelectPlan(planId);
          }
        })
        .catch(console.error);
    }
  }, []);

  // Canlı önizleme
  useEffect(() => {
    if (!selectedPlan || !gender || !themeKey || !paletteKey || !templateFamily || !goalKey) return;
    setAppliedConfig({
      template: templateFamily,
      palette: paletteKey,
      theme: themeKey,
      goal: goalKey,
      gender,
    });
  }, [gender, themeKey, paletteKey, templateFamily, goalKey, selectedPlan]);

  // Hasta seçilince planları çek
  useEffect(() => {
    if (!selectedPatientId) return;
    getDietPlansByPatient(selectedPatientId).then(setPlans).catch(console.error);
  }, [selectedPatientId]);

  const handleApply = () => {
    setTimeout(() => { window.print(); }, 500);
  };

  const compatibleThemes = options?.themes.filter((t: any) =>
    !gender || t.compatibleGenders.includes(gender)
  ) ?? [];

  const compatiblePalettes = options?.colorPalettes.filter((p: any) =>
    !themeKey || p.compatibleThemes.includes(themeKey)
  ) ?? [];

  const compatibleTemplates = options?.templateFamilies.filter((t: any) =>
    !themeKey || options.themes
      .find((th: any) => th.key === themeKey)
      ?.compatibleTemplateFamilies.includes(t.key)
  ) ?? [];

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "sans-serif" }}>

      {/* SOL PANEL */}
      <div style={{
        width: 280, minWidth: 280, background: "#f8f9fa",
        borderRight: "1px solid #e0e0e0", padding: 24,
        overflowY: "auto", display: "flex", flexDirection: "column", gap: 16,
      }}>
        <h3 style={{ margin: 0, color: "#1B5E20" }}>⚙️ Tasarım Seçenekleri</h3>

        {/* Hasta seç */}
        <div>
          <label style={{ fontWeight: "bold", fontSize: 13 }}>Hasta</label>
          <select
            style={selectStyle}
            value={selectedPatientId}
            onChange={(e) => {
              setSelectedPatientId(e.target.value);
              setPlans([]);
              setSelectedPlan(null);
              setAppliedConfig(null);
            }}
          >
            <option value="">Hasta seç...</option>
            {patients.map((p) => (
              <option key={p.id} value={p.id}>{p.fullName}</option>
            ))}
          </select>
        </div>

        {/* Plan seç */}
        <div>
          <label style={{ fontWeight: "bold", fontSize: 13 }}>Diyet Planı</label>
          <select style={selectStyle} onChange={(e) => handleSelectPlan(e.target.value)}>
            <option value="">
              {selectedPatientId && plans.length === 0 ? "Yükleniyor..." : "Plan seç..."}
            </option>
            {plans.map((plan) => (
              <option key={plan.id} value={plan.id}>{plan.title}</option>
            ))}
          </select>
        </div>

        {options && (
          <>
            <div>
              <label style={{ fontWeight: "bold", fontSize: 13 }}>Cinsiyet</label>
              <select style={selectStyle} value={gender} onChange={(e) => {
                setGender(e.target.value);
                setThemeKey(""); setPaletteKey(""); setTemplateFamily("");
              }}>
                <option value="">Seç...</option>
                {options.genders.map((g: any) => (
                  <option key={g.key} value={g.key}>{g.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ fontWeight: "bold", fontSize: 13 }}>Tema</label>
              <select style={selectStyle} value={themeKey} onChange={(e) => {
                setThemeKey(e.target.value);
                setPaletteKey(""); setTemplateFamily("");
              }}>
                <option value="">Seç...</option>
                {compatibleThemes.map((t: any) => (
                  <option key={t.key} value={t.key}>{t.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ fontWeight: "bold", fontSize: 13 }}>Renk Paleti</label>
              <select style={selectStyle} value={paletteKey} onChange={(e) => setPaletteKey(e.target.value)}>
                <option value="">Seç...</option>
                {compatiblePalettes.map((p: any) => (
                  <option key={p.key} value={p.key}>{p.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ fontWeight: "bold", fontSize: 13 }}>Şablon</label>
              <select style={selectStyle} value={templateFamily} onChange={(e) => setTemplateFamily(e.target.value)}>
                <option value="">Seç...</option>
                {compatibleTemplates.map((t: any) => (
                  <option key={t.key} value={t.key}>{t.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ fontWeight: "bold", fontSize: 13 }}>Hedef</label>
              <select style={selectStyle} value={goalKey} onChange={(e) => setGoalKey(e.target.value)}>
                <option value="">Seç...</option>
                {options.goals.map((g: any) => (
                  <option key={g.key} value={g.key}>{g.label}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleApply}
              disabled={!selectedPlan || !gender || !themeKey || !paletteKey || !templateFamily || !goalKey}
              style={{
                marginTop: 8, padding: "12px 0", background: "#1B5E20",
                color: "#fff", border: "none", borderRadius: 8,
                fontWeight: "bold", fontSize: 15, cursor: "pointer",
                opacity: (!selectedPlan || !gender || !themeKey || !paletteKey || !templateFamily || !goalKey) ? 0.5 : 1,
              }}
            >
              🖨️ PDF İndir / Yazdır
            </button>
          </>
        )}
      </div>

      {/* SAĞ PANEL */}
      <div style={{ flex: 1, overflowY: "auto", background: "#e0e0e0", padding: 24 }}>
        {!selectedPlan && (
          <div style={{ padding: 40, color: "#999", background: "#fff", borderRadius: 8 }}>
            ← Önce sol panelden hasta ve plan seçin.
          </div>
        )}
        {selectedPlan && !appliedConfig && (
          <div style={{ padding: 40, color: "#999", background: "#fff", borderRadius: 8 }}>
            ← Tasarım seçeneklerini doldurun.
          </div>
        )}
        {selectedPlan && appliedConfig && (
          <div id="print-area" style={{
            width: 794, minHeight: 1123, background: "#fff",
            margin: "0 auto", boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
            borderRadius: 4, overflow: "hidden",
          }}>
            <TemplateRenderer data={selectedPlan.contentJson} config={appliedConfig} />
          </div>
        )}
      </div>
    </div>
  );
};

const selectStyle: React.CSSProperties = {
  width: "100%", padding: "8px", marginTop: 4,
  borderRadius: 6, border: "1px solid #ccc", fontSize: 13,
};