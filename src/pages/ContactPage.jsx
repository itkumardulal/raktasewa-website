import React from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import Seo from "../components/Seo";
import SectionTitle from "../components/SectionTitle";
import Footer from "./Footer";
import { useLanguage } from "../i18n/LanguageContext";
import { brand } from "../constants/brand";
import { cardSx } from "../constants/ui";
import { SITE_IMAGES } from "../constants/images";

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <>
      <Seo title={t("contact.title")} description={t("contact.subtitle")} path="/contact" />
      <Box className="section-pad" sx={{ bgcolor: brand.surface, px: 2 }}>
        <Container maxWidth="md">
          <SectionTitle
            component="h1"
            variant="h1"
            eyebrow={t("contact.eyebrow")}
            title={t("contact.title")}
            subtitle={t("contact.subtitle")}
          />
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Paper elevation={0} sx={cardSx}>
                <Typography variant="h4" component="h2" sx={{ fontSize: "1.15rem", mb: 1 }}>
                  {t("contact.address")}
                </Typography>
                <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                  {t("contact.addressValue")}
                </Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Paper elevation={0} sx={cardSx}>
                <Typography variant="h4" component="h2" sx={{ fontSize: "1.15rem", mb: 1 }}>
                  {t("contact.phone")}
                </Typography>
                <MuiLink href={`tel:${t("contact.phoneValue")}`} color="inherit">
                  {t("contact.phoneValue")}
                </MuiLink>
                <Typography variant="h4" component="h2" sx={{ fontSize: "1.15rem", mt: 2.5, mb: 1 }}>
                  {t("contact.email")}
                </Typography>
                <MuiLink href={`mailto:${t("contact.emailValue")}`} color="inherit">
                  {t("contact.emailValue")}
                </MuiLink>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Paper elevation={0} sx={cardSx}>
                <Typography variant="h4" component="h2" sx={{ fontSize: "1.15rem", mb: 1.5 }}>
                  {t("contact.emergency")}
                </Typography>
                <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                  {t("contact.emergencyBody")}
                </Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Paper elevation={0} sx={cardSx}>
                <Typography variant="h4" component="h2" sx={{ fontSize: "1.15rem", mb: 1 }}>
                  {t("contact.support")}
                </Typography>
                <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                  {t("contact.supportBody")}
                </Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Paper
                elevation={0}
                sx={{
                  ...cardSx,
                  p: 0,
                  overflow: "hidden",
                  minHeight: 180,
                  "&:hover": { transform: "none", boxShadow: brand.cardShadow },
                }}
              >
                <Box
                  component="img"
                  src={SITE_IMAGES.nepalHills}
                  alt={t("contact.map")}
                  sx={{
                    width: "100%",
                    height: 180,
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    px: 2,
                    py: 1.25,
                    color: "text.secondary",
                    fontWeight: 500,
                  }}
                >
                  {t("contact.map")}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
}
