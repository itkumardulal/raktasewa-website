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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import BloodtypeRoundedIcon from "@mui/icons-material/BloodtypeRounded";
import VolunteerActivismRoundedIcon from "@mui/icons-material/VolunteerActivismRounded";
import HandshakeRoundedIcon from "@mui/icons-material/HandshakeRounded";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { brand } from "../constants/brand";

const navItems = [
  { label: "Home", path: "/", icon: <HomeRoundedIcon fontSize="small" /> },
  { label: "About", path: "/about", icon: <InfoOutlinedIcon fontSize="small" /> },
  {
    label: "Our Team",
    path: "/team",
    icon: <GroupsRoundedIcon fontSize="small" />,
  },
  {
    label: "Blood Group",
    path: "/blood-group",
    icon: <BloodtypeRoundedIcon fontSize="small" />,
  },
  {
    label: "Donors",
    path: "/recent-donors",
    icon: <VolunteerActivismRoundedIcon fontSize="small" />,
  },
];

const drawerWidth = 300;

export default function DrawerAppBar({ children, windowRef }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const toggleDrawer = () => setMobileOpen((open) => !open);
  const closeDrawer = () => setMobileOpen(false);
  const location = useLocation();

  const container =
    windowRef !== undefined
      ? () => windowRef().document.body
      : () => window.document.body;

  const isActive = (path) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "rgba(255, 248, 247, 0.92)",
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
            aria-label="Open navigation menu"
            sx={{
              mr: 0.5,
              display: { xs: "inline-flex", sm: "none" },
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
              src="/qr_code.jpeg"
              alt="Emergency Blood Provider"
              sx={{
                height: 40,
                width: 40,
                borderRadius: "50%",
                objectFit: "cover",
                border: `2px solid ${brand.primary}`,
                flexShrink: 0,
              }}
            />
            <Box sx={{ minWidth: 0 }}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "Fraunces, Georgia, serif",
                  fontWeight: 700,
                  fontSize: { xs: "0.95rem", sm: "1.2rem" },
                  lineHeight: 1.15,
                  color: brand.primary,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Emergency Blood Provider
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  display: { xs: "none", sm: "block" },
                  color: brand.muted,
                  letterSpacing: "0.04em",
                }}
              >
                Donate · Request · Save lives
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 0.5 }}>
            {navItems.map(({ label, path }) => {
              const active = isActive(path);
              return (
                <Button
                  key={label}
                  component={RouterLink}
                  to={path}
                  sx={{
                    color: active ? brand.primary : brand.ink,
                    bgcolor: active ? "rgba(139, 21, 56, 0.08)" : "transparent",
                    px: 1.5,
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
        </Toolbar>
      </AppBar>

      {/* Mobile side navigation */}
      <Drawer
        container={container}
        open={mobileOpen}
        onClose={closeDrawer}
        variant="temporary"
        ModalProps={{ keepMounted: true }}
        transitionDuration={{ enter: 280, exit: 220 }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(26, 21, 35, 0.45)",
            backdropFilter: "blur(4px)",
          },
          "& .MuiDrawer-paper": {
            width: "min(86vw, 320px)",
            boxSizing: "border-box",
            border: "none",
            background: `
              linear-gradient(165deg, ${brand.white} 0%, ${brand.surface} 55%, #f7eef1 100%)
            `,
            boxShadow: "8px 0 40px rgba(26, 21, 35, 0.18)",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        {/* Header */}
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
            src="/qr_code.jpeg"
            alt=""
            sx={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid rgba(255,255,255,0.85)",
              flexShrink: 0,
            }}
          />
          <Box sx={{ flex: 1, minWidth: 0, pt: 0.25 }}>
            <Typography
              sx={{
                fontFamily: "Fraunces, Georgia, serif",
                fontWeight: 700,
                fontSize: "1.05rem",
                lineHeight: 1.2,
              }}
            >
              Emergency Blood Provider
            </Typography>
            <Typography
              variant="caption"
              sx={{ opacity: 0.85, display: "block", mt: 0.5 }}
            >
              Menu
            </Typography>
          </Box>
          <IconButton
            onClick={closeDrawer}
            aria-label="Close navigation menu"
            size="small"
            sx={{
              color: brand.white,
              bgcolor: "rgba(255,255,255,0.12)",
              "&:hover": { bgcolor: "rgba(255,255,255,0.22)" },
            }}
          >
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Links */}
        <Box sx={{ flex: 1, overflowY: "auto", py: 1.5, px: 1.25 }}>
          <Typography
            variant="overline"
            sx={{
              px: 2,
              color: brand.muted,
              letterSpacing: "0.12em",
              fontWeight: 700,
            }}
          >
            Navigate
          </Typography>
          <List disablePadding sx={{ mt: 0.5 }}>
            {navItems.map(({ label, path, icon }) => {
              const active = isActive(path);
              return (
                <ListItem key={label} disablePadding sx={{ mb: 0.5 }}>
                  <ListItemButton
                    component={RouterLink}
                    to={path}
                    onClick={closeDrawer}
                    selected={active}
                    sx={{
                      borderRadius: 2.5,
                      py: 1.35,
                      px: 1.75,
                      gap: 0.5,
                      color: active ? brand.primary : brand.ink,
                      bgcolor: active ? "rgba(139, 21, 56, 0.09)" : "transparent",
                      border: active
                        ? `1px solid ${brand.line}`
                        : "1px solid transparent",
                      transition: "background-color 0.2s ease, transform 0.2s ease",
                      "&:hover": {
                        bgcolor: "rgba(139, 21, 56, 0.08)",
                        color: brand.primary,
                      },
                      "&.Mui-selected:hover": {
                        bgcolor: "rgba(139, 21, 56, 0.12)",
                      },
                      "& .MuiListItemIcon-root": {
                        minWidth: 40,
                        color: "inherit",
                      },
                    }}
                  >
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText
                      primary={label}
                      primaryTypographyProps={{
                        fontWeight: active ? 800 : 600,
                        fontSize: "0.95rem",
                      }}
                    />
                    {active && (
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          bgcolor: brand.primary,
                          flexShrink: 0,
                        }}
                      />
                    )}
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>

        <Divider sx={{ borderColor: brand.line }} />

        {/* Quick actions — same routes as Home CTAs */}
        <Box sx={{ p: 2 }}>
          <Typography
            variant="overline"
            sx={{
              px: 0.5,
              color: brand.muted,
              letterSpacing: "0.12em",
              fontWeight: 700,
            }}
          >
            Quick actions
          </Typography>
          <Stack spacing={1.25} sx={{ mt: 1 }}>
            <Button
              component={RouterLink}
              to="/donate-blood-form"
              onClick={closeDrawer}
              variant="contained"
              color="primary"
              fullWidth
              startIcon={<HandshakeRoundedIcon />}
              sx={{ py: 1.2, justifyContent: "flex-start", pl: 2 }}
            >
              Become a donor
            </Button>
            <Button
              component={RouterLink}
              to="/request-blood-form"
              onClick={closeDrawer}
              variant="outlined"
              color="primary"
              fullWidth
              startIcon={<BloodtypeRoundedIcon />}
              sx={{
                py: 1.2,
                justifyContent: "flex-start",
                pl: 2,
                borderWidth: 1.5,
              }}
            >
              Request blood
            </Button>
          </Stack>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", mt: 2, textAlign: "center" }}
          >
            Donate · Request · Save lives
          </Typography>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  windowRef: PropTypes.func,
  children: PropTypes.node,
};
