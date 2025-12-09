// src/templates/TemplateCreative.tsx
import React from "react";
import { Box, Typography, Chip } from "@mui/material";
import type { TemplateData } from "./TemplateClassic";

export default function TemplateCreative({ data }: { data: TemplateData }) {
    const b = data.basic || {};
    return (
        <Box sx={{
            width: 800,
            maxWidth: "100%",
            bgcolor: "#fff",
            color: "#333",
            fontFamily: "'Outfit', sans-serif",
            display: "flex",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            overflow: "hidden",
            borderRadius: 2
        }}>
            {/* Sidebar */}
            <Box sx={{ width: 280, bgcolor: "#2c3e50", color: "#ecf0f1", p: 4, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ mb: 4, textAlign: 'center' }}>
                    <Box sx={{ width: 100, height: 100, bgcolor: "#e74c3c", borderRadius: "50%", mx: "auto", mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, fontWeight: 700 }}>
                        {b.name ? b.name.charAt(0) : "U"}
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1.2 }}>{b.name || "Your Name"}</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>{b.title || "Creative Designer"}</Typography>
                </Box>

                <Box sx={{ mb: 4 }}>
                    <Typography variant="subtitle2" sx={{ color: "#e74c3c", fontWeight: 700, mb: 1, textTransform: "uppercase", letterSpacing: 1 }}>Contact</Typography>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>{b.email}</Typography>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>{b.phone}</Typography>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>{b.city}, {b.state}</Typography>
                </Box>

                <Box sx={{ mb: 4 }}>
                    <Typography variant="subtitle2" sx={{ color: "#e74c3c", fontWeight: 700, mb: 1, textTransform: "uppercase", letterSpacing: 1 }}>Skills</Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {data.skills?.length ? data.skills.map((s, i) => (
                            <Chip key={i} label={s.name} size="small" sx={{ bgcolor: "rgba(255,255,255,0.1)", color: "#fff", border: 'none' }} />
                        )) : <Typography variant="body2" sx={{ opacity: 0.5 }}>Add skills</Typography>}
                    </Box>
                </Box>

                <Box>
                    <Typography variant="subtitle2" sx={{ color: "#e74c3c", fontWeight: 700, mb: 1, textTransform: "uppercase", letterSpacing: 1 }}>Social</Typography>
                    {data.social?.length ? data.social.map((s, i) => (
                        <Typography key={i} variant="body2" sx={{ mb: 0.5 }}><a href={s.url} style={{ color: 'inherit', textDecoration: 'none' }}>{s.platform}</a></Typography>
                    )) : <Typography variant="body2" sx={{ opacity: 0.5 }}>Add social</Typography>}
                </Box>
            </Box>

            {/* Main Content */}
            <Box sx={{ flex: 1, p: 4 }}>
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" sx={{ color: "#2c3e50", fontWeight: 700, borderBottom: "2px solid #e74c3c", display: "inline-block", mb: 2 }}>Profile</Typography>
                    <Typography variant="body2" sx={{ lineHeight: 1.6, color: "#555" }}>{b.intro || "Creative professional with a passion for design and innovation. Experienced in building user-centric digital products."}</Typography>
                </Box>

                <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" sx={{ color: "#2c3e50", fontWeight: 700, borderBottom: "2px solid #e74c3c", display: "inline-block", mb: 2 }}>Experience</Typography>
                    {data.experience?.length ? data.experience.map((ex, i) => (
                        <Box key={i} sx={{ mb: 2 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{ex.position}</Typography>
                            <Typography variant="body2" sx={{ color: "#e74c3c", fontWeight: 500 }}>{ex.org} | {ex.start} - {ex.end}</Typography>
                            <Typography variant="body2" sx={{ mt: 1, color: "#555" }}>{ex.description}</Typography>
                        </Box>
                    )) : <Typography variant="body2" color="text.secondary">Add experience</Typography>}
                </Box>

                <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" sx={{ color: "#2c3e50", fontWeight: 700, borderBottom: "2px solid #e74c3c", display: "inline-block", mb: 2 }}>Projects</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                        {data.projects?.length ? data.projects.map((p, i) => (
                            <Box key={i} sx={{ width: { xs: '100%', sm: '48%' }, p: 2, bgcolor: "#f9f9f9", borderRadius: 1 }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{p.title}</Typography>
                                <Typography variant="caption" display="block" sx={{ color: "#777", mb: 1 }}>{p.technologies}</Typography>
                                <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>{p.description}</Typography>
                            </Box>
                        )) : <Typography variant="body2" color="text.secondary">Add projects</Typography>}
                    </Box>
                </Box>

                <Box>
                    <Typography variant="h6" sx={{ color: "#2c3e50", fontWeight: 700, borderBottom: "2px solid #e74c3c", display: "inline-block", mb: 2 }}>Education</Typography>
                    {data.education?.length ? data.education.map((ed, i) => (
                        <Box key={i} sx={{ mb: 1 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{ed.degree}</Typography>
                            <Typography variant="body2" sx={{ color: "#555" }}>{ed.institution}, {ed.year}</Typography>
                        </Box>
                    )) : <Typography variant="body2" color="text.secondary">Add education</Typography>}
                </Box>
            </Box>
        </Box>
    );
}
