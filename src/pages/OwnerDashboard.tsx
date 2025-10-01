import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building,
  Eye,
  Heart,
  DollarSign,
  Plus,
  MessageCircle,
  Info,
  User,
  AlertCircle,
  CheckCircle,
  XCircle,
  IndianRupee,
  MapPin,
  MessageSquare,
} from "lucide-react";
import { toast, useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DialogFooter } from "@/components/ui/dialog";

import { PropertyCard } from "./PropertyCard";
import UnifiedPopup from "@/components/UnifiedPopup";

const OwnerDashboard = () => {
  const { toast } = useToast();

  const handleAddProperty = () => {
    toast.success("Redirecting to add property page...");
    window.location.href = "/add-property";
  };

  const handleMessage = (inquiry: string) => {
    toast.success(`Opening chat for ${inquiry}...`);
    // Open messaging interface
  };

  const handleViewProperties = () => {
    toast.success("Loading your properties...");
    // Navigate to properties page
  };

  const handleViewViews = () => {
    toast.success("Loading property views analytics...");
    // Navigate to analytics page
  };

  const handleViewInterested = () => {
    toast.success("Loading interested buyers list...");
    // Navigate to interested buyers page
  };

  const handleViewRevenue = () => {
    toast.success("Loading revenue report...");
    // Navigate to revenue page
  };

  const [GrievanceData, setGrievanceData] = useState([]);
  const [grievanceOpen, setGrievanceOpen] = useState(false);
  const [SelectedGrievance, setSelectedGrievance] = useState(null);
  const [grievanceDataEditMode, setGrievanceDataEditMode] = useState(false);

  const fetchGrievances = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch("http://127.0.0.1:8000/api/grievances/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const grievances = await response.json();
        setGrievanceData(grievances);
        console.log(grievances);
        toast.success("grievances data fetched successfully");
      } else {
        toast.error("Failed to fetch grievances data");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        "Failed to fetch grievances data  because of method is wrong"
      );
    }
  };

  useEffect(() => {
    fetchGrievances();
  }, []);

  // Grievance Edit

  const [grievanceEdit, setGrievanceEdit] = useState({
    user: "",
    category: "",
    priority: "",
    property_id: "",
    transaction_id: "",
    evidence: null,
  });

  const handleGrievanceEditChange = (field, value) => {
    setGrievanceEdit((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGrievanceEdit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setGrievanceEdit((prev) => ({
      ...prev,
      evidence: file,
    }));
  };

  const handleGrievanceEditSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `http://127.0.0.1:8000/api/grievances/${SelectedGrievance.slug}/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(grievanceEdit),
        }
      );
      if (response.ok) {
        const grievanceUpdate = await response.json();
        console.log(grievanceUpdate);
        setSelectedGrievance(grievanceUpdate);
        setGrievanceDataEditMode(false);
        // optionatly refresh the customer data list
        setGrievanceData((prev) =>
          prev.map((grievance) =>
            grievance.slug === grievanceUpdate.slug
              ? grievanceUpdate
              : grievance
          )
        );
        toast.success("grievances data updated successfully");
      } else {
        console.log("Failed to update grievances data");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        "Failed to update grievances data because of method is wrong"
      );
    }
  };

  // Grievance Delete

  const handleGrievanceDelete = async (slug: string) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `http://127.0.0.1:8000/api/grievances/${slug}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setGrievanceData((prev) =>
          prev.filter((grievances) => grievances.slug !== slug)
        );
        setGrievanceOpen(false);
        toast.success("grievances data deleted successfully");
      } else {
        toast.error("Failed to delete grievances data");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        "Failed to delete grievances data because of method is wrong"
      );
    }
  };

  const PropertiesList = () => {
    const { toast } = useToast();
    const [propertiesLoading, setPropertiesLoading] = useState(true);
    const [properties, setProperties] = useState<Property[]>([]);

    interface Property {
      id: number;
      title: string;
      location: string;
      category: string;
      price: number | string;
      property_status: string;
      rera_approved: boolean;
      listed_on: string;
    }

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
        } else {
          console.error("Failed to fetch properties:", response.status);
          toast.error("Failed to fetch properties.");
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
        toast.error("An error occurred while fetching properties.");
      } finally {
        setPropertiesLoading(false);
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
          {propertiesLoading ? (
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
                      {/* Image on the left */}
                      <div className="relative flex-shrink-0">
                        <img
                          src={"/delhi.jpg"}
                          alt={property.title}
                          className="w-16 h-16 object-cover rounded-lg border-2 border-gray-200 group-hover:border-blue-300 transition-colors duration-300 shadow-sm"
                        />
                        {/* RERA icon above image */}
                        <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5 shadow-sm">
                          {property.rera_approved ? (
                            <CheckCircle className="h-2.5 w-2.5 text-emerald-500" />
                          ) : (
                            <XCircle className="h-2.5 w-2.5 text-red-500" />
                          )}
                        </div>
                        {/* Listed On below image */}
                        <span className="text-xs text-gray-500 block text-center mt-1">
                          {new Date(property.listed_on).toLocaleDateString()}
                        </span>
                      </div>

                      {/* Details to the right of the image */}
                      <div className="flex-1 min-w-0 space-y-1">
                        {/* Category */}
                        <Badge
                          variant="secondary"
                          className={`px-2 py-1 text-xs font-medium ${getCategoryColor(
                            property.category
                          )}`}
                        >
                          {property.category}
                        </Badge>

                        {/* Status */}
                        <Badge
                          variant="outline"
                          className={`px-2 py-1 text-xs font-medium border-0 ${getStatusColor(
                            property.property_status
                          )}`}
                        >
                          {property.property_status}
                        </Badge>

                        {/* Price */}
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
                    </div>

                    {/* Title and Location at the very bottom */}
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <h3 className="font-bold text-base text-gray-900 mb-1 group-hover:text-blue-700 transition-colors duration-200 truncate">
                        {property.title}
                      </h3>
                      <div className="flex items-center gap-1 text-gray-600">
                        <MapPin className="h-3 w-3 text-gray-400 flex-shrink-0" />
                        <span className="text-xs font-medium truncate">
                          {property.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Desktop Layout */}
                  <div className="hidden sm:flex items-start gap-5">
                    <div className="relative flex-shrink-0">
                      <img
                        src={"/delhi.jpg"}
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
                          <div className="flex flex-col items-end">
                            <div className="flex items-center gap-1 justify-end">
                              <IndianRupee className="h-4 w-4 text-green-600" />
                              <span className="font-bold text-lg text-green-700">
                                {typeof property.price === "number"
                                  ? formatPrice(property.price).replace("₹", "")
                                  : property.price}
                              </span>
                            </div>
                            <span className="text-xs text-gray-500">
                              {new Date(
                                property.listed_on
                              ).toLocaleDateString()}
                            </span>
                          </div>
                          <Badge
                            variant="secondary"
                            className={`px-3 py-1 font-medium ${getCategoryColor(
                              property.category
                            )}`}
                          >
                            {property.category}
                          </Badge>
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
                              RERA Approved
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="px-3 py-1 font-medium bg-red-100 text-red-800 hover:bg-red-200 border-0"
                            >
                              Not RERA Approved
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 mt-3 sm:mt-4 rounded-full"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 sm:py-12">
              <div className="mx-auto w-16 h-16 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Building className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                No Properties Found
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                There are currently no properties available to display.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between  items-center">
          <h1 className="text-xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-400">
            Owner Dashboard
          </h1>
          <Button
            className="bg-purple-600 hover:bg-purple-700 text-white p-2 px-3 rounded-full"
            title="Add Property"
            onClick={handleAddProperty}
          >
            <Plus className=" h-4 w-4" />
            <span className="hidden sm:visible">Add Property</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card
            className="card-hover cursor-pointer"
            onClick={handleViewProperties}
          >
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="mr-2 h-5 w-5" />
                My Properties
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">8</div>
              <Badge className="bg-success text-success-foreground">
                2 sold
              </Badge>
            </CardContent>
          </Card>

          <Card className="card-hover cursor-pointer" onClick={handleViewViews}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="mr-2 h-5 w-5" />
                Total Views
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">1,247</div>
              <Badge className="bg-success text-success-foreground">+15%</Badge>
            </CardContent>
          </Card>

          <Card
            className="card-hover cursor-pointer"
            onClick={handleViewInterested}
          >
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="mr-2 h-5 w-5" />
                Interested Buyers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">34</div>
              <Badge className="bg-warning text-warning-foreground">
                8 new
              </Badge>
            </CardContent>
          </Card>

          <Card
            className="card-hover cursor-pointer"
            onClick={handleViewRevenue}
          >
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="mr-2 h-5 w-5" />
                Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">₹45L</div>
              <Badge className="bg-success text-success-foreground">
                Last 6 months
              </Badge>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle>Property Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">3BHK Apartment - Bandra</p>
                    <p className="text-sm text-muted-foreground">
                      156 views this week
                    </p>
                  </div>
                  <Badge className="bg-success text-success-foreground">
                    Hot
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Villa - Goa</p>
                    <p className="text-sm text-muted-foreground">
                      89 views this week
                    </p>
                  </div>
                  <Badge variant="secondary">Good</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-gradient">
            <CardHeader>
              <CardTitle>Recent Inquiries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Site visit request</p>
                    <p className="text-sm text-muted-foreground">
                      For Bandra Apartment
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleMessage("price negotiation")}
                  >
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Price negotiation</p>
                    <p className="text-sm text-muted-foreground">
                      For Pune Flat
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleMessage("site visit request")}
                  >
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Grievance fetched data card */}
        <Card className="card-gradient shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="">
            <div className="flex items-center gap-2">
              <Info className="h-6 w-6 text-purple-600" />
              <CardTitle>Grievance</CardTitle>
            </div>
          </CardHeader>

          <CardContent className="grid lg:grid-cols-1 md:grid-cols-2 gap-4">
            {GrievanceData &&
              GrievanceData.map((grievances, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      setSelectedGrievance(grievances);
                      setGrievanceEdit(grievances);
                      setGrievanceOpen(true);
                    }}
                    className=" border rounded-lg   flex justify-between p-4   bg-card/50 hover:bg-muted/50 transition-all duration-300 cursor-pointer shadow-sm hover:scale-[1.02]"
                  >
                    <div>
                      <p className=" font-semibold">{grievances.title}</p>
                      <p className="text-gray-500">{grievances.status}</p>
                    </div>
                    <div className="text-end">
                      <p className="border rounded-full bg-red-300 text-center">
                        {grievances.priority}
                      </p>
                      <p>
                        {new Date(grievances.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                );
              })}
          </CardContent>
        </Card>

        {/* Grievance Edit and Delete */}
        {/* Grievance Edit and Delete */}
        <Dialog open={grievanceOpen} onOpenChange={setGrievanceOpen}>
          <DialogContent className="max-w-[95vw] sm:max-w-md max-h-[90vh] my-4 sm:my-8 overflow-y-auto p-4 sm:p-6">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Info className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                Grievance Details
              </DialogTitle>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto px-1 sm:px-4 py-2 sm:py-4">
              {SelectedGrievance && (
                <div className="space-y-4">
                  {grievanceDataEditMode ? (
                    // Edit Mode
                    <form onSubmit={handleGrievanceEditSubmit}>
                      <div className="grid grid-cols-1 gap-3 sm:gap-4">
                        {/* User ID */}
                        <div className="space-y-2">
                          <Label
                            htmlFor="user"
                            className="text-xs sm:text-sm font-medium"
                          >
                            User ID
                          </Label>
                          <Input
                            id="user"
                            name="user"
                            value={grievanceEdit.user}
                            onChange={handleInputChange}
                            className="w-full text-sm"
                          />
                        </div>

                        {/* Category */}
                        <div className="space-y-2">
                          <Label
                            htmlFor="category"
                            className="text-xs sm:text-sm font-medium"
                          >
                            Category *
                          </Label>
                          <Select
                            value={grievanceEdit.category}
                            onValueChange={(value) =>
                              handleGrievanceEditChange("category", value)
                            }
                          >
                            <SelectTrigger className="w-full text-sm">
                              <SelectValue placeholder="Select grievance category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Service Quality">
                                Service Quality
                              </SelectItem>
                              <SelectItem value="Documentation">
                                Documentation Issues
                              </SelectItem>
                              <SelectItem value="Technical">
                                Technical Problems
                              </SelectItem>
                              <SelectItem value="Payment">
                                Payment Issues
                              </SelectItem>
                              <SelectItem value="Agent Behavior">
                                Agent Behavior
                              </SelectItem>
                              <SelectItem value="Property Listing">
                                Property Listing
                              </SelectItem>
                              <SelectItem value="Legal Documentation">
                                Legal Documentation
                              </SelectItem>
                              <SelectItem value="Site Visit">
                                Site Visit Issues
                              </SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Priority Level */}
                        <div className="space-y-2">
                          <Label
                            htmlFor="priority"
                            className="text-xs sm:text-sm font-medium"
                          >
                            Priority Level
                          </Label>
                          <Select
                            value={grievanceEdit.priority}
                            onValueChange={(value) =>
                              handleGrievanceEditChange("priority", value)
                            }
                          >
                            <SelectTrigger className="w-full text-sm">
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="urgent">Urgent</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Title */}
                        <div className="space-y-2">
                          <Label
                            htmlFor="title"
                            className="text-xs sm:text-sm font-medium"
                          >
                            Grievance Title *
                          </Label>
                          <Input
                            id="title"
                            name="title"
                            type="text"
                            value={grievanceEdit.title}
                            onChange={handleInputChange}
                            className="w-full text-sm"
                          />
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                          <Label
                            htmlFor="description"
                            className="text-xs sm:text-sm font-medium"
                          >
                            Detailed Description *
                          </Label>
                          <Textarea
                            id="description"
                            name="description"
                            value={grievanceEdit.description}
                            onChange={handleInputChange}
                            rows={3}
                            className="w-full resize-none text-sm"
                          />
                        </div>

                        {/* Property ID */}
                        <div className="space-y-2">
                          <Label
                            htmlFor="property_id"
                            className="text-xs sm:text-sm font-medium"
                          >
                            Property ID
                          </Label>
                          <Input
                            id="property_id"
                            name="property_id"
                            type="text"
                            value={grievanceEdit.property_id}
                            onChange={handleInputChange}
                            className="w-full text-sm"
                          />
                        </div>

                        {/* Transaction ID */}
                        <div className="space-y-2">
                          <Label
                            htmlFor="transaction_id"
                            className="text-xs sm:text-sm font-medium"
                          >
                            Transaction ID
                          </Label>
                          <Input
                            id="transaction_id"
                            name="transaction_id"
                            type="text"
                            value={grievanceEdit.transaction_id}
                            onChange={handleInputChange}
                            className="w-full text-sm"
                          />
                        </div>

                        {/* Evidence */}
                        <div className="space-y-2">
                          <Label
                            htmlFor="evidence"
                            className="text-xs sm:text-sm font-medium"
                          >
                            Supporting Evidence (Optional)
                          </Label>
                          <Input
                            id="evidence"
                            type="file"
                            onChange={handleFileChange}
                            className="w-full text-sm"
                          />
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-3 border-t mt-4 flex flex-col sm:flex-row justify-end gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setGrievanceDataEditMode(false)}
                            className="w-full sm:w-auto text-sm"
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white text-sm"
                          >
                            Save Changes
                          </Button>
                        </div>
                      </div>
                    </form>
                  ) : (
                    // View Mode
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-3 sm:gap-4">
                        {/* User ID */}
                        <div className="p-2 sm:p-3 border rounded-lg">
                          <div className="flex items-start gap-2">
                            <User className="h-4 w-4 text-purple-600 flex-shrink-0 mt-1" />
                            <div className="flex flex-col w-full">
                              <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                                User ID
                              </span>
                              <p className="text-sm sm:text-base font-medium break-words mt-1">
                                {SelectedGrievance.user || "N/A"}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Category */}
                        <div className="p-2 sm:p-3 border rounded-lg">
                          <div className="flex items-start gap-2">
                            <Building className="h-4 w-4 text-purple-600 flex-shrink-0 mt-1" />
                            <div className="flex flex-col w-full">
                              <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                                Category
                              </span>
                              <p className="text-sm sm:text-base font-medium break-words mt-1">
                                {SelectedGrievance.category || "N/A"}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Priority Level */}
                        <div className="p-2 sm:p-3 border rounded-lg">
                          <div className="flex items-start gap-2">
                            <AlertCircle className="h-4 w-4 text-purple-600 flex-shrink-0 mt-1" />
                            <div className="flex flex-col w-full">
                              <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                                Priority Level
                              </span>
                              <p className="text-sm sm:text-base font-medium break-words mt-1">
                                {SelectedGrievance.priority || "N/A"}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Title */}
                        <div className="p-2 sm:p-3 border rounded-lg">
                          <div className="flex items-start gap-2">
                            <MessageSquare className="h-4 w-4 text-purple-600 flex-shrink-0 mt-1" />
                            <div className="flex flex-col w-full">
                              <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                                Grievance Title
                              </span>
                              <p className="text-sm sm:text-base font-medium break-words mt-1">
                                {SelectedGrievance.title || "N/A"}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <div className="p-2 sm:p-3 border rounded-lg">
                          <div className="flex items-start gap-2 mb-2">
                            <MessageCircle className="h-4 w-4 text-purple-600 flex-shrink-0 mt-1" />
                            <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                              Detailed Description
                            </span>
                          </div>
                          <div className="bg-muted/30 p-2 sm:p-3 rounded-lg max-h-32 sm:max-h-40 overflow-y-auto">
                            <p className="text-xs sm:text-sm break-words whitespace-pre-wrap">
                              {SelectedGrievance.description || "N/A"}
                            </p>
                          </div>
                        </div>

                        {/* Property ID */}
                        <div className="p-2 sm:p-3 border rounded-lg">
                          <div className="flex items-start gap-2 mb-2">
                            <Building className="h-4 w-4 text-purple-600 flex-shrink-0 mt-1" />
                            <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                              Property ID
                            </span>
                          </div>
                          <div className="bg-muted/30 p-2 sm:p-3 rounded-lg">
                            <p className="text-xs sm:text-sm break-words whitespace-pre-wrap">
                              {SelectedGrievance.property_id || "N/A"}
                            </p>
                          </div>
                        </div>

                        {/* Transaction ID */}
                        <div className="p-2 sm:p-3 border rounded-lg">
                          <div className="flex items-start gap-2 mb-2">
                            <Building className="h-4 w-4 text-purple-600 flex-shrink-0 mt-1" />
                            <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                              Transaction ID
                            </span>
                          </div>
                          <div className="bg-muted/30 p-2 sm:p-3 rounded-lg">
                            <p className="text-xs sm:text-sm break-words whitespace-pre-wrap">
                              {SelectedGrievance.transaction_id || "N/A"}
                            </p>
                          </div>
                        </div>

                        {/* Evidence */}
                        <div className="p-2 sm:p-3 border rounded-lg">
                          <div className="flex items-start gap-2 mb-2">
                            <Building className="h-4 w-4 text-purple-600 flex-shrink-0 mt-1" />
                            <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                              Evidence
                            </span>
                          </div>
                          <div className="bg-muted/30 p-2 sm:p-3 rounded-lg">
                            <p className="text-xs sm:text-sm break-words whitespace-pre-wrap">
                              {SelectedGrievance.evidence || "N/A"}
                            </p>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-3 border-t mt-4 flex flex-col sm:flex-row justify-end gap-2">
                          <Button
                            variant="destructive"
                            onClick={() =>
                              handleGrievanceDelete(SelectedGrievance.slug)
                            }
                            className="w-full sm:w-auto text-sm"
                          >
                            Delete Grievance
                          </Button>
                          <Button
                            variant="default"
                            onClick={() => {
                              setGrievanceEdit(SelectedGrievance);
                              setGrievanceDataEditMode(true);
                            }}
                            className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white text-sm"
                          >
                            Edit Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
        <PropertiesList />
      </div>
    </div>
  );
};

export default OwnerDashboard;
