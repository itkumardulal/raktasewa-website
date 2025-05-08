/*  src/pages/Home.jsx  */
import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import StatDonut from "../components/StatDonut";
import HandshakeIcon from "@mui/icons-material/Handshake";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import { Link as RouterLink } from "react-router-dom";

const maroon = "#800000";

export default function Home() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/public/stats`);
        const data = await res.json();

        setStats([
          { label: "Unsettled Requests", value: data.unsettledRequests },
          { label: "Settled Requests", value: data.settledRequests },
          { label: "Total Donors", value: data.totalDonors },
        ]);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
        setStats([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <>
      {/* ───────────  STAT DONUTS  ─────────── */}
      <Box
        sx={{
          mt: 4,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 4,
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : stats.length > 0 ? (
          stats.map(({ label, value }) => (
            <Box
              key={label}
              sx={{
                flexBasis: { xs: "100%", sm: "33.333%", md: "25%" },
                display: "flex",
                justifyContent: "center",
              }}
            >
              <StatDonut label={label} value={value} />
            </Box>
          ))
        ) : (
          <Typography color="error">Failed to load statistics.</Typography>
        )}
      </Box>

      {/* ───────────  CTA ICONS  ─────────── */}
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          rowGap: 6,
          columnGap: 6,
        }}
      >
        {/* helper component to avoid repetition */}
        {[
          {
            to: "/donate-blood-form",
            icon: <HandshakeIcon sx={{ fontSize: 96 }} />,
            label: "BE OUR DONOR",
          },
          {
            to: "/request-blood-form",
            icon: <BloodtypeIcon sx={{ fontSize: 96 }} />,
            label: "REQUEST BLOOD",
          },
        ].map(({ to, icon, label }) => (
          <Box
            key={label}
            sx={{
              flexBasis: { xs: "100%", sm: "50%", md: "25%" }, // 1-up, 2-up, 4-up
              textAlign: "center",
            }}
          >
            {/* round icon */}
            <Box
              sx={{
                width: 160,
                height: 160,
                mx: "auto",
                borderRadius: "50%",
                bgcolor: maroon,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {icon}
            </Box>

            {/* button */}
            <Button
              component={RouterLink}
              to={to}
              fullWidth
              size="large"
              variant="contained"
              sx={{
                mt: 2,
                mb: 3,
                py: 1.1,
                fontSize: "1rem",
                bgcolor: maroon,
                "&:hover": { bgcolor: "#6a0000", color: "#fff" },
                borderRadius: 2,
                textTransform: "none",
                maxWidth: 220,
                mx: "auto",
              }}
            >
              {label}
            </Button>
          </Box>
        ))}
      </Box>
    </>
  );
}
