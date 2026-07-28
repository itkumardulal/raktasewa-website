// components/DrawerAppBar.jsx
import * as React from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Divider,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import BloodtypeRoundedIcon from "@mui/icons-material/BloodtypeRounded";
import VolunteerActivismRoundedIcon from "@mui/icons-material/VolunteerActivismRounded";
import HandshakeRoundedIcon from "@mui/icons-material/HandshakeRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import ContactMailRoundedIcon from "@mui/icons-material/ContactMailRounded";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { brand } from "../constants/brand";
import { useLanguage } from "../i18n/LanguageContext";

const drawerWidth = 300;

export default function DrawerAppBar({ children, windowRef }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const toggleDrawer = () => setMobileOpen((open) => !open);
  const closeDrawer = () => setMobileOpen(false);
  const location = useLocation();
  const { t, lang, setLang } = useLanguage();

  const navItems = [
    { label: t("nav.home"), path: "/", icon: <HomeRoundedIcon fontSize="small" /> },
    { label: t("nav.about"), path: "/about", icon: <InfoOutlinedIcon fontSize="small" /> },
    { label: t("nav.knowledge"), path: "/knowledge", icon: <MenuBookRoundedIcon fontSize="small" /> },
    { label: t("nav.blog"), path: "/blog", icon: <ArticleRoundedIcon fontSize="small" /> },
    { label: t("nav.donors"), path: "/recent-donors", icon: <VolunteerActivismRoundedIcon fontSize="small" /> },
    { label: t("nav.bloodGroup"), path: "/blood-group", icon: <BloodtypeRoundedIcon fontSize="small" /> },
    { label: t("nav.faq"), path: "/faq", icon: <HelpOutlineRoundedIcon fontSize="small" /> },
    { label: t("nav.contact"), path: "/contact", icon: <ContactMailRoundedIcon fontSize="small" /> },
    { label: t("nav.team"), path: "/team", icon: <GroupsRoundedIcon fontSize="small" /> },
  ];

  const container =
    windowRef !== undefined
      ? () => windowRef().document.body
      : () => window.document.body;

  const isActive = (path) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

  const LangToggle = (
    <ToggleButtonGroup
      exclusive
      size="small"
      value={lang}
      onChange={(_e, next) => next && setLang(next)}
      aria-label={t("nav.language")}
      sx={{
        bgcolor: brand.white,
        border: `1px solid ${brand.line}`,
        "& .MuiToggleButton-root": {
          px: 1,
          py: 0.25,
          fontSize: 12,
          fontWeight: 700,
          border: "none",
          color: brand.muted,
          "&.Mui-selected": {
            bgcolor: brand.accentSoft,
            color: brand.primary,
          },
        },
      }}
    >
      <ToggleButton value="en">EN</ToggleButton>
      <ToggleButton value="ne">ने</ToggleButton>
    </ToggleButtonGroup>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "rgba(250, 250, 250, 0.92)",
          color: brand.ink,
          backdropFilter: "blur(14px)",
          borderBottom: `1px solid ${brand.line}`,
        }}
      >
        <Toolbar sx={{ gap: 1, minHeight: { xs: 64, sm: 72 } }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleDrawer}
            aria-label={t("nav.menu")}
            sx={{
              mr: 0.5,
              display: { xs: "inline-flex", md: "none" },
              border: `1px solid ${brand.line}`,
              borderRadius: 2,
            }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.25,
              color: "inherit",
              textDecoration: "none",
              flexGrow: 1,
              minWidth: 0,
            }}
          >
            <Box
              component="img"
              src="/logo.png"
              alt={`${t("brand.name")} (${t("brand.nameNp")})`}
              sx={{
                height: 44,
                width: 44,
                borderRadius: "50%",
                objectFit: "contain",
                bgcolor: brand.white,
                border: `1px solid ${brand.line}`,
                flexShrink: 0,
                p: 0.35,
              }}
            />
            <Box sx={{ minWidth: 0 }}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: '"Manrope", "Inter", sans-serif',
                  fontWeight: 700,
                  fontSize: { xs: "0.95rem", sm: "1.15rem" },
                  lineHeight: 1.15,
                  color: brand.primary,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {t("brand.name")} · {t("brand.nameNp")}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  display: { xs: "none", sm: "block" },
                  color: brand.muted,
                  letterSpacing: "0.02em",
                }}
              >
                {t("brand.tagline")}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: { xs: "none", lg: "flex" }, gap: 0.25, flexWrap: "wrap", justifyContent: "flex-end", maxWidth: 560 }}>
            {navItems.slice(0, 6).map(({ label, path }) => {
              const active = isActive(path);
              return (
                <Button
                  key={path}
                  component={RouterLink}
                  to={path}
                  size="small"
                  sx={{
                    color: active ? brand.primary : brand.ink,
                    bgcolor: active ? "rgba(139, 21, 56, 0.08)" : "transparent",
                    px: 1.25,
                    minWidth: 0,
                    "&:hover": {
                      bgcolor: "rgba(139, 21, 56, 0.1)",
                      color: brand.primary,
                    },
                  }}
                >
                  {label}
                </Button>
              );
            })}
          </Box>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>{LangToggle}</Box>

          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleDrawer}
            aria-label={t("nav.menu")}
            sx={{
              display: { xs: "none", md: "inline-flex", lg: "none" },
              border: `1px solid ${brand.line}`,
              borderRadius: 2,
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        container={container}
        open={mobileOpen}
        onClose={closeDrawer}
        variant="temporary"
        ModalProps={{ keepMounted: true }}
        transitionDuration={{ enter: 280, exit: 220 }}
        sx={{
          display: { xs: "block", lg: "none" },
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(26, 21, 35, 0.45)",
            backdropFilter: "blur(4px)",
          },
          "& .MuiDrawer-paper": {
            width: "min(86vw, 320px)",
            boxSizing: "border-box",
            border: "none",
            background: brand.white,
            boxShadow: "8px 0 40px rgba(15, 23, 42, 0.12)",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <Box
          sx={{
            px: 2.5,
            pt: 2.5,
            pb: 2,
            display: "flex",
            alignItems: "flex-start",
            gap: 1.5,
            background: `linear-gradient(135deg, ${brand.primaryDark}, ${brand.primary})`,
            color: brand.white,
          }}
        >
          <Box
            component="img"
            src="/logo.png"
            alt=""
            sx={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              objectFit: "contain",
              bgcolor: brand.white,
              border: "2px solid rgba(255,255,255,0.85)",
              flexShrink: 0,
              p: 0.35,
            }}
          />
          <Box sx={{ flex: 1, minWidth: 0, pt: 0.25 }}>
            <Typography sx={{ fontFamily: '"Manrope", "Inter", sans-serif', fontWeight: 700, fontSize: "1.05rem", lineHeight: 1.2 }}>
              {t("brand.name")}
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.85, display: "block", mt: 0.5 }}>
              {t("nav.menu")}
            </Typography>
          </Box>
          <IconButton
            onClick={closeDrawer}
            aria-label={t("nav.close")}
            size="small"
            sx={{ color: brand.white, bgcolor: "rgba(255,255,255,0.12)", "&:hover": { bgcolor: "rgba(255,255,255,0.22)" } }}
          >
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box sx={{ px: 2, py: 1.5 }}>{LangToggle}</Box>

        <Box sx={{ flex: 1, overflowY: "auto", py: 1.5, px: 1.25 }}>
          <List disablePadding>
            {navItems.map(({ label, path, icon }) => {
              const active = isActive(path);
              return (
                <ListItem key={path} disablePadding sx={{ mb: 0.5 }}>
                  <ListItemButton
                    component={RouterLink}
                    to={path}
                    onClick={closeDrawer}
                    selected={active}
                    sx={{
                      borderRadius: 2,
                      "&.Mui-selected": {
                        bgcolor: "rgba(139, 21, 56, 0.1)",
                        color: brand.primary,
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40, color: active ? brand.primary : brand.muted }}>
                      {icon}
                    </ListItemIcon>
                    <ListItemText primary={label} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>

          <Divider sx={{ my: 2 }} />
          <Typography variant="overline" sx={{ px: 2, color: brand.muted, fontWeight: 700 }}>
            {t("nav.quickActions")}
          </Typography>
          <Stack spacing={1} sx={{ px: 1.5, mt: 1, pb: 2 }}>
            <Button
              component={RouterLink}
              to="/donate-blood-form"
              variant="contained"
              fullWidth
              startIcon={<HandshakeRoundedIcon />}
              onClick={closeDrawer}
            >
              {t("nav.becomeDonor")}
            </Button>
            <Button
              component={RouterLink}
              to="/request-blood-form"
              variant="outlined"
              fullWidth
              startIcon={<BloodtypeRoundedIcon />}
              onClick={closeDrawer}
            >
              {t("nav.requestBlood")}
            </Button>
          </Stack>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, width: "100%" }}>
        {children}
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  children: PropTypes.node,
  windowRef: PropTypes.func,
};
