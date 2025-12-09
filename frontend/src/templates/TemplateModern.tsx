// src/templates/TemplateModern.tsx
import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import type { TemplateData } from "./TemplateClassic";

export default function TemplateModern({ data }: { data: TemplateData }) {
  const b = data.basic || {};
  return (
    <Box sx={{
      width: 780,
      maxWidth: "100%",
      bgcolor: "#fff",
      color: "#111",
      p: 4,
      borderRadius: 1,
      boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
      fontFamily: "'Inter', sans-serif"
    }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>{b.name || "Your Name"}</Typography>
          <Typography variant="subtitle1" color="text.secondary">{b.title}</Typography>
        </Box>
        <Box sx={{ textAlign: "right" }}>
          <Typography variant="body2">{b.email}</Typography>
          <Typography variant="body2">{b.phone}</Typography>
          <Typography variant="body2">{b.city}, {b.state}</Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{b.intro || "Short summary about you."}</Typography>

      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}>
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Experience</Typography>
          {data.experience?.length ? data.experience.map((ex, i) => (
            <Box key={i} sx={{ mb: 1 }}>
              <Typography sx={{ fontWeight: 700 }}>{ex.position}</Typography>
              <Typography variant="body2" color="text.secondary">{ex.org} • {ex.start} - {ex.end}</Typography>
            </Box>
          )) : <Typography variant="body2" color="text.secondary">Add experience</Typography>}
        </Box>

        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Education</Typography>
          {data.education?.length ? data.education.map((ed, i) => (
            <Box key={i} sx={{ mb: 1 }}>
              <Typography sx={{ fontWeight: 700 }}>{ed.degree}</Typography>
              <Typography variant="body2" color="text.secondary">{ed.institution} • {ed.year}</Typography>
            </Box>
          )) : <Typography variant="body2" color="text.secondary">Add education</Typography>}
        </Box>

        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Projects</Typography>
          {data.projects?.length ? data.projects.map((p, i) => (
            <Box key={i} sx={{ mb: 1 }}>
              <Typography sx={{ fontWeight: 700 }}>{p.title}</Typography>
              <Typography variant="body2" color="text.secondary">{p.technologies}</Typography>
            </Box>
          )) : <Typography variant="body2" color="text.secondary">Add projects</Typography>}
        </Box>

        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Skills</Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {data.skills?.length ? data.skills.map((s, i) => (
              <Box key={i} sx={{ borderRadius: 1, px: 1, py: 0.5, background: "#F3F6FB" }}>{s.name}</Box>
            )) : <Typography variant="body2" color="text.secondary">Add skills</Typography>}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
