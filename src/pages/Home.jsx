/*  src/pages/Home.jsx  */
import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Container, Typography } from "@mui/material";
import StatDonut from "../components/StatDonut";
import HandshakeIcon from "@mui/icons-material/Handshake";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import { Link as RouterLink } from "react-router-dom";
import { apiUrl } from "../config/api";
import { brand } from "../constants/brand";

export default function Home() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(apiUrl("/public/stats"));
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
      {/* Hero — brand-first, same CTAs as before */}
      <Box
        className="fade-up"
        sx={{
          position: "relative",
          width: "100%",
          overflow: "hidden",
          background: `
            linear-gradient(135deg, rgba(92, 14, 37, 0.92), rgba(139, 21, 56, 0.78)),
            radial-gradient(circle at 80% 20%, rgba(15, 107, 92, 0.35), transparent 45%)
          `,
          color: brand.white,
          py: { xs: 7, md: 10 },
          px: 2,
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <Typography
            variant="overline"
            sx={{ letterSpacing: "0.18em", opacity: 0.9, fontWeight: 700 }}
          >
            Emergency Blood Provider
          </Typography>
          <Typography
            variant="h2"
            sx={{
              mt: 1,
              mb: 2,
              fontSize: { xs: "2.1rem", sm: "2.8rem", md: "3.4rem" },
              lineHeight: 1.15,
            }}
          >
            When every minute matters, find blood faster.
          </Typography>
          <Typography
            sx={{
              maxWidth: 560,
              mx: "auto",
              mb: 4,
              opacity: 0.92,
              fontSize: { xs: "1rem", md: "1.1rem" },
            }}
          >
            Connect with verified donors and urgent requests across Nepal — donate
            hope, or request help in minutes.
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              justifyContent: "center",
            }}
          >
            <Button
              component={RouterLink}
              to="/donate-blood-form"
              variant="contained"
              size="large"
              sx={{
                bgcolor: brand.white,
                color: brand.primary,
                px: 3.5,
                "&:hover": { bgcolor: "#fff5f5", color: brand.primaryDark },
              }}
            >
              Become a donor
            </Button>
            <Button
              component={RouterLink}
              to="/request-blood-form"
              variant="outlined"
              size="large"
              sx={{
                borderColor: "rgba(255,255,255,0.7)",
                color: brand.white,
                px: 3.5,
                "&:hover": {
                  borderColor: brand.white,
                  bgcolor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              Request blood
            </Button>
          </Box>
        </Container>
        <Box
          className="hero-orb"
          aria-hidden
          sx={{
            position: "absolute",
            width: 280,
            height: 280,
            borderRadius: "50%",
            right: { xs: -80, md: 40 },
            bottom: { xs: -100, md: -60 },
            bgcolor: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        />
      </Box>

      {/* Stats — same data source & labels */}
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 7 } }}>
        <Typography
          variant="h5"
          align="center"
          sx={{ mb: 1, color: brand.ink }}
        >
          Live network snapshot
        </Typography>
        <Typography
          align="center"
          color="text.secondary"
          sx={{ mb: 4, maxWidth: 480, mx: "auto" }}
        >
          Real-time counts from our blood request and donor community.
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 4,
          }}
        >
          {loading ? (
            <CircularProgress color="primary" />
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
      </Container>

      {/* CTA icons — same routes and labels */}
      <Box
        sx={{
          width: "100%",
          bgcolor: brand.surfaceAlt,
          py: { xs: 6, md: 8 },
          px: 2,
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              rowGap: 6,
              columnGap: 6,
            }}
          >
            {[
              {
                to: "/donate-blood-form",
                icon: <HandshakeIcon sx={{ fontSize: 64 }} />,
                label: "BE OUR DONOR",
              },
              {
                to: "/request-blood-form",
                icon: <BloodtypeIcon sx={{ fontSize: 64 }} />,
                label: "REQUEST BLOOD",
              },
            ].map(({ to, icon, label }) => (
              <Box
                key={label}
                sx={{
                  flexBasis: { xs: "100%", sm: "45%" },
                  textAlign: "center",
                }}
              >
                <Box
                  sx={{
                    width: 140,
                    height: 140,
                    mx: "auto",
                    borderRadius: "50%",
                    bgcolor: brand.primary,
                    color: brand.white,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 16px 40px rgba(139, 21, 56, 0.28)",
                    transition: "transform 0.25s ease",
                    "&:hover": { transform: "translateY(-4px)" },
                  }}
                >
                  {icon}
                </Box>
                <Button
                  component={RouterLink}
                  to={to}
                  fullWidth
                  size="large"
                  variant="contained"
                  color="primary"
                  sx={{
                    mt: 2.5,
                    mb: 1,
                    py: 1.25,
                    maxWidth: 240,
                    mx: "auto",
                    display: "flex",
                  }}
                >
                  {label}
                </Button>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
}
