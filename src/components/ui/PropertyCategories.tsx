import { Card, CardContent } from "@/components/ui/card";
import { faHouse, faBuilding, faMapMarkerAlt, faStore, faIndustry, faTree, faMountain, faWarehouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface PropertyCategoriesProps {
  onCategorySelect: (category: string) => void;
}

interface PropertyStat {
  property_type__name: string;
  total_properties: number;
}

const PropertyCategories: React.FC<PropertyCategoriesProps> = ({ onCategorySelect }) => {
  const navigate = useNavigate();
  const [propertyStats, setPropertyStats] = useState<PropertyStat[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/properties/stats/property-type/');
        const data = await response.json();
        setPropertyStats(data);
      } catch (error) {
        console.error('Error fetching property stats:', error);
      }
    };

    fetchStats();
  }, []);

  const handleCategorySelect = (category: string) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/login");
    } else {
      onCategorySelect(category);
    }
  };

  const categories = [
    {
      icon: faHouse,
      title: "Houses",
      hoverColor: "hover:bg-purple-600/20"
    },
    {
      icon: faBuilding,
      title: "Apartments",
      color: "text-accent",
      bgColor: "bg-accent/10",
      hoverColor: "hover:bg-accent/20"
    },
    {
      icon: faMapMarkerAlt,
      title: "Plots",
      color: "text-real-estate-success",
      bgColor: "bg-real-estate-success/10",
      hoverColor: "hover:bg-real-estate-success/20"
    },
    {
      icon: faStore,
      title: "Commercial",
      hoverColor: "hover:bg-purple-600/20"
    },
    {
      icon: faIndustry,
      title: "Retail",
      color: "text-real-estate-warning",
      bgColor: "bg-real-estate-warning/10",
      hoverColor: "hover:bg-real-estate-warning/20"
    },
    {
      icon: faBuilding,
      title: "Penthouse",
      color: "text-accent",
      bgColor: "bg-accent/10",
      hoverColor: "hover:bg-accent/20"
    },
    {
      icon: faMountain,
      title: "Vacation",
      color: "text-purple-600",
      bgColor: "bg-purple-600/10",
      hoverColor: "hover:bg-purple-600/20"
    },
    {
      icon: faWarehouse,
      title: "Villa",
      color: "text-real-estate-success",
      bgColor: "bg-real-estate-success/10",
      hoverColor: "hover:bg-real-estate-success/20"
    },
    {
      icon: faIndustry,
      title: "Industrial",
      color: "text-purple-600",
      bgColor: "bg-purple-600/10",
      hoverColor: "hover:bg-purple-600/20"
    }
  ].map(category => {
    const stat = propertyStats.find(s => {
      const apiName = s.property_type__name.toLowerCase();
      const categoryName = category.title.toLowerCase();
      return apiName === categoryName || apiName === categoryName.slice(0, -1) || `${apiName}s` === categoryName;
    });
    return {
      ...category,
      count: stat ? `${stat.total_properties}+` : '0+'
    };
  });

  return (
    <section className="py-0 bg-gradient-to-br from-background via-secondary/5 to-background relative overflow-hidden mt-5">
      {/* Background Elements */}
      <div className="absolute top-10 left-1/4 w-32 h-32 bg-purple-600/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-1/4 w-40 h-40 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Explore by 
            <span className="bg-gradient-hero bg-clip-text  text-purple-600 "> Property Type</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover your perfect property from our diverse collection of real estate options
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9 gap-6">
          {categories.map((category, index) => (
            <Card 
              key={index}
              onClick={() => handleCategorySelect(category.title)}
              className={`group cursor-pointer hover:shadow-elegant transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-background to-secondary/20 border border-border/30 animate-fade-in ${category.hoverColor}`}
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 rounded-full ${category.bgColor} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 ${category.color}`}>
                  <FontAwesomeIcon icon={category.icon}  size="2x" beat={category.title === "Houses"}
                  fade={category.title === "Apartments"} 
                  bounce={category.title === "Plots"}
                  shake={category.title === "Commercial"}
                  spin={category.title === "Retail"}
                  pulse={category.title === "PentHouse"}
                  flip={category.title === "Vacation"}
                  beatFade={category.title === "Villa"}
                  spinPulse={category.title === "Industrial"}  
                  />
                </div>
                <h3 className="font-semibold text-foreground mb-1 group-hover:text-purple-600 transition-colors">
                  {category.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {category.count}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyCategories;