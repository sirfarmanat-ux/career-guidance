type TableData = {
  headers: string[];
  rows: string[][];
  caption?: string;
};

export default function ChatTable({ data }: { data: TableData }) {
  return (
    <div style={{ width: "100%", overflowX: "auto", margin: "4px 0" }}>
      {data.caption && (
        <p style={{
          fontSize: 11,
          color: "#64748b",
          marginBottom: 6,
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "0.04em",
        }}>
          {data.caption}
        </p>
      )}
      <table style={{
        width: "100%",
        borderCollapse: "collapse",
        fontSize: 12,
        tableLayout: "auto",
      }}>
        <thead>
          <tr>
            {data.headers.map((h, i) => (
              <th key={i} style={{
                background: "#0f172a",
                color: "#f1f5f9",
                padding: "7px 10px",
                textAlign: "left",
                fontWeight: 600,
                fontSize: 11,
                whiteSpace: "nowrap",
                borderRight: i < data.headers.length - 1 ? "1px solid #1e293b" : "none",
              }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, ri) => (
            <tr key={ri} style={{ background: ri % 2 === 0 ? "#f8fafc" : "#ffffff" }}>
              {row.map((cell, ci) => (
                <td key={ci} style={{
                  padding: "6px 10px",
                  color: ci === 0 ? "#0f172a" : "#334155",
                  fontWeight: ci === 0 ? 600 : 400,
                  borderBottom: "1px solid #e2e8f0",
                  borderRight: ci < row.length - 1 ? "1px solid #e2e8f0" : "none",
                  whiteSpace: "nowrap",
                }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}