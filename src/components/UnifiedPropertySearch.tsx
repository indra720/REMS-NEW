import { useState, useEffect } from 'react';
import { searchPropertyTypes, PropertyType } from '../lib/api';

interface Props {
  onSearchChange?: (searchQuery: string) => void;
  onPropertyTypeSelect?: (propertyTypeId: number) => void;
}

export default function UnifiedPropertySearch({ onSearchChange, onPropertyTypeSelect }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [propertyTypes, setPropertyTypes] = useState<PropertyType[]>([]);
  const [filteredTypes, setFilteredTypes] = useState<PropertyType[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchPropertyTypes = async () => {
      try {
        const types = await searchPropertyTypes();
        setPropertyTypes(types);
      } catch (error) {
        console.error('Failed to fetch property types:', error);
      }
    };
    fetchPropertyTypes();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = propertyTypes.filter(type => 
        type.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTypes(filtered);
      setShowDropdown(true);
      onSearchChange?.(searchQuery);
    } else {
      setFilteredTypes([]);
      setShowDropdown(false);
      onSearchChange?.('');
    }
  }, [searchQuery, propertyTypes, onSearchChange]);

  const handleTypeSelect = (type: PropertyType) => {
    setSearchQuery(type.name);
    setShowDropdown(false);
    onPropertyTypeSelect?.(type.id);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        placeholder="Search properties or property types..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => searchQuery && setShowDropdown(true)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      {showDropdown && filteredTypes.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-10 mt-1">
          {filteredTypes.map((type) => (
            <div 
              key={type.id} 
              className="p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
              onClick={() => handleTypeSelect(type)}
            >
              <h3 className="font-semibold">{type.name}</h3>
              <p className="text-sm text-gray-600">{type.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
