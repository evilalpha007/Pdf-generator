 
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import type { InvoiceData } from "../types/invoice";

interface InvoicePreviewProps {
  data: InvoiceData;
  onEdit: () => void;
  onProceed: () => void;
}

const InvoicePreview = ({ data, onEdit, onProceed }: InvoicePreviewProps) => {
  const calculateSubtotal = () => {
    return data.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * (data.taxRate / 100);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="invoice-header">
          <h2 className="text-2xl font-bold mb-1">INVOICE</h2>
          <p className="text-sm opacity-80">Preview</p>
        </div>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-invoice-primary mb-2">From:</h3>
              <div className="space-y-1">
                <p className="font-medium">{data.companyName}</p>
                <p className="text-sm whitespace-pre-line">{data.companyAddress}</p>
                <p className="text-sm">{data.companyEmail}</p>
                <p className="text-sm">{data.companyPhone}</p>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-invoice-primary mb-2">Bill To:</h3>
              <div className="space-y-1">
                <p className="font-medium">{data.clientName}</p>
                <p className="text-sm whitespace-pre-line">{data.clientAddress}</p>
                <p className="text-sm">{data.clientEmail}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <span className="font-bold text-invoice-primary">Invoice Number:</span>
                <span>{data.invoiceNumber}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="font-bold text-invoice-primary">Invoice Date:</span>
                <span>{data.date}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="font-bold text-invoice-primary">Due Date:</span>
                <span>{data.dueDate}</span>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse mb-6">
              <thead>
                <tr className="bg-invoice-light">
                  <th className="text-left p-3 border-b border-gray-200">Description</th>
                  <th className="text-center p-3 border-b border-gray-200">Quantity</th>
                  <th className="text-right p-3 border-b border-gray-200">Price</th>
                  <th className="text-right p-3 border-b border-gray-200">Amount</th>
                </tr>
              </thead>
              <tbody>
                {data.items.map((item) => (
                  <tr key={item.id} className="invoice-item">
                    <td className="p-3 border-b border-gray-200">{item.description}</td>
                    <td className="p-3 border-b border-gray-200 text-center">{item.quantity}</td>
                    <td className="p-3 border-b border-gray-200 text-right">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="p-3 border-b border-gray-200 text-right">
                      ${(item.quantity * item.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end">
            <div className="w-64 space-y-2">
              <div className="flex justify-between py-1">
                <span>Subtotal:</span>
                <span>${calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Tax ({data.taxRate}%):</span>
                <span>${calculateTax().toFixed(2)}</span>
              </div>
              <div className="flex justify-between invoice-total text-invoice-primary">
                <span>Total:</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>

          {data.notes && (
            <div className="mt-8 border-t border-gray-200 pt-4">
              <h4 className="font-bold text-invoice-primary mb-2">Notes</h4>
              <p className="text-sm whitespace-pre-line">{data.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onEdit}
          className="border-invoice-primary text-invoice-primary hover:bg-invoice-light"
        >
          Edit Invoice
        </Button>
        <Button
          type="button"
          onClick={onProceed}
          className="bg-invoice-accent hover:bg-invoice-primary text-white"
        >
          Proceed to Payment (${calculateTotal().toFixed(2)})
        </Button>
      </div>
    </div>
  );
};

export default InvoicePreview;