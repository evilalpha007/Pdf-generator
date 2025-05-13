
import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { processPayment } from "../services/invoiceService";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface PaymentProcessorProps {
  amount: number;
  onPaymentSuccess: (transactionId: string) => void;
  onCancel: () => void;
}

const PaymentProcessor = ({ amount, onPaymentSuccess, onCancel }: PaymentProcessorProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate()
  // Helper function for displaying credit card number with spaces
  const formatCardNumber = (value: string): string => {
    return value
      .replace(/\s/g, "")
      .match(/.{1,4}/g)
      ?.join(" ") || "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsProcessing(true);
    try {
      // In a real app, this would send card details to a payment processor
      const transactionId = await processPayment(amount);
      toast.success("Payment processed successfully!");
      onPaymentSuccess(transactionId);
      navigate("/payment-success");
    } catch (error) {
      toast.error("Payment failed. Please try again.");
      console.error("Payment error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardContent className="pt-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-invoice-primary">
          Payment Details
        </h2>
        
        <div className="mb-4 text-center">
          <span className="text-gray-600">Amount due:</span>
          <span className="text-2xl font-bold ml-2 text-invoice-primary">
            ${amount.toFixed(2)}
          </span>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
              Name on Card
            </label>
            <input
              type="text"
              id="cardName"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="John Doe"
              required
            />
          </div>
          
          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="4242 4242 4242 4242"
              maxLength={19}
              onChange={(e) => {
                e.target.value = formatCardNumber(e.target.value);
              }}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              For testing, use: 4242 4242 4242 4242
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date
              </label>
              <input
                type="text"
                id="expiry"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="MM/YY"
                maxLength={5}
                required
              />
            </div>
            
            <div>
              <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 mb-1">
                CVC
              </label>
              <input
                type="text"
                id="cvc"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="123"
                maxLength={3}
                required
              />
            </div>
          </div>
          
          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isProcessing}
              className="w-full sm:w-auto"
            >
              Back
            </Button>
            <Button
              type="submit"
              disabled={isProcessing}
              className="w-full sm:w-auto bg-invoice-accent hover:bg-invoice-primary text-white"
            >
              {isProcessing ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Pay Now"
              )}
            </Button>
          </div>
        </form>
        
        <div className="mt-6 bg-gray-50 p-3 rounded-md text-xs text-gray-500">
          <p className="text-center">
            This is a test payment form. No real payments will be processed.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentProcessor;