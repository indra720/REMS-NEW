import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building, MapPin, Star, Award, Users, Calendar, Search, Filter } from "lucide-react";

const BuildersIndia = () => {
  const topBuilders = [
    {
      name: "DLF Limited",
      location: "Gurgaon, Delhi NCR",
      established: "1946",
      rating: 4.5,
      projects: 85,
      image: "/placeholder.svg",
      specialties: ["Luxury Residential", "Commercial", "Retail"],
      description: "India's largest real estate developer with premium projects across major cities"
    },
    {
      name: "Godrej Properties",
      location: "Mumbai, Maharashtra",
      established: "1990",
      rating: 4.7,
      projects: 67,
      image: "/placeholder.svg",
      specialties: ["Residential", "Township", "Plotted Development"],
      description: "Trusted name in real estate with focus on sustainable and innovative design"
    },
    {
      name: "Prestige Group",
      location: "Bangalore, Karnataka",
      established: "1986",
      rating: 4.4,
      projects: 120,
      image: "/placeholder.svg",
      specialties: ["Premium Residential", "Commercial", "Hospitality"],
      description: "South India's leading developer known for quality construction and timely delivery"
    }
  ];

  const buildersByCity = {
    "Mumbai": [
      { name: "Lodha Group", projects: 45, rating: 4.3 },
      { name: "Oberoi Realty", projects: 28, rating: 4.6 },
      { name: "Hiranandani Group", projects: 35, rating: 4.2 }
    ],
    "Delhi": [
      { name: "DLF Limited", projects: 85, rating: 4.5 },
      { name: "Unitech Group", projects: 52, rating: 3.9 },
      { name: "BPTP Limited", projects: 41, rating: 4.0 }
    ],
    "Bangalore": [
      { name: "Prestige Group", projects: 120, rating: 4.4 },
      { name: "Brigade Group", projects: 78, rating: 4.2 },
      { name: "Puravankara", projects: 65, rating: 4.1 }
    ]
  };

  const upcomingProjects = [
    {
      name: "DLF Privana",
      builder: "DLF Limited",
      location: "Sector 76, Gurgaon",
      type: "Luxury Apartments",
      price: "₹2.5 Cr onwards",
      possession: "Dec 2025",
      units: "2,3,4 BHK"
    },
    {
      name: "Godrej Tropical Isle",
      builder: "Godrej Properties",
      location: "Sector 146, Noida",
      type: "Premium Residential",
      price: "₹1.8 Cr onwards",
      possession: "Jun 2026",
      units: "2,3 BHK"
    },
    {
      name: "Prestige Falcon City",
      builder: "Prestige Group",
      location: "Kanakapura Road, Bangalore",
      type: "Plotted Development",
      price: "₹85 Lakh onwards",
      possession: "Ready",
      units: "Plots"
    }
  ];

  const awards = [
    { builder: "DLF Limited", award: "Best Developer - National", year: "2023" },
    { builder: "Godrej Properties", award: "Most Trusted Brand", year: "2023" },
    { builder: "Prestige Group", award: "Excellence in Construction", year: "2023" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* <Header /> */}
      
      {/* Hero Section */}
      <section className="relative py-5 bg-gradient-to-br from-purple-100 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
              Top Builders in India
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover India's most trusted real estate developers and their premium projects
            </p>
            
            {/* Search Section */}
            <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <Input 
                    placeholder="Search builders or projects"
                    className="h-12"
                  />
                </div>
                <Select>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select City" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mumbai">Mumbai</SelectItem>
                    <SelectItem value="delhi">Delhi NCR</SelectItem>
                    <SelectItem value="bangalore">Bangalore</SelectItem>
                    <SelectItem value="pune">Pune</SelectItem>
                    <SelectItem value="hyderabad">Hyderabad</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="h-12 gap-2 bg-purple-600 hover:bg-purple-700 text-white">
                  <Search className="w-4 h-4" />
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Builders */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">India's Top Real Estate Developers</h2>
            <p className="text-muted-foreground">Trusted builders with proven track record of excellence</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topBuilders.map((builder, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <Building className="w-16 h-16 text-muted-foreground" />
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{builder.name}</CardTitle>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <MapPin className="w-4 h-4" />
                        {builder.location}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{builder.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{builder.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Established</p>
                      <p className="font-medium">{builder.established}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Total Projects</p>
                      <p className="font-medium">{builder.projects}+</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Specialties:</p>
                    <div className="flex flex-wrap gap-1">
                      {builder.specialties.map((specialty, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white">View Projects</Button>
                    <Button variant="outline" className="flex-1">Contact</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Builders by City */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Builders by City</h2>
            <p className="text-muted-foreground">Explore top developers in major Indian cities</p>
          </div>

          <Tabs defaultValue="Mumbai" className="w-full">
            <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-12">
              <TabsTrigger value="Mumbai">Mumbai</TabsTrigger>
              <TabsTrigger value="Delhi">Delhi NCR</TabsTrigger>
              <TabsTrigger value="Bangalore">Bangalore</TabsTrigger>
            </TabsList>

            {Object.entries(buildersByCity).map(([city, builders]) => (
              <TabsContent key={city} value={city}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {builders.map((builder, index) => (
                    <Card key={index} className="hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold text-lg">{builder.name}</h3>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{builder.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <Building className="w-4 h-4" />
                            <span>{builder.projects} Projects</span>
                          </div>
                        </div>
                        <Button className="w-full" variant="outline">View Details</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Upcoming Projects */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Upcoming Projects</h2>
            <p className="text-muted-foreground">Latest launches from top builders</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingProjects.map((project, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">by {project.builder}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-1 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{project.location}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Type</p>
                      <p className="font-medium">{project.type}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Configuration</p>
                      <p className="font-medium">{project.units}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold text-purple-600">{project.price}</p>
                      <p className="text-xs text-muted-foreground">Starting price</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>{project.possession}</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">View Details</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Awards & Recognition</h2>
            <p className="text-muted-foreground">Celebrating excellence in real estate development</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {awards.map((award, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <Award className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">{award.builder}</h3>
                  <p className="text-muted-foreground mb-2">{award.award}</p>
                  <Badge variant="secondary">{award.year}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Looking for Your Dream Home?</h2>
          <p className="text-xl mb-8">Connect with India's top builders and find your perfect property</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Browse All Builders
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-purple-600">
              Get Expert Advice
            </Button>
          </div>
        </div>
      </section>

      {/* <Footer /> */}
    </div>
  );
};

export default BuildersIndia;
