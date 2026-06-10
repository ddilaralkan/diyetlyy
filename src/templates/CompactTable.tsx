type Props = {
  data: any;
  tokens: any;
};

export default function CompactTable({ data, tokens }: Props) {
  return (
    <div style={{
      padding: "32px 40px",
      background: tokens.colors.background,
      fontFamily: tokens.typography.bodyFont,
      minHeight: "100%",
    }}>
      {/* Başlık */}
      <h2 style={{ color: tokens.colors.primary, margin: "0 0 4px", fontSize: tokens.typography.titleSize - 8 }}>
        {data.patientFullName} — Diyet Planı
      </h2>
      <p style={{ color: "#888", margin: "0 0 20px", fontSize: 12 }}>
        {data.startDay} · {data.dayCount} gün
      </p>

      {/* Tek tablo */}
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
        <thead>
          <tr style={{ background: tokens.colors.primary, color: "#fff" }}>
            <th style={{ padding: "8px 10px", textAlign: "left" }}>Gün</th>
            <th style={{ padding: "8px 10px", textAlign: "left" }}>🌅 Kahvaltı</th>
            <th style={{ padding: "8px 10px", textAlign: "left" }}>🍎 Ara 1</th>
            <th style={{ padding: "8px 10px", textAlign: "left" }}>☀️ Öğle</th>
            <th style={{ padding: "8px 10px", textAlign: "left" }}>🍎 Ara 2</th>
            <th style={{ padding: "8px 10px", textAlign: "left" }}>🌙 Akşam</th>
          </tr>
        </thead>
        <tbody>
          {data.days.map((day: any, i: number) => (
            <tr key={day.dayIndex} style={{
              background: i % 2 === 0 ? "#fff" : tokens.colors.background,
            }}>
              <td style={{
                padding: "7px 10px",
                fontWeight: "bold",
                color: tokens.colors.primary,
                borderBottom: `1px solid ${tokens.colors.secondary}`,
                whiteSpace: "nowrap",
              }}>{day.dayName}</td>
              {[day.meals.breakfast, day.meals.snack1, day.meals.lunch, day.meals.snack2, day.meals.dinner].map((meal, j) => (
                <td key={j} style={{
                  padding: "7px 10px",
                  color: tokens.colors.text,
                  borderBottom: `1px solid ${tokens.colors.secondary}`,
                  verticalAlign: "top",
                }}>{meal}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}