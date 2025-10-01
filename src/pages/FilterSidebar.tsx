import { useState, useMemo, useEffect, useRef } from "react";
import { Search, MapPin, Home, IndianRupee, Calendar, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface FilterSidebarProps {
  className?: string;
  onFilterChange?: (filters: FilterState) => void;
  properties?: any[];
  setSidebarOpen?: (open: boolean) => void;
}

export interface FilterState {
  locations: string;
  propertyType: string;
  bhk: string;
  priceRange: [number, number];
  possessionStatus: string[];
  amenities: string[];
  searchQuery: string;
}

const locations = ["Mumbai", "Delhi", "Bangalore", "Gurgaon", "Pune", "Hyderabad"];
const propertyTypes = [
  { id: "apartment", label: "Apartment" },
  { id: "villa", label: "Villa" },
  { id: "plot", label: "Plot" },
  { id: "commercial", label: "Commercial" }
];

const bhkOptions = ["1", "2", "3", "4+"];
const possessionStatus = ["Ready to Move", "Under Construction", "New Launch"];
const amenities = ["Parking", "Pool", "Gym", "Garden", "Security", "Power Backup"];

export function FilterSidebar({ className, onFilterChange, properties = [], setSidebarOpen }: FilterSidebarProps) {
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: "",
    locations: "",
    propertyType: "",
    bhk: "",
    priceRange: [10, 1000],
    possessionStatus: [],
    amenities: [],
  });

  const isInitialMount = useRef(true);

  const displayLocations = useMemo(() => {
    if (!properties || properties.length === 0) return locations;
    const unique = [...new Set(properties.map(p => p.location || p.address).filter(Boolean) as string[])];
    return unique.length > 0 ? unique.sort() : locations.sort();
  }, [properties]);

  const displayAmenities = useMemo(() => {
    if (!properties || properties.length === 0) return amenities;

    const allAmenities = properties.flatMap(p => {
      const propAmenities = p.amenities;
      if (!propAmenities) return [];
      
      if (Array.isArray(propAmenities)) {
        return propAmenities.map(a => a.name || a.amenity || a).filter(Boolean);
      }
      
      if (typeof propAmenities === 'string') {
        try {
          const parsed = JSON.parse(propAmenities);
          if (Array.isArray(parsed)) {
            return parsed.map(a => a.name || a.amenity || a).filter(Boolean);
          }
        } catch (e) {
          return propAmenities.split(',').map(s => s.trim());
        }
      }
      
      return [];
    });

    const unique = [...new Set(allAmenities as string[])];
    return unique.length > 0 ? unique.sort() : amenities.sort();
  }, [properties]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (onFilterChange) {
      onFilterChange(filters);
    }
    if (setSidebarOpen) {
      setSidebarOpen(false);
    }
  }, [filters, onFilterChange, setSidebarOpen]);

  const handleMultiSelectToggle = (field: 'possessionStatus' | 'amenities', value: string) => {
    setFilters(prev => {
      const currentValues = prev[field] as string[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(item => item !== value)
        : [...currentValues, value];
      return { ...prev, [field]: newValues };
    });
  };

  const handleSingleSelectChange = (field: 'locations' | 'propertyType' | 'bhk', value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: prev[field] === value ? "" : value
    }));
  };

  const handlePriceCommit = (newRange: [number, number]) => {
    setFilters(prev => ({ ...prev, priceRange: newRange }));
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, searchQuery: e.target.value }));
  };

  const clearAllFilters = () => {
    const emptyFilters: FilterState = {
      searchQuery: "",
      locations: "",
      propertyType: "",
      bhk: "",
      priceRange: [10, 1000],
      possessionStatus: [],
      amenities: [],
    };
    setFilters(emptyFilters);
  };

  return (
    <div className={`bg-gradient-surface p-6 rounded-xl shadow-soft border h-fit ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg font-semibold">Filters</h2>
        </div>
        <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-xs">Clear All</Button>
      </div>

      {/* AI Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search by keyword..."
            value={filters.searchQuery}
            onChange={handleSearchChange}
            className="pl-10 bg-background/50 backdrop-blur-sm border-border/50"
          />
        </div>
      </div>

      {/* Location Filter */}
      <div className="mb-6">
        <Label className="text-sm font-medium mb-3 flex items-center gap-2"><MapPin className="w-4 h-4" />Location</Label>
        <div className="flex flex-wrap gap-2">
          {displayLocations.map((location) => (
            <Badge
              key={location}
              variant={filters.locations === location ? "default" : "outline"}
              className={`cursor-pointer transition-all`}
              onClick={() => handleSingleSelectChange('locations', location)}
            >
              {location}
            </Badge>
          ))}
        </div>
      </div>

      {/* Property Type */}
      <div className="mb-6">
        <Label className="text-sm font-medium mb-3 flex items-center gap-2"><Home className="w-4 h-4" />Property Type</Label>
        <RadioGroup
            value={filters.propertyType}
            onValueChange={(value) => handleSingleSelectChange('propertyType', value)}
            className="space-y-2"
        >
          {propertyTypes.map((type) => (
            <div key={type.id} className="flex items-center space-x-2">
              <RadioGroupItem value={type.label} id={type.id} />
              <Label htmlFor={type.id} className="text-sm font-normal">{type.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* BHK Selection */}
      <div className="mb-6">
        <Label className="text-sm font-medium mb-3 block">BHK</Label>
        <div className="grid grid-cols-4 gap-2">
          {bhkOptions.map((bhk) => (
            <Badge
              key={bhk}
              variant={filters.bhk === bhk ? "default" : "outline"}
              className={`cursor-pointer text-center py-2 transition-all`}
              onClick={() => handleSingleSelectChange('bhk', bhk)}
            >
              {bhk}
            </Badge>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <Label className="text-sm font-medium mb-3 flex items-center gap-2 "><IndianRupee className="w-4 h-4" />Price Range</Label>
        <div className="px-2">
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => setFilters(prev => ({...prev, priceRange: [value[0], value[1]]}))}
            onValueCommit={(value) => handlePriceCommit([value[0], value[1]])}
            max={1000}
            min={10}
            step={10}
            className="mb-3 bg-purple-600"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>₹{filters.priceRange[0]} L</span>
            <span>₹{filters.priceRange[1]} L</span>
          </div>
        </div>
      </div>

      {/* Possession Status */}
      <div className="mb-6">
        <Label className="text-sm font-medium mb-3 flex items-center gap-2"><Calendar className="w-4 h-4" />Possession Status</Label>
        <div className="flex flex-wrap gap-2">
          {possessionStatus.map((status) => (
            <Badge
              key={status}
              variant={filters.possessionStatus.includes(status) ? "default" : "outline"}
              className={`cursor-pointer transition-all text-xs`}
              onClick={() => handleMultiSelectToggle('possessionStatus', status)}
            >
              {status}
            </Badge>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className="mb-6">
        <Label className="text-sm font-medium mb-3 block">Amenities</Label>
        <div className="flex flex-wrap gap-2">
          {displayAmenities.map((amenity) => (
            <Badge
              key={amenity}
              variant={filters.amenities.includes(amenity) ? "default" : "outline"}
              className={`cursor-pointer transition-all text-xs`}
              onClick={() => handleMultiSelectToggle('amenities', amenity)}
            >
              {amenity}
            </Badge>
          ))}
        </div>
      </div>

    </div>
  );
}
