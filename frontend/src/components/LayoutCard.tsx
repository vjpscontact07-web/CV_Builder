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
  thumbnail: string; // image URL or base64
  onPreview: (id: string) => void;
  onUse: (id: string) => void;
};

export default function LayoutCard({
  id,
  name,
  description,
  thumbnail,
  onPreview,
  onUse,
}: LayoutCardProps) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} style={{ height: "100%" }}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: 3,
          overflow: "hidden",
        }}
        elevation={2}
      >
        <CardActionArea
          sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "stretch" }}
          onClick={() => onPreview(id)}
        >
          <Box
            sx={{
              height: { xs: 160, sm: 180, md: 200 },
              backgroundImage: `url(${thumbnail})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <CardContent>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>

        <Box sx={{ p: 2, pt: 0, display: "flex", gap: 1 }}>
          <Button variant="outlined" size="small" onClick={() => onPreview(id)} sx={{ flex: 1 }}>
            Preview
          </Button>
          <Button variant="contained" size="small" onClick={() => onUse(id)} sx={{ flex: 1 }}>
            Use this template
          </Button>
        </Box>
      </Card>
    </motion.div>
  );
}
