import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
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
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <Card
        elevation={0}
        sx={{
          height: 330,
          borderRadius: 4,
          overflow: "hidden",
          border: "1px solid #e5e7eb",
          background: "#ffffff",
          boxShadow: "0 8px 28px rgba(0,0,0,0.08)",
          transition: "0.25s all ease",
          display: "flex",
          flexDirection: "column",

          "&:hover": {
            boxShadow: "0 18px 40px rgba(0,0,0,0.12)",
            transform: "translateY(-4px)",
            borderColor: "#d2d7ff",
          },
        }}
      >
        {/* Thumbnail Section */}
        <Box
          sx={{
            height: 160,
            background:
              "linear-gradient(135deg, #dbeafe 0%, #f0f4ff 100%)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {thumbnail ? (
            <Box
              sx={{
                height: "100%",
                backgroundImage: `url(${thumbnail})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "brightness(0.85)",
              }}
            />
          ) : (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "3.5rem",
                opacity: 0.7,
                color: "#6b7280",
              }}
            >
              📄
            </Box>
          )}
        </Box>

        {/* Content */}
        <CardContent
          sx={{
            px: 3,
            py: 2.5,
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{
              color: "#1e293b",
              mb: 1,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {title}
          </Typography>

          <Chip
            icon={<AccessTimeIcon sx={{ fontSize: 16 }} />}
            label={updatedAt}
            size="small"
            sx={{
              mt: 0.5,
              background: "#eef2ff",
              color: "#4f46e5",
              fontWeight: 600,
              borderRadius: 2,
              height: 26,
            }}
          />
        </CardContent>

        {/* Action Buttons */}
        <CardActions
          sx={{
            px: 3,
            pb: 2.5,
            pt: 0,
            gap: 1.5,
          }}
        >
          <Button
            fullWidth
            variant="contained"
            startIcon={<EditIcon />}
            onClick={onEdit}
            sx={{
              py: 1.1,
              fontWeight: 700,
              borderRadius: 2.5,
              textTransform: "none",
              fontSize: "0.9rem",
              background: "linear-gradient(135deg, #4f46e5, #4338ca)",
              boxShadow: "0 3px 10px rgba(79, 70, 229, 0.35)",
              "&:hover": {
                background: "linear-gradient(135deg, #4338ca, #3730a3)",
                boxShadow: "0 6px 18px rgba(79, 70, 229, 0.45)",
                transform: "translateY(-1px)",
              },
            }}
          >
            Edit
          </Button>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={onDelete}
            sx={{
              py: 1.1,
              fontWeight: 700,
              borderRadius: 2.5,
              textTransform: "none",
              fontSize: "0.9rem",
              borderColor: "#ef4444",
              color: "#dc2626",
              "&:hover": {
                background: "#fff1f2",
                borderColor: "#dc2626",
              },
            }}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </motion.div>
  );
}
