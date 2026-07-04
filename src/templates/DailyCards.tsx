import {
  GoalIconStrip,
  IconBubble,
  compactMealText,
  getGoalMeta,
  getMeal,
  mealDefinitions,
} from "./printHelpers";

type Props = {
  data: any;
  tokens: any;
};

export default function DailyCards({ data, tokens }: Props) {
  const goalMeta = getGoalMeta(tokens.goalKey);

  return (
    <div style={{
      height: "100%",
      minHeight: "100%",
      padding: "26px 34px",
      background: tokens.colors.background,
      fontFamily: tokens.typography.bodyFont,
      color: tokens.colors.text,
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
    }}>
      <header style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        marginBottom: 14,
        flex: "0 0 auto",
      }}>
        <div>
          <p style={{
            margin: "0 0 8px",
            color: tokens.colors.accent,
            fontSize: 9.5,
            fontWeight: 900,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}>
            Günlük Kart Planı
          </p>
          <h1 style={{
            margin: 0,
            color: tokens.colors.primary,
            fontSize: 29,
            lineHeight: 1,
            fontWeight: 900,
            letterSpacing: 0,
          }}>
            {data.patientFullName}
          </h1>
        </div>

        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "9px 11px",
          background: tokens.colors.surface,
          border: `1px solid ${tokens.colors.secondary}`,
          borderRadius: 16,
        }}>
          <GoalIconStrip
            goalKey={tokens.goalKey}
            color={tokens.colors.primary}
            background={tokens.colors.secondary}
            compact
          />
          <div style={{ fontSize: 10.5, lineHeight: 1.45, fontWeight: 800 }}>
            <div>{data.startDay}</div>
            <div>{data.dayCount} gün</div>
          </div>
        </div>
      </header>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gridTemplateRows: "repeat(4, minmax(0, 1fr))",
        gap: 9,
        flex: 1,
        minHeight: 0,
      }}>
        {data.days.slice(0, 7).map((day: any) => (
          <section key={day.dayIndex} style={{
            minWidth: 0,
            minHeight: 0,
            background: tokens.colors.surface,
            border: `1px solid ${tokens.colors.secondary}`,
            borderRadius: 14,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "7px 10px",
              background: tokens.colors.primary,
              color: "#fff",
              flex: "0 0 auto",
            }}>
              <strong style={{ fontSize: 12.5 }}>{day.dayName}</strong>
              <span style={{ fontSize: 9.5, fontWeight: 800, opacity: 0.85 }}>
                {day.dayIndex}. gün
              </span>
            </div>

            <div style={{
              padding: "6px 9px",
              flex: 1,
              minHeight: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}>
              {mealDefinitions.map(({ key, label, Icon }) => (
                <div
                  key={key}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "24px 74px 1fr",
                    alignItems: "start",
                    gap: 6,
                    padding: "3px 0",
                    borderBottom: `1px solid ${tokens.colors.secondary}`,
                  }}
                >
                  <IconBubble
                    Icon={Icon}
                    color={tokens.colors.primary}
                    background={tokens.colors.background}
                    size={10}
                  />
                  <div style={{
                    color: tokens.colors.primary,
                    fontSize: 8.8,
                    fontWeight: 900,
                    lineHeight: 1.2,
                  }}>
                    {label}
                  </div>
                  <div style={{
                    ...compactMealText,
                    color: tokens.colors.text,
                    fontSize: 9.4,
                    lineHeight: 1.2,
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
          background: tokens.colors.surface,
          border: `1px solid ${tokens.colors.secondary}`,
          borderRadius: 14,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}>
          <div style={{
            padding: "8px 10px",
            background: goalMeta.accent,
            color: "#fff",
            flex: "0 0 auto",
          }}>
            <strong style={{ fontSize: 12.5 }}>Takip Notları</strong>
          </div>

          <div style={{
            padding: "10px 12px",
            flex: 1,
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 8,
          }}>
            <div style={{
              color: tokens.colors.primary,
              fontSize: 10,
              fontWeight: 900,
              lineHeight: 1.35,
            }}>
              {goalMeta.label}
            </div>
            {[
              goalMeta.note,
              "Su tüketimi ve porsiyon notları bu alanda takip edilebilir.",
              `${data.dayCount} günlük plan tamamlandığında kısa değerlendirme ekleyin.`,
            ].map((note) => (
              <div key={note} style={{
                padding: "8px 9px",
                borderRadius: 11,
                background: tokens.colors.background,
                color: tokens.colors.text,
                fontSize: 9.8,
                lineHeight: 1.35,
                fontWeight: 700,
              }}>
                {note}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
