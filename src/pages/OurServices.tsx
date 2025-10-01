import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, Building2, MapPin, Calculator, FileText, Users, Search, Zap, Shield, TrendingUp, Camera, Phone } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const OurServices = () => {
  
  const navigate = useNavigate();

  const handleExploreServices = () => {
    document.getElementById('core-services')?.scrollIntoView({ behavior: 'smooth' });
    toast({
      title: "Exploring Services",
      description: "Scroll down to see our complete service portfolio",
    });
  };

  const handleScheduleConsultation = () => {
    navigate('/book-visit');
    toast({
      title: "Redirecting to Contact",
      description: "Book your free consultation with our experts",
    });
  };

  const handleLearnMore = (serviceName: string) => {
    toast({
      title: `Learn More: ${serviceName}`,
      description: "Detailed service information would be displayed here",
    });
  };

  const handleContactSales = (serviceType: string) => {
    navigate('/contact-us');
    toast({
      title: `Contact Sales - ${serviceType}`,
      description: "Our sales team will contact you within 24 hours",
    });
  };

  const handleBookConsultation = () => {
    navigate('/contact-us');
    toast({
      title: "Book Free Consultation",
      description: "Schedule your consultation with our real estate experts",
    });
  };

  const handleViewAllServices = () => {
    document.getElementById('core-services')?.scrollIntoView({ behavior: 'smooth' });
    toast({
      title: "All Services",
      description: "Viewing complete service portfolio below",
    });
  };
  const mainServices = [
    {
      icon: Search,
      title: "Property Search & Discovery",
      description: "Advanced AI-powered search to find your perfect property",
      features: ["Smart filters", "Voice search", "Map-based discovery", "Saved searches"]
    },
    {
      icon: Building2,
      title: "Property Listing & Marketing",
      description: "List your property with professional marketing support",
      features: ["Professional photography", "Virtual tours", "Market analysis", "Digital marketing"]
    },
    {
      icon: Users,
      title: "Agent & Broker Network",
      description: "Connect with verified real estate professionals",
      features: ["Verified agents", "Performance ratings", "Direct communication", "Expert guidance"]
    },
    {
      icon: Calculator,
      title: "Financial Services",
      description: "Complete financial solutions for property transactions",
      features: ["Loan assistance", "EMI calculator", "Investment analysis", "Tax guidance"]
    }
  ];

  const specializedServices = [
    {
      category: "For Buyers",
      icon: Home,
      services: [
        { name: "Property Verification", desc: "Complete document and legal verification" },
        { name: "Home Inspection", desc: "Professional property inspection services" },
        { name: "Loan Processing", desc: "End-to-end home loan assistance" },
        { name: "Legal Support", desc: "Expert legal guidance and documentation" }
      ]
    },
    {
      category: "For Sellers",
      icon: TrendingUp,
      services: [
        { name: "Property Valuation", desc: "AI-powered accurate property pricing" },
        { name: "Marketing Suite", desc: "Professional photography and virtual tours" },
        { name: "Lead Generation", desc: "Qualified buyer leads and inquiries" },
        { name: "Transaction Support", desc: "Complete sale process management" }
      ]
    },
    {
      category: "For Investors",
      icon: Building2,
      services: [
        { name: "Investment Analysis", desc: "ROI calculations and market insights" },
        { name: "Portfolio Management", desc: "Track and manage property investments" },
        { name: "Market Research", desc: "Detailed market trends and forecasts" },
        { name: "Tax Optimization", desc: "Investment tax planning and benefits" }
      ]
    },
    {
      category: "For Renters",
      icon: MapPin,
      services: [
        { name: "Rental Search", desc: "Find verified rental properties" },
        { name: "Tenant Verification", desc: "Background and credit checks" },
        { name: "Agreement Support", desc: "Legal rental agreement assistance" },
        { name: "Maintenance Services", desc: "Property maintenance and repairs" }
      ]
    }
  ];

  const premiumServices = [
    {
      title: "Concierge Service",
      price: "₹50,000/month",
      features: [
        "Dedicated property consultant",
        "Priority property access",
        "Personalized property tours",
        "Direct developer connections",
        "Investment advisory",
        "24/7 support"
      ]
    },
    {
      title: "Enterprise Solutions", 
      price: "Custom Pricing",
      features: [
        "Bulk property management",
        "Corporate relocation services",
        "Custom API integration",
        "White-label solutions",
        "Analytics and reporting",
        "Dedicated account manager"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 via-background to-purple-50 py-0">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4">Our Services</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
              Complete Real Estate Solutions
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              From property search to closing deals, we provide end-to-end real estate services powered by technology and expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white" onClick={handleExploreServices}>Explore Services</Button>
              <Button variant="outline" size="lg" onClick={handleScheduleConsultation} >Schedule Consultation</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Service Statistics */}
      <section className="py-12 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: "50K+", label: "Properties Served", icon: Home },
              { number: "10K+", label: "Happy Clients", icon: Users },
              { number: "500+", label: "Expert Agents", icon: Shield },
              { number: "98%", label: "Success Rate", icon: TrendingUp }
            ].map((stat, index) => (
              <Card key={index} className="text-center p-6 border-none bg-background/80 backdrop-blur">
                <stat.icon className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-purple-600 mb-1">{stat.number}</div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section id="core-services" className="py-0">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Core Services</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {mainServices.map((service, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="sm:flex items-center gap-4">
                    <div className="p-3 bg-purple-100 rounded-lg ">
                      <service.icon className="h-8 w-8 text-purple-600 mx-auto" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                      <p className="text-muted-foreground">{service.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-purple-600" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full mt-4" 
                    variant="outline"
                    onClick={() => handleLearnMore(service.title)}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Specialized Services by User Type */}
      <section className="py-0 bg-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Services by User Type</h2>
          <Tabs defaultValue="buyers" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="buyers">Buyers</TabsTrigger>
              <TabsTrigger value="sellers">Sellers</TabsTrigger>
              <TabsTrigger value="investors">Investors</TabsTrigger>
              <TabsTrigger value="renters">Renters</TabsTrigger>
            </TabsList>
            
            {specializedServices.map((category, categoryIndex) => (
              <TabsContent 
                key={categoryIndex} 
                value={category.category.toLowerCase().replace(' ', '').replace('for', '')}
                className="mt-8"
              >
                <Card className="p-8">
                  <CardHeader className="text-center">
                    <category.icon className="h-16 w-16 text-purple-600 mx-auto mb-4" />
                    <CardTitle className="text-2xl">{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      {category.services.map((service, serviceIndex) => (
                        <div key={serviceIndex} className="p-4 bg-muted/50 rounded-lg">
                          <h3 className="font-semibold mb-2">{service.name}</h3>
                          <p className="text-sm text-muted-foreground">{service.desc}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Premium Services */}
      <section className="py-0">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Premium Services</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl  sm:max-w-4xl mx-auto">
            {premiumServices.map((service, index) => (
              <Card key={index} className=" relative">
                <Badge className="absolute top-4 right-4 bg-purple-600">Premium</Badge>
                <CardHeader>
                  <CardTitle className="text-2xl mt-4 sm:mt-0">{service.title}</CardTitle>
                  <p className="text-3xl font-bold text-purple-600">{service.price}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <Shield className="h-4 w-4 text-purple-600 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white" 
                    size="lg"
                    onClick={() => handleContactSales(service.title)}
                  >
                    Contact 
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology-Powered Features */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Technology-Powered Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Camera,
                title: "Virtual Reality Tours",
                description: "Immersive 360° property tours from anywhere",
                benefits: ["Save time", "Remote viewing", "Detailed exploration"]
              },
              {
                icon: Calculator,
                title: "AI Price Prediction",
                description: "Machine learning-powered property valuations",
                benefits: ["Accurate pricing", "Market insights", "Investment guidance"]
              },
              {
                icon: Phone,
                title: "Smart Matching",
                description: "AI algorithms match properties to preferences",
                benefits: ["Personalized results", "Time-saving", "Better matches"]
              }
            ].map((feature, index) => (
              <Card key={index} className="p-6 text-center">
                <feature.icon className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <div className="space-y-2">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <Badge key={benefitIndex} variant="outline" className="mx-1">
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Process */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How Our Services Work</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: "1", title: "Consultation", desc: "Understand your requirements" },
                { step: "2", title: "Matching", desc: "Find the perfect properties" },
                { step: "3", title: "Verification", desc: "Complete property checks" },
                { step: "4", title: "Closure", desc: "Seamless transaction support" }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {item.step}
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-purple-400">
        <div className="container mx-auto px-4 text-center">
          <Users className="h-16 w-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-white/80 mb-8 text-lg max-w-2xl mx-auto">
            Let our experts help you navigate your real estate journey with confidence and ease.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" onClick={handleBookConsultation}>Book Free Consultation</Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-transparent border-white text-white hover:bg-white hover:text-purple-600"
              onClick={handleViewAllServices}
            >
              View All Services
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurServices;
