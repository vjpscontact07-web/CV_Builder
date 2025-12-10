// CvCard.tsx (updated with smaller fonts & better alignment)
import {
  Box,
  Button,
  CardContent,
  Typography,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { motion } from "framer-motion";

interface CvCardProps {
  title: string;
  thumbnail?: string;
  updatedAt: string;
  onEdit: () => void;
  onDelete: () => void;
}

export default function CvCard({
  title,
  thumbnail,
  updatedAt,
  onEdit,
  onDelete,
}: CvCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Box
        sx={{
          height: "100%",
          minHeight: 300,
          borderRadius: 2,
          border: "1px solid #e2e8f0",
          background: "#ffffff",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          position: "relative",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          
          "&:hover": {
            borderColor: "#cbd5e1",
            background: "#fafbfc",
            transform: "translateY(-6px)",
          },
          
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: 60,
            height: 60,
            background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
            opacity: 0.06,
            zIndex: 0,
            borderRadius: "0 0 100% 0",
          },
        }}
      >
        {/* Thumbnail Section */}
        <Box sx={{ height: 150, position: "relative", overflow: "hidden", zIndex: 1 }}>
          {thumbnail ? (
            <Box
              sx={{
                height: "100%",
                backgroundImage: `url(${thumbnail})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.2) 100%)",
                },
              }}
            />
          ) : (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
              }}
            >
              <Box sx={{ fontSize: "2.5rem", opacity: 0.5 }}>
                📄
              </Box>
            </Box>
          )}
        </Box>

        {/* Content */}
        <CardContent sx={{ px: 2.5, py: 2.5, flexGrow: 1, pb: "0 !important", zIndex: 1 }}>
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{
              color: "#0f172a",
              mb: 1.5,
              fontSize: "0.95rem",
              lineHeight: 1.3,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              letterSpacing: "-0.01em",
            }}
          >
            {title}
          </Typography>

          <Chip
            icon={<AccessTimeIcon sx={{ fontSize: 12, color: "#64748b" }} />}
            label={updatedAt}
            size="small"
            sx={{
              background: "#f8fafc",
              color: "#475569",
              fontWeight: 500,
              fontSize: "0.7rem",
              height: 22,
              borderRadius: 11,
              px: 1.5,
            }}
          />
        </CardContent>

        {/* Action Buttons */}
        <Box sx={{ px: 2.5, pb: 2.5, pt: 1.5, display: "flex", gap: 1, zIndex: 1 }}>
          <motion.div whileTap={{ scale: 0.98 }}>
            <Button
              variant="contained"
              startIcon={<EditIcon sx={{ fontSize: 16 }} />}
              onClick={onEdit}
              sx={{
                py: 0.75,
                px: 2,
                fontWeight: 600,
                borderRadius: 1.5,
                textTransform: "none",
                fontSize: "0.75rem",
                height: 36,
                minWidth: 80,
                background: "#3b82f6",
                color: "white",
                boxShadow: "none",
                "&:hover": {
                  background: "#2563eb",
                  boxShadow: "none",
                  transform: "translateY(-1px)",
                },
              }}
            >
              Edit
            </Button>
          </motion.div>

          <motion.div whileTap={{ scale: 0.98 }}>
            <Button
              variant="outlined"
              startIcon={<DeleteIcon sx={{ fontSize: 16 }} />}
              onClick={onDelete}
              sx={{
                py: 0.75,
                px: 2,
                fontWeight: 600,
                borderRadius: 1.5,
                textTransform: "none",
                fontSize: "0.75rem",
                height: 36,
                minWidth: 80,
                borderColor: "#f87171",
                color: "#dc2626",
                background: "transparent",
                "&:hover": {
                  background: "#fef2f2",
                  borderColor: "#f87171",
                },
              }}
            >
              Delete
            </Button>
          </motion.div>
        </Box>
      </Box>
    </motion.div>
  );
}
