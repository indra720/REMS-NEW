import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  Key,
  DollarSign,
  TrendingUp,
  MapPin,
  Camera,
  Play,
  Heart,
  IndianRupee,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const BuyRentSell = () => {
  const [activeTab, setActiveTab] = useState("buy");
  const navigate = useNavigate();

  const handlelink = () => {
    navigate("/search");
  };

  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/properties/ai-properties/"
        );
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
        toast.error("Failed to fetch properties.");
      }
    };

    fetchProperties();
  }, []);

  const buyProperties = properties.filter(
    (property: any) => property.category === "Sale"
  );
  const rentProperties = properties.filter(
    (property: any) => property.category === "Rent"
  );

  const sellServices = [
    {
      icon: Home,
      title: "Free Property Valuation",
      description:
        "Get an accurate market value of your property with our AI-powered valuation tool",
      color: "text-purple-600",
    },
    {
      icon: Camera,
      title: "Professional Photography",
      description:
        "High-quality photos and virtual tours to showcase your property at its best",
      color: "text-accent",
    },
    {
      icon: TrendingUp,
      title: "Market Analysis",
      description:
        "Comprehensive market insights to price your property competitively",
      color: "text-real-estate-success",
    },
  ];

  const renderPropertyGrid = (properties: any[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {properties.slice(0, 3).map((property, index) => (
        <Card
          key={property.id}
          className="group hover:shadow-elegant transition-all duration-500 transform hover:-translate-y-3 overflow-hidden bg-gradient-to-br from-background to-secondary/20 border border-border/50 animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="relative overflow-hidden">
            <Heart className="top-3 right-3 text-white absolute z-50" />
            <span
              className={`top-3 left-3 text-white absolute z-50 ${
                property.category == "Rent"
                  ? "bg-green-500 text-white text-[12px] font-semibold group-hover:bg-purple-600 py-1 px-3 rounded-2xl"
                  : "bg-yellow-600 text-black text-[12px] font-semibold group-hover:bg-purple-600 py-1 px-3 rounded-2xl"
              }`}
            >
              {property.category}
            </span>
            {property.images && property.images.length > 0 ? (
              <img
                src={property.images[0].image}
                alt={property.title}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
              />
            ) : (
              <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                <Camera className="w-12 h-12 text-gray-400" />
              </div>
            )}

            {/* Video overlay */}
            {property.hasVideo && (
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  size="lg"
                  className="bg-white/90 text-purple-600 hover:bg-white rounded-full w-16 h-16 p-0"
                >
                  <Play className="w-6 h-6" />
                </Button>
              </div>
            )}

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {property.featured && (
                <Badge className="bg-gradient-hero text-white border-0 shadow-lg hover:bg-purple-600">
                  Featured
                </Badge>
              )}
              {property.hasVideo && (
                <Badge className="bg-background/90 text-foreground border-0 shadow-md hover:bg-purple-600 hover:text-white">
                  <Play className="w-3 h-3 mr-1" />
                  Video
                </Badge>
              )}
            </div>

            {/* Price change for buy properties */}
            {property.priceChange && (
              <div className="absolute top-4 right-4">
                <Badge className="bg-real-estate-success bg-green-600 hover:bg-purple-600 text-white border-0 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />+{property.priceChange}%
                </Badge>
              </div>
            )}
          </div>

          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-purple-600 transition-colors">
              {property.title}
            </h3>

            <div className="flex items-center justify-between text-muted-foreground mb-4">
              <span className="text-sm flex justify-center items-center">
                <MapPin className="w-4 h-4 mr-2  text-purple-500" />
                {property.location}
              </span>
              <span>
                {property.listed_on
                  ? new Date(property.listed_on).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>

            <div className="flex justify-between items-center mb-4">
              <span className="text-3xl font-bold flex justify-center items-center bg-gradient-hero bg-clip-text text-purple-700">
                <IndianRupee/>{property.price}
              </span>
              <span>{property.property_status}</span>
              {activeTab === "rent" && (
                <span className="text-sm text-muted-foreground">/month</span>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4 text-center text-sm">
              <div>
                <div className="font-bold text-foreground group-hover:text-purple-600">
                  {property.bedrooms}
                </div>
                <div className="text-muted-foreground">Beds</div>
              </div>
              <div>
                <div className="font-bold text-foreground group-hover:text-purple-600">
                  {property.bathrooms}
                </div>
                <div className="text-muted-foreground">Baths</div>
              </div>
              <div>
                <div className="font-bold text-foreground group-hover:text-purple-600">
                  {property.area_sqft}
                </div>
                <div className="text-muted-foreground">Area</div>
              </div>
            </div>
            {property.amenities && property.amenities.length > 0 && (
              <div className="mt-4 mb-2 flex text-sm text-muted-foreground ">
                <div className="flex flex-wrap justify-center gap-2">
                  {property.amenities.slice(0, 3).map((amenity: any) => (
                    <Badge
                      key={amenity.id}
                      variant="secondary"
                      className="px-2 py-1 text-white"
                    >
                      {amenity.amenity}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <Button
                className=" bg-transparent  text-black font-semibold text-md hover:text-white border-2  hover:bg-purple-600  "
                size="sm"
                onClick={() => navigate(`/property/${property.slug}`)}
              >
                View Details
              </Button>
              <Button
                size="sm"
                className="bg-gradient-hero bg-purple-400 hover:bg-purple-600 text-white border-0"
              >
                Contact
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <section className="py-24 bg-gradient-to-br from-background via-secondary/5 to-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-purple-600/5 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-20 right-10 w-52 h-52 bg-accent/5 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-5xl font-bold mb-6 text-foreground">
            Buy, Rent, or
            <span className="ml-3 bg-gradient-hero bg-clip-text text-purple-700 mt-5 ">
              Sell Properties
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Whether you're looking to buy your dream home, find the perfect
            rental, or sell your property, we've got you covered
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-background/80 backdrop-blur-sm rounded-2xl p-2 border border-border/50 shadow-card">
            {[
              { id: "buy", label: "Buy Properties", icon: Home },
              { id: "rent", label: "Rent Properties", icon: Key },
              { id: "sell", label: "Sell Property", icon: DollarSign },
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                onClick={() => setActiveTab(tab.id)}
                className={`px-8 py-4 text-lg rounded-xl hover:bg-purple-600 transition-all duration-300  ${
                  activeTab === tab.id
                    ? "bg-gradient-hero text-purple-700 hover:text-white shadow-glow"
                    : "text-muted-foreground hover:text-white"
                }`}
              >
                <tab.icon className="w-5 h-5 mr-2" />
                {tab.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Content based on active tab */}
        <div className="animate-fade-in">
          {activeTab === "buy" && renderPropertyGrid(buyProperties)}
          {activeTab === "rent" && renderPropertyGrid(rentProperties)}
          {activeTab === "sell" && (
            <div className="space-y-16">
              {/* Sell Services */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {sellServices.map((service, index) => (
                  <Card
                    key={index}
                    className="group hover:shadow-elegant transition-all duration-500 transform hover:-translate-y-3 bg-gradient-to-br from-background to-secondary/20 border border-border/30 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-8 text-center">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-background to-secondary shadow-elegant flex items-center justify-center mx-auto mb-6 group-hover:shadow-glow group-hover:scale-110 transition-all duration-300 ${service.color}`}
                      >
                        <service.icon className="w- h-8" />
                      </div>
                      <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-purple-600 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* CTA for selling */}
              <div className="text-center bg-gradient-to-br from-purple-600/5 to-accent/5 rounded-3xl p-12 border border-border/30">
                <h3 className="text-3xl font-bold text-foreground mb-4">
                  Ready to Sell Your Property?
                </h3>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Get a free property valuation and connect with our expert
                  agents to sell your property quickly and at the best price
                </p>
                <Button
                  size="lg"
                  className="bg-gradient-hero text-white border-0 shadow-glow hover:shadow-elegant transition-all duration-300 px-12 py-6 text-lg"
                >
                  Get Free Valuation
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* View More Button */}
        {(activeTab === "buy" || activeTab === "rent") && (
          <div className="text-center mt-16">
            <Button
              onClick={handlelink}
              size="lg"
              className="bg-gradient-hero  hover:bg-purple-600 bg-purple-600 text-white border-0 shadow-glow hover:shadow-elegant transition-all duration-300 px-8 sm:px-12 py-6 text-lg"
            >
              View All{" "}
              {activeTab === "buy"
                ? "Properties for Sale"
                : "Rental Properties"}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BuyRentSell;
