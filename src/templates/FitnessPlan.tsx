type Props = {
  data: any;
  tokens: any;
};

export default function FitnessPlan({ data, tokens }: Props) {
  return (
    <div style={{
      padding: 40,
      background: tokens.colors.background,
      fontFamily: tokens.typography.bodyFont,
      minHeight: "100%",
    }}>
      {/* Header */}
      <div style={{
        background: tokens.colors.primary,
        color: tokens.colors.accent,
        padding: "28px 32px",
        borderRadius: 8,
        marginBottom: 32,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <div>
          <p style={{ margin: 0, fontSize: 11, letterSpacing: 3, textTransform: "uppercase", opacity: 0.7, color: "#fff" }}>
            💪 Fitness Beslenme Planı
          </p>
          <h1 style={{ margin: "6px 0 0", fontSize: tokens.typography.titleSize, color: tokens.colors.accent }}>
            {data.patientFullName}
          </h1>
        </div>
        <div style={{ textAlign: "right", color: "#fff", opacity: 0.8, fontSize: 13 }}>
          <div>🗓 {data.startDay}'dan itibaren</div>
          <div>⏱ {data.dayCount} Günlük Program</div>
        </div>
      </div>

      {/* Günler */}
      {data.days.map((day: any) => (
        <div key={day.dayIndex} style={{
          marginBottom: 16,
          border: `2px solid ${tokens.colors.secondary}`,
          borderRadius: 8,
          overflow: "hidden",
        }}>
          <div style={{
            background: tokens.colors.secondary,
            padding: "8px 16px",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}>
            <span style={{
              background: tokens.colors.primary,
              color: tokens.colors.accent,
              borderRadius: "50%",
              width: 28,
              height: 28,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: 13,
            }}>{day.dayIndex}</span>
            <span style={{ fontWeight: "bold", color: tokens.colors.primary }}>{day.dayName}</span>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 0,
          }}>
            {[
              { label: "Kahvaltı", value: day.meals.breakfast, emoji: "🌅" },
              { label: "Ara 1", value: day.meals.snack1, emoji: "🍎" },
              { label: "Öğle", value: day.meals.lunch, emoji: "☀️" },
              { label: "Ara 2", value: day.meals.snack2, emoji: "🍎" },
              { label: "Akşam", value: day.meals.dinner, emoji: "🌙" },
            ].map(({ label, value, emoji }, i) => (
              <div key={label} style={{
                padding: "12px",
                borderRight: i < 4 ? `1px solid ${tokens.colors.secondary}` : "none",
                background: "#fff",
              }}>
                <div style={{ fontSize: 11, color: tokens.colors.primary, fontWeight: "bold", marginBottom: 4 }}>
                  {emoji} {label}
                </div>
                <div style={{ fontSize: 12, color: tokens.colors.text }}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}