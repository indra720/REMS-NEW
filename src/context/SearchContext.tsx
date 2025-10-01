// src/context/SearchContext.tsx
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import axios from 'axios';

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
  const [searchParams, setSearchParamsState] = useState<SearchState>({
    keyword: '',
    location: '',
    propertyType: '',
  });
  const [searchResults, setSearchResults] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const setSearchParams = (params: Partial<SearchState>) => {
    setSearchParamsState(prev => ({ ...prev, ...params }));
  };

  const fetchProperties = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/properties/', {
        params: searchParams,
        withCredentials: false, // Set withCredentials to false to resolve CORS issue
      });
      setSearchResults(response.data);
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
  }, [searchParams]); // Re-fetch whenever searchParams change

  return (
    <SearchContext.Provider value={{ searchParams, setSearchParams, searchResults, loading, error, fetchProperties }}>
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
