import { useState } from "react";
import { toast } from "react-toastify";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, Download, FileText, Receipt, Printer, Mail, Check } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const RentReceipt = () => {
  const [receiptData, setReceiptData] = useState({
    receiptNumber: "",
    tenantName: "",
    tenantAddress: "",
    landlordName: "",
    landlordAddress: "",
    propertyAddress: "",
    rentAmount: "",
    period: "",
    paymentMethod: "",
    paymentDate: null as Date | null,
    additionalNotes: ""
  });

  const [generatedReceipt, setGeneratedReceipt] = useState<any>(null);
  const [errors, setErrors] = useState<any>({});

  const validateForm = () => {
    const newErrors: any = {};
    
    if (!receiptData.tenantName) newErrors.tenantName = "Tenant name is required";
    if (!receiptData.landlordName) newErrors.landlordName = "Landlord name is required";
    if (!receiptData.rentAmount) newErrors.rentAmount = "Rent amount is required";
    if (!receiptData.period) newErrors.period = "Period is required";
    if (!receiptData.paymentDate) newErrors.paymentDate = "Payment date is required";
    if (!receiptData.paymentMethod) newErrors.paymentMethod = "Payment method is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateReceipt = async () => {
    if (!validateForm()) return;

    const receipt = {
      ...receiptData,
      receiptNumber: receiptData.receiptNumber || `RR${Date.now()}`,
      generatedDate: new Date(),
      id: Date.now()
    };

    try {
      console.log('Sending rent receipt data:', receipt);

      // Get token for authentication
      const token = localStorage.getItem('token') || localStorage.getItem('authToken') || localStorage.getItem('access_token');
      
      const response = await fetch('http://127.0.0.1:8000/api/rent-receipts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify({
          receipt_number: receipt.receiptNumber,
          tenant_name: receipt.tenantName,
          tenant_address: receipt.tenantAddress || '',
          landlord_name: receipt.landlordName,
          landlord_address: receipt.landlordAddress || '',
          property_address: receipt.propertyAddress || '',
          rent_amount: receipt.rentAmount,
          period: receipt.period,
          payment_method: receipt.paymentMethod,
          payment_date: receipt.paymentDate ? format(receipt.paymentDate, 'yyyy-MM-dd') : '',
          additional_notes: receipt.additionalNotes || ''
        })
      });

      console.log('Response status:', response.status);
      const result = await response.json();
      console.log('API Response:', result);

      if (response.ok) {
        toast.success("Rent receipt generated and saved successfully!");
        setGeneratedReceipt(receipt);
      } else {
        throw new Error(result.message || 'Failed to save receipt');
      }
    } catch (error) {
      console.error('Error saving receipt:', error);
      toast.error("Failed to save receipt. Please try again.");
      // Still show the receipt even if save fails
      setGeneratedReceipt(receipt);
    }
  };

  const downloadPDF = () => {
    // In a real implementation, this would generate and download a PDF
    toast.info("PDF download functionality would be implemented here");
  };

  const emailReceipt = () => {
    // In a real implementation, this would email the receipt
    toast.info("Email functionality would be implemented here");
  };

  const printReceipt = () => {
    window.print();
  };

  const predefinedPeriods = [
    "January 2024",
    "February 2024", 
    "March 2024",
    "April 2024",
    "May 2024",
    "June 2024",
    "Q1 2024",
    "Q2 2024",
    "H1 2024",
    "monthly",
    "quarterly",
   
    "yearly"
  ];

 const paymentMethods = [
  { label: "Cash", value: "cash" },
  { label: "Bank Transfer", value: "bank_transfer" },
  { label: "UPI", value: "upi" },
  { label: "Cheque", value: "cheque" },
  { label: "Online Banking", value: "online_banking" },
  { label: "Credit Card", value: "credit_card" },
  { label: "Debit Card", value: "debit_card" }
];


  return (
    <div className="min-h-screen bg-background">
      {/* <Header /> */}
      
      {/* Hero Section */}
      <section className="relative py-5 bg-gradient-to-br from-purple-600/10 to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-secondary bg-clip-text text-transparent">
              Rent Receipt Generator
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Generate professional rent receipts instantly for tax benefits and record keeping
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="px-4 py-2">
                <FileText className="w-4 h-4 mr-2" />
                HRA Tax Benefits
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <Receipt className="w-4 h-4 mr-2" />
                Legal Documentation
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <Check className="w-4 h-4 mr-2" />
                Instant Generation
              </Badge>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Form Section */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="w-5 h-5" />
                  Rent Receipt Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Receipt Number */}
                <div className="space-y-2">
                  <Label htmlFor="receiptNumber">Receipt Number (Optional)</Label>
                  <Input
                    id="receiptNumber"
                    placeholder="Auto-generated if left empty"
                    value={receiptData.receiptNumber}
                    onChange={(e) => setReceiptData(prev => ({...prev, receiptNumber: e.target.value}))}
                  />
                </div>

                {/* Tenant Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Tenant Details</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="tenantName">Tenant Name *</Label>
                    <Input
                      id="tenantName"
                      placeholder="Enter tenant's full name"
                      value={receiptData.tenantName}
                      onChange={(e) => setReceiptData(prev => ({...prev, tenantName: e.target.value}))}
                      className={errors.tenantName ? "border-red-500" : ""}
                    />
                    {errors.tenantName && <p className="text-red-500 text-sm">{errors.tenantName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tenantAddress">Tenant Address</Label>
                    <Textarea
                      id="tenantAddress"
                      placeholder="Enter tenant's address"
                      value={receiptData.tenantAddress}
                      onChange={(e) => setReceiptData(prev => ({...prev, tenantAddress: e.target.value}))}
                    />
                  </div>
                </div>

                {/* Landlord Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Landlord Details</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="landlordName">Landlord Name *</Label>
                    <Input
                      id="landlordName"
                      placeholder="Enter landlord's full name"
                      value={receiptData.landlordName}
                      onChange={(e) => setReceiptData(prev => ({...prev, landlordName: e.target.value}))}
                      className={errors.landlordName ? "border-red-500" : ""}
                    />
                    {errors.landlordName && <p className="text-red-500 text-sm">{errors.landlordName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="landlordAddress">Landlord Address</Label>
                    <Textarea
                      id="landlordAddress"
                      placeholder="Enter landlord's address"
                      value={receiptData.landlordAddress}
                      onChange={(e) => setReceiptData(prev => ({...prev, landlordAddress: e.target.value}))}
                    />
                  </div>
                </div>

                {/* Property Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Property & Payment Details</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="propertyAddress">Property Address</Label>
                    <Textarea
                      id="propertyAddress"
                      placeholder="Enter property address"
                      value={receiptData.propertyAddress}
                      onChange={(e) => setReceiptData(prev => ({...prev, propertyAddress: e.target.value}))}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="rentAmount">Rent Amount (₹) *</Label>
                      <Input
                        id="rentAmount"
                        type="number"
                        placeholder="Enter rent amount"
                        value={receiptData.rentAmount}
                        onChange={(e) => setReceiptData(prev => ({...prev, rentAmount: e.target.value}))}
                        className={errors.rentAmount ? "border-red-500" : ""}
                      />
                      {errors.rentAmount && <p className="text-red-500 text-sm">{errors.rentAmount}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label>Period *</Label>
                      <Select 
                        value={receiptData.period} 
                        onValueChange={(value) => setReceiptData(prev => ({...prev, period: value}))}
                      >
                        <SelectTrigger className={errors.period ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select period" />
                        </SelectTrigger>
                        <SelectContent>
                          {predefinedPeriods.map(period => (
                            <SelectItem key={period} value={period}>{period}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.period && <p className="text-red-500 text-sm">{errors.period}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Payment Date *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !receiptData.paymentDate && "text-muted-foreground",
                              errors.paymentDate && "border-red-500"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {receiptData.paymentDate ? format(receiptData.paymentDate, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={receiptData.paymentDate || undefined}
                            onSelect={(date) => setReceiptData(prev => ({...prev, paymentDate: date || null}))}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      {errors.paymentDate && <p className="text-red-500 text-sm">{errors.paymentDate}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label>Payment Method *</Label>
                      <Select 
                        value={receiptData.paymentMethod} 
                        onValueChange={(value) => setReceiptData(prev => ({...prev, paymentMethod: value}))}
                      >
                        <SelectTrigger className={errors.paymentMethod ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                          {paymentMethods.map(method => (
                            <SelectItem key={method.value} value={method.value}>{method.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.paymentMethod && <p className="text-red-500 text-sm">{errors.paymentMethod}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additionalNotes">Additional Notes</Label>
                    <Textarea
                      id="additionalNotes"
                      placeholder="Any additional information"
                      value={receiptData.additionalNotes}
                      onChange={(e) => setReceiptData(prev => ({...prev, additionalNotes: e.target.value}))}
                    />
                  </div>
                </div>

                <Button onClick={generateReceipt} className="w-full" size="lg">
                  <Receipt className="w-4 h-4 mr-2" />
                  Generate Receipt
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          <div>
            {generatedReceipt ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Receipt Preview
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={printReceipt}>
                        <Printer className="w-4 h-4 mr-2" />
                        Print
                      </Button>
                      <Button variant="outline" size="sm" onClick={emailReceipt}>
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </Button>
                      <Button size="sm" onClick={downloadPDF}>
                        <Download className="w-4 h-4 mr-2" />
                        PDF
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="print:p-8">
                  {/* Receipt Content */}
                  <div className="space-y-6 bg-white p-8 border rounded-lg print:border-none print:p-0">
                    
                    {/* Header */}
                    <div className="text-center border-b pb-4">
                      <h1 className="text-2xl font-bold text-purple-600">RENT RECEIPT</h1>
                      <p className="text-muted-foreground">Receipt No: {generatedReceipt.receiptNumber}</p>
                    </div>

                    {/* Receipt Details */}
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <h3 className="font-semibold mb-2 text-sm text-muted-foreground">RECEIVED FROM</h3>
                        <p className="font-medium">{generatedReceipt.tenantName}</p>
                        {generatedReceipt.tenantAddress && (
                          <p className="text-sm text-muted-foreground mt-1">{generatedReceipt.tenantAddress}</p>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2 text-sm text-muted-foreground">PAYMENT DATE</h3>
                        <p className="font-medium">
                          {generatedReceipt.paymentDate ? format(new Date(generatedReceipt.paymentDate), "dd MMMM yyyy") : ""}
                        </p>
                      </div>
                    </div>

                    <Separator />

                    {/* Amount Details */}
                    <div className="space-y-4">
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-lg">Rent Amount for {generatedReceipt.period}:</span>
                          <span className="text-2xl font-bold text-purple-600">₹{Number(generatedReceipt.rentAmount).toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Payment Method:</span>
                          <span className="ml-2 font-medium">{generatedReceipt.paymentMethod}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Period:</span>
                          <span className="ml-2 font-medium">{generatedReceipt.period}</span>
                        </div>
                      </div>
                    </div>

                    {generatedReceipt.propertyAddress && (
                      <>
                        <Separator />
                        <div>
                          <h3 className="font-semibold mb-2 text-sm text-muted-foreground">PROPERTY ADDRESS</h3>
                          <p className="text-sm">{generatedReceipt.propertyAddress}</p>
                        </div>
                      </>
                    )}

                    <Separator />

                    {/* Landlord Signature */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2 text-sm text-muted-foreground">RECEIVED BY</h3>
                        <p className="font-medium">{generatedReceipt.landlordName}</p>
                        {generatedReceipt.landlordAddress && (
                          <p className="text-sm text-muted-foreground mt-1">{generatedReceipt.landlordAddress}</p>
                        )}
                      </div>
                      
                      <div className="pt-8">
                        <div className="border-t border-dashed border-muted-foreground pt-2 w-48">
                          <p className="text-sm text-muted-foreground">Signature</p>
                        </div>
                      </div>
                    </div>

                    {generatedReceipt.additionalNotes && (
                      <>
                        <Separator />
                        <div>
                          <h3 className="font-semibold mb-2 text-sm text-muted-foreground">ADDITIONAL NOTES</h3>
                          <p className="text-sm">{generatedReceipt.additionalNotes}</p>
                        </div>
                      </>
                    )}

                    {/* Footer */}
                    <div className="text-center pt-4 border-t text-xs text-muted-foreground">
                      Generated on {format(new Date(generatedReceipt.generatedDate), "dd MMMM yyyy 'at' hh:mm a")}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                  <Receipt className="w-16 h-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Receipt Generated</h3>
                  <p className="text-muted-foreground">Fill the form and click "Generate Receipt" to see the preview</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Benefits Section */}
        <section className="mt-16 py-16 bg-muted/50 rounded-2xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Use Rent Receipts?</h2>
            <p className="text-muted-foreground">Essential benefits for tenants and landlords</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <FileText className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">HRA Tax Benefits</h3>
                <p className="text-sm text-muted-foreground">
                  Essential for claiming House Rent Allowance deductions under Income Tax
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Receipt className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Legal Documentation</h3>
                <p className="text-sm text-muted-foreground">
                  Provides legal proof of rent payment for disputes and court cases
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Check className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Record Keeping</h3>
                <p className="text-sm text-muted-foreground">
                  Maintain organized records for financial planning and audits
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
{/* 
      <Footer /> */}
    </div>
  );
};

export default RentReceipt;