import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Quote, Award, Users, TrendingUp } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Software Engineer",
      location: "Mumbai",
      rating: 5,
      comment: "RealEstate Pro made finding my dream home incredibly easy. The AI recommendations were spot-on, and the virtual tours saved me so much time. The entire process was transparent and hassle-free.",
      property: "2BHK Apartment in Bandra"
    },
    {
      name: "Rajesh Kumar",
      role: "Business Owner",
      location: "Delhi",
      rating: 5,
      comment: "As a property investor, I've used many platforms, but RealEstate Pro stands out. Their market analysis tools and ROI calculators helped me make informed decisions. Excellent service!",
      property: "Commercial Office Space"
    },
    {
      name: "Anjali Patel",
      role: "Doctor",
      location: "Bangalore",
      rating: 5,
      comment: "The team was incredibly professional and patient. They understood my specific requirements and showed me properties that matched perfectly. Found my ideal home within a month!",
      property: "3BHK Villa in Whitefield"
    },
    {
      name: "Vikram Singh",
      role: "Marketing Manager",
      location: "Pune",
      rating: 4,
      comment: "Great platform with extensive property listings. The search filters are very detailed, and the agent was knowledgeable about the locality. Would definitely recommend to others.",
      property: "2BHK Flat in Koregaon Park"
    },
    {
      name: "Meera Reddy",
      role: "Teacher",
      location: "Hyderabad",
      rating: 5,
      comment: "First-time home buyer and was quite nervous about the process. The RealEstate Pro team guided me through every step, from property selection to loan processing. Fantastic experience!",
      property: "1BHK Apartment in Gachibowli"
    },
    {
      name: "Arjun Mehta",
      role: "IT Consultant",
      location: "Chennai",
      rating: 5,
      comment: "The digital documentation process was seamless. Everything was handled online, and I could track the progress in real-time. The legal verification service gave me complete peace of mind.",
      property: "4BHK Independent House"
    }
  ];

  const stats = [
    { number: "50,000+", label: "Happy Customers", icon: Users },
    { number: "4.8/5", label: "Average Rating", icon: Star },
    { number: "95%", label: "Satisfaction Rate", icon: TrendingUp },
    { number: "25+", label: "Awards Won", icon: Award },
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 via-background to-purple-50 py-5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4">Customer Stories</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
              What Our Customers Say
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Real stories from real people who found their perfect properties with RealEstate Pro. Join thousands of satisfied customers.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-5 bg-muted/20">
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

      {/* Testimonials Grid */}
      <section className="py-5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 ">Customer Success Stories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow h-full flex flex-col">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex gap-1">
                      {renderStars(testimonial.rating)}
                    </div>
                    <Quote className="h-6 w-6 text-purple-300" />
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-muted-foreground mb-6 leading-relaxed flex-1">
                    "{testimonial.comment}"
                  </p>
                  <div className="border-t pt-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-400 rounded-full flex items-center justify-center text-white font-semibold">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    <Badge variant="outline" className="mt-2 text-xs">
                      {testimonial.property}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section className="py-5 bg-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Video Testimonials</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((video) => (
              <Card key={video} className="overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                  <Button variant="outline" className="rounded-full p-4">
                    <div className="w-0 h-0 border-l-[12px] border-l-purple-600 border-y-[8px] border-y-transparent ml-1"></div>
                  </Button>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">Customer Success Story {video}</h3>
                  <p className="text-sm text-muted-foreground">Watch how RealEstate Pro helped this customer find their dream home.</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Trusted by Industry Leaders</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Best Real Estate Platform 2023", org: "PropTech Awards" },
              { title: "Customer Choice Award", org: "Indian Realty Awards" },
              { title: "Digital Innovation Excellence", org: "CREDAI" },
              { title: "Most Trusted Brand", org: "Real Estate Consumer Awards" },
            ].map((award, index) => (
              <Card key={index} className="text-center p-6">
                <Award className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">{award.title}</h3>
                <p className="text-sm text-muted-foreground">{award.org}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-gradient-to-r from-purple-600 to-purple-400">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Join Our Success Stories?
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            Start your property journey today and experience the difference
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">
              Browse Properties
            </Button>
            <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-purple-600 trasaction-all duration-200 ">
              Share Your Story
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
