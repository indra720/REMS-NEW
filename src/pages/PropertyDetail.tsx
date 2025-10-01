import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Heart,
  Share2,
  Phone,
  MessageCircle,
  Calendar,
  Star,
  Car,
  Wifi,
  Shield,
  Dumbbell,
  Trees,
  Camera,
  Play,
  Calculator,
  TrendingUp,
  Building,
  Train,
  School,
  ShoppingCart,
  Hospital,
  Download,
  Eye,
  ThumbsUp,
  MessageSquare,
  Clock,
  Users,
  Award,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Zap,
  Home,
  Coffee,
  Gamepad2,
  Utensils,
  Waves,
  Wind,
  Sun,
  HelpCircle,
  FileText,
  Bookmark,
  Navigation,
  Percent,
  IndianRupee,
  CreditCard,
  PiggyBank,
  TrendingDown,
  Map,
  Ruler,
  Video,
  Image as ImageIcon,
  Timer,
  Target,
  Globe,
  Mail,
  Edit,
  Filter,
  Plane,
  Bus,
  ShoppingBag,
  GraduationCap,
  Stethoscope,
  Activity,
  X,
  ChevronDown,
  Info,
  FileDown,
  MapPinIcon,
  CircleDollarSign,
  PlusCircle,
  MinusCircle,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Building2,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PropertyDetail = () => {
  console.log("PropertyDetail component rendering...");
  const { slug } = useParams();
  const location = useLocation();
  const videoUrl = location.state?.videoUrl;
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);

  // Derived state for images, will update when property changes
  const images = property?.images?.map(img => img.image) || [];

  useEffect(() => {
    console.log("useEffect for fetching details triggered. Slug:", slug);
    const fetchPropertyDetails = async () => {
      if (!slug) {
        console.log("No slug found, returning early.");
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const token = localStorage.getItem("access_token");
        const headers = {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
        };

        const response = await fetch(`http://127.0.0.1:8000/api/properties/${slug}/`, {
            headers: headers,
        });

        console.log("Fetch response status:", response.status);
        if (response.ok) {
          const data = await response.json();
          setProperty(data);
          console.log("Fetched Property Data:", data);
          console.log("Property images array:", data?.images); // Add this line
        } else {
          toast.error("Failed to load property details.");
          console.error("Fetch failed with status:", response.status);
        }
      } catch (error) {
        toast.error("An error occurred while fetching property details.");
        console.error("An error occurred during fetch:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPropertyDetails();
  }, [slug]);

  const propertyId = property?.slug;
  const [loanAmount, setLoanAmount] = useState(2000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [activeTab, setActiveTab] = useState("overview");
  const [showContactForm, setShowContactForm] = useState(false);
  const [tabScrollPosition, setTabScrollPosition] = useState(0);
  const [areaFrom, setAreaFrom] = useState("");
  const [areaTo, setAreaTo] = useState("");
  const [fromUnit, setFromUnit] = useState("sqft");
  const [toUnit, setToUnit] = useState("sqm");

  // Document form state
  const [isDocumentDialogOpen, setIsDocumentDialogOpen] = useState(false);
  const [documentForm, setDocumentForm] = useState({
    document_type: "",
    document_file: null,
    property: 1,
  });

  // Images form state
  const [isImagesDialogOpen, setIsImagesDialogOpen] = useState(false);
  const [imagesForm, setImagesForm] = useState({
    caption: "",
    is_primary: false,
    image: null,
    property: 1,
  });

  // Property Type form state
  const [isPropertyTypeDialogOpen, setIsPropertyTypeDialogOpen] =
    useState(false);
  const [propertyTypeForm, setPropertyTypeForm] = useState({
    name: "",
    description: "",
  });

  // Amenities form state
  const [isAmenitiesDialogOpen, setIsAmenitiesDialogOpen] = useState(false);
  const [amenitiesForm, setAmenitiesForm] = useState({
    amenity: "",
    property: propertyId,
  });

  // Get Best Deal form state
  const [bestDealForm, setBestDealForm] = useState({
    name: "",
    phone: "",
    email: "",
    property: propertyId,
    source: "Get Best Deal Form",
    status: "New",
  });

  // Handle Get Best Deal form submission
  const handleGetBestDeal = async () => {
    console.log(
      "Form validation - Name:",
      bestDealForm.name,
      "Phone:",
      bestDealForm.phone,
      "Email:",
      bestDealForm.email
    );

    if (!bestDealForm.name || !bestDealForm.phone || !bestDealForm.email) {
      toast.error("Please fill all fields");
      return;
    }

    console.log("Submitting Best Deal form:", bestDealForm);
    console.log("Property ID:", propertyId);

    try {
      const token = localStorage.getItem("access_token");
      console.log(
        "Token for submission:",
        token ? "Token exists" : "No token found"
      );

      const response = await fetch("http://127.0.0.1:8000/api/leads/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bestDealForm),
      });

      console.log("Submission response status:", response.status);

      if (response.ok) {
        const result = await response.json();
        console.log("Lead created successfully:", result);
        toast.success("Our expert will call you back within 2 hours!");
        setBestDealForm({
          name: "",
          phone: "",
          email: "",
          property: propertyId,
          source: "Get Best Deal Form",
          status: "New",
        });
      } else {
        const errorText = await response.text();
        console.log(
          "Failed response:",
          response.status,
          response.statusText,
          errorText
        );
        toast.error("Failed to submit request");
      }
    } catch (error) {
      console.error("Error submitting request:", error);
      toast.error("Error submitting request");
    }
  };

  // Dynamic amenities state
  const [dynamicAmenities, setDynamicAmenities] = useState([]);

  useEffect(() => {
    if (property && property.amenities && property.amenities.length > 0) {
      const amenityValue = property.amenities[0].amenity;
      let parsedAmenities = [];
      try {
        const parsed = JSON.parse(amenityValue);
        if (Array.isArray(parsed)) {
          parsedAmenities = parsed;
        }
      } catch (error) {
        if (typeof amenityValue === 'string') {
          parsedAmenities = [amenityValue];
        }
      }
      
      const amenitiesData = parsedAmenities.map(name => ({
        icon: getAmenityIcon(name),
        name: name,
        available: true,
      }));
      setDynamicAmenities(amenitiesData);
    }
  }, [property]);

  // Update amenitiesForm with correct property ID
  useEffect(() => {
    setAmenitiesForm((prev) => ({
      ...prev,
      property: propertyId,
    }));
  }, [propertyId]);

  // Function to get appropriate icon for amenity
  const getAmenityIcon = (amenityName: string) => {
    const name = amenityName.toLowerCase();

    if (name.includes("parking") || name.includes("car")) return Car;
    if (name.includes("wifi") || name.includes("internet")) return Wifi;
    if (name.includes("security") || name.includes("guard")) return Shield;
    if (name.includes("gym") || name.includes("fitness")) return Dumbbell;
    if (name.includes("garden") || name.includes("park")) return Trees;
    if (name.includes("pool") || name.includes("swimming")) return Waves;
    if (name.includes("elevator") || name.includes("lift")) return ArrowUp;
    if (name.includes("power") || name.includes("backup")) return Zap;
    if (name.includes("play") || name.includes("kids")) return Gamepad2;
    if (name.includes("restaurant") || name.includes("food")) return Utensils;
    if (name.includes("coffee") || name.includes("cafe")) return Coffee;
    if (name.includes("ac") || name.includes("air")) return Wind;
    if (name.includes("solar") || name.includes("sun")) return Sun;
    if (name.includes("cctv") || name.includes("camera")) return Camera;
    if (name.includes("club") || name.includes("community")) return Users;

    return Building; // Default icon
  };

  

  const handlePropertyTypeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting property type data:", propertyTypeForm);
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        "http://127.0.0.1:8000/api/property-types/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(propertyTypeForm),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Property Type added successfully:", result);
        toast.success("Property Type added successfully!");
        setIsPropertyTypeDialogOpen(false);
        setPropertyTypeForm({
          name: "",
          description: "",
        });
      } else {
        const errorData = await response.json();
        console.log("Failed response:", response.status, response.statusText);
        console.log("Error details:", errorData);
        toast.error(
          `Failed to add property type: ${JSON.stringify(errorData)}`
        );
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error adding property type");
    }
  };

 
const handleDocumentSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  console.log("Submitting document data:", documentForm);

  // Validation checks
  if (!documentForm.document_type.trim()) {
    toast.error("Document type is required");
    return;
  }

  if (!documentForm.document_file) {
    toast.error("Please select a document file");
    return;
  }

  // Check file size (e.g., max 10MB)
  if (documentForm.document_file.size > 10 * 1024 * 1024) {
    toast.error("File size should be less than 10MB");
    return;
  }

  // Check file type
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  if (!allowedTypes.includes(documentForm.document_file.type)) {
    toast.error("Only PDF and Word documents are allowed");
    return;
  }

  const formData = new FormData();
  formData.append("document_type", documentForm.document_type.trim());
  
  // OPTION 1: If you have access to property slug directly
  // Replace 'propertySlug' with your actual property slug variable
  formData.append("property_slug", slug); // Add this line
  
  // OPTION 2: If you only have property data and need to extract slug
  // formData.append("property_slug", property?.slug || ""); // Add this line instead
  
  formData.append("document_file", documentForm.document_file);

  // Debug: Log FormData contents
  console.log("FormData contents:");
  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }

  try {
    const token = localStorage.getItem("access_token");

    if (!token) {
      toast.error("Authentication required. Please log in.");
      return;
    }

    console.log("Sending request to API...");
    const response = await fetch(
      "http://127.0.0.1:8000/api/property-documents/",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // Don't set Content-Type for FormData - let browser set it with boundary
        },
        body: formData,
      }
    );

    console.log("Response status:", response.status);
    console.log("Response headers:", response.headers);

    if (response.ok) {
      const result = await response.json();
      console.log("Document added successfully:", result);
      toast.success("Document added successfully!");
      setIsDocumentDialogOpen(false);
      setDocumentForm({
        document_type: "",
        document_file: null,
        property: propertyId,
      });
    } else {
      // Get detailed error information
      const contentType = response.headers.get("content-type");
      let errorData;

      if (contentType && contentType.includes("application/json")) {
        errorData = await response.json();
      } else {
        errorData = await response.text();
      }

      console.error("Failed response:", {
        status: response.status,
        statusText: response.statusText,
        errorData: errorData,
      });

      // Show specific error message if available
      if (errorData && typeof errorData === "object") {
        const errorMessages = [];

        // Handle Django REST framework error format
        if (errorData.document_type) {
          errorMessages.push(
            `Document type: ${errorData.document_type.join(", ")}`
          );
        }
        if (errorData.document_file) {
          errorMessages.push(
            `Document file: ${errorData.document_file.join(", ")}`
          );
        }
        if (errorData.property_slug) { // Updated to handle property_slug errors
          errorMessages.push(`Property slug: ${errorData.property_slug.join(", ")}`);
        }
        if (errorData.non_field_errors) {
          errorMessages.push(errorData.non_field_errors.join(", "));
        }
        if (errorData.detail) {
          errorMessages.push(errorData.detail);
        }

        const errorMessage =
          errorMessages.length > 0
            ? errorMessages.join("; ")
            : "Failed to add document";

        toast.error(errorMessage);
      } else {
        toast.error(
          `Failed to add document: ${response.status} ${response.statusText}`
        );
      }
    }
  } catch (error) {
    console.error("Network error:", error);
    toast.error("Network error. Please check your connection and try again.");
  }
};



  // const handleImagesSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log("Submitting images data:", imagesForm);

  //   const formData = new FormData();
  //   formData.append("caption", imagesForm.caption);
  //   formData.append("is_primary", imagesForm.is_primary.toString());
  //   formData.append("property_slug", imagesForm.property.toString());
  //   if (imagesForm.image) {
  //     formData.append("image", imagesForm.image);
  //   }

  //   try {
  //     const token = localStorage.getItem("access_token");
  //     const response = await fetch(
  //       "http://127.0.0.1:8000/api/property-images/",
  //       {
  //         method: "POST",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: formData,
  //       }
  //     );

  //     if (response.ok) {
  //       const result = await response.json();
  //       console.log("Image added successfully:", result);
  //       toast.success("Image added successfully!");

  //       // Images are now derived from the 'property' state, which is updated by fetchPropertyDetails.
  //       // No explicit refresh needed here.

  //       setIsImagesDialogOpen(false);
  //       setImagesForm({
  //         caption: "",
  //         is_primary: false,
  //         image: null,
  //         property: propertyId,
  //       });
  //     } else {
  //       console.log("Failed response:", response.status, response.statusText);
  //       toast.error("Failed to add image");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     toast.error("Error adding image");
  //   }
  // };

  // Amenities

  const handleImagesSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting images data:", imagesForm);

    const formData = new FormData();
    formData.append("caption", imagesForm.caption);
    formData.append("is_primary", imagesForm.is_primary.toString());
    formData.append("property_slug", slug || ""); // Use the slug from useParams
    if (imagesForm.image) {
      formData.append("image", imagesForm.image);
    }

    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        toast.error("Authentication required. Please log in.");
        return;
      }

      console.log("Sending image upload request to API...");
      const response = await fetch(
        "http://127.0.0.1:8000/api/property-images/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            // Don't set Content-Type for FormData - let browser set it with boundary
          },
          body: formData,
        }
      );

      console.log("Image upload response status:", response.status);

      if (response.ok) {
        const result = await response.json();
        console.log("Image added successfully:", result);
        toast.success("Image added successfully!");

        // Update the property state with the new image
        setProperty(prevProperty => {
          if (!prevProperty) return prevProperty;

          const newImageObject = {
            id: result.id, // Assuming API returns id
            image: result.image, // Assuming API returns the full image URL
            caption: result.caption,
            is_primary: result.is_primary,
            // Add any other fields returned by the API that are part of your property.images structure
          };

          return {
            ...prevProperty,
            images: prevProperty.images ? [...prevProperty.images, newImageObject] : [newImageObject],
          };
        });

        setIsImagesDialogOpen(false);
        setImagesForm({
          caption: "",
          is_primary: false,
          image: null,
          property: property?.id || 1, // Reset to property.id or a default
        });
      } else {
        const contentType = response.headers.get("content-type");
        let errorData;

        if (contentType && contentType.includes("application/json")) {
          errorData = await response.json();
        } else {
          errorData = await response.text();
        }

        console.error("Failed image upload response:", {
          status: response.status,
          statusText: response.statusText,
          errorData: errorData,
        });

        if (errorData && typeof errorData === "object") {
          const errorMessages = [];
          if (errorData.caption) errorMessages.push(`Caption: ${errorData.caption.join(", ")}`);
          if (errorData.image) errorMessages.push(`Image: ${errorData.image.join(", ")}`);
          if (errorData.property_slug) errorMessages.push(`Property slug: ${errorData.property_slug.join(", ")}`);
          if (errorData.non_field_errors) errorMessages.push(errorData.non_field_errors.join(", "));
          if (errorData.detail) errorMessages.push(errorData.detail);

          const errorMessage = errorMessages.length > 0 ? errorMessages.join("; ") : "Failed to add image";
          toast.error(errorMessage);
        } else {
          toast.error(`Failed to add image: ${response.status} ${response.statusText}`);
        }
      }
    } catch (error) {
      console.error("Network error during image upload:", error);
      toast.error("Network error. Please check your connection and try again.");
    }
  };

 const handleAmenitiesSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  console.log("Submitting amenities data:", amenitiesForm);

  // Validation
  if (!amenitiesForm.amenity.trim()) {
    toast.error("Amenity is required");
    return;
  }

  try {
    const token = localStorage.getItem("access_token");

    if (!token) {
      toast.error("Authentication required. Please log in.");
      return;
    }
    const requestBody = {
      amenity: amenitiesForm.amenity.trim(),
      // OPTION 1: If you have access to property slug directly
      property_slug: slug, // Replace with your property slug variable
      
     
    };

    console.log("Request body:", requestBody);

    const response = await fetch(
      "http://127.0.0.1:8000/api/property-amenities/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      }
    );

    console.log("Response status:", response.status);

    if (response.ok) {
      const result = await response.json();
      console.log("Amenity added successfully:", result);
      toast.success("Amenity added successfully!");
      setIsAmenitiesDialogOpen(false);
      setAmenitiesForm({
        amenity: "",
        property: propertyId,
      });
    } else {
      // Get detailed error information
      const contentType = response.headers.get("content-type");
      let errorData;

      if (contentType && contentType.includes("application/json")) {
        errorData = await response.json();
      } else {
        errorData = await response.text();
      }

      console.error("Failed response:", {
        status: response.status,
        statusText: response.statusText,
        errorData: errorData,
      });

      // Show specific error message if available
      if (errorData && typeof errorData === "object") {
        const errorMessages = [];

        // Handle Django REST framework error format
        if (errorData.amenity) {
          errorMessages.push(`Amenity: ${errorData.amenity.join(", ")}`);
        }
        if (errorData.property_slug) {
          errorMessages.push(`Property slug: ${errorData.property_slug.join(", ")}`);
        }
        if (errorData.non_field_errors) {
          errorMessages.push(errorData.non_field_errors.join(", "));
        }
        if (errorData.detail) {
          errorMessages.push(errorData.detail);
        }

        const errorMessage =
          errorMessages.length > 0
            ? errorMessages.join("; ")
            : "Failed to add amenity";

        toast.error(errorMessage);
      } else if (typeof errorData === "string") {
        toast.error(`Failed to add amenity: ${errorData}`);
      } else {
        toast.error(`Failed to add amenity: ${response.status} ${response.statusText}`);
      }
    }
  } catch (error) {
    console.error("Network error:", error);
    toast.error("Network error. Please check your connection and try again.");
  }
};
  const propertyHighlights = [
    {
      icon: Zap,
      title: "Prime Location",
      desc: "Carter Road - Mumbai's most sought-after address",
    },
    {
      icon: Building,
      title: "Luxury Building",
      desc: "25-floor iconic tower with modern architecture",
    },
    {
      icon: Waves,
      title: "Sea View",
      desc: "Stunning Arabian Sea views from west-facing apartments",
    },
    {
      icon: Shield,
      title: "Premium Security",
      desc: "24/7 security with CCTV surveillance",
    },
    {
      icon: Car,
      title: "Ample Parking",
      desc: "2 covered parking spaces included",
    },
    {
      icon: Target,
      title: "Ready to Move",
      desc: "Immediate possession available",
    },
  ];

  

  const nearbyPlaces = [
    {
      type: "Metro Station",
      name: "Bandra Station",
      distance: "0.5 km",
      icon: Train,
      time: "2 min walk",
    },
    {
      type: "School",
      name: "St. Andrews School",
      distance: "1.2 km",
      icon: School,
      time: "5 min drive",
    },
    {
      type: "Shopping Mall",
      name: "Palladium Mall",
      distance: "2.1 km",
      icon: ShoppingCart,
      time: "8 min drive",
    },
    {
      type: "Hospital",
      name: "Lilavati Hospital",
      distance: "1.8 km",
      icon: Hospital,
      time: "6 min drive",
    },
    {
      type: "Airport",
      name: "Mumbai Airport",
      distance: "8.5 km",
      icon: Plane,
      time: "25 min drive",
    },
    {
      type: "IT Park",
      name: "BKC Business District",
      distance: "3.2 km",
      icon: Building,
      time: "15 min drive",
    },
    {
      type: "Beach",
      name: "Carter Road Promenade",
      distance: "0.2 km",
      icon: Waves,
      time: "1 min walk",
    },
    {
      type: "Restaurant",
      name: "Linking Road Food Street",
      distance: "1.5 km",
      icon: Utensils,
      time: "7 min drive",
    },
  ];

  const floorPlans = [
    {
      type: "1 BHK",
      area: "954 sq ft",
      price: "₹41.97 L",
      image: "/lovable-uploads/6d317275-f69b-4c97-b15e-282cd95ab6de.png",
      details: "Compact and efficient layout perfect for young professionals",
      rooms: [
        { name: "Bedroom 1", dimensions: "15' 0\" X 10' 5\"" },
        {
          name: "Attached Bathroom with Bedroom 1",
          dimensions: "7' 0\" X 5' 0\"",
        },
        { name: "Drawing/Living Room", dimensions: "20' 0\" X 10' 0\"" },
      ],
    },
    {
      type: "2 BHK",
      area: "1008 sq ft",
      price: "₹39.72 L - 41.97 L",
      image: "/lovable-uploads/6d317275-f69b-4c97-b15e-282cd95ab6de.png",
      details:
        "Perfect for small families, includes master bedroom with attached bath",
      rooms: [
        { name: "Master Bedroom", dimensions: "15' 0\" X 12' 0\"" },
        { name: "Bedroom 2", dimensions: "12' 0\" X 10' 0\"" },
        { name: "Living Room", dimensions: "18' 0\" X 14' 0\"" },
        { name: "Kitchen", dimensions: "10' 0\" X 8' 0\"" },
        { name: "Attached Bathroom", dimensions: "8' 0\" X 6' 0\"" },
      ],
    },
    {
      type: "3 BHK",
      area: "1200 sq ft",
      price: "₹2.50 Cr",
      image: "/lovable-uploads/6d317275-f69b-4c97-b15e-282cd95ab6de.png",
      details:
        "Spacious living, ideal for growing families with separate dining area",
      rooms: [
        { name: "Master Bedroom", dimensions: "16' 0\" X 12' 0\"" },
        { name: "Bedroom 2", dimensions: "12' 0\" X 10' 0\"" },
        { name: "Bedroom 3", dimensions: "11' 0\" X 9' 0\"" },
        { name: "Living Room", dimensions: "20' 0\" X 16' 0\"" },
        { name: "Dining Room", dimensions: "12' 0\" X 10' 0\"" },
        { name: "Kitchen", dimensions: "12' 0\" X 8' 0\"" },
      ],
    },
  ];

  const reviews = [
    {
      name: "Rahul Sharma",
      rating: 5,
      comment:
        "Excellent property with great amenities. The location is perfect and the sea view is breathtaking!",
      date: "2 days ago",
      avatar: "RS",
      helpful: 12,
    },
    {
      name: "Priya Patel",
      rating: 4,
      comment:
        "Beautiful apartment with good connectivity. The builder is reliable and delivery was on time.",
      date: "1 week ago",
      avatar: "PP",
      helpful: 8,
    },
    {
      name: "Amit Kumar",
      rating: 5,
      comment:
        "Best investment decision. The property value has already appreciated by 15% in just one year.",
      date: "2 weeks ago",
      avatar: "AK",
      helpful: 15,
    },
    {
      name: "Sneha Gupta",
      rating: 4,
      comment:
        "Great amenities and maintenance. The society is well-managed and very clean.",
      date: "3 weeks ago",
      avatar: "SG",
      helpful: 6,
    },
  ];

  const similarProperties = [
    {
      id: 1,
      title: "Luxury 3BHK in Andheri",
      price: "₹2.25 Cr",
      area: "1150 sq ft",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300",
      rating: 4.7,
      location: "Andheri West",
    },
    {
      id: 2,
      title: "Premium 3BHK in Juhu",
      price: "₹2.80 Cr",
      area: "1300 sq ft",
      image:
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=300",
      rating: 4.8,
      location: "Juhu",
    },
    {
      id: 3,
      title: "Modern 3BHK in Khar",
      price: "₹2.45 Cr",
      area: "1180 sq ft",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300",
      rating: 4.6,
      location: "Khar West",
    },
  ];

  const priceHistory = [
    { month: "Jul 2022", price: 2800, locality: 3200 },
    { month: "Oct 2022", price: 2900, locality: 3300 },
    { month: "Jan 2023", price: 3000, locality: 3400 },
    { month: "Apr 2023", price: 3100, locality: 3500 },
    { month: "Jul 2023", price: 3150, locality: 3600 },
    { month: "Oct 2023", price: 3200, locality: 3700 },
    { month: "Jan 2024", price: 3250, locality: 3750 },
    { month: "Apr 2024", price: 3300, locality: 3800 },
    { month: "Jul 2024", price: 3400, locality: 3850 },
    { month: "Oct 2024", price: 3450, locality: 3900 },
    { month: "Jan 2025", price: 3500, locality: 3950 },
    { month: "Apr 2025", price: 4200, locality: 4900 },
  ];

  const newsUpdates = [
    {
      title: "Mumbai Real Estate Shows Strong Growth in 2024",
      source: "Economic Times",
      date: "2 days ago",
      summary:
        "Bandra West emerges as the top performer with 12% price appreciation",
    },
    {
      title: "New Metro Line to Boost Bandra Property Values",
      source: "Mumbai Mirror",
      date: "1 week ago",
      summary:
        "The upcoming metro connectivity is expected to increase property demand by 20%",
    },
    {
      title: "Luxury Housing Demand Surges in Western Suburbs",
      source: "Times of India",
      date: "2 weeks ago",
      summary:
        "Premium projects in Bandra and Juhu see unprecedented buyer interest",
    },
  ];

  const calculateEMI = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 12 / 100;
    const months = tenure * 12;
    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(emi);
  };

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  const convertArea = () => {
    if (!areaFrom) return;
    const conversions = {
      sqft: { sqm: 0.092903, acre: 0.000022957, hectare: 0.0000092903 },
      sqm: { sqft: 10.7639, acre: 0.000247105, hectare: 0.0001 },
      acre: { sqft: 43560, sqm: 4046.86, hectare: 0.404686 },
      hectare: { sqft: 107639, sqm: 10000, acre: 2.47105 },
    };

    const fromValue = parseFloat(areaFrom);
    if (isNaN(fromValue)) return;

    const result = fromValue * conversions[fromUnit][toUnit];
    setAreaTo(result.toFixed(4));
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "highlights", label: "Highlights", icon: Star },
    { id: "around-project", label: "Around Project", icon: MapPin },
    { id: "about-project", label: "About Project", icon: Building },
    { id: "floor-plan", label: "Floor Plan", icon: Square },
    { id: "tour", label: "Tour", icon: Play },
    { id: "amenities", label: "Amenities", icon: Dumbbell },
    { id: "contact-sellers", label: "Contact", icon: Phone },
    { id: "reviews", label: "Reviews", icon: MessageSquare },
    { id: "price-trends", label: "Price Trends", icon: TrendingUp },
    { id: "brochure", label: "Brochure", icon: Download },
    { id: "calculator", label: "Calculator", icon: Calculator },
    { id: "locality", label: "Locality", icon: Map },
    { id: "compare", label: "Compare", icon: Users },
    { id: "developer", label: "Developer", icon: Award },
    { id: "qna", label: "Q&A", icon: MessageCircle },
    { id: "faqs", label: "FAQs", icon: HelpCircle },
    { id: "similar", label: "Similar", icon: Building },
    { id: "news", label: "News", icon: Clock },
  ];

  const scrollTabs = (direction) => {
    const container = document.getElementById("tabs-container");
    if (container) {
      const scrollAmount = 200;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* <Header /> */}

            {/* Hero Image Gallery Section */}
            <div className="relative h-96 lg:h-[400px]">
              {videoUrl ? (
                <video controls autoPlay muted className="w-full h-full object-cover">
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={images[currentImage]}
                  alt="Property"
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      
              {/* Top Navigation */}
              <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
                <Button
                  variant="ghost"
                  className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Search
                </Button>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                  >
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>
              </div>
      
              {/* Image Navigation */}
              {!videoUrl && images && images.length > 0 && (
                <>
                  <div className="absolute top-1/2 left-4 right-4 flex justify-between items-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={prevImage}
                      className="bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 rounded-full"
                    >
                      <ArrowLeft className="h-6 w-6" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={nextImage}
                      className="bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 rounded-full"
                    >
                      <ArrowRight className="h-6 w-6" />
                    </Button>
                  </div>
      
                  {/* Image Counter & Controls */}
                  <div className="absolute bottom-6 right-6 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full">
                    {currentImage + 1} / {images.length}
                  </div>
                </>
              )}
      
              <div className="absolute bottom-6 left-6 flex gap-3">
                <Button
                  variant="ghost"
                  className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  {images.length} Photos
                </Button>
                <Button
                  variant="ghost"
                  className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                >
                  <Video className="h-4 w-4 mr-2" />
                  Virtual Tour
                </Button>
                <Button
                  variant="ghost"
                  className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  360° View
                </Button>
              </div>
      
              {/* Thumbnail Navigation */}
              {!videoUrl && images && images.length > 0 && (
                <div className="absolute bottom-20 left-6 right-6">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const container = document.getElementById(
                          "thumbnail-container"
                        );
                        container?.scrollBy({ left: -200, behavior: "smooth" });
                      }}
                      className="bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 rounded-full"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div
                      id="thumbnail-container"
                      className="flex gap-2 overflow-x-hidden max-w-[calc(100%-120px)]"
                    >
                      {images.map((img, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImage(index)}
                          className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                            currentImage === index
                              ? "border-white scale-105"
                              : "border-white/50"
                          }`}
                        >
                          <img
                            src={img}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const container = document.getElementById(
                          "thumbnail-container"
                        );
                        container?.scrollBy({ left: 200, behavior: "smooth" });
                      }}
                      className="bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 rounded-full"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
      {/* Sticky Navigation */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center py-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => scrollTabs("left")}
              className="mr-2 flex-shrink-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div
              id="tabs-container"
              className="flex items-center gap-6 overflow-x-hidden flex-1"
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${ 
                    activeTab === tab.id
                      ? "bg-purple-600 text-white"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => scrollTabs("right")}
              className="ml-2 flex-shrink-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Header */}
            <div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-4xl font-bold mb-3">
                    {property?.title}
                  </h1>
                  <p className="text-muted-foreground text-lg flex items-center mb-2">
                    <MapPin className="h-5 w-5 mr-2" />
                    {property?.location}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {property?.views || 0} views
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      Listed on {property?.listed_on ? new Date(property.listed_on).toLocaleDateString() : 'N/A'}
                    </div>
                    {property?.rera_approved && <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                      Verified Property
                    </div>}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-purple-600">
                  ₹{property?.price ? parseFloat(property.price).toLocaleString('en-IN') : 'N/A'}
                  </div>
                  <div className="text-lg text-muted-foreground">
                  ₹{property?.price_per_sqft ? parseFloat(property.price_per_sqft).toLocaleString('en-IN') : 'N/A'}/sq ft
                  </div>
                  {property?.ai_price_estimate && <Badge className="mt-2 bg-green-100 text-green-800">
                    Fair Price
                  </Badge>}
                </div>
              </div>

              <div className="flex items-center gap-8 mb-6">
                <div className="flex items-center">
                  <Bed className="h-5 w-5 mr-2 text-purple-600" />
                  <span className="font-medium">{property?.bedrooms} Bedrooms</span>
                </div>
                <div className="flex items-center">
                  <Bath className="h-5 w-5 mr-2 text-purple-600" />
                  <span className="font-medium">{property?.bathrooms} Bathrooms</span>
                </div>
                <div className="flex items-center">
                  <Square className="h-5 w-5 mr-2 text-purple-600" />
                  <span className="font-medium">{property?.area_sqft} sq ft</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 mr-2 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{property?.ai_recommended_score || 'N/A'} Rating (0 reviews)</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{property?.availability_status}</Badge>
                <Badge variant="secondary">{property?.furnishing}</Badge>
                <Badge variant="secondary">{property?.ownership_type}</Badge>
              </div>
            </div>

            <Separator />

            {/* Dynamic Content based on active tab */}
            <div className="space-y-8">
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Home className="h-5 w-5" />
                        Property Overview
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                        {property?.description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                          <Square className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                          <div className="text-2xl font-bold text-purple-600">
                            {property?.area_sqft}
                          </div>
                          <div className="text-sm text-purple-600">
                            Carpet Area (sq ft)
                          </div>
                        </div>
                        <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                          <Building className="h-8 w-8 mx-auto mb-2 text-green-600" />
                          <div className="text-2xl font-bold text-green-600">
                            {property?.floor_no}
                          </div>
                          <div className="text-sm text-green-600">
                            Floor (of {property?.total_floors})
                          </div>
                        </div>
                        <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                          <Calendar className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                          <div className="text-2xl font-bold text-purple-600">
                            {property?.age_of_property}
                          </div>
                          <div className="text-sm text-purple-600">
                            Property Age
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Property Details
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Property Type
                            </p>
                            <p className="font-medium">Apartment</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Built Year
                            </p>
                            <p className="font-medium">2019</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Floor
                            </p>
                            <p className="font-medium">12th of 25</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Facing
                            </p>
                            <p className="font-medium">West (Sea View)</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Furnishing
                            </p>
                            <p className="font-medium">Semi-Furnished</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Possession
                            </p>
                            <p className="font-medium text-green-600">
                              Immediate
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Area Breakdown
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                              Carpet Area
                            </span>
                            <span className="font-medium">1,200 sq ft</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                              Built-up Area
                            </span>
                            <span className="font-medium">1,350 sq ft</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                              Super Area
                            </span>
                            <span className="font-medium">1,500 sq ft</span>
                          </div>
                          <Separator />
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                              Price per sq ft
                            </span>
                            <span className="font-medium text-green-600">
                              ₹20,833
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {activeTab === "highlights" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Star className="h-5 w-5" />
                        Property Highlights
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {propertyHighlights.map((highlight, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-4 p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg"
                          >
                            <div className="bg-purple-600 text-white p-2 rounded-lg">
                              <highlight.icon className="h-5 w-5" />
                            </div>
                            <div>
                              <h3 className="font-medium">{highlight.title}</h3>
                              <p className="text-sm text-muted-foreground">
                                {highlight.desc}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Investment Highlights</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                          <TrendingUp className="h-8 w-8 mx-auto mb-3 text-green-600" />
                          <div className="text-2xl font-bold text-green-600">
                            15%
                          </div>
                          <div className="text-sm text-green-600">
                            Expected Annual ROI
                          </div>
                        </div>
                        <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                          <Target className="h-8 w-8 mx-auto mb-3 text-purple-600" />
                          <div className="text-2xl font-bold text-purple-600">
                            ₹35K
                          </div>
                          <div className="text-sm text-purple-600">
                            Monthly Rental Potential
                          </div>
                        </div>
                        <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                          <Award className="h-8 w-8 mx-auto mb-3 text-purple-600" />
                          <div className="text-2xl font-bold text-purple-600">
                            A+
                          </div>
                          <div className="text-sm text-purple-600">
                            Investment Grade Rating
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "around-project" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        Around This Project
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {nearbyPlaces.map((place, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                          >
                            <div className="bg-purple-100 p-2 rounded-lg">
                              <place.icon className="h-5 w-5 text-purple-600" />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-medium">{place.name}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {place.type}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm font-medium">
                                    {place.distance}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {place.time}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Location Map</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-8 text-center">
                        <Map className="h-16 w-16 mx-auto mb-4 text-purple-600" />
                        <p className="text-muted-foreground">
                          Interactive map view
                        </p>
                        <Button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white">
                          <Navigation className="h-4 w-4 mr-2" />
                          View on Map
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "about-project" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Building className="h-5 w-5" />
                        About This Project
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-3">
                            Project Description
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            Nestled in the heart of Bandra West, this luxury
                            residential project redefines modern living with its
                            contemporary architecture and premium amenities. The
                            project features 25 floors of meticulously planned
                            apartments, each designed to offer the perfect
                            balance of comfort, style, and functionality. With
                            its prime location on Carter Road, residents enjoy
                            unparalleled access to Mumbai's finest dining,
                            shopping, and entertainment destinations.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium mb-3">
                              Project Features
                            </h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                              <li className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                RERA Approved Project
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                Vastu Compliant Design
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                Earthquake Resistant Structure
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                Green Building Certified
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                Smart Home Features
                              </li>
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-medium mb-3">
                              Construction Details
                            </h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Total Floors
                                </span>
                                <span>25 Floors</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Total Units
                                </span>
                                <span>120 Apartments</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Launch Date
                                </span>
                                <span>January 2018</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Possession
                                </span>
                                <span>Ready to Move</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  RERA Number
                                </span>
                                <span>P51700000271</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "floor-plan" && (
                <div className="space-y-6">
                  {/* Interactive 3D Floor Plan */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Square className="h-5 w-5" />
                        3D Interactive Floor Plans
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                        {floorPlans.map((plan, index) => (
                          <Card
                            key={index}
                            className="border-2 hover:border-purple-600 transition-colors cursor-pointer"
                          >
                            <CardContent className="p-0">
                              <div className="relative">
                                <img
                                  src={plan.image}
                                  alt={plan.type}
                                  className="w-full h-64 object-cover rounded-t-lg"
                                />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                                  {plan.type}
                                </div>
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                                  {plan.area}
                                </div>
                                <div className="absolute bottom-4 right-4 space-x-2">
                                  <Button
                                    size="sm"
                                    variant="secondary"
                                    className="bg-white/90 backdrop-blur-sm"
                                  >
                                    3D
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="bg-white/90 backdrop-blur-sm"
                                  >
                                    2D
                                  </Button>
                                </div>
                              </div>
                              <div className="p-4 space-y-3">
                                <div className="flex justify-between items-center">
                                  <span className="text-xl font-bold text-purple-600">
                                    {plan.price}
                                  </span>
                                  <Badge variant="outline">{plan.area}</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {plan.details}
                                </p>

                                {/* Room Details */}
                                <div className="space-y-2">
                                  <h4 className="font-medium text-sm">
                                    Room Details:
                                  </h4>
                                  <div className="space-y-1">
                                    {plan.rooms?.map((room, roomIndex) => (
                                      <div
                                        key={roomIndex}
                                        className="flex justify-between text-xs text-muted-foreground"
                                      >
                                        <span>{room.name}</span>
                                        <span>{room.dimensions}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <div className="pt-2 border-t">
                                  <p className="text-center text-sm font-medium text-purple-600 mb-2">
                                    Explore 3D Interactive Floor Plan
                                  </p>
                                  <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Interactive Plan
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "tour" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Play className="h-5 w-5" />
                        Virtual Tour
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="relative bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-8 text-center">
                            <Video className="h-16 w-16 mx-auto mb-4 text-purple-600" />
                            <h3 className="text-lg font-semibold mb-2">
                              Virtual Walkthrough
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4">
                              Take a complete virtual tour of the apartment from
                              the comfort of your home
                            </p>
                            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                              <Play className="h-4 w-4 mr-2" />
                              Start Virtual Tour
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="relative bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-8 text-center">
                            <Eye className="h-16 w-16 mx-auto mb-4 text-green-600" />
                            <h3 className="text-lg font-semibold mb-2">
                              360° Experience
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4">
                              Immersive 360-degree view of every room and corner
                            </p>
                            <Button className="bg-green-600 hover:bg-green-700 text-white">
                              <Eye className="h-4 w-4 mr-2" />
                              Launch 360° View
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-4">
                          Schedule Physical Visit
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Button
                            variant="outline"
                            className="h-auto p-4"
                            onClick={() =>
                              (window.location.href = "/book-visit")
                            }
                          >
                            <div className="text-center">
                              <Calendar className="h-5 w-5 mx-auto mb-2" />
                              <div className="text-sm">Book Site Visit</div>
                            </div>
                          </Button>
                          <Button
                            variant="outline"
                            className="h-auto p-4"
                            onClick={() => window.open("tel:+919876543210")}
                          >
                            <div className="text-center">
                              <Phone className="h-5 w-5 mx-auto mb-2" />
                              <div className="text-sm">Call for Visit</div>
                            </div>
                          </Button>
                          <Button
                            variant="outline"
                            className="h-auto p-4"
                            onClick={() =>
                              window.open(
                                "https://wa.me/919876543210?text=I am interested in the property listing"
                              )
                            }
                          >
                            <div className="text-center">
                              <MessageCircle className="h-5 w-5 mx-auto mb-2" />
                              <div className="text-sm">WhatsApp</div>
                            </div>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "amenities" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Dumbbell className="h-5 w-5" />
                        Amenities & Features
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {dynamicAmenities.map(
                          (amenity, index) => (
                            <div
                              key={index}
                              className={`flex flex-col items-center p-4 rounded-lg border transition-colors ${ 
                                amenity.available
                                  ? "bg-green-50 border-green-200 text-green-700"
                                  : "bg-gray-50 border-gray-200 text-gray-400"
                              }`}
                            >
                              <amenity.icon className="h-6 w-6 mb-2" />
                              <span className="text-sm text-center font-medium">
                                {amenity.name}
                              </span>
                              {amenity.available && (
                                <CheckCircle className="h-4 w-4 mt-1 text-green-500" />
                              )}
                            </div>
                          )
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "contact-sellers" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Phone className="h-5 w-5" />
                        Contact Sellers
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-4 p-4 border rounded-lg">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100" />
                              <AvatarFallback>RS</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold">Rajesh Sharma</h3>
                              <p className="text-sm text-muted-foreground">
                                Property Consultant
                              </p>
                              <div className="flex items-center gap-1 mt-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-xs">
                                  4.9 (156 reviews)
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                              <Phone className="h-4 w-4 mr-2" />
                              Call Now: +91 98765 43210
                            </Button>
                            <Button variant="outline" className="w-full">
                              <MessageCircle className="h-4 w-4 mr-2" />
                              WhatsApp
                            </Button>
                            <Button variant="outline" className="w-full">
                              <Mail className="h-4 w-4 mr-2" />
                              Send Email
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="font-semibold">Send Message</h3>
                          <div className="space-y-3">
                            <Input placeholder="Your Name" />
                            <Input placeholder="Your Email" />
                            <Input placeholder="Your Phone" />
                            <textarea
                              className="w-full p-3 border rounded-md"
                              rows={4}
                              placeholder="Your Message"
                            />
                            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Send Message</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5" />
                        Reviews & Ratings
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="text-4xl font-bold">4.8</div>
                          <div>
                            <div className="flex items-center gap-1 mb-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className="h-5 w-5 fill-yellow-400 text-yellow-400"
                                />
                              ))}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Based on 124 reviews
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          {[5, 4, 3, 2, 1].map((rating) => (
                            <div
                              key={rating}
                              className="flex items-center gap-3"
                            >
                              <span className="text-sm w-2">{rating}</span>
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <Progress
                                value={
                                  rating === 5 ? 75 : rating === 4 ? 20 : 5
                                }
                                className="flex-1 [&>div]:bg-yellow-400"
                              />
                              <span className="text-sm text-muted-foreground w-8">
                                {rating === 5
                                  ? "75%"
                                  : rating === 4
                                  ? "20%"
                                  : "5%"}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-6">
                        {reviews.map((review, index) => (
                          <div key={index} className="border-b pb-4">
                            <div className="flex items-start gap-4">
                              <Avatar>
                                <AvatarFallback>{review.avatar}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h4 className="font-medium">{review.name}</h4>
                                  <div className="flex items-center gap-1">
                                    {[...Array(review.rating)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className="h-3 w-3 fill-yellow-400 text-yellow-400"
                                      />
                                    ))}
                                  </div>
                                  <span className="text-xs text-muted-foreground">
                                    {review.date}
                                  </span>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {review.comment}
                                </p>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                  <button className="flex items-center gap-1 hover:text-foreground">
                                    <ThumbsUp className="h-3 w-3" />
                                    Helpful ({review.helpful})
                                  </button>
                                  <button className="hover:text-foreground">
                                    Reply
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          // Open review dialog
                          const reviewText = prompt("Write your review:");
                          if (reviewText) {
                            toast.success(
                              "Thank you for your review! It will be published after moderation."
                            );
                          }
                        }}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Write a Review
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "price-trends" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-xl font-bold mb-2">
                            Price Trends for Samanvay The Amelias vs. Ajmer Road
                            (Apartments)
                          </CardTitle>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-green-100 text-green-800">
                              11.64%
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              appreciation in avg. price / sq.ft (Built-up Area)
                              for Samanvay The Amelias in last 1 year
                            </span>
                          </div>
                        </div>
                        <Select defaultValue="3years">
                          <SelectTrigger className="w-40">
                            <SelectValue placeholder="Select period" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1year">Last 1 year</SelectItem>
                            <SelectItem value="3years">Last 3 years</SelectItem>
                            <SelectItem value="5years">Last 5 years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {/* Price Chart */}
                        <div className="h-80">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={priceHistory}>
                              <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#f0f0f0"
                              />
                              <XAxis
                                dataKey="month"
                                axisLine={false}
                                tickLine={false}
                                className="text-xs"
                              />
                              <YAxis
                                axisLine={false}
                                tickLine={false}
                                className="text-xs"
                                tickFormatter={(value) => `₹${value / 1000}k`}
                              />
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "white",
                                  border: "1px solid #e2e8f0",
                                  borderRadius: "8px",
                                  boxShadow:
                                    "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                                }}
                                formatter={(value, name) => [
                                  `₹${value.toLocaleString()}/sq.ft`,
                                  name === "price"
                                    ? "Samanvay The Amelias"
                                    : "Ajmer Road",
                                ]}
                              />
                              <Area
                                type="monotone"
                                dataKey="locality"
                                stroke="#8B5CF6"
                                fill="url(#localityGradient)"
                                strokeWidth={2}
                                name="locality"
                              />
                              <Area
                                type="monotone"
                                dataKey="price"
                                stroke="#f59e0b"
                                fill="url(#projectGradient)"
                                strokeWidth={2}
                                name="price"
                              />
                              <defs>
                                <linearGradient
                                  id="localityGradient"
                                  x1="0"
                                  y1="0"
                                  x2="0"
                                  y2="1"
                                >
                                  <stop
                                    offset="5%"
                                    stopColor="#8B5CF6"
                                    stopOpacity={0.1}
                                  />
                                  <stop
                                    offset="95%"
                                    stopColor="#8B5CF6"
                                    stopOpacity={0}
                                  />
                                </linearGradient>
                                <linearGradient
                                  id="projectGradient"
                                  x1="0"
                                  y1="0"
                                  x2="0"
                                  y2="1"
                                >
                                  <stop
                                    offset="5%"
                                    stopColor="#f59e0b"
                                    stopOpacity={0.1}
                                  />
                                  <stop
                                    offset="95%"
                                    stopColor="#f59e0b"
                                    stopOpacity={0}
                                  />
                                </linearGradient>
                              </defs>
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>

                        {/* Comparison Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="border border-dashed border-purple-300 rounded-lg p-4 text-center relative">
                            <Button
                              variant="ghost"
                              className="absolute top-2 right-2 p-1 h-6 w-6"
                              onClick={() => {
                                // Open property comparison page
                                window.location.href =
                                  "/property-search?compare=true";
                              }}
                            >
                              <PlusCircle className="h-4 w-4 text-purple-600" />
                            </Button>
                            <div className="text-purple-600 font-medium text-sm">
                              ADD MORE
                            </div>
                            <div className="text-purple-600 text-xs">
                              to compare
                            </div>
                          </div>

                          <Card className="p-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                                <span className="font-medium text-sm">
                                  PROJECT
                                </span>
                              </div>
                              <div className="font-bold text-lg">
                                Samanvay The Amelias
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <TrendingUp className="h-4 w-4 text-green-600" />
                                <span className="text-green-600 font-medium">
                                  11.64%
                                </span>
                                <span className="text-muted-foreground">
                                  ₹4.2K/sq.ft
                                </span>
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Last 1 Year
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Avg. rate
                              </div>
                            </div>
                          </Card>

                          <Card className="p-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                                <span className="font-medium text-sm">
                                  LOCALITY (Apartments)
                                </span>
                              </div>
                              <div className="font-bold text-lg">
                                Ajmer Road
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <TrendingUp className="h-4 w-4 text-green-600" />
                                <span className="text-green-600 font-medium">
                                  47.20%
                                </span>
                                <span className="text-muted-foreground">
                                  ₹4.9 K/sq.ft
                                </span>
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Last 1 Year
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Avg. rate
                              </div>
                            </div>
                          </Card>
                        </div>

                        {/* Link */}
                        <div className="pt-4">
                          <Button
                            variant="link"
                            className="p-0 h-auto text-purple-600"
                          >
                            See price trends in Ajmer Road →
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "brochure" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileDown className="h-5 w-5" />
                        Property Brochure
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 text-center">
                            <FileText className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                            <h3 className="text-lg font-semibold mb-2">
                              Property Brochure
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4">
                              Complete details, floor plans, and amenities
                            </p>
                            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                              <Download className="h-4 w-4 mr-2" />
                              Download PDF (2.5 MB)
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 text-center">
                            <ImageIcon className="h-12 w-12 mx-auto mb-4 text-green-600" />
                            <h3 className="text-lg font-semibold mb-2">
                              Floor Plan
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4">
                              Detailed architectural drawings
                            </p>
                            <Button className="bg-green-600 hover:bg-green-700 text-white">
                              <Download className="h-4 w-4 mr-2" />
                              Download Plans
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-4">
                          What's Included
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              Detailed floor plans
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              Amenities overview
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              Location advantages
                            </li>
                          </ul>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              Payment plans
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              Pricing details
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              Developer information
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "calculator" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calculator className="h-5 w-5" />
                        EMI Calculator
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                          <div>
                            <Label htmlFor="loan-amount">Loan Amount</Label>
                            <div className="mt-2">
                              <Slider
                                value={[loanAmount]}
                                onValueChange={(value) =>
                                  setLoanAmount(value[0])
                                }
                                max={5000000}
                                min={1000000}
                                step={100000}
                              />
                              <div className="flex justify-between text-sm text-muted-foreground mt-1">
                                <span>₹10L</span>
                                <span className="font-medium">
                                  ₹{(loanAmount / 100000).toFixed(1)}L
                                </span>
                                <span>₹50L</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="interest-rate">
                              Interest Rate (%)
                            </Label>
                            <div className="mt-2">
                              <Slider
                                value={[interestRate]}
                                onValueChange={(value) =>
                                  setInterestRate(value[0])
                                }
                                max={15}
                                min={6}
                                step={0.1}
                              />
                              <div className="flex justify-between text-sm text-muted-foreground mt-1">
                                <span>6%</span>
                                <span className="font-medium">
                                  {interestRate}%
                                </span>
                                <span>15%</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="tenure">Loan Tenure (Years)</Label>
                            <div className="mt-2">
                              <Slider
                                value={[tenure]}
                                onValueChange={(value) => setTenure(value[0])}
                                max={30}
                                min={5}
                                step={1}
                              />
                              <div className="flex justify-between text-sm text-muted-foreground mt-1">
                                <span>5 years</span>
                                <span className="font-medium">
                                  {tenure} years
                                </span>
                                <span>30 years</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg p-6">
                            <h3 className="text-2xl font-bold text-center mb-4">
                              Monthly EMI
                            </h3>
                            <div className="text-4xl font-bold text-center text-purple-600 mb-6">
                              ₹{calculateEMI().toLocaleString()}
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div className="text-center">
                                <div className="text-muted-foreground">
                                  Principal Amount
                                </div>
                                <div className="font-semibold">
                                  ₹{(loanAmount / 100000).toFixed(1)}L
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="text-muted-foreground">
                                  Total Interest
                                </div>
                                <div className="font-semibold">
                                  ₹
                                  {((calculateEMI() * tenure * 12 -
                                      loanAmount) /
                                    100000
                                  ).toFixed(1)}
                                  L
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <Button
                              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                              onClick={() =>
                                (window.location.href = "/emi-calculator")
                              }
                            >
                              <CreditCard className="h-4 w-4 mr-2" />
                              Apply for Loan
                            </Button>
                            <Button
                              variant="outline"
                              className="w-full"
                              onClick={() =>
                                (window.location.href = "/emi-calculator")
                              }
                            >
                              <PiggyBank className="h-4 w-4 mr-2" />
                              Compare Rates
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "locality" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Map className="h-5 w-5" />
                        Locality Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-4">
                            About Bandra West
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            Bandra West is one of Mumbai's most prestigious
                            neighborhoods, known for its upscale residential
                            complexes, trendy cafes, and vibrant nightlife. The
                            area offers excellent connectivity to business
                            districts and is home to many Bollywood celebrities. With
                            its tree-lined streets and proximity to the
                            sea, Bandra West provides a perfect blend of urban
                            convenience and coastal charm.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium mb-3">
                              Connectivity Score
                            </h4>
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <span className="text-sm">
                                  Metro Connectivity
                                </span>
                                <div className="flex items-center gap-2">
                                  <Progress value={85} className="w-20 [&>div]:bg-purple-600" />
                                  <span className="text-sm font-medium">
                                    8.5/10
                                  </span>
                                </div>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm">Road Network</span>
                                <div className="flex items-center gap-2">
                                  <Progress value={90} className="w-20 [&>div]:bg-purple-600" />
                                  <span className="text-sm font-medium">
                                    9.0/10
                                  </span>
                                </div>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm">
                                  Public Transport
                                </span>
                                <div className="flex items-center gap-2">
                                  <Progress value={75} className="w-20 [&>div]:bg-purple-600" />
                                  <span className="text-sm font-medium">
                                    7.5/10
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-3">
                              Lifestyle Score
                            </h4>
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <span className="text-sm">
                                  Shopping & Dining
                                </span>
                                <div className="flex items-center gap-2">
                                  <Progress value={95} className="w-20 [&>div]:bg-purple-600" />
                                  <span className="text-sm font-medium">
                                    9.5/10
                                  </span>
                                </div>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm">Healthcare</span>
                                <div className="flex items-center gap-2">
                                  <Progress value={88} className="w-20 [&>div]:bg-purple-600" />
                                  <span className="text-sm font-medium">
                                    8.8/10
                                  </span>
                                </div>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm">Education</span>
                                <div className="flex items-center gap-2">
                                  <Progress value={80} className="w-20 [&>div]:bg-purple-600" />
                                  <span className="text-sm font-medium">
                                    8.0/10
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "compare" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Compare Properties
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                          {similarProperties.map((property) => (
                            <Card
                              key={property.id}
                              className="border-2 hover:border-purple-600 transition-colors"
                            >
                              <CardContent className="p-4">
                                <img
                                  src={property.image}
                                  alt={property.title}
                                  className="w-full h-32 object-cover rounded-lg mb-3"
                                />
                                <h3 className="font-semibold mb-1">
                                  {property.title}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {property.location}
                                </p>
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-lg font-bold text-purple-600">
                                    {property.price}
                                  </span>
                                  <div className="flex items-center gap-1">
                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                    <span className="text-xs">
                                      {property.rating}
                                    </span>
                                  </div>
                                </div>
                                <p className="text-sm text-muted-foreground mb-3">
                                  {property.area}
                                </p>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="w-full"
                                  onClick={() => {
                                    toast.success(
                                      `${property.title} added to comparison list!`
                                    );
                                  }}
                                >
                                  Add to Compare
                                </Button>
                              </CardContent>
                            </Card>
                          ))}
                        </div>

                        <Button
                          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                          onClick={() =>
                            (window.location.href =
                              "/property-search?compare=true")
                          }
                        >
                          <Filter className="h-4 w-4 mr-2" />
                          Compare Selected Properties
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "developer" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        About Developer
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-start gap-6 mb-6">
                        <img
                          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100"
                          alt="Developer Logo"
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="text-xl font-semibold mb-2">
                            Prestige Group
                          </h3>
                          <p className="text-muted-foreground mb-3">
                            Established in 1986, Prestige Group is one of
                            India's leading real estate developers with over 35
                            years of experience in creating landmark residential
                            and commercial projects across major cities.
                          </p>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span>4.6 Rating</span>
                            </div>
                            <div>125+ Projects</div>
                            <div>50M+ sq ft Delivered</div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-3">
                            Company Highlights
                          </h4>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              RERA Registered Developer
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              On-time Project Delivery
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              Quality Construction Standards
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              Customer Satisfaction Focus
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-medium mb-3">
                            Awards & Recognition
                          </h4>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                              <Award className="h-4 w-4 text-yellow-500" />
                              Best Developer Award 2023
                            </li>
                            <li className="flex items-center gap-2">
                              <Award className="h-4 w-4 text-yellow-500" />
                              Excellence in Construction
                            </li>
                            <li className="flex items-center gap-2">
                              <Award className="h-4 w-4 text-yellow-500" />
                              Green Building Certification
                            </li>
                            <li className="flex items-center gap-2">
                              <Award className="h-4 w-4 text-yellow-500" />
                              Customer Choice Award
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "qna" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MessageCircle className="h-5 w-5" />
                        Questions & Answers
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <Button
                          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                          onClick={() => {
                            const question = prompt(
                              "What would you like to ask about this property?"
                            );
                            if (question) {
                              toast.success(
                                "Your question has been submitted and will be answered by our expert soon!"
                              );
                            }
                          }}
                        >
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Ask a Question
                        </Button>

                        <div className="space-y-4">
                          <div className="border rounded-lg p-4">
                            <div className="flex items-start gap-3 mb-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>SM</AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-medium">Suresh Mehta</h4>
                                <p className="text-sm text-muted-foreground">
                                  2 days ago
                                </p>
                              </div>
                            </div>
                            <p className="text-sm mb-3">
                              What are the maintenance charges for this
                              property?
                            </p>
                            <div className="bg-muted/50 rounded-lg p-3 ml-6">
                              <div className="flex items-center gap-2 mb-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback className="text-xs">
                                    RS
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-sm font-medium">
                                  Rajesh Sharma (Agent)
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                The maintenance charges are ₹8 per sq ft per
                                month, which includes common area maintenance,
                                security, and basic amenities.
                              </p>
                            </div>
                          </div>

                          <div className="border rounded-lg p-4">
                            <div className="flex items-start gap-3 mb-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>PK</AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-medium">Priya Kumar</h4>
                                <p className="text-sm text-muted-foreground">
                                  1 week ago
                                </p>
                              </div>
                            </div>
                            <p className="text-sm mb-3">
                              Is the property ready for immediate possession?
                            </p>
                            <div className="bg-muted/50 rounded-lg p-3 ml-6">
                              <div className="flex items-center gap-2 mb-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback className="text-xs">
                                    RS
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-sm font-medium">
                                  Rajesh Sharma (Agent)
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Yes, this property is ready for immediate
                                possession. All approvals and documentation are
                                complete.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "faqs" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <HelpCircle className="h-5 w-5" />
                        Frequently Asked Questions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                          <AccordionTrigger>
                            What is the total price including all charges?
                          </AccordionTrigger>
                          <AccordionContent>
                            The total price is ₹2.50 Cr plus registration
                            charges, stamp duty, and other legal fees. The
                            all-inclusive price would be approximately ₹2.65 Cr.
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-2">
                          <AccordionTrigger>
                            What are the payment options available?
                          </AccordionTrigger>
                          <AccordionContent>
                            We offer flexible payment plans including
                            construction-linked plans, possession-linked plans, and
                            down payment plans. Home loan assistance is also
                            available from leading banks.
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-3">
                          <AccordionTrigger>
                            Is this property RERA approved?
                          </AccordionTrigger>
                          <AccordionContent>
                            Yes, this project is RERA approved with registration
                            number P51700000271. All necessary approvals and
                            clearances are in place.
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-4">
                          <AccordionTrigger>
                            What amenities are included?
                          </AccordionTrigger>
                          <AccordionContent>
                            The property includes premium amenities like
                            swimming pool, gym, 24/7 security, covered parking,
                            landscaped gardens, kids play area, and community
                            hall.
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-5">
                          <AccordionTrigger>
                            Can I get a virtual tour of the property?
                          </AccordionTrigger>
                          <AccordionContent>
                            Yes, we offer both virtual tours and 360-degree
                            views of the property. You can also schedule a
                            physical site visit at your convenience.
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "similar" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Building className="h-5 w-5" />
                        Similar Properties
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {similarProperties.map((property) => (
                          <Card
                            key={property.id}
                            className="border hover:border-purple-600 transition-colors"
                          >
                            <CardContent className="p-0">
                              <img
                                src={property.image}
                                alt={property.title}
                                className="w-full h-48 object-cover rounded-t-lg"
                              />
                              <div className="p-4">
                                <h3 className="font-semibold mb-2">
                                  {property.title}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {property.location}
                                </p>
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-lg font-bold text-purple-600">
                                    {property.price}
                                  </span>
                                  <div className="flex items-center gap-1">
                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                    <span className="text-xs">
                                      {property.rating}
                                    </span>
                                  </div>
                                </div>
                                <p className="text-sm text-muted-foreground mb-3">
                                  {property.area}
                                </p>
                                <Button
                                  size="sm"
                                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                                  onClick={() =>
                                    (window.location.href = `/property/${property.id}`)
                                  }
                                >
                                  View Details
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() =>
                          (window.location.href =
                            "/property-search?similar=true")
                        }
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View All Similar Properties
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "news" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        Latest News & Updates
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {newsUpdates.map((news, index) => (
                          <div
                            key={index}
                            className="border-b pb-4 last:border-b-0"
                          >
                            <div className="flex items-start gap-4">
                              <div className="bg-purple-100 p-2 rounded-lg">
                                <Clock className="h-5 w-5 text-purple-600" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold mb-1">
                                  {news.title}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {news.summary}
                                </p>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                  <span>{news.source}</span>
                                  <span>{news.date}</span>
                                  <button className="text-purple-600 hover:underline">
                                    Read More
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => (window.location.href = "/articles")}
                      >
                        <Globe className="h-4 w-4 mr-2" />
                        View All News Updates
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:sticky lg:top-32 lg:self-start space-y-6">
            {/* Contact Form */}

            <Card className="card-gradient">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Frequently used features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Dialog
                  open={isPropertyTypeDialogOpen}
                  onOpenChange={setIsPropertyTypeDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="default"
                      className="w-full justify-start bg-purple-600 text-white hover:bg-purple-700"
                      size="lg"
                    >
                      <Building2 className="mr-3 h-5 w-5" />
                      Add Property Type
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add Property Type</DialogTitle>
                      <DialogDescription>
                        Add a new property type category.
                      </DialogDescription>
                    </DialogHeader>
                    <form
                      onSubmit={handlePropertyTypeSubmit}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          value={propertyTypeForm.name}
                          onChange={(e) =>
                            setPropertyTypeForm({
                              ...propertyTypeForm,
                              name: e.target.value,
                            })
                          }
                          placeholder="e.g., Apartment, Villa, Office"
                          maxLength={100}
                          minLength={1}
                          required
                        />
                        <p className="text-xs text-muted-foreground">
                          Max 100 characters
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <textarea
                          id="description"
                          value={propertyTypeForm.description}
                          onChange={(e) =>
                            setPropertyTypeForm({
                              ...propertyTypeForm,
                              description: e.target.value,
                            })
                          }
                          placeholder="Brief description of this property type"
                          className="w-full p-3 border rounded-md resize-none"
                          rows={3}
                        />
                      </div>

                      <div className="flex justify-end space-x-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsPropertyTypeDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">Add Property Type</Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>

                <Dialog
                  open={isDocumentDialogOpen}
                  onOpenChange={setIsDocumentDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      size="lg"
                    >
                      <Building2 className="mr-3 h-5 w-5" />
                      Add Document
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add Property Document</DialogTitle>
                      <DialogDescription>
                        Add a new document for this property.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleDocumentSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="document_type">Document Type</Label>
                        <Input
                          id="document_type"
                          value={documentForm.document_type}
                          onChange={(e) =>
                            setDocumentForm({
                              ...documentForm,
                              document_type: e.target.value,
                            })
                          }
                          placeholder="Enter document type"
                          maxLength={100}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="document_file">Document File</Label>
                        <Input
                          id="document_file"
                          type="file"
                          accept=".pdf,.docx"
                          onChange={(e) =>
                            setDocumentForm({
                              ...documentForm,
                              document_file: e.target.files?.[0] || null,
                            })
                          }
                          required
                        />
                      </div>

                      {/* <div className="space-y-2">
                        <Label htmlFor="property">Property ID</Label>
                        <Input
                          id="property"
                          type="number"
                          value={documentForm.property}
                          onChange={(e) =>
                            setDocumentForm({
                              ...documentForm,
                              property: parseInt(e.target.value),
                            })
                          }
                          required
                        />
                      </div> */}

                      <div className="flex justify-end space-x-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsDocumentDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">Add Document</Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>




                <Dialog
                  open={isImagesDialogOpen}
                  onOpenChange={setIsImagesDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      size="lg"
                    >
                      <Users className="mr-3 h-5 w-5" />
                      Add Images
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add Property Image</DialogTitle>
                      <DialogDescription>
                        Add a new image for this property.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleImagesSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="image">Image File</Label>
                        <Input
                          id="image"
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            setImagesForm({
                              ...imagesForm,
                              image: e.target.files?.[0] || null,
                            })
                          }
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="caption">Caption</Label>
                        <Input
                          id="caption"
                          value={imagesForm.caption}
                          onChange={(e) =>
                            setImagesForm({
                              ...imagesForm,
                              caption: e.target.value,
                            })
                          }
                          placeholder="e.g., Living room, Kitchen, Bedroom"
                          maxLength={255}
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="is_primary"
                          checked={imagesForm.is_primary}
                          onCheckedChange={(checked) =>
                            setImagesForm({
                              ...imagesForm,
                              is_primary: checked as boolean,
                            })
                          }
                        />
                        <Label htmlFor="is_primary">Is Primary</Label>
                      </div>

                      {/* <div className="space-y-2">
                        <Label htmlFor="property_img">Property ID</Label>
                        <Input
                          id="property_img"
                          type="number"
                          value={imagesForm.property}
                          onChange={(e) =>
                            setImagesForm({
                              ...imagesForm,
                              property: parseInt(e.target.value),
                            })
                          }
                          required
                        />
                      </div> */}

                      <div className="flex justify-end space-x-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsImagesDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">Add Image</Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>

                <Dialog
                  open={isAmenitiesDialogOpen}
                  onOpenChange={setIsAmenitiesDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      size="lg"
                    >
                      <TrendingUp className="mr-3 h-5 w-5" />
                      Add Amenities
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add Property Amenity</DialogTitle>
                      <DialogDescription>
                        Add a new amenity for this property.
                      </DialogDescription>
                    </DialogHeader>
                    <form
                      onSubmit={handleAmenitiesSubmit}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="amenity">Amenity</Label>
                        <Input
                          id="amenity"
                          value={amenitiesForm.amenity}
                          onChange={(e) =>
                            setAmenitiesForm({
                              ...amenitiesForm,
                              amenity: e.target.value,
                            })
                          }
                          placeholder="Enter amenity name"
                          maxLength={100}
                          required
                        />
                      </div>

                      {/* <div className="space-y-2">
                        <Label htmlFor="property_amenity">Property ID</Label>
                        <Input
                          id="property_amenity"
                          type="number"
                          value={amenitiesForm.property}
                          onChange={(e) =>
                            setAmenitiesForm({
                              ...amenitiesForm,
                              property: parseInt(e.target.value),
                            })
                          }
                          required
                        />
                      </div> */}

                      <div className="flex justify-end space-x-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsAmenitiesDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">Add Amenity</Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Get Best Deal</CardTitle>
                <CardDescription>
                  Connect with our property expert
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Your Name"
                  value={bestDealForm.name}
                  onChange={(e) =>
                    setBestDealForm({ ...bestDealForm, name: e.target.value })
                  }
                />
                <Input
                  placeholder="Phone Number"
                  value={bestDealForm.phone}
                  onChange={(e) =>
                    setBestDealForm({ ...bestDealForm, phone: e.target.value })
                  }
                />
                <Input
                  placeholder="Email Address"
                  value={bestDealForm.email}
                  onChange={(e) =>
                    setBestDealForm({ ...bestDealForm, email: e.target.value })
                  }
                />
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white" onClick={handleGetBestDeal}>
                  <Phone className="h-4 w-4 mr-2" />
                  Get Call Back
                </Button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() =>
                      window.open(
                        "https://wa.me/919876543210?text=I am interested in the property listing"
                      )
                    }
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => (window.location.href = "/book-visit")}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Site Visit
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Facts */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Facts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Property ID
                  </span>
                  <span className="text-sm font-medium">BW2024001</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Listed On
                  </span>
                  <span className="text-sm font-medium">Jan 15, 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Property Age
                  </span>
                  <span className="text-sm font-medium">5 Years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Ownership
                  </span>
                  <span className="text-sm font-medium">Freehold</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Views</span>
                  <span className="text-sm font-medium">2,450</span>
                </div>
              </CardContent>
            </Card>

            {/* Price Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Price Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Base Price
                  </span>
                  <span className="text-sm font-medium">₹2,50,00,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Registration
                  </span>
                  <span className="text-sm font-medium">₹2,50,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Stamp Duty
                  </span>
                  <span className="text-sm font-medium">₹12,50,000</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total Cost</span>
                  <span className="text-purple-600">₹2,65,00,000</span>
                </div>
              </CardContent>
            </Card>

            {/* Area Converter */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ruler className="h-4 w-4" />
                  Area Converter
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="area-from">From</Label>
                  <div className="flex gap-2">
                    <Input
                      id="area-from"
                      type="number"
                      placeholder="Enter area"
                      value={areaFrom}
                      onChange={(e) => setAreaFrom(e.target.value)}
                      className="flex-1"
                    />
                    <Select value={fromUnit} onValueChange={setFromUnit}>
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sqft">sq ft</SelectItem>
                        <SelectItem value="sqm">sq m</SelectItem>
                        <SelectItem value="acre">acre</SelectItem>
                        <SelectItem value="hectare">hectare</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="area-to">To</Label>
                  <div className="flex gap-2">
                    <Input
                      id="area-to"
                      type="number"
                      placeholder="Converted area"
                      value={areaTo}
                      readOnly
                      className="flex-1 bg-muted"
                    />
                    <Select value={toUnit} onValueChange={setToUnit}>
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sqft">sq ft</SelectItem>
                        <SelectItem value="sqm">sq m</SelectItem>
                        <SelectItem value="acre">acre</SelectItem>
                        <SelectItem value="hectare">hectare</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button onClick={convertArea} className="w-full bg-purple-600 hover:bg-purple-700 text-white" size="sm">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Convert
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default PropertyDetail;