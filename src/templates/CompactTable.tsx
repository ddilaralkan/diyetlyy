import {
  GoalIconStrip,
  compactMealText,
  getMeal,
  mealDefinitions,
} from "./printHelpers";

type Props = {
  data: any;
  tokens: any;
};

export default function CompactTable({ data, tokens }: Props) {
  return (
    <div style={{
      height: "100%",
      minHeight: "100%",
      padding: "24px 30px",
      background: tokens.colors.background,
      fontFamily: tokens.typography.bodyFont,
      color: tokens.colors.text,
      boxSizing: "border-box",
      display: "grid",
      gridTemplateRows: "auto 1fr",
      gap: 14,
    }}>
      <header style={{
        display: "grid",
        gridTemplateColumns: "1fr auto",
        alignItems: "end",
        gap: 18,
        padding: "16px 18px",
        borderRadius: 18,
        background: tokens.colors.surface,
        border: `1px solid ${tokens.colors.secondary}`,
      }}>
        <div>
          <p style={{
            margin: "0 0 5px",
            color: tokens.colors.accent,
            fontSize: 9.5,
            fontWeight: 900,
            letterSpacing: 2.4,
            textTransform: "uppercase",
          }}>
            Kompakt Yatay Plan
          </p>
          <h1 style={{
            color: tokens.colors.primary,
            margin: 0,
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
          gap: 14,
        }}>
          <GoalIconStrip
            goalKey={tokens.goalKey}
            color={tokens.colors.primary}
            background={tokens.colors.secondary}
            compact
          />
          <div style={{
            textAlign: "right",
            fontSize: 11,
            fontWeight: 800,
            lineHeight: 1.5,
          }}>
            <div>{data.startDay}</div>
            <div>{data.dayCount} gün</div>
          </div>
        </div>
      </header>

      <div style={{
        minHeight: 0,
        border: `1px solid ${tokens.colors.secondary}`,
        borderRadius: 16,
        overflow: "hidden",
        background: tokens.colors.surface,
        display: "grid",
        gridTemplateRows: "auto repeat(7, minmax(0, 1fr))",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "126px repeat(5, minmax(0, 1fr))",
          background: tokens.colors.primary,
          color: "#FFFFFF",
        }}>
          <div style={headerCellStyle}>Gün</div>
          {mealDefinitions.map(({ shortLabel, Icon }) => (
            <div key={shortLabel} style={headerCellStyle}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <Icon size={13} />
                {shortLabel}
              </span>
            </div>
          ))}
        </div>

        {data.days.slice(0, 7).map((day: any, index: number) => (
          <section
            key={day.dayIndex}
            style={{
              minHeight: 0,
              display: "grid",
              gridTemplateColumns: "126px repeat(5, minmax(0, 1fr))",
              background: index % 2 === 0 ? tokens.colors.surface : tokens.colors.background,
              borderTop: `1px solid ${tokens.colors.secondary}`,
            }}
          >
            <div style={{
              minWidth: 0,
              padding: "9px 11px",
              color: tokens.colors.primary,
              borderRight: `1px solid ${tokens.colors.secondary}`,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 3,
            }}>
              <span style={{
                fontSize: 9,
                fontWeight: 900,
                letterSpacing: 1.4,
                textTransform: "uppercase",
                color: tokens.colors.accent,
              }}>
                {day.dayIndex}. gün
              </span>
              <strong style={{
                fontSize: 14,
                lineHeight: 1.05,
              }}>
                {day.dayName}
              </strong>
            </div>

            {mealDefinitions.map(({ key }) => (
              <div key={key} style={{
                minWidth: 0,
                padding: "8px 10px",
                color: tokens.colors.text,
                borderRight: `1px solid ${tokens.colors.secondary}`,
                display: "flex",
                alignItems: "center",
                lineHeight: 1.25,
              }}>
                <div style={{
                  ...compactMealText,
                  fontSize: 10.1,
                  fontWeight: 700,
                }}>
                  {getMeal(day, key)}
                </div>
              </div>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}

const headerCellStyle = {
  padding: "10px 11px",
  fontSize: 10.2,
  fontWeight: 900,
  letterSpacing: 0.4,
  textTransform: "uppercase" as const,
  borderRight: "1px solid rgba(255,255,255,0.20)",
};
