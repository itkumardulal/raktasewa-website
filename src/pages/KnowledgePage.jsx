import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Seo from "../components/Seo";
import SectionTitle from "../components/SectionTitle";
import Footer from "./Footer";
import { KNOWLEDGE_TOPICS } from "../data/knowledge";
import { useLanguage } from "../i18n/LanguageContext";
import { brand } from "../constants/brand";
import { cardSx } from "../constants/ui";

export default function KnowledgePage() {
  const { t, lang } = useLanguage();

  return (
    <>
      <Seo title={t("knowledge.title")} description={t("knowledge.subtitle")} path="/knowledge" />
      <Box className="section-pad" sx={{ bgcolor: brand.surface, px: 2 }}>
        <Container maxWidth="lg">
          <SectionTitle
            component="h1"
            variant="h1"
            eyebrow={t("knowledge.eyebrow")}
            title={t("knowledge.title")}
            subtitle={t("knowledge.subtitle")}
          />
          <Grid container spacing={3}>
            {KNOWLEDGE_TOPICS.map((topic) => (
              <Grid key={topic.slug} size={{ xs: 12, sm: 6, md: 4 }} id={topic.slug}>
                <Paper elevation={0} sx={cardSx}>
                  <Typography variant="h4" component="h2" sx={{ fontSize: "1.15rem", mb: 1.5 }}>
                    {topic.title[lang] || topic.title.en}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.75 }}>
                    {topic.summary[lang] || topic.summary.en}
                  </Typography>
                  <Box component="ul" sx={{ m: 0, pl: 2.5, color: "text.secondary" }}>
                    {(topic.points[lang] || topic.points.en).map((p) => (
                      <Typography component="li" variant="body2" key={p} sx={{ mb: 0.75, lineHeight: 1.7 }}>
                        {p}
                      </Typography>
                    ))}
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Button component={RouterLink} to="/blood-group" variant="contained" size="large">
              {t("nav.bloodGroup")}
            </Button>
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
}
