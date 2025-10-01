// src/context/SearchContext.tsx
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { publicApi } from '../lib/api';
import { useNavigate, useLocation } from 'react-router-dom';

interface Property {
  id: number;
  images: { id: number; property: string; image: string; caption: string; is_primary: boolean; uploaded_at: string; ai_tag: string; slug: string }[];
  amenities: { id: number; property: string; amenity: string; slug: string }[];
  documents: { id: number; property: string; document_type: string; document_file: string; verified: boolean; verified_by: string | null; verified_at: string | null; ai_extracted_text: string; slug: string }[];
  contacts: any[]; // Define a more specific interface if contacts data structure is known
  title: string;
  description: string;
  category: string;
  location: string;
  latitude: string;
  longitude: string;
  area_sqft: number;
  price: string;
  price_per_sqft: string;
  bedrooms: number;
  bathrooms: number;
  balconies: number;
  furnishing: string;
  floor_no: number;
  total_floors: number;
  availability_status: string;
  possession_date: string;
  age_of_property: string;
  ownership_type: string;
  rera_approved: boolean;
  maintenance_cost: string;
  property_status: string;
  listed_on: string;
  last_updated: string;
  price_negotiable: boolean;
  terms_and_conditions: boolean;
  ai_price_estimate: string;
  ai_recommended_score: number;
  slug: string;
  property_type: number;
  address: number;
}

interface SearchState {
  keyword: string;
  location: string;
  propertyType: string;
  category: string;
  newLaunch: boolean;
  propertyStatus: string;
}

interface SearchContextType {
  searchParams: SearchState;
  setSearchParams: (params: Partial<SearchState>) => void;
  searchResults: Property[];
  loading: boolean;
  error: string | null;
  fetchProperties: () => void; // Expose fetchProperties for manual refresh if needed
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getSearchParamsFromUrl = (): SearchState => {
    // console.log("SearchContext: Raw URL search string:", location.search);
    const params = new URLSearchParams(location.search);
    return {
      keyword: params.get('q') || '',
      location: params.get('location') || '',
      propertyType: params.get('type') || '',
      category: params.get('category') || '',
      newLaunch: params.get('new_launch') === 'true',
      propertyStatus: params.get('property_status') || '',
    };
  };

  const [searchResults, setSearchResults] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const searchParams = getSearchParamsFromUrl(); // Derive searchParams from URL

  const setSearchParams = (params: Partial<SearchState>) => {
    const currentParams = new URLSearchParams(location.search);
    if (params.keyword !== undefined) currentParams.set('q', params.keyword);
    if (params.location !== undefined) currentParams.set('location', params.location);
    if (params.propertyType !== undefined) currentParams.set('type', params.propertyType);
    navigate(`?${currentParams.toString()}`);
  };

  const fetchProperties = async () => {
    setLoading(true);
    setError(null);
    try {
      // console.log("SearchContext: searchParams before mapping to queryParams:", searchParams);
      const queryParams: any = {};
      if (searchParams.location) queryParams.location = searchParams.location;
      if (searchParams.propertyType) queryParams.type = searchParams.propertyType;
      if (searchParams.category) queryParams.category = searchParams.category;
      if (searchParams.newLaunch) queryParams.new_launch = 'true';
      if (searchParams.propertyStatus) queryParams.property_status = searchParams.propertyStatus;
      // If keyword is present, and location is not already set, use keyword as location
      if (searchParams.keyword && !queryParams.location) queryParams.location = searchParams.keyword;
      // console.log("SearchContext: Fetching properties with queryParams:", queryParams);

      const response = await publicApi.get('http://127.0.0.1:8000/api/properties/search/', {
        params: queryParams,
        withCredentials: false, // Set withCredentials to false to resolve CORS issue
      });
      // console.log("SearchContext: API response data:", response.data);
      setSearchResults(response.data);
      // console.log("SearchContext: Updated searchResults:", response.data);
    } catch (err) {
      console.error("Failed to fetch properties:", err);
      setError("Failed to load properties. Please try again later.");
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [location.search]); // Re-fetch whenever URL search parameters change

  return (
    <SearchContext.Provider value={{ searchParams, setSearchParams, searchResults, setSearchResults, loading, error, fetchProperties }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
