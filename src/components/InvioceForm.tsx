
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent } from "../components/ui/card"; 
import { format } from "date-fns";
import type { InvoiceData, InvoiceItem } from "../types/invoice";

const defaultItem: InvoiceItem = {
  id: uuidv4(),
  description: "",
  quantity: 1,
  price: 0,
};

const initialInvoiceData: InvoiceData = {
  invoiceNumber: `INV-${Math.floor(10000 + Math.random() * 90000)}`,
  date: format(new Date(), "yyyy-MM-dd"),
  dueDate: format(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), "yyyy-MM-dd"),
  companyName: "",
  companyAddress: "",
  companyEmail: "",
  companyPhone: "",
  clientName: "",
  clientAddress: "",
  clientEmail: "",
  items: [{ ...defaultItem }],
  notes: "",
  taxRate: 0,
};

interface InvoiceFormProps {
  onSubmit: (data: InvoiceData) => void;
}

const InvoiceForm = ({ onSubmit }: InvoiceFormProps) => {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({ ...initialInvoiceData });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInvoiceData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setInvoiceData((prev) => ({
      ...prev,
      items: prev.items.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    }));
  };

  const addItem = () => {
    setInvoiceData((prev) => ({
      ...prev,
      items: [...prev.items, { ...defaultItem, id: uuidv4() }],
    }));
  };

  const removeItem = (id: string) => {
    if (invoiceData.items.length === 1) return;
    setInvoiceData((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }));
  };

  const calculateSubtotal = () => {
    return invoiceData.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * (invoiceData.taxRate / 100);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(invoiceData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-4 text-invoice-primary">Company Information</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={invoiceData.companyName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="companyAddress">Address</Label>
                  <Textarea
                    id="companyAddress"
                    name="companyAddress"
                    value={invoiceData.companyAddress}
                    onChange={handleChange}
                    required
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="companyEmail">Email</Label>
                    <Input
                      id="companyEmail"
                      name="companyEmail"
                      type="email"
                      value={invoiceData.companyEmail}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="companyPhone">Phone</Label>
                    <Input
                      id="companyPhone"
                      name="companyPhone"
                      value={invoiceData.companyPhone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4 text-invoice-primary">Client Information</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="clientName">Client Name</Label>
                  <Input
                    id="clientName"
                    name="clientName"
                    value={invoiceData.clientName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="clientAddress">Address</Label>
                  <Textarea
                    id="clientAddress"
                    name="clientAddress"
                    value={invoiceData.clientAddress}
                    onChange={handleChange}
                    required
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="clientEmail">Email</Label>
                  <Input
                    id="clientEmail"
                    name="clientEmail"
                    type="email"
                    value={invoiceData.clientEmail}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-invoice-primary">Invoice Details</h3>
            <div className="flex gap-4">
              <div>
                <Label htmlFor="invoiceNumber">Invoice #</Label>
                <Input
                  id="invoiceNumber"
                  name="invoiceNumber"
                  value={invoiceData.invoiceNumber}
                  onChange={handleChange}
                  required
                  className="w-32"
                />
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={invoiceData.date}
                  onChange={handleChange}
                  required
                  className="w-36"
                />
              </div>
              <div>
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  name="dueDate"
                  type="date"
                  value={invoiceData.dueDate}
                  onChange={handleChange}
                  required
                  className="w-36"
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="grid grid-cols-12 gap-2 mb-2 font-medium text-invoice-primary bg-gray-50 p-2 rounded">
              <div className="col-span-6">Description</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-1 text-center">Amount</div>
              <div className="col-span-1"></div>
            </div>

            {invoiceData.items.map((item) => (
              <div key={item.id} className="grid grid-cols-12 gap-2 mb-2 invoice-item items-center p-2">
                <div className="col-span-6">
                  <Input
                    value={item.description}
                    onChange={(e) => handleItemChange(item.id, "description", e.target.value)}
                    placeholder="Item description"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(item.id, "quantity", parseInt(e.target.value) || 1)}
                    required
                    className="text-center"
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.price}
                    onChange={(e) => handleItemChange(item.id, "price", parseFloat(e.target.value) || 0)}
                    required
                    className="text-center"
                  />
                </div>
                <div className="col-span-1 text-right font-medium">
                  ${(item.quantity * item.price).toFixed(2)}
                </div>
                <div className="col-span-1 text-center">
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                    onClick={() => removeItem(item.id)}
                    disabled={invoiceData.items.length === 1}
                  >
                    ×
                  </Button>
                </div>
              </div>
            ))}

            <div className="mt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addItem}
                className="border-dashed border-gray-300 hover:bg-gray-50"
              >
                + Add Item
              </Button>
            </div>

            <div className="mt-6 flex justify-end">
              <div className="w-64 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span>Tax Rate:</span>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      name="taxRate"
                      value={invoiceData.taxRate}
                      onChange={handleChange}
                      className="w-16 h-8 text-center"
                    />
                    <span>%</span>
                  </div>
                  <span>${calculateTax().toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold pt-2 border-t text-invoice-primary">
                  <span>Total:</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              value={invoiceData.notes}
              onChange={handleChange}
              placeholder="Additional notes or payment instructions..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button
          type="submit"
          className="bg-invoice-accent hover:bg-invoice-primary text-white py-2 px-6 rounded-md text-lg"
        >
          Preview Invoice
        </Button>
      </div>
    </form>
  );
};

export default InvoiceForm;