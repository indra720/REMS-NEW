import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Shield, Eye, Lock, Database, UserCheck, Mail } from "lucide-react";

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: Database,
      title: "1. Information We Collect",
      content: "We collect information you provide directly to us, such as when you create an account, list a property, or contact us. This includes personal information like your name, email address, phone number, and property preferences. We also automatically collect certain information when you use our services, including your IP address, browser type, and usage patterns."
    },
    {
      icon: Eye,
      title: "2. How We Use Your Information",
      content: "We use your information to provide, maintain, and improve our services, process transactions, send you communications, personalize your experience, and comply with legal obligations. We may also use your information for research and analytics to better understand user behavior and improve our platform."
    },
    {
      icon: UserCheck,
      title: "3. Information Sharing and Disclosure",
      content: "We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our platform, conducting business, or serving you. We may also disclose information when required by law or to protect our rights, property, or safety."
    },
    {
      icon: Lock,
      title: "4. Data Security",
      content: "We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, and regular security audits. However, no method of transmission over the internet is 100% secure."
    },
    {
      icon: Shield,
      title: "5. Your Rights and Choices",
      content: "You have the right to access, update, or delete your personal information. You can also opt out of certain communications from us. If you wish to exercise these rights, please contact us using the information provided below. We will respond to your request within a reasonable timeframe."
    },
    {
      icon: Mail,
      title: "6. Cookies and Tracking Technologies",
      content: "We use cookies and similar tracking technologies to collect and use personal information about you. This helps us remember your preferences, understand how you use our services, and provide personalized content. You can control cookies through your browser settings."
    }
  ];

  const additionalSections = [
    {
      title: "7. Third-Party Services",
      content: "Our platform may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to read their privacy policies before providing any information."
    },
    {
      title: "8. Data Retention",
      content: "We retain your personal information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. When we no longer need your information, we will securely delete or anonymize it."
    },
    {
      title: "9. Children's Privacy",
      content: "Our services are not intended for children under 18 years of age. We do not knowingly collect personal information from children under 18. If you believe we have collected information from a child under 18, please contact us immediately."
    },
    {
      title: "10. International Data Transfers",
      content: "Your information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards to protect your information."
    },
    {
      title: "11. Changes to This Policy",
      content: "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the 'Last Updated' date. Your continued use of our services after any changes constitutes acceptance of the new policy."
    },
    {
      title: "12. Contact Information",
      content: "If you have any questions about this Privacy Policy or our privacy practices, please contact us at privacy@realestatepro.com or +91 98765 43210. You can also write to us at: Privacy Officer, RealEstate Pro, 123 Business District, Mumbai, Maharashtra 400001."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600/5 via-background to-accent/5 py-5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4">Data Protection</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-accent bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
            </p>
            <div className="text-sm text-muted-foreground">
              Last updated: January 2024
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Principles */}
      <section className="bg-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Privacy Principles</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center p-6">
              <Shield className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Transparency</h3>
              <p className="text-muted-foreground text-sm">We clearly explain what data we collect and how we use it.</p>
            </Card>
            <Card className="text-center p-6">
              <Lock className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Security</h3>
              <p className="text-muted-foreground text-sm">Your data is protected with industry-standard security measures.</p>
            </Card>
            <Card className="text-center p-6">
              <UserCheck className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Control</h3>
              <p className="text-muted-foreground text-sm">You have full control over your personal information and privacy settings.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Privacy Policy Content */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-2">
              <CardHeader>
                <CardTitle className="text-2xl mb-4">Privacy Policy Details</CardTitle>
                <p className="text-muted-foreground">
                  This Privacy Policy applies to all services provided by RealEstate Pro and explains our practices regarding the collection, use, and disclosure of your information.
                </p>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-8">
                    {sections.map((section, index) => (
                      <div key={index}>
                        <div className="flex  items-start gap-4 mb-4">
                          <section.icon className="h-6 w-6 text-purple-600 mt-1  flex-shrink-0" />
                          <h3 className="text-lg font-semibold text-purple-600">
                            {section.title}
                          </h3>
                        </div>
                        <p className="text-muted-foreground leading-relaxed mb-6 ml-1 text-center">
                          {section.content}
                        </p>
                        <Separator />
                      </div>
                    ))}
                    
                    {additionalSections.map((section, index) => (
                      <div key={index}>
                        <h3 className="text-lg font-semibold mb-3 text-purple-600">
                          {section.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed mb-6">
                          {section.content}
                        </p>
                        {index < additionalSections.length - 1 && <Separator />}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Data Types Table */}
            <Card className="p-6 mt-8">
              <CardHeader>
                <CardTitle className="text-xl">Types of Data We Collect</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Personal Information</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Name and contact details</li>
                      <li>• Email address and phone number</li>
                      <li>• Property preferences and requirements</li>
                      <li>• Financial information (for loan processing)</li>
                      <li>• Identity verification documents</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Usage Information</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Pages visited and time spent</li>
                      <li>• Search queries and preferences</li>
                      <li>• Device information and IP address</li>
                      <li>• Browser type and version</li>
                      <li>• Location data (with permission)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Section */}
            <Card className="p-6 mt-8 bg-muted/20 border-purple-600/20">
              <div className="text-center">
                <h3 className="font-semibold text-lg mb-4">Questions About Privacy?</h3>
                <p className="text-muted-foreground mb-6">
                  If you have any questions about this Privacy Policy or how we handle your data, please don't hesitate to contact us.
                </p>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-purple-600">privacy@realestatepro.com</p>
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-purple-600">+91 98765 43210</p>
                  </div>
                  <div>
                    <p className="font-medium">Data Protection Officer</p>
                    <p className="text-purple-600">dpo@realestatepro.com</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;