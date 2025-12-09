import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const drawerWidth = 240;

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width:900px)");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(!isMobile);
  }, [isMobile]);

  const navItems = useMemo(
    () => [
      { label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
      { label: "Templates", icon: <DescriptionIcon />, path: "/layout" },
    ],
    []
  );

  const isActive = (path: string) => location.pathname.startsWith(path);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const SidebarContent = (
    <Box
      sx={{
        width: drawerWidth,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid #E5E5E5",
        bgcolor: "#ffffff",
      }}
    >
      {/* Brand / header */}
      <Box
        sx={{
          px: 2,
          py: 2,
          borderBottom: "1px solid #F1F1F1",
        }}
      >
        <Typography
          variant="h6"
          fontWeight={800}
          textAlign="center"
          sx={{ letterSpacing: 0.5 }}
        >
          CV Builder
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          textAlign="center"
          display="block"
          mt={0.5}
        >
          Create and manage resumes
        </Typography>
      </Box>

      {/* Nav list */}
      <Box sx={{ flex: 1, overflow: "auto", mt: 1 }}>
        <List disablePadding>
          {navItems.map((item) => (
            <ListItemButton
              key={item.path}
              onClick={() => {
                navigate(item.path);
                if (isMobile) setOpen(false);
              }}
              selected={isActive(item.path)}
              sx={{
                mx: 1,
                borderRadius: 1.5,
                mt: 0.5,
                "&.Mui-selected": {
                  bgcolor: "rgba(74,79,241,0.08)",
                  "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                    color: "primary.main",
                  },
                },
                "&:hover": {
                  bgcolor: "rgba(15,23,42,0.04)",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>

      {/* Logout */}
      <Box sx={{ borderTop: "1px solid #F1F1F1", p: 1.5 }}>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 1.5,
            color: "error.main",
            "& .MuiListItemIcon-root": { color: "error.main" },
            "&:hover": {
              bgcolor: "rgba(239,68,68,0.06)",
            },
          }}
        >
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Mobile menu button */}
      {isMobile && (
        <IconButton
          sx={{
            position: "fixed",
            top: 12,
            left: 12,
            zIndex: 2000,
            bgcolor: "white",
            boxShadow: 1,
            "&:hover": { bgcolor: "#F3F4F6" },
          }}
          onClick={() => setOpen(true)}
          aria-label="open menu"
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* Drawer for both mobile and desktop */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={open}
        onClose={() => setOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        {SidebarContent}
      </Drawer>
    </>
  );
}
