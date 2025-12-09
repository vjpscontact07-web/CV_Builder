// src/pages/Editor.tsx
import React, { useEffect, useMemo, useState, useRef } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import DashboardLayout from "../layouts/DashboardLayout";
import TemplateClassic from "../templates/TemplateClassic";
import TemplateModern from "../templates/TemplateModern";
import TemplateCreative from "../templates/TemplateCreative";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import SaveIcon from "@mui/icons-material/Save";
import DownloadIcon from "@mui/icons-material/Download";
import ShareIcon from "@mui/icons-material/Share";
import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import PaymentModal from "../components/PaymentModal";
import type { TemplateData } from "../templates/TemplateClassic";
import html2canvas from "html2canvas";

const emptyData = (): TemplateData => ({
  basic: {
    name: "",
    title: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    intro: "",
  },
  education: [{ degree: "", institution: "", year: "", percentage: "" }],
  experience: [
    {
      org: "",
      position: "",
      start: "",
      end: "",
      location: "",
      description: "",
    },
  ],
  projects: [
    {
      title: "",
      duration: "",
      teamSize: "",
      technologies: "",
      description: "",
    },
  ],
  skills: [{ name: "", level: 0 }],
  social: [{ platform: "LinkedIn", url: "" }],
});

export default function EditorPage() {
  const [searchParams] = useSearchParams();
  const { id } = useParams();
  const navigate = useNavigate();
  const layoutParam = searchParams.get("layout");

  const [data, setData] = useState<TemplateData>(() => emptyData());
  const [title, setTitle] = useState("Untitled CV");
  const [currentLayout, setCurrentLayout] = useState(layoutParam || "layout-1");
  const [saving, setSaving] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [paymentAction, setPaymentAction] = useState<
    "download" | "share" | null
  >(null);
  const [isDirty, setIsDirty] = useState(false);

  const printRef = useRef<HTMLDivElement>(null);

  // Load existing CV
  useEffect(() => {
    if (id) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/cvs/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          setData(res.data.data || emptyData());
          setTitle(res.data.title);
          setCurrentLayout(res.data.layout || "layout-1");
        })
        .catch((err) => console.error(err));
    }
  }, [id]);

  // Warn on unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  const TemplateComponent = useMemo(() => {
    if (currentLayout === "layout-2") return TemplateModern;
    if (currentLayout === "layout-3") return TemplateCreative;
    return TemplateClassic;
  }, [currentLayout]);

  const handleChange = () => setIsDirty(true);

  const updateBasic = (field: string, value: any) => {
    setData((d) => ({ ...d, basic: { ...d.basic, [field]: value } }));
    handleChange();
  };

  const updateArrayItem = (
    section: keyof TemplateData,
    index: number,
    field: string,
    value: any
  ) => {
    setData((d) => {
      const arr = [...(d[section] as any)];
      arr[index] = { ...(arr[index] || {}), [field]: value };
      return { ...d, [section]: arr } as TemplateData;
    });
    handleChange();
  };

  const addArrayItem = (section: keyof TemplateData, templateItem: any) => {
    setData(
      (d) =>
        ({
          ...d,
          [section]: [...(d[section] as any), templateItem],
        } as TemplateData)
    );
    handleChange();
  };

  const removeArrayItem = (section: keyof TemplateData, index: number) => {
    setData((d) => {
      const arr = [...(d[section] as any)];
      arr.splice(index, 1);
      return { ...d, [section]: arr } as TemplateData;
    });
    handleChange();
  };

  const saveCV = async () => {
    try {
      setSaving(true);

      // Capture thumbnail
      let thumbnail = "";
      if (printRef.current) {
        const canvas = await html2canvas(printRef.current, { scale: 0.5 });
        thumbnail = canvas.toDataURL("image/png");
      }

      const payload = { title, layout: currentLayout, data, thumbnail };
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      if (id) {
        await axios.put(`${import.meta.env.VITE_API_URL}/cvs/${id}`, payload, {
          headers,
        });
      } else {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/cvs`,
          payload,
          { headers }
        );
        navigate(`/editor/${res.data._id}`, { replace: true });
      }
      setIsDirty(false);
      alert("Saved successfully");
    } catch (err: any) {
      console.error(err);
      alert(err?.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: title,
  });

  const onPaymentSuccess = () => {
    if (paymentAction === "download") {
      handlePrint();
    } else if (paymentAction === "share") {
      const url = window.location.href;
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
    setPaymentAction(null);
  };

  const triggerPayment = (action: "download" | "share") => {
    setPaymentAction(action);
    setPaymentOpen(true);
  };

  return (
    <DashboardLayout>
      <Container maxWidth="xl" sx={{ py: 3, mt: 10 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box>
            <TextField
              variant="standard"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                handleChange();
              }}
              InputProps={{ style: { fontSize: 24, fontWeight: 700 } }}
            />
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              startIcon={<SaveIcon />}
              variant="outlined"
              onClick={saveCV}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save"}
            </Button>
            <Button
              startIcon={<DownloadIcon />}
              variant="contained"
              color="secondary"
              onClick={() => triggerPayment("download")}
            >
              Download PDF
            </Button>
            <Button
              startIcon={<ShareIcon />}
              variant="contained"
              onClick={() => triggerPayment("share")}
            >
              Share
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
          }}
        >
          <Box sx={{ width: { xs: "100%", md: "33%", lg: "30%" } }}>
            <Box
              sx={{
                bgcolor: "#fff",
                p: 3,
                borderRadius: 2,
                boxShadow: 1,
                maxHeight: "80vh",
                overflowY: "auto",
              }}
            >
              {/* Basic Details */}
              <Typography variant="h6" mb={1}>
                Basic Details
              </Typography>
              <TextField
                fullWidth
                label="Full name"
                margin="dense"
                value={data.basic.name}
                onChange={(e) => updateBasic("name", e.target.value)}
              />
              <TextField
                fullWidth
                label="Title"
                margin="dense"
                value={data.basic.title}
                onChange={(e) => updateBasic("title", e.target.value)}
              />
              <TextField
                fullWidth
                label="Email"
                margin="dense"
                value={data.basic.email}
                onChange={(e) => updateBasic("email", e.target.value)}
              />
              <TextField
                fullWidth
                label="Phone"
                margin="dense"
                value={data.basic.phone}
                onChange={(e) => updateBasic("phone", e.target.value)}
              />
              <TextField
                fullWidth
                label="City"
                margin="dense"
                value={data.basic.city}
                onChange={(e) => updateBasic("city", e.target.value)}
              />
              <TextField
                fullWidth
                label="Intro (short)"
                margin="dense"
                value={data.basic.intro}
                onChange={(e) => updateBasic("intro", e.target.value)}
                multiline
                rows={3}
              />

              <Divider sx={{ my: 2 }} />

              {/* Education */}
              <Box
                sx={{
                  mb: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="subtitle1">Education</Typography>
                <IconButton
                  size="small"
                  onClick={() =>
                    addArrayItem("education", {
                      degree: "",
                      institution: "",
                      year: "",
                      percentage: "",
                    })
                  }
                >
                  <AddIcon />
                </IconButton>
              </Box>
              {data.education.map((ed, i) => (
                <Box
                  key={i}
                  sx={{
                    mb: 1,
                    p: 1,
                    borderRadius: 1,
                    border: "1px solid #EEE",
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <IconButton
                      size="small"
                      onClick={() => removeArrayItem("education", i)}
                    >
                      <RemoveIcon />
                    </IconButton>
                  </Box>
                  <TextField
                    fullWidth
                    label="Degree"
                    margin="dense"
                    value={ed.degree}
                    onChange={(e) =>
                      updateArrayItem("education", i, "degree", e.target.value)
                    }
                  />
                  <TextField
                    fullWidth
                    label="Institution"
                    margin="dense"
                    value={ed.institution}
                    onChange={(e) =>
                      updateArrayItem(
                        "education",
                        i,
                        "institution",
                        e.target.value
                      )
                    }
                  />
                  <TextField
                    fullWidth
                    label="Year"
                    margin="dense"
                    value={ed.year}
                    onChange={(e) =>
                      updateArrayItem("education", i, "year", e.target.value)
                    }
                  />
                </Box>
              ))}

              <Divider sx={{ my: 2 }} />

              {/* Experience */}
              <Box
                sx={{
                  mb: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="subtitle1">Experience</Typography>
                <IconButton
                  size="small"
                  onClick={() =>
                    addArrayItem("experience", {
                      org: "",
                      position: "",
                      start: "",
                      end: "",
                      location: "",
                      description: "",
                    })
                  }
                >
                  <AddIcon />
                </IconButton>
              </Box>
              {data.experience.map((ex, i) => (
                <Box
                  key={i}
                  sx={{
                    mb: 1,
                    p: 1,
                    borderRadius: 1,
                    border: "1px solid #EEE",
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <IconButton
                      size="small"
                      onClick={() => removeArrayItem("experience", i)}
                    >
                      <RemoveIcon />
                    </IconButton>
                  </Box>
                  <TextField
                    fullWidth
                    label="Organization"
                    margin="dense"
                    value={ex.org}
                    onChange={(e) =>
                      updateArrayItem("experience", i, "org", e.target.value)
                    }
                  />
                  <TextField
                    fullWidth
                    label="Position"
                    margin="dense"
                    value={ex.position}
                    onChange={(e) =>
                      updateArrayItem(
                        "experience",
                        i,
                        "position",
                        e.target.value
                      )
                    }
                  />
                  <TextField
                    fullWidth
                    label="Duration"
                    margin="dense"
                    value={ex.start}
                    onChange={(e) =>
                      updateArrayItem("experience", i, "start", e.target.value)
                    }
                  />
                  <TextField
                    fullWidth
                    label="Description"
                    margin="dense"
                    value={ex.description}
                    onChange={(e) =>
                      updateArrayItem(
                        "experience",
                        i,
                        "description",
                        e.target.value
                      )
                    }
                    multiline
                    rows={2}
                  />
                </Box>
              ))}

              <Divider sx={{ my: 2 }} />

              {/* Projects */}
              <Box
                sx={{
                  mb: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="subtitle1">Projects</Typography>
                <IconButton
                  size="small"
                  onClick={() =>
                    addArrayItem("projects", {
                      title: "",
                      duration: "",
                      teamSize: "",
                      technologies: "",
                      description: "",
                    })
                  }
                >
                  <AddIcon />
                </IconButton>
              </Box>
              {data.projects.map((p, i) => (
                <Box
                  key={i}
                  sx={{
                    mb: 1,
                    p: 1,
                    borderRadius: 1,
                    border: "1px solid #EEE",
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <IconButton
                      size="small"
                      onClick={() => removeArrayItem("projects", i)}
                    >
                      <RemoveIcon />
                    </IconButton>
                  </Box>
                  <TextField
                    fullWidth
                    label="Title"
                    margin="dense"
                    value={p.title}
                    onChange={(e) =>
                      updateArrayItem("projects", i, "title", e.target.value)
                    }
                  />
                  <TextField
                    fullWidth
                    label="Technologies"
                    margin="dense"
                    value={p.technologies}
                    onChange={(e) =>
                      updateArrayItem(
                        "projects",
                        i,
                        "technologies",
                        e.target.value
                      )
                    }
                  />
                  <TextField
                    fullWidth
                    label="Description"
                    margin="dense"
                    value={p.description}
                    onChange={(e) =>
                      updateArrayItem(
                        "projects",
                        i,
                        "description",
                        e.target.value
                      )
                    }
                    multiline
                    rows={2}
                  />
                </Box>
              ))}

              <Divider sx={{ my: 2 }} />

              {/* Skills */}
              <Box
                sx={{
                  mb: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="subtitle1">Skills</Typography>
                <IconButton
                  size="small"
                  onClick={() => addArrayItem("skills", { name: "", level: 0 })}
                >
                  <AddIcon />
                </IconButton>
              </Box>
              {data.skills.map((s, i) => (
                <Box
                  key={i}
                  sx={{ mb: 1, display: "flex", gap: 1, alignItems: "center" }}
                >
                  <TextField
                    label="Skill"
                    value={s.name}
                    onChange={(e) =>
                      updateArrayItem("skills", i, "name", e.target.value)
                    }
                    size="small"
                  />
                  <TextField
                    label="Level (%)"
                    value={s.level}
                    onChange={(e) =>
                      updateArrayItem(
                        "skills",
                        i,
                        "level",
                        Number(e.target.value)
                      )
                    }
                    size="small"
                  />
                  <IconButton
                    size="small"
                    onClick={() => removeArrayItem("skills", i)}
                  >
                    <RemoveIcon />
                  </IconButton>
                </Box>
              ))}

              <Divider sx={{ my: 2 }} />

              {/* Social */}
              <Box
                sx={{
                  mb: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="subtitle1">Social</Typography>
                <IconButton
                  size="small"
                  onClick={() =>
                    addArrayItem("social", { platform: "LinkedIn", url: "" })
                  }
                >
                  <AddIcon />
                </IconButton>
              </Box>
              {data.social.map((s, i) => (
                <Box
                  key={i}
                  sx={{ mb: 1, display: "flex", gap: 1, alignItems: "center" }}
                >
                  <TextField
                    label="Platform"
                    value={s.platform}
                    onChange={(e) =>
                      updateArrayItem("social", i, "platform", e.target.value)
                    }
                    size="small"
                  />
                  <TextField
                    label="URL"
                    value={s.url}
                    onChange={(e) =>
                      updateArrayItem("social", i, "url", e.target.value)
                    }
                    size="small"
                  />
                  <IconButton
                    size="small"
                    onClick={() => removeArrayItem("social", i)}
                  >
                    <RemoveIcon />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Box>

          <Box sx={{ width: { xs: "100%", md: "67%", lg: "70%" } }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                p: 2,
                bgcolor: "#f5f5f5",
                minHeight: "100%",
              }}
            >
              <Box
                ref={printRef}
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <TemplateComponent data={data} />
              </Box>
            </Box>
          </Box>
        </Box>

        <PaymentModal
          open={paymentOpen}
          onClose={() => setPaymentOpen(false)}
          onSuccess={onPaymentSuccess}
          amount={4.99}
        />
      </Container>
    </DashboardLayout>
  );
}
