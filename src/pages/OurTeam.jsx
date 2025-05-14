/*  src/pages/OurTeam.jsx  */
import React from "react";
import { Container, Box, Avatar, Typography, Paper } from "@mui/material";

const maroon = "#800000";

/* Swap these with real images / people */
const team = [
  {
    name: "Kumar Dulal",
    role: "Chief Technology Officer",
    img: "/bosskumar.jpg",
  },
  { name: "Deepa Roy", role: "-", img: "/team1.jpeg" },
  {
    name: "Surakshya Adhikari",
    role: " Management and Fara Collectiion",
    img: "/team2.jpeg",
  },
  { name: "unknown", role: "-", img: "/team3.jpeg" },
  { name: "Charchita Adhikari", role: "-", img: "/team4.jpeg" },
  { name: "ANISH B.K", role: "Donor Liaison", img: "/team5.jpg" },
  { name: "Man Bahadur Bhandari", role: "Donor Liaison", img: "/team6.jpg" },
  { name: "Ajax Alyson", role: "Web Developer", img: "/lead_dev.jpg" },
];

export default function OurTeam() {
  return (
    <Container sx={{ mt: 8, mb: 10 }}>
      <Typography variant="h5" sx={{ mb: 4, textAlign: "center" }}>
        Meet&nbsp;Our&nbsp;Team
      </Typography>

      {/* flexbox, no Grid component */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 4, // row + column gap
        }}
      >
        {team.map(({ name, role, img }) => (
          <Paper
            key={name}
            elevation={1}
            sx={{
              /* 1-per-row phones | 2-per-row tablets | 3-per-row desktops */
              flexBasis: { xs: "100%", sm: "47%", md: "30%" },
              maxWidth: 360,
              p: 3,
              textAlign: "center",
              borderRadius: 2,
            }}
          >
            {/* circular avatar with maroon ring */}
            <Box
              sx={{
                width: 140,
                height: 140,
                mx: "auto",
                mb: 2,
                borderRadius: "50%",
                overflow: "hidden",
                border: `4px solid ${maroon}`,
              }}
            >
              <Avatar
                src={img}
                alt={name}
                sx={{ width: "100%", height: "100%" }}
              />
            </Box>

            <Typography variant="subtitle1" fontWeight={600}>
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
