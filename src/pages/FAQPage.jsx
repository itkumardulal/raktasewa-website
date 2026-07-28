import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Seo from "../components/Seo";
import SectionTitle from "../components/SectionTitle";
import Footer from "./Footer";
import { FAQS } from "../data/faqs";
import { useLanguage } from "../i18n/LanguageContext";
import { brand } from "../constants/brand";

export default function FAQPage() {
  const { t, lang } = useLanguage();

  return (
    <>
      <Seo title={t("faq.title")} description={t("faq.subtitle")} path="/faq" />
      <Box className="section-pad" sx={{ bgcolor: brand.surface, px: 2 }}>
        <Container maxWidth="md">
          <SectionTitle
            component="h1"
            variant="h1"
            eyebrow={t("faq.eyebrow")}
            title={t("faq.title")}
            subtitle={t("faq.subtitle")}
          />
          {FAQS.map((item, idx) => (
            <Accordion
              key={idx}
              disableGutters
              elevation={0}
              sx={{
                mb: 1.5,
                border: `1px solid ${brand.line}`,
                borderRadius: `${brand.radiusBtn}px !important`,
                bgcolor: brand.white,
                overflow: "hidden",
                "&:before": { display: "none" },
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />} id={`faq-full-${idx}`}>
                <Typography fontWeight={600}>{item.q[lang] || item.q.en}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                  {item.a[lang] || item.a.en}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </Box>
      <Footer />
    </>
  );
}
