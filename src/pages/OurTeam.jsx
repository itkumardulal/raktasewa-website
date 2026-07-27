/*  src/pages/OurTeam.jsx  */
import React from "react";
import { Container, Box, Avatar, Typography, Paper } from "@mui/material";
import { brand } from "../constants/brand";

const team = [
  {
    name: "Kumar Dulal",
    role: "Chief Technology Officer",
    img: "/bosskumar.jpg",
  },
  { name: "Prashant dhakal", role: "New Step", img: "/team7.jpg" },
  { name: "Deepa Roy", role: "IT", img: "/team1.jpeg" },
  {
    name: "Surakshya Adhikari",
    role: " Management and Fara Collectiion",
    img: "/team2.jpeg",
  },
  {
    name: "Charchita Adhikari",
    role: "Survey and Data Collection",
    img: "/team4.jpeg",
  },
  { name: "ANISH B.K", role: "IT", img: "/team5.jpg" },
];

export default function OurTeam() {
  return (
    <Container sx={{ mt: 8, mb: 10 }}>
      <Typography
        variant="h4"
        sx={{ mb: 1, textAlign: "center", color: brand.ink }}
      >
        Meet Our Team
      </Typography>
      <Typography
        align="center"
        color="text.secondary"
        sx={{ mb: 5, maxWidth: 480, mx: "auto" }}
      >
        People behind Emergency Blood Provider, working to connect donors and patients.
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 4,
        }}
      >
        {team.map(({ name, role, img }) => (
          <Paper
            key={name}
            elevation={0}
            sx={{
              flexBasis: { xs: "100%", sm: "47%", md: "30%" },
              maxWidth: 360,
              p: 3,
              textAlign: "center",
              borderRadius: 3,
              border: `1px solid ${brand.line}`,
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 12px 32px rgba(26, 21, 35, 0.08)",
              },
            }}
          >
            <Box
              sx={{
                width: 140,
                height: 140,
                mx: "auto",
                mb: 2,
                borderRadius: "50%",
                overflow: "hidden",
                border: `3px solid ${brand.primary}`,
              }}
            >
              <Avatar
                src={img}
                alt={name}
                sx={{ width: "100%", height: "100%" }}
              />
            </Box>

            <Typography variant="subtitle1" fontWeight={700}>
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {role}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Container>
  );
}
