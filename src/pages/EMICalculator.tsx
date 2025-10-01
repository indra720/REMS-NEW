import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Calculator, PieChart, TrendingUp, Download } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "react-toastify";

const EMICalculator = () => {
  
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const calculateEMI = () => {
    const P = loanAmount;
    const r = interestRate / 12 / 100;
    const n = tenure * 12;
    
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(emi);
  };

  const emi = calculateEMI();
  const totalAmount = emi * tenure * 12;
  const totalInterest = totalAmount - loanAmount;

  const handleDownloadReport = () => {
    // Create a simple text report
    const reportData = `
EMI CALCULATION REPORT
=====================
Loan Amount: ₹${loanAmount.toLocaleString()}
Interest Rate: ${interestRate}% p.a.
Tenure: ${tenure} years
Monthly EMI: ₹${emi.toLocaleString()}
Total Interest: ₹${totalInterest.toLocaleString()}
Total Amount: ₹${totalAmount.toLocaleString()}
Principal Percentage: ${((loanAmount / totalAmount) * 100).toFixed(1)}%
Interest Percentage: ${((totalInterest / totalAmount) * 100).toFixed(1)}%
Generated on: ${new Date().toLocaleDateString()}
    `;

    const blob = new Blob([reportData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `EMI_Report_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Report Downloaded",
      description: "EMI calculation report has been downloaded successfully",
    });
  };

  const handleViewChart = () => {
    toast({
      title: "Chart View",
      description: "Interactive EMI breakdown chart will be displayed here",
    });
  };

  return (
    <div className="min-h-screen bg-background">
     
      
      <div className="hero-gradient py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center text-white mb-12">
            <h1 className="text-5xl font-bold mb-4">EMI Calculator</h1>
            <p className="text-xl opacity-90">Calculate your home loan EMI instantly</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <Card className="backdrop-blur-xl border-white/20 bg-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Calculator className="h-5 w-5" />
                  Loan Details
                </CardTitle>
                <CardDescription className="text-white/80">
                  Enter your loan details to calculate EMI
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-white">Loan Amount</Label>
                  <div className="space-y-4">
                    <Input
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    />
                    <Slider
                      value={[loanAmount]}
                      onValueChange={(value) => setLoanAmount(value[0])}
                      max={50000000}
                      min={100000}
                      step={100000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-white/80">
                      <span>₹1L</span>
                      <span>₹5Cr</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Interest Rate (%)</Label>
                  <div className="space-y-4">
                    <Input
                      type="number"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      step="0.1"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    />
                    <Slider
                      value={[interestRate]}
                      onValueChange={(value) => setInterestRate(value[0])}
                      max={20}
                      min={5}
                      step={0.1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-white/80">
                      <span>5%</span>
                      <span>20%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Loan Tenure (Years)</Label>
                  <div className="space-y-4">
                    <Input
                      type="number"
                      value={tenure}
                      onChange={(e) => setTenure(Number(e.target.value))}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    />
                    <Slider
                      value={[tenure]}
                      onValueChange={(value) => setTenure(value[0])}
                      max={30}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-white/80">
                      <span>1 Year</span>
                      <span>30 Years</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <Card className="backdrop-blur-xl border-white/20 bg-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <PieChart className="h-5 w-5" />
                  EMI Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <div className="text-center p-6 bg-white/10 rounded-lg border border-white/20">
                    <div className="text-3xl font-bold text-white mb-2">
                      ₹{emi.toLocaleString()}
                    </div>
                    <div className="text-white/80">Monthly EMI</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-white/10 rounded-lg border border-white/20">
                      <div className="text-xl font-bold text-white mb-1">
                        ₹{loanAmount.toLocaleString()}
                      </div>
                      <div className="text-white/80 text-sm">Principal Amount</div>
                    </div>
                    <div className="text-center p-4 bg-white/10 rounded-lg border border-white/20">
                      <div className="text-xl font-bold text-white mb-1">
                        ₹{totalInterest.toLocaleString()}
                      </div>
                      <div className="text-white/80 text-sm">Total Interest</div>
                    </div>
                  </div>

                  <div className="text-center p-4 bg-white/10 rounded-lg border border-white/20">
                    <div className="text-2xl font-bold text-white mb-1">
                      ₹{totalAmount.toLocaleString()}
                    </div>
                    <div className="text-white/80">Total Amount Payable</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between text-white">
                    <span>Principal vs Interest</span>
                  </div>
                  <div className="h-4 bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-purple-600 rounded-full transition-all duration-500"
                      style={{ width: `${(loanAmount / totalAmount) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm text-white/80">
                    <span>Principal: {((loanAmount / totalAmount) * 100).toFixed(1)}%</span>
                    <span>Interest: {((totalInterest / totalAmount) * 100).toFixed(1)}%</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button 
                    className="flex-1 bg-white text-purple-600 hover:bg-white/90"
                    onClick={handleDownloadReport}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 border-white/20 text-white hover:bg-white/10"
                    onClick={handleViewChart}
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View Chart
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Information */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <Card className="backdrop-blur-xl border-white/20 bg-white/10">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-white mb-2">Current Rates</div>
                <div className="text-white/80">Home loan interest rates starting from 8.25% p.a.</div>
              </CardContent>
            </Card>
            <Card className="backdrop-blur-xl border-white/20 bg-white/10">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-white mb-2">Quick Approval</div>
                <div className="text-white/80">Get pre-approved within 24 hours</div>
              </CardContent>
            </Card>
            <Card className="backdrop-blur-xl border-white/20 bg-white/10">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-white mb-2">Expert Guidance</div>
                <div className="text-white/80">Free consultation with loan experts</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

    
    </div>
  );
};

export default EMICalculator;