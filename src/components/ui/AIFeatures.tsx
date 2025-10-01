import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp, Search, Target, MapPin, DollarSign } from "lucide-react";

const AIFeatures = () => {
  const features = [
    {
      icon: Brain,
      title: "Smart Property Matching",
      description: "Our AI analyzes your preferences and behavior to recommend properties that perfectly match your needs and lifestyle.",
      color: "text-purple-600"
    },
    {
      icon: TrendingUp,
      title: "Price Prediction",
      description: "Get accurate price forecasts and market trends powered by machine learning algorithms and real-time data.",
      color: "text-accent"
    },
    {
      icon: Search,
      title: "Intelligent Search",
      description: "Use natural language to search for properties. Just describe what you want, and our AI will find it.",
      color: "text-real-estate-success"
    },
    {
      icon: Target,
      title: "Investment Analysis",
      description: "AI-powered ROI calculations and investment potential analysis for each property in your portfolio.",
      color: "text-purple-600"
    },
    {
      icon: MapPin,
      title: "Neighborhood Insights",
      description: "Get detailed insights about neighborhoods including schools, crime rates, amenities, and future development plans.",
      color: "text-accent"
    },
    {
      icon: DollarSign,
      title: "Smart Financing",
      description: "AI recommends the best mortgage options and calculates optimal down payments based on your financial profile.",
      color: "text-real-estate-success"
    }
  ];

  return (
    <section className="py-10 bg-gray-50 relative overflow-hidden ">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-bounce"></div>
        <div className="absolute top-60 right-1/3 w-24 h-24 bg-purple-600/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="container mx-auto px-4  relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <span className="bg-gradient-hero bg-clip-text text-purple-600 text-lg font-bold tracking-wider uppercase">Next-Gen Technology</span>
          </div>
          <h2 className="text-5xl md:text-5xl font-bold mb-8 text-foreground leading-tight">
            Powered by
            <span className="ml-3 bg-gradient-hero bg-clip-text text-purple-700">
              Artificial Intelligence
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Experience revolutionary real estate technology with AI-driven insights, personalized recommendations, 
            and smart analytics that transform how you discover your dream property.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-elegant transition-all duration-500 transform hover:-translate-y-4 bg-gradient-to-br from-background via-background to-secondary/10 border border-border/30 relative overflow-hidden animate-fade-in"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <CardContent className="p-8 text-center relative z-10">
                <div className="relative mb-6">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br from-background to-secondary shadow-elegant flex items-center justify-center mx-auto group-hover:shadow-glow group-hover:scale-110 transition-all duration-300 ${feature.color} border border-border/20`}>
                    <feature.icon className="w-10 h-10" />
                  </div>
                  {/* Floating dot */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-hero rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-purple-600 transition-colors group-hover:text-purple-600">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {feature.description}
                </p>
                
                {/* Learn More Link */}
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <button className="text-purple-600 hover:text-purple-800 font-semibold text-sm uppercase tracking-wide transition-colors group-hover:text-purple-600 ">
                    Learn More →
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* <div className="text-center space-y-8">
          <Button size="lg" className="bg-gradient-hero text-white bg-purple-500 hover:bg-purple-600 border shadow-glow hover:text-white hover:shadow-elegant transition-all duration-300 px-16 py-8 text-xl rounded-2xl">
            <Brain className="w-6 h-6 mr-3" />
            Experience AI Real Estate
          </Button>
          
          <div className="flex justify-center items-center space-x-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">99.2%</div>
              <div className="text-muted-foreground text-sm">AI Accuracy</div>
            </div>
            <div className="w-px h-12 bg-border"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">24/7</div>
              <div className="text-muted-foreground text-sm">AI Support</div>
            </div>
            <div className="w-px h-12 bg-border"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">1M+</div>
              <div className="text-muted-foreground text-sm">AI Predictions</div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default AIFeatures;