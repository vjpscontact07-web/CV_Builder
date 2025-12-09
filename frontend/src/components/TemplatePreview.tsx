import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  useMediaQuery,
  useTheme,
  Divider,
} from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
  template?: {
    id: string;
    name: string;
    description?: string;
    renderPreview?: React.ReactNode;   // ✅ added
    thumbnail?: string;
    sampleHtml?: string;
  };
  onUse?: (id: string) => void;
};

export default function TemplatePreview({ open, onClose, template, onUse }: Props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  if (!template) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      fullScreen={fullScreen}
      PaperProps={{
        sx: { borderRadius: fullScreen ? 0 : 3 },
      }}
    >
      <DialogTitle sx={{ pb: 1.5 }}>
        <Typography variant="h6" fontWeight={700}>
          {template.name}
        </Typography>

        {template.description && (
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            {template.description}
          </Typography>
        )}
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ pt: 3 }}>
        <Box
          sx={{
            display: "flex",
            gap: 3,
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {/* LEFT — LIVE TEMPLATE PREVIEW */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box
              sx={{
                width: "100%",
                height: { xs: 350, md: 480 },
                borderRadius: 2,
                bgcolor: "#F3F4F6",
                border: "1px solid rgba(15,23,42,0.06)",
                overflow: "hidden",
                boxShadow: 2,
                position: "relative",
              }}
            >
              {/* If React component preview exists, show it */}
              {template.renderPreview ? (
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    transform: "scale(0.7)",
                    transformOrigin: "top left",
                    width: "142%",
                    height: "142%",
                    overflow: "hidden",
                  }}
                >
                  {template.renderPreview}
                </Box>
              ) : (
                // Fallback to thumbnail if no preview component
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    backgroundImage: `url(${template.thumbnail})`,
                    backgroundSize: "cover",
                    backgroundPosition: "top center",
                  }}
                />
              )}
            </Box>
          </Box>

          {/* RIGHT — INFO PANEL */}
          <Box
            sx={{
              width: { xs: "100%", md: 360 },
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {template.sampleHtml ? (
              <>
                <Typography variant="subtitle2" color="text.secondary">
                  Sample content
                </Typography>

                <Box
                  sx={{
                    borderRadius: 1.5,
                    border: "1px solid rgba(0,0,0,0.08)",
                    p: 1.5,
                    maxHeight: 320,
                    overflow: "auto",
                    bgcolor: "#F9FAFB",
                    fontSize: "0.85rem",
                  }}
                  dangerouslySetInnerHTML={{ __html: template.sampleHtml }}
                />
              </>
            ) : (
              <Typography variant="body2" color="text.secondary">
                This layout is fully customizable in the editor. Select it to start editing your CV.
              </Typography>
            )}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          pb: 2.5,
          pt: 1.5,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button onClick={onClose} color="inherit">
          Close
        </Button>

        <Button
          variant="contained"
          onClick={() => onUse?.(template.id)}
        >
          Use this template
        </Button>
      </DialogActions>
    </Dialog>
  );
}
