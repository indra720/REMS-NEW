import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileText,
  Download,
  AlertTriangle,
  Calendar,
  User,
  Building2,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useState } from "react";

const SummonsNotices = () => {
  const notices = [
    {
      id: "SN001",
      title: "Property Verification Notice",
      type: "Verification",
      date: "2024-01-15",
      status: "Active",
      description: "Notice for property verification at Andheri West",
      priority: "high",
    },
    {
      id: "SN002",
      title: "Document Submission Reminder",
      type: "Reminder",
      date: "2024-01-10",
      status: "Pending",
      description: "Submission of NOC documents required",
      priority: "medium",
    },
    {
      id: "SN003",
      title: "Legal Compliance Notice",
      type: "Legal",
      date: "2024-01-05",
      status: "Resolved",
      description: "RERA compliance verification completed",
      priority: "low",
    },
  ];

  const [formData, setFormData] = useState({
    notice_id: "",
    response_type: "",
    response_details: "",
    supporting_document: null,
  });

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error status when user starts typing
    if (submitStatus === "error") {
      setSubmitStatus(null);
      setErrorMessage("");
    }
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      supporting_document: file,
    }));
  };

  // Submit to backend API - FIXED VERSION
  const handleSubmit = async (e) => {
    e?.preventDefault(); // Prevent default form submission

    // Enhanced validation
    if (!formData.notice_id.trim()) {
      setSubmitStatus("error");
      setErrorMessage("Notice ID is required");
      return;
    }

    if (!formData.response_type) {
      setSubmitStatus("error");
      setErrorMessage("Please select a response type");
      return;
    }

    if (!formData.response_details.trim()) {
      setSubmitStatus("error");
      setErrorMessage("Response details are required");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage("");

    try {
      const submitData = new FormData();
      submitData.append("notice_id", formData.notice_id.trim());
      submitData.append("response_type", formData.response_type);
      submitData.append("response_details", formData.response_details.trim());

      if (formData.supporting_document) {
        submitData.append("supporting_document", formData.supporting_document);
      }

      // OPTION 1: Mock API for testing (Remove this when using real API)
      // console.log('Submitting form data:', {
      //   notice_id: formData.notice_id,
      //   response_type: formData.response_type,
      //   response_details: formData.response_details,
      //   file: formData.supporting_document?.name || 'No file'
      // });

      // await new Promise((resolve, reject) => {
      //   setTimeout(() => {
      //     // Simulate success 90% of the time
      //     if (Math.random() > 0.1) {
      //       resolve({ message: 'Success' });
      //     } else {
      //       reject(new Error('Simulated network error - please try again'));
      //     }
      //   }, 2000);
      // });

      //  OPTION 2: Real API call (Uncomment when ready to use)
      // Get auth token safely
      let token = null;
      try {
        token = localStorage.getItem("access_token");
      } catch (e) {
        console.warn("Cannot access localStorage:", e);
      }

      const response = await fetch(
        "http://127.0.0.1:8000/api/summons-notices/",
        {
          method: "POST",
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: submitData,
        }
      );

      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.detail || errorData.message || errorMessage;
        } catch (parseError) {
          console.error("Error parsing error response:", parseError);
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log("API Response:", result);

      // Success handling
      setSubmitStatus("success");

      // Reset form
      setFormData({
        notice_id: "",
        response_type: "",
        response_details: "",
        supporting_document: null,
      });

      // Clear file input
      const fileInput = document.getElementById(
        "supporting-docs"
      ) as HTMLInputElement | null;
      if (fileInput) fileInput.value = "";

      // Auto-clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } catch (error: any) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
      setErrorMessage(
        error.message || "An error occurred while submitting. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 py-10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4">
              Legal Documentation
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Summons & Notices
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Access and manage all legal documents, summons, and official
              notices related to your properties and transactions.
            </p>
          </div>
        </div>
      </section>

      {/* Notice Search */}
      <section className="py-0 bg-muted/20">
        <div className="container mx-auto px-4">
          <Card className="p-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                Search Notices
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="notice-id">Notice ID</Label>
                  <Input id="notice-id" placeholder="Enter notice ID" />
                </div>
                <div>
                  <Label htmlFor="notice-type">Notice Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="verification">Verification</SelectItem>
                      <SelectItem value="legal">Legal</SelectItem>
                      <SelectItem value="reminder">Reminder</SelectItem>
                      <SelectItem value="compliance">Compliance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="date-range">Date Range</Label>
                  <Input id="date-range" type="date" />
                </div>
                <div className="flex items-end">
                  <Button className="w-full">Search Notices</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Active Notices */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Active Notices & Summons
          </h2>
          <div className="space-y-6">
            {notices.map((notice) => (
              <Card
                key={notice.id}
                className="p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <Badge
                        variant={
                          notice.priority === "high"
                            ? "destructive"
                            : notice.priority === "medium"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {notice.type}
                      </Badge>
                      <Badge variant="outline">{notice.status}</Badge>
                      <span className="text-sm text-muted-foreground">
                        ID: {notice.id}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {notice.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {notice.description}  
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {notice.date}
                      </div>
                      {notice.priority === "high" && (
                        <div className="flex items-center gap-1 text-destructive">
                          <AlertTriangle className="h-4 w-4" />
                          High Priority
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4 md:mt-0">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button size="sm">View Details</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Submit Response - UPDATED SECTION */}
      <section className="py-0 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="p-2">
              <CardHeader>
                <CardTitle className="text-center">
                  Submit Response to Notice
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Status Messages - ADDED */}
                {submitStatus === "success" && (
                  <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">Success!</span> Your response
                    has been submitted successfully.
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                    <XCircle className="h-5 w-5" />
                    <span className="font-medium">Error:</span> {errorMessage}
                  </div>
                )}

                {/* Form Fields */}
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="response-notice-id">Notice ID *</Label>
                      <Input
                        id="response-notice-id"
                        placeholder="Enter notice ID (e.g., SN001)"
                        value={formData.notice_id}
                        onChange={(e) =>
                          handleInputChange("notice_id", e.target.value)
                        }
                        className={
                          submitStatus === "error" && !formData.notice_id.trim()
                            ? "border-red-300"
                            : ""
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="response-type">Response Type *</Label>
                      <Select
                        value={formData.response_type}
                        onValueChange={(value) =>
                          handleInputChange("response_type", value)
                        }
                      >
                        <SelectTrigger
                          className={
                            submitStatus === "error" && !formData.response_type
                              ? "border-red-300"
                              : ""
                          }
                        >
                          <SelectValue placeholder="Select response type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="compliance">
                            Compliance Confirmation
                          </SelectItem>
                          <SelectItem value="objection">Objection</SelectItem>
                          <SelectItem value="clarification">
                            Request for Clarification
                          </SelectItem>
                          <SelectItem value="document">
                            Document Submission
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="response-details">Response Details *</Label>
                    <Textarea
                      id="response-details"
                      placeholder="Provide detailed response to the notice..."
                      className={`min-h-32 ${
                        submitStatus === "error" &&
                        !formData.response_details.trim()
                          ? "border-red-300"
                          : ""
                      }`}
                      value={formData.response_details}
                      onChange={(e) =>
                        handleInputChange("response_details", e.target.value)
                      }
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Provide clear and detailed information regarding your
                      response to the notice.
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="supporting-docs">
                      Supporting Documents
                    </Label>
                    <Input
                      id="supporting-docs"
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          supporting_document: e.target.files?.[0] || null,
                        })
                      }
                      className="cursor-pointer"
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Upload supporting documents (PDF, DOC, Images - Max 10MB)
                    </p>
                    {formData.supporting_document && (
                      <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        Selected: {formData.supporting_document.name}
                      </p>
                    )}
                  </div>

                  <Button
                    onClick={handleSubmit}
                    className="w-full"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                        Submitting...
                      </>
                    ) : (
                      "Submit Response"
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    * Required fields. Your response will be processed within
                    24-48 hours.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Legal Resources */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Legal Resources & Guidelines
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Legal Templates</h3>
              <p className="text-muted-foreground mb-4">
                Download standard legal document templates and formats.
              </p>
              <Button variant="outline">Download Templates</Button>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <User className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Legal Consultation</h3>
              <p className="text-muted-foreground mb-4">
                Connect with verified legal experts for consultation.
              </p>
              <Button variant="outline">Book Consultation</Button>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <Building2 className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">RERA Guidelines</h3>
              <p className="text-muted-foreground mb-4">
                Understand RERA compliance and legal requirements.
              </p>
              <Button variant="outline">View Guidelines</Button>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SummonsNotices;
