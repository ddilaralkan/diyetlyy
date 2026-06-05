type Props = {
  data: any;
  tokens: any;
};

export default function WeeklyTable({ data, tokens }: Props) {
  return (
    <div style={{
      padding: 40,
      background: tokens.colors.background,
      color: tokens.colors.text,
      fontFamily: tokens.typography.bodyFont,
      minHeight: "100%",
    }}>
      {/* Başlık */}
      <h1 style={{ color: tokens.colors.primary, marginBottom: 4 }}>
        {data.patientFullName} — Diyet Planı
      </h1>
      <p style={{ color: tokens.colors.text, marginBottom: 24 }}>
        Başlangıç: {data.startDay} | {data.dayCount} gün
      </p>

      {/* Günler */}
      {data.days.map((day: any) => (
        <div key={day.dayIndex} style={{
          border: `2px solid ${tokens.colors.secondary}`,
          borderRadius: 8,
          marginBottom: 16,
          overflow: "hidden",
        }}>
          {/* Gün başlığı */}
          <div style={{
            background: tokens.colors.primary,
            color: "#fff",
            padding: "8px 16px",
            fontWeight: "bold",
            fontSize: 16,
          }}>
            📅 {day.dayName}
          </div>

          {/* Öğünler */}
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              {[
                ["🌅 Kahvaltı", day.meals.breakfast],
                ["🍎 Ara Öğün 1", day.meals.snack1],
                ["☀️ Öğle", day.meals.lunch],
                ["🍎 Ara Öğün 2", day.meals.snack2],
                ["🌙 Akşam", day.meals.dinner],
              ].map(([label, value]) => (
                <tr key={label} style={{ borderBottom: `1px solid ${tokens.colors.secondary}` }}>
                  <td style={{
                    padding: "10px 16px",
                    fontWeight: "bold",
                    width: 140,
                    color: tokens.colors.primary,
                  }}>
                    {label}
                  </td>
                  <td style={{ padding: "10px 16px", color: tokens.colors.text }}>
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}