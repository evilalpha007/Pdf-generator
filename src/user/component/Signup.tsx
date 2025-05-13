import React, { useState } from "react";
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  useTheme,
  useMediaQuery,
  Link,
  Grid,
} from "@mui/material";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { signup } from "../../redux/store/authslice/userSlice";
import { useDispatch } from "react-redux";

const Signup: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<"user" | "admin">("user");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email || !role) {
      toast.error("All fields are required.");
      return;
    }

    const id =
      Date.now().toString() + Math.floor(Math.random() * 1000).toString();
    const newUser = { id, name, email, password, role };

    try {
      dispatch(signup(newUser));
      toast.success("Registration successful");
      navigate("/login");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        py: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{ p: { xs: 3, md: 5 }, borderRadius: 3, width: "100%" }}
      >
        <Typography variant="h5" component="h1" align="center" gutterBottom>
          Create Your Account
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <FormControl fullWidth>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              value={role}
              label="Role"
              onChange={(e) => setRole(e.target.value as "user" | "admin")}
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            size={isSmall ? "medium" : "large"}
            fullWidth
            sx={{ mt: 1 }}
          >
            Register
          </Button>
        </Box>

        <Grid container justifyContent="center" style={{ marginTop: 16 }}>
          <Link
            component="button"
            variant="body2"
            onClick={() => navigate("/login")}
            style={{ cursor: "pointer" }}
          >
            If you already have an account, login
          </Link>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Signup;
