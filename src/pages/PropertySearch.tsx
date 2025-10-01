import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useSearch } from "@/context/SearchContext";
import { toast } from "react-toastify";
import {
  Plus,
  MapPin,
  Bed,
  Bath,
  Square,
  Heart,
  Star,
  Search,
  Camera,
} from "lucide-react";
import { Input } from "@/components/ui/input";

const PropertySearch = ({ onFilterChange }) => {
  const navigate = useNavigate();
  const { searchParams, setSearchParams } = useSearch();
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const [viewMode, setViewMode] = useState("grid");
  const [favorites, setFavorites] = useState([]);
  const [sortBy, setSortBy] = useState("relevance");
  const [propertyType, setPropertyType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const [originalProperties, setOriginalProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);

  const [propertyImages, setPropertyImages] = useState({});
  const [localSearchTerm, setLocalSearchTerm] = useState(
    searchParams.keyword || ""
  );

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);

  // Effect to fetch properties from the backend based on context
  useEffect(() => {
    const fetchProperties = async () => {
      const token = localStorage.getItem("access_token");
      const url = new URL("http://127.0.0.1:8000/api/properties/");

      if (searchParams.keyword) {
        url.searchParams.append("search", searchParams.keyword);
      }
      if (searchParams.propertyType && searchParams.propertyType !== "all") {
        url.searchParams.append("property_type", searchParams.propertyType);
      }

      try {
        const response = await fetch(url.toString(), {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok)
          throw new Error(`Failed to fetch: ${response.status}`);

        const data = await response.json();
        const propertiesList =
          data?.results || (Array.isArray(data) ? data : []);
        setOriginalProperties(propertiesList);
        setFilteredProperties(propertiesList); // Initially set both lists
      } catch (error) {
        console.error("Error fetching properties:", error);
        toast({ title: "Error", description: "Could not fetch properties." });
        setOriginalProperties([]);
        setFilteredProperties([]);
      }
    };

    fetchProperties();
  }, [searchParams]);

  // Effect to generate suggestions as user types
  useEffect(() => {
    if (localSearchTerm.length > 1) {
      const lowercasedTerm = localSearchTerm.toLowerCase();
      const suggestionSet = new Set<string>();
      originalProperties.forEach((prop) => {
        if (prop.title?.toLowerCase().includes(lowercasedTerm))
          suggestionSet.add(prop.title);
        if (prop.location?.toLowerCase().includes(lowercasedTerm))
          suggestionSet.add(prop.location);
      });
      setSuggestions(Array.from(suggestionSet).slice(0, 5));
      setIsSuggestionsOpen(true);
    } else {
      setSuggestions([]);
      setIsSuggestionsOpen(false);
    }
  }, [localSearchTerm, originalProperties]);

  // On-demand search/filter function
  const handleSearch = () => {
    setIsSuggestionsOpen(false);
    const lowercasedTerm = localSearchTerm.toLowerCase();
    const filtered = originalProperties.filter((property) => {
      if (lowercasedTerm === "") return true;
      return (
        property.title?.toLowerCase().includes(lowercasedTerm) ||
        property.location?.toLowerCase().includes(lowercasedTerm) ||
        property.address?.toLowerCase().includes(lowercasedTerm) ||
        property.builder?.toLowerCase().includes(lowercasedTerm)
      );
    });
    setFilteredProperties(sortProperties(filtered, sortBy));
  };

  const handleSuggestionClick = (suggestion: string) => {
    setLocalSearchTerm(suggestion);
    setIsSuggestionsOpen(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSuggestionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const sortProperties = (properties, sortType) => {
    const sorted = [...properties];
    switch (sortType) {
      case "price-low":
        return sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      case "price-high":
        return sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      case "newest":
        return sorted.sort(
          (a, b) =>
            new Date(b.listed_on).getTime() - new Date(a.listed_on).getTime()
        );
      default:
        return sorted.sort(
          (a, b) =>
            (b.ai_recommended_score || 0) - (a.ai_recommended_score || 0)
        );
    }
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    const sorted = sortProperties(filteredProperties, value);
    setFilteredProperties(sorted);
    if (onFilterChange) {
      onFilterChange((prevState) => ({ ...prevState, sortBy: value }));
    }
  };

  const getPropertyImageURL = (property) => {
    // ... (function is unchanged)
    return "/placeholder.svg";
  };

  const toggleFavorite = (e, propertySlug) => {
    // ... (function is unchanged)
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">
            Find Your Perfect Property
          </h2>
          <p className="text-muted-foreground mb-4">
            Search across thousands of listings with advanced filters.
          </p>
          <div
            className="max-w-lg mx-auto flex items-center gap-2"
            ref={searchContainerRef}
          >
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Type to see suggestions..."
                value={localSearchTerm}
                onChange={(e) => setLocalSearchTerm(e.target.value)}
                onFocus={() => setIsSuggestionsOpen(true)}
                onKeyPress={handleKeyPress}
                className="pl-10 w-full"
                autoComplete="off"
              />
              {isSuggestionsOpen && suggestions.length > 0 && (
                <Card className="absolute top-full mt-2 w-full z-50 shadow-lg bg-background border">
                  <CardContent className="p-2">
                    {suggestions.map((s, index) => (
                      <div
                        key={index}
                        className="p-2 hover:bg-muted rounded-md cursor-pointer"
                        onClick={() => handleSuggestionClick(s)}
                      >
                        {s}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>
            <Button
              onClick={handleSearch}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="space-y-6">
          {/* <div className="sm:flex  justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Search Results</h2>
              <p className="text-muted-foreground">{filteredProperties.length} properties found</p>
            </div>
            <div className="flex items-center gap-4">
              <Button onClick={() => navigate("/add-property")} className="bg-purple-600 hover:bg-purple-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add Property
              </Button>
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex border rounded-lg">
                <Button className={viewMode === 'grid' ? 'bg-purple-600 text-white' : 'bg-transparent text-foreground'} size="sm" onClick={() => setViewMode("grid")}>Grid</Button>
                <Button className={viewMode === 'list' ? 'bg-purple-600 text-white' : 'bg-transparent text-foreground'} size="sm" onClick={() => setViewMode("list")}>List</Button>
              </div>
            </div>
          </div> */}

          <div className="sm:flex  justify-between items-center gap-20 md:gap-2 mb-6">
            <div className="flex flex-col justify-center items-center mb-5">
              <h2 className="text-2xl font-bold">Search Results</h2>
              <p className="text-muted-foreground">
                {filteredProperties.length} properties found
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 flex-nowrap md:flex-wrap">
              <Button
                onClick={() => navigate("/add-property")}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2 " />
                Add<span className="hidden sm:inline"> Property</span>
              </Button>
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex border rounded-lg">
                <Button
                  className={
                    viewMode === "grid"
                      ? "bg-purple-600 text-white"
                      : "bg-transparent text-foreground"
                  }
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  Grid
                </Button>
                <Button
                  className={
                    viewMode === "list"
                      ? "bg-purple-600 text-white"
                      : "bg-transparent text-foreground"
                  }
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  List
                </Button>
              </div>

              {/* <div className="lg:hidden  flex justify-self-end">
                <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="w-full max-w-xs p-0 overflow-y-auto z-[101] pt-16">
                    <FilterSidebar
                      onFilterChange={(filters) => {
                        handleSidebarFilterChange(filters);
                        // setSidebarOpen(false); // Close sidebar on apply
                      }}
                      properties={properties}
                      className="border-none shadow-none h-auto"
                    />
                  </SheetContent>
                </Sheet>
              </div> */}
            </div>
          </div>

          {filteredProperties.length > 0 ? (
            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {filteredProperties.slice(0,3).map((property) => (
                <Card
                  key={property.slug}
                  className="cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden border-border/50 hover:border-purple-600/20 group"
                >
                  <div className="relative h-56">
                    {property.images && property.images.length > 0 ? (
                      <>
                        <img
                          src={property.images[0].image}
                          alt={property.title}
                          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <Badge
                          className={`absolute z-50 top-3 left-3 ${
                            property.category?.toLowerCase().trim() === "rent"
                              ? "bg-green-500 text-white"
                              : "bg-yellow-500 text-black"
                          }`}
                        >
                          {property.category}
                        </Badge>
                       
                      </>
                    ) : (
                      <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                        <Camera className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent"></div>
                    <Badge className="absolute top-3 left-3 bg-purple-600 text-white">
                      {property.category}
                    </Badge>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute top-3 right-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
                      onClick={(e) => toggleFavorite(e, property.slug)}
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          favorites.includes(property.slug)
                            ? "fill-red-500 text-red-500"
                            : ""
                        }`}
                      />
                    </Button>
                    <div className="absolute bottom-0 left-0 p-4 text-white">
                      <h3 className="text-xl font-bold truncate">
                        {property.title}
                      </h3>
                      <p className="text-sm flex items-center">
                        <MapPin className="h-4 w-4 mr-1.5" />{" "}
                        {property.location}
                      </p>
                    </div>
                  </div>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <p className="text-2xl font-extrabold text-purple-600">
                        ₹{parseFloat(property.price).toLocaleString("en-IN")}
                      </p>
                      <div className="flex items-center gap-1 text-sm font-semibold">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <span>
                          {property.ai_recommended_score
                            ? (property.ai_recommended_score * 5).toFixed(1)
                            : "N/A"}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-around items-center text-center border-t border-b py-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Bed className="h-5 w-5 text-purple-500" />
                        <span>{property.bedrooms} Beds</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Bath className="h-5 w-5 text-purple-500" />
                        <span>{property.bathrooms} Baths</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Square className="h-5 w-5 text-purple-500" />
                        <span>{property.area_sqft} sqft</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(property.tags || []).slice(0, 4).map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="sm:flex justify-center gap-10 space-y-2 items-center ">
                      <button
                        onClick={() => navigate(`/property/${property.slug}`)}
                        className="border py-3 px-8 w-full sm:w-30 bg-white hover:bg-purple-600 hover:text-white font-semibold  rounded-md "
                      >
                        View Details
                      </button>
                      <button className="border py-3 px-10 w-full sm:w-30 bg-purple-400 hover:bg-purple-600 text-white font-semibold  rounded-md ">
                        Contact
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground">
                No properties found. Try adjusting your search.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertySearch;
