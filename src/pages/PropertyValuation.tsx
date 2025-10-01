import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calculator, TrendingUp, MapPin, Building, Calendar, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PropertyValuation = () => {
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    propertyType: "",
    bhk: "",
    area: "",
    location: "",
    age: "",
    condition: "",
    amenities: [],
    description: ""
  });

  const [showResults, setShowResults] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.propertyType || !formData.area || !formData.location) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setShowResults(true);
    toast({
      title: "Valuation Complete",
      description: "Your property valuation has been calculated successfully",
    });
  };

  const handleDownloadReport = () => {
    const reportData = `
PROPERTY VALUATION REPORT
========================
Property Type: ${formData.propertyType}
BHK: ${formData.bhk}
Area: ${formData.area} sq ft
Location: ${formData.location}
Property Age: ${formData.age}
Condition: ${formData.condition}

VALUATION RESULTS
================
Estimated Value: ₹85,00,000
Price per sq ft: ₹12,500
Market Trend: +5.2%

Generated on: ${new Date().toLocaleDateString()}
    `;

    const blob = new Blob([reportData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Property_Valuation_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Report Downloaded",
      description: "Property valuation report has been downloaded",
    });
  };

  const handleGetExpertOpinion = () => {
    navigate('/contact-us');
    toast({
      title: "Expert Consultation",
      description: "Connecting you with our property valuation experts",
    });
  };

  const handleBookNow = () => {
    navigate('/contact-us');
    toast({
      title: "Booking Consultation",
      description: "Schedule your expert consultation appointment",
    });
  };

  const handleViewTrends = () => {
    navigate('/price-trends');
    toast({
      title: "Market Trends",
      description: "Viewing detailed market analysis and trends",
    });
  };

  const handleVerifyNow = () => {
    navigate('/contact-us');
    toast({
      title: "Legal Verification",
      description: "Starting property document verification process",
    });
  };

  const estimatedValue = 8500000; // Mock value
  const pricePerSqft = 12500;
  const marketTrend = "+5.2%";

  return (
    <div className="min-h-screen bg-background">
     
      
      <div className="hero-gradient py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center text-white mb-12">
            <h1 className="text-5xl font-bold mb-4">Property Valuation</h1>
            <p className="text-xl opacity-90">Get accurate property valuation powered by AI and market data</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Valuation Form */}
            <Card className="backdrop-blur-xl border-white/20 bg-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Calculator className="h-5 w-5" />
                  Property Details
                </CardTitle>
                <CardDescription className="text-white/80">
                  Provide your property details for accurate valuation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-white">Property Type</Label>
                      <Select value={formData.propertyType} onValueChange={(value) => setFormData({...formData, propertyType: value})}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="villa">Villa</SelectItem>
                          <SelectItem value="townhouse">Townhouse</SelectItem>
                          <SelectItem value="plot">Plot</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white">BHK</Label>
                      <Select value={formData.bhk} onValueChange={(value) => setFormData({...formData, bhk: value})}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Select BHK" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 BHK</SelectItem>
                          <SelectItem value="2">2 BHK</SelectItem>
                          <SelectItem value="3">3 BHK</SelectItem>
                          <SelectItem value="4">4 BHK</SelectItem>
                          <SelectItem value="5+">5+ BHK</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-white">Carpet Area (sq ft)</Label>
                      <Input
                        type="number"
                        value={formData.area}
                        onChange={(e) => setFormData({...formData, area: e.target.value})}
                        placeholder="Enter area"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white">Property Age</Label>
                      <Select value={formData.age} onValueChange={(value) => setFormData({...formData, age: value})}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Select age" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">Under Construction</SelectItem>
                          <SelectItem value="0-1">0-1 Years</SelectItem>
                          <SelectItem value="1-5">1-5 Years</SelectItem>
                          <SelectItem value="5-10">5-10 Years</SelectItem>
                          <SelectItem value="10+">10+ Years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Location</Label>
                    <Input
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      placeholder="Enter location or pincode"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Property Condition</Label>
                    <Select value={formData.condition} onValueChange={(value) => setFormData({...formData, condition: value})}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="average">Average</SelectItem>
                        <SelectItem value="needs-renovation">Needs Renovation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Additional Details (Optional)</Label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Any additional information about your property..."
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-white text-purple-600 hover:bg-white/90">
                    Get Property Valuation
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Results or Features */}
            {showResults ? (
              <Card className="backdrop-blur-xl border-white/20 bg-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <TrendingUp className="h-5 w-5" />
                    Valuation Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center p-6 bg-white/10 rounded-lg border border-white/20">
                    <div className="text-4xl font-bold text-white mb-2">
                      ₹{estimatedValue.toLocaleString()}
                    </div>
                    <div className="text-white/80">Estimated Property Value</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-white/10 rounded-lg border border-white/20">
                      <div className="text-xl font-bold text-white mb-1">
                        ₹{pricePerSqft.toLocaleString()}
                      </div>
                      <div className="text-white/80 text-sm">Price per sq ft</div>
                    </div>
                    <div className="text-center p-4 bg-white/10 rounded-lg border border-white/20">
                      <div className="text-xl font-bold text-green-400 mb-1">
                        {marketTrend}
                      </div>
                      <div className="text-white/80 text-sm">Market Trend</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-white font-semibold">Valuation Factors</h3>
                    <div className="space-y-2">
                      {[
                        "Location premium",
                        "Property condition",
                        "Market trends",
                        "Area development",
                        "Amenities & facilities"
                      ].map((factor) => (
                        <div key={factor} className="flex items-center gap-2 text-white/80">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm">{factor}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button 
                      className="flex-1 bg-white text-purple-600 hover:bg-white/90"
                      onClick={handleDownloadReport}
                    >
                      Download Report
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1 border-white/20 text-white hover:bg-white/10"
                      onClick={handleGetExpertOpinion}
                    >
                      Get Expert Opinion
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="backdrop-blur-xl border-white/20 bg-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Why Choose Our Valuation?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {[
                      {
                        icon: <Calculator className="h-6 w-6" />,
                        title: "AI-Powered Analysis",
                        description: "Advanced algorithms analyze millions of data points for accurate valuation"
                      },
                      {
                        icon: <TrendingUp className="h-6 w-6" />,
                        title: "Real-time Market Data",
                        description: "Updated pricing based on current market trends and comparable sales"
                      },
                      {
                        icon: <MapPin className="h-6 w-6" />,
                        title: "Location Intelligence",
                        description: "Micro-market analysis considering locality factors and future development"
                      },
                      {
                        icon: <Building className="h-6 w-6" />,
                        title: "Property Features",
                        description: "Comprehensive evaluation of amenities, condition, and unique features"
                      }
                    ].map((feature, index) => (
                      <div key={index} className="flex gap-4 p-4 bg-white/10 rounded-lg border border-white/20">
                        <div className="text-white">{feature.icon}</div>
                        <div>
                          <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                          <p className="text-white/80 text-sm">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Additional Services */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <Card className="backdrop-blur-xl border-white/20 bg-white/10">
              <CardContent className="p-6 text-center">
                <Calendar className="h-12 w-12 text-white mx-auto mb-4" />
                <div className="text-xl font-bold text-white mb-2">Expert Consultation</div>
                <div className="text-white/80 mb-4">Book a meeting with our property experts</div>
                <Button 
                  variant="outline" 
                  className="border-white/20 text-black hover:bg-white/10"
                  onClick={handleBookNow}
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
            <Card className="backdrop-blur-xl border-white/20 bg-white/10">
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-12 w-12 text-white mx-auto mb-4" />
                <div className="text-xl font-bold text-white mb-2">Market Analysis</div>
                <div className="text-white/80 mb-4">Detailed market trends and future predictions</div>
                <Button 
                  variant="outline" 
                  className="border-white/20 text-black hover:bg-white/10"
                  onClick={handleViewTrends}
                >
                  View Trends
                </Button>
              </CardContent>
            </Card>
            <Card className="backdrop-blur-xl border-white/20 bg-white/10">
              <CardContent className="p-6 text-center">
                <Building className="h-12 w-12 text-white mx-auto mb-4" />
                <div className="text-xl font-bold text-white mb-2">Legal Verification</div>
                <div className="text-white/80 mb-4">Complete property document verification</div>
                <Button 
                  variant="outline" 
                  className="border-white/20 text-black hover:bg-white/10"
                  onClick={handleVerifyNow}
                >
                  Verify Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default PropertyValuation;