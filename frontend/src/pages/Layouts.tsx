import {
  Box,
  Breadcrumbs,
  Chip,
  Container,
  Grid,
  Link as MuiLink,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Classic from "../assets/images/images.jpeg";
import Modern from "../assets/images/minimalist-cv-template_23-2148906637.avif";
import LayoutCard from "../components/LayoutCard";
import TemplatePreview from "../components/TemplatePreview";
import DashboardLayout from "../layouts/DashboardLayout";
import TemplateClassic, {
  type TemplateData,
} from "../templates/TemplateClassic";
import TemplateModern from "../templates/TemplateModern";
import TemplateCreative from "../templates/TemplateCreative";

const CLASSIC_DEMO: TemplateData = {
  basic: {
    name: "John Doe",
    title: "Full Stack Developer",
    email: "john.doe@example.com",
    phone: "+1 (555) 000-0000",
    city: "San Francisco",
    state: "CA",
    intro:
      "Full Stack Developer with 8+ years of experience building scalable web applications and APIs.",
  },
  education: [
    {
      degree: "M.S. in Computer Science",
      institution: "Stanford University",
      year: "2015 - 2017",
      percentage: "",
    },
  ],
  experience: [
    {
      org: "Boyle",
      position: "Senior Full Stack Developer",
      start: "2018",
      end: "Present",
      location: "San Francisco, CA",
      description:
        "Lead developer on multiple web applications, collaborating with cross-functional teams to deliver high-quality features.",
    },
    {
      org: "Lauzon",
      position: "Full Stack Developer",
      start: "2013",
      end: "2018",
      location: "Remote",
      description:
        "Developed and maintained full-stack solutions for loyalty and rewards products.",
    },
  ],
  projects: [
    {
      title: "Client Portal",
      duration: "2022",
      teamSize: "4",
      technologies: "React, TypeScript, Node.js, PostgreSQL",
      description:
        "Built a secure portal for clients to manage their subscriptions and invoices.",
    },
  ],
  skills: [
    { name: "React", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "Node.js", level: 85 },
    { name: "SQL", level: 80 },
  ],
  social: [
    { platform: "GitHub", url: "https://github.com/john-doe" },
    { platform: "LinkedIn", url: "https://linkedin.com/in/john-doe" },
  ],
};

const MODERN_DEMO: TemplateData = {
  ...CLASSIC_DEMO,
  basic: {
    ...CLASSIC_DEMO.basic,
    title: "Senior Software Engineer",
  },
};

const CREATIVE_DEMO: TemplateData = {
  ...CLASSIC_DEMO,
  basic: {
    ...CLASSIC_DEMO.basic,
    title: "Product Designer / Frontend Engineer",
  },
};

// ---- Page component ----

type TemplateMeta = {
  id: string;
  name: string;
  description: string;
  renderPreview: React.ReactNode;
};

export const TEMPLATES = [
  {
    id: "layout-1",
    name: "Classic Professional",
    description:
      "Clean two-column layout with a strong heading and sidebar for skills.",
    thumbnail: Classic,
    renderPreview: <TemplateClassic data={CLASSIC_DEMO} />,
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
      "Minimal layout focused on whitespace, typography, and readability.",
    thumbnail: Modern,
    renderPreview: <TemplateModern data={MODERN_DEMO} />,
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
      "Stylish one-page layout ideal for portfolios and creative roles.",
    thumbnail:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=60",
    renderPreview: <TemplateCreative data={CREATIVE_DEMO} />,
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
    const url = `/editor?layout=${encodeURIComponent(id)}`;
    window.location.href = url;
  };

  return (
    <DashboardLayout>
      <Container
        maxWidth="lg"
        sx={{
          py: 4,
        }}
      >
        {/* Top breadcrumb & meta */}
        <Box sx={{ mb: 3 }}>
          <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }}>
            <MuiLink
              component={RouterLink}
              underline="hover"
              color="inherit"
              to="/dashboard"
            >
              Dashboard
            </MuiLink>
            <Typography color="text.primary">Templates</Typography>
          </Breadcrumbs>

          <Typography
            variant="overline"
            color="text.secondary"
            sx={{ letterSpacing: 1 }}
          >
            CV templates
          </Typography>
        </Box>

        {/* Header row */}
        <Box
          display="flex"
          alignItems={{ xs: "flex-start", sm: "center" }}
          justifyContent="space-between"
          flexDirection={{ xs: "column", sm: "row" }}
          mb={3}
          gap={2}
        >
          <Box>
            <Typography variant="h5" fontWeight={700} gutterBottom>
              Choose a layout
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Pick a layout that matches your profile and customize it in the
              editor.
            </Typography>
          </Box>

          <Chip
            label={`${templates.length} templates`}
            color="primary"
            variant="outlined"
            sx={{ fontWeight: 500 }}
          />
        </Box>

        {/* Template cards grid */}
        <Grid container spacing={3}>
          {templates.map((t) => (
            <Grid item xs={12} sm={6} md={6} key={t.id}>
              <LayoutCard
                id={t.id}
                name={t.name}
                description={t.description}
                renderPreview={t.renderPreview}
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
