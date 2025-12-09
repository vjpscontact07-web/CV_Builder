import React from "react";
import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const SIDEBAR_WIDTH = 240;
const TOPBAR_HEIGHT = 64;

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <Box
      sx={{
        // global guard against horizontal scroll
        overflowX: "hidden",
        boxSizing: "border-box",
        minHeight: "100vh",
        width: "100vw",
        bgcolor: "background.default",
      }}
    >
      <Sidebar />
      <Topbar />
      
      <Box
        component="main"
        sx={{
          // don't use 100vw — use width and left margin instead
          width: { xs: "100%", md: `calc(100% - ${SIDEBAR_WIDTH}px)` },
          ml: { xs: 0, md: `${SIDEBAR_WIDTH}px` }, // offset for fixed sidebar
          pt: `${TOPBAR_HEIGHT}px`, // push content below topbar
          minHeight: `calc(100vh - ${TOPBAR_HEIGHT}px)`,
          boxSizing: "border-box",
          p: 2,
          overflowY: "auto", // content scrolls vertically
          mt:7
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
