import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  Map,
  Search,
  Download,
  Filter,
} from "lucide-react";

const PriceTrends = () => {
  const cityTrends = [
    { city: "Mumbai", avgPrice: "₹15,000", change: "+5.2%", trend: "up" },
    { city: "Delhi", avgPrice: "₹12,500", change: "+3.8%", trend: "up" },
    { city: "Bangalore", avgPrice: "₹8,500", change: "+7.1%", trend: "up" },
    { city: "Chennai", avgPrice: "₹6,800", change: "-1.2%", trend: "down" },
    { city: "Hyderabad", avgPrice: "₹5,200", change: "+4.5%", trend: "up" },
    { city: "Pune", avgPrice: "₹7,500", change: "+2.3%", trend: "up" },
  ];

  const propertyTypes = [
    { type: "1 BHK", price: "₹45 Lakh", change: "+4.2%" },
    { type: "2 BHK", price: "₹75 Lakh", change: "+3.8%" },
    { type: "3 BHK", price: "₹1.2 Cr", change: "+5.1%" },
    { type: "4+ BHK", price: "₹2.1 Cr", change: "+6.3%" },
  ];

  const localities = [
    { name: "Andheri West", price: "₹18,500/sq ft", change: "+6.2%" },
    { name: "Bandra West", price: "₹25,000/sq ft", change: "+4.8%" },
    { name: "Powai", price: "₹14,200/sq ft", change: "+7.1%" },
    { name: "Thane", price: "₹8,500/sq ft", change: "+3.2%" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* <Header /> */}

      {/* Hero Section */}
      <section className="relative py-5 sm:py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-purple-100 bg-clip-text text-transparent">
              Real Estate Price Trends
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Stay ahead with comprehensive market insights and property price
              trends across India
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                size="lg"
                className="gap-2 bg-purple-600 hover:bg-purple-600"
              >
                <BarChart3 className="w-5 h-5 " />
                View Market Report
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                <Download className="w-5 h-5" />
                Download Trends
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 items-center justify-center sm:justify-between">
            <h2 className="text-2xl font-semibold">Market Analysis</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mumbai">Mumbai</SelectItem>
                  <SelectItem value="delhi">Delhi</SelectItem>
                  <SelectItem value="bangalore">Bangalore</SelectItem>
                  <SelectItem value="chennai">Chennai</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="plots">Plots</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Time Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">Last Month</SelectItem>
                  <SelectItem value="3months">Last 3 Months</SelectItem>
                  <SelectItem value="6months">Last 6 Months</SelectItem>
                  <SelectItem value="1year">Last Year</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                More Filters
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trends Tabs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="cities" className="w-full">
            <TabsList className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full max-w-2xl mx-auto mb-12 gap-2 sm:gap-0 h-auto sm:h-10 p-1">
              <TabsTrigger value="cities" className="w-full text-sm">
                By Cities
              </TabsTrigger>
              <TabsTrigger value="types" className="w-full text-sm">
                Property Types
              </TabsTrigger>
              <TabsTrigger value="localities" className="w-full text-sm">
                Localities
              </TabsTrigger>
              <TabsTrigger value="insights" className="w-full text-sm">
                Market Insights
              </TabsTrigger>
            </TabsList>

            <TabsContent value="cities">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cityTrends.map((city, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-lg transition-all duration-300"
                  >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-lg">{city.city}</CardTitle>
                      {city.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-purple-600">
                        {city.avgPrice}
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        per sq ft
                      </p>
                      <div
                        className={`text-sm font-medium ${
                          city.trend === "up"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {city.change} from last month
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="types">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {propertyTypes.map((type, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-lg transition-all duration-300"
                  >
                    <CardHeader>
                      <CardTitle className="text-lg">{type.type}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-purple-600">
                        {type.price}
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        average price
                      </p>
                      <div className="text-sm font-medium text-green-500">
                        {type.change}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="localities">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {localities.map((locality, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-lg transition-all duration-300"
                  >
                    <CardHeader>
                      <CardTitle className="text-lg">{locality.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-purple-600">
                        {locality.price}
                      </div>
                      <div className="text-sm font-medium text-green-500 mt-2">
                        {locality.change}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="insights">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Market Highlights</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                      <span>Residential prices up 4.2% this quarter</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <BarChart3 className="w-5 h-5 text-purple-500" />
                      <span>Commercial demand increased by 15%</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Map className="w-5 h-5 text-purple-500" />
                      <span>Tier-2 cities showing strong growth</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Investment Opportunities</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-800">
                        High Growth Areas
                      </h4>
                      <p className="text-sm text-green-600">
                        Powai, Thane, Noida Extension
                      </p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-purple-800">
                        Emerging Markets
                      </h4>
                      <p className="text-sm text-purple-600">
                        Navi Mumbai, Gurgaon Sector 150
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* <Footer /> */}
    </div>
  );
};

export default PriceTrends;
