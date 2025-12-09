import {
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  IconButton,
  InputAdornment
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import GoogleLoginButton from "../../components/SocialGoogleButton";
import AuthLayout from "../../layouts/AuthLayout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";

const schema = Yup.object().shape({
  identifier: Yup.string().required("Email or Username is required"),
  password: Yup.string().required("Password is required"),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { identifier: "", password: "" },
  });

  const submit = async (values: any) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        values
      );

      localStorage.setItem("token", res.data.token);

      toast.success("Login successful!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 800);

    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <AuthLayout title="Welcome Back">
      <Box component="form" onSubmit={handleSubmit(submit)}>
        <TextField
          label="Email or Username"
          fullWidth
          margin="normal"
          {...register("identifier")}
          error={!!errors.identifier}
          helperText={errors.identifier?.message}
        />

        <TextField
          type={showPassword ? "text" : "password"}
          label="Password"
          fullWidth
          margin="normal"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button variant="contained" fullWidth sx={{ mt: 2 }} type="submit">
          Login
        </Button>

        <Divider sx={{ my: 3 }}>OR</Divider>

        <GoogleLoginButton />

        <Typography
          variant="body2"
          textAlign="center"
          mt={3}
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/register")}
        >
          Don't have an account? <b>Register</b>
        </Typography>
      </Box>
    </AuthLayout>
  );
}
