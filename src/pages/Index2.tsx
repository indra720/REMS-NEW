import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "react-toastify";
import {
  Search,
  Filter,
  MapPin,
  Bed,
  Bath,
  Square,
  Heart,
  Eye,
  Star,
  Mic,
  Plus,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { FilterSidebar } from "./FilterSidebar";
import { PropertyCard } from "./PropertyCard";
import { useNavigate, useLocation } from "react-router-dom";
import { getWishlist, addToWishlist, removeFromWishlist, WishlistItem } from "@/lib/api";
import { TopDest, destinations } from "@/components/ui/top_dest";
import { jwtDecode } from "jwt-decode";
import { useSearch } from '../context/SearchContext';

const propertyTypesForSelect = [
  { id: "apartment", label: "Apartment" },
  { id: "villa", label: "Villa" },
  { id: "plot", label: "Plot" },
  { id: "commercial", label: "Commercial" },
];

export const Index2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { searchResults } = useSearch(); // Use searchResults from context
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState("list");
  const [sortBy, setSortBy] = useState("relevance");

  // Top bar states
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Property states
  const [filteredProperties, setFilteredProperties] = useState<any[]>([]);

  // Sidebar state
  const [sidebarFilters, setSidebarFilters] = useState<any>(null);

  const [cityCounts, setCityCounts] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(false);

  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [wishlistedPropertyIds, setWishlistedPropertyIds] = useState<Set<string>>(new Set());

  const getCurrentUserId = (): string | null => {
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        const decoded: { user_id: string } = jwtDecode(token);
        return decoded.user_id;
      } catch (error) {
        console.error("Failed to decode token:", error);
        return null;
      }
    }
    return null;
  };

  // Remove local fetchProperties function
  // useEffect(() => {
  //   const searchParams = new URLSearchParams(location.search);
  //   const city = searchParams.get("city");
  //   if (city) {
  //     setSelectedCity(city);
  //   }
  //   const category = searchParams.get("category");
  //   if (category) {
  //     setSelectedCategory(category);
  //   }
  // }, [location]);

  // useEffect(() => {
  //   fetchProperties();
  // }, [location.search]);

  useEffect(() => {
    const fetchWishlist = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        return;
      }
      try {
        const wishlistData = await getWishlist();
        setWishlist(wishlistData);
        const wishlistedIds = new Set(
          wishlistData.map((item) => item.property.id.toString())
        );
        setWishlistedPropertyIds(wishlistedIds);
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
      }
    };

    fetchWishlist();

    const handleFocus = () => {
      fetchWishlist();
    };

    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        fetchWishlist();
      }
    };

    window.addEventListener("focus", handleFocus);
    window.addEventListener("pageshow", handlePageShow);
    
    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  const handleSidebarFilterChange = (filters: any) => {
    setSidebarFilters(filters);
  };

  useEffect(() => {
    if (searchResults.length > 0) { // Use searchResults here
      const counts: { [key: string]: number } = {};
      destinations.forEach(dest => {
        const cityName = dest.name.toUpperCase();
        const count = searchResults.filter(p => 
          p.location?.toUpperCase().includes(cityName)
        ).length;
        counts[cityName] = count;
      });
      setCityCounts(counts);
      console.log("Calculated City Counts (Index2.tsx):", counts); // Added console.log for debugging
    }
  }, [searchResults]); // Depend on searchResults

  const handleCitySelect = (city: string) => {
    navigate(`/search?city=${city}`);
  };

  // Master useEffect for all filtering
  useEffect(() => {
    let filtered = [...searchResults]; // Start with searchResults from context

    // Get search parameters from URL for filtering
    const searchParams = new URLSearchParams(location.search);
    const urlSearchQuery = searchParams.get("q");
    const urlSearchType = searchParams.get("type");
    const urlSearchTab = searchParams.get("tab");

    // Apply URL-based search filters first
    if (urlSearchQuery) {
      const query = urlSearchQuery.toLowerCase();
      filtered = filtered.filter((p) => {
        const title = (p.title || "").toLowerCase();
        const location = (p.location || "").toLowerCase();
        const description = (p.description || "").toLowerCase();
        
        return title.includes(query) || location.includes(query) || description.includes(query);
      });
    }

    if (urlSearchTab) {
      // ... (filtering logic from before)
    }

    if (urlSearchType && urlSearchType !== "all-residential") {
      // ... (filtering logic from before)
    }

    if (selectedCity) {
      filtered = filtered.filter((p) =>
        (p.location || "").toLowerCase().includes(selectedCity.toLowerCase())
      );
    }

    if (selectedCategory) {
      const lowercasedCategory = selectedCategory.toLowerCase();
      const singularCategory = lowercasedCategory.endsWith("s")
        ? lowercasedCategory.slice(0, -1)
        : lowercasedCategory;
      filtered = filtered.filter(
        (p) =>
          (p.title || "").toLowerCase().includes(singularCategory) ||
          (p.description || "").toLowerCase().includes(singularCategory)
      );
    }

    // --- Apply Top Bar Filters ---
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    if (lowercasedSearchTerm) {
      filtered = filtered.filter(
        (p) =>
          (p.title || "").toLowerCase().includes(lowercasedSearchTerm) ||
          (p.location || "").toLowerCase().includes(lowercasedSearchTerm)
      );
    }
    if (propertyType && propertyType !== "all") {
      const lowercasedType = propertyType.toLowerCase();
      filtered = filtered.filter((p) => {
        const title = (p.title || "").toLowerCase();
        const description = (p.description || "").toLowerCase();
        return (
          title.includes(lowercasedType) || description.includes(lowercasedType)
        );
      });
    }

    // --- Apply Sidebar Filters ---
    if (sidebarFilters) {
      // ... (sidebar filtering logic)
    }

    const sorted = sortProperties(filtered, sortBy);
    setFilteredProperties(sorted);
    setCurrentPage(1);

    if ((searchParams.get("q") || searchParams.get("tab") || searchParams.get("type")) && sorted.length === 0) {
      toast.error("No properties found matching your search criteria. Try different filters.");
    }
  }, [
    searchResults, // Depend on searchResults instead of properties
    searchTerm,
    propertyType,
    sidebarFilters,
    sortBy,
    selectedCity,
    selectedCategory,
    location.search,
  ]);

  const sortProperties = (properties: any[], sortType: string) => {
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

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  useEffect(() => {
    if (searchTerm.length > 1) {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      const suggestionSet = new Set<string>();

      searchResults.forEach((property) => { // Use searchResults here
        if (property.title?.toLowerCase().includes(lowercasedSearchTerm)) {
          suggestionSet.add(property.title);
        }
        if (property.location?.toLowerCase().includes(lowercasedSearchTerm)) {
          suggestionSet.add(property.location);
        }
        if (property.builder?.toLowerCase().includes(lowercasedSearchTerm)) {
          suggestionSet.add(property.builder);
        }
      });

      setSuggestions(Array.from(suggestionSet).slice(0, 5));
      setIsSuggestionsOpen(true);
    } else {
      setSuggestions([]);
      setIsSuggestionsOpen(false);
    }
  }, [searchTerm, searchResults]); // Depend on searchResults

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setIsSuggestionsOpen(false);
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setIsSuggestionsOpen(false);
    }
  };

  const handleClearAndRefetch = () => {
    setSearchTerm("");
    setPropertyType("all");
    setSidebarFilters(null);
  };

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

  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 6;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 500, behavior: "smooth" });
  };

  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);
  const currentProperties = filteredProperties.slice(
    (currentPage - 1) * propertiesPerPage,
    currentPage * propertiesPerPage
  );

  const renderPagination = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    const halfMaxPages = Math.floor(maxPagesToShow / 2);
    let startPage = Math.max(1, currentPage - halfMaxPages);
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            isActive={i === currentPage}
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(i);
            }}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return pageNumbers;
  };

  const handleWishlistToggle = async (property: any) => {
    const propertyId = property.id.toString();
    const userId = getCurrentUserId();
    if (!userId) {
      toast.error("You need to be logged in to manage your wishlist.");
      navigate("/login");
      return;
    }

    const propertyIdNum = parseInt(propertyId, 10);
    const isWishlisted = wishlistedPropertyIds.has(propertyId);

    console.log(`--- Wishlist Toggle for Property ID: ${propertyIdNum} ---`);
    console.log(`Is item currently wishlisted? ${isWishlisted}`);

    if (isWishlisted) {
      console.log("Attempting to REMOVE from wishlist.");
      console.log("Current wishlist state:", wishlist);
      const wishlistItem = wishlist.find(item => item.property.id === propertyIdNum);
      console.log("Found wishlistItem to get slug:", wishlistItem);

      if (wishlistItem) {
        console.log(`Found slug: ${wishlistItem.slug}. Calling removeFromWishlist.`);
        try {
          await removeFromWishlist(wishlistItem.slug);
          setWishlistedPropertyIds(prev => {
            const newSet = new Set(prev);
            newSet.delete(propertyId);
            return newSet;
          });
          setWishlist(prev => prev.filter(item => item.property.id !== propertyIdNum));
          toast.success("Property removed from your wishlist.");
        } catch (error) {
          console.error("Failed to remove from wishlist:", error);
          if (error instanceof Error) {
            console.error("Backend Error Details:", error.message);
          }
          toast.error("Failed to remove property from wishlist.");
        }
      } else {
        console.error("Error: Could not find wishlist item in state to get slug for deletion.");
        toast.error("Could not remove property. Please refresh and try again.");
      }
    } else {
      console.log("Attempting to ADD to wishlist.");
      try {
        await addToWishlist(propertyIdNum);
        // Refetch the whole wishlist to get the new item with its slug
        const updatedWishlist = await getWishlist();
        setWishlist(updatedWishlist);
        const updatedIds = new Set(
          updatedWishlist.map((item) => item.property.id.toString())
        );
        setWishlistedPropertyIds(updatedIds);
        toast.success("Property added to your wishlist.");
      } catch (error) {
        console.error("Failed to add to wishlist:", error);
        if (error instanceof Error) {
          console.error("Backend Error Details:", error.message);
        }
        toast.error("Failed to add property to wishlist.");
      }
    }
  };

  return (
    <>
      <div className="bg-gradient-to-r from-[#7f23cf] to-accent py-16">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center text-white mb-12">
            <h1 className="text-5xl font-bold mb-4">
              Find Your Dream Property
            </h1>
            <p className="text-xl opacity-90">
              Discover the perfect home with our AI-powered search
            </p>
          </div>

          <Card className="backdrop-blur-xl border-white/20 max-w-4xl mx-auto bg-white/10">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative" ref={searchContainerRef}>
                  <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search by location, keyword..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setIsSuggestionsOpen(true)}
                    onKeyPress={handleSearchKeyPress}
                    className="pl-10 bg-white/90 text-lg py-6"
                    autoComplete="off"
                  />
                  {isSuggestionsOpen && suggestions.length > 0 && (
                    <Card className="absolute top-full mt-2 w-full z-50 shadow-lg bg-white">
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
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger className="lg:w-48 bg-white/90">
                    <SelectValue placeholder="Select Property Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Property Types</SelectItem>
                    {propertyTypesForSelect.map((type) => (
                      <SelectItem key={type.id} value={type.label}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  className="lg:w-32 py-6 bg-purple-600  hover:bg-purple-700 text-white"
                  size="lg"
                  onClick={() => setIsSuggestionsOpen(false)}
                  disabled={loading}
                >
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>



      <div className="min-h-screen bg-gradient-surface">
        <header className="bg-background/95 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50 shadow-soft">
          <div className="container mx-auto px-4 py-4">
          </div>
        </header>

        <div className="container mx-auto px-4 py-6">
          <div className="flex gap-6">
            <aside className="hidden lg:block w-80 flex-shrink-0 sticky top-24 h-fit">
              <FilterSidebar
                onFilterChange={handleSidebarFilterChange}
                properties={searchResults} // Use searchResults here
              />
            </aside>

            <main className="flex-1 space-y-8">
              <div>
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
                  <div className="text-center md:text-left">
                    <h2 className="text-2xl font-bold">Search Results</h2>
                    <p className="text-muted-foreground">
                      {loading
                        ? "Loading..."
                        : `${filteredProperties.length} properties found`}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 md:flex-row md:items-center">
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => navigate("/add-property")}
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add<span className="hidden sm:inline"> Property</span>
                      </Button>
                      <Select value={sortBy} onValueChange={handleSortChange}>
                        <SelectTrigger className="w-[180px] flex justify-start gap-1">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="relevance">Relevance</SelectItem>
                          <SelectItem value="price-low">
                            Price: Low to High
                          </SelectItem>
                          <SelectItem value="price-high">
                            Price: High to Low
                          </SelectItem>
                          <SelectItem value="newest">Newest First</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="lg:hidden">
                      <Sheet
                        open={sidebarOpen}
                        onOpenChange={setSidebarOpen}
                      >
                        <SheetTrigger asChild>
                          <Button variant="outline" className="w-full">
                            <Filter className="h-4 w-4 mr-2" />
                            Filters
                          </Button>
                        </SheetTrigger>
                        <SheetContent className="w-full max-w-xs p-0 overflow-y-auto z-[101] pt-16">
                          <FilterSidebar
                            onFilterChange={(filters) => {
                              handleSidebarFilterChange(filters);
                            }}
                            properties={searchResults} // Use searchResults here
                            className="border-none shadow-none h-auto"
                          />
                        </SheetContent>
                      </Sheet>
                    </div>
                    <div className="grid grid-cols-2 w-full border rounded-lg">
                      <Button
                        className={
                          `w-full rounded-r-none ` +
                          (viewMode === "grid"
                            ? "bg-purple-600 text-white"
                            : "bg-transparent text-foreground")
                        }
                        size="sm"
                        onClick={() => setViewMode("grid")}
                      >
                        Grid
                      </Button>
                      <Button
                        className={
                          `w-full rounded-l-none ` +
                          (viewMode === "list"
                            ? "bg-purple-600 text-white"
                            : "bg-transparent text-foreground")
                        }
                        size="sm"
                        onClick={() => setViewMode("list")}
                        >
                        List
                      </Button>
                    </div>
                  </div>
                </div>

                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                    <p className="mt-4 text-muted-foreground">
                      Loading properties...
                    </p>
                  </div>
                ) : (
                  <div
                    className={`grid gap-6   ${
                      viewMode === "grid"
                        ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                        : "grid-cols-1"
                    }`}
                  >
                    {currentProperties.length > 0 ? (
                      currentProperties.map((property) => (
                        <PropertyCard
                          key={property.id}
                          layout={viewMode}
                          id={property.id.toString()}
                          slug={property.slug}
                          image={
                            property.images?.find((img: any) => img.is_primary)
                              ?.image ||
                            property.images?.[0]?.image ||
                            ""
                          }
                          title={property.title || property.name}
                          builder={property.builder || "N/A"}
                          location={property.location || property.address}
                          bhkOptions={property.bhkOptions || []}
                          description={property.description}
                          badges={property.badges || []}
                          ribbon={property.ribbon || ""}
                          bedrooms={property.bedrooms}
                          bathrooms={property.bathrooms}
                          price={property.price}
                          rating={
                            property.ai_recommended_score
                              ? parseFloat(
                                  (property.ai_recommended_score * 5).toFixed(1)
                                )
                              : undefined
                          }
                          category={property.category}
                          property_status={property.property_status}
                          listed_on={property.listed_on}
                          created_at={property.created_at}
                          amenities={property.amenities || []}
                          isWishlisted={wishlistedPropertyIds.has(
                            property.id.toString()
                          )}
                          onWishlistToggle={() =>
                            handleWishlistToggle(property)
                          }
                        />
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">
                          No properties found matching your criteria.
                        </p>
                        <Button
                          variant="outline"
                          onClick={handleClearAndRefetch}
                          className="mt-4"
                        >
                          Clear Filters
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <Pagination>
                    <div className="md:hidden">
                      <PaginationContent className="flex flex-col items-center gap-2">
                        <div className="flex flex-row items-center gap-1">
                          {renderPagination()}
                        </div>
                        <div className="flex flex-row items-center gap-2">
                          <PaginationItem>
                            <PaginationPrevious
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(
                                  Math.max(1, currentPage - 1)
                                );
                              }}
                            />
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationNext
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(
                                  Math.min(totalPages, currentPage + 1)
                                );
                              }}
                            />
                          </PaginationItem>
                        </div>
                      </PaginationContent>
                    </div>
                    <div className="hidden md:flex">
                      <PaginationContent className="flex flex-row items-center gap-2">
                        <PaginationItem>
                          <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handlePageChange(
                                Math.max(1, currentPage - 1)
                              );
                            }}
                          />
                        </PaginationItem>
                        {renderPagination()}
                        <PaginationItem>
                          <PaginationNext
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handlePageChange(
                                Math.min(totalPages, currentPage + 1)
                              );
                            }}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </div>
                  </Pagination>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
      </>
  );
};