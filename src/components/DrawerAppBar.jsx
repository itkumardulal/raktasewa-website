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
  ListItemText,
  CssBaseline,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as RouterLink } from "react-router-dom";

const maroon = "#800000";

const navItems = [
  { label: "🏠 Home", path: "/" },
  { label: "📜About", path: "/about" },
  { label: "👨‍👨‍👦‍👦 Our Team", path: "/team" },
  { label: "🩸Blood Group", path: "/blood-group" },
  { label: "🤝 Donors", path: "/recent-donors" },
];

const drawerWidth = 240; // desktop / tablet width
const mobileDrawerWidth = 320; // new wider size for phones

export default function DrawerAppBar({ children, windowRef }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  const container =
    windowRef !== undefined
      ? () => windowRef().document.body
      : () => window.document.body;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />

      {/* ─── TOP BAR ─── */}
      <AppBar position="static" sx={{ bgcolor: maroon }}>
        <Toolbar>
          {/* hamburger (mobile only) */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 1, display: { xs: "flex", sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          {/* logo + title */}
          <Box
            component="img"
            src="/qr_code.jpeg" /* path relative to public root */
            alt="Emergency Blood Provider"
            sx={{ height: 32, mr: 1 }} /* adjust height / margin as you like */
          />
          <Typography
            variant="h6"
            component={RouterLink} // ← renders as <a> managed by react-router
            to="/" // ← go to Home
            sx={{
              flexGrow: 1,
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
              "&:hover": {
                textDecoration: "none", // no underline
                color: "inherit", // no colour shift
              },
            }}
          >
            Emergency Blood Provider
          </Typography>

          {/* desktop menu */}
          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2 }}>
            {navItems.map(({ label, path }) => (
              <Button
                key={label}
                component={RouterLink}
                to={path}
                sx={{
                  color: "#fff", // normal state
                  textDecoration: "none", // remove underline on <a>
                  "&:hover": {
                    color: "#fff", // ← keep white on hover
                    backgroundColor: "rgba(255,255,255,0.15)",
                  },
                }}
              >
                {label.toUpperCase()}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      {/* ─── MOBILE DRAWER ─── */}
      <Drawer
        container={container}
        open={mobileOpen}
        onClose={toggleDrawer}
        variant="temporary"
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            width: { xs: mobileDrawerWidth, sm: drawerWidth }, // ← responsive
            boxSizing: "border-box",
          },
        }}
      >
        <List>
          {navItems.map(({ label, path }) => (
            <ListItem key={label} disablePadding>
              <ListItemButton
                component={RouterLink}
                to={path}
                onClick={toggleDrawer}
                sx={{
                  textAlign: "center",
                  color: "#000", // drawer text colour
                  "&:hover": { color: maroon }, // or keep black – your choice
                }}
              >
                <ListItemText primary={label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* ─── PAGE CONTENT ─── */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
