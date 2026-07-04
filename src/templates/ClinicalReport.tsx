import {
  GoalIconStrip,
  IconBubble,
  compactMealText,
  getMeal,
  mealDefinitions,
} from "./printHelpers";

type Props = {
  data: any;
  tokens: any;
};

export default function ClinicalReport({ data, tokens }: Props) {
  return (
    <div style={{
      height: "100%",
      minHeight: "100%",
      padding: "28px 34px",
      background: "#F8FAFC",
      fontFamily: tokens.typography.bodyFont,
      color: "#1F2937",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
    }}>
      <header style={{
        display: "grid",
        gridTemplateColumns: "1fr auto",
        gap: 28,
        alignItems: "end",
        paddingBottom: 14,
        borderBottom: `3px solid ${tokens.colors.primary}`,
        marginBottom: 16,
        flex: "0 0 auto",
      }}>
        <div>
          <p style={{
            margin: "0 0 6px",
            color: tokens.colors.primary,
            fontSize: 11,
            fontWeight: 900,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}>
            Klinik Beslenme Raporu
          </p>
          <h1 style={{
            margin: 0,
            fontSize: 34,
            lineHeight: 1.05,
            color: "#111827",
            fontWeight: 900,
            letterSpacing: 0,
          }}>
            {data.patientFullName}
          </h1>
        </div>

        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          color: "#475569",
          fontSize: 12,
          fontWeight: 800,
        }}>
          <GoalIconStrip
            goalKey={tokens.goalKey}
            color={tokens.colors.primary}
            background={tokens.colors.secondary}
          />
          <div style={{ textAlign: "right", lineHeight: 1.5 }}>
            <div>Başlangıç: {data.startDay}</div>
            <div>Süre: {data.dayCount} gün</div>
          </div>
        </div>
      </header>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
        gridTemplateRows: "repeat(2, minmax(0, 1fr))",
        gap: 14,
        flex: 1,
        minHeight: 0,
      }}>
        {data.days.map((day: any) => (
          <section key={day.dayIndex} style={{
            minWidth: 0,
            minHeight: 0,
            background: "#fff",
            border: "1px solid #E5E7EB",
            borderRadius: 18,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}>
            <div style={{
              padding: "12px 14px",
              borderBottom: "1px solid #E5E7EB",
              background: "#fff",
              flex: "0 0 auto",
            }}>
              <div style={{ color: tokens.colors.primary, fontSize: 11, fontWeight: 900 }}>
                {day.dayIndex}. gün
              </div>
              <div style={{ color: "#111827", fontSize: 18, fontWeight: 900 }}>
                {day.dayName}
              </div>
            </div>

            <div style={{
              padding: "11px 14px",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: 0,
            }}>
              {mealDefinitions.map(({ key, shortLabel, Icon }) => (
                <div key={key} style={{
                  display: "grid",
                  gridTemplateColumns: "30px 58px 1fr",
                  gap: 8,
                  alignItems: "start",
                }}>
                  <IconBubble
                    Icon={Icon}
                    color={tokens.colors.primary}
                    background={tokens.colors.secondary}
                    size={12}
                  />
                  <div style={{
                    color: tokens.colors.primary,
                    fontSize: 10,
                    fontWeight: 900,
                    textTransform: "uppercase",
                    letterSpacing: 0.2,
                    lineHeight: 1.2,
                  }}>
                    {shortLabel}
                  </div>
                  <div style={{
                    ...compactMealText,
                    color: "#334155",
                    fontSize: 11.5,
                    lineHeight: 1.3,
                  }}>
                    {getMeal(day, key)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        <section style={{
          minWidth: 0,
          minHeight: 0,
          background: "#FFFFFF",
          border: `1px solid ${tokens.colors.secondary}`,
          borderRadius: 18,
          padding: 18,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}>
          <div>
            <p style={{
              margin: "0 0 8px",
              color: tokens.colors.primary,
              fontSize: 11,
              fontWeight: 900,
              letterSpacing: 1.6,
              textTransform: "uppercase",
            }}>
              Klinik Özet
            </p>
            <h2 style={{
              margin: 0,
              color: "#111827",
              fontSize: 22,
              lineHeight: 1.1,
              fontWeight: 900,
            }}>
              Takip Notları
            </h2>
          </div>

          <div style={{
            display: "grid",
            gap: 10,
            color: "#475569",
            fontSize: 13,
            lineHeight: 1.45,
            fontWeight: 700,
          }}>
            <div style={{ padding: 12, borderRadius: 14, background: "#F8FAFC" }}>
              Öğün saatleri ve porsiyon uyumu takip edilmelidir.
            </div>
            <div style={{ padding: 12, borderRadius: 14, background: "#F8FAFC" }}>
              Su tüketimi, hareket ve klinik belirtiler not alınmalıdır.
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
