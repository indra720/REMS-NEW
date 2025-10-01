import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MapPin, Bed, Bath, Square, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react"; // Import useEffect
import { Link } from "react-router-dom";
import { useToast } from '../../hooks/use-toast'; // Import useToast
import { getWishlist, addToWishlist, removeFromWishlist } from '../../lib/api'; // Import api functions
import api from '../../lib/api';

interface PropertyCardProps {
  id: string;
  slug: string; // Added for navigation
  title: string;
  price: string;
  location: string;
  bedrooms: number; // Changed from beds
  bathrooms: number; // Changed from baths
  area_sqft: number; // Changed from area
  images: { image: string }[]; // Changed from image
  category: string | undefined; // Changed from type
  featured?: boolean;
  priceChange?: number;
  agentId:number;
}

const PropertyCard = ({ 
  id, 
  agentId,
  slug, 
  title, 
  price, 
  location, 
  bedrooms, 
  bathrooms, 
  area_sqft, 
  images, 
  category, 
  featured = false,
  priceChange 
}: PropertyCardProps) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const { toast } = useToast();
  const type = category?.toLowerCase() || '';
  const image = images[0]?.image || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500';

  useEffect(() => {
    const fetchWishlistStatus = async () => {
      // TODO: Replace with actual authentication check (e.g., from AuthContext)
      const isAuthenticated = true; 
      if (!isAuthenticated) {
        return;
      }

      try {
        const wishlistItems = await getWishlist();
        const isPropertyInWishlist = wishlistItems.some((item: any) => item.property.id === id);
        setIsFavorited(isPropertyInWishlist);
      } catch (error) {
        console.error("Failed to fetch wishlist status:", error);
        // Optionally, show a toast here if fetching initial status fails
      }
    };

    fetchWishlistStatus();
  }, [id]); // Re-run when property ID changes

  const handleFavoriteClick = async () => {
    // Placeholder for authentication check. In a real app, this would come from your auth context.
    const isAuthenticated = true; // TODO: Replace with actual authentication check (e.g., from AuthContext)

    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to add items to your wishlist.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (isFavorited) {
        // Remove from wishlist
        await removeFromWishlist(slug);
        setIsFavorited(false);
        toast({
          title: "Removed from Wishlist",
          description: `${title} has been removed from your wishlist.`,
        });
      } else {
        // Add to wishlist
        await addToWishlist(parseInt(id));
        setIsFavorited(true);
        toast({
          title: "Added to Wishlist",
          description: `${title} has been added to your wishlist.`,
        });
      }
    } catch (error) {
      console.error("Failed to update wishlist:", error);
      toast({
        title: "Error",
        description: "Failed to update wishlist. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="group hover:shadow-elegant transition-all duration-500 transform hover:-translate-y-3 overflow-hidden bg-gradient-to-br from-background to-secondary/20 border border-border/50 relative w-full sm:max-w-sm md:max-w-md">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Status Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {featured && (
            <Badge className="bg-gradient-hero text-white border-0 shadow-lg px-3 py-1 text-sm font-semibold group-hover:bg-purple-600  transition-all duration-200">
              Featured
            </Badge>
          )}
          <Badge
            variant={type === "sale" ? "default" : "secondary"}
            className={`border-0 shadow-md px-3 py-1 text-sm font-semibold ${
              type === "sale"
                ? "bg-background/90 text-black group-hover:text-white group-hover:bg-purple-600 transition-all duration-200"
                : "bg-accent"
            } ${
              type === "rent"
                ? "bg-purple-600 text-black group-hover:text-white group-hover:bg-purple-600 transition-all duration-200"
                : "bg-accent"
            }`}
          >
            For {type === "sale" ? "Sale" : "Rent"}
          </Badge>
        </div>

        {/* Price Change Badge */}
        {priceChange && (
          <div className="absolute top-4 right-16 ">
            <Badge 
              className={`${
                priceChange > 0 
                  ? "group-hover:bg-purple-600 bg-transparent  transition-all duration-200 text-white" 
                  : "bg-real-estate-warning text-white"
              } border-0 flex items-center gap-1  shadow-md px-3 py-1`}
            >
              <TrendingUp className="w-3 h-3 " />
              {priceChange > 0 ? "+" : ""}{priceChange}%
            </Badge>
          </div>
        )}

        {/* Heart Button */}
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-4 right-4 bg-background/90 hover:bg-background shadow-lg backdrop-blur-sm w-10 h-10 rounded-full border border-border/20 transition-all ${
            isFavorited ? "text-red-500" : "text-foreground"
          }`}
          onClick={handleFavoriteClick}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? "fill-current" : ""}`} />
        </Button>
         
        {/* Quick View Button - appears on hover */}
        {/* <div className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
          <Button className="w-full bg-background/95 text-foreground hover:bg-background backdrop-blur-sm border border-border/30">
            Quick View
          </Button>
        </div> */}
      </div>

      <CardContent className="p-6 space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-foreground group-hover:text-purple-600 transition-colors leading-tight">
              {title}
            </h3>
          </div>
          
          <div className="flex items-center text-muted-foreground">
            <MapPin className="w-4 h-4 mr-2 text-accent" />
            <span className="text-sm">{location}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <span className="text-3xl font-bold bg-gradient-hero bg-clip-text text-purple-500">
                ₹{parseFloat(price).toLocaleString('en-IN')}
              </span>
              {type === "rent" && <span className="text-sm font-normal text-muted-foreground">/month</span>}
            </div>
            {type === "sale" && (
              <div className="text-right text-sm text-muted-foreground">
                <div>Est. Monthly</div>
                <div className="font-semibold">₹{price ? Math.round(parseInt(price.replace(/[$,]/g, '')) * 0.004).toLocaleString('en-IN') : 'N/A'}</div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/30">
          <div className="text-center">
            <div className="text-lg font-bold text-foreground group-hover:text-purple-600  transition-all duration-200">{bedrooms}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide ">Bedrooms</div>
          </div>
          <div className="text-center border-l border-r border-border/30">
            <div className="text-lg font-bold text-foreground group-hover:text-purple-600  transition-all duration-200">{bathrooms}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide ">Bathrooms</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-foreground group-hover:text-purple-600  transition-all duration-200">{area_sqft}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide ">Sq Feet</div>
          </div>
        </div>

        <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3 pt-4">
          <Link to={`/property/${slug}`} className="flex-1">
            <Button variant="outline" className="w-full border-border/50 hover:bg-secondary/50 bg-purple-600 hover:bg-purple-600 text-white hover:text-white transition-colors">
              View Details
            </Button>
          </Link>
         <Link to={`/agent/${agentId}`}>
          <Button className="flex-1 w-full bg-purple-400 hover:bg-purple-600 text-white border-0 shadow-md hover:shadow-lg transition-all ">
            Contact Agent
          </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;