 
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";
import { Button } from "../../components/ui/button";

export const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 bg-invoice-primary rounded-full flex items-center justify-center">
              <FileText className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-invoice-primary mb-4">
            PDF Invoice Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create professional invoices in seconds, process payments, and download your documents instantly.
          </p>
        </header>

        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="p-10 flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h2 className="text-2xl font-bold text-invoice-primary mb-4">
                  Simple and Powerful Invoice Generation
                </h2>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center">
                    <span className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center mr-2">
                      <span className="text-green-500">✓</span>
                    </span>
                    Create professional invoices
                  </li>
                  <li className="flex items-center">
                    <span className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center mr-2">
                      <span className="text-green-500">✓</span>
                    </span>
                    Process payments securely
                  </li>
                  <li className="flex items-center">
                    <span className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center mr-2">
                      <span className="text-green-500">✓</span>
                    </span>
                    Download PDF invoices
                  </li>
                </ul>
                <div className="mt-8">
                  <Link to="/invoice">
                    <Button className="bg-invoice-accent hover:bg-invoice-primary text-white font-bold py-3 px-8 rounded-md transition duration-300">
                      Create Invoice Now
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                  alt="Invoice illustration" 
                  className="rounded-lg shadow-md w-full max-w-md object-cover" 
                />
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-500 text-sm">
              © 2025 PDF Invoice Generator. This is a demo application.
              <br />
              All payment processing is done in test mode.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
 