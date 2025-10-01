import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "react-toastify";
import { showSuccessToast, showErrorToast } from "@/utils/toast";
import { MapPin, Phone, Mail, Clock, MessageSquare, Headphones } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const contactData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        status: 'New'
      };

      console.log('Sending contact data:', contactData);

      const token = localStorage.getItem("access_token");
      const response = await fetch('http://localhost:8000/api/leads/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(contactData)
      });

      const result = await response.json();
      console.log('API Response:', result);

      if (response.ok) {
        toast({
          title: "Message Sent Successfully",
          description: "We'll get back to you within 24 hours.",
        });
        
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleCall = (phoneNumber: string) => {
    window.location.href = `tel:${phoneNumber}`;
    toast({
      title: "Initiating Call",
      description: `Calling ${phoneNumber}...`,
    });
  };

  const handleLiveChat = () => {
    toast({
      title: "Starting Live Chat",
      description: "Connecting you to our support team...",
    });
  };

  const handleScheduleCall = () => {
    toast({
      title: "Schedule Call",
      description: "Redirecting to booking calendar...",
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+91 98765 43210", "+91 87654 32109"],
      description: "Mon-Sat 9:00 AM to 9:00 PM"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["support@realestatepro.com", "sales@realestatepro.com"],
      description: "We'll respond within 24 hours"
    },
    {
      icon: MapPin,
      title: "Office",
      details: ["123 Business District", "Mumbai, Maharashtra 400001"],
      description: "Visit us Mon-Fri 10:00 AM to 6:00 PM"
    },
  ];

  const offices = [
    { city: "Mumbai", address: "Bandra Kurla Complex, Mumbai - 400051", phone: "+91 98765 43210" },
    { city: "Delhi", address: "Connaught Place, New Delhi - 110001", phone: "+91 98765 43211" },
    { city: "Bangalore", address: "MG Road, Bangalore - 560001", phone: "+91 98765 43212" },
    { city: "Pune", address: "Koregaon Park, Pune - 411001", phone: "+91 98765 43213" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 via-background to-purple-50 py-5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4">Get In Touch</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
              Contact Us
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Have questions? We're here to help. Reach out to our expert team for any assistance with your real estate needs.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <info.icon className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <CardTitle className="text-xl">{info.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="font-medium text-foreground mb-1">{detail}</p>
                  ))}
                  <p className="text-muted-foreground text-sm mt-2">{info.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Quick Actions */}
      <section className="py-8 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="p-8">
              <CardHeader>
                <CardTitle className="text-2xl mb-2">Send us a Message</CardTitle>
                <p className="text-muted-foreground">Fill out the form below and we'll get back to you within 24 hours.</p>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-1 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Name *</label>
                      <Input 
                        placeholder="Enter your full name" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email *</label>
                    <Input 
                      type="email" 
                      placeholder="john@example.com" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Phone (Optional)</label>
                    <Input 
                      type="tel" 
                      placeholder="+91 98765 43210" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Subject (Optional)</label>
                    <Input 
                      placeholder="Property inquiry" 
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Message (Optional)</label>
                    <Textarea 
                      placeholder="Tell us about your requirements..." 
                      rows={5} 
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white" size="lg">
                    Send Message
                  </Button>
                </div>
              </form>
            </Card>

            {/* Quick Actions */}
            <div className="space-y-8">
              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <MessageSquare className="h-6 w-6 text-purple-600" />
                    Live Chat Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">Get instant help from our support team</p>
                  <Button variant="outline" className="w-full" onClick={handleLiveChat}>
                    Start Live Chat
                  </Button>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Headphones className="h-6 w-6 text-purple-600" />
                    Schedule a Call
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">Book a consultation with our experts</p>
                  <Button variant="outline" className="w-full" onClick={handleScheduleCall}>
                    Schedule Call
                  </Button>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Clock className="h-6 w-6 text-purple-600" />
                    Business Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 9:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-medium">10:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Office Locations</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {offices.map((office, index) => (
              <Card key={index} className="p-4 text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{office.city}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-3">{office.address}</p>
                  <Button 
                    variant="ghost" 
                    className="font-medium text-purple-600 hover:bg-purple-100"
                    onClick={() => handleCall(office.phone)}
                  >
                    {office.phone}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className=" bg-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                question: "How do I list my property?",
                answer: "You can list your property by creating an account and using our 'Add Property' feature. Our team will verify and publish your listing within 24 hours."
              },
              {
                question: "Are the property listings verified?",
                answer: "Yes, all our listings go through a verification process including document checks and site visits to ensure authenticity."
              },
              {
                question: "What are your service charges?",
                answer: "Our service charges vary based on the type of service. Please contact our sales team for detailed pricing information."
              },
              {
                question: "Do you provide home loans?",
                answer: "We partner with leading banks and NBFCs to help you get the best home loan deals. Our loan specialists can guide you through the process."
              }
            ].map((faq, index) => (
              <Card key={index} className="p-6">
                <h3 className="font-semibold text-lg mb-3">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;