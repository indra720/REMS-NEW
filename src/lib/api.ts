import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
});

export const publicApi = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

// This interface is based on the props used in PropertyCard.tsx
export interface Property {
  id: string;
  slug: string;
  images?: Array<{
    id: number;
    image: string;
    caption: string;
    is_primary: boolean;
  }>;
  title: string;
  builder: string;
  location: string;
  bhkOptions: { bhk: string; price: string }[];
  description: string;
  badges: string[];
  ribbon: string;
  amenities: string[];
  price?: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: string;
  views?: number;
  rating?: number;
  tags?: string[];
  featured?: boolean;
  category?: string;
  property_status?: string;
  listed_on?: string;
  created_at?: string;
}

export interface WishlistItem {
  id: number;
  slug: string;
  user: string;
  property: number;
}

export const getWishlist = async (): Promise<WishlistItem[]> => {
  const response = await api.get('/wishlist/');
  return response.data;
};

export const addToWishlist = async (propertyId: number): Promise<WishlistItem> => {
  const response = await api.post('/wishlist/', { property_id: propertyId });
  return response.data;
};

export const removeFromWishlist = async (slug: string): Promise<void> => {
  await api.delete(`/wishlist/${slug}/`);
};

export const fetchProperties = async (): Promise<Property[]> => {
  try {
    const response = await publicApi.get<Property[]>('/properties/search/');
    // The backend seems to return results in a 'results' object
    return (response.data as any).results || response.data;
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
};

export const fetchAIProperties = async (): Promise<Property[]> => {
  try {
    const response = await publicApi.get<Property[]>('/properties/ai-properties/');
    return response.data;
  } catch (error) {
    console.error('Error fetching AI properties:', error);
    return [];
  }
};
