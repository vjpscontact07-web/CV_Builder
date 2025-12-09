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
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      style={{ height: "100%" }}
    >
      <Card
        elevation={3}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: 3,
          overflow: "hidden",
          transition: "box-shadow 0.25s ease, transform 0.25s ease",
          "&:hover": {
            boxShadow: "0 16px 40px rgba(15, 23, 42, 0.18)",
          },
        }}
      >
        <CardActionArea
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
          }}
          onClick={() => onPreview(id)}
        >
          {/* Thumbnail */}
          <Box
            sx={{
              position: "relative",
              width: "100%",
              pt: "70%", // aspect-ratio trick ~ 10:7
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url(${thumbnail})`,
                backgroundSize: "cover",
                backgroundPosition: "top center",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.04)",
                },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.08), rgba(0,0,0,0.25))",
                  opacity: 0.3,
                },
              }}
            />
          </Box>

          {/* Text content */}
          <CardContent sx={{ width: "100%", p: 2.2 }}>
            <Typography
              variant="subtitle1"
              fontWeight={700}
              gutterBottom
              sx={{
                lineHeight: 1.3,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {name}
            </Typography>
            {description && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  minHeight: "2.6em", // keeps height consistent
                }}
              >
                {description}
              </Typography>
            )}
          </CardContent>
        </CardActionArea>

        {/* Actions */}
        <Box
          sx={{
            p: 2,
            pt: 0,
            display: "flex",
            gap: 1,
          }}
        >
          <Button
            variant="outlined"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onPreview(id);
            }}
            sx={{ flex: 1, textTransform: "none", fontWeight: 500 }}
          >
            Preview
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onUse(id);
            }}
            sx={{ flex: 1, textTransform: "none", fontWeight: 600 }}
          >
            Use template
          </Button>
        </Box>
      </Card>
    </motion.div>
  );
}
