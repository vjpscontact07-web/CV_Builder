// AddNewCvCard.tsx (updated with smaller fonts & professional alignment)
import { Box, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { motion } from "framer-motion";

interface AddNewCvCardProps {
  onClick: () => void;
}

export default function AddNewCvCard({ onClick }: AddNewCvCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Box
        onClick={onClick}
        sx={{
          height: 300,
          borderRadius: 2,
          border: "2px dashed #d1d5db",
          background: "#fafbfc",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          position: "relative",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            borderColor: "#3b82f6",
            background: "#f8fafc",
            transform: "translateY(-4px)",
          },
        }}
      >
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "#eff6ff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 2.5,
          }}
        >
          <AddIcon sx={{ 
            fontSize: 28, 
            color: "#3b82f6" 
          }} />
        </Box>

        <Typography 
          variant="h6"
          fontWeight={700} 
          sx={{
            fontSize: "1rem",
            color: "#1e293b",
            mb: 0.75,
            letterSpacing: "-0.015em",
            textAlign: "center",
          }}
        >
          Create New CV
        </Typography>

        <Typography 
          variant="body2"
          sx={{
            color: "#64748b",
            fontSize: "0.8rem",
            textAlign: "center",
            px: 1.5,
            lineHeight: 1.4,
          }}
        >
          Start building your professional resume
        </Typography>
      </Box>
    </motion.div>
  );
}
