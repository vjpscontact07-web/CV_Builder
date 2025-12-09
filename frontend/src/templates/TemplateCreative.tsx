// src/templates/TemplateCreative.tsx
import { Box, Chip, Typography } from "@mui/material";
import type { TemplateData } from "./TemplateClassic";

export default function TemplateCreative({ data }: { data: TemplateData }) {
  const b = data.basic || {};

  const initials = b.name
    ? b.name
        .split(" ")
        .filter(Boolean)
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  const locationLine = [b.city, b.state].filter(Boolean).join(", ");

  return (
    <Box
      sx={{
        width: 800,
        maxWidth: "100%",
        bgcolor: "#ffffff",
        color: "#111827",
        fontFamily: "'Outfit', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        display: "flex",
        boxShadow: "0 6px 24px rgba(15,23,42,0.18)",
        overflow: "hidden",
        borderRadius: 2,
        border: "1px solid #E5E7EB",
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: 280,
          bgcolor: "#1F2933",
          color: "#E5EDF5",
          p: 4,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Avatar + name */}
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Box
            sx={{
              width: 96,
              height: 96,
              bgcolor: "#F9735B",
              borderRadius: "32px",
              mx: "auto",
              mb: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 700,
              color: "#111827",
              boxShadow: "0 10px 30px rgba(249,115,91,0.45)",
            }}
          >
            {initials}
          </Box>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, lineHeight: 1.2, letterSpacing: 0.4 }}
          >
            {b.name || "Your Name"}
          </Typography>
          <Typography
            variant="body2"
            sx={{ opacity: 0.85, mt: 0.75, fontSize: 13 }}
          >
            {b.title || "Creative Designer"}
          </Typography>
        </Box>

        {/* Contact */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="subtitle2"
            sx={{
              color: "#F9735B",
              fontWeight: 700,
              mb: 1,
              textTransform: "uppercase",
              letterSpacing: 1,
              fontSize: 11,
            }}
          >
            Contact
          </Typography>
          {b.email && (
            <Typography variant="body2" sx={{ mb: 0.5, fontSize: 13 }}>
              {b.email}
            </Typography>
          )}
          {b.phone && (
            <Typography variant="body2" sx={{ mb: 0.5, fontSize: 13 }}>
              {b.phone}
            </Typography>
          )}
          {locationLine && (
            <Typography variant="body2" sx={{ mb: 0.5, fontSize: 13 }}>
              {locationLine}
            </Typography>
          )}
        </Box>

        {/* Skills */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="subtitle2"
            sx={{
              color: "#F9735B",
              fontWeight: 700,
              mb: 1,
              textTransform: "uppercase",
              letterSpacing: 1,
              fontSize: 11,
            }}
          >
            Skills
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
            {data.skills?.length ? (
              data.skills.map((s, i) => (
                <Chip
                  key={i}
                  label={s.name || "Skill"}
                  size="small"
                  sx={{
                    bgcolor: "rgba(229,231,235,0.18)",
                    color: "#F9FAFB",
                    borderRadius: 999,
                    fontSize: 11,
                    border: "none",
                  }}
                />
              ))
            ) : (
              <Typography variant="body2" sx={{ opacity: 0.5, fontSize: 13 }}>
                Add skills
              </Typography>
            )}
          </Box>
        </Box>

        {/* Social */}
        <Box>
          <Typography
            variant="subtitle2"
            sx={{
              color: "#F9735B",
              fontWeight: 700,
              mb: 1,
              textTransform: "uppercase",
              letterSpacing: 1,
              fontSize: 11,
            }}
          >
            Social
          </Typography>
          {data.social?.length ? (
            data.social.map((s, i) => (
              <Typography
                key={i}
                variant="body2"
                sx={{ mb: 0.5, fontSize: 13 }}
              >
                {s.url ? (
                  <a
                    href={s.url}
                    style={{
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    {s.platform || "Profile"}
                  </a>
                ) : (
                  s.platform || "Profile"
                )}
              </Typography>
            ))
          ) : (
            <Typography variant="body2" sx={{ opacity: 0.5, fontSize: 13 }}>
              Add social profiles
            </Typography>
          )}
        </Box>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          p: 4,
          bgcolor: "#F9FAFB",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {/* Profile */}
        <Box>
          <Typography
            variant="h6"
            sx={{
              color: "#111827",
              fontWeight: 700,
              borderBottom: "2px solid #F9735B",
              display: "inline-block",
              mb: 1.5,
              fontSize: 15,
            }}
          >
            Profile
          </Typography>
          <Typography
            variant="body2"
            sx={{
              lineHeight: 1.7,
              color: "#4B5563",
              fontSize: 13,
            }}
          >
            {b.intro ||
              ""}
          </Typography>
        </Box>

        {/* Experience */}
        <Box>
          <Typography
            variant="h6"
            sx={{
              color: "#111827",
              fontWeight: 700,
              borderBottom: "2px solid #F9735B",
              display: "inline-block",
              mb: 1.5,
              fontSize: 15,
            }}
          >
            Experience
          </Typography>
          {data.experience?.length ? (
            data.experience.map((ex, i) => (
              <Box key={i} sx={{ mb: 2 }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 700,
                    fontSize: 14,
                    color: "#111827",
                  }}
                >
                  {ex.position || "Role"}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#F9735B",
                    fontWeight: 500,
                    fontSize: 12,
                  }}
                >
                  {[ex.org, [ex.start, ex.end].filter(Boolean).join(" - ")]
                    .filter(Boolean)
                    .join("  |  ")}
                </Typography>
                {ex.description && (
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 0.75,
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

        {/* Projects */}
        <Box>
          <Typography
            variant="h6"
            sx={{
              color: "#111827",
              fontWeight: 700,
              borderBottom: "2px solid #F9735B",
              display: "inline-block",
              mb: 1.5,
              fontSize: 15,
            }}
          >
            Projects
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            {data.projects?.length ? (
              data.projects.map((p, i) => (
                <Box
                  key={i}
                  sx={{
                    width: { xs: "100%", sm: "48%" },
                    p: 2,
                    bgcolor: "#FFFFFF",
                    borderRadius: 2,
                    boxShadow: "0 2px 8px rgba(15,23,42,0.08)",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 700, fontSize: 13 }}
                  >
                    {p.title || "Project Title"}
                  </Typography>
                  {p.technologies && (
                    <Typography
                      variant="caption"
                      display="block"
                      sx={{ color: "#6B7280", mb: 0.75 }}
                    >
                      {p.technologies}
                    </Typography>
                  )}
                  {p.description && (
                    <Typography
                      variant="body2"
                      sx={{ fontSize: "0.8rem", color: "#4B5563" }}
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
        </Box>

        {/* Education */}
        <Box>
          <Typography
            variant="h6"
            sx={{
              color: "#111827",
              fontWeight: 700,
              borderBottom: "2px solid #F9735B",
              display: "inline-block",
              mb: 1.5,
              fontSize: 15,
            }}
          >
            Education
          </Typography>
          {data.education?.length ? (
            data.education.map((ed, i) => (
              <Box key={i} sx={{ mb: 1.25 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 700, fontSize: 13 }}
                >
                  {ed.degree || "Degree"}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#4B5563", fontSize: 12 }}
                >
                  {[ed.institution, ed.year].filter(Boolean).join(", ")}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              Add education
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
