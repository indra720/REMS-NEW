import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Building2, Award, Heart, Target, Eye } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "react-toastify";

const AboutUs = () => {
  

  const handleBrowseProperties = () => {
    toast({ title: "Browse Properties", description: "Redirecting to property listings..." });
    window.location.href = '/search';
  };

  const handleContactUs = () => {
    toast({ title: "Contact Us", description: "Redirecting to contact page..." });
    window.location.href = '/contact';
  };

  const stats = [
    { number: "10M+", label: "Happy Customers", icon: Users },
    { number: "50K+", label: "Properties Listed", icon: Building2 },
    { number: "15+", label: "Years Experience", icon: Award },
    { number: "500+", label: "Team Members", icon: Heart },
  ];

  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To revolutionize real estate by making property transactions seamless, transparent, and accessible to everyone through innovative technology.",
    },
    {
      icon: Eye,
      title: "Our Vision",
      description: "To be the most trusted real estate platform globally, empowering millions to find their perfect home and investment opportunities.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* <Header /> */}
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 via-background to-purple-50 py-10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge  className="mb-4 bg-purple-200 hover:bg-purple-200 text-black">About RealEstate Pro</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
              Transforming Real Estate Experience
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Founded in 2009, we've been at the forefront of real estate innovation, helping millions find their dream homes and investment opportunities with cutting-edge technology and personalized service.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-0 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-none bg-background/80 backdrop-blur">
                <CardContent className="pt-6">
                  <stat.icon className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-purple-600 mb-2">{stat.number}</div>
                  <p className="text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-0">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {values.map((value, index) => (
              <Card key={index} className="p-8 h-full">
                <CardHeader className="text-center">
                  <value.icon className="h-16 w-16 text-purple-600 mx-auto mb-4" />
                  <CardTitle className="text-2xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-0 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
            <div className="space-y-8">
              <Card className="p-8">
                <h3 className="text-xl font-semibold mb-4">The Beginning (2009)</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Started as a small team with a big vision to digitize real estate in India. We began by listing properties online when most transactions were still offline.
                </p>
              </Card>
              <Card className="p-8">
                <h3 className="text-xl font-semibold mb-4">Growth & Innovation (2015)</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Introduced virtual tours, AI-powered recommendations, and mobile apps. Expanded to 50+ cities across India with verified listings and professional photography.
                </p>
              </Card>
              <Card className="p-8">
                <h3 className="text-xl font-semibold mb-4">Market Leadership (2020)</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Became India's leading real estate platform with advanced features like virtual reality tours, predictive analytics, and seamless transaction management.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Leadership Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((member) => (
              <Card key={member} className="text-center p-8">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-300 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold mb-2">John Doe</h3>
                <p className="text-purple-600 font-medium mb-2">CEO & Founder</p>
                <p className="text-muted-foreground text-sm">
                  15+ years in real estate technology with a vision to democratize property investments.
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-purple-400">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Find Your Dream Property?
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            Join millions who trust us for their real estate needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="border bg-purple-600 hover:bg-purple-700 text-white" size="lg" onClick={handleBrowseProperties}>
              Browse Properties
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-transparent border-white text-white hover:bg-white hover:text-purple-600"
              onClick={handleContactUs}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
      {/* <Footer /> */}
    </div>
  );
};

export default AboutUs;
