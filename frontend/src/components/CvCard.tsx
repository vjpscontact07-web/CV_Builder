import { Box, Button, Card, CardContent, CardActions, Typography, Chip, alpha } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { motion } from "framer-motion";

interface CvCardProps {
  title: string;
  thumbnail?: string;
  onEdit: () => void;
  onDelete: () => void;
}

export default function CvCard({ title, onEdit, onDelete, thumbnail }: CvCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <Card
        sx={{
          height: "260px",
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          transition: "all 0.3s ease",
          position: "relative",
          "&:hover": {
            boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
            transform: "translateY(-4px)",
          }
        }}
      >
        <Box
          sx={{
            height: "160px",
            position: "relative",
            overflow: "hidden",
            background: thumbnail 
              ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${thumbnail})`
              : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "flex-end",
            p: 2,
          }}
        >
          {thumbnail ? null : (
            <Box sx={{ textAlign: "center", width: "100%" }}>
              <Typography variant="h6" color="white" fontWeight={700}>
                {title}
              </Typography>
            </Box>
          )}
        </Box>

        <CardContent sx={{ p: 2, pb: "16px !important" }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 700,
              color: "#1E293B",
              mb: 1,
              lineHeight: 1.3,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {title}
          </Typography>
        </CardContent>

        <CardActions sx={{ p: 2, pt: 0 }}>
          <Button
            fullWidth
            size="small"
            startIcon={<EditIcon fontSize="small" />}
            onClick={onEdit}
            sx={{
              height: 36,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.75rem",
              flex: 1,
              mr: 0.5,
              "&:hover": {
                backgroundColor: alpha("#4A4FF1", 0.1),
                color: "#4A4FF1",
              }
            }}
          >
            Edit
          </Button>
          <Button
            fullWidth
            size="small"
            startIcon={<DeleteIcon fontSize="small" />}
            onClick={onDelete}
            color="error"
            sx={{
              height: 36,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.75rem",
              flex: 1,
              ml: 0.5,
              "&:hover": {
                backgroundColor: alpha("#EF4444", 0.1),
              }
            }}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </motion.div>
  );
}
