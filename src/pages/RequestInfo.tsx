import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "react-toastify";
import { Info, FileText, Phone, Mail, Clock, CheckCircle } from "lucide-react";

const RequestInfo = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    city: '',
    property_type: '',
    budget_range: '',
    preferred_location: '',
    specific_requirements: '',
    info_types: [],
    communication_method: 'email',
    timeline: '',
    consent: false
  });

  const [selectedInfoTypes, setSelectedInfoTypes] = useState([]);
  const [selectedCommunicationMethods, setSelectedCommunicationMethods] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.full_name || !formData.email || !formData.consent) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in all required fields and agree to terms.",
        variant: "destructive"
      });
      return;
    }

    try {
      const submitData = {
        ...formData,
        info_types: selectedInfoTypes,
        communication_method: selectedCommunicationMethods[0] || 'email'
      };

      console.log('Sending inquiry data:', submitData);
      const token = localStorage.getItem('access_token');
      const response = await fetch('http://localhost:8000/api/request-info/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(submitData)
      });

      const result = await response.json();
      console.log('API Response:', result);

      if (response.ok) {
        toast({
          title: "Information Request Submitted",
          description: "We'll get back to you with detailed information soon.",
        });
        
        // Reset form
        setFormData({
          full_name: '',
          email: '',
          phone_number: '',
          city: '',
          property_type: '',
          budget_range: '',
          preferred_location: '',
          specific_requirements: '',
          info_types: [],
          communication_method: 'email',
          timeline: '',
          consent: false
        });
        setSelectedInfoTypes([]);
        setSelectedCommunicationMethods([]);
      } else {
        throw new Error(result.message || 'Failed to submit request');
      }
    } catch (error) {
      console.error('Error submitting request:', error);
      toast({
        title: "Error",
        description: "Failed to submit request. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleInfoTypeChange = (typeId, checked) => {
    if (checked) {
      setSelectedInfoTypes(prev => [...prev, typeId]);
    } else {
      setSelectedInfoTypes(prev => prev.filter(id => id !== typeId));
    }
  };

  const handleCommunicationMethodChange = (methodId, checked) => {
    if (checked) {
      setSelectedCommunicationMethods(prev => [...prev, methodId]);
    } else {
      setSelectedCommunicationMethods(prev => prev.filter(id => id !== methodId));
    }
  };
  
  const infoTypes = [
    { id: "property_details", label: "Property Details & Pricing", icon: Info },
    { id: "market_analysis", label: "Market Analysis Report", icon: FileText },
    { id: "investment_opportunities", label: "Investment Opportunities", icon: CheckCircle },
    { id: "loan_finance", label: "Loan & Finance Assistance", icon: FileText },
    { id: "legal_help", label: "Legal Documentation Help", icon: FileText },
    { id: "site_visit", label: "Site Visit Arrangement", icon: CheckCircle },
  ];

  const propertyTypes = [
    "Residential Apartment",
    "Independent House/Villa",
    "Plot/Land",
    "Commercial Office",
    "Retail Space",
    "Warehouse/Industrial",
    "Agricultural Land",
    "Other"
  ];

  const budgetRanges = [
    "Under ₹10 Lakhs",
    "₹10-25 Lakhs",
    "₹25-50 Lakhs",
    "₹50 Lakhs - ₹1 Crore",
    "₹1-2 Crores",
    "₹2-5 Crores",
    "Above ₹5 Crores"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600/5 via-background to-accent/5 py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4">Get Information</Badge>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-accent bg-clip-text text-transparent">
              Request Information
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Get detailed information about properties, market trends, investment opportunities, and expert guidance tailored to your needs.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Request Form - Centered on mobile */}
            <div className="lg:col-span-2 w-full max-w-4xl mx-auto lg:mx-0  ">
              <Card className="w-full ">
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="text-xl md:text-2xl mb-2">What information do you need?</CardTitle>
                  <p className="text-muted-foreground text-sm md:text-base">Fill out the form below and our experts will get back to you with detailed information.</p>
                </CardHeader>
                <CardContent className="p-4 md:p-6 space-y-6">
                  {/* Information Type Selection */}
                  <div>
                    <label className="text-sm font-medium mb-3 block">Select Information Type (You can select multiple)</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {infoTypes.map((type) => (
                        <div key={type.id} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer w-full">
                          <Checkbox 
                            id={type.id} 
                            checked={selectedInfoTypes.includes(type.id)}
                            onCheckedChange={(checked) => handleInfoTypeChange(type.id, checked)}
                          />
                          <type.icon className="h-4 w-4 text-purple-600 flex-shrink-0" />
                          <label htmlFor={type.id} className="text-sm cursor-pointer flex-1">
                            {type.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Full Name *</label>
                      <Input 
                        placeholder="Enter your full name" 
                        value={formData.full_name}
                        onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                        required 
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email *</label>
                      <Input 
                        type="email" 
                        placeholder="your@email.com" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required 
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Phone Number *</label>
                      <Input 
                        type="tel" 
                        placeholder="+91 98765 43210" 
                        value={formData.phone_number}
                        onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
                        required 
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">City</label>
                      <Input 
                        placeholder="Your city" 
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Property Requirements */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Property Type</label>
                      <Select value={formData.property_type} onValueChange={(value) => setFormData({...formData, property_type: value})}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="villa">Villa</SelectItem>
                          <SelectItem value="plot">Plot</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Budget Range</label>
                      <Select value={formData.budget_range} onValueChange={(value) => setFormData({...formData, budget_range: value})}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-20L">0 - 20 Lakhs</SelectItem>
                          <SelectItem value="20L-50L">20 Lakhs - 50 Lakhs</SelectItem>
                          <SelectItem value="50L-1Cr">50 Lakhs - 1 Crore</SelectItem>
                          <SelectItem value="1Cr+">Above 1 Crore</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Preferred Location</label>
                    <Input 
                      placeholder="Enter preferred areas/localities" 
                      value={formData.preferred_location}
                      onChange={(e) => setFormData({...formData, preferred_location: e.target.value})}
                      className="w-full"
                    />
                  </div>

                  {/* Specific Requirements */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Specific Requirements/Questions</label>
                    <Textarea 
                      placeholder="Please describe what specific information you're looking for, any particular requirements, timeline, or questions you have..."
                      rows={5}
                      value={formData.specific_requirements}
                      onChange={(e) => setFormData({...formData, specific_requirements: e.target.value})}
                      className="w-full"
                    />
                  </div>

                  {/* Communication Preferences */}
                  <div>
                    <label className="text-sm font-medium mb-3 block">Preferred Communication Method</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: "email", label: "Email", icon: Mail },
                        { id: "phone", label: "Phone Call", icon: Phone },
                        { id: "whatsapp", label: "WhatsApp", icon: Phone },
                      ].map((method) => (
                        <div key={method.id} className="flex items-center space-x-2 p-3 border rounded-lg w-full">
                          <Checkbox 
                            id={method.id} 
                            checked={selectedCommunicationMethods.includes(method.id)}
                            onCheckedChange={(checked) => handleCommunicationMethodChange(method.id, checked)}
                          />
                          <method.icon className="h-4 w-4 text-purple-600 flex-shrink-0" />
                          <label htmlFor={method.id} className="text-sm cursor-pointer flex-1">
                            {method.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Timeline */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">When are you looking to buy/invest?</label>
                    <Select value={formData.timeline} onValueChange={(value) => setFormData({...formData, timeline: value})}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Immediately</SelectItem>
                        <SelectItem value="1-3m">1-3 months</SelectItem>
                        <SelectItem value="3-6m">3-6 months</SelectItem>
                        <SelectItem value="6m+">6+ months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Terms Agreement */}
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="terms" 
                      className="mt-1 flex-shrink-0" 
                      checked={formData.consent}
                      onCheckedChange={(checked) => setFormData({...formData, consent: checked})}
                    />
                    <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                      I agree to receive information via email, phone, or WhatsApp and consent to being contacted by RealEstate Pro regarding my inquiry.
                    </label>
                  </div>

                  <Button className="w-full" size="lg" onClick={handleSubmit}>
                    Submit Information Request
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Information - Centered on mobile */}
            <div className="w-full max-w-md mx-auto lg:mx-0 space-y-6">
              {/* Response Time */}
              <Card className="w-full">
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="text-lg md:text-xl flex items-center gap-2">
                    <Clock className="h-5 w-5 md:h-6 md:w-6 text-purple-600" />
                    Response Time
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">General Inquiries</span>
                      <Badge variant="secondary">2-4 hours</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Property Details</span>
                      <Badge variant="secondary">1-2 hours</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Market Reports</span>
                      <Badge variant="secondary">24 hours</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Investment Analysis</span>
                      <Badge variant="secondary">48 hours</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* What You'll Receive */}
              <Card className="w-full">
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="text-lg md:text-xl">What You'll Receive</CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6">
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>Detailed property information and pricing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>Market analysis and trends report</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>Investment ROI calculations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>Legal documentation guidance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>Financing options and assistance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>Expert consultation call</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card className="w-full">
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="text-lg md:text-xl">Need Immediate Help?</CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-1">Call us directly</p>
                      <p className="text-primary font-semibold">+91 98765 43210</p>
                      <p className="text-xs text-muted-foreground">Mon-Sat 9:00 AM to 9:00 PM</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">WhatsApp</p>
                      <p className="text-primary font-semibold">+91 98765 43210</p>
                      <p className="text-xs text-muted-foreground">24/7 Quick responses</p>
                    </div>
                    <Button variant="outline" className="w-full" size="sm">
                      Start Live Chat
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RequestInfo;