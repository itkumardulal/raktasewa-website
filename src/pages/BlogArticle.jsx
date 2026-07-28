import React from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Chip,
  Container,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Seo from "../components/Seo";
import Footer from "./Footer";
import { getBlogBySlug } from "../data/blogs";
import { useLanguage } from "../i18n/LanguageContext";
import { brand } from "../constants/brand";
import { blogCoverForSlug } from "../constants/images";

export default function BlogPostPage() {
  const { slug } = useParams();
  const { t, lang } = useLanguage();
  const post = getBlogBySlug(slug);

  if (!post) {
    return (
      <>
        <Container sx={{ py: 8, textAlign: "center" }}>
          <Typography variant="h5" sx={{ mb: 2 }}>Article not found</Typography>
          <Button component={RouterLink} to="/blog" startIcon={<ArrowBackIcon />}>
            {t("blogs.back")}
          </Button>
        </Container>
        <Footer />
      </>
    );
  }

  const title = post.title[lang] || post.title.en;
  const summary = post.summary[lang] || post.summary.en;
  const body = post.body[lang] || post.body.en;
  const cover = post.image || blogCoverForSlug(post.slug);

  return (
    <>
      <Seo title={title} description={summary} path={`/blog/${post.slug}`} type="article" />
      <Box sx={{ bgcolor: brand.surface, py: { xs: 4, md: 6 }, px: 2 }}>
        <Container maxWidth="md">
          <Button component={RouterLink} to="/blog" startIcon={<ArrowBackIcon />} sx={{ mb: 2 }}>
            {t("blogs.back")}
          </Button>
          <Chip size="small" label={post.category[lang] || post.category.en} sx={{ mb: 2 }} />
          <Typography variant="h3" component="h1" sx={{ mb: 1 }}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {t("blogs.by")} {post.author} · {post.readingMinutes} {t("blogs.readingTime")} · {post.date}
          </Typography>
          <Box
            component="img"
            src={cover}
            alt={title}
            sx={{
              width: "100%",
              height: { xs: 200, md: 280 },
              objectFit: "cover",
              borderRadius: `${brand.radius}px`,
              mb: 3,
              display: "block",
              bgcolor: brand.accentSoft,
            }}
          />
          <Typography paragraph color="text.secondary" sx={{ fontSize: "1.05rem", lineHeight: 1.8, maxWidth: "42rem" }}>
            {summary}
          </Typography>
          {body.map((para, i) => (
            <Typography key={i} paragraph color="text.secondary" sx={{ lineHeight: 1.8, maxWidth: "42rem" }}>
              {para}
            </Typography>
          ))}
        </Container>
      </Box>
      <Footer />
    </>
  );
}
