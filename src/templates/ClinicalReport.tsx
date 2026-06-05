type Props = {
  data: any;
  tokens: any;
};

export default function ClinicalReport({ data, tokens }: Props) {
  return (
    <div style={{
      padding: "40px 48px",
      background: tokens.colors.background,
      fontFamily: tokens.typography.bodyFont,
      minHeight: "100%",
      color: tokens.colors.text,
    }}>
      {/* Üst bilgi */}
      <div style={{
        borderBottom: `3px solid ${tokens.colors.primary}`,
        paddingBottom: 16,
        marginBottom: 32,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
      }}>
        <div>
          <p style={{ margin: 0, fontSize: 11, color: tokens.colors.primary, letterSpacing: 2, textTransform: "uppercase" }}>
            Klinik Diyet Raporu
          </p>
          <h1 style={{ margin: "4px 0 0", fontSize: tokens.typography.titleSize, color: tokens.colors.primary }}>
            {data.patientFullName}
          </h1>
        </div>
        <div style={{ textAlign: "right", fontSize: 12, color: "#888" }}>
          <div>Başlangıç: {data.startDay}</div>
          <div>Süre: {data.dayCount} gün</div>
        </div>
      </div>

      {/* Günler */}
      {data.days.map((day: any) => (
        <div key={day.dayIndex} style={{ marginBottom: 28 }}>
          <h3 style={{
            color: tokens.colors.primary,
            borderLeft: `4px solid ${tokens.colors.primary}`,
            paddingLeft: 12,
            margin: "0 0 12px",
          }}>
            {day.dayName}
          </h3>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: tokens.colors.secondary }}>
                {["Kahvaltı", "Ara Öğün 1", "Öğle", "Ara Öğün 2", "Akşam"].map((h) => (
                  <th key={h} style={{
                    padding: "8px 12px",
                    textAlign: "left",
                    color: tokens.colors.primary,
                    fontWeight: "bold",
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {[day.meals.breakfast, day.meals.snack1, day.meals.lunch, day.meals.snack2, day.meals.dinner].map((meal, i) => (
                  <td key={i} style={{
                    padding: "10px 12px",
                    borderBottom: `1px solid ${tokens.colors.secondary}`,
                    verticalAlign: "top",
                  }}>{meal}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}