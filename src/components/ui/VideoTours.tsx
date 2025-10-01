import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, X, Clock, MapPin, DollarSign, IndianRupee } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/use-toast";

import videoCabin from "@/Video/cabin.mp4";
import videoEstate from "@/Video/estate.mp4";
import videoApartment from "@/Video/apartment.mp4";
import videoPenthouse from "@/Video/Penthouse.mp4";
import videoVilla from "@/Video/villa.mp4";

const videos = [videoCabin, videoEstate, videoApartment, videoPenthouse, videoVilla];

const VideoPlayerModal = ({ videoUrl, onClose }) => {
  if (!videoUrl) return null;
  console.log("Video URL in modal:", videoUrl);

  // Create an absolute URL from the relative path
  const absoluteVideoUrl = new URL(videoUrl, window.location.origin).href;
  console.log("Absolute Video URL:", absoluteVideoUrl);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="relative w-[calc(100%-40px)] lg:w-full  max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-8 right-0 text-white"
        >
          <X size={32} />
        </button>
        <video controls autoPlay className="w-full h-full rounded-lg">
          <source src={absoluteVideoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

const VideoTours = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const navigate = useNavigate();

  const staticVideoData = [
    {
      id: 1,
      title: "Luxurious Cabin in the Woods",
      slug: "luxurious-cabin-in-the-woods",
      images: [{ image: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=500" }],
      location: "Aspen, Colorado",
      price: "2,500,000",
      description: "A stunning cabin with modern amenities, nestled in the heart of the mountains.",
      property_status: "For Sale",
      bedrooms: 4,
      bathrooms: 3,
      area_sqft: "3,200",
      listed_on: "2025-09-28",
      duration: "2:30",
    },
    {
      id: 2,
      title: "Modern Estate with Ocean View",
      slug: "modern-estate-with-ocean-view",
      images: [{ image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500" }],
      location: "Malibu, California",
      price: "12,500,000",
      description: "Experience coastal living at its finest in this breathtaking modern estate.",
      property_status: "For Sale",
      bedrooms: 6,
      bathrooms: 8,
      area_sqft: "10,500",
      listed_on: "2025-09-25",
      duration: "4:15",
    },
    {
      id: 3,
      title: "Downtown Apartment with a View",
      slug: "downtown-apartment-with-a-view",
      images: [{ image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500" }],
      location: "New York, New York",
      price: "4,800,000",
      description: "A chic and stylish apartment in the heart of the city, with panoramic views.",
      property_status: "For Sale",
      bedrooms: 2,
      bathrooms: 2,
      area_sqft: "1,800",
      listed_on: "2025-09-22",
      duration: "3:05",
    },
      {
      id: 4,
      title: "Spacious Penthouse with Rooftop Pool",
      slug: "spacious-penthouse-with-rooftop-pool",
      images: [{ image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=500" }],
      location: "Miami, Florida",
      price: "8,900,000",
      description: "The ultimate in luxury living, this penthouse boasts a private rooftop pool and stunning city views.",
      property_status: "For Sale",
      bedrooms: 5,
      bathrooms: 6,
      area_sqft: "6,000",
      listed_on: "2025-09-20",
      duration: "5:20",
    },
  ];

  // Get featured property (first property from static data)
  const featuredProperty = staticVideoData.length > 0 ? staticVideoData[0] : null;

  const handleDetailsNavigation = (slug, videoUrl) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/login");
    } else {
      navigate(`/property/${slug}`, {
        state: { videoUrl },
      });
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-background via-primary/5 to-background relative overflow-hidden">
      <VideoPlayerModal
        videoUrl={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
      {/* Background Effects */}
      <div className="absolute top-32 left-16 w-32 h-32 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-32 right-16 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1.5s" }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <span className="bg-gradient-hero bg-clip-text text-purple-500 text-lg font-bold tracking-wider uppercase">
              Immersive Experience
            </span>
          </div>
          <h2 className="text-5xl md:text-5xl font-bold mb-6 text-foreground leading-tight">
            Virtual Property
            <span className="ml-3 bg-gradient-hero bg-clip-text text-purple-700 mt-3">
              Tours & Videos
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Experience properties like never before with our immersive virtual
            tours, 360° walkthroughs, and professional video showcases
          </p>
        </div>

        {/* Featured Video - Now using fetched data */}
        {featuredProperty && (
          <div className="mb-16">
            <Card className="overflow-hidden bg-gradient-to-br from-background to-secondary/20 border border-border/50 shadow-elegant">
              <div className="grid lg:grid-cols-2 gap-8 p-2 sm:p-8">
                <div
                  className="relative group cursor-pointer"
                  onClick={() => setSelectedVideo(videos[0])}
                >
                  <img
                    src={
                      featuredProperty.images?.[0]?.image ||
                      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500"
                    }
                    alt={featuredProperty.title}
                    className="w-full h-48 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 rounded-2xl flex items-center justify-center group-hover:bg-black/20 transition-colors duration-300">
                    <Button
                      size="sm"
                      className="bg-white/90 text-purple-600 hover:bg-white rounded-full px-6 py-8 sm:px-8 sm:py-10 shadow-glow hover:scale-110 transition-all duration-300"
                    >
                      <Play className="w-4 h-4 sm:w-8 sm:h-8" />
                    </Button>
                  </div>
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-gradient-hero text-white border-0 shadow-lg">
                      Featured
                    </Badge>
                    <Badge className="bg-background/90 text-foreground border-0 shadow-md">
                      {featuredProperty.property_status}
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-col justify-center space-y-6">
                  <div>
                    <h3 className="text-3xl font-bold text-foreground mb-4">
                      {featuredProperty.title}
                    </h3>
                    <div className="flex items-center text-muted-foreground mb-6">
                      <MapPin className="w-5 h-5 mr-2 text-accent" />
                      <span className="text-lg">
                        {featuredProperty.location}
                      </span>
                    </div>
                    <div className="flex items-center text-purple-600 text-2xl font-bold mb-4">
                     <IndianRupee/>
                      {featuredProperty.price}
                    </div>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {featuredProperty.description ||
                        "Step inside this magnificent property with our exclusive virtual tour. Experience luxury living with premium finishes and world-class amenities."}
                    </p>
                  </div>

                  <div className=" sm:flex sm:gap-4 ">
                    <Button
                      onClick={() => setSelectedVideo(videos[0])}
                      size="lg"
                      className="bg-gradient-hero w-full mb-2 hover:bg-purple-600 bg-purple-600 text-white border-0 shadow-glow hover:shadow-elegant transition-all duration-300"
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Watch Tour
                    </Button>
                    <Button
                      onClick={() => handleDetailsNavigation(featuredProperty.slug, videos[0])}
                      variant="outline"
                      size="lg"
                      className="border-border/50 w-full hover:bg-purple-600 hover:text-white"
                    >
                      Property Details
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Video Grid - Using remaining properties (excluding the featured one) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {staticVideoData.slice(0, 3).map((video, index) => (
            <Card
              key={video.id}
              className="group hover:shadow-elegant transition-all duration-500 transform hover:-translate-y-3 overflow-hidden bg-gradient-to-br from-background to-secondary/20 border border-border/50 cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative">
                <img
                  src={
                    video.images?.[0]?.image ||
                    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500"
                  }
                  alt={video.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Play Overlay */}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/20 transition-colors duration-300">
                  <Button
                    size="lg"
                    className="bg-white/90 text-purple-600 hover:bg-white rounded-full w-16 h-16 p-0 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                    onClick={() => setSelectedVideo(videos[(index + 1) % videos.length])}
                  >
                    <Play className="w-6 h-6" />
                  </Button>
                </div>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <Badge className="bg-background/90 text-foreground border-0 shadow-md text-xs group-hover:bg-purple-600 group-hover:text-white">
                    {video.property_status}
                  </Badge>
                </div>

                {/* Duration and Views */}
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <Badge className="bg-black/70 text-white border-0 text-xs group-hover:bg-purple-600">
                    <Clock className="w-3 h-3 mr-1" />
                    {video.duration || "3:45"}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-lg sm:font-bold text-foreground mb-2  transition-colors line-clamp-2 group-hover:text-purple-600">
                  {video.title}
                </h3>

                <div className="flex items-center justify-between text-muted-foreground mb-4">
                  <span className="text-sm truncate flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-purple-500 flex-shrink-0" />
                    {video.location}
                  </span>
                  <span>
                    {video.listed_on
                      ? new Date(video.listed_on).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4 text-center text-sm">
                  <div>
                    <div className="font-bold text-foreground group-hover:text-purple-600">
                      {video.bedrooms}
                    </div>
                    <div className="text-muted-foreground">Beds</div>
                  </div>
                  <div>
                    <div className="font-bold text-foreground group-hover:text-purple-600">
                      {video.bathrooms}
                    </div>
                    <div className="text-muted-foreground">Baths</div>
                  </div>
                  <div>
                    <div className="font-bold text-foreground group-hover:text-purple-600">
                      {video.area_sqft}
                    </div>
                    <div className="text-muted-foreground">Area</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-purple-600 text-xl font-bold">
                    <span className="flex justify-center items-center">
                      <IndianRupee/>
                      {video.price}
                    </span>
                  </div>

                  <Button
                    onClick={() =>
                      setSelectedVideo(videos[(index + 1) % videos.length])
                    }
                    size="sm"
                    variant="ghost"
                    className="text-purple-500 hover:bg-purple-600 hover:text-white "
                  >
                    Watch Now →
                  </Button>
                </div>
                <div className="flex gap-3 my-3">
                  <Button
                    className="flex-1 bg-transparent text-black font-semibold text-md hover:text-white border-2 hover:bg-purple-600"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDetailsNavigation(video.slug, videos[(index + 1) % videos.length]);
                    }}
                  >
                    View Details
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-gradient-hero bg-purple-400 hover:bg-purple-600 text-white border-0"
                    onClick={() => navigate("/contact")}
                  >
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoTours;
