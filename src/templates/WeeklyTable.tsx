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

export default function WeeklyTable({ data, tokens }: Props) {
  return (
    <div style={{
      height: "100%",
      minHeight: "100%",
      background: tokens.colors.background,
      color: tokens.colors.text,
      fontFamily: tokens.typography.bodyFont,
      padding: "30px 36px",
      boxSizing: "border-box",
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 24,
        padding: "20px 24px",
        borderRadius: 18,
        background: tokens.colors.surface,
        border: `1px solid ${tokens.colors.secondary}`,
        marginBottom: 20,
      }}>
        <div>
          <p style={{
            margin: "0 0 6px",
            color: tokens.colors.accent,
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}>
            Haftalık Beslenme Programı
          </p>
          <h1 style={{
            margin: 0,
            color: tokens.colors.primary,
            fontSize: 30,
            lineHeight: 1.05,
            fontWeight: 900,
            letterSpacing: 0,
          }}>
            {data.patientFullName}
          </h1>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <GoalIconStrip
            goalKey={tokens.goalKey}
            color={tokens.colors.primary}
            background={tokens.colors.secondary}
          />
          <div style={{
            textAlign: "right",
            color: tokens.colors.text,
            fontSize: 12,
            fontWeight: 700,
            lineHeight: 1.6,
          }}>
            <div>{data.startDay} başlangıç</div>
            <div>{data.dayCount} günlük plan</div>
          </div>
        </div>
      </div>

      <div style={{
        border: `1px solid ${tokens.colors.secondary}`,
        borderRadius: 16,
        overflow: "hidden",
        background: tokens.colors.surface,
      }}>
        <table style={{
          width: "100%",
          borderCollapse: "collapse",
          tableLayout: "fixed",
          fontSize: 11,
        }}>
          <thead>
            <tr style={{
              background: tokens.colors.primary,
              color: "#fff",
            }}>
              <th style={{ width: 112, padding: "12px 10px", textAlign: "left" }}>
                Gün
              </th>
              {mealDefinitions.map(({ shortLabel, Icon }) => (
                <th key={shortLabel} style={{ padding: "12px 10px", textAlign: "left" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <Icon size={14} />
                    {shortLabel}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.days.map((day: any, dayIndex: number) => (
              <tr
                key={day.dayIndex}
                style={{
                  background: dayIndex % 2 === 0 ? "#fff" : tokens.colors.background,
                }}
              >
                <td style={{
                  padding: "12px 10px",
                  borderTop: `1px solid ${tokens.colors.secondary}`,
                  color: tokens.colors.primary,
                  fontWeight: 900,
                  verticalAlign: "top",
                }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <IconBubble
                      Icon={mealDefinitions[0].Icon}
                      color={tokens.colors.primary}
                      background={tokens.colors.secondary}
                      size={14}
                    />
                    {day.dayName}
                  </span>
                </td>
                {mealDefinitions.map(({ key }) => (
                  <td key={key} style={{
                    padding: "12px 10px",
                    borderTop: `1px solid ${tokens.colors.secondary}`,
                    color: tokens.colors.text,
                    verticalAlign: "top",
                    lineHeight: 1.35,
                  }}>
                    <div style={compactMealText}>{getMeal(day, key)}</div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
