

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Info, Building, MapPin, IndianRupee, CheckCircle } from "lucide-react";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import imageshow from "/delhi.jpg";

interface Property {
  id: number;
  title: string;
  location: string;
  category: string;
  price: number | string;
  property_status: string;
  rera_approved: boolean;
}

const PropertiesList = () => {
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState<Property[]>([]);

  const fetchProperties = async () => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch("http://127.0.0.1:8000/api/properties/", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setProperties(data.results || data || []);
        console.log(data);
      } else {
        console.error("Failed to fetch properties:", response.status);
        toast({
          title: "Error",
          description: "Failed to fetch properties.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
      toast({
        title: "Error",
        description: "An error occurred while fetching properties.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "available":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "sold":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category?.toLowerCase()) {
      case "residential":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "commercial":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200";
      case "industrial":
        return "bg-orange-100 text-orange-800 hover:bg-orange-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  return (
    <Card className="card-gradient shadow-lg hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50 mx-2 sm:mx-0">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg border-b p-4 sm:p-6">
        <CardTitle className="flex items-center gap-2 sm:gap-3">
          <div className="p-1.5 sm:p-2 bg-blue-500 rounded-lg shadow-sm">
            <Building className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
          </div>
          <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Properties 
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-3 sm:p-6">
        {loading ? (
          <div className="flex items-center justify-center py-8 sm:py-12">
            <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-blue-500"></div>
            <span className="ml-3 text-gray-600 font-medium text-sm sm:text-base">
              Loading properties...
            </span>
          </div>
        ) : properties.length > 0 ? (
          <div className="space-y-3 sm:space-y-4">
            {properties.map((property: Property) => (
              <div
                key={property.id}
                className="group p-3 sm:p-6 rounded-xl border border-gray-200 bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-lg hover:scale-[1.01] hover:border-blue-200"
              >
                {/* Mobile Layout */}
                <div className="block sm:hidden">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="relative flex-shrink-0">
                      <img
                        src={imageshow}
                        alt={property.title}
                        className="w-16 h-16 object-cover rounded-lg border-2 border-gray-200 group-hover:border-blue-300 transition-colors duration-300 shadow-sm"
                      />
                      <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5 shadow-sm">
                        <CheckCircle className="h-2.5 w-2.5 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-base text-gray-900 mb-1 group-hover:text-blue-700 transition-colors duration-200 truncate">
                        {property.title}
                      </h3>
                      <div className="flex items-center gap-1 text-gray-600 mb-2">
                        <MapPin className="h-3 w-3 text-gray-400 flex-shrink-0" />
                        <span className="text-xs font-medium truncate">
                          {property.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <Badge
                      variant="secondary"
                      className={`px-2 py-1 text-xs font-medium ${getCategoryColor(
                        property.category
                      )}`}
                    >
                      {property.category}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <IndianRupee className="h-3 w-3 text-green-600" />
                      <span className="font-bold text-sm text-green-700">
                        {typeof property.price === "number"
                          ? formatPrice(property.price)
                              .replace("₹", "")
                              .slice(0, -3)
                          : property.price}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    <Badge
                      variant="outline"
                      className={`px-2 py-1 text-xs font-medium border-0 ${getStatusColor(
                        property.property_status
                      )}`}
                    >
                      {property.property_status}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`px-2 py-1 text-xs font-medium border-0 ${
                        property.rera_approved
                          ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                          : "bg-red-100 text-red-800 hover:bg-red-200"
                      }`}
                    >
                      {property.rera_approved ? "RERA" : "No RERA"}
                    </Badge>
                  </div>
                </div>
                {/* Desktop Layout */}
                <div className="hidden sm:flex items-start gap-5">
                  <div className="relative flex-shrink-0">
                    <img
                      src={imageshow}
                      alt={property.title}
                      className="w-20 h-20 object-cover rounded-xl border-2 border-gray-200 group-hover:border-blue-300 transition-colors duration-300 shadow-sm"
                    />
                    <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1 shadow-sm">
                      <CheckCircle className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-bold text-xl text-gray-900 mb-1 group-hover:text-blue-700 transition-colors duration-200">
                          {property.title}
                        </h3>
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-sm font-medium">
                            {property.location}
                          </span>
                        </div>
                      </div>

                      <div className="text-right space-y-2">
                        <Badge
                          variant="secondary"
                          className={`px-3 py-1 font-medium ${getCategoryColor(
                            property.category
                          )}`}
                        >
                          {property.category}
                        </Badge>
                        <div className="flex items-center gap-1 justify-end">
                          <IndianRupee className="h-4 w-4 text-green-600" />
                          <span className="font-bold text-lg text-green-700">
                            {typeof property.price === "number"
                              ? formatPrice(property.price).replace("₹", "")
                              : property.price}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <Badge
                          variant="outline"
                          className={`px-3 py-1 font-medium border-0 ${getStatusColor(
                            property.property_status
                          )}`}
                        >
                          {property.property_status}
                        </Badge>
                        {property.rera_approved ? (
                          <Badge
                            variant="outline"
                            className="px-3 py-1 font-medium bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-0"
                          >
                            {" "}
                            RERA Approved{" "}
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="px-3 py-1 font-medium bg-red-100 text-red-800 hover:bg-red-200 border-0"
                          >
                            {" "}
                            Not RERA Approved{" "}
                          </Badge>
                        )}{" "}
                      </div>{" "}
                    </div>{" "}
                  </div>{" "}
                </div>
                <div className="h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 mt-3 sm:mt-4 rounded-full"></div>{" "}
              </div>
            ))}{" "}
          </div>
        ) : (
          <div className="text-center py-8 sm:py-12">
            {" "}
            <div className="mx-auto w-16 h-16 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              {" "}
              <Building className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400" />{" "}
            </div>{" "}
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
              No Properties Found
            </h3>{" "}
            <p className="text-gray-600 text-sm sm:text-base">
              {" "}
              There are currently no properties available to display.{" "}
            </p>{" "}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PropertiesList;
