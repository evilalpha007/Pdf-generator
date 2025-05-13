 
import { CheckCircle } from 'lucide-react'; 

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-4">
      <CheckCircle className="text-green-500 w-16 h-16 mb-4" />
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful</h1>
      <p className="text-lg text-gray-600 mb-6">
        Thank you! Your payment of <span className="font-semibold text-green-600">$217.33</span> was processed.
      </p>
      
      <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Invoice Ready</h2>
        <p className="text-gray-600 mb-4">You can now download your PDF invoice using the button below.</p>
        <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded transition">
          Download Invoice
        </button>
      </div>

      <p className="mt-8 text-sm text-gray-500">
        This is a test payment confirmation. No real transactions occurred.
      </p>
    </div>
  );
};

export default PaymentSuccess;
