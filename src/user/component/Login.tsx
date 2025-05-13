import React, { useState } from "react";
import { TextField, Button, Grid, Typography ,Link } from "@mui/material";
import {  useNavigate } from "react-router-dom";
import { z } from "zod";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "../../redux/store/authslice/userSlice";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = () => {
    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      const fieldErrors: { email?: string; password?: string } = {};
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0] as "email" | "password"] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");

  

    const foundUser = storedUsers.find(
      (user: any) => user.email === email && user.password === password
    );

    if (foundUser) {
      dispatch(login(foundUser)); 
      toast.success("Login successful");
      navigate(
        foundUser.role === "admin" ? "/admin-dashboard" : "/user-dashboard"
      );
    } else {
      toast.error("Invalid credentials");
    }
  };
  

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Grid item xs={12} sm={6} md={4}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
        />
        <Button
          onClick={handleLogin}
          variant="contained"
          color="primary"
          fullWidth
        >
          Login
        </Button>
        {/* Signup Link */}
        <Grid container justifyContent="center" style={{ marginTop: 16 }}>
          <Link
            component="button"
            variant="body2"
            onClick={() => navigate("/signup")}
            style={{ cursor: "pointer" }}
          >
            Don't have an account? Sign Up
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
