import {
  Heart,
  MapPin,
  Home,
  Car,
  Wifi,
  Shield,
  Camera,
  Eye,
  Star,
  Bed,
  Bath,
  Square,
  ChevronLeft,
  ChevronRight,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

interface PropertyCardProps {
  id: string;
  slug: string;
  image?: string; // Keep for backward compatibility
  images?: Array<{
    id: number;
    image: string;
    caption: string;
    is_primary: boolean;
  }>; // Add support for API image structure
  title: string;
  builder: string;
  location: string;
  bhkOptions: { bhk: string; price: string }[];
  description: string;
  badges: string[];
  ribbon: string;
  amenities: string[];
  isWishlisted?: boolean;
  onWishlistToggle?: (id: string) => void;
  isProfileView?: boolean;
  // Additional props
  price?: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: string;
  views?: number;
  rating?: number;
  tags?: string[];
  featured?: boolean;
  layout?: 'grid' | 'list';
  // New props for category and date
  category?: string;
  property_status?: string;
  listed_on?: string;
  created_at?: string;
}

const amenityIcons: { [key: string]: any } = {
  Parking: Car,
  Wifi: Wifi,
  Security: Shield,
  Camera: Camera,
};

export function PropertyCard({
  id,
  slug,
  image,
  images = [], // Add images prop
  title,
  builder,
  location,
  bhkOptions = [],
  description,
  badges = [],
  ribbon,
  bedrooms,
  bathrooms,
  amenities = [],
  isWishlisted = false,
  onWishlistToggle,
  isProfileView = false,
  price,
  area,
  views,
  rating,
  tags = [],
  featured = false,
  layout = 'list', // Default to list view
  // New props
  category,
  property_status,
  listed_on,
  created_at,
}: PropertyCardProps) {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get images array, prioritizing API images over single image
  const displayImages = images.length > 0 
    ? images.map(img => img.image)
    : image 
    ? [image] 
    : ['https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500'];

  const currentImage = displayImages[currentImageIndex];

  const handleContactOwner = (propertyId: string) => {
    toast.info("Connecting to Owner: Opening contact options...");
  };

  const handleViewDetails = () => { 
    navigate(`/property/${slug}`);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  return (
    <Card className="first-card  group overflow-hidden bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-300 border-border/50 h-full sm:m-0 mr-4">
      <div className={`flex ${layout === 'grid' || isProfileView ? 'flex-col' : 'flex-col md:flex-row'} h-full`}>
        {/* Image Section with Carousel */}
        <div
          className={`relative overflow-hidden ${
            layout === 'grid' || isProfileView
              ? 'w-full h-48'
              : 'w-full md:w-64 h-64 md:h-auto'
          }`}>
          <img
            src={currentImage}
            alt={`${title} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500';
            }}
          />
          {/* Image Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Image Navigation */}
          {displayImages.length > 1 && (
            <>
              <Button
                size="icon"
                variant="ghost"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white"
                onClick={prevImage}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white"
                onClick={nextImage}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
              
              {/* Image Indicators */}
              <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex gap-1">
                {displayImages.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Badges Overlay */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {featured && (
              <Badge className="bg-accent text-accent-foreground text-xs font-medium px-2 py-1">
                ⭐ Featured
              </Badge>
            )}

            {badges.map((badge, index) => (
              <Badge
                key={index}
                className="bg-success text-success-foreground text-xs font-medium px-2 py-1"
              >
                {badge}
              </Badge>
            ))}
          </div>

          {/* Views and Rating */}
          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            {views && (
              <div className="flex items-center text-white bg-purple-600/80 px-2 py-1 rounded text-xs">
                <Eye className="h-3 w-3 mr-1" />
                {views}
              </div>
            )}
            {rating && (
              <div className="flex items-center text-white bg-[#7f23cf] px-2 py-1 rounded text-xs">
                <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                {Number(rating).toFixed(1)}
              </div>
            )}
          </div>

          {/* Wishlist Button */}
          <Button
            size="icon"
            variant="ghost"
            className={`absolute top-3 right-3 w-8 h-8 backdrop-blur-sm ${
              isWishlisted
                ? "bg-destructive/90 text-white hover:bg-destructive"
                : "bg-background/80 hover:bg-background"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onWishlistToggle && onWishlistToggle(id);
            }}
          >
            <Heart
              className={`w-4 h-4 ${
                isWishlisted ? "fill-current" : ""
              }`}
            />
          </Button>
          {/* Category Badge */}
          {(category || property_status) && (
            <div className="absolute top-2 left-2 z-10">
              <Badge className={`text-xs font-medium ${
                (category || property_status)?.toLowerCase() === "rent" 
                  ? "bg-blue-500 text-white" 
                  : (category || property_status)?.toLowerCase() === "sale" || (category || property_status)?.toLowerCase() === "buy"
                  ? "bg-green-500 text-white"
                  : "bg-purple-500 text-white"
              }`}>
                {category || property_status}
              </Badge>
            </div>
          )}


          {/* Ribbon */}
          {ribbon && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-xs font-medium py-2 px-3">
              {ribbon}
            </div>
          )}
        </div>

        {/* Content Section - Rest remains the same */}
        <CardContent className="flex-1 p-6 flex flex-col group-hover:bg-secondary/10 transition-colors duration-300">
          <div className="flex-grow space-y-4">
            {/* Title */}
            <div>
              <h3 className="font-semibold text-lg text-foreground text-[#7f23cf] transition-colors">
                {title}
              </h3>
            </div>

            {/* Price, Location, Date Listed, Property Details Group */}
            <div className="space-y-3">
              {/* Price & Builder */}
              <div className="flex items-baseline justify-between gap-4">
                {price && (
                  <div className="text-2xl font-bold text-primary text-[#7f23cf]">{price}</div>
                )}
                {builder && (
                  <p className="text-sm text-muted-foreground">by {builder}</p>
                )}
              </div>

              {/* Location & Date Listed */}
              <div className={`flex ${layout === 'grid' ? 'flex-col gap-1' : 'items-center gap-4'}`}>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{location}</span>
                </div>
                {(listed_on || created_at) && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>Listed: {new Date(listed_on || created_at).toLocaleDateString()}</span>
                  </div>
                )}
              </div>

              {/* Property Details (Bedrooms, Bathrooms, Area) */}
              {(bedrooms || bathrooms || area) && (
                <div className="flex justify-between text-sm text-muted-foreground">
                  {bedrooms && (
                    <span className="flex items-center">
                      <Bed className="h-3 w-3 mr-1" />
                      {bedrooms} Bed
                    </span>
                  )}
                  {bathrooms && (
                    <span className="flex items-center">
                      <Bath className="h-3 w-3 mr-1" />
                      {bathrooms} Bath
                    </span>
                  )}
                  {area && (
                    <span className="flex items-center">
                      <Square className="h-3 w-3 mr-1" />
                      {area}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* BHK Options */}
            {bhkOptions && bhkOptions.length > 0 && (
              <div className="grid grid-cols-2 gap-3">
                {bhkOptions.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border/30"
                  >
                    <div className="flex items-center gap-2">
                      <Home className="w-4 h-4 text-purple-600" />
                      <span className="font-medium text-sm">
                        {option.bhk}
                      </span>
                    </div>
                    <span className="font-semibold text-sm text-purple-600">
                      ₹{option.price}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Description */}
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>

            {/* Amenities */}
            {amenities && amenities.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {amenities.slice(0, 4).map((amenityItem, index) => {
                  const amenityName =
                    typeof amenityItem === "string"
                      ? amenityItem
                      : (amenityItem as any).amenity ||
                        (amenityItem as any).name ||
                        amenityItem;
                  const IconComponent = amenityIcons[amenityName];

                  return (
                    <div
                      key={index}
                      className="flex items-center gap-1 px-2 py-1 rounded-md bg-purple-600/10 text-purple-600 text-xs"
                    >
                      {IconComponent && <IconComponent className="w-3 h-3" />}
                      <span className="text-[#7f23cf]">{amenityName}</span>
                    </div>
                  );
                })}

                {amenities.length > 4 && (
                  <div className="flex items-center px-2 py-1 rounded-md bg-muted text-muted-foreground text-xs">
                    +{amenities.length - 4} more
                  </div>
                )}
              </div>
            )}

            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {tags.map((tag: string, index: number) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="mt-auto pt-4">
            {/* CTA Buttons */}
            {isProfileView ? (
              <div className="grid grid-cols-2 gap-3">
                <Button
                  className="bg-purple-400 hover:bg-purple-600 text-white font-medium shadow-glow text-xs"
                  onClick={handleViewDetails}
                >
                  View Details
                </Button>
                <Button
                  className="text-[#7f23cf] bg-transparent border hover:bg-purple-600 hover:text-white font-medium text-xs"
                  onClick={() => handleContactOwner(id)}
                >
                  Contact Owner
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <Button
                  className="bg-purple-400 hover:bg-purple-600  text-white font-medium shadow-glow text-xs"
                  onClick={handleViewDetails}
                >
                  View Details
                </Button>
                <Button
                  className="text-[#7f23cf] bg-transparent border hover:bg-purple-600 hover:text-white font-medium text-xs"
                  onClick={() => handleContactOwner(id)}
                >
                  Contact Owner
                </Button>
                <Button
                  variant="secondary"
                  className="bg-secondary hover:bg-secondary/80 font-medium text-xs"
                >
                  Brochure
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </div>
    </Card>
  );
}