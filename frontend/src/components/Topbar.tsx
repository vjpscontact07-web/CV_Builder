import { AppBar, Toolbar, Typography, Avatar, Box } from "@mui/material";

export default function Topbar() {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: "#FFFFFF",
        borderBottom: "1px solid #E5E5E5",
        height: 64,
        left: { md: 240, xs: 0 },
        width: { xs: "100%", md: "calc(100% - 240px)" },
        boxSizing: "border-box",
        zIndex: (theme) => theme.zIndex.appBar,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          minHeight: 64,
          px: { xs: 2, md: 3 },
        }}
      >
        {/* Left side: app / page title */}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{
              textTransform: "uppercase",
              letterSpacing: 0.6,
              fontSize: 11,
            }}
          >
            CV Builder
          </Typography>
          <Typography
            variant="h6"
            fontWeight={600}
            color="#111827"
            fontSize={18}
          >
            Dashboard
          </Typography>
        </Box>

        {/* Right side: user avatar + name placeholder */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Box sx={{ textAlign: "right" }}>
            <Typography variant="body2" fontWeight={600} color="text.primary">
              User
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Logged in
            </Typography>
          </Box>
          <Avatar
            sx={{
              bgcolor: "#4A4FF1",
              width: 36,
              height: 36,
              fontSize: 16,
            }}
          >
            U
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
