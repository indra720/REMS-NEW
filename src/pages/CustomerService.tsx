import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "react-toastify";
import { useState } from "react";
import {
  Phone,
  Mail,
  MessageCircle,
  Clock,
  User,
  Headphones,
  Search,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Video,
  FileText,
  Star,
} from "lucide-react";

const CustomerService = () => {
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "search",
    subject: "",
    message: "",
    priority: "medium",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("access_token");
      let currentUser = null;

      // Get user from localStorage
      const userString = localStorage.getItem("user");
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

      // Map form categories to SupportTicket model categories
      const categoryMapping = {
        search: "property_search",
        docs: "documentation",
        tech: "technical_issues",
        account: "account_support",
        other: "other",
      };

      // Prepare SupportTicket data
      const requestData = {
        full_name: formData.name,
        email: formData.email,
        phone_number: formData.phone || "",
        category: categoryMapping[formData.category] || "other",
        subject: formData.subject,
        message: formData.message,
        priority: formData.priority,
        user: currentUser, // null=True, blank=True in SupportTicket model
      };

      console.log("Sending support ticket data:", requestData);

      const response = await fetch(
        "http://127.0.0.1:8000/api/support-tickets/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify(requestData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error Response:", errorData);

        let errorMessage = "Failed to submit support ticket. Please try again.";

        if (response.status === 400) {
          // Handle validation errors
          if (errorData.email && errorData.email.includes("valid email")) {
            errorMessage = "Please enter a valid email address.";
          } else if (errorData.category) {
            errorMessage = "Please select a valid category.";
          } else if (errorData.priority) {
            errorMessage = "Please select a valid priority level.";
          } else {
            errorMessage = `Validation Error: ${Object.keys(errorData)
              .map((key) => `${key}: ${errorData[key]}`)
              .join(", ")}`;
          }
        } else if (response.status === 401) {
          errorMessage =
            "Authentication failed. You can still submit as a guest.";
        } else if (response.status === 403) {
          errorMessage = "Permission denied. Please check your account status.";
        }

        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
        return;
      }

      const result = await response.json();
      console.log("Support ticket created successfully:", result);

      toast({
        title: "Support Ticket Submitted Successfully",
        description: currentUser
          ? `Ticket ID: ${result.id.slice(
              0,
              8
            )}... Our team will contact you within 24 hours.`
          : "Support ticket submitted as guest. Our team will contact you via email within 24 hours.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        category: "search",
        subject: "",
        message: "",
        priority: "medium",
      });
    } catch (error) {
      console.error("Network error:", error);
      toast({
        title: "Network Error",
        description: "Please check your internet connection and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const supportChannels = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our experts",
      contact: "+91 1800-123-4567",
      timing: "Mon-Sat: 9 AM - 8 PM",
      response: "Immediate",
      status: "available",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Quick responses to your queries",
      contact: "Chat Now",
      timing: "24/7 Available",
      response: "< 2 minutes",
      status: "available",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Detailed assistance via email",
      contact: "support@realestate.com",
      timing: "24/7 Available",
      response: "< 24 hours",
      status: "available",
    },
    {
      icon: Video,
      title: "Video Call",
      description: "Face-to-face consultation",
      contact: "Schedule Call",
      timing: "Mon-Fri: 10 AM - 6 PM",
      response: "Scheduled",
      status: "premium",
    },
  ];

  const serviceCategories = [
    {
      title: "Property Search",
      icon: Search,
      description: "Help finding your perfect property",
      tickets: 234,
    },
    {
      title: "Documentation",
      icon: FileText,
      description: "Legal and paperwork assistance",
      tickets: 156,
    },
    {
      title: "Technical Issues",
      icon: AlertCircle,
      description: "Website and app related problems",
      tickets: 89,
    },
    {
      title: "Account Support",
      icon: User,
      description: "Profile and account management",
      tickets: 67,
    },
  ];

  const faqs = [
    {
      question: "How do I search for properties on your platform?",
      answer:
        "You can search for properties using our advanced search filters. Simply enter your preferred location, budget, property type, and other criteria. You can also use our map view to explore properties in specific areas.",
    },
    {
      question: "What documents are required for property purchase?",
      answer:
        "Common documents include property title deed, sale agreement, NOC from society, property tax receipts, encumbrance certificate, and identity proofs. Our legal team can guide you through the complete documentation process.",
    },
    {
      question: "How can I verify property ownership?",
      answer:
        "We provide property verification services including title verification, legal clearance, and due diligence reports. You can also check property records through government portals or hire our legal experts.",
    },
    {
      question: "What are the additional costs in property purchase?",
      answer:
        "Additional costs typically include registration charges (1-8% of property value), stamp duty, legal fees, broker commission (1-2%), home loan processing fees, and maintenance deposits.",
    },
    {
      question: "How do I schedule a property visit?",
      answer:
        "You can schedule property visits directly through our platform by clicking the 'Book Visit' button on any property listing. Choose your preferred date and time, and our team will coordinate with the property owner.",
    },
    {
      question: "What is the refund policy for booking amounts?",
      answer:
        "Booking amounts are refundable as per the terms agreed in the booking agreement. Generally, if the seller cancels, you get a full refund. If you cancel, refund terms depend on the stage of the transaction.",
    },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Mumbai",
      rating: 5,
      review:
        "Excellent customer service! The team helped me find my dream home within my budget. The entire process was smooth and transparent.",
    },
    {
      name: "Rajesh Kumar",
      location: "Bangalore",
      rating: 5,
      review:
        "Very responsive support team. They answered all my queries promptly and guided me through the property documentation process.",
    },
    {
      name: "Anita Gupta",
      location: "Delhi",
      rating: 4,
      review:
        "Good experience overall. The live chat feature is very helpful, and the team is knowledgeable about legal requirements.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* <Header /> */}

      {/* Hero Section */}
      <section className="relative py-5 bg-gradient-to-br from-purple-100 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
              Customer Support
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              We're here to help you every step of your property journey
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-600">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-600">
                  &lt; 2min
                </div>
                <div className="text-sm text-muted-foreground">Response</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-600">98%</div>
                <div className="text-sm text-muted-foreground">
                  Satisfaction
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-600">50K+</div>
                <div className="text-sm text-muted-foreground">Resolved</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Channels */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Contact Our Support Team
            </h2>
            <p className="text-muted-foreground">
              Choose your preferred way to get help
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportChannels.map((channel, index) => {
              const IconComponent = channel.icon;
              return (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-all duration-300 relative"
                >
                  {channel.status === "premium" && (
                    <Badge className="absolute top-2 right-2 bg-yellow-500">
                      Premium
                    </Badge>
                  )}
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                        channel.status === "available"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">
                      {channel.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {channel.description}
                    </p>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{channel.timing}</span>
                      </div>
                      <div className="font-medium text-purple-600">
                        {channel.contact}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Response: {channel.response}
                      </div>
                    </div>

                    <Button
                      className="w-full mt-14 bg-purple-600 hover:bg-purple-700 text-white"
                      variant={
                        channel.status === "premium" ? "default" : "outline"
                      }
                    >
                      {channel.contact === "Chat Now"
                        ? "Start Chat"
                        : channel.contact === "Schedule Call"
                        ? "Book Call"
                        : "Contact Now"}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Support Form and FAQ */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="contact" className="w-full">
            <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-12">
              <TabsTrigger value="contact">Contact Form</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
              <TabsTrigger value="status">Ticket Status</TabsTrigger>
            </TabsList>

            <TabsContent value="contact">
              <div className="max-w-2xl mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Submit a Support Request</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            placeholder="Enter your phone number"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                phone: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Support Category</Label>
                          <select
                            className="w-full px-3 py-2 border border-input rounded-md"
                            value={formData.category}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                category: e.target.value,
                              })
                            }
                          >
                            <option value="search">Property Search</option>
                            <option value="docs">Documentation</option>
                            <option value="tech">Technical Issues</option>
                            <option value="account">Account Support</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <Label htmlFor="subject">Subject *</Label>
                        <Input
                          id="subject"
                          placeholder="Brief description of your issue"
                          value={formData.subject}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              subject: e.target.value,
                            })
                          }
                          required
                        />
                      </div>

                      <div className="space-y-2 mb-4">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          placeholder="Describe your issue in detail"
                          className="min-h-[120px]"
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              message: e.target.value,
                            })
                          }
                          required
                        />
                      </div>

                      <div className="space-y-2 mb-6">
                        <Label>Priority Level</Label>
                        <div className="flex flex-wrap gap-4">
                          <Button
                            type="button"
                            variant={
                              formData.priority === "low"
                                ? "default"
                                : "outline"
                            }
                            size="sm"
                            className={
                              formData.priority === "low"
                                ? "bg-purple-600 hover:bg-purple-700 text-white"
                                : ""
                            }
                            onClick={() =>
                              setFormData({ ...formData, priority: "low" })
                            }
                          >
                            Low
                          </Button>
                          <Button
                            type="button"
                            variant={
                              formData.priority === "medium"
                                ? "default"
                                : "outline"
                            }
                            size="sm"
                            className={
                              formData.priority === "medium"
                                ? "bg-purple-600 hover:bg-purple-700 text-white"
                                : ""
                            }
                            onClick={() =>
                              setFormData({ ...formData, priority: "medium" })
                            }
                          >
                            Medium
                          </Button>
                          <Button
                            type="button"
                            variant={
                              formData.priority === "high"
                                ? "default"
                                : "outline"
                            }
                            size="sm"
                            className={
                              formData.priority === "high"
                                ? "bg-purple-600 hover:bg-purple-700 text-white"
                                : ""
                            }
                            onClick={() =>
                              setFormData({ ...formData, priority: "high" })
                            }
                          >
                            High
                          </Button>
                          <Button
                            type="button"
                            variant={
                              formData.priority === "urgent"
                                ? "destructive"
                                : "outline"
                            }
                            size="sm"
                            onClick={() =>
                              setFormData({ ...formData, priority: "urgent" })
                            }
                          >
                            Urgent
                          </Button>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                        disabled={loading}
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        {loading ? "Submitting..." : "Submit Request"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="faq">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4">
                    Frequently Asked Questions
                  </h3>
                  <div className="max-w-md mx-auto">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input placeholder="Search FAQs..." className="pl-10" />
                    </div>
                  </div>
                </div>

                <Accordion type="single" collapsible className="space-y-4">
                  {faqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="border rounded-lg px-6"
                    >
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center gap-3">
                          <HelpCircle className="w-5 h-5 text-purple-600 flex-shrink-0" />
                          {faq.question}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-0 pb-4 text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                <div className="text-center mt-8">
                  <p className="text-muted-foreground mb-4">
                    Didn't find what you're looking for?
                  </p>
                  <Button variant="outline">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Ask a Question
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="status">
              <div className="max-w-2xl mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Check Ticket Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="ticketId">Ticket ID</Label>
                      <Input
                        id="ticketId"
                        placeholder="Enter your ticket ID (e.g., TK123456)"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Email used for the ticket"
                      />
                    </div>

                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                      <Search className="w-4 h-4 mr-2" />
                      Check Status
                    </Button>

                    {/* Sample ticket status (would be dynamic) */}
                    <div className="border rounded-lg p-4 bg-muted/50">
                      <h4 className="font-semibold mb-2">Recent Tickets</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-white rounded border">
                          <div>
                            <div className="font-medium">TK789012</div>
                            <div className="text-sm text-muted-foreground">
                              Property documentation help
                            </div>
                          </div>
                          <Badge className="bg-green-100 text-green-700">
                            Resolved
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white rounded border">
                          <div>
                            <div className="font-medium">TK789011</div>
                            <div className="text-sm text-muted-foreground">
                              Search filter issues
                            </div>
                          </div>
                          <Badge className="bg-yellow-100 text-yellow-700">
                            In Progress
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Support Categories</h2>
            <p className="text-muted-foreground">
              Common areas where we help our customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-all duration-300"
                >
                  <CardContent className="p-6 text-center">
                    <IconComponent className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                    <h3 className="font-semibold text-lg mb-2">
                      {category.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {category.description}
                    </p>
                    <div className="text-xs text-muted-foreground">
                      {category.tickets} tickets resolved this month
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-muted-foreground">
              Real feedback from satisfied customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.review}"
                  </p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.location}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Knowledge Base */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Self-Help Resources</h2>
            <p className="text-muted-foreground">
              Find answers quickly with our comprehensive guides
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 text-center">
                <FileText className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">User Guides</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Step-by-step instructions for using our platform
                </p>
                <Button variant="outline">Browse Guides</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Video className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Video Tutorials</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Visual guides to help you navigate our features
                </p>
                <Button variant="outline">Watch Videos</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 text-center">
                <HelpCircle className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Help Center</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Comprehensive documentation and troubleshooting
                </p>
                <Button variant="outline">Visit Help Center</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* <Footer /> */}
    </div>
  );
};

export default CustomerService;
