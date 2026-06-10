type Props = {
  data: any;
  tokens: any;
};

export default function DailyCards({ data, tokens }: Props) {
  return (
    <div style={{
      padding: 40,
      background: tokens.colors.background,
      fontFamily: tokens.typography.bodyFont,
      minHeight: "100%",
    }}>
      {/* Başlık */}
      <div style={{
        background: tokens.colors.primary,
        color: "#fff",
        padding: "24px 32px",
        borderRadius: 12,
        marginBottom: 32,
      }}>
        <h1 style={{ margin: 0, fontSize: tokens.typography.titleSize }}>
          {data.patientFullName}
        </h1>
        <p style={{ margin: "8px 0 0", opacity: 0.85 }}>
          Başlangıç: {data.startDay} · {data.dayCount} Günlük Plan
        </p>
      </div>

      {/* Günlük kartlar grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 20,
      }}>
        {data.days.map((day: any) => (
          <div key={day.dayIndex} style={{
            background: "#fff",
            border: `1px solid ${tokens.colors.secondary}`,
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}>
            {/* Kart başlığı */}
            <div style={{
              background: tokens.colors.secondary,
              padding: "10px 16px",
              fontWeight: "bold",
              color: tokens.colors.primary,
              fontSize: 15,
            }}>
              📅 {day.dayName}
            </div>

            {/* Öğünler */}
            <div style={{ padding: 16 }}>
              {[
                { emoji: "🌅", label: "Kahvaltı", value: day.meals.breakfast },
                { emoji: "🍎", label: "Ara Öğün 1", value: day.meals.snack1 },
                { emoji: "☀️", label: "Öğle", value: day.meals.lunch },
                { emoji: "🍎", label: "Ara Öğün 2", value: day.meals.snack2 },
                { emoji: "🌙", label: "Akşam", value: day.meals.dinner },
              ].map(({ emoji, label, value }) => (
                <div key={label} style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 8,
                  padding: "6px 0",
                  borderBottom: `1px solid ${tokens.colors.secondary}`,
                }}>
                  <span>{emoji}</span>
                  <div>
                    <div style={{ fontSize: 11, color: tokens.colors.primary, fontWeight: "bold" }}>{label}</div>
                    <div style={{ fontSize: 13, color: tokens.colors.text }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}