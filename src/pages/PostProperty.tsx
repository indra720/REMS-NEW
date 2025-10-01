import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import {
  Upload,
  Camera,
  MapPin,
  Home,
  DollarSign,
  FileText,
  CheckCircle,
  Star,
  AlertCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { showSuccessToast, showErrorToast } from "@/utils/toast";
import axios from "axios";

const PostProperty = () => {
  
  const [propertyType, setPropertyType] = useState(""); // Kept from HEAD
  const [listingType, setListingType] = useState(""); // Kept from HEAD
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isPricePerSqftManuallyEdited, setIsPricePerSqftManuallyEdited] =
    useState(false); // Kept from HEAD
  const [isLoading, setIsLoading] = useState(false); // Added from Incoming
  const [message, setMessage] = useState({ type: "", text: "" }); // Added from Incoming

  const location = useLocation();

  // Form data state
  const [formData, setFormData] = useState({
    listingType: "Sale",
    propertyType: "",
    propertyTitle: "",
    description: "",
    bedrooms: "",
    bathrooms: "",
    balconies: "",
    area: "",
    address: "",
    amenities: [],
    price: "",
    negotiable: "no",
    security: "",
    ownerName: "",
    phone: "",
    email: "",
    terms: false,
    images: [] as File[],
    age_of_property: "",
    availability_status: "",
    floor_no: "",
    furnishing: "",
    latitude: "",
    longitude: "",
    maintenance_cost: "",
    ownership_type: "",
    possession_date: "",
    price_per_sqft: "",
    total_floors: "",
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const title = searchParams.get('title');
    const type = searchParams.get('type');

    if (title || type) {
      setFormData(prev => ({
        ...prev,
        propertyTitle: title || prev.propertyTitle,
        propertyType: type === 'commercial' ? '4' : (type === 'residential' ? '1' : prev.propertyType)
      }));
    }
  }, [location.search]);

  // Show toast-like messages (from Incoming)
  const showMessage = (type: string, text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 5000);
  };

  // Update formData on input change (Kept from HEAD with type safety)
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (id === "price_per_sqft") {
      setIsPricePerSqftManuallyEdited(value !== "");
    }

    if ((id === "price" || id === "area") && value === "") {
      setIsPricePerSqftManuallyEdited(false);
    }

    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  // Amenities handler
  const handleAmenityChange = (amenity: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      amenities: checked
        ? [...prev.amenities, amenity]
        : prev.amenities.filter((a) => a !== amenity),
    }));
  };

  // Select handler (Kept from HEAD with type safety)
  const handleSelectChange = (field: string, value: string) => {
    console.log(`handleSelectChange: field=${field}, value=${value}`);
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // File upload handler (Combined from both)
  const handleFileUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.accept = "image/*";
    input.onchange = (e: any) => {
      const files = Array.from(e.target.files) as File[];
      if (files.length > 10) {
        showMessage("error", "Maximum 10 images allowed");
        return;
      }
      setFormData((prev) => ({
        ...prev,
        images: files,
      }));
      setUploadedImages(
        files.map((file) => ({
          url: URL.createObjectURL(file),
          name: file.name,
        }))
      );
      showMessage("success", `${files.length} images uploaded`);
    };
    input.click();
  };

  // useEffect for price_per_sqft calculation (Kept from HEAD)
  useEffect(() => {
    if (!isPricePerSqftManuallyEdited) {
      const price = parseFloat(formData.price);
      const area = parseFloat(formData.area);

      if (!isNaN(price) && !isNaN(area) && area > 0) {
        const pricePerSqFt = Math.round(price / area);
        setFormData((prev) => ({
          ...prev,
          price_per_sqft: pricePerSqFt.toString(),
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          price_per_sqft: "",
        }));
      }
    }
  }, [formData.price, formData.area, isPricePerSqftManuallyEdited]);

  // Form validation (from Incoming)
  const validateForm = () => {
    const required = [
      "listingType",
      "propertyType",
      "propertyTitle",
      "description",
      "address",
      "price",
      "ownerName",
      "phone",
      "email",
    ];
    const missing = required.filter(
      (field) => !formData[field as keyof typeof formData]
    );

    if (missing.length > 0) {
      showMessage("error", `Please fill: ${missing.join(", ")}`);
      return false;
    }

    if (!formData.terms) {
      showMessage("error", "Please accept terms and conditions");
      return false;
    }

    if (formData.images.length === 0) {
      showMessage("error", "Please upload at least one image");
      return false;
    }

    return true;
  };

  // API Integration on submit (Combined from both)
  const handlePostProperty = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    const formDataToSend = new FormData();

    // Debug: Log form data before sending
    console.log("Form data before API call:", formData);

    const apiPayload = {
      title: formData.propertyTitle,
      description: formData.description,
      category: formData.listingType,
      location: formData.address,
      area_sqft: Number(formData.area) || 0,
      price: formData.price,
      bedrooms: formData.bedrooms ? parseInt(formData.bedrooms, 10) : null,
      bathrooms: formData.bathrooms ? parseInt(formData.bathrooms, 10) : null,
      contact_owner_name: formData.ownerName,
      contact_email: formData.email,
      contact_phone_number: formData.phone,
      price_negotiable: formData.negotiable === "yes",
      terms_and_conditions: formData.terms,
      property_type: formData.propertyType
        ? parseInt(formData.propertyType, 10)
        : null,
      age_of_property: formData.age_of_property
        ? parseInt(formData.age_of_property, 10)
        : null,
      availability_status: formData.availability_status,
      balconies: formData.balconies,
      floor_no: formData.floor_no ? parseInt(formData.floor_no, 10) : null,
      furnishing: formData.furnishing,
      latitude: formData.latitude ? parseFloat(formData.latitude) : null,
      longitude: formData.longitude ? parseFloat(formData.longitude) : null,
      maintenance_cost: formData.maintenance_cost,
      ownership_type: formData.ownership_type,
      possession_date: formData.possession_date || null,
      price_per_sqft: formData.price_per_sqft,
      total_floors: formData.total_floors
        ? parseInt(formData.total_floors, 10)
        : null,
    };

    // Debug: Log API payload
    console.log("API payload:", apiPayload);

    for (const key in apiPayload) {
      const value = apiPayload[key as keyof typeof apiPayload];
      if (value !== null && value !== undefined) {
        formDataToSend.append(key, String(value));
      }
    }

    formData.amenities.forEach((amenity) => {
      formDataToSend.append("amenities_list", amenity);
    });

    formData.images.forEach((image) => {
      formDataToSend.append("uploaded_images", image);
    });

    // Debug: Log FormData contents
    console.log("FormData contents:");
    for (let [key, value] of formDataToSend.entries()) {
      console.log(key, value);
    }

    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        console.error("❌ No access token found");
        showMessage("error", "Authentication Error: Please log in again");
        setIsLoading(false);
        return;
      }

      const response = await axios.post(
        "http://127.0.0.1:8000/api/properties/",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Success:", response.data);
      toast({
        title: "Property Posted",
        description: "Your property has been successfully posted!",
      });
      // Reset form
      setFormData({
        listingType: "Sale",
        propertyType: "",
        propertyTitle: "",
        description: "",
        bedrooms: "",
        bathrooms: "",
        balconies: "",
        area: "",
        address: "",
        amenities: [],
        price: "",
        negotiable: "no",
        security: "",
        ownerName: "",
        phone: "",
        email: "",
        terms: false,
        images: [] as File[],
        age_of_property: "",
        availability_status: "",
        floor_no: "",
        furnishing: "",
        latitude: "",
        longitude: "",
        maintenance_cost: "",
        ownership_type: "",
        possession_date: "",
        price_per_sqft: "",
        total_floors: "",
      });
      setUploadedImages([]);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("API Error:", error.response?.data || error.message);
        toast({
          title: "Error",
          description: `Failed to post property: ${
            JSON.stringify(error.response?.data) ||
            "Please check console for details."
          }`,
          variant: "destructive",
        });
      } else {
        console.error("Unexpected Error:", error);
        toast({
          title: "Error",
          description: "An unexpected error occurred.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChoosePackage = (packageName: string) => {
    // You can set a state if you want to save the selected package
    toast({
      title: "Package Selected",
      description: `You chose the ${packageName} package.`,
    });
  };

  const benefits = [
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Free Listing",
      desc: "Post your property for free",
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Premium Exposure",
      desc: "Get maximum visibility",
    },
    {
      icon: <Camera className="w-6 h-6" />,
      title: "Professional Photos",
      desc: "Free photography service",
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Legal Assistance",
      desc: "Expert legal guidance",
    },
  ];

  const packages = [
    {
      name: "Basic",
      price: "Free",
      features: [
        "Basic listing",
        "5 photos",
        "30 days validity",
        "Email support",
      ],
      popular: false,
    },
    {
      name: "Premium",
      price: "₹999",
      features: [
        "Featured listing",
        "20 photos",
        "90 days validity",
        "Priority support",
        "Social media promotion",
      ],
      popular: true,
    },
    {
      name: "Ultra",
      price: "₹1999",
      features: [
        "Top featured listing",
        "Unlimited photos",
        "180 days validity",
        "24/7 support",
        "Professional photography",
        "Virtual tour",
      ],
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Message Display (from Incoming) */}
      {message.text && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
            message.type === "success"
              ? "bg-green-500 text-white"
              : message.type === "error"
              ? "bg-red-500 text-white"
              : "bg-blue-500 text-white"
          }`}
        >
          <div className="flex items-center gap-2">
            {message.type === "error" && <AlertCircle className="w-4 h-4" />}
            {message.type === "success" && <CheckCircle className="w-4 h-4" />}
            <span>{message.text}</span>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-purple-600/10 to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6  bg-gradient-to-r from-purple-600 to-purple-100 bg-clip-text text-transparent">
              Post Your Property
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Sell or rent your property with India's most trusted real estate
              platform
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-6 bg-white/50 rounded-lg backdrop-blur-sm"
                >
                  <div className="text-purple-600 mb-3 ">{benefit.icon}</div>
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {benefit.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Packages */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Choose Your Package</h2>
            <p className="text-muted-foreground">
              Select the perfect plan to showcase your property
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, index) => (
              <Card
                key={index}
                className={`relative ${
                  pkg.popular ? "border-purple-600 scale-105" : ""
                }`}
              >
                {pkg.popular && (
                  <Badge
                    className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600 hover:bg-purple-600 text-white"
                    variant="default"
                  >
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl ">{pkg.name}</CardTitle>
                  <div className="text-3xl font-bold text-purple-600 ">
                    {pkg.price}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pkg.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm ">{feature}</span>
                    </div>
                  ))}
                  <Button
                    className={`w-full mt-6 ${
                      pkg.popular
                        ? "bg-purple-600 hover:bg-purple-700 text-white"
                        : "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground"
                    }`}
                    onClick={() => handleChoosePackage(pkg.name)}
                  >
                    Choose {pkg.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Property Form */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Property Details</h2>
            <p className="text-muted-foreground">
              Fill in the details to list your property
            </p>
          </div>

          <Tabs defaultValue="basic" className="w-full ">
            <TabsList className="flex flex-col md:grid md:grid-cols-5 w-full mb-8 h-auto md:h-auto gap-2 md:gap-0 p-2">
              <TabsTrigger value="basic" className="w-full">
                Basic Info
              </TabsTrigger>
              <TabsTrigger value="details" className="w-full">
                Property Details
              </TabsTrigger>
              <TabsTrigger value="pricing" className="w-full">
                Pricing
              </TabsTrigger>
              <TabsTrigger value="photos" className="w-full">
                Photos
              </TabsTrigger>
              <TabsTrigger value="contact" className="w-full">
                Contact
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basic">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Home className="w-5 h-5" />
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="listingType">I want to *</Label>
                      <Select
                        value={formData.listingType}
                        onValueChange={(v) =>
                          handleSelectChange("listingType", v)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select listing type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Sale">Sell</SelectItem>
                          <SelectItem value="Rent">Rent/Lease</SelectItem>
                          <SelectItem value="Lease">Lease</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="propertyType">Property Type *</Label>
                      <Select
                        value={formData.propertyType}
                        onValueChange={(v) =>
                          handleSelectChange("propertyType", v)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Apartment</SelectItem>
                          <SelectItem value="5">Independent House</SelectItem>
                          <SelectItem value="2">Villa</SelectItem>
                          <SelectItem value="3">Plot/Land</SelectItem>
                          <SelectItem value="4">Commercial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="propertyTitle">Property Title *</Label>
                    <Input
                      id="propertyTitle"
                      value={formData.propertyTitle}
                      onChange={handleInputChange}
                      placeholder="Enter a descriptive title for your property"
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Property Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe your property in detail..."
                      className="min-h-[120px]"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Property Specifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="bedrooms">Bedrooms</Label>
                      <Select
                        value={formData.bedrooms}
                        onValueChange={(v) => handleSelectChange("bedrooms", v)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 BHK</SelectItem>
                          <SelectItem value="2">2 BHK</SelectItem>
                          <SelectItem value="3">3 BHK</SelectItem>
                          <SelectItem value="4">4+ BHK</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bathrooms">Bathrooms</Label>
                      <Select
                        value={formData.bathrooms}
                        onValueChange={(v) =>
                          handleSelectChange("bathrooms", v)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="area">Area (Sq.Ft.)</Label>
                      <Input
                        id="area"
                        value={formData.area}
                        onChange={handleInputChange}
                        placeholder="Enter area"
                        type="number"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="balconies">Balconies</Label>
                      <Select
                        value={formData.balconies}
                        onValueChange={(v) =>
                          handleSelectChange("balconies", v)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">0</SelectItem>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="furnishing">Furnishing</Label>
                      <Select
                        value={formData.furnishing}
                        onValueChange={(v) =>
                          handleSelectChange("furnishing", v)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Furnished">Furnished</SelectItem>
                          <SelectItem value="Semi-Furnished">
                            Semi Furnished
                          </SelectItem>
                          <SelectItem value="Unfurnished">
                            Unfurnished
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="floor_no">Floor No.</Label>
                      <Input
                        id="floor_no"
                        value={formData.floor_no}
                        onChange={handleInputChange}
                        placeholder="e.g. 4"
                        type="number"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="total_floors">Total Floors</Label>
                      <Input
                        id="total_floors"
                        value={formData.total_floors}
                        onChange={handleInputChange}
                        placeholder="e.g. 12"
                        type="number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="age_of_property">
                        Age of Property (years)
                      </Label>
                      <Input
                        id="age_of_property"
                        value={formData.age_of_property}
                        onChange={handleInputChange}
                        placeholder="e.g. 5"
                        type="number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ownership_type">Ownership</Label>
                      <Select
                        value={formData.ownership_type}
                        onValueChange={(v) =>
                          handleSelectChange("ownership_type", v)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Freehold">Freehold</SelectItem>
                          <SelectItem value="Leasehold">Leasehold</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="availability_status">Availability</Label>
                      <Select
                        value={formData.availability_status}
                        onValueChange={(v) =>
                          handleSelectChange("availability_status", v)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
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
                    <div className="space-y-2">
                      <Label htmlFor="possession_date">Possession Date</Label>
                      <Input
                        id="possession_date"
                        value={formData.possession_date}
                        onChange={handleInputChange}
                        type="date"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 mt-6">
                    <Label htmlFor="address">Address *</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Enter complete address with landmarks"
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="latitude">Latitude</Label>
                      <Input
                        id="latitude"
                        value={formData.latitude}
                        onChange={handleInputChange}
                        placeholder="e.g. 19.0760"
                        type="number"
                        step="any"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="longitude">Longitude</Label>
                      <Input
                        id="longitude"
                        value={formData.longitude}
                        onChange={handleInputChange}
                        placeholder="e.g. 72.8777"
                        type="number"
                        step="any"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Amenities</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {[
                        "Parking",
                        "Swimming Pool",
                        "Gym",
                        "Security",
                        "Lift",
                        "Power Backup",
                        "Garden",
                        "Club House",
                        "Water Supply",
                      ].map((amenity) => (
                        <div
                          key={amenity}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={amenity.toLowerCase()}
                            checked={formData.amenities.includes(amenity)}
                            onCheckedChange={(checked) =>
                              handleAmenityChange(amenity, !!checked)
                            }
                          />
                          <Label
                            htmlFor={amenity.toLowerCase()}
                            className="text-sm"
                          >
                            {amenity}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pricing">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Pricing Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="price">Expected Price *</Label>
                      <Input
                        id="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="Enter price"
                        type="number"
                      />
                      {formData.price_per_sqft && (
                        <p className="text-sm text-muted-foreground mt-2">
                          ₹ {formData.price_per_sqft} / sq.ft.
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="negotiable">Price Negotiable</Label>
                      <Select
                        value={formData.negotiable}
                        onValueChange={(v) =>
                          handleSelectChange("negotiable", v)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="maintenance_cost">
                        Maintenance (monthly)
                      </Label>
                      <Input
                        id="maintenance_cost"
                        value={formData.maintenance_cost}
                        onChange={handleInputChange}
                        placeholder="e.g. 2000"
                        type="number"
                      />
                    </div>
                  </div>

                  {formData.listingType === "rent" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="security">Security Deposit</Label>
                        <Input
                          id="security"
                          value={formData.security}
                          onChange={handleInputChange}
                          placeholder="Enter security deposit"
                          type="number"
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="photos">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="w-5 h-5" />
                    Property Photos *
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="border-2 border-dashed border-purple-600 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12  mx-auto mb-4 text-purple-600" />
                    <h3 className="text-lg font-semibold mb-2">
                      Upload Property Photos
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Add up to 10 high-quality images (Max 5MB each)
                    </p>
                    <Button
                      variant="outline"
                      className="gap-2"
                      onClick={handleFileUpload}
                    >
                      <Upload className="w-4 h-4" />
                      Choose Files
                    </Button>
                  </div>

                  {uploadedImages.length > 0 && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-4">
                        {uploadedImages.length} image(s) uploaded
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {uploadedImages.map((image, index) => (
                          <div
                            key={index}
                            className="aspect-square bg-muted rounded-lg flex items-center justify-center overflow-hidden"
                          >
                            <img
                              src={image.url}
                              alt={`Property ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="ownerName">Owner Name *</Label>
                      <Input
                        id="ownerName"
                        value={formData.ownerName}
                        onChange={handleInputChange}
                        placeholder="Enter owner name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter phone number"
                        type="tel"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter email address"
                      type="email"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.terms}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({ ...prev, terms: !!checked }))
                      }
                    />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the Terms & Conditions and Privacy Policy *
                    </Label>
                  </div>

                  <Button
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    size="lg"
                    onClick={handlePostProperty}
                    disabled={isLoading}
                  >
                    {isLoading ? "Posting Property..." : "Post Property"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default PostProperty;
