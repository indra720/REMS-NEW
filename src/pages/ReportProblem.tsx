import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "react-toastify";
import {
  AlertTriangle,
  Bug,
  Globe,
  Smartphone,
  CreditCard,
  FileText,
  Phone,
  Clock,
} from "lucide-react";

const ReportProblem = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    problem_type: "",
    priority_level: "",
    problem_summary: "",
    detailed_description: "",
    steps_to_reproduce: "",
    browser_version: "",
    operating_system: "",
    device_type: "",
    additional_information: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.problem_type ||
      !formData.priority_level ||
      !formData.problem_summary ||
      !formData.detailed_description
    ) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log("Sending problem report data:", formData);

      const token = localStorage.getItem("access_token");

     let currentUser = null;
    
    // Get user from localStorage
    const userString = localStorage.getItem('user');
    if (userString) {
      try {
        const userObj = JSON.parse(userString);
        currentUser = userObj.id || userObj.pk || null;
        console.log("User ID extracted:", currentUser);
      } catch (parseError) {
        console.error("Error parsing user object:", parseError);
        currentUser = null;
      }
    }

      const response = await fetch(
        "http://127.0.0.1:8000/api/report-problems/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone_number: formData.phone_number || "",
            problem_type: formData.problem_type,
            priority_level: formData.priority_level,
            problem_summary: formData.problem_summary,
            detailed_description: formData.detailed_description,
            steps_to_reproduce: formData.steps_to_reproduce || "",
            browser_version: formData.browser_version || "",
            operating_system: formData.operating_system || "",
            device_type: formData.device_type || "",
            additional_information: formData.additional_information || "",
            user: currentUser,
          }),
        }
      );

      console.log("Response status:", response.status);
      const result = await response.json();
      console.log("API Response:", result);

      if (response.ok) {
        toast({
          title: "Problem Report Submitted",
          description:
            "We've received your report and will investigate it promptly.",
        });

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone_number: "",
          problem_type: "",
          priority_level: "",
          problem_summary: "",
          detailed_description: "",
          steps_to_reproduce: "",
          browser_version: "",
          operating_system: "",
          device_type: "",
          additional_information: "",
        });
      } else {
        throw new Error(JSON.stringify(result) || "Failed to submit report");
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      toast({
        title: "Error",
        description: "Failed to submit report. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleProblemTypeSelect = (type) => {
    setFormData({ ...formData, problem_type: type });
  };

  const handlePrioritySelect = (priority) => {
    setFormData({ ...formData, priority_level: priority });
  };
  const problemTypes = [
    {
      value: "technical",
      label: "Technical Issue",
      icon: Bug,
      description: "Website bugs, errors, or glitches",
    },
    {
      value: "account",
      label: "Account Problem",
      icon: FileText,
      description: "Login, profile, or account-related issues",
    },
    {
      value: "payment",
      label: "Payment Issue",
      icon: CreditCard,
      description: "Transaction, billing, or payment problems",
    },
    {
      value: "mobile",
      label: "Mobile App",
      icon: Smartphone,
      description: "Mobile app crashes or functionality issues",
    },
    {
      value: "listing",
      label: "Property Listing",
      icon: Globe,
      description: "Issues with property listings or data",
    },
    {
      value: "other",
      label: "Other",
      icon: AlertTriangle,
      description: "Any other problem not listed above",
    },
  ];

  const urgencyLevels = [
    {
      value: "low",
      label: "Low",
      description: "Minor inconvenience, doesn't block usage",
    },
    {
      value: "medium",
      label: "Medium",
      description: "Affects functionality but has workarounds",
    },
    {
      value: "high",
      label: "High",
      description: "Significantly impacts user experience",
    },
    {
      value: "critical",
      label: "Critical",
      description: "Complete system failure or security issue",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600/5 via-background to-accent/5 py-5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4">
              Technical Support
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-accent bg-clip-text text-transparent">
              Report a Problem
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Encountered an issue? Let us know and we'll work to resolve it
              quickly. Your reports help us improve our platform.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 text-center">
              <Phone className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Emergency Support</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Critical issues requiring immediate attention
              </p>
              <Button variant="outline" size="sm">
                Call +91 98765 43210
              </Button>
            </Card>
            <Card className="p-6 text-center">
              <Clock className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Live Chat</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Get instant help from our support team
              </p>
              <Button variant="outline" size="sm">
                Start Chat
              </Button>
            </Card>
            <Card className="p-6 text-center">
              <FileText className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Status Page</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Check current system status and known issues
              </p>
              <Button variant="outline" size="sm">
                View Status
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Problem Report Form */}
      <section className="py-5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Alert className="mb-8">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Before reporting, please check our <strong>FAQ section</strong>{" "}
                and <strong>known issues page</strong> to see if your problem
                has already been addressed.
              </AlertDescription>
            </Alert>

            <Card className="p-2">
              <CardHeader>
                <CardTitle className="text-2xl mb-2">
                  Describe Your Problem
                </CardTitle>
                <p className="text-muted-foreground">
                  Please provide as much detail as possible to help us resolve
                  your issue quickly.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Problem Type */}
                <div>
                  <label className="text-sm font-medium mb-3 block">
                    What type of problem are you experiencing?
                  </label>
                  <div className="grid md:grid-cols-2 gap-4">
                    {problemTypes.map((type) => (
                      <Card
                        key={type.value}
                        className={`p-4 cursor-pointer hover:shadow-md transition-shadow border-2 ${
                          formData.problem_type === type.value
                            ? "border-purple-600 bg-purple-600/5"
                            : "hover:border-purple-600/50"
                        }`}
                        onClick={() => handleProblemTypeSelect(type.value)}
                      >
                        <div className="flex items-start gap-3">
                          <type.icon className="h-6 w-6 text-purple-600 mt-1" />
                          <div>
                            <div className="font-medium">{type.label}</div>
                            <div className="text-sm text-muted-foreground">
                              {type.description}
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Urgency Level */}
                <div>
                  <label className="text-sm font-medium mb-3 block">
                    Priority Level
                  </label>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {urgencyLevels.map((level) => (
                      <Card
                        key={level.value}
                        className={`p-3 cursor-pointer hover:shadow-md transition-shadow border-2 ${
                          formData.priority_level === level.value
                            ? "border-purple-600 bg-purple-600/5"
                            : "hover:border-purple-600/50"
                        }`}
                        onClick={() => handlePrioritySelect(level.value)}
                      >
                        <div className="text-center">
                          <div
                            className={`font-medium mb-1 ${
                              level.value === "critical"
                                ? "text-red-600"
                                : level.value === "high"
                                ? "text-orange-600"
                                : level.value === "medium"
                                ? "text-yellow-600"
                                : "text-green-600"
                            }`}
                          >
                            {level.label}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {level.description}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Your Name *
                    </label>
                    <Input
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Email *
                    </label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone_number}
                    onChange={(e) =>
                      setFormData({ ...formData, phone_number: e.target.value })
                    }
                  />
                </div>

                {/* Problem Details */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Problem Summary *
                  </label>
                  <Input
                    placeholder="Brief description of the problem"
                    value={formData.problem_summary}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        problem_summary: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Detailed Description *
                  </label>
                  <Textarea
                    placeholder="Please describe the problem in detail. Include:&#10;- What you were trying to do&#10;- What happened instead&#10;- Error messages (if any)&#10;- When did this start happening"
                    rows={6}
                    value={formData.detailed_description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        detailed_description: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                {/* Steps to Reproduce */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Steps to Reproduce
                  </label>
                  <Textarea
                    placeholder="Please list the exact steps to reproduce this problem:&#10;1. Go to...&#10;2. Click on...&#10;3. Enter...&#10;4. See error"
                    rows={4}
                    value={formData.steps_to_reproduce}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        steps_to_reproduce: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Technical Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Browser/App Version
                    </label>
                    <Select
                      value={formData.browser_version}
                      onValueChange={(value) =>
                        setFormData({ ...formData, browser_version: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select browser/app" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="chrome">Chrome</SelectItem>
                        <SelectItem value="firefox">Firefox</SelectItem>
                        <SelectItem value="safari">Safari</SelectItem>
                        <SelectItem value="edge">Edge</SelectItem>
                        <SelectItem value="mobile-app">Mobile App</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Operating System
                    </label>
                    <Select
                      value={formData.operating_system}
                      onValueChange={(value) =>
                        setFormData({ ...formData, operating_system: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select OS" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="windows">Windows</SelectItem>
                        <SelectItem value="macos">macOS</SelectItem>
                        <SelectItem value="linux">Linux</SelectItem>
                        <SelectItem value="ios">iOS</SelectItem>
                        <SelectItem value="android">Android</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Screen Size */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Device Type
                  </label>
                  <Select
                    value={formData.device_type}
                    onValueChange={(value) =>
                      setFormData({ ...formData, device_type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select device type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="desktop">Desktop</SelectItem>
                      <SelectItem value="laptop">Laptop</SelectItem>
                      <SelectItem value="tablet">Tablet</SelectItem>
                      <SelectItem value="mobile">Mobile Phone</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Additional Information */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Additional Information
                  </label>
                  <Textarea
                    placeholder="Any other relevant information that might help us resolve this issue..."
                    rows={3}
                    value={formData.additional_information}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        additional_information: e.target.value,
                      })
                    }
                  />
                </div>

                {/* File Upload Note */}
                <Alert>
                  <FileText className="h-4 w-4" />
                  <AlertDescription>
                    If you have screenshots, error logs, or other files that
                    would help us understand the problem, please email them to
                    support@realestatepro.com with your ticket reference number.
                  </AlertDescription>
                </Alert>

                <Button className="w-full" size="lg" onClick={handleSubmit}>
                  Submit Problem Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Follow-up Information */}
      <section className="py-5 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">What Happens Next?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6">
                <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="font-semibold mb-2">Ticket Created</h3>
                <p className="text-muted-foreground text-sm">
                  We'll create a support ticket and send you a reference number
                  via email.
                </p>
              </Card>
              <Card className="p-6">
                <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="font-semibold mb-2">Initial Response</h3>
                <p className="text-muted-foreground text-sm">
                  Our team will acknowledge your report within 24 hours and
                  begin investigation.
                </p>
              </Card>
              <Card className="p-6">
                <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="font-semibold mb-2">Resolution</h3>
                <p className="text-muted-foreground text-sm">
                  We'll work to resolve the issue and keep you updated
                  throughout the process.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReportProblem;
