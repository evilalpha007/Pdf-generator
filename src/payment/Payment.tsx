import { Button } from "@mui/material";
import { jsPDF } from "jspdf";

const Payment = () => {
  const handlePayment = () => {
    const isPaymentSuccessful = true; 
    if (isPaymentSuccessful) {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const doc = new jsPDF();
      doc.text(`Name: ${user.name}`, 10, 10);
      doc.text(`Email: ${user.email}`, 10, 20);
      doc.text(`Role: ${user.role}`, 10, 30);
      doc.text(`Registration Date: ${new Date().toLocaleDateString()}`, 10, 40);
      doc.save(`${user.name}_payment_details.pdf`);
    }
  };

  return (
    <Button onClick={handlePayment} variant="contained" color="primary">
      Make Payment
    </Button>
  );
};

export default Payment;
