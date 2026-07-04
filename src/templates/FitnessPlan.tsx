import {
  GoalIconStrip,
  compactMealText,
  getGoalMeta,
  getMeal,
  mealDefinitions,
} from "./printHelpers";

type Props = {
  data: any;
  tokens: any;
};

export default function FitnessPlan({ data, tokens }: Props) {
  const goalMeta = getGoalMeta(tokens.goalKey);
  const accent = tokens.colors.accent || goalMeta.accent;
  const accentSoft = `${accent}24`;

  return (
    <div style={{
      height: "100%",
      minHeight: "100%",
      background: "#07111F",
      color: "#E5E7EB",
      fontFamily: "Plus Jakarta Sans, Arial, sans-serif",
      padding: "26px 30px",
      boxSizing: "border-box",
      display: "grid",
      gridTemplateRows: "auto auto 1fr",
      gap: 14,
      overflow: "hidden",
    }}>
      <header style={{
        display: "grid",
        gridTemplateColumns: "1fr auto",
        alignItems: "end",
        gap: 24,
        padding: "18px 20px",
        borderRadius: 24,
        background: `linear-gradient(135deg, #0B1727 0%, #111827 58%, ${accentSoft} 100%)`,
        border: "1px solid rgba(255,255,255,0.10)",
      }}>
        <div>
          <p style={{
            margin: "0 0 8px",
            color: accent,
            fontSize: 10.5,
            fontWeight: 900,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}>
            Performans Beslenme Panosu
          </p>
          <h1 style={{
            margin: 0,
            color: "#FFFFFF",
            fontSize: 33,
            lineHeight: 1,
            fontWeight: 900,
            letterSpacing: 0,
          }}>
            {data.patientFullName}
          </h1>
        </div>

        <div style={{
          display: "grid",
          justifyItems: "end",
          gap: 8,
        }}>
          <GoalIconStrip
            goalKey={tokens.goalKey}
            color={accent}
            background="rgba(255,255,255,0.10)"
            compact
          />
          <div style={{
            color: "#CBD5E1",
            fontSize: 12,
            lineHeight: 1.45,
            fontWeight: 800,
            textAlign: "right",
          }}>
            <div>Başlangıç: {data.startDay}</div>
            <div>Süre: {data.dayCount} gün</div>
          </div>
        </div>
      </header>

      <section style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: 10,
      }}>
        {[
          ["Hedef", goalMeta.label],
          ["Odak", goalMeta.note],
          ["Takip", "Su, protein ve öğün zamanı"],
        ].map(([label, value]) => (
          <div key={label} style={{
            minWidth: 0,
            padding: "10px 13px",
            borderRadius: 18,
            background: "#0F1B2D",
            border: "1px solid rgba(255,255,255,0.10)",
          }}>
            <div style={{
              color: accent,
              fontSize: 9.2,
              fontWeight: 900,
              letterSpacing: 1.6,
              textTransform: "uppercase",
              marginBottom: 5,
            }}>
              {label}
            </div>
            <div style={{
              color: "#F8FAFC",
              fontSize: 12,
              lineHeight: 1.32,
              fontWeight: 800,
            }}>
              {value}
            </div>
          </div>
        ))}
      </section>

      <div style={{
        minHeight: 0,
        display: "grid",
        gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
        gap: 9,
      }}>
        {data.days.slice(0, 7).map((day: any) => (
          <section key={day.dayIndex} style={{
            minWidth: 0,
            minHeight: 0,
            borderRadius: 20,
            overflow: "hidden",
            background: "#0F1B2D",
            color: "#E5E7EB",
            border: "1px solid rgba(255,255,255,0.11)",
            display: "grid",
            gridTemplateRows: "auto 1fr",
            boxShadow: "0 18px 34px rgba(0,0,0,0.18)",
          }}>
            <div style={{
              padding: "12px 11px",
              background: `linear-gradient(135deg, ${accentSoft}, rgba(255,255,255,0.06))`,
              borderBottom: `1px solid ${accentSoft}`,
            }}>
              <div style={{
                width: 28,
                height: 28,
                borderRadius: 999,
                background: accent,
                color: "#07111F",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 900,
                marginBottom: 8,
              }}>
                {day.dayIndex}
              </div>
              <div style={{
                color: "#FFFFFF",
                fontSize: 15,
                lineHeight: 1,
                fontWeight: 900,
              }}>
                {day.dayName}
              </div>
            </div>

            <div style={{
              minHeight: 0,
              padding: "8px 9px 10px",
              display: "grid",
              gridTemplateRows: "repeat(5, minmax(0, 1fr))",
              gap: 6,
            }}>
              {mealDefinitions.map(({ key, shortLabel, Icon }) => (
                <div
                  key={key}
                  style={{
                    minWidth: 0,
                    padding: "6px 7px",
                    borderRadius: 12,
                    background: "rgba(255,255,255,0.055)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "grid",
                    gridTemplateRows: "auto 1fr",
                    gap: 4,
                  }}
                >
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    color: accent,
                    fontSize: 9.2,
                    fontWeight: 900,
                    lineHeight: 1,
                  }}>
                    <Icon size={11} strokeWidth={2.6} />
                    {shortLabel}
                  </div>
                  <div style={{
                    ...compactMealText,
                    color: "#E2E8F0",
                    fontSize: 9.2,
                    lineHeight: 1.22,
                    fontWeight: 750,
                  }}>
                    {getMeal(day, key)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
