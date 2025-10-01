import { useState } from "react";
import { Search, MapPin, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const SearchInterface = () => {
  const navigate = useNavigate();
  const [activeSearchTab, setActiveSearchTab] = useState("Buy");
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownValue, setDropdownValue] = useState("all-residential");
  const [loading, setLoading] = useState(false);

  const searchTabs = ["Buy", "Rent", "New Launch", "Commercial", "Plots/Land", "Projects", "Post Property"];
  const popularSearches = ["Jaipur", "Bangalore", "Chennai", "Mumbai", "Hyderabad", "Pune", "Delhi NCR", "Ahmedabad"];

  const getPlaceholderText = () => {
    switch (activeSearchTab) {
      case "Buy": return 'Search "Hyderabad"';
      case "Rent": return 'Search for rental properties "Mumbai"';
      case "New Launch": return 'Search new projects "Bangalore"';
      case "Commercial": return 'Search commercial spaces "Delhi"';
      case "Plots/Land": return 'Search plots/land "Chennai"';
      case "Projects": return 'Search projects "Pune"';
      case "Post Property": return 'Enter property details';
      default: return 'Search location';
    }
  };

  const getDropdownOptions = () => {
    switch (activeSearchTab) {
      case "Buy":
      case "Rent":
        return [
          { value: "all-residential", label: "All Residential" },
          { value: "Apartment", label: "Apartments" },
          { value: "Villa", label: "Villas" },
          { value: "Plot", label: "Plots" },
        ];
      case "New Launch":
        return [
          { value: "all-projects", label: "All Projects" },
          { value: "Apartment Projects", label: "Apartment Projects" },
          { value: "Villa Projects", label: "Villa Projects" },
        ];
      case "Commercial":
        return [
          { value: "all-commercial", label: "All Commercial" },
          { value: "Office Space", label: "Office Space" },
          { value: "Retail Space", label: "Retail Space" },
          { value: "Warehouse", label: "Warehouse" },
        ];
      case "Plots/Land":
        return [
          { value: "all-plots", label: "All Plots/Land" },
          { value: "Residential Plot", label: "Residential Plots" },
          { value: "Commercial Plot", label: "Commercial Plots" },
          { value: "Agricultural Land", label: "Agricultural Land" },
        ];
      case "Projects":
        return [
          { value: "all-projects", label: "All Projects" },
          { value: "Ongoing Projects", label: "Ongoing Projects" },
          { value: "Completed Projects", label: "Completed Projects" },
        ];
      case "Post Property":
        return [
          { value: "property-type", label: "Select Property Type" },
          { value: "Residential", label: "Residential" },
          { value: "Commercial", label: "Commercial" },
        ];
      default:
        return [{ value: "all-residential", label: "All Residential" }];
    }
  };

  const getDropdownValue = (tab) => {
    switch (tab) {
      case "Buy":
      case "Rent":
        return "all-residential";
      case "New Launch":
      case "Projects":
        return "all-projects";
      case "Commercial":
        return "all-commercial";
      case "Plots/Land":
        return "all-plots";
      case "Post Property":
        return "property-type";
      default:
        return "all-residential";
    }
  };

  const getButtonText = () => {
    return activeSearchTab === "Post Property" ? "Post Free Ad" : "Search";
  };

  // Handle search with navigation
  const handleSearch = () => {
    setLoading(true);
    
    if (activeSearchTab === "Post Property") {
      const searchParams = new URLSearchParams();
      if (searchQuery) searchParams.set('title', searchQuery);
      if (dropdownValue) searchParams.set('type', dropdownValue);
      navigate(`/post-property?${searchParams.toString()}`);
    } else {
      // Create search parameters
      const searchParams = new URLSearchParams();
      if (searchQuery) searchParams.set('location', searchQuery);
      if (activeSearchTab === "Commercial" && dropdownValue && dropdownValue !== 'all-commercial') {
        searchParams.set('property_status', dropdownValue);
      } else if (dropdownValue && dropdownValue !== 'all-residential') {
        searchParams.set('type', dropdownValue);
      }

      let backendCategory = activeSearchTab;
      if (activeSearchTab === "Buy") {
        backendCategory = "Sale";
      }
      // For 'Rent', it's already 'Rent', so no change needed

      if (backendCategory) searchParams.set('category', backendCategory);
      if (activeSearchTab === "New Launch") searchParams.set('new_launch', 'true');
      
      // console.log("SearchInterface: Navigating with URL params:", searchParams.toString());
      // Navigate to Index2 with search parameters
      navigate(`/search?${searchParams.toString()}`);
    }
    
    setLoading(false);
  };

  // Handle popular search clicks
  const handlePopularSearch = (location) => {
    setSearchQuery(location);
    const searchParams = new URLSearchParams();
    searchParams.set('location', location);
    if (activeSearchTab === "Commercial" && dropdownValue && dropdownValue !== 'all-commercial') {
      searchParams.set('property_status', dropdownValue);
    } else if (dropdownValue && dropdownValue !== 'all-residential') {
      searchParams.set('type', dropdownValue);
    }

    let backendCategory = activeSearchTab;
    if (activeSearchTab === "Buy") {
      backendCategory = "Sale";
    }
    // For 'Rent', it's already 'Rent', so no change needed

    if (backendCategory) searchParams.set('category', backendCategory);
    if (activeSearchTab === "New Launch") searchParams.set('new_launch', 'true');
    // console.log("SearchInterface: Navigating with URL params (popular search):", searchParams.toString());
    navigate(`/search?${searchParams.toString()}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto  ">
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-search">
        {/* Tabs */}
        <div className="flex flex-wrap sm:gap-2 mb-2 sm:mb-6 border-b pb-4 justify-center">
          {searchTabs.map((tab) => (
            <Button
              key={tab}
              variant={activeSearchTab === tab ? "default" : "ghost"}
              className={cn(
                "text-xs sm:text-sm px-3 py-1 sm:py-2 rounded-none",
                activeSearchTab === tab
                  ? "text-purple-600 border-b-2 border-purple-600 bg-transparent hover:bg-transparent"
                  : "text-gray-600 hover:text-purple-600"
              )}
              onClick={() => {
                setActiveSearchTab(tab);
                setDropdownValue(getDropdownValue(tab));
              }}
            >
              {tab}
              {tab === "New Launch" && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
              {tab === "Post Property" && (
                <span className="ml-1 px-1 sm:px-2 py-0.5 bg-green-500 text-white text-xs rounded-full">
                  FREE
                </span>
              )}
            </Button>
          ))}
        </div>

        {/* Search Fields */}
        <div className="flex flex-col gap-4 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                <Search className="h-4 sm:h-5 w-4 sm:w-5 text-gray-400" />
              </div>
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={getPlaceholderText()}
                className="pl-10 pr-16 sm:pr-20 h-10 sm:h-12 border-gray-200 focus:border-purple-600 text-sm sm:text-base"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <div className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1 sm:space-x-2">
                <Button variant="ghost" size="sm" className="p-1 hover:bg-gray-100">
                  <MapPin className="h-3 sm:h-4 w-3 sm:w-4 text-purple-600" />
                </Button>
                <Button variant="ghost" size="sm" className="p-1 hover:bg-gray-100">
                  <Mic className="h-3 sm:h-4 w-3 sm:w-4 text-gray-400" />
                </Button>
              </div>
            </div>

            <Select
              value={dropdownValue}
              onValueChange={(value) => setDropdownValue(value)}
            >
              <SelectTrigger className="w-full sm:w-48 h-10 sm:h-12 border-gray-200 focus:border-primary text-sm sm:text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {getDropdownOptions().map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              className="bg-primary hover:bg-primary/90 h-10 sm:h-12 px-6 sm:px-8 w-full sm:w-auto"
              onClick={handleSearch}
              disabled={loading}
            >
              {loading ? "Searching..." : getButtonText()}
            </Button>
          </div>
        </div>

        {/* Popular Searches */}
        <div>
          <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-2 sm:mb-3">Popular Search</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {popularSearches.map((search, index) => (
              <Button
                key={index}
                variant="outline"
                className="text-gray-600 border-gray-200 hover:border-primary hover:text-primary rounded-full text-xs sm:text-sm px-3 py-1.5"
                onClick={() => handlePopularSearch(search)}
              >
                {search}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchInterface;