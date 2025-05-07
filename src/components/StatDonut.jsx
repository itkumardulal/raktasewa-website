import { PieChart } from "@mui/x-charts/PieChart";
import { Box, Typography } from "@mui/material";

const maroon = "#800000";

/** Donut with animated arc + centred value */
export default function StatDonut({
  label,
  value,
  updatedAt = "April 26, 2025", // default date
}) {
  const data = [
    { id: 0, value, color: maroon },
    { id: 1, value: 100 - value, color: "#e0e0e0" },
  ];

  return (
    <Box textAlign="center">
      <Typography variant="subtitle2">{label}</Typography>

      {/* Last-updated line is now consistently placed under the title */}
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ display: "block", mb: 1 }}
      >
        Last updated on : {updatedAt}
      </Typography>

      {/* ── donut + absolute-centred number ── */}
      <Box
        sx={{
          position: "relative",
          width: 140,
          height: 140,
          mx: "auto",
        }}
      >
        <PieChart
          series={[
            {
              data,
              innerRadius: 38,
              outerRadius: 60,
              startAngle: -90,
              endAngle: 270,
              paddingAngle: 0,
            },
          ]}
          width={140}
          height={140}
          slotProps={{ legend: { hidden: true } }}
        />

        {/* number in the centre */}
        <Typography
          variant="h6"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
          }}
        >
          {value}
        </Typography>
      </Box>

      <Typography variant="caption" color="text.secondary">
        based on number of blood supply requests
      </Typography>
    </Box>
  );
}
