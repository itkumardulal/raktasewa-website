/*  src/pages/OurTeam.jsx  */
import React from "react";
import { Container, Box, Avatar, Typography, Paper } from "@mui/material";
import SectionTitle from "../components/SectionTitle";
import { brand } from "../constants/brand";
import { cardSx } from "../constants/ui";
import { useLanguage } from "../i18n/LanguageContext";

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
  const { t } = useLanguage();

  return (
    <Container className="section-pad" maxWidth="lg">
      <SectionTitle
        component="h1"
        variant="h1"
        eyebrow={t("team.eyebrow")}
        title={t("team.title")}
        subtitle={t("team.subtitle")}
      />

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 3,
        }}
      >
        {team.map(({ name, role, img }) => (
          <Paper
            key={name}
            elevation={0}
            sx={{
              ...cardSx,
              flexBasis: { xs: "100%", sm: "47%", md: "30%" },
              maxWidth: 360,
              textAlign: "center",
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
              <Avatar src={img} alt={name} sx={{ width: "100%", height: "100%" }} />
            </Box>

            <Typography variant="h4" component="h2" sx={{ fontSize: "1.2rem", mb: 0.5 }}>
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
