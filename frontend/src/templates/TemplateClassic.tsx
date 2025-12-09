// src/templates/TemplateClassic.tsx
import React from "react";
import { Box, Typography, Chip } from "@mui/material";

export type TemplateData = {
  basic: {
    name?: string;
    title?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
    intro?: string;
  };
  education: Array<{ degree?: string; institution?: string; year?: string; percentage?: string }>;
  experience: Array<{ org?: string; position?: string; start?: string; end?: string; location?: string; description?: string }>;
  projects: Array<{ title?: string; duration?: string; teamSize?: string; technologies?: string; description?: string }>;
  skills: Array<{ name?: string; level?: number }>;
  social: Array<{ platform?: string; url?: string }>;
}

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: "#333" }}>{children}</Typography>
);

export default function TemplateClassic({ data }: { data: TemplateData }) {
  const b = data.basic || {};
  return (
    <Box sx={{
      width: 800,
      maxWidth: "100%",
      bgcolor: "#fff",
      color: "#111",
      p: 4,
      fontFamily: "'Inter', sans-serif",
      borderRadius: 1,
      boxShadow: "0 2px 12px rgba(0,0,0,0.06)"
    }}>
      <Box sx={{ display: "flex", gap: 3 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>{b.name || "Your Name"}</Typography>
          <Typography variant="subtitle1" sx={{ color: "text.secondary", mb: 1 }}>{b.title || "Professional Title"}</Typography>
          <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>{b.intro || "Short professional summary about you. Keep it crisp and focused on your strengths."}</Typography>

          <SectionTitle>Education</SectionTitle>
          {data.education?.length ? data.education.map((ed, i) => (
            <Box key={i} sx={{ mb: 1 }}>
              <Typography sx={{ fontWeight: 700 }}>{ed.degree || "Degree"}</Typography>
              <Typography variant="body2" color="text.secondary">{ed.institution} • {ed.year} • {ed.percentage}</Typography>
            </Box>
          )) : <Typography variant="body2" color="text.secondary">Add your education</Typography>}

          <Box sx={{ mt: 2 }}>
            <SectionTitle>Experience</SectionTitle>
            {data.experience?.length ? data.experience.map((ex, i) => (
              <Box key={i} sx={{ mb: 1 }}>
                <Typography sx={{ fontWeight: 700 }}>{ex.position || "Position"} — <span style={{fontWeight:500}}>{ex.org}</span></Typography>
                <Typography variant="body2" color="text.secondary">{ex.start} - {ex.end} • {ex.location}</Typography>
                <Typography variant="body2" sx={{ mt: 0.5 }}>{ex.description}</Typography>
              </Box>
            )) : <Typography variant="body2" color="text.secondary">Add your experience</Typography>}
          </Box>
        </Box>

        <Box sx={{ width: 260 }}>
          <Box sx={{ mb: 2 }}>
            <SectionTitle>Contact</SectionTitle>
            <Typography variant="body2">{b.email}</Typography>
            <Typography variant="body2">{b.phone}</Typography>
            <Typography variant="body2">{b.address}</Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <SectionTitle>Skills</SectionTitle>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {data.skills?.length ? data.skills.map((s, i) =>
                <Chip key={i} label={`${s.name} (${s.level || 0}%)`} size="small" />
              ) : <Typography variant="body2" color="text.secondary">Add skills</Typography>}
            </Box>
          </Box>

          <Box>
            <SectionTitle>Projects</SectionTitle>
            {data.projects?.length ? data.projects.map((p, i) => (
              <Box key={i} sx={{ mb: 1 }}>
                <Typography sx={{ fontWeight: 600 }}>{p.title}</Typography>
                <Typography variant="body2" color="text.secondary">{p.duration} • Team: {p.teamSize}</Typography>
              </Box>
            )) : <Typography variant="body2" color="text.secondary">Add projects</Typography>}
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 3, display: "flex", gap: 2, color: "text.secondary" }}>
        {data.social?.length ? data.social.map((s, i) => (
          <Typography key={i} variant="body2">{s.platform}: {s.url}</Typography>
        )) : <Typography variant="body2">Add social links</Typography>}
      </Box>
    </Box>
  );
}
