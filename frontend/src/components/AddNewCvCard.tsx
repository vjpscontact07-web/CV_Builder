import { Card, CardContent, Box, Typography, alpha } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { motion } from "framer-motion";

export default function AddNewCvCard() {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      onClick={() => window.location.href = "/layout"}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          window.location.href = "/layout";
        }
      }}
      style={{ outline: 'none' }}
    >
      <Card
        sx={{
          height: "260px", // Fixed exact height
          width: "100%",    // Full container width
          borderRadius: 3,
          cursor: "pointer",
          border: "3px dashed",
          borderColor: alpha("#4A4FF1", 0.3),
          background: "linear-gradient(135deg, #F8FAFF 0%, #F0F2FF 100%)",
          display: "flex",
          flexDirection: "column",
          transition: "all 0.2s ease",
          overflow: "hidden", // Changed to hidden for consistency
          "&:hover": {
            borderColor: "#4A4FF1",
            boxShadow: "0 12px 32px rgba(74, 79, 241, 0.15)",
            background: "linear-gradient(135deg, #F0F5FF 0%, #E8EBFF 100%)",
          },
          "&:focus-visible": {
            boxShadow: "0 0 0 3px rgba(74, 79, 241, 0.3)",
          }
        }}
      >
        <CardContent sx={{ 
          textAlign: "center", 
          p: 3, 
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #4A4FF1 0%, #6B7AFF 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
              boxShadow: "0 8px 24px rgba(74, 79, 241, 0.3)",
            }}
          >
            <AddIcon sx={{ fontSize: 32, color: "white" }} />
          </Box>
          <Typography 
            variant="h6" 
            fontWeight={700}
            sx={{ 
              color: "#1E293B",
              lineHeight: 1.3,
              mb: 0.5
            }}
          >
            Create New CV
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: alpha("#64748B", 0.8),
              fontWeight: 500
            }}
          >
            Start building your perfect resume
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
}
