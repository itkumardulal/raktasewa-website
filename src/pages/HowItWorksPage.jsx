import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Link as MuiLink,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link as RouterLink } from "react-router-dom";
import Seo from "../components/Seo";
import SectionTitle from "../components/SectionTitle";
import { useLanguage } from "../i18n/LanguageContext";
import { brand } from "../constants/brand";
import { cardSx } from "../constants/ui";
import { HOW_IT_WORKS } from "../data/howItWorks";

export default function HowItWorksPage() {
  const { lang, t } = useLanguage();
  const copy = HOW_IT_WORKS[lang] || HOW_IT_WORKS.en;

  return (
    <>
      <Seo title={copy.title} description={copy.subtitle} path="/how-it-works" />
      <Box className="section-pad" sx={{ bgcolor: brand.surface, px: 2 }}>
        <Container maxWidth="md">
          <SectionTitle
            component="h1"
            variant="h1"
            eyebrow={copy.eyebrow}
            title={copy.title}
            subtitle={copy.subtitle}
          />

          <Paper elevation={0} sx={{ ...cardSx, mb: 3, bgcolor: brand.accentSoft }}>
            <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
              {copy.disclaimer}
            </Typography>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              ...cardSx,
              mb: 3,
              borderColor: brand.primary,
              bgcolor: brand.white,
            }}
          >
            <Typography variant="h4" component="h2" sx={{ fontSize: "1.2rem", mb: 1 }}>
              {copy.emergencyTitle}
            </Typography>
            <Typography color="text.secondary" sx={{ lineHeight: 1.8, mb: 1.5 }}>
              {copy.emergencyBody}
            </Typography>
            <Stack spacing={0.5}>
              <MuiLink href={`tel:${copy.emergencyPhone}`} fontWeight={700}>
                {copy.emergencyPhone}
              </MuiLink>
              <MuiLink href={`mailto:${copy.emergencyEmail}`}>{copy.emergencyEmail}</MuiLink>
            </Stack>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 2, gap: 1 }}>
              <Button component={RouterLink} to="/request-blood-form" variant="contained" size="small">
                {t("nav.requestBlood")}
              </Button>
              <Button component={RouterLink} to="/donate-blood-form" variant="outlined" size="small">
                {t("nav.becomeDonor")}
              </Button>
              <Button component={RouterLink} to="/contact" variant="text" size="small">
                {t("nav.contact")}
              </Button>
            </Stack>
          </Paper>

          {copy.sections.map((section, index) => (
            <Accordion
              key={section.id}
              defaultExpanded={index < 2}
              disableGutters
              elevation={0}
              sx={{
                mb: 1.5,
                border: `1px solid ${brand.line}`,
                borderRadius: `${brand.radiusBtn}px !important`,
                overflow: "hidden",
                "&:before": { display: "none" },
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight={700}>{section.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {(section.paragraphs || []).map((p) => (
                  <Typography
                    key={p.slice(0, 24)}
                    color="text.secondary"
                    sx={{ mb: 1.5, lineHeight: 1.8 }}
                  >
                    {p}
                  </Typography>
                ))}
                <Box component="ol" sx={{ m: 0, pl: 2.5 }}>
                  {(section.steps || []).map((step) => (
                    <Typography
                      component="li"
                      key={step.slice(0, 32)}
                      color="text.secondary"
                      sx={{ mb: 1, lineHeight: 1.75 }}
                    >
                      {step}
                    </Typography>
                  ))}
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </Box>
    </>
  );
}
