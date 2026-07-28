import React from "react";
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Seo from "../components/Seo";
import SectionTitle from "../components/SectionTitle";
import Footer from "./Footer";
import { BLOG_POSTS } from "../data/blogs";
import { useLanguage } from "../i18n/LanguageContext";
import { brand } from "../constants/brand";
import { cardSx } from "../constants/ui";
import { blogCoverForSlug } from "../constants/images";

export default function BlogPage() {
  const { t, lang } = useLanguage();

  return (
    <>
      <Seo title={t("blogs.title")} description={t("blogs.subtitle")} path="/blog" />
      <Box className="section-pad" sx={{ bgcolor: brand.surface, px: 2 }}>
        <Container maxWidth="lg">
          <SectionTitle
            component="h1"
            variant="h1"
            eyebrow={t("blogs.eyebrow")}
            title={t("blogs.title")}
            subtitle={t("blogs.subtitle")}
          />
          <Grid container spacing={3}>
            {BLOG_POSTS.map((post, i) => {
              const cover = post.image || blogCoverForSlug(post.slug, i);
              return (
              <Grid key={post.slug} size={{ xs: 12, sm: 6, md: 4 }}>
                <Paper
                  elevation={0}
                  sx={{
                    ...cardSx,
                    p: 0,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    component="img"
                    src={cover}
                    alt={post.title[lang] || post.title.en}
                    loading="lazy"
                    sx={{
                      height: 160,
                      width: "100%",
                      objectFit: "cover",
                      display: "block",
                      bgcolor: brand.accentSoft,
                    }}
                  />
                  <Box sx={{ p: { xs: 2.5, sm: 3.25 }, flex: 1, display: "flex", flexDirection: "column" }}>
                    <Chip
                      size="small"
                      label={post.category[lang] || post.category.en}
                      sx={{ alignSelf: "flex-start", mb: 1.5 }}
                    />
                    <Typography variant="h4" component="h2" sx={{ fontSize: "1.15rem", mb: 1.5 }}>
                      {post.title[lang] || post.title.en}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flex: 1, lineHeight: 1.75 }}>
                      {post.summary[lang] || post.summary.en}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mb: 2 }}>
                      {t("blogs.by")} {post.author} · {post.readingMinutes} {t("blogs.readingTime")} ·{" "}
                      {post.date}
                    </Typography>
                    <Button component={RouterLink} to={`/blog/${post.slug}`} size="small" variant="outlined">
                      {t("blogs.readMore")}
                    </Button>
                  </Box>
                </Paper>
              </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
}
