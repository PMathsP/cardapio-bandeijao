import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function GraficoCalorias({ almoco, jantar }) {
  const barraRef = useRef(null);
  const barraChart = useRef(null);

  useEffect(() => {
    // Destruir gráfico anterior (evita erro do Canvas duplicado)
    if (barraChart.current) barraChart.current.destroy();

    barraChart.current = new Chart(barraRef.current, {
      type: "bar",
      data: {
        labels: almoco.map((d) => d.dia),
        datasets: [
          {
            label: "Calorias (Almoço)",
            data: almoco.map((d) => d.calorias),
          },
          {
            label: "Calorias (Jantar)",
            data: jantar.map((d) => d.calorias),
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Comparativo de Calorias por Dia da Semana",
          },
        },
      },
    });

    // Limpeza ao desmontar componente
    return () => {
      if (barraChart.current) barraChart.current.destroy();
    };
  }, [almoco, jantar]);

  return (
    <div style={{ marginTop: "40px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h2 style={{ marginBottom: "20px" }}>Dashboard de Calorias</h2>
      <canvas ref={barraRef} style={{ maxWidth: "700px", width: "100%" }}></canvas>
    </div>
  );
}
