import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  Drawer,
  useMediaQuery
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import MenuIcon from "@mui/icons-material/Menu";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:900px)");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(!isMobile);
  }, [isMobile]);

  const SidebarContent = (
    <Box
      sx={{
        width: 240,
        height: "100vh",
        borderRight: "1px solid #E5E5E5",
        background: "#fff",
        p: 2,
        boxSizing: "border-box",
      }}
    >
      <Typography variant="h6" fontWeight={700} textAlign="center" mb={3}>
        CV Builder
      </Typography>

      <List>
        <ListItemButton onClick={() => navigate("/dashboard")}>
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/layout")}>
          <ListItemIcon><DescriptionIcon /></ListItemIcon>
          <ListItemText primary="Templates" />
        </ListItemButton>

        <ListItemButton
          sx={{ mt: 4, color: "red" }}
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          <ListItemIcon sx={{ color: "red" }}><ExitToAppIcon /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <Box>
      {isMobile ? (
        <>
          <IconButton
            sx={{ position: "fixed", top: 10, left: 10, zIndex: 2000 }}
            onClick={() => setOpen(true)}
            aria-label="open menu"
          >
            <MenuIcon />
          </IconButton>

          <Drawer
            open={open}
            onClose={() => setOpen(false)}
            ModalProps={{ keepMounted: true }}
            PaperProps={{ sx: { width: 240 } }}
          >
            {SidebarContent}
          </Drawer>
        </>
      ) : (
        <Box sx={{ position: "fixed", left: 0, top: 0, zIndex: 1200 }}>
          {SidebarContent}
        </Box>
      )}
    </Box>
  );
}
