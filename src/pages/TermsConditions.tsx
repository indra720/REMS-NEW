import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const TermsConditions = () => {
  const sections = [
    {
      title: "1. Introduction",
      content: "Welcome to RealEstate Pro. These Terms and Conditions govern your use of our website and services. By accessing or using our platform, you agree to be bound by these terms."
    },
    {
      title: "2. User Accounts",
      content: "You must create an account to access certain features. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account."
    },
    {
      title: "3. Property Listings",
      content: "Property owners and agents can list properties on our platform. All listings must be accurate and comply with applicable laws. We reserve the right to remove listings that violate our policies."
    },
    {
      title: "4. Service Fees",
      content: "Our platform may charge fees for certain services. All fees will be clearly disclosed before you commit to any paid service. Fees are non-refundable unless otherwise stated."
    },
    {
      title: "5. User Conduct",
      content: "Users must not engage in fraudulent activities, post false information, or use the platform for illegal purposes. We reserve the right to suspend or terminate accounts that violate these rules."
    },
    {
      title: "6. Privacy Policy",
      content: "Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your personal information."
    },
    {
      title: "7. Intellectual Property",
      content: "All content on our platform, including text, images, logos, and software, is protected by intellectual property laws. You may not reproduce or distribute our content without permission."
    },
    {
      title: "8. Limitation of Liability",
      content: "We provide our services 'as is' and disclaim all warranties. Our liability is limited to the maximum extent permitted by law. We are not responsible for any indirect or consequential damages."
    },
    {
      title: "9. Dispute Resolution",
      content: "Any disputes arising from the use of our services will be resolved through binding arbitration in accordance with Indian law. You waive any right to participate in class-action lawsuits."
    },
    {
      title: "10. Modifications",
      content: "We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting. Your continued use of the platform constitutes acceptance of the modified terms."
    },
    {
      title: "11. Termination",
      content: "Either party may terminate this agreement at any time. Upon termination, you must cease all use of our services and delete any downloaded content."
    },
    {
      title: "12. Governing Law",
      content: "These Terms and Conditions are governed by the laws of India. Any legal proceedings must be brought in the courts of Mumbai, Maharashtra."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 py-5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4">Legal Information</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Terms & Conditions
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Please read these terms and conditions carefully before using our services.
            </p>
            <div className="text-sm text-muted-foreground">
              Last updated: January 2024
            </div>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-0">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className=" text-center ">
              <CardHeader>
                <CardTitle className="text-2xl mb-4">Terms and Conditions of Use</CardTitle>
                <p className="text-muted-foreground">
                  By using RealEstate Pro's website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
                </p>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-8">
                    {sections.map((section, index) => (
                      <div key={index}>
                        <h3 className="text-lg font-semibold mb-3 text-primary">
                          {section.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed mb-6">
                          {section.content}
                        </p>
                        {index < sections.length - 1 && <Separator />}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <Card className="p-2">
                <CardHeader>
                  <CardTitle className="text-xl">Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    If you have any questions about these Terms and Conditions, please contact us:
                  </p>
                  <div className="space-y-2 text-sm">
                    <p><strong>Email:</strong> legal@realestatepro.com</p>
                    <p><strong>Phone:</strong> +91 98765 43210</p>
                    <p><strong>Address:</strong> 123 Business District, Mumbai, Maharashtra 400001</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="">
                <CardHeader>
                  <CardTitle className="text-xl">Related Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    These documents work together to govern your use of our services:
                  </p>
                  <div className="space-y-2">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="font-medium text-sm">Privacy Policy</p>
                      <p className="text-xs text-muted-foreground">How we handle your data</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="font-medium text-sm">Cookie Policy</p>
                      <p className="text-xs text-muted-foreground">Our use of cookies</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="font-medium text-sm">User Guidelines</p>
                      <p className="text-xs text-muted-foreground">Platform usage rules</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Agreement Notice */}
            <Card className="p-4 mt-8 mb-4 bg-muted/20 border-primary/20">
              <div className="text-center">
                <h3 className="font-semibold text-lg mb-2">Agreement Acknowledgment</h3>
                <p className="text-muted-foreground text-sm">
                  By continuing to use RealEstate Pro, you acknowledge that you have read and agree to these Terms and Conditions. 
                  If you do not agree with any part of these terms, please discontinue use of our services immediately.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsConditions;