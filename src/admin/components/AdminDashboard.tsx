import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import { jsPDF } from "jspdf";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/store/authslice/userSlice";
import { useDispatch } from "react-redux";

const AdminDashboard = () => {
  const [users, setUsers] = useState<any[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      let storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
      console.log("Stored users:", storedUsers);

      if (!Array.isArray(storedUsers)) {
        storedUsers = [storedUsers];
      }

      setUsers(storedUsers);
    } catch (error) {
      console.error("Failed to parse users from localStorage:", error);
      setUsers([]);
    }
  }, []);

  const handleDownloadPDF = (user: any) => {
    try {
      const doc = new jsPDF();
      doc.text(`Name: ${user.name}`, 10, 10);
      doc.text(`Email: ${user.email}`, 10, 20);
      doc.text(`Role: ${user.role}`, 10, 30);
      doc.save(`${user.name}_profile.pdf`);
      toast.success(`PDF downloaded for ${user.name}`);
    } catch (error) {
      toast.error("Failed to generate PDF");
      console.error(error);
    }
  };

  const handleLogout = () => {
    toast.success("Logged out successfully");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Box p={4}>
      <Grid container justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight={600}>
          Admin Dashboard
        </Typography>
        <Button variant="contained" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Grid>

      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell>
                  <strong>Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Email</strong>
                </TableCell>
                <TableCell>
                  <strong>Role</strong>
                </TableCell>
                <TableCell>
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleDownloadPDF(user)}
                      >
                        Download PDF
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default AdminDashboard;
