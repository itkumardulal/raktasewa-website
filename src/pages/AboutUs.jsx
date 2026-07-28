import React from "react";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Seo from "../components/Seo";
import SectionTitle from "../components/SectionTitle";
import Footer from "./Footer";
import { useLanguage } from "../i18n/LanguageContext";
import { brand } from "../constants/brand";
import { cardSx } from "../constants/ui";

export default function AboutUs() {
  const { t } = useLanguage();

  return (
    <>
      <Seo title={t("about.title")} description={t("about.subtitle")} path="/about" />
      <Box className="section-pad" sx={{ bgcolor: brand.surface, px: 2 }}>
        <Container maxWidth="md">
          <SectionTitle
            component="h1"
            variant="h1"
            eyebrow={t("about.eyebrow")}
            title={t("about.title")}
            subtitle={t("about.subtitle")}
            align="left"
          />
          <Typography paragraph className="readable" color="text.secondary" sx={{ mb: 2.5, mx: 0 }}>
            {t("about.p1")}
          </Typography>
          <Typography paragraph className="readable" color="text.secondary" sx={{ mb: 2.5, mx: 0 }}>
            {t("about.p2")}
          </Typography>
          <Typography paragraph className="readable" color="text.secondary" sx={{ mb: 4, mx: 0 }}>
            {t("about.p3")}
          </Typography>

          <Grid container spacing={3} sx={{ mb: 4 }}>
            {[
              ["about.notBankTitle", "about.notBankBody"],
              ["about.whyNepalTitle", "about.whyNepalBody"],
              ["about.communityTitle", "about.communityBody"],
            ].map(([titleKey, bodyKey]) => (
              <Grid key={titleKey} size={{ xs: 12, md: 4 }}>
                <Paper elevation={0} sx={cardSx}>
                  <Typography variant="h4" component="h3" sx={{ fontSize: "1.15rem", mb: 1.5 }}>
                    {t(titleKey)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                    {t(bodyKey)}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Paper elevation={0} sx={{ ...cardSx, mb: 3, bgcolor: brand.white }}>
            <Typography variant="h3" component="h2" sx={{ mb: 2, fontSize: { xs: "1.5rem", md: "1.75rem" } }}>
              {t("mission.title")}
            </Typography>
            <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
              {t("mission.body")}
            </Typography>
          </Paper>
          <Paper elevation={0} sx={{ ...cardSx, mb: 4, bgcolor: brand.accentSoft }}>
            <Typography variant="h3" component="h2" sx={{ mb: 2, fontSize: { xs: "1.5rem", md: "1.75rem" } }}>
              {t("vision.title")}
            </Typography>
            <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
              {t("vision.body")}
            </Typography>
          </Paper>

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Button component={RouterLink} to="/donate-blood-form" variant="contained" size="large">
              {t("nav.becomeDonor")}
            </Button>
            <Button component={RouterLink} to="/request-blood-form" variant="outlined" size="large">
              {t("nav.requestBlood")}
            </Button>
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
}
