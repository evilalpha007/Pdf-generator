
import { useState } from "react";
import { useNavigate } from "react-router-dom";   
import { toast } from "sonner";
import InvoiceForm from "../../components/InvioceForm";
import InvoicePreview from "../../components/InvoicePreview";
import PaymentProcessor from "../../components/PaymentProcessor";
import type { InvoiceData } from "../../types/invoice";
import { generateInvoicePDF } from "../../services/invoiceService";

//@ts-ignore
enum Step {
  FORM,
  PREVIEW,
  PAYMENT,
}

const InvoiceCreator = () => {
  const [step, setStep] = useState<Step>(Step.FORM);
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleFormSubmit = (data: InvoiceData) => {
    setInvoiceData(data);
    setStep(Step.PREVIEW);
    const pdfData = generateInvoicePDF(data);
    setPdfUrl(pdfData);
  };

  const handleEditClick = () => {
    setStep(Step.FORM);
  };

  const handleProceedClick = () => {
    setStep(Step.PAYMENT);
  };

  const handlePaymentSuccess = (transactionId: string) => {
    console.log("Payment successful with transaction ID:", transactionId);
    
    if (pdfUrl) {
      localStorage.setItem("invoicePdfUrl", pdfUrl);
      localStorage.setItem("transactionId", transactionId);
      
      navigate("/payment-success");
    }
  };

  const handleCancelPayment = () => {
    setStep(Step.PREVIEW);
    toast.info("Payment canceled");
  };

  const calculateTotal = () => {
    if (!invoiceData) return 0;
    const subtotal = invoiceData.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const tax = subtotal * (invoiceData.taxRate / 100);
    return subtotal + tax;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-5xl">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-invoice-primary">PDF Invoice Generator</h1>
          {step === Step.FORM && (
            <p className="text-gray-600 mt-2">Create your invoice by filling in the details below</p>
          )}
          {step === Step.PREVIEW && (
            <p className="text-gray-600 mt-2">Preview your invoice before proceeding to payment</p>
          )}
          {step === Step.PAYMENT && (
            <p className="text-gray-600 mt-2">Complete the payment to download your invoice</p>
          )}
        </header>

        <div className="mb-6">
          <div className="flex justify-center items-center">
            <div className={`step-item ${step >= Step.FORM ? "active" : ""}`}>
              <div className={`step-circle ${step >= Step.FORM ? "bg-invoice-primary text-white" : "bg-gray-200"}`}>
                1
              </div>
              <div className="step-text">Create</div>
            </div>
            <div className={`step-connector ${step >= Step.PREVIEW ? "bg-invoice-primary" : "bg-gray-200"}`}></div>
            <div className={`step-item ${step >= Step.PREVIEW ? "active" : ""}`}>
              <div className={`step-circle ${step >= Step.PREVIEW ? "bg-invoice-primary text-white" : "bg-gray-200"}`}>
                2
              </div>
              <div className="step-text">Preview</div>
            </div>
            <div className={`step-connector ${step >= Step.PAYMENT ? "bg-invoice-primary" : "bg-gray-200"}`}></div>
            <div className={`step-item ${step >= Step.PAYMENT ? "active" : ""}`}>
              <div className={`step-circle ${step >= Step.PAYMENT ? "bg-invoice-primary text-white" : "bg-gray-200"}`}>
                3
              </div>
              <div className="step-text">Payment</div>
            </div>
          </div>
        </div>

        <style>
          {`
          .step-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 80px;
          }
          .step-circle {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            margin-bottom: 8px;
          }
          .step-text {
            font-size: 14px;
            color: #666;
          }
          .step-connector {
            height: 2px;
            width: 80px;
          }
          .step-item.active .step-text {
            color: #1a365d;
            font-weight: 500;
          }
          `}
        </style>

        {step === Step.FORM && <InvoiceForm onSubmit={handleFormSubmit} />}
        
        {step === Step.PREVIEW && invoiceData && (
          <InvoicePreview
            data={invoiceData}
            onEdit={handleEditClick}
            onProceed={handleProceedClick}
          />
        )}
        
        {step === Step.PAYMENT && (
          <PaymentProcessor
            amount={calculateTotal()}
            onPaymentSuccess={handlePaymentSuccess}
            onCancel={handleCancelPayment}
          />
        )}
      </div>
    </div>
  );
};

export default InvoiceCreator;
