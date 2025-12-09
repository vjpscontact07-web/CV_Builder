// src/pages/Editor.tsx
import { yupResolver } from "@hookform/resolvers/yup";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";
import RemoveIcon from "@mui/icons-material/Remove";
import SaveIcon from "@mui/icons-material/Save";
import ShareIcon from "@mui/icons-material/Share";
import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import html2canvas from "html2canvas";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";
import * as yup from "yup";
import PaymentModal from "../components/PaymentModal";
import DashboardLayout from "../layouts/DashboardLayout";
import type { TemplateData } from "../templates/TemplateClassic";
import TemplateClassic from "../templates/TemplateClassic";
import TemplateCreative from "../templates/TemplateCreative";
import TemplateModern from "../templates/TemplateModern";

// ---------- Yup schema & defaults ----------

const schema: yup.ObjectSchema<TemplateData> = yup.object({
  basic: yup.object({
    name: yup.string().required("Name is required"),
    title: yup.string().required("Title is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup.string().required("Phone is required"),

    // Optional fields — allow empty string
    address: yup.string().optional(),
    city: yup.string().optional(),
    state: yup.string().optional(),
    pincode: yup.string().optional(),

    intro: yup.string().max(600, "Intro is too long").optional(),
  }),

  education: yup
    .array(
      yup.object({
        degree: yup.string().required("Degree is required"),
        institution: yup.string().required("Institution is required"),

        year: yup.string().optional(),
        percentage: yup.string().optional(),
      })
    )
    .min(1, "At least one education entry is required"),

  experience: yup.array(
    yup.object({
      org: yup.string().optional(),
      position: yup.string().optional(),
      start: yup.string().optional(),
      end: yup.string().optional(),
      location: yup.string().optional(),
      description: yup.string().optional(),
    })
  ),

  projects: yup.array(
    yup.object({
      title: yup.string().optional(),
      duration: yup.string().optional(),
      teamSize: yup.string().optional(),
      technologies: yup.string().optional(),
      description: yup.string().optional(),
    })
  ),

  skills: yup.array(
    yup.object({
      name: yup.string().optional(),
      level: yup.number().min(0).max(100).optional(),
    })
  ),

  social: yup.array(
    yup.object({
      platform: yup.string().optional(),
      url: yup.string().url("Invalid URL").optional(),
    })
  ),
}) as yup.ObjectSchema<TemplateData>;

const defaultValues: TemplateData = {
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
};

export default function EditorPage() {
  const [searchParams] = useSearchParams();
  const { id } = useParams();
  const navigate = useNavigate();
  const layoutParam = searchParams.get("layout");

  const [title, setTitle] = useState("Untitled CV");
  const [currentLayout, setCurrentLayout] = useState(layoutParam || "layout-1");
  const [saving, setSaving] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [paymentAction, setPaymentAction] = useState<
    "download" | "share" | null
  >(null);
  const [isDirty, setIsDirty] = useState(false);

  const printRef = useRef<HTMLDivElement>(null);

  const methods = useForm<TemplateData>({
    resolver: yupResolver(schema),
    defaultValues,
    mode: "onBlur",
  });

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting, dirtyFields },
  } = methods;


  // mark dirty when RHF says something changed
  useEffect(() => {
    if (Object.keys(dirtyFields).length > 0) setIsDirty(true);
  }, [dirtyFields]);

  // Field arrays
  const educationArray = useFieldArray({ control, name: "education" });
  const experienceArray = useFieldArray({ control, name: "experience" });
  const projectsArray = useFieldArray({ control, name: "projects" });
  const skillsArray = useFieldArray({ control, name: "skills" });
  const socialArray = useFieldArray({ control, name: "social" });

  const TemplateComponent = useMemo(() => {
    if (currentLayout === "layout-2") return TemplateModern;
    if (currentLayout === "layout-3") return TemplateCreative;
    return TemplateClassic;
  }, [currentLayout]);

  // Load existing CV
  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/cvs/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const serverData: TemplateData = res.data.data || defaultValues;
        reset(serverData);
        setTitle(res.data.title || "Untitled CV");
        setCurrentLayout(res.data.layout || "layout-1");
        setIsDirty(false);
      } catch (err: any) {
        console.error(err);
        toast.error("Failed to load CV", { autoClose: 3000 }); 
      }
    })();
  }, [id, reset]);

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
      toast.success("Link copied to clipboard!", { autoClose: 2500 }); // [web:113]
    }
    setPaymentAction(null);
  };

  const triggerPayment = (action: "download" | "share") => {
    setPaymentAction(action);
    setPaymentOpen(true);
  };

  // Save handler uses RHF values
  const onSubmit = async (values: TemplateData) => {
    try {
      setSaving(true);

      // Capture thumbnail
      let thumbnail = "";
      if (printRef.current) {
        const canvas = await html2canvas(printRef.current, { scale: 0.5 });
        thumbnail = canvas.toDataURL("image/png");
      }

      const payload = { title, layout: currentLayout, data: values, thumbnail };
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
      toast.success("Saved successfully", { autoClose: 2500 });
    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Save failed", {
        autoClose: 3000,
      }); // [web:119]
    } finally {
      setSaving(false);
    }
  };

  const formData = watch(); 

    console.log("projectsArray:", projectsArray);


  return (
    <DashboardLayout>
      <Container
        sx={{
          py: 2,
          px: { xs: 1.5, sm: 2, md: 1 },
        }}
      >
        {/* Header actions */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "center" },
            justifyContent: "space-between",
            gap: 2,
            mb: 2.5,
          }}
        >
          <Box sx={{ width: { xs: "100%", sm: "auto" } }}>
            <TextField
              variant="standard"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setIsDirty(true);
              }}
              InputProps={{
                style: { fontSize: 22, fontWeight: 700 },
              }}
              fullWidth
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              justifyContent: { xs: "flex-start", sm: "flex-end" },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            <Button
              startIcon={<SaveIcon />}
              variant="outlined"
              onClick={handleSubmit(onSubmit)}
              disabled={saving || isSubmitting}
              sx={{ minWidth: { xs: "100%", sm: 120 } }}
            >
              {saving || isSubmitting ? "Saving..." : "Save"}
            </Button>
            <Button
              startIcon={<DownloadIcon />}
              variant="contained"
              color="secondary"
              onClick={() => triggerPayment("download")}
              sx={{ minWidth: { xs: "100%", sm: 150 } }}
            >
              Download PDF
            </Button>
            <Button
              startIcon={<ShareIcon />}
              variant="contained"
              onClick={() => triggerPayment("share")}
              sx={{ minWidth: { xs: "100%", sm: 110 } }}
            >
              Share
            </Button>
          </Box>
        </Box>

        <FormProvider {...methods}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: 2, md: 3 },
              alignItems: "stretch",
            }}
          >
            {/* LEFT: Form panel */}
            <Box sx={{ width: { xs: "100%", md: "36%", lg: "32%" } }}>
              <Box
                sx={{
                  bgcolor: "#fff",
                  p: { xs: 2, md: 3 },
                  borderRadius: 2,
                  boxShadow: 1,
                  maxHeight: { xs: "none", md: "80vh" },
                  overflowY: { xs: "visible", md: "auto" },
                }}
              >
                {/* Basic Details */}
                <Typography variant="h6" mb={1}>
                  Basic Details
                </Typography>

                <Controller
                  name="basic.name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Full name"
                      margin="dense"
                      error={!!errors.basic?.name}
                      helperText={errors.basic?.name?.message}
                    />
                  )}
                />
                <Controller
                  name="basic.title"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Title"
                      margin="dense"
                      error={!!errors.basic?.title}
                      helperText={errors.basic?.title?.message}
                    />
                  )}
                />
                <Controller
                  name="basic.email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Email"
                      margin="dense"
                      error={!!errors.basic?.email}
                      helperText={errors.basic?.email?.message}
                    />
                  )}
                />
                <Controller
                  name="basic.phone"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Phone"
                      margin="dense"
                      error={!!errors.basic?.phone}
                      helperText={errors.basic?.phone?.message}
                    />
                  )}
                />
                <Controller
                  name="basic.city"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="City"
                      margin="dense"
                    />
                  )}
                />
                <Controller
                  name="basic.intro"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Intro (short)"
                      margin="dense"
                      multiline
                      rows={3}
                      error={!!errors.basic?.intro}
                      helperText={errors.basic?.intro?.message}
                    />
                  )}
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
                      educationArray.append({
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

                {educationArray.fields.map((field, index) => (
                  <Box
                    key={field.id}
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
                        onClick={() => educationArray.remove(index)}
                      >
                        <RemoveIcon />
                      </IconButton>
                    </Box>
                    <Controller
                      name={`education.${index}.degree`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Degree"
                          margin="dense"
                          error={!!errors.education?.[index]?.degree}
                          helperText={
                            errors.education?.[index]?.degree?.message
                          }
                        />
                      )}
                    />
                    <Controller
                      name={`education.${index}.institution`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Institution"
                          margin="dense"
                          error={!!errors.education?.[index]?.institution}
                          helperText={
                            errors.education?.[index]?.institution?.message
                          }
                        />
                      )}
                    />
                    <Controller
                      name={`education.${index}.year`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Year"
                          margin="dense"
                        />
                      )}
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
                      experienceArray.append({
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

                {experienceArray.fields.map((field, index) => (
                  <Box
                    key={field.id}
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
                        onClick={() => experienceArray.remove(index)}
                      >
                        <RemoveIcon />
                      </IconButton>
                    </Box>
                    <Controller
                      name={`experience.${index}.org`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Organization"
                          margin="dense"
                        />
                      )}
                    />
                    <Controller
                      name={`experience.${index}.position`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Position"
                          margin="dense"
                        />
                      )}
                    />
                    <Controller
                      name={`experience.${index}.start`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Duration"
                          margin="dense"
                        />
                      )}
                    />
                    <Controller
                      name={`experience.${index}.description`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Description"
                          margin="dense"
                          multiline
                          rows={2}
                        />
                      )}
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
                      projectsArray.append({
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

                {projectsArray.fields.map((field, index) => (
                  <Box
                    key={field.id}
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
                        onClick={() => projectsArray.remove(index)}
                      >
                        <RemoveIcon />
                      </IconButton>
                    </Box>
                    <Controller
                      name={`projects.${index}.title`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Title"
                          margin="dense"
                        />
                      )}
                    />
                    <Controller
                      name={`projects.${index}.technologies`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Technologies"
                          margin="dense"
                        />
                      )}
                    />
                    <Controller
                      name={`projects.${index}.description`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Description"
                          margin="dense"
                          multiline
                          rows={2}
                        />
                      )}
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
                    onClick={() => skillsArray.append({ name: "", level: 0 })}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>

                {skillsArray.fields.map((field, index) => (
                  <Box
                    key={field.id}
                    sx={{
                      mb: 1,
                      display: "flex",
                      gap: 1,
                      alignItems: "center",
                    }}
                  >
                    <Controller
                      name={`skills.${index}.name`}
                      control={control}
                      render={({ field }) => (
                        <TextField {...field} label="Skill" size="small" />
                      )}
                    />
                    <Controller
                      name={`skills.${index}.level`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Level (%)"
                          size="small"
                          error={!!errors.skills?.[index]?.level}
                          helperText={errors.skills?.[index]?.level?.message}
                        />
                      )}
                    />
                    <IconButton
                      size="small"
                      onClick={() => skillsArray.remove(index)}
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
                      socialArray.append({
                        platform: "LinkedIn",
                        url: "",
                      })
                    }
                  >
                    <AddIcon />
                  </IconButton>
                </Box>

                {socialArray.fields.map((field, index) => (
                  <Box
                    key={field.id}
                    sx={{
                      mb: 1,
                      display: "flex",
                      gap: 1,
                      alignItems: "center",
                    }}
                  >
                    <Controller
                      name={`social.${index}.platform`}
                      control={control}
                      render={({ field }) => (
                        <TextField {...field} label="Platform" size="small" />
                      )}
                    />
                    <Controller
                      name={`social.${index}.url`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="URL"
                          size="small"
                          error={!!errors.social?.[index]?.url}
                          helperText={errors.social?.[index]?.url?.message}
                        />
                      )}
                    />
                    <IconButton
                      size="small"
                      onClick={() => socialArray.remove(index)}
                    >
                      <RemoveIcon />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* RIGHT: Preview panel */}
            <Box sx={{ width: { xs: "100%", md: "64%", lg: "68%" } }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  p: { xs: 1.5, md: 2 },
                  bgcolor: "#f5f5f5",
                  minHeight: { xs: 320, md: "100%" },
                  borderRadius: 2,
                }}
              >
                <Box
                  ref={printRef}
                  sx={{
                    width: { xs: "100%", sm: "90%", md: "100%" },
                    maxWidth: 900,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <TemplateComponent data={formData} />
                </Box>
              </Box>
            </Box>
          </Box>
        </FormProvider>

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
