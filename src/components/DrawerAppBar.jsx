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

export default function DrawerAppBar({ children, windowRef }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const toggleDrawer = () => setMobileOpen((open) => !open);
  const closeDrawer = () => setMobileOpen(false);
  const location = useLocation();
  const { t, lang, setLang } = useLanguage();

  const navItems = [
    { label: t("nav.home"), path: "/", icon: <HomeRoundedIcon sx={{ fontSize: 20 }} /> },
    { label: t("nav.about"), path: "/about", icon: <InfoOutlinedIcon sx={{ fontSize: 20 }} /> },
    { label: t("nav.knowledge"), path: "/knowledge", icon: <MenuBookRoundedIcon sx={{ fontSize: 20 }} /> },
    { label: t("nav.blog"), path: "/blog", icon: <ArticleRoundedIcon sx={{ fontSize: 20 }} /> },
    { label: t("nav.donors"), path: "/recent-donors", icon: <VolunteerActivismRoundedIcon sx={{ fontSize: 20 }} /> },
    { label: t("nav.bloodGroup"), path: "/blood-group", icon: <BloodtypeRoundedIcon sx={{ fontSize: 20 }} /> },
    { label: t("nav.faq"), path: "/faq", icon: <HelpOutlineRoundedIcon sx={{ fontSize: 20 }} /> },
    { label: t("nav.contact"), path: "/contact", icon: <ContactMailRoundedIcon sx={{ fontSize: 20 }} /> },
    { label: t("nav.team"), path: "/team", icon: <GroupsRoundedIcon sx={{ fontSize: 20 }} /> },
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
        bgcolor: "transparent",
        border: "none",
        gap: 0.5,
        "& .MuiToggleButtonGroup-grouped": {
          border: "none !important",
          borderRadius: "6px !important",
          mx: 0,
        },
        "& .MuiToggleButton-root": {
          px: 1,
          py: 0.35,
          minWidth: 36,
          fontSize: 11,
          fontWeight: 700,
          lineHeight: 1.2,
          color: brand.muted,
          textTransform: "none",
          "&.Mui-selected": {
            bgcolor: brand.accentSoft,
            color: brand.primary,
          },
          "&:hover": {
            bgcolor: "rgba(0,0,0,0.04)",
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
          bgcolor: brand.white,
          color: brand.ink,
          borderBottom: `1px solid ${brand.line}`,
          boxShadow: "none",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            gap: 0.5,
            minHeight: { xs: 52, sm: 56 } ,
            px: { xs: 1, sm: 2 },
          }}
        >
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleDrawer}
            aria-label={t("nav.menu")}
            size="small"
            sx={{
              display: { xs: "inline-flex", lg: "none" },
              border: "none",
              borderRadius: 1,
              p: 1,
              color: brand.ink,
              "&:hover": { bgcolor: "rgba(0,0,0,0.04)" },
            }}
          >
            <MenuIcon sx={{ fontSize: 22 }} />
          </IconButton>

          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
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
                height: { xs: 32, sm: 36 },
                width: { xs: 32, sm: 36 },
                objectFit: "contain",
                flexShrink: 0,
              }}
            />
            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontFamily: '"Manrope", "Inter", sans-serif',
                  fontWeight: 700,
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                  lineHeight: 1.2,
                  color: brand.ink,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {t("brand.name")}
              </Typography>
              <Typography
                sx={{
                  display: { xs: "none", sm: "block" },
                  color: brand.muted,
                  fontSize: "0.7rem",
                  lineHeight: 1.2,
                }}
              >
                {t("brand.tagline")}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: { xs: "none", lg: "flex" },
              gap: 0,
              flexWrap: "wrap",
              justifyContent: "flex-end",
              maxWidth: 560,
            }}
          >
            {navItems.slice(0, 6).map(({ label, path }) => {
              const active = isActive(path);
              return (
                <Button
                  key={path}
                  component={RouterLink}
                  to={path}
                  size="small"
                  disableElevation
                  sx={{
                    color: active ? brand.primary : brand.body,
                    bgcolor: "transparent",
                    borderRadius: 1,
                    px: 1.25,
                    minHeight: 36,
                    minWidth: 0,
                    fontSize: "0.8125rem",
                    fontWeight: active ? 700 : 500,
                    boxShadow: "none",
                    "&:hover": {
                      bgcolor: "rgba(0,0,0,0.04)",
                      color: brand.primary,
                      transform: "none",
                    },
                  }}
                >
                  {label}
                </Button>
              );
            })}
          </Box>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>{LangToggle}</Box>
        </Toolbar>
      </AppBar>

      <Drawer
        container={container}
        open={mobileOpen}
        onClose={closeDrawer}
        variant="temporary"
        ModalProps={{ keepMounted: true }}
        transitionDuration={{ enter: 220, exit: 180 }}
        sx={{
          display: { xs: "block", lg: "none" },
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          },
          "& .MuiDrawer-paper": {
            width: "min(82vw, 300px)",
            boxSizing: "border-box",
            border: "none",
            borderRadius: 0,
            bgcolor: brand.white,
            boxShadow: "2px 0 16px rgba(0,0,0,0.12)",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        {/* Flat header — Facebook-like workspace */}
        <Box
          sx={{
            px: 1.5,
            py: 1.25,
            display: "flex",
            alignItems: "center",
            gap: 1,
            borderBottom: `1px solid ${brand.line}`,
            bgcolor: brand.white,
            minHeight: 52,
          }}
        >
          <Box
            component="img"
            src="/logo.png"
            alt=""
            sx={{
              width: 34,
              height: 34,
              objectFit: "contain",
              flexShrink: 0,
            }}
          />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              sx={{
                fontFamily: '"Manrope", "Inter", sans-serif',
                fontWeight: 700,
                fontSize: "0.9rem",
                lineHeight: 1.2,
                color: brand.ink,
              }}
            >
              {t("brand.name")}
            </Typography>
            <Typography sx={{ fontSize: "0.7rem", color: brand.muted, lineHeight: 1.2 }}>
              {t("nav.menu")}
            </Typography>
          </Box>
          <IconButton
            onClick={closeDrawer}
            aria-label={t("nav.close")}
            size="small"
            sx={{
              color: brand.muted,
              border: "none",
              borderRadius: 1,
              p: 0.75,
              "&:hover": { bgcolor: "rgba(0,0,0,0.04)", color: brand.ink },
            }}
          >
            <CloseRoundedIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>

        <Box
          sx={{
            px: 1.5,
            py: 1,
            borderBottom: `1px solid ${brand.line}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontSize: "0.75rem", color: brand.muted, fontWeight: 600 }}>
            {t("nav.language")}
          </Typography>
          {LangToggle}
        </Box>

        <Box sx={{ flex: 1, overflowY: "auto", py: 0.5 }}>
          <List disablePadding>
            {navItems.map(({ label, path, icon }) => {
              const active = isActive(path);
              return (
                <ListItem key={path} disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to={path}
                    onClick={closeDrawer}
                    selected={active}
                    sx={{
                      py: 1,
                      px: 1.75,
                      minHeight: 44,
                      borderRadius: 0,
                      borderLeft: active ? `3px solid ${brand.primary}` : "3px solid transparent",
                      bgcolor: active ? brand.accentSoft : "transparent",
                      "&.Mui-selected": {
                        bgcolor: brand.accentSoft,
                        color: brand.primary,
                      },
                      "&.Mui-selected:hover": {
                        bgcolor: brand.accentSoft,
                      },
                      "&:hover": {
                        bgcolor: "rgba(0,0,0,0.04)",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 36,
                        color: active ? brand.primary : brand.muted,
                      }}
                    >
                      {icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={label}
                      primaryTypographyProps={{
                        fontSize: "0.875rem",
                        fontWeight: active ? 700 : 500,
                        color: active ? brand.primary : brand.ink,
                        lineHeight: 1.3,
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>

          <Divider sx={{ my: 1 }} />
          <Typography
            sx={{
              px: 1.75,
              pt: 0.5,
              pb: 1,
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: brand.muted,
            }}
          >
            {t("nav.quickActions")}
          </Typography>
          <Stack spacing={1} sx={{ px: 1.5, pb: 2 }}>
            <Button
              component={RouterLink}
              to="/donate-blood-form"
              variant="contained"
              fullWidth
              startIcon={<HandshakeRoundedIcon sx={{ fontSize: 18 }} />}
              onClick={closeDrawer}
              sx={{
                minHeight: 42,
                borderRadius: "8px",
                fontSize: "0.875rem",
                fontWeight: 700,
                boxShadow: "none",
                "&:hover": { boxShadow: "none", transform: "none" },
              }}
            >
              {t("nav.becomeDonor")}
            </Button>
            <Button
              component={RouterLink}
              to="/request-blood-form"
              variant="outlined"
              fullWidth
              startIcon={<BloodtypeRoundedIcon sx={{ fontSize: 18 }} />}
              onClick={closeDrawer}
              sx={{
                minHeight: 42,
                borderRadius: "8px",
                fontSize: "0.875rem",
                fontWeight: 700,
                borderWidth: 1,
                "&:hover": { borderWidth: 1, transform: "none" },
              }}
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
