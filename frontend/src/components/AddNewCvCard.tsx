import { Box, Typography, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { motion } from "framer-motion";

export default function AddNewCvCard() {
  return (
    <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
      <Paper
        elevation={0}
        sx={{
          height: 260,
          borderRadius: 4,
          border: "2px dashed #d0d7e2",
          background: "#ffffff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          cursor: "pointer",
          transition: "0.2s",
          "&:hover": {
            borderColor: "#4A6CF7",
            background: "#f7f9ff",
            boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
          },
        }}
      >
        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "#eef2ff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 2,
          }}
        >
          <AddIcon sx={{ fontSize: 32, color: "#4A6CF7" }} />
        </Box>

        <Typography fontWeight={700} fontSize="1.1rem">
          Create New CV
        </Typography>

        <Typography fontSize="0.85rem" color="text.secondary" mt={0.5}>
          Start building a new resume
        </Typography>
      </Paper>
    </motion.div>
  );
}
