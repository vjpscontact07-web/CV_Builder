import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";

export type LayoutCardProps = {
  id: string;
  name: string;
  description?: string;
  renderPreview: React.ReactNode;
  onPreview: (id: string) => void;
  onUse: (id: string) => void;
};

export default function LayoutCard({
  id,
  name,
  description,
  renderPreview,
  onPreview,
  onUse,
}: LayoutCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      style={{ width: "100%" }}
    >
      <Card
        sx={{
          width: "100%",
          borderRadius: 2,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <CardActionArea onClick={() => onPreview(id)}>
          <Box
            sx={{
              width: "100%",
              height: 220,
              overflow: "hidden",
              bgcolor: "#f4f4f4",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: 400,
                transform: "scale(0.45)",
                transformOrigin: "top center",
              }}
            >
              {renderPreview}
            </Box>
          </Box>

          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              {name}
            </Typography>

            {description && (
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {description}
              </Typography>
            )}
          </CardContent>
        </CardActionArea>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 2,
            pt: 0,
          }}
        >
          <Button variant="outlined" size="small" onClick={() => onPreview(id)}>
            Preview
          </Button>

          <Button variant="contained" size="small" onClick={() => onUse(id)}>
            Use Template
          </Button>
        </Box>
      </Card>
    </motion.div>
  );
}
