import { Box, Paper, Typography } from "@mui/material";

export default function AuthLayout({ title, children }: any) {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #F3F7FF 0%, #FFFFFF 100%)",
        padding: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: "460px",   
          padding: "40px 36px",
          borderRadius: 4,
          backgroundColor: "#fff",
          border: "1px solid #e9e9e9",
        }}
      >
        <Typography
          variant="h5"
          textAlign="center"
          sx={{ fontWeight: 600, mb: 3 }}
        >
          {title}
        </Typography>

        {children}
      </Paper>
    </Box>
  );
}
