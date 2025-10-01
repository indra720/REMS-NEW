import { useState } from "react";
import { ChevronLeft, ChevronRight, TrendingUp, Award, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface NewLaunchProject {
  id: string;
  image: string;
  title: string;
  location: string;
  priceRange: string;
  reraId: string;
  appreciation: string;
  builder: string;
}

const newLaunches: NewLaunchProject[] = [
  {
    id: "1",
    image: "/src/assets/property-1.jpg",
    title: "Skyline Residences",
    location: "Sector 84, Gurgaon",
    priceRange: "₹1.2 - 2.8 Cr",
    reraId: "RERA-GGM-567-2024",
    appreciation: "+12%",
    builder: "DLF Limited"
  },
  {
    id: "2",
    image: "/src/assets/property-2.jpg",
    title: "Emerald Gardens",
    location: "Whitefield, Bangalore",
    priceRange: "₹85 L - 1.5 Cr",
    reraId: "RERA-KAR-234-2024",
    appreciation: "+8%",
    builder: "Prestige Group"
  },
  {
    id: "3",
    image: "/src/assets/property-3.jpg",
    title: "Metro Heights",
    location: "Dwarka, Delhi",
    priceRange: "₹1.5 - 3.2 Cr",
    reraId: "RERA-DEL-789-2024",
    appreciation: "+15%",
    builder: "Godrej Properties"
  },
  {
    id: "4",
    image: "/src/assets/property-4.jpg",
    title: "Tech Hub Plaza",
    location: "Hinjewadi, Pune",
    priceRange: "₹75 L - 1.8 Cr",
    reraId: "RERA-MAH-456-2024",
    appreciation: "+10%",
    builder: "Tata Housing"
  }
];

export function NewLaunchesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 3;

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + itemsToShow >= newLaunches.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(0, newLaunches.length - itemsToShow) : prev - 1
    );
  };

  const visibleProjects = newLaunches.slice(currentIndex, currentIndex + itemsToShow);
  if (visibleProjects.length < itemsToShow) {
    visibleProjects.push(...newLaunches.slice(0, itemsToShow - visibleProjects.length));
  }

  return (
    <div className="bg-gradient-surface rounded-xl p-6 shadow-soft border border-border/50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Award className="w-6 h-6 text-purple-600" />
          <h2 className="text-xl font-semibold">Newly Launched Projects</h2>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="w-8 h-8 hover:bg-purple-600 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="w-8 h-8 hover:bg-purple-600 hover:text-white transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleProjects.map((project, index) => (
          <Card key={`${project.id}-${index}`} className="group overflow-hidden bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-300 border-border/50">
            <div className="relative">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* New Launch Badge */}
              <Badge className="absolute top-3 left-3 bg-warning text-warning-foreground text-xs font-medium">
                New Launch
              </Badge>

              {/* Appreciation Badge */}
              <div className="absolute top-3 right-3 flex items-center gap-1 bg-success/90 text-success-foreground px-2 py-1 rounded-md text-xs font-medium">
                <TrendingUp className="w-3 h-3" />
                {project.appreciation}
              </div>
            </div>

            <CardContent className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold text-lg group-hover:text-purple-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground">by {project.builder}</p>
              </div>

              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{project.location}</span>
              </div>

              <div className="space-y-2">
                <div className="font-semibold text-purple-600 text-lg">
                  {project.priceRange}
                </div>
                
                <div className="flex items-center justify-between text-xs">
                  <Badge variant="outline" className="text-muted-foreground">
                    {project.reraId}
                  </Badge>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:opacity-90 text-white font-medium shadow-glow">
                View Number
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}