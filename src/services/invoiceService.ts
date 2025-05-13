 
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import type { InvoiceData } from "../types/invoice";

declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

export const generateInvoicePDF = (data: InvoiceData): string => {
  const doc = new jsPDF();
  
  // Add company info
  doc.setFontSize(20);
  doc.setTextColor(26, 54, 93); 
  doc.text("INVOICE", 14, 20);
  
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Invoice #: ${data.invoiceNumber}`, 14, 30);
  doc.text(`Date: ${data.date}`, 14, 35);
  doc.text(`Due Date: ${data.dueDate}`, 14, 40);
  
  // Company details
  doc.setFontSize(12);
  doc.setTextColor(26, 54, 93);
  doc.text("From:", 14, 55);
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  doc.text(data.companyName, 14, 60);
  
  const companyAddressLines = data.companyAddress.split("\n");
  let yPos = 65;
  companyAddressLines.forEach(line => {
    doc.text(line, 14, yPos);
    yPos += 5;
  });
  
  doc.text(data.companyEmail, 14, yPos);
  doc.text(data.companyPhone, 14, yPos + 5);
  
  // Client details
  doc.setFontSize(12);
  doc.setTextColor(26, 54, 93);
  doc.text("Bill To:", 120, 55);
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  doc.text(data.clientName, 120, 60);
  
  const clientAddressLines = data.clientAddress.split("\n");
  yPos = 65;
  clientAddressLines.forEach(line => {
    doc.text(line, 120, yPos);
    yPos += 5;
  });
  
  doc.text(data.clientEmail, 120, yPos);
  
  // Invoice items 
  const tableColumn = ["Description", "Quantity", "Price", "Amount"];
  const tableRows: any[] = [];
  
  data.items.forEach((item) => {
    const amount = item.quantity * item.price;
    tableRows.push([
      item.description,
      item.quantity,
      `$${item.price.toFixed(2)}`,
      `$${amount.toFixed(2)}`
    ]);
  });
  
  const subtotal = data.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  const tax = subtotal * (data.taxRate / 100);
  const total = subtotal + tax;
  
  // Add table
  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 95,
    theme: 'grid',
    headStyles: { fillColor: [26, 54, 93], textColor: [255, 255, 255] },
    alternateRowStyles: { fillColor: [240, 240, 240] },
    margin: { top: 20 }
  });
  
  // Add totals
  let finalY = (doc as any).lastAutoTable.finalY + 10;
  
  doc.setFontSize(10);
  doc.text("Subtotal:", 140, finalY);
  doc.text(`$${subtotal.toFixed(2)}`, 170, finalY, { align: "right" });
  
  finalY += 5;
  doc.text(`Tax (${data.taxRate}%):`, 140, finalY);
  doc.text(`$${tax.toFixed(2)}`, 170, finalY, { align: "right" });
  
  finalY += 5;
  doc.setFontSize(12);
  //@ts-ignore
  doc.setFont(undefined, 'bold');
  doc.text("Total:", 140, finalY);
  doc.text(`$${total.toFixed(2)}`, 170, finalY, { align: "right" });
  
  // Add notes if any
  if (data.notes) {
    finalY += 15;
    doc.setFontSize(11);
    //@ts-ignore
    doc.setFont(undefined, 'bold');
    doc.setTextColor(26, 54, 93);
    doc.text("Notes:", 14, finalY);
    //@ts-ignore
    doc.setFont(undefined, 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    
    const notesLines = doc.splitTextToSize(data.notes, 180);
    finalY += 5;
    doc.text(notesLines, 14, finalY);
  }
  
  const pdfOutput = doc.output('datauristring');
  return pdfOutput;
};

export const processPayment = async (amount: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isSuccess = Math.random() > 0.2; 
      
      if (isSuccess) {
        const transactionId = `tx_${Math.random().toString(36).substring(2, 15)}`;
        console.log(`Payment of $${amount.toFixed(2)} processed successfully. Transaction ID: ${transactionId}`);
        resolve(transactionId);
      } else {
        console.error(`Payment of $${amount.toFixed(2)} failed`);
        reject(new Error("Payment processing failed. Please try again."));
      }
    }, 2000); 
  });
};