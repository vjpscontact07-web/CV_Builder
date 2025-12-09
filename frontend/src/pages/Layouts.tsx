import React, { useMemo, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Breadcrumbs,
  Link,
  Chip,
} from "@mui/material";
import DashboardLayout from "../layouts/DashboardLayout";
import LayoutCard from "../components/LayoutCard";
import TemplatePreview from "../components/TemplatePreview";
import Classic from "../assets/images/classic_professional.jpg";
import Modern from "../assets/images/minimalist-cv-template_23-2148906637.avif";

/**
 * Example templates data. Replace thumbnails with real images or server URLs.
 * Thumbnails can be PNG/SVG or base64 placeholders while developing.
 */

export const TEMPLATES = [
  {
    id: "layout-1",
    name: "Classic Professional",
    description:
      "Clean two-column layout with bold name heading and a left sidebar for skills.",
    thumbnail: Classic,
    sampleHtml: `
      <div style="font-family: Arial; padding: 20px;">
        <h2>John Doe</h2>
        <h4>Software Developer</h4>
        <hr/>
        <h3>Experience</h3>
        <p>Company ABC – Full Stack Developer</p>
      </div>
    `,
  },
  {
    id: "layout-2",
    name: "Modern Minimal",
    description:
      "Minimal, clean layout focusing on spacing, fonts, and readability.",
    thumbnail: Modern,
    sampleHtml: `
      <div style="font-family: Helvetica; padding: 20px;">
        <h1 style="letter-spacing: 1px;">Jane Smith</h1>
        <p>Frontend Developer</p>
        <h3>Skills</h3>
        <ul><li>React</li><li>JavaScript</li></ul>
      </div>
    `,
  },
  {
    id: "layout-3",
    name: "Creative One-Page",
    description:
      "Stylish one-page layout highlighting projects and creativity.",
    thumbnail:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=60",
    sampleHtml: `
      <div style="font-family: Poppins; padding: 20px;">
        <h1>Creative Portfolio</h1>
        <h3>Projects</h3>
        <p>A showcase of modern UI/UX work.</p>
      </div>
    `,
  },
];

export default function LayoutsPage() {
  const templates = useMemo(() => TEMPLATES, []);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const previewTemplate =
    templates.find((t) => t.id === previewId) ?? undefined;

  const handlePreview = (id: string) => setPreviewId(id);
  const handleClosePreview = () => setPreviewId(null);
  const handleUseTemplate = (id: string) => {
    // navigate to editor with layout query param
    const url = `/editor?layout=${encodeURIComponent(id)}`;
    window.location.href = url;
  };

  return (
    <DashboardLayout>
      <Container sx={{ py: 3 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Link color="inherit" href="/dashboard">
            Dashboard
          </Link>
          <Typography color="text.primary">Templates</Typography>
        </Breadcrumbs>

        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={3}
        >
          <Box>
            <Typography variant="h5" fontWeight={700}>
              Choose a layout
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Pick a professional layout and customize content in the editor.
            </Typography>
          </Box>

          <Box>
            <Chip label="3 templates" color="primary" />
          </Box>
        </Box>

        <Grid container spacing={3}>
          {templates.map((t) => (
            <Grid item xs={12} sm={6} md={4} key={t.id}>
              <LayoutCard
                id={t.id}
                name={t.name}
                description={t.description}
                thumbnail={t.thumbnail}
                onPreview={handlePreview}
                onUse={handleUseTemplate}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      <TemplatePreview
        open={!!previewTemplate}
        onClose={handleClosePreview}
        template={previewTemplate}
        onUse={handleUseTemplate}
      />
    </DashboardLayout>
  );
}
