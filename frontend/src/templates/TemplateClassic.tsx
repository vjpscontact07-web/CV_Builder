// src/templates/TemplateClassic.tsx
import { Box, Chip, Divider, Typography } from "@mui/material";
import React from "react";

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
  education: Array<{
    degree?: string;
    institution?: string;
    year?: string;
    percentage?: string;
  }>;
  experience: Array<{
    org?: string;
    position?: string;
    start?: string;
    end?: string;
    location?: string;
    description?: string;
  }>;
  projects: Array<{
    title?: string;
    duration?: string;
    teamSize?: string;
    technologies?: string;
    description?: string;
  }>;
  skills: Array<{ name?: string; level?: number }>;
  social: Array<{ platform?: string; url?: string }>;
};

const SectionHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box sx={{ textAlign: "center", mt: 2.5, mb: 1.5 }}>
    <Typography
      variant="subtitle1"
      sx={{
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: 1,
        fontSize: 13,
      }}
    >
      {children}
    </Typography>
    <Divider sx={{ mt: 0.5 }} />
  </Box>
);

export default function TemplateClassic({ data }: { data: TemplateData }) {
  const b = data.basic || {};
  const fullAddress = [b.address, b.city, b.state, b.pincode].filter(Boolean).join(", ");

  return (
    <Box
      sx={{
        width: 800,
        maxWidth: "100%",
        bgcolor: "#ffffff",
        color: "#111827",
        p: 4,
        fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        borderRadius: 0,
        boxShadow: "0 4px 18px rgba(0,0,0,0.06)",
        border: "1px solid #E5E7EB",
      }}
    >
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 2.5 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: 1 }}>
          {b.name || "Your Name"}
        </Typography>

        <Typography variant="subtitle1" sx={{ color: "#2563EB", fontWeight: 600, mt: 0.5 }}>
          {b.title || "Full Stack Developer"}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mt: 1,
            color: "#4B5563",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 1.5,
          }}
        >
          {b.phone && <span>{b.phone}</span>}
          {b.email && <span>{b.email}</span>}
          {data.social?.[0]?.url && <span>{data.social[0].url}</span>}
          {fullAddress && <span>{fullAddress}</span>}
        </Typography>
      </Box>

      {/* Summary */}
      <SectionHeading>Summary</SectionHeading>
      <Typography variant="body2" sx={{ color: "#374151", lineHeight: 1.7, mb: 2 }}>
        {b.intro || ""}
      </Typography>

      {/* Experience */}
      <SectionHeading>Experience</SectionHeading>

      {data.experience?.length ? (
        data.experience.map((ex, i) => (
          <Box key={i} sx={{ display: "flex", justifyContent: "space-between", gap: 2, mb: 1.75 }}>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontWeight: 700, fontSize: 14, color: "#1F2933" }}>
                {ex.org || "Company Name"}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500, color: "#111827", fontSize: 13 }}>
                {ex.position || "Job Title"}
              </Typography>
              {ex.description && (
                <Typography
                  variant="body2"
                  sx={{ mt: 0.5, color: "#4B5563", fontSize: 13, lineHeight: 1.5 }}
                >
                  {ex.description}
                </Typography>
              )}
            </Box>

            <Box
              sx={{
                minWidth: 120,
                textAlign: "right",
                fontSize: 12,
                color: "#6B7280",
                whiteSpace: "nowrap",
              }}
            >
              <Typography variant="body2">
                {[ex.start, ex.end || "Present"].filter(Boolean).join(" - ")}
              </Typography>
              {ex.location && <Typography variant="body2">{ex.location}</Typography>}
            </Box>
          </Box>
        ))
      ) : (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Add your professional experience.
        </Typography>
      )}

      {/* Education */}
      <SectionHeading>Education</SectionHeading>

      {data.education?.length ? (
        data.education.map((ed, i) => (
          <Box key={i} sx={{ display: "flex", justifyContent: "space-between", gap: 2, mb: 1.25 }}>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontWeight: 700, fontSize: 14, color: "#1F2933" }}>
                {ed.institution || "University Name"}
              </Typography>
              <Typography variant="body2" sx={{ color: "#111827", fontSize: 13 }}>
                {ed.degree || "Degree"}
              </Typography>
            </Box>

            <Box
              sx={{
                minWidth: 120,
                textAlign: "right",
                fontSize: 12,
                color: "#6B7280",
                whiteSpace: "nowrap",
              }}
            >
              <Typography variant="body2">{ed.year || ""}</Typography>
            </Box>
          </Box>
        ))
      ) : (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Add your education details.
        </Typography>
      )}

      {/* Projects */}
      <SectionHeading>Projects</SectionHeading>

      {data.projects?.length ? (
        data.projects.map((p, i) => (
          <Box key={i} sx={{ mb: 1.75 }}>
            <Typography sx={{ fontWeight: 700, fontSize: 14, color: "#1F2933" }}>
              {p.title || "Project Title"}
            </Typography>

            <Typography variant="body2" sx={{ color: "#4B5563", mt: 0.2, fontSize: 13 }}>
              {p.duration || ""} {p.teamSize ? ` | Team: ${p.teamSize}` : ""}
            </Typography>

            {p.technologies && (
              <Typography variant="body2" sx={{ mt: 0.3, fontSize: 13, fontWeight: 500 }}>
                Tech: {p.technologies}
              </Typography>
            )}

            {p.description && (
              <Typography
                variant="body2"
                sx={{ mt: 0.6, color: "#4B5563", fontSize: 13, lineHeight: 1.55 }}
              >
                {p.description}
              </Typography>
            )}
          </Box>
        ))
      ) : (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Add your project details.
        </Typography>
      )}

      {/* Skills */}
      <SectionHeading>Skills</SectionHeading>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {data.skills?.length ? (
          data.skills.map((s, i) => (
            <Chip
              key={i}
              label={s.name || "Skill"}
              size="small"
              sx={{
                fontSize: 12,
                bgcolor: "#F3F4F6",
                borderRadius: 999,
              }}
            />
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            Add your core skills.
          </Typography>
        )}
      </Box>
    </Box>
  );
}
