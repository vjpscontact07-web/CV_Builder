import { Typography, CircularProgress, Box } from "@mui/material";
import DashboardLayout from "../../layouts/DashboardLayout";
import AddNewCvCard from "../../components/AddNewCvCard";
import CvCard from "../../components/CvCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface CV {
  _id: string;
  title: string;
  updatedAt: string;
  thumbnail?: string;
}

export default function Dashboard() {
  const [cvs, setCvs] = useState<CV[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCVs();
  }, []);

  const fetchCVs = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/cvs`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setCvs(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this resume?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/cvs/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setCvs((prev) => prev.filter((cv) => cv._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete resume");
    }
  };

  return (
    <DashboardLayout>
      <Box sx={{ px: { xs: 2, sm: 4 }, py: { xs: 2, sm: 3 } }}>
        <Typography
          variant="h5"
          fontWeight={700}
          mb={4}
          color="primary.main"
        >
          Your CVs
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
            <CircularProgress color="primary" />
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
            }}
          >
            {/* Add New Card */}
            <Box
              sx={{
                width: { xs: "100%", sm: "48%", md: "31%", lg: "23%" },
                backgroundColor: "#fff",
                borderRadius: 3,
                border: "1px solid #eaeaea",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                cursor: "pointer",
                transition: "all 0.25s ease",
                "&:hover": {
                  boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                  transform: "translateY(-4px)",
                },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "180px",
                p: 2,
              }}
              onClick={() => navigate("/layout")}
            >
              <AddNewCvCard />
            </Box>

            {/* CV Cards */}
            {cvs.map((cv) => (
              <Box
                key={cv._id}
                sx={{
                  width: { xs: "100%", sm: "48%", md: "31%", lg: "23%" },
                  backgroundColor: "#fff",
                  borderRadius: 3,
                  border: "1px solid #eaeaea",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  transition: "all 0.25s ease",
                  "&:hover": {
                    boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                    transform: "translateY(-4px)",
                  },
                  overflow: "hidden",
                }}
              >
                <CvCard
                  title={cv.title}
                  thumbnail={cv.thumbnail}
                  onEdit={() => navigate(`/editor/${cv._id}`)}
                  onDelete={() => handleDelete(cv._id)}
                />
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </DashboardLayout>
  );
}
