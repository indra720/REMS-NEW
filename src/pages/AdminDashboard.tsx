import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
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
import {
  Bug,
  Info,
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  CircleDollarSign,
  ListChecks,
  MessageSquare,
  Calendar,
  CheckSquare,
  AlertCircle,
  Type as TypeIcon,
  Building,
  Users,
  DollarSign,
  AlertTriangle,
  Shield,
  CheckCircle,
  IndianRupee,
  XCircle,
} from "lucide-react";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import UnifiedPopup from "@/components/UnifiedPopup";

const AdminDashboard = () => {

  const handleViewUsers = () => {
    toast.success("Loading user management panel...");
    // Navigate to users page
  };

  const handleViewProperties = () => {
    toast.success("Loading properties management...");
    // Navigate to properties page
  };

  const handleViewRevenue = () => {
    toast.success("Loading revenue analytics...");
    // Navigate to revenue page
  };

  const handlePendingApprovals = () => {
    toast.success("Loading pending approvals...");
    // Navigate to approvals page
  };
  const [loading, setLoading] = useState(true);

  // State for Problem Reports
  const [problemReports, setProblemReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [isReportEditMode, setIsReportEditMode] = useState(false);
  const [editReportForm, setEditReportForm] = useState({
    problem_type: "",
    name: "",
    email: "",
    problem_summary: "",
    detailed_description: "",
    priority: "",
  });

  // State for Request Info
  const [requestInfoList, setRequestInfoList] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isRequestInfoDialogOpen, setIsRequestInfoDialogOpen] = useState(false);
  const [isRequestInfoEditMode, setIsRequestInfoEditMode] = useState(false);
  const [editRequestInfoForm, setEditRequestInfoForm] = useState({
    info_types: "",
    full_name: "",
    email: "",
    phone_number: "",
  });

  const fetchProblemReports = async () => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch("http://127.0.0.1:8000/api/report-problems/", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setProblemReports(data.results || data || []);
      } else {
        console.error("Failed to fetch problem reports:", response.status);
      }
    } catch (error) {
      console.error("Error fetching problem reports:", error);
    }
  };

  const fetchRequestInfo = async () => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch("http://localhost:8000/api/request-info/", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setRequestInfoList(data.results || data || []);
      } else {
        console.error("Failed to fetch request info:", response.status);
      }
    } catch (error) {
      console.error("Error fetching request info:", error);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      await Promise.all([fetchProblemReports(), fetchRequestInfo()]);
      setLoading(false);
    };
    fetchAllData();
  }, []);

  // --- Problem Report Functions ---
  const handleReportClick = (report) => {
    setSelectedReport(report);
    setEditReportForm({
      problem_type: report.problem_type || "",
      name: report.name || "",
      email: report.email || "",
      problem_summary: report.problem_summary || "",
      detailed_description: report.detailed_description || "",
      priority: report.priority || "low",
    });
    setIsReportDialogOpen(true);
    setIsReportEditMode(false);
  };

  const handleSaveReportEdit = async () => {
    if (!selectedReport) return;
    const token = localStorage.getItem("access_token");
    try {
      const payload = {
        ...selectedReport, // a good practice to not lose fields
        ...editReportForm,
      };

      const response = await fetch(
        `http://127.0.0.1:8000/api/report-problems/${selectedReport.slug}/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (response.ok) {
        toast.success("Report updated successfully!");
        setIsReportDialogOpen(false);
        fetchProblemReports();
      } else {
        const errorData = await response.json();
        console.error("Update failed:", errorData);
        toast.error(`Failed to update: ${JSON.stringify(errorData)}`);
      }
    } catch (error) {
      toast.error("Error updating report");
    }
  };

  const handleDeleteReport = async (slug) => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/report-problems/${slug}/`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 204) {
        toast.success("Report deleted successfully!");
        setIsReportDialogOpen(false);
        fetchProblemReports();
      } else {
        toast.error("Failed to delete report");
      }
    } catch (error) {
      toast.error("Error deleting report");
    }
  };

  // --- Request Info Functions ---
  const handleRequestInfoClick = (request) => {
    setSelectedRequest(request);
    setEditRequestInfoForm({
      info_types: Array.isArray(request.info_types)
        ? request.info_types.join(", ")
        : request.info_types || "",
      full_name: request.full_name || "",
      email: request.email || "",
      phone_number: request.phone_number || "",
    });
    setIsRequestInfoDialogOpen(true);
    setIsRequestInfoEditMode(false);
  };

  const handleSaveRequestInfoEdit = async () => {
    if (!selectedRequest) return;
    const token = localStorage.getItem("access_token");
    const identifier = selectedRequest.slug;
    try {
      const payload = {
        full_name: editRequestInfoForm.full_name.trim(),
        email: editRequestInfoForm.email.trim(),
        phone_number: editRequestInfoForm.phone_number.trim(),
        info_types: editRequestInfoForm.info_types
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      };

      const response = await fetch(
        `http://localhost:8000/api/request-info/${identifier}/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (response.ok) {
        toast.success("Request info updated successfully!");
        setIsRequestInfoDialogOpen(false);
        fetchRequestInfo();
      } else {
        const errorData = await response.json();
        toast.error(`Failed to update: ${JSON.stringify(errorData)}`);
      }
    } catch (error) {
      toast.error("Error updating request info");
    }
  };

  const handleDeleteRequestInfo = async (slug) => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(
        `http://localhost:8000/api/request-info/${slug}/`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 204) {
        toast.success("Request info deleted successfully!");
        setIsRequestInfoDialogOpen(false);
        fetchRequestInfo();
      } else {
        toast.error("Failed to delete request info");
      }
    } catch (error) {
      toast.error("Error deleting request info");
    }
  };

  const renderDetailRow = (Icon, label, value, fullWidth = false) => (
    <div className={`flex items-start gap-4 py-3 ${fullWidth ? 'md:col-span-2' : ''}`}>
      <Icon className="h-5 w-5 text-muted-foreground mt-1 flex-shrink-0" />
      <div className="flex-1">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="text-base font-semibold text-foreground break-words">{value || 'N/A'}</p>
      </div>
    </div>
  );

  const PropertiesList = () => {
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
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
      }).format(price);
    };

    const getStatusColor = (status: string) => {
      switch (status?.toLowerCase()) {
        case 'available':
          return 'bg-green-100 text-green-800 hover:bg-green-200';
        case 'sold':
          return 'bg-red-100 text-red-800 hover:bg-red-200';
        case 'pending':
          return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
        default:
          return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
      }
    };

    const getCategoryColor = (category: string) => {
      switch (category?.toLowerCase()) {
        case 'residential':
          return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
        case 'commercial':
          return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
        case 'industrial':
          return 'bg-orange-100 text-orange-800 hover:bg-orange-200';
        default:
          return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
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
                        src={'/delhi.jpg'}
                        alt={property.title}
                        className="w-16 h-16 object-cover rounded-lg border-2 border-gray-200 group-hover:border-blue-300 transition-colors duration-300 shadow-sm"
                      />
                      {/* RERA icon above image */}
                      <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5 shadow-sm">
                        {property.rera_approved ? <CheckCircle className="h-4 w-4 text-emerald-500" /> : <XCircle className="h-4 w-4 text-red-500" />}
                      </div>
                      {/* Listed On below image */}
                      <span className="text-xs text-gray-500 block text-center mt-1">{new Date(property.listed_on).toLocaleDateString()}</span>
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
                      src={'/delhi.jpg'}
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
                          <span className="text-xs text-gray-500">{new Date(property.listed_on).toLocaleDateString()}</span>
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
    <>
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold text-gradient">Admin Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card
              className="card-hover cursor-pointer"
              onClick={handleViewUsers}
            >
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Total Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">12,543</div>
                <Badge className="bg-success text-success-foreground">
                  +12%
                </Badge>
              </CardContent>
            </Card>

            <Card
              className="card-hover cursor-pointer"
              onClick={handleViewProperties}
            >
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="mr-2 h-5 w-5" />
                  Properties
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">8,921</div>
                <Badge className="bg-success text-success-foreground">
                  +8%
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
                <div className="text-3xl font-bold">₹2.1Cr</div>
                <Badge className="bg-success text-success-foreground">
                  +15%
                </Badge>
              </CardContent>
            </Card>

            <Card
              className="card-hover cursor-pointer"
              onClick={handlePendingApprovals}
            >
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  Pending Approvals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">23</div>
                <Badge variant="destructive">Action Required</Badge>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>New property listing</span>
                    <Badge variant="secondary">2 min ago</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>User verification</span>
                    <Badge variant="secondary">5 min ago</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Payment processed</span>
                    <Badge variant="secondary">10 min ago</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-5 w-5" />
                  System Health
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Server Status</span>
                    <Badge className="bg-success text-success-foreground">
                      Online
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Database</span>
                    <Badge className="bg-success text-success-foreground">
                      Healthy
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>AI Services</span>
                    <Badge className="bg-success text-success-foreground">
                      Active
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* ReportProblem and RequestInfo */}
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gradient">
            Admin Dashboard
          </h1>

          <div className="grid grid-cols-1  gap-8 items-start">
            {/* Problem Reports Section */}
            <Card className="card-gradient shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Bug className="h-6 w-6 text-red-500" />
                  <span className="text-xl font-bold">
                    Recent Problem Reports
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {loading ? (
                  <p>Loading reports...</p>
                ) : problemReports.length > 0 ? (
                  problemReports.slice(0, 5).map((report) => (
                    <div
                      key={report.id}
                      className="p-4 rounded-lg border bg-card/50 hover:bg-muted/50 transition-all duration-300 cursor-pointer shadow-sm hover:scale-[1.02]"
                      onClick={() => handleReportClick(report)}
                    >
                      <div className="flex justify-between items-start">
                        <p className="font-bold text-base mb-1 pr-2">
                          {report.problem_summary}
                        </p>
                        <Badge
                          variant={
                            report.priority === "high" ||
                            report.priority === "critical"
                              ? "destructive"
                              : "outline"
                          }
                          className="capitalize flex-shrink-0"
                        >
                          {report.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground truncate mb-3">
                        {report.detailed_description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="font-medium">{report.name}</span>
                        <span>
                          {new Date(report.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-4">
                    No problem reports yet.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Request Info Section */}
            <Card className="card-gradient shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Info className="h-6 w-6 text-blue-500" />
                  <span className="text-xl font-bold">
                    Recent Information Requests
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {loading ? (
                  <p>Loading requests...</p>
                ) : requestInfoList.length > 0 ? (
                  requestInfoList.slice(0, 5).map((request) => (
                    <div
                      key={request.id}
                      className="p-4 rounded-lg border bg-card/50 hover:bg-muted/50 transition-all duration-300 cursor-pointer shadow-sm hover:scale-[1.02]"
                      onClick={() => handleRequestInfoClick(request)}
                    >
                      <div className="flex justify-between items-start">
                        <p className="font-bold text-base mb-1 pr-2">
                          {request.property_type} in{" "}
                          {request.preferred_location}
                        </p>
                        <Badge variant="default" className="flex-shrink-0">
                          Request
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground truncate mb-3">
                        Budget: {request.budget_range}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="font-medium">{request.full_name}</span>
                        <span>
                          {new Date(request.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-4">
                    No information requests yet.
                  </p>
                )}
              </CardContent>
            </Card>
            <PropertiesList />
          </div>
        </div>

        {/* Problem Report Detail Dialog */}
        <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
          <DialogContent className="max-w-md max-h-[90vh] my-8 overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Bug className="h-5 w-5 text-red-500" />
                Problem Report Details
              </DialogTitle>
            </DialogHeader>
            {selectedReport && (
              <div className="space-y-4">
                {isReportEditMode ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSaveReportEdit();
                    }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">User Name</Label>
                        <Input
                          id="name"
                          value={editReportForm.name}
                          onChange={(e) =>
                            setEditReportForm({
                              ...editReportForm,
                              name: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">User Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={editReportForm.email}
                          onChange={(e) =>
                            setEditReportForm({
                              ...editReportForm,
                              email: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="problem_type">Problem Type</Label>
                        <Input
                          id="problem_type"
                          value={editReportForm.problem_type}
                          onChange={(e) =>
                            setEditReportForm({
                              ...editReportForm,
                              problem_type: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="priority">Priority</Label>
                        <Select
                          value={editReportForm.priority}
                          onValueChange={(value) =>
                            setEditReportForm({
                              ...editReportForm,
                              priority: value,
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="critical">Critical</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="problem_summary">Summary</Label>
                        <Input
                          id="problem_summary"
                          value={editReportForm.problem_summary}
                          onChange={(e) =>
                            setEditReportForm({
                              ...editReportForm,
                              problem_summary: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="detailed_description">
                          Description
                        </Label>
                        <Textarea
                          id="detailed_description"
                          value={editReportForm.detailed_description}
                          onChange={(e) =>
                            setEditReportForm({
                              ...editReportForm,
                              detailed_description: e.target.value,
                            })
                          }
                          rows={4}
                        />
                      </div>
                    </div>
                    <DialogFooter className="pt-4 border-t mt-4 flex justify-end gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsReportEditMode(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="bg-purple-600 text-white hover:bg-purple-700"
                      >
                        Save Changes
                      </Button>
                    </DialogFooter>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-2 border rounded-lg">
                        <label className="text-sm font-medium text-muted-foreground">
                          User Name
                        </label>
                        <p className="font-semibold text-sm">
                          {selectedReport.name}
                        </p>
                      </div>
                      <div className="p-2 border rounded-lg">
                        <label className="text-sm  font-normal text-muted-foreground">
                          User Email
                        </label>
                        <p className="font-semibold text-sm">
                          {selectedReport.email}
                        </p>
                      </div>
                      <div className="p-2 border rounded-lg">
                        <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                          <TypeIcon className="h-4 w-4" />
                          Problem Type
                        </label>
                        <p className="font-medium mt-1">
                          {selectedReport.problem_type}
                        </p>
                      </div>
                      <div className="p-2 border rounded-lg">
                        <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          Priority
                        </label>
                        <Badge
                          variant={
                            selectedReport.priority === "high" ||
                            selectedReport.priority === "critical"
                              ? "destructive"
                              : "default"
                          }
                          className="mt-1"
                        >
                          {selectedReport.priority}
                        </Badge>
                      </div>
                      <div className="p-2 border rounded-lg sm:col-span-2">
                        <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                          <ListChecks className="h-4 w-4" />
                          Summary
                        </label>
                        <p className="font-medium mt-1">
                          {selectedReport.problem_summary}
                        </p>
                      </div>
                      <div className="p-2 border rounded-lg sm:col-span-2">
                        <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                          <ListChecks className="h-4 w-4" />
                          Description
                        </label>
                        <p className="font-medium mt-1">
                          {selectedReport.detailed_description}
                        </p>
                      </div>
                    </div>
                    <DialogFooter className="pt-4 border-t mt-4 flex justify-end gap-2">
                      <Button
                        variant="destructive"
                        onClick={() => handleDeleteReport(selectedReport.slug)}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsReportEditMode(true)}
                      >
                        Edit Report
                      </Button>
                    </DialogFooter>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Request Info Detail Dialog */}
        <Dialog
          open={isRequestInfoDialogOpen}
          onOpenChange={setIsRequestInfoDialogOpen}
        >
          <DialogContent className="max-w-md max-h-[90vh] my-8 overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-500" />
                Request Information Details
              </DialogTitle>
            </DialogHeader>
            {selectedRequest && (
              <div className="space-y-4">
                {isRequestInfoEditMode ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSaveRequestInfoEdit();
                    }}
                  >
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="full_name">Full Name</Label>
                        <Input
                          id="full_name"
                          value={editRequestInfoForm.full_name}
                          onChange={(e) =>
                            setEditRequestInfoForm({
                              ...editRequestInfoForm,
                              full_name: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={editRequestInfoForm.email}
                          onChange={(e) =>
                            setEditRequestInfoForm({
                              ...editRequestInfoForm,
                              email: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone_number">Phone</Label>
                        <Input
                          id="phone_number"
                          value={editRequestInfoForm.phone_number}
                          onChange={(e) =>
                            setEditRequestInfoForm({
                              ...editRequestInfoForm,
                              phone_number: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="info_types">
                          Info Types (comma-separated)
                        </Label>
                        <Input
                          id="info_types"
                          value={editRequestInfoForm.info_types}
                          onChange={(e) =>
                            setEditRequestInfoForm({
                              ...editRequestInfoForm,
                              info_types: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <DialogFooter className="pt-4 border-t mt-4 flex justify-end gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsRequestInfoEditMode(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="bg-purple-600 text-white hover:bg-purple-700"
                      >
                        Save Changes
                      </Button>
                    </DialogFooter>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="p-2 border rounded-lg">
                        <label className="text-sm font-medium text-muted-foreground">
                          Full Name
                        </label>
                        <p className="font-semibold text-sm">
                          {selectedRequest.full_name}
                        </p>
                      </div>
                      <div className="p-2 border rounded-lg">
                        <label className="text-sm font-medium text-muted-foreground">
                          Email
                        </label>
                        <p className="font-semibold text-sm">
                          {selectedRequest.email}
                        </p>
                      </div>
                      <div className="p-2 border rounded-lg">
                        <label className="text-sm font-medium text-muted-foreground">
                          Phone
                        </label>
                        <p className="font-semibold text-sm">
                          {selectedRequest.phone_number}
                        </p>
                      </div>
                      <div className="p-2 border rounded-lg">
                        <label className="text-sm font-medium text-muted-foreground">
                          Info Types
                        </label>
                        <p className="font-semibold text-sm">
                          {(selectedRequest.info_types || []).join(", ")}
                        </p>
                      </div>
                      <div className="p-2 border rounded-lg">
                        <label className="text-sm font-medium text-muted-foreground">
                          City
                        </label>
                        <p className="font-semibold text-sm">
                          {selectedRequest.city}
                        </p>
                      </div>
                      <div className="p-2 border rounded-lg">
                        <label className="text-sm font-medium text-muted-foreground">
                          Property Type
                        </label>
                        <p className="font-semibold text-sm">
                          {selectedRequest.property_type}
                        </p>
                      </div>
                      <div className="p-2 border rounded-lg">
                        <label className="text-sm font-medium text-muted-foreground">
                          Budget
                        </label>
                        <p className="font-semibold text-sm">
                          {selectedRequest.budget_range}
                        </p>
                      </div>
                      <div className="p-2 border rounded-lg">
                        <label className="text-sm font-medium text-muted-foreground">
                          Contact Method
                        </label>
                        <p className="font-semibold text-sm">
                          {selectedRequest.communication_method}
                        </p>
                      </div>
                      <div className="p-2 border rounded-lg">
                        <label className="text-sm font-medium text-muted-foreground">
                          Timeline
                        </label>
                        <p className="font-semibold text-sm">
                          {selectedRequest.timeline}
                        </p>
                      </div>
                      <div className="p-2 border rounded-lg">
                        <label className="text-sm font-medium text-muted-foreground">
                          Consent
                        </label>
                        <p className="font-semibold text-sm">
                          {selectedRequest.consent ? "Yes" : "No"}
                        </p>
                      </div>
                      <div className="p-2 border rounded-lg">
                        <label className="text-sm font-medium text-muted-foreground">
                          Preferred Location
                        </label>
                        <p className="font-semibold text-sm">
                          {selectedRequest.preferred_location}
                        </p>
                      </div>
                      <div className="p-2 border rounded-lg">
                        <label className="text-sm font-medium text-muted-foreground">
                          Requirements
                        </label>
                        <p className="font-semibold text-sm">
                          {selectedRequest.specific_requirements}
                        </p>
                      </div>
                    </div>
                    <DialogFooter className="pt-4 border-t mt-4 flex justify-end gap-2">
                      <Button
                        variant="destructive"
                        onClick={() =>
                          handleDeleteRequestInfo(selectedRequest.slug)
                        }
                      >
                        Delete
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsRequestInfoEditMode(true)}
                      >
                        Edit Request
                      </Button>
                    </DialogFooter>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

    </>
  );
};

export default AdminDashboard;