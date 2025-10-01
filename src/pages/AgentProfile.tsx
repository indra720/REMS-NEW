import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Star, Phone, Mail, MapPin, Building, Users, Award, Calendar, MessageCircle, Heart, Eye } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AgentProfile = () => {
  const { agentId } = useParams();

  // Mock agent data - in real app would fetch from API
  const agent = {
    id: agentId,
    name: "Rajesh Sharma",
    title: "Senior Property Consultant",
    company: "Prime Real Estate",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 4.8,
    reviews: 156,
    experience: "8+ Years",
    properties: 89,
    location: "Mumbai, Maharashtra",
    phone: "+91 98765 43210",
    email: "rajesh.sharma@primerealestate.com",
    specialties: ["Residential", "Commercial", "Investment", "Luxury"],
    languages: ["Hindi", "English", "Marathi"],
    verified: true,
    responseTime: "Within 2 hours",
    deals: 234,
    bio: "Experienced real estate professional with over 8 years in the Mumbai property market. Specialized in luxury residential and commercial properties. Known for transparent dealings and excellent customer service."
  };

  const recentProperties = [
    {
      id: 1,
      title: "Luxury 3BHK Apartment",
      location: "Bandra West, Mumbai",
      price: "₹2.5 Cr",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300&h=200&fit=crop",
      type: "Apartment",
      status: "For Sale"
    },
    {
      id: 2,
      title: "Commercial Office Space",
      location: "Andheri East, Mumbai",
      price: "₹1.8 Cr",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&h=200&fit=crop",
      type: "Commercial",
      status: "For Sale"
    },
    {
      id: 3,
      title: "Premium Villa",
      location: "Juhu, Mumbai",
      price: "₹5.2 Cr",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=300&h=200&fit=crop",
      type: "Villa",
      status: "For Sale"
    }
  ];

  const reviews = [
    {
      id: 1,
      name: "Priya Mehta",
      rating: 5,
      date: "2 days ago",
      comment: "Excellent service! Rajesh helped me find the perfect apartment. Very professional and responsive."
    },
    {
      id: 2,
      name: "Amit Kumar",
      rating: 5,
      date: "1 week ago",
      comment: "Great experience working with Rajesh. He understood our requirements and showed us relevant properties."
    },
    {
      id: 3,
      name: "Sunita Sharma",
      rating: 4,
      date: "2 weeks ago",
      comment: "Professional and knowledgeable. Helped us with the entire buying process smoothly."
    }
  ];

 const [propertydata, setpropertydata] = useState<any[]>([]);
  const propertiesdata = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch("http://127.0.0.1:8000/api/properties/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setpropertydata(data);
        toast({
          title: "fetched data",
          description: "data fetched successfully",
        });
      } else {
        console.log("data not fetched");
      }
    } catch (error) {
      console.log(error);
      toast({ title: "fetched data", description: " fetched data is wrong" });
    }
  };
  useEffect(() => {
    propertiesdata();
  }, []);



  return (
    <div className="min-h-screen bg-background">
      {/* <Header /> */}
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Agent Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex flex-col items-center lg:items-start">
                <Avatar className="h-32 w-32 mb-4">
                  <AvatarImage src={agent.image} alt={agent.name} />
                  <AvatarFallback>{agent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(agent.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold">{agent.rating}</span>
                  <span className="text-muted-foreground">({agent.reviews} reviews)</span>
                </div>
                {agent.verified && (
                  <Badge variant="secondary" className="mb-4">
                    <Award className="h-3 w-3 mr-1" />
                    Verified Agent
                  </Badge>
                )}
              </div>

              <div className="flex-1">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{agent.name}</h1>
                    <p className="text-xl text-muted-foreground mb-2">{agent.title}</p>
                    <p className="text-lg font-medium text-purple-600 mb-4">{agent.company}</p>
                  </div>
                  <div className="flex gap-3">
                    <Button className="btn-property  bg-purple-600">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </Button>
                    <Button variant="outline">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{agent.experience}</div>
                    <div className="text-sm text-muted-foreground">Experience</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{agent.properties}</div>
                    <div className="text-sm text-muted-foreground">Properties</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{agent.deals}</div>
                    <div className="text-sm text-muted-foreground">Deals Closed</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{agent.responseTime}</div>
                    <div className="text-sm text-muted-foreground">Response Time</div>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Contact Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{agent.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{agent.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{agent.location}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Specialties</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {agent.specialties.map((specialty) => (
                        <Badge key={specialty} variant="outline">{specialty}</Badge>
                      ))}
                    </div>
                    <h3 className="font-semibold mb-3">Languages</h3>
                    <div className="flex flex-wrap gap-2">
                      {agent.languages.map((language) => (
                        <Badge key={language} variant="secondary">{language}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* About Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>About {agent.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{agent.bio}</p>
          </CardContent>
        </Card>

        {/* Properties Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Properties ({recentProperties.length})</CardTitle>
            <CardDescription>Recent properties listed by {agent.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {propertydata.map((property) => (
                <Card key={property.id} className="hover:shadow-lg transition-all duration-300">
                  <div className="relative h-48">
                    <img 
                      src={property.image} 
                      alt={property.title}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-3 left-3 bg-purple-600">{property.category}</Badge>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="absolute top-3 right-3 h-8 w-8 p-0 bg-white/90 hover:bg-white"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{property.title}</h3>
                      <div className="text-xl font-bold text-purple-600">{property.price}</div>
                    </div>
                    <div className="flex items-center text-muted-foreground mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{property.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{property.type}</Badge>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Reviews Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Reviews ({reviews.length})</CardTitle>
            <CardDescription>What clients say about {agent.name}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold">{review.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default AgentProfile;