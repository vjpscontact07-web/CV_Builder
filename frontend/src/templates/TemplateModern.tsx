// src/templates/TemplateModern.tsx
import { Box, Chip, Divider, Typography } from "@mui/material";
import type { TemplateData } from "./TemplateClassic";

export default function TemplateModern({ data }: { data: TemplateData }) {
  const b = data.basic || {};

  const locationLine = [b.city, b.state].filter(Boolean).join(", ");

  return (
    <Box
      sx={{
        width: 780,
        maxWidth: "100%",
        bgcolor: "#ffffff",
        color: "#0F172A",
        p: 4,
        borderRadius: 2,
        boxShadow: "0 6px 24px rgba(15,23,42,0.08)",
        fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        border: "1px solid #E5E7EB",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: { xs: "flex-start", sm: "center" },
          justifyContent: "space-between",
          gap: 2,
          mb: 2.5,
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 800, letterSpacing: 0.4, lineHeight: 1.1 }}
          >
            {b.name || "Your Name"}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "#6B7280", fontWeight: 500, mt: 0.5 }}
          >
            {b.title || "Job Title"}
          </Typography>
        </Box>

        <Box
          sx={{
            textAlign: { xs: "left", sm: "right" },
            fontSize: 13,
            color: "#4B5563",
          }}
        >
          {b.email && (
            <Typography variant="body2" sx={{ lineHeight: 1.4 }}>
              {b.email}
            </Typography>
          )}
          {b.phone && (
            <Typography variant="body2" sx={{ lineHeight: 1.4 }}>
              {b.phone}
            </Typography>
          )}
          {locationLine && (
            <Typography variant="body2" sx={{ lineHeight: 1.4 }}>
              {locationLine}
            </Typography>
          )}
        </Box>
      </Box>

      <Divider sx={{ mb: 2.5 }} />

      {/* Summary */}
      <Typography
        variant="body2"
        sx={{
          mb: 3,
          color: "#4B5563",
          lineHeight: 1.7,
          fontSize: 13,
        }}
      >
        {b.intro || ""}
      </Typography>

      {/* Body grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1.1fr 1fr" },
          gap: 3,
        }}
      >
        {/* Experience */}
        <Box>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 700,
              mb: 1.25,
              textTransform: "uppercase",
              letterSpacing: 0.8,
              fontSize: 11,
              color: "#6B7280",
            }}
          >
            Experience
          </Typography>
          {data.experience?.length ? (
            data.experience.map((ex, i) => (
              <Box key={i} sx={{ mb: 1.75 }}>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: 14,
                    color: "#111827",
                  }}
                >
                  {ex.position || "Position"}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#6B7280", fontSize: 12 }}
                >
                  {[ex.org, [ex.start, ex.end].filter(Boolean).join(" - ")]
                    .filter(Boolean)
                    .join(" • ")}
                </Typography>
                {ex.description && (
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 0.5,
                      color: "#4B5563",
                      fontSize: 13,
                      lineHeight: 1.6,
                    }}
                  >
                    {ex.description}
                  </Typography>
                )}
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              Add experience
            </Typography>
          )}
        </Box>

        {/* Education */}
        <Box>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 700,
              mb: 1.25,
              textTransform: "uppercase",
              letterSpacing: 0.8,
              fontSize: 11,
              color: "#6B7280",
            }}
          >
            Education
          </Typography>
          {data.education?.length ? (
            data.education.map((ed, i) => (
              <Box key={i} sx={{ mb: 1.25 }}>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: 14,
                    color: "#111827",
                  }}
                >
                  {ed.degree || "Degree"}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#6B7280", fontSize: 12 }}
                >
                  {[ed.institution, ed.year].filter(Boolean).join(" • ")}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              Add education
            </Typography>
          )}
        </Box>

        {/* Projects */}
        <Box>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 700,
              mb: 1.25,
              textTransform: "uppercase",
              letterSpacing: 0.8,
              fontSize: 11,
              color: "#6B7280",
            }}
          >
            Projects
          </Typography>
          {data.projects?.length ? (
            data.projects.map((p, i) => (
              <Box key={i} sx={{ mb: 1.25 }}>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: 14,
                    color: "#111827",
                  }}
                >
                  {p.title || "Project Title"}
                </Typography>
                {p.technologies && (
                  <Typography
                    variant="body2"
                    sx={{ color: "#6B7280", fontSize: 12 }}
                  >
                    {p.technologies}
                  </Typography>
                )}
                {p.description && (
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 0.25,
                      color: "#4B5563",
                      fontSize: 13,
                    }}
                  >
                    {p.description}
                  </Typography>
                )}
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              Add projects
            </Typography>
          )}
        </Box>

        {/* Skills */}
        <Box>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 700,
              mb: 1.25,
              textTransform: "uppercase",
              letterSpacing: 0.8,
              fontSize: 11,
              color: "#6B7280",
            }}
          >
            Skills
          </Typography>
          <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap" }}>
            {data.skills?.length ? (
              data.skills.map((s, i) => (
                <Chip
                  key={i}
                  label={s.name || "Skill"}
                  size="small"
                  sx={{
                    bgcolor: "#F3F4F6",
                    fontSize: 11,
                    borderRadius: 999,
                  }}
                />
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                Add skills
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
