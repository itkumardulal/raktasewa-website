import React from "react";
import {
  Box,
  Typography,
  Grid,
  Avatar,
  Container,
  Stack,
  Link as MuiLink,
  Divider,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { brand } from "../constants/brand";
import { PARTNERS } from "../data/partners";
import { useLanguage } from "../i18n/LanguageContext";

export default function Footer() {
  const { t, lang } = useLanguage();
  const year = new Date().getFullYear();

  const quick = [
    { to: "/about", label: t("nav.about") },
    { to: "/recent-donors", label: t("nav.donors") },
    { to: "/donate-blood-form", label: t("nav.becomeDonor") },
    { to: "/request-blood-form", label: t("nav.requestBlood") },
  ];
  const resources = [
    { to: "/knowledge", label: t("nav.knowledge") },
    { to: "/how-it-works", label: t("nav.howItWorks") },
    { to: "/blog", label: t("nav.blog") },
    { to: "/blood-group", label: t("nav.bloodGroup") },
    { to: "/faq", label: t("nav.faq") },
  ];
  const community = [
    { to: "/team", label: t("nav.team") },
    { to: "/contact", label: t("nav.contact") },
    { to: "/recent-donors", label: t("nav.donors") },
  ];

  return (
    <Box
      component="footer"
      sx={{
        mt: 0,
        pt: { xs: 6, md: 8 },
        pb: 3,
        px: 2,
        background: `linear-gradient(180deg, ${brand.surfaceAlt} 0%, ${brand.surface} 100%)`,
        borderTop: `1px solid ${brand.line}`,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          align="center"
          sx={{ color: brand.ink, mb: 1.5 }}
        >
          {t("partners.title")}
        </Typography>
        <Typography
          color="text.secondary"
          align="center"
          className="readable"
          sx={{ mb: 5, mx: "auto", lineHeight: 1.8 }}
        >
          {t("partners.subtitle")}
        </Typography>

        <Grid container spacing={2} justifyContent="center" sx={{ mb: 5 }}>
          {PARTNERS.map((partner) => (
            <Grid key={partner.name} size={{ xs: 6, sm: 4, md: 3 }}>
              <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
                <Avatar
                  src={partner.logo}
                  alt={partner.name}
                  sx={{
                    width: 64,
                    height: 64,
                    mb: 1,
                    bgcolor: brand.white,
                    border: `1px solid ${brand.line}`,
                  }}
                />
                <Typography variant="body2" fontWeight={600} sx={{ maxWidth: 140 }}>
                  {partner.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {partner.blurb[lang] || partner.blurb.en}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ mb: 4 }} />

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
              <Box
                component="img"
                src="/logo.png"
                alt=""
                sx={{
                  width: 48,
                  height: 48,
                  objectFit: "contain",
                  borderRadius: "50%",
                  border: `1px solid ${brand.line}`,
                  bgcolor: brand.white,
                  p: 0.35,
                }}
              />
              <Typography fontWeight={700}>
                {t("brand.name")} ({t("brand.nameNp")})
              </Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t("footer.aboutBody")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t("brand.tagline")}
            </Typography>
          </Grid>
          <Grid size={{ xs: 6, sm: 4, md: 2 }}>
            <Typography fontWeight={700} sx={{ mb: 1 }}>{t("footer.quickLinks")}</Typography>
            <Stack spacing={0.75}>
              {quick.map((l) => (
                <MuiLink key={l.to} component={RouterLink} to={l.to} underline="hover" color="text.secondary" variant="body2">
                  {l.label}
                </MuiLink>
              ))}
            </Stack>
          </Grid>
          <Grid size={{ xs: 6, sm: 4, md: 2 }}>
            <Typography fontWeight={700} sx={{ mb: 1 }}>{t("footer.resources")}</Typography>
            <Stack spacing={0.75}>
              {resources.map((l) => (
                <MuiLink key={l.to} component={RouterLink} to={l.to} underline="hover" color="text.secondary" variant="body2">
                  {l.label}
                </MuiLink>
              ))}
            </Stack>
          </Grid>
          <Grid size={{ xs: 6, sm: 4, md: 2 }}>
            <Typography fontWeight={700} sx={{ mb: 1 }}>{t("footer.community")}</Typography>
            <Stack spacing={0.75}>
              {community.map((l) => (
                <MuiLink key={l.to} component={RouterLink} to={l.to} underline="hover" color="text.secondary" variant="body2">
                  {l.label}
                </MuiLink>
              ))}
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, sm: 8, md: 2 }}>
            <Typography fontWeight={700} sx={{ mb: 1 }}>{t("footer.emergency")}</Typography>
            <Typography variant="body2" color="text.secondary">
              {t("footer.emergencyNote")}
            </Typography>
          </Grid>
        </Grid>

        <Typography variant="body2" color="text.secondary" align="center">
          © {year} {t("brand.name")} ({t("brand.nameNp")}). {t("footer.rights")}
        </Typography>
        <Typography variant="caption" color="text.secondary" align="center" display="block" sx={{ mt: 0.5 }}>
          {t("footer.powered")} · {t("footer.made")}
        </Typography>
      </Container>
    </Box>
  );
}
