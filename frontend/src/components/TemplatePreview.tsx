import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
  template?: {
    id: string;
    name: string;
    thumbnail: string;
    description?: string;
    sampleHtml?: string; // optional: HTML preview for richer preview
  };
  onUse?: (id: string) => void;
};

export default function TemplatePreview({ open, onClose, template, onUse }: Props) {
  if (!template) return null;
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{template.name}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", gap: 3, flexDirection: { xs: "column", md: "row" } }}>
          <Box sx={{ flex: 1 }}>
            {/* Large visual preview */}
            <Box
              sx={{
                width: "100%",
                height: 420,
                borderRadius: 2,
                backgroundImage: `url(${template.thumbnail})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                boxShadow: 3,
              }}
            />
          </Box>

          <Box sx={{ width: { xs: "100%", md: 360 } }}>
            <Typography variant="body1" mb={2}>
              {template.description}
            </Typography>

            {template.sampleHtml ? (
              <Box
                sx={{
                  borderRadius: 1,
                  border: "1px solid rgba(0,0,0,0.05)",
                  p: 1,
                  maxHeight: 360,
                  overflow: "auto",
                }}
                dangerouslySetInnerHTML={{ __html: template.sampleHtml }}
              />
            ) : null}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose}>Close</Button>
        <Button variant="contained" onClick={() => onUse?.(template.id)}>
          Use this template
        </Button>
      </DialogActions>
    </Dialog>
  );
}
