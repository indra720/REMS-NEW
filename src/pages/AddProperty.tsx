import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Upload,
  MapPin,
  Building,
  Bed,
  Bath,
  Square,
  DollarSign,
  Camera,
  FileText,
  Sparkles,
  Save,
  Eye,
  CheckCircle,
  AlertCircle,
  X,
} from "lucide-react";
import axios from "../lib/api";
import { useNavigate } from "react-router-dom";

const AddProperty = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [propertyTypes, setPropertyTypes] = useState<any[]>([]);

  // New state for submission progress
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionProgress, setSubmissionProgress] = useState(0);
  const [submissionMessage, setSubmissionMessage] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    property_type: "",
    category: "",
    location: "",
    latitude: "",
    longitude: "",
    area_sqft: "",
    price: "",
    price_per_sqft: "",
    bedrooms: "",
    bathrooms: "",
    balconies: "",
    furnishing: "",
    floor_no: "",
    total_floors: "",
    availability_status: "",
    possession_date: "",
    age_of_property: "",
    ownership_type: "",
    rera_approved: false,
    maintenance_cost: "",
    property_status: "",
    amenities: [] as string[],
  });

  const steps = [
    { title: "Basic Info", icon: Building },
    { title: "Property Details", icon: Square },
    { title: "Location", icon: MapPin },
    { title: "Images & Documents", icon: Camera },
    { title: "Pricing", icon: DollarSign },
    { title: "Review", icon: Eye },
  ];

  const amenitiesList = [
    "Swimming Pool",
    "Gym",
    "Parking",
    "Garden",
    "Security",
    "Elevator",
    "Power Backup",
    "Water Supply",
    "Internet",
    "Balcony",
    "Terrace",
    "Maintenance",
  ];

  const [documentFiles, setDocumentFiles] = useState<File[]>([]);
  const [uploadedDocuments, setUploadedDocuments] = useState<
    { name: string; file: File }[]
  >([]);

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setDocumentFiles((prev) => [...prev, ...fileArray]);

      const docArray = fileArray.map((file) => ({ name: file.name, file }));
      setUploadedDocuments((prev) => [...prev, ...docArray]);
    }
  };

  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setImageFiles((prev) => [...prev, ...fileArray]);

      fileArray.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setUploadedImages((prev) => [...prev, e.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleAmenityChange = (amenity: string) => {
    setFormData((prev) => {
      const newAmenities = prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity];
      return { ...prev, amenities: newAmenities };
    });
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (imageFiles.length === 0) {
      // toast.error("Please upload at least one image");
      return;
    }

    if (!formData.ownership_type) {
      // toast.error("Please select an ownership type.");
      return;
    }

    setIsSubmitting(true);
    setSubmissionProgress(0);

    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        // toast.error("Authentication Error");
        setIsSubmitting(false);
        return;
      }

      const totalSteps =
        1 +
        (imageFiles.length > 0 ? 1 : 0) +
        (formData.amenities.length > 0 ? 1 : 0) +
        (documentFiles.length > 0 ? 1 : 0);
      let completedSteps = 0;

      // Step 1: Create Property
      setSubmissionMessage("Creating property listing...");
      setSubmissionProgress(++completedSteps / totalSteps * 100);

      const pricePerSqft =
        formData.price_per_sqft ||
        (formData.price && formData.area_sqft
          ? Math.round(
              parseInt(formData.price) / parseInt(formData.area_sqft)
            ).toString()
          : "0");

      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key !== "amenities" && formData[key]) {
            const value = key === 'rera_approved' ? (formData[key] ? 'true' : 'false') : formData[key];
            formDataToSend.append(key, value as string);
        }
      });
      formDataToSend.set("price_per_sqft", pricePerSqft);
      if (!formData.maintenance_cost) {
        formDataToSend.set("maintenance_cost", "0");
      }

      const propertyResponse = await axios.post(
        "/properties/",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const propertySlug = propertyResponse.data.slug;

      // Step 2: Upload Images
      if (imageFiles.length > 0) {
        setSubmissionMessage(`Uploading ${imageFiles.length} images...`);
        setSubmissionProgress(++completedSteps / totalSteps * 100);
        for (let i = 0; i < imageFiles.length; i++) {
          const imageFormData = new FormData();
          imageFormData.append("property_slug", propertySlug);
          imageFormData.append("image", imageFiles[i]);
          imageFormData.append("is_primary", i === 0 ? "true" : "false");
          imageFormData.append("caption", `Image ${i + 1}`);
          await axios.post(
            "/property-images/",
            imageFormData,
          );
        }
      }

      // Step 3: Upload Amenities
      if (formData.amenities.length > 0) {
        setSubmissionMessage(`Adding ${formData.amenities.length} amenities...`);
        setSubmissionProgress(++completedSteps / totalSteps * 100);
        for (const amenity of formData.amenities) {
          await axios.post(
            "/property-amenities/",
            { property_slug: propertySlug, amenity: amenity },
          );
        }
      }

      // Step 4: Upload Documents
      if (documentFiles.length > 0) {
        setSubmissionMessage(`Uploading ${documentFiles.length} documents...`);
        setSubmissionProgress(++completedSteps / totalSteps * 100);
        for (let i = 0; i < documentFiles.length; i++) {
          const docFormData = new FormData();
          docFormData.append("property_slug", propertySlug);
          docFormData.append("document_file", documentFiles[i]);
          docFormData.append("document_type", `Document ${i + 1}`);
          await axios.post(
            "/property-documents/",
            docFormData,
          );
        }
      }

      setSubmissionMessage("Property published successfully!");
      setSubmissionProgress(100);
      // toast.success("Property created successfully with all media!");
      
      setTimeout(() => {
        navigate(`/search`);
      }, 1500);

    } catch (error: any) {
      console.error("Error creating property:", error);
      if (error.response) {
        // console.error("Error response:", error.response.data);
        // toast.error(
        //   `Failed to create property: ${
        //     error.response.data.message || "Unknown error"
        //   }`
        // );
      } else {
        // toast.error("Failed to create property. Please try again.");
      }
      setIsSubmitting(false);
    }
  };

  const fetchPropertyTypes = async () => {
    try {
      const response = await axios.get(
        "/property-types/",
        { withCredentials: false }
      );

      // console.log("Property Types Response:", response.data);
      setPropertyTypes(response.data);
    } catch (error: any) {
      // console.error("Failed to fetch property types:", error);

      if (error.response?.status === 401) {
        // toast.error("Session expired. Please login again.");
        localStorage.removeItem("access_token");
      } else if (error.response?.status === 403) {
        // toast.error("Access denied. Check permissions.");
      } else if (error.response?.status >= 500) {
        // toast.error("Server error. Please try again later.");
      } else {
        // toast.error("Failed to load property types.");
      }
    }
  };

  useEffect(() => {
    fetchPropertyTypes();
  }, []);

  const fallbackPropertyTypes = [
    { id: 1, name: "Apartment" },
    { id: 2, name: "Villa" },
    { id: 3, name: "Plot" },
    { id: 4, name: "Commercial" },
  ];

  const generateAIDescription = () => {
    const aiDescription = `Beautiful ${
      formData.bedrooms
    } bedroom ${formData.property_type.toLowerCase()} 
    spanning ${
      formData.area_sqft
    } sq ft in a prime location. This property offers modern amenities and 
    excellent connectivity. Perfect for families looking for comfort and convenience in a prime location.`;

    setFormData((prev) => ({ ...prev, description: aiDescription }));
  };

  const getSuggestedPrice = () => {
    const basePrice = parseInt(formData.area_sqft) * 25000;
    return basePrice.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-background">
      {isSubmitting && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center px-4">
          <div className="bg-card p-8 rounded-lg shadow-2xl w-full max-w-md">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
                Publishing Your Listing
              </h2>
              <p className="text-muted-foreground mb-6">
                {submissionMessage}
              </p>
              <Progress value={submissionProgress} className="mb-4" />
              {submissionProgress === 100 ? (
                <CheckCircle className="h-16 w-16 text-success mx-auto animate-pulse" />
              ) : (
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto"></div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Header */}
      <div className="bg-purple-600/5 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-200 mb-2">
            Add New Property
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            Create a comprehensive listing with our AI-powered tools
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Progress Sidebar */}
          <div className="lg:col-span-1">
            <Card className="card-gradient sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Progress</CardTitle>
                <Progress
                  value={(currentStep / (steps.length - 1)) * 100}
                  className="mt-2 [&>div]:bg-purple-600"
                />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {steps.map((step, index) => (
                    <div
                      key={index}
                      className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all ${
                        index === currentStep
                          ? "bg-purple-600 text-white shadow-lg"
                          : index < currentStep
                          ? "bg-success/10 text-success"
                          : "bg-muted/50 text-muted-foreground hover:bg-muted"
                      }`}
                      onClick={() => setCurrentStep(index)}
                    >
                      <div
                        className={`p-2 rounded-full ${
                          index === currentStep
                            ? "bg-purple-200"
                            : index < currentStep
                            ? "bg-success/20"
                            : "bg-muted/20"
                        }`}
                      >
                        {index < currentStep ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <step.icon className="h-4 w-4" />
                        )}
                      </div>
                      <span className="font-medium text-sm sm:text-base">{step.title}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Form */}
          <div className="lg:col-span-3">
            <Card className="card-gradient">
              <CardContent className="p-4 sm:p-8">
                {/* Step 0: Basic Info */}
                {currentStep === 0 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <Building className="h-12 w-12 mx-auto text-purple-600 mb-4" />
                      <h2 className="text-xl sm:text-2xl font-bold">
                        Basic Property Information
                      </h2>
                      <p className="text-muted-foreground">
                        Let's start with the essentials
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <Label htmlFor="title">Property Title *</Label>
                        <Input
                          id="title"
                          placeholder="e.g., Luxury 3BHK Apartment in Ban dra"
                          value={formData.title}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              title: e.target.value,
                            }))
                          }
                          className="mt-2"
                        />
                      </div>

                      {/* property type */}
                      <div>
                        <Label htmlFor="property_type">Property Type *</Label>
                        <Select
                          value={formData.property_type}
                          onValueChange={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              property_type: value,
                            }))
                          }
                        >
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select property type" />
                          </SelectTrigger>
                          <SelectContent>
                            {propertyTypes.length === 0 ? (
                              <SelectItem value="loading" disabled>
                                Loading property types...
                              </SelectItem>
                            ) : (
                              propertyTypes.map((pt) => (
                                <SelectItem
                                  key={pt.id}
                                  value={pt.id.toString()}
                                >
                                  {pt.name}
                                </SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="category">Listing Category *</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              category: value,
                            }))
                          }
                        >
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="For Sale, Rent or Lease" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Sale">💰 For Sale</SelectItem>
                            <SelectItem value="Rent">🏠 For Rent</SelectItem>
                            <SelectItem value="Lease">📋 Lease</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="md:col-span-2">
                        <div className="flex items-center justify-between mb-2">
                          <Label htmlFor="description">
                            Property Description
                          </Label>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={generateAIDescription}
                            className="text-xs"
                          >
                            <Sparkles className="h-3 w-3 mr-1" />
                            AI Generate
                          </Button>
                        </div>
                        <Textarea
                          id="description"
                          placeholder="Describe your property's key features, location benefits, and unique selling points..."
                          value={formData.description}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              description: e.target.value,
                            }))
                          }
                          className="min-h-32"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <Label className="text-base font-medium">
                          Amenities
                        </Label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                          {amenitiesList.map((amenity) => (
                            <div
                              key={amenity}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={amenity}
                                checked={formData.amenities.includes(amenity)}
                                onCheckedChange={() =>
                                  handleAmenityChange(amenity)
                                }
                              />
                              <Label htmlFor={amenity} className="font-normal text-sm sm:text-base">
                                {amenity}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {formData.amenities.length > 0 && (
                        <div className="md:col-span-2">
                          <Label className="text-sm font-medium mb-2 block">
                            Selected Amenities:
                          </Label>
                          <div className="flex flex-wrap gap-2">
                            {formData.amenities.map((amenity) => (
                              <Badge
                                key={amenity}
                                variant="secondary"
                                className="px-3 py-1"
                              >
                                {amenity}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-4 w-4 p-0 ml-2 hover:bg-transparent"
                                  onClick={() => handleAmenityChange(amenity)}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 1: Property Details */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <Square className="h-12 w-12 mx-auto text-purple-600 mb-4" />
                      <h2 className="text-xl sm:text-2xl font-bold">
                        Property Specifications
                      </h2>
                      <p className="text-muted-foreground">
                        Detailed property measurements and features
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div>
                        <Label htmlFor="area_sqft">Total Area (sq ft) *</Label>
                        <Input
                          id="area_sqft"
                          type="number"
                          placeholder="1200"
                          value={formData.area_sqft}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              area_sqft: e.target.value,
                            }))
                          }
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="bedrooms">Bedrooms *</Label>
                        <Input
                          id="bedrooms"
                          type="number"
                          placeholder="3"
                          value={formData.bedrooms}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              bedrooms: e.target.value,
                            }))
                          }
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="bathrooms">Bathrooms *</Label>
                        <Input
                          id="bathrooms"
                          type="number"
                          placeholder="2"
                          value={formData.bathrooms}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              bathrooms: e.target.value,
                            }))
                          }
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="balconies">Balconies *</Label>
                        <Input
                          id="balconies"
                          type="number"
                          placeholder="1"
                          value={formData.balconies}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              balconies: e.target.value,
                            }))
                          }
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="floor_no">Floor No. *</Label>
                        <Input
                          id="floor_no"
                          type="number"
                          placeholder="5"
                          value={formData.floor_no}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              floor_no: e.target.value,
                            }))
                          }
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="total_floors">Total Floors *</Label>
                        <Input
                          id="total_floors"
                          type="number"
                          placeholder="12"
                          value={formData.total_floors}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              total_floors: e.target.value,
                            }))
                          }
                          className="mt-2"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                      <div>
                        <Label htmlFor="furnishing">Furnishing Status *</Label>
                        <Select
                          value={formData.furnishing}
                          onValueChange={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              furnishing: value,
                            }))
                          }
                        >
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select furnishing" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Furnished">Furnished</SelectItem>
                            <SelectItem value="Semi-Furnished">
                              Semi-Furnished
                            </SelectItem>
                            <SelectItem value="Unfurnished">
                              Unfurnished
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="availability_status">
                          Availability *
                        </Label>
                        <Select
                          value={formData.availability_status}
                          onValueChange={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              availability_status: value,
                            }))
                          }
                        >
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select availability" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Ready to Move">
                              Ready to Move
                            </SelectItem>
                            <SelectItem value="Under Construction">
                              Under Construction
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="ownership_type">Ownership Type *</Label>
                        <Select
                          value={formData.ownership_type}
                          onValueChange={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              ownership_type: value,
                            }))
                          }
                        >
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select ownership" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Freehold">Freehold</SelectItem>
                            <SelectItem value="Leasehold">Leasehold</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="property_status">
                          Property Status *
                        </Label>
                        <Select
                          value={formData.property_status}
                          onValueChange={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              property_status: value,
                            }))
                          }
                        >
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Sold">Sold</SelectItem>
                            <SelectItem value="Rented">Rented</SelectItem>
                            <SelectItem value="Inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="age_of_property">
                          Age of Property (years) *
                        </Label>
                        <Input
                          id="age_of_property"
                          placeholder="5"
                          value={formData.age_of_property}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              age_of_property: e.target.value,
                            }))
                          }
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="possession_date">
                          Possession Date *
                        </Label>
                        <Input
                          id="possession_date"
                          type="date"
                          value={formData.possession_date}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              possession_date: e.target.value,
                            }))
                          }
                          className="mt-2"
                        />
                      </div>
                    </div>
                    <div className="pt-6 flex items-center space-x-2">
                      <Checkbox
                        id="rera_approved"
                        checked={formData.rera_approved}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({
                            ...prev,
                            rera_approved: !!checked,
                          }))
                        }
                      />
                      <Label htmlFor="rera_approved">RERA Approved</Label>
                    </div>
                  </div>
                )}

                {/* Step 2: Location */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <MapPin className="h-12 w-12 mx-auto text-purple-600 mb-4" />
                      <h2 className="text-xl sm:text-2xl font-bold">Property Location</h2>
                      <p className="text-muted-foreground">
                        Specify the exact location details
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <Label htmlFor="location">
                          Full Address / Location *
                        </Label>
                        <Textarea
                          id="location"
                          placeholder="Building name, street address, landmark..."
                          value={formData.location}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              location: e.target.value,
                            }))
                          }
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="latitude">Latitude *</Label>
                        <Input
                          id="latitude"
                          type="number"
                          step="any"
                          placeholder="19.0760"
                          value={formData.latitude}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              latitude: e.target.value,
                            }))
                          }
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="longitude">Longitude *</Label>
                        <Input
                          id="longitude"
                          type="number"
                          step="any"
                          placeholder="72.8777"
                          value={formData.longitude}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              longitude: e.target.value,
                            }))
                          }
                          className="mt-2"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Images & Documents */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <Camera className="h-12 w-12 mx-auto text-purple-600 mb-4" />
                      <h2 className="text-xl sm:text-2xl font-bold">Images & Documents</h2>
                      <p className="text-muted-foreground">
                        Upload high-quality photos and legal documents
                      </p>
                    </div>

                    <Tabs defaultValue="images" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="images">
                          Property Images
                        </TabsTrigger>
                        <TabsTrigger value="documents">
                          Legal Documents
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="images" className="space-y-6">
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                          <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                          <h3 className="text-lg font-medium mb-2">
                            Upload Property Images
                          </h3>
                          <p className="text-muted-foreground mb-4">
                            Add high-quality photos to showcase your property.
                            First image will be the cover photo.
                          </p>
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="image-upload"
                          />
                          <Button
                            variant="outline"
                            className="cursor-pointer"
                            onClick={() =>
                              document.getElementById("image-upload")?.click()
                            }
                          >
                            <Upload className="mr-2 h-4 w-4" />
                            Choose Images
                          </Button>
                          <p className="text-xs text-muted-foreground mt-2">
                            Supported formats: JPG, PNG, WebP (Max 10 images,
                            5MB each)
                          </p>
                        </div>

                        {uploadedImages.length > 0 && (
                          <div>
                            <h4 className="font-medium mb-4">
                              Uploaded Images ({uploadedImages.length})
                            </h4>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                              {uploadedImages.map((image, index) => (
                                <div key={index} className="relative group">
                                  <img
                                    src={image}
                                    alt={`Upload ${index + 1}`}
                                    className="w-full h-24 object-cover rounded-lg border"
                                  />
                                  {index === 0 && (
                                    <Badge className="absolute top-2 left-2 text-xs">
                                      Cover
                                    </Badge>
                                  )}
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={() => {
                                      setUploadedImages((prev) =>
                                        prev.filter((_, i) => i !== index)
                                      );
                                      setImageFiles((prev) =>
                                        prev.filter((_, i) => i !== index)
                                      );
                                    }}
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </TabsContent>

                      <TabsContent value="documents" className="space-y-6">
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                          <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                          <h3 className="text-lg font-medium mb-2">
                            Upload Legal Documents
                          </h3>
                          <p className="text-muted-foreground mb-4">
                            Upload documents like title deed, tax receipts, etc.
                          </p>
                          <input
                            type="file"
                            multiple
                            accept=".pdf"
                            onChange={handleDocumentUpload}
                            className="hidden"
                            id="document-upload"
                          />
                          <Button
                            variant="outline"
                            className="cursor-pointer"
                            onClick={() =>
                              document
                                .getElementById("document-upload")
                                ?.click()
                            }
                          >
                            <Upload className="mr-2 h-4 w-4" />
                            Choose Documents
                          </Button>
                          <p className="text-xs text-muted-foreground mt-2">
                            Supported formats: PDF (Max 5 documents, 10MB each)
                          </p>
                        </div>

                        {uploadedDocuments.length > 0 && (
                          <div>
                            <h4 className="font-medium mb-4">
                              Uploaded Documents ({uploadedDocuments.length})
                            </h4>
                            <div className="space-y-2">
                              {uploadedDocuments.map((doc, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between p-2 border rounded-lg"
                                >
                                  <div className="flex items-center space-x-2">
                                    <FileText className="h-4 w-4" />
                                    <span className="text-sm">{doc.name}</span>
                                  </div>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    className="h-6 w-6 p-0"
                                    onClick={() => {
                                      setUploadedDocuments((prev) =>
                                        prev.filter((_, i) => i !== index)
                                      );
                                      setDocumentFiles((prev) =>
                                        prev.filter((_, i) => i !== index)
                                      );
                                    }}
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="bg-warning/10 p-4 rounded-lg">
                          <div className="flex items-start space-x-3">
                            <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
                            <div>
                              <h4 className="font-medium text-warning">
                                Document Verification
                              </h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                All uploaded documents will be verified by our
                                AI system and legal team. This ensures
                                authenticity and builds trust with potential
                                buyers.
                              </p>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                )}

                {/* Step 4: Pricing */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <DollarSign className="h-12 w-12 mx-auto text-purple-600 mb-4" />
                      <h2 className="text-xl sm:text-2xl font-bold">Property Pricing</h2>
                      <p className="text-muted-foreground">
                        Set competitive pricing with AI assistance
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <Label htmlFor="price">Selling Price (₹) *</Label>
                          <Input
                            id="price"
                            type="number"
                            placeholder="25000000"
                            value={formData.price}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                price: e.target.value,
                              }))
                            }
                            className="mt-2 text-lg"
                          />
                          <p className="text-sm text-muted-foreground mt-1">
                            Price per sq ft: ₹
                            {formData.price && formData.area_sqft
                              ? Math.round(
                                  parseInt(formData.price) /
                                    parseInt(formData.area_sqft)
                                ).toLocaleString()
                              : "0"}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="maintenance_cost">
                              Maintenance (₹/month)
                            </Label>
                            <Input
                              id="maintenance_cost"
                              type="number"
                              placeholder="5000"
                              className="mt-2"
                            />
                          </div>
                          <div>
                            <Label htmlFor="deposit">
                              Security Deposit (₹/month)
                            </Label>
                            <Input
                              id="deposit"
                              type="number"
                              placeholder="500000"
                              className="mt-2"
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center space-x-2 mb-3">
                            <Checkbox id="negotiable" />
                            <Label htmlFor="negotiable">Price Negotiable</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="loan" />
                            <Label htmlFor="loan">Loan Available</Label>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <Card className="bg-purple-100 border-purple-200">
                          <CardHeader>
                            <CardTitle className="text-lg flex items-center">
                              <Sparkles className="mr-2 h-5 w-5 text-purple-600" />
                              AI Price Suggestion
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-center">
                              <p className="text-sm text-muted-foreground mb-2">
                                Recommended Price Range
                              </p>
                              <p className="text-2xl font-bold text-purple-600">
                                ₹
                                {formData.area_sqft ? getSuggestedPrice() : "0"}
                              </p>
                              <p className="text-sm text-muted-foreground mt-1">
                                Based on area, location, and market trends
                              </p>
                            </div>

                            <div className="mt-4 space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Market Average</span>
                                <span>₹22,000/sq ft</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Your Price</span>
                                <span>
                                  ₹
                                  {formData.price && formData.area_sqft
                                    ? Math.round(
                                        parseInt(formData.price) /
                                          parseInt(formData.area_sqft)
                                      ).toLocaleString()
                                    : "0"}
                                  /sq ft
                                </span>
                              </div>
                              <div className="flex justify-between text-sm font-medium">
                                <span>Price Position</span>
                                <span className="text-success">
                                  Competitive
                                </span>
                              </div>
                            </div>

                            <Button
                              variant="outline"
                              className="w-full mt-4"
                              onClick={() => {
                                if (formData.area_sqft) {
                                  setFormData((prev) => ({
                                    ...prev,
                                    price: (
                                      parseInt(formData.area_sqft) * 25000
                                    ).toString(),
                                  }));
                                }
                              }}
                            >
                              Use AI Suggestion
                            </Button>
                          </CardContent>
                        </Card>

                        <Card className="bg-warning/5 border-warning/20">
                          <CardHeader>
                            <CardTitle className="text-lg">
                              💡 Pricing Tips
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="text-sm space-y-2">
                            <p>
                              • Properties priced 5-10% below market rate sell
                              40% faster
                            </p>
                            <p>
                              • Round numbers (₹25L vs ₹24.8L) get more
                              inquiries
                            </p>
                            <p>• Consider nearby comparable properties</p>
                            <p>• Keep room for negotiation (10-15%)</p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 5: Review */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <Eye className="h-12 w-12 mx-auto text-purple-600 mb-4" />
                      <h2 className="text-xl sm:text-2xl font-bold">Review & Publish</h2>
                      <p className="text-muted-foreground">
                        Review your listing before publishing
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Preview */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">
                          Property Preview
                        </h3>
                        <Card className="card-hover">
                          <div className="relative h-48">
                            {uploadedImages.length > 0 ? (
                              <img
                                src={uploadedImages[0]}
                                alt="Property preview"
                                className="w-full h-full object-cover rounded-t-lg"
                              />
                            ) : (
                              <div className="w-full h-full bg-muted rounded-t-lg flex items-center justify-center">
                                <Camera className="h-8 w-8 text-muted-foreground" />
                              </div>
                            )}
                            <Badge className="absolute top-3 left-3 bg-purple-600 text-white">
                              Featured
                            </Badge>
                          </div>
                          <CardContent className="p-4">
                            <h4 className="font-semibold text-lg mb-2">
                              {formData.title || "Property Title"}
                            </h4>
                            <p className="text-muted-foreground text-sm mb-3 flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {formData.location || "Location"}
                            </p>
                            <div className="text-2xl font-bold text-purple-600 mb-3">
                              ₹
                              {formData.price
                                ? parseInt(formData.price).toLocaleString()
                                : "0"}
                            </div>
                            <div className="flex justify-between text-sm text-muted-foreground mb-4">
                              <span className="flex items-center">
                                <Bed className="h-3 w-3 mr-1" />
                                {formData.bedrooms || "0"} Bed
                              </span>
                              <span className="flex items-center">
                                <Bath className="h-3 w-3 mr-1" />
                                {formData.bathrooms || "0"} Bath
                              </span>
                              <span className="flex items-center">
                                <Square className="h-3 w-3 mr-1" />
                                {formData.area_sqft || "0"} sq ft
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                className="flex-1"
                                size="sm"
                              >
                                View Details
                              </Button>
                              <Button className="flex-1 text-white hover:bg-purple-600 bg-purple-600" size="sm">
                                Contact Owner
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Summary */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">
                          Listing Summary
                        </h3>
                        <div className="space-y-4">
                          <Card className="p-4">
                            <h4 className="font-medium mb-2">
                              Basic Information
                            </h4>
                            <div className="space-y-1 text-sm">
                              <p>
                                <span className="text-muted-foreground">
                                  Title:
                                </span>{" "}
                                {formData.title || "Not set"}
                              </p>
                              <p>
                                <span className="text-muted-foreground">
                                  Type:
                                </span>{" "}
                                {formData.property_type || "Not set"}
                              </p>
                              <p>
                                <span className="text-muted-foreground">
                                  Price:
                                </span>{" "}
                                ₹
                                {formData.price
                                  ? parseInt(formData.price).toLocaleString()
                                  : "Not set"}
                              </p>
                            </div>
                          </Card>

                          <Card className="p-4">
                            <h4 className="font-medium mb-2">
                              Property Details
                            </h4>
                            <div className="space-y-1 text-sm">
                              <p>
                                <span className="text-muted-foreground">
                                  Area:
                                </span>{" "}
                                {formData.area_sqft || "Not set"} sq ft
                              </p>
                              <p>
                                <span className="text-muted-foreground">
                                  Bedrooms:
                                </span>{" "}
                                {formData.bedrooms || "Not set"}
                              </p>
                              <p>
                                <span className="text-muted-foreground">
                                  Bathrooms:
                                </span>{" "}
                                {formData.bathrooms || "Not set"}
                              </p>
                            </div>
                          </Card>

                          <Card className="p-4">
                            <h4 className="font-medium mb-2">
                              Media & Documents
                            </h4>
                            <div className="space-y-1 text-sm">
                              <p>
                                <span className="text-muted-foreground">
                                  Images:
                                </span>{" "}
                                {uploadedImages.length} uploaded
                              </p>
                              <p>
                                <span className="text-muted-foreground">
                                  Documents:
                                </span>{" "}
                                {uploadedDocuments.length} uploaded
                              </p>
                            </div>
                          </Card>

                          <div className="pt-4">
                            <div className="flex items-center space-x-2 mb-4">
                              <Checkbox id="terms" />
                              <Label htmlFor="terms" className="text-sm">
                                I agree to the Terms of Service and Privacy
                                Policy
                              </Label>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <Button variant="outline" className="w-full">
                                <Save className="mr-2 h-4 w-4" />
                                Save Draft
                              </Button>
                              <Button
                                className="w-full  bg-purple-600 text-white hover:bg-purple-700"
                                onClick={handleSubmit}
                              >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Publish Listing
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex flex-col-reverse gap-4 sm:flex-row sm:justify-between items-center pt-8 mt-8 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                    className="w-full sm:w-auto"
                  >
                    Previous
                  </Button>

                  <div className="flex flex-col-reverse gap-4 w-full sm:flex-row sm:w-auto sm:gap-3">
                    <Button variant="outline" className="w-full sm:w-auto">
                      <Save className="mr-2 h-4 w-4" />
                      Save Draft
                    </Button>

                    {currentStep < steps.length - 1 ? (
                      <Button
                        onClick={() =>
                          setCurrentStep(
                            Math.min(steps.length - 1, currentStep + 1)
                          )
                        }
                        className="bg-purple-500 hover:bg-purple-600 text-white w-full sm:w-auto"
                      >
                        Next Step
                      </Button>
                    ) : (
                      <Button className="bg-purple-600 text-white hover:bg-purple-700 w-full sm:w-auto" onClick={handleSubmit}>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Publish Property
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddProperty;