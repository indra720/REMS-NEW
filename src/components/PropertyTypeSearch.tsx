import { useState, useEffect } from 'react';
import { searchPropertyTypes, PropertyType } from '../lib/api';

interface Props {
  onPropertyTypeSelect?: (propertyTypeId: number) => void;
}

export default function PropertyTypeSearch({ onPropertyTypeSelect }: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PropertyType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const search = async () => {
      setLoading(true);
      try {
        const data = await searchPropertyTypes(query);
        setResults(data);
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(search, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleSelect = (propertyType: PropertyType) => {
    setQuery(propertyType.name);
    onPropertyTypeSelect?.(propertyType.id);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <input
        type="text"
        placeholder="Search property types..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      {loading && <p className="mt-2 text-gray-500">Searching...</p>}
      
      <div className="mt-4 space-y-2">
        {results.map((type) => (
          <div 
            key={type.id} 
            className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
            onClick={() => handleSelect(type)}
          >
            <h3 className="font-semibold">{type.name}</h3>
            <p className="text-sm text-gray-600">{type.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
