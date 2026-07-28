/*  src/pages/Home.jsx — premium bilingual homepage; keeps live /public/stats */
import React, { useEffect, useMemo, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HandshakeIcon from "@mui/icons-material/Handshake";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import GroupsIcon from "@mui/icons-material/Groups";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SpeedIcon from "@mui/icons-material/Speed";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PublicIcon from "@mui/icons-material/Public";
import { Link as RouterLink } from "react-router-dom";
import StatDonut from "../components/StatDonut";
import SectionTitle from "../components/SectionTitle";
import Seo from "../components/Seo";
import { apiUrl } from "../config/api";
import { brand } from "../constants/brand";
import { cardSx, iconBoxSx } from "../constants/ui";
import { useLanguage } from "../i18n/LanguageContext";
import { BLOG_POSTS } from "../data/blogs";
import { FAQS } from "../data/faqs";
import { PARTNERS } from "../data/partners";
import { usePersistentValue } from "../hooks/usePersistentForm";
import { blogCoverForSlug } from "../constants/images";

const VALUE_ICONS = [
  <FavoriteBorderIcon key="1" />,
  <GroupsIcon key="2" />,
  <VerifiedUserIcon key="3" />,
  <PublicIcon key="4" />,
  <SpeedIcon key="5" />,
  <VolunteerActivismIcon key="6" />,
  <LocalHospitalIcon key="7" />,
  <PrivacyTipIcon key="8" />,
];

const WHY_ICONS = [
  <SpeedIcon key="w1" />,
  <VerifiedUserIcon key="w2" />,
  <VolunteerActivismIcon key="w3" />,
  <BloodtypeIcon key="w4" />,
  <LocalHospitalIcon key="w5" />,
  <VerifiedUserIcon key="w6" />,
  <PrivacyTipIcon key="w7" />,
  <Diversity3Icon key="w8" />,
];

export default function Home() {
  const { t, lang } = useLanguage();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail, clearEmail] = usePersistentValue(
    "raktasewa_draft_newsletter_email",
    ""
  );
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(apiUrl("/public/stats"));
        const data = await res.json();
        setStats([
          { label: t("stats.unsettled"), value: data.unsettledRequests },
          { label: t("stats.settled"), value: data.settledRequests },
          { label: t("stats.donors"), value: data.totalDonors },
        ]);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
        setStats([]);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [t, lang]);

  const impactCards = useMemo(() => {
    const donors = stats?.[2]?.value ?? "—";
    const unsettled = stats?.[0]?.value ?? "—";
    const settled = stats?.[1]?.value ?? "—";
    const totalReq =
      Number(unsettled) >= 0 && Number(settled) >= 0
        ? Number(unsettled) + Number(settled)
        : "—";
    return [
      { label: t("impact.registeredDonors"), value: donors },
      { label: t("impact.bloodRequests"), value: totalReq },
      { label: t("impact.successfulDonations"), value: settled },
      { label: t("impact.livesImpacted"), value: settled },
      { label: t("impact.partnerOrgs"), value: PARTNERS.length },
      { label: t("impact.communities"), value: "Nepal" },
    ];
  }, [stats, t]);

  const values = t("values.items") || [];
  const whyItems = t("why.items") || [];
  const howSteps = t("how.steps") || [];
  const facts = t("facts.items") || [];
  const stories = t("stories.items") || [];
  const faqPreview = FAQS.slice(0, 6);
  const blogPreview = BLOG_POSTS.slice(0, 3);

  return (
    <>
      <Seo
        title={lang === "ne" ? "गृहपृष्ठ" : "Home"}
        description={t("brand.notBloodBank")}
        path="/"
      />

      {/* Hero — Emergency Blood Provider cover; prioritize Donate / Request */}
      <Box
        component="section"
        aria-label="Hero"
        className="fade-up"
        sx={{
          position: "relative",
          width: "100%",
          overflow: "hidden",
          background: `
            linear-gradient(180deg, #8E0000 0%, #B71C1C 55%, #9A1515 100%)
          `,
          color: brand.white,
          py: { xs: 9, md: 14 },
          px: 2,
          minHeight: { xs: "70vh", md: "76vh" },
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Lightweight blood-drop accents */}
        <Box className="hero-drop" aria-hidden sx={{ top: "18%", left: "8%", animationDelay: "0s" }} />
        <Box className="hero-drop hero-drop-drip" aria-hidden sx={{ top: "28%", right: "12%", width: 14, height: 20, animationDelay: "0.8s" }} />
        <Box className="hero-drop" aria-hidden sx={{ bottom: "22%", left: "18%", width: 12, height: 18, animationDelay: "1.4s" }} />
        <Box className="hero-drop hero-drop-drip" aria-hidden sx={{ bottom: "30%", right: "22%", width: 16, height: 22, animationDelay: "0.4s" }} />

        <Box
          className="hero-orb"
          aria-hidden
          sx={{
            position: "absolute",
            width: { xs: 220, md: 320 },
            height: { xs: 220, md: 320 },
            borderRadius: "50%",
            right: { xs: -70, md: 40 },
            bottom: { xs: -80, md: -40 },
            bgcolor: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        />

        <Container maxWidth="md" sx={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <Typography
            variant="overline"
            sx={{
              letterSpacing: "0.14em",
              opacity: 0.95,
              fontWeight: 700,
              color: "rgba(255,255,255,0.92)",
            }}
          >
            {t("hero.overline")}
          </Typography>

          <Typography
            variant="h1"
            sx={{
              mt: 2.5,
              mb: 2.5,
              color: brand.white,
              maxWidth: 760,
              mx: "auto",
            }}
          >
            {t("hero.title")}
          </Typography>

          <Typography
            sx={{
              fontFamily: '"Manrope", "Inter", sans-serif',
              fontWeight: 600,
              fontSize: { xs: "1.1rem", md: "1.25rem" },
              mb: 2.5,
              letterSpacing: "-0.02em",
              color: brand.white,
            }}
          >
            {t("hero.tagline")}
          </Typography>

          <Typography
            className="readable"
            sx={{
              mx: "auto",
              mb: 4,
              fontSize: { xs: "1.05rem", md: "1.125rem" },
              lineHeight: 1.8,
              fontWeight: 400,
              color: brand.white,
            }}
          >
            {t("hero.subtitle")}
          </Typography>

          {/* Primary interactive purpose CTAs */}
          <Grid container spacing={2} justifyContent="center" sx={{ maxWidth: 560, mx: "auto" }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Button
                component={RouterLink}
                to="/donate-blood-form"
                variant="contained"
                size="large"
                fullWidth
                className="hero-cta-primary"
                startIcon={<HandshakeIcon />}
                sx={{
                  bgcolor: brand.white,
                  color: brand.primary,
                  borderRadius: `${brand.radiusBtn}px`,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                  "&:hover": {
                    bgcolor: "#fff5f5",
                    color: brand.primaryDark,
                  },
                }}
              >
                {t("hero.becomeDonor")}
              </Button>
              <Typography
                variant="caption"
                sx={{ display: "block", mt: 1, color: brand.white, fontWeight: 500 }}
              >
                {t("hero.donorHint")}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Button
                component={RouterLink}
                to="/request-blood-form"
                variant="outlined"
                size="large"
                fullWidth
                startIcon={<BloodtypeIcon />}
                sx={{
                  borderWidth: 1.5,
                  borderColor: "rgba(255,255,255,0.85)",
                  color: brand.white,
                  borderRadius: `${brand.radiusBtn}px`,
                  bgcolor: "rgba(255,255,255,0.08)",
                  "&:hover": {
                    borderWidth: 1.5,
                    borderColor: brand.white,
                    bgcolor: "rgba(255,255,255,0.16)",
                  },
                }}
              >
                {t("hero.requestBlood")}
              </Button>
              <Typography
                variant="caption"
                sx={{ display: "block", mt: 1, color: brand.white, fontWeight: 500 }}
              >
                {t("hero.requestHint")}
              </Typography>
            </Grid>
          </Grid>

          <Button
            component={RouterLink}
            to="/about"
            variant="text"
            size="small"
            sx={{
              mt: 3,
              color: "rgba(255,255,255,0.85)",
              textDecoration: "underline",
              textUnderlineOffset: 4,
              "&:hover": { color: brand.white, bgcolor: "transparent" },
            }}
          >
            {t("hero.learnMore")}
          </Button>
        </Container>
      </Box>

      {/* Live snapshot (existing API) */}
      <Container
        component="section"
        maxWidth="lg"
        className="section-pad"
        aria-labelledby="stats-heading"
      >
        <SectionTitle
          id="stats-heading"
          eyebrow={t("stats.eyebrow")}
          title={t("stats.title")}
          subtitle={t("stats.subtitle")}
        />
        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "stretch",
            "@media (max-width: 1023.95px)": {
              flexWrap: "nowrap",
              justifyContent: "flex-start",
              gap: "24px",
              overflowX: "auto",
              WebkitOverflowScrolling: "touch",
              scrollSnapType: "x mandatory",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              "&::-webkit-scrollbar": { display: "none" },
            },
            "@media (min-width: 1024px)": {
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 3,
              overflowX: "visible",
            },
          }}
        >
          {loading ? (
            <CircularProgress color="primary" />
          ) : stats?.length > 0 ? (
            stats.map(({ label, value }) => (
              <Box
                key={label}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  "@media (max-width: 1023.95px)": {
                    flex: "0 0 240px",
                    scrollSnapAlign: "start",
                  },
                  "@media (min-width: 1024px)": {
                    flex: "0 1 auto",
                    flexBasis: "25%",
                  },
                }}
              >
                <StatDonut
                  label={label}
                  value={value}
                  basedOnLabel={t("stats.basedOn")}
                  lastUpdatedLabel={t("stats.lastUpdated")}
                />
              </Box>
            ))
          ) : (
            <Typography color="error">{t("stats.failed")}</Typography>
          )}
        </Box>
      </Container>

      {/* About snapshot */}
      <Box
        component="section"
        id="about-preview"
        className="section-pad"
        sx={{ bgcolor: brand.white, px: 2 }}
      >
        <Container maxWidth="md">
          <SectionTitle
            eyebrow={t("about.eyebrow")}
            title={t("about.title")}
            subtitle={t("about.subtitle")}
          />
          <Typography paragraph className="readable" color="text.secondary" sx={{ mb: 2.5 }}>
            {t("about.p1")}
          </Typography>
          <Typography paragraph className="readable" color="text.secondary" sx={{ mb: 2.5 }}>
            {t("about.p2")}
          </Typography>
          <Typography paragraph className="readable" color="text.secondary" sx={{ mb: 4 }}>
            {t("about.p3")}
          </Typography>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            {[
              ["about.notBankTitle", "about.notBankBody"],
              ["about.whyNepalTitle", "about.whyNepalBody"],
              ["about.communityTitle", "about.communityBody"],
            ].map(([titleKey, bodyKey]) => (
              <Grid key={titleKey} size={{ xs: 12, md: 4 }}>
                <Paper elevation={0} sx={cardSx}>
                  <Typography variant="h4" component="h3" sx={{ mb: 1.5, fontSize: "1.25rem" }}>
                    {t(titleKey)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                    {t(bodyKey)}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Button component={RouterLink} to="/about" variant="outlined" color="primary">
              {t("common.learnMore")}
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Mission / Vision */}
      <Container component="section" maxWidth="lg" className="section-pad">
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper elevation={0} sx={{ ...cardSx, bgcolor: brand.surface }}>
              <Typography variant="h3" component="h2" sx={{ mb: 2.5, fontSize: { xs: "1.5rem", md: "1.75rem" } }}>
                {t("mission.title")}
              </Typography>
              <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                {t("mission.body")}
              </Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper elevation={0} sx={{ ...cardSx, bgcolor: brand.accentSoft }}>
              <Typography variant="h3" component="h2" sx={{ mb: 2.5, fontSize: { xs: "1.5rem", md: "1.75rem" } }}>
                {t("vision.title")}
              </Typography>
              <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                {t("vision.body")}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Values */}
      <Box component="section" className="section-pad" sx={{ bgcolor: brand.surfaceAlt, px: 2 }}>
        <Container maxWidth="lg">
          <SectionTitle
            eyebrow={t("values.eyebrow")}
            title={t("values.title")}
            subtitle={t("values.subtitle")}
          />
          <Grid container spacing={3}>
            {(Array.isArray(values) ? values : []).map((item, i) => (
              <Grid key={item.key || i} size={{ xs: 12, sm: 6, md: 3 }}>
                <Paper elevation={0} sx={cardSx}>
                  <Box sx={iconBoxSx}>{VALUE_ICONS[i % VALUE_ICONS.length]}</Box>
                  <Typography variant="h4" component="h3" sx={{ fontSize: "1.15rem", mb: 1 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75 }}>
                    {item.body}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* How it works */}
      <Container component="section" maxWidth="md" className="section-pad">
        <SectionTitle
          eyebrow={t("how.eyebrow")}
          title={t("how.title")}
          subtitle={t("how.subtitle")}
        />
        <Stack spacing={3}>
          {(Array.isArray(howSteps) ? howSteps : []).map((step, i) => (
            <Paper
              key={step.title}
              elevation={0}
              sx={{
                ...cardSx,
                display: "flex",
                gap: 2.5,
                alignItems: "flex-start",
              }}
            >
              <Chip label={i + 1} color="primary" sx={{ fontWeight: 800, minWidth: 36 }} />
              <Box>
                <Typography variant="h4" component="h3" sx={{ fontSize: "1.15rem", mb: 1 }}>
                  {step.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75 }}>
                  {step.body}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Stack>
      </Container>

      {/* Why choose */}
      <Box component="section" className="section-pad" sx={{ bgcolor: brand.white, px: 2 }}>
        <Container maxWidth="lg">
          <SectionTitle
            eyebrow={t("why.eyebrow")}
            title={t("why.title")}
            subtitle={t("why.subtitle")}
          />
          <Grid container spacing={3}>
            {(Array.isArray(whyItems) ? whyItems : []).map((item, i) => (
              <Grid key={item.title} size={{ xs: 12, sm: 6, md: 3 }}>
                <Paper elevation={0} sx={cardSx}>
                  <Box sx={iconBoxSx}>{WHY_ICONS[i % WHY_ICONS.length]}</Box>
                  <Typography variant="h4" component="h3" sx={{ fontSize: "1.15rem", mb: 1 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75 }}>
                    {item.body}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Live impact */}
      <Container component="section" maxWidth="lg" className="section-pad">
        <SectionTitle
          eyebrow={t("impact.eyebrow")}
          title={t("impact.title")}
          subtitle={t("impact.subtitle")}
        />
        <Grid container spacing={3}>
          {impactCards.map((card) => (
            <Grid key={card.label} size={{ xs: 6, md: 4 }}>
              <Paper elevation={0} sx={{ ...cardSx, textAlign: "center", py: { xs: 3, sm: 4 } }}>
                <Typography
                  sx={{
                    fontFamily: '"Manrope", "Inter", sans-serif',
                    fontWeight: 800,
                    fontSize: { xs: "2rem", md: "2.5rem" },
                    letterSpacing: "-0.04em",
                    lineHeight: 1.05,
                    color: brand.primary,
                    mb: 1.5,
                  }}
                >
                  {card.value}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontWeight: 500, letterSpacing: "0.01em" }}
                >
                  {card.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Blood facts */}
      <Box component="section" className="section-pad" sx={{ bgcolor: brand.surface, px: 2 }}>
        <Container maxWidth="lg">
          <SectionTitle
            eyebrow={t("facts.eyebrow")}
            title={t("facts.title")}
            subtitle={t("facts.subtitle")}
          />
          <Grid container spacing={3}>
            {(Array.isArray(facts) ? facts : []).map((f) => (
              <Grid key={f.title} size={{ xs: 12, sm: 6, md: 4 }}>
                <Paper elevation={0} sx={cardSx}>
                  <Typography variant="h4" component="h3" sx={{ fontSize: "1.15rem", mb: 1.5 }}>
                    {f.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75 }}>
                    {f.body}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Success stories */}
      <Container component="section" maxWidth="lg" className="section-pad">
        <SectionTitle
          eyebrow={t("stories.eyebrow")}
          title={t("stories.title")}
          subtitle={t("stories.subtitle")}
        />
        <Grid container spacing={3}>
          {(Array.isArray(stories) ? stories : []).map((s) => (
            <Grid key={s.title} size={{ xs: 12, sm: 6 }}>
              <Paper elevation={0} sx={cardSx}>
                <Chip size="small" label={s.role} sx={{ mb: 1.5 }} />
                <Typography variant="h4" component="h3" sx={{ fontSize: "1.2rem", mb: 1.5 }}>
                  {s.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                  {s.body}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Blogs */}
      <Box component="section" className="section-pad" sx={{ bgcolor: brand.surfaceAlt, px: 2 }}>
        <Container maxWidth="lg">
          <SectionTitle
            eyebrow={t("blogs.eyebrow")}
            title={t("blogs.title")}
            subtitle={t("blogs.subtitle")}
          />
          <Grid container spacing={3}>
            {blogPreview.map((post, i) => (
              <Grid key={post.slug} size={{ xs: 12, md: 4 }}>
                <Paper
                  component={RouterLink}
                  to={`/blog/${post.slug}`}
                  elevation={0}
                  sx={{
                    ...cardSx,
                    p: 0,
                    textDecoration: "none",
                    color: "inherit",
                    overflow: "hidden",
                    display: "block",
                  }}
                >
                  <Box
                    component="img"
                    src={post.image || blogCoverForSlug(post.slug, i)}
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
                  <Box sx={{ p: { xs: 2.5, sm: 3.25 } }}>
                    <Chip size="small" label={post.category[lang] || post.category.en} sx={{ mb: 1.5 }} />
                    <Typography variant="h4" component="h3" sx={{ fontSize: "1.15rem", mb: 1.5 }}>
                      {post.title[lang] || post.title.en}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.75 }}>
                      {post.summary[lang] || post.summary.en}
                    </Typography>
                    <Typography variant="caption" color="primary" fontWeight={700}>
                      {t("blogs.readMore")} →
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Button component={RouterLink} to="/blog" variant="contained">
              {t("blogs.viewAll")}
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Partners */}
      <Container component="section" maxWidth="lg" className="section-pad">
        <SectionTitle
          eyebrow={t("partners.eyebrow")}
          title={t("partners.title")}
          subtitle={t("partners.subtitle")}
        />
        <Grid container spacing={3} justifyContent="center">
          {PARTNERS.map((p) => (
            <Grid key={p.name} size={{ xs: 6, sm: 4, md: 3 }}>
              <Paper elevation={0} sx={{ ...cardSx, textAlign: "center" }}>
                <Avatar
                  src={p.logo}
                  alt={p.name}
                  sx={{
                    width: 56,
                    height: 56,
                    mx: "auto",
                    mb: 1.5,
                    bgcolor: brand.white,
                    border: `1px solid ${brand.line}`,
                  }}
                />
                <Typography variant="body2" fontWeight={700}>
                  {p.name}
                </Typography>
                <Chip size="small" label={t("partners.verified")} sx={{ mt: 1, height: 22 }} />
                <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
                  {p.blurb[lang] || p.blurb.en}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* FAQ preview */}
      <Box component="section" className="section-pad" sx={{ bgcolor: brand.white, px: 2 }}>
        <Container maxWidth="md">
          <SectionTitle
            eyebrow={t("faq.eyebrow")}
            title={t("faq.title")}
            subtitle={t("faq.subtitle")}
          />
          {faqPreview.map((item, idx) => (
            <Accordion
              key={idx}
              disableGutters
              elevation={0}
              sx={{
                border: `1px solid ${brand.line}`,
                mb: 1.5,
                borderRadius: `${brand.radiusBtn}px !important`,
                overflow: "hidden",
                "&:before": { display: "none" },
                boxShadow: "none",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`faq-${idx}`}
                id={`faq-h-${idx}`}
              >
                <Typography fontWeight={600}>{item.q[lang] || item.q.en}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                  {item.a[lang] || item.a.en}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Button component={RouterLink} to="/faq" variant="outlined">
              {t("faq.viewAll")}
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Newsletter */}
      <Container component="section" maxWidth="sm" className="section-pad">
        <Paper elevation={0} sx={{ ...cardSx, textAlign: "center", p: { xs: 3, sm: 4 } }}>
          <SectionTitle
            eyebrow={t("newsletter.eyebrow")}
            title={t("newsletter.title")}
            subtitle={t("newsletter.subtitle")}
          />
          {subscribed ? (
            <Typography color="primary" fontWeight={700}>
              {t("newsletter.success")}
            </Typography>
          ) : (
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mt: 1 }}>
              <TextField
                fullWidth
                type="email"
                label={t("newsletter.placeholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                inputProps={{ "aria-label": t("newsletter.placeholder") }}
              />
              <Button
                variant="contained"
                onClick={() => {
                  if (email.trim()) {
                    setSubscribed(true);
                    clearEmail();
                  }
                }}
              >
                {t("newsletter.cta")}
              </Button>
            </Stack>
          )}
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 2 }}>
            {t("newsletter.note")}
          </Typography>
        </Paper>
      </Container>

      {/* CTA */}
      <Box
        component="section"
        className="section-pad"
        sx={{
          px: 2,
          background: `linear-gradient(180deg, ${brand.primaryDark} 0%, ${brand.primary} 100%)`,
          color: brand.white,
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <SectionTitle
            light
            eyebrow={t("cta.eyebrow")}
            title={t("cta.title")}
            subtitle={t("cta.subtitle")}
          />
          <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap" useFlexGap sx={{ mt: 1 }}>
            <Button
              component={RouterLink}
              to="/donate-blood-form"
              variant="contained"
              size="large"
              startIcon={<HandshakeIcon />}
              sx={{
                bgcolor: brand.white,
                color: brand.primary,
                borderRadius: `${brand.radiusBtn}px`,
                "&:hover": { bgcolor: "#fff5f5" },
              }}
            >
              {t("cta.becomeDonor")}
            </Button>
            <Button
              component={RouterLink}
              to="/request-blood-form"
              variant="outlined"
              size="large"
              startIcon={<BloodtypeIcon />}
              sx={{
                borderColor: brand.white,
                color: brand.white,
                borderRadius: `${brand.radiusBtn}px`,
                borderWidth: 1.5,
                "&:hover": { borderWidth: 1.5, bgcolor: "rgba(255,255,255,0.1)" },
              }}
            >
              {t("cta.requestBlood")}
            </Button>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
