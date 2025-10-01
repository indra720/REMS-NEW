import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Building2,
  Users,
  TrendingUp,
  DollarSign,
  Eye,
  Heart,
  Calendar,
  MessageCircle,
  Clock,
  MapPin,
  User,
  Edit,
  Trash2,
  Save,
  X,
  AlertTriangle,
  Bug,
  FileText,
  CreditCard,
  Smartphone,
  Info,
} from "lucide-react";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import PropertySearch from "./PropertySearch";
import { Textarea } from "@/components/ui/textarea";
import { selectAllErrorBarSettings } from "recharts/types/state/selectors/axisSelectors";

const Dashboard = () => {
  

  const [visits, setVisits] = useState([]);
  const [problemReports, setProblemReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVisit, setSelectedVisit] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editFormData, setEditFormData] = useState({
    preferred_time: "",
    status: "",
    property: "",
  });

  // Filter state for PropertySearch
  const [filterState, setFilterState] = useState({
    sortBy: "relevance",
    priceRange: [0, 1000000],
    propertyType: "",
    searchTerm: "",
  });

  const [properties, setProperties] = useState([]);

  const fetchProperties = async () => {
    const token = localStorage.getItem("access_token");
    const response = await fetch("http://127.0.0.1:8000/api/properties/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      const data = await response.json();
      if (data && data.results && Array.isArray(data.results)) {
        setProperties(data.results);
      } else if (Array.isArray(data)) {
        setProperties(data);
      }
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // Fetch user visits
  const fetchUserVisits = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/visits/", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setVisits(data);
        console.log("Visits fetched:", data);
      } else {
        console.error("Failed to fetch visits:", response.status);
      }
    } catch (error) {
      console.error("Error fetching visits:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch problem reports
  const fetchProblemReports = async () => {
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/report-problems/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setProblemReports(data.results || data || []);
        console.log("Problem reports fetched:", data);
      } else {
        console.error("Failed to fetch problem reports:", response.status);
      }
    } catch (error) {
      console.error("Error fetching problem reports:", error);
    }
  };

  useEffect(() => {
    fetchUserVisits();
    fetchProblemReports();
  }, []);

  // Edit visit function
  const handleEditVisit = async (visit) => {
    setEditMode(true);
    setEditFormData({
      preferred_time: visit.preferred_time.slice(0, 16), // Format for datetime-local input
      status: visit.status,
      property: visit.property.toString(),
    });
    console.log("Editing visit:", visit);
  };

  // Save edited visit
  const handleSaveEdit = async (visit) => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      toast({
        title: "Authentication Error",
        description: "Please log in to save changes",
        variant: "destructive",
      });
      return;
    }

    try {
      const updateData = {
        preferred_time: editFormData.preferred_time,
        status: editFormData.status,
        user: visit.user,
        property: parseInt(editFormData.property),
      };

      const response = await fetch(
        `http://127.0.0.1:8000/api/visits/${visit.slug}/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );

      if (response.ok) {
        toast({
          title: "Visit Updated",
          description: "Visit has been successfully updated.",
        });

        setEditMode(false);

        fetchUserVisits(); // Refresh list
        setVisits(visits.map(v => v.slug === visit.slug ? {...v, ...updateData} : v));
      } else {
        const errorData = await response.json();
        console.error("Update Error:", errorData);
        toast({
          title: "Update Failed",
          description: "Failed to update visit. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Network Error:", error);
      toast({
        title: "Network Error",
        description: "Unable to connect to server. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Cancel edit mode
  const handleCancelEdit = () => {
    setEditMode(false);
    setEditFormData({
      preferred_time: "",
      status: "",
      property: "",
    });
  };

  // Delete visit function
  const handleDeleteVisit = async (visit) => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      toast({
        title: "Authentication Error",
        description: "Please log in to delete visit",
        variant: "destructive",
      });
      return;
    }

    if (!confirm("Are you sure you want to delete this visit?")) {
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/visits/${visit.slug}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        toast({
          title: "Visit Deleted",
          description: "Visit has been successfully deleted.",
        });

        // Refresh visits list
        fetchUserVisits();
        setVisits(visits.filter(v => v.slug !== visit.slug));

      } else {
        const errorData = await response.json();
        console.error("Delete Error:", errorData);
        toast({
          title: "Delete Failed",
          description: "Failed to delete visit. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Network Error:", error);
      toast({
        title: "Network Error",
        description: "Unable to connect to server. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleScheduleMeeting = () => {
    toast({
      title: "Meeting",
      description: "Opening calendar to schedule meeting...",
    });
    // Open calendar interface
  };

  const handleAddProperty = () => {
    toast({
      title: "Add Property",
      description: "Redirecting to add property page...",
    });
    window.location.href = "/add-property";
  };

  const handleManageClients = () => {
    toast({ title: "Clients", description: "Loading client management..." });
    // Navigate to clients page
  };

  const handleViewAnalytics = () => {
    toast({
      title: "Analytics",
      description: "Loading analytics dashboard...",
    });
    // Navigate to analytics page
  };

  const handleMessages = () => {
    toast({ title: "Messages", description: "Opening message center..." });
    // Navigate to messages page
  };

  const stats = [
    {
      title: "Total Properties",
      value: "1,234",
      icon: Building2,
      change: "+12%",
    },
    { title: "Active Users", value: "5,678", icon: Users, change: "+8%" },
    { title: "Revenue", value: "$123,456", icon: DollarSign, change: "+15%" },
    { title: "Views This Month", value: "45,678", icon: Eye, change: "+22%" },
  ];

  const [noticeData, setnoticeData] = useState([]);
  const [noticeDataEditMode, setnoticeEditDataMode] = useState(false);
  const [noticeOpen, setnoticeOpen] = useState(false);
  const [SelectedNotice, setSelectedNotice] = useState<any>(null);
  const fetchnoticeData = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        "http://127.0.0.1:8000/api/summons-notices/",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const notice = await response.json();
        setnoticeData(notice);
        console.log(notice);
        toast({
          title: "Success",
          description: "Legal notice data fetched successfully",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch Legal notice data",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description:
          "Failed to fetch Legal notice data  because of method is wrong",
      });
    }
  };

  useEffect(() => {
    fetchnoticeData();
  }, []);

  // Notice Edit

  const [noticeEdit, setnoticeEdit] = useState({
    notice_id: "",
    response_type: "",
    response_details: "",
    supporting_document: null,
    status: "",
  });

  const handlenotieEditchange = (field, value) => {
    setnoticeEdit((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setnoticeEdit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setnoticeEdit((prev) => ({
      ...prev,
      supporting_document: file, 
    }));
  };

  const handlenoticeEditSubmit = async (e, slug: string) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("notice_id", noticeEdit.notice_id);
      formData.append("response_type", noticeEdit.response_type);
      formData.append("response_details", noticeEdit.response_details);

      if (noticeEdit.status) {
        formData.append("status", noticeEdit.status);
      }
      if (noticeEdit.supporting_document) {
        formData.append("supporting_document", noticeEdit.supporting_document);
      }

      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `http://127.0.0.1:8000/api/summons-notices/${slug}/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend error response:", errorData);
        throw new Error("Failed to update notice");
      }

      toast({
        title: "Notice updated successfully",
        description: "The notice has been updated successfully.",
      });

      setnoticeEditDataMode(false);
      setnoticeEdit({
        notice_id: "",
        response_type: "",
        response_details: "",
        supporting_document: null,
        status: "",
      });

      fetchnoticeData();
    } catch (error) {
      console.error("Error updating notice:", error);
      toast({
        title: "Error updating notice",
        description:
          "There was an error updating the notice. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Delete notice

  const handelnoticeDelete = async (slug: string) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `http://127.0.0.1:8000/api/summons-notices/${slug}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setnoticeData((prev) => prev.filter((notice) => notice.slug !== slug));
        setnoticeOpen(false);
        toast({
          title: "Success",
          description: "notice data deleted successfully",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to delete notice data",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Failed to delete notice data because of method is wrong",
      });
    }
  };

  return (
    <>
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="sm:flex sm:justify-between justify-center items-center">
            <div>
              <h1 className="text-4xl font-bold bg-clip-text text-center text-transparent bg-gradient-to-r from-purple-600 to-purple-100">
                Dashboard Overview
              </h1>
              <p className="text-muted-foreground text-lg mt-2 text-center">
                Welcome back! Here's what's happening with your properties.
              </p>
            </div>
            <Button className="bg-purple-600 mx-10 my-5 sm:my-0 sm:mx-0 hover:bg-purple-700 text-white" onClick={handleScheduleMeeting}>
              <Calendar className="mr-2 h-4 w-4 " />
              Schedule Meeting
            </Button>
          </div>

          

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="card-hover interactive-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-success">
                    {stat.change} from last month
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activity */}
            <Card className="lg:col-span-2 card-gradient">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest updates from your properties
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {loading ? (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground">Loading visits...</p>
                  </div>
                ) : visits.length > 0 ? (
                  visits.slice(0, 4).map((visit, index) => (
                    <Dialog key={visit.id}>
                      <DialogTrigger asChild>
                        <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                          <div className="bg-purple-100 p-2 rounded-full">
                            <Calendar className="h-4 w-4 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">Visit Scheduled</p>
                            <p className="text-sm text-muted-foreground">
                              Status: {visit.status}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-muted-foreground">
                              {new Date(
                                visit.preferred_time
                              ).toLocaleDateString()}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(
                                visit.preferred_time
                              ).toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-md max-h-[90vh]  my-8">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-purple-600" />
                            Visit Details
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          {editMode ? (
                            // Edit Form
                            <>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-sm font-medium">
                                    Visit ID
                                  </Label>
                                  <p className="font-medium text-muted-foreground">
                                    {visit.id} 
                                  </p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">
                                    Status
                                  </Label>
                                  <Select
                                    value={editFormData.status}
                                    onValueChange={(value) =>
                                      setEditFormData({
                                        ...editFormData,
                                        status: value,
                                      })
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Pending">
                                        Pending
                                      </SelectItem>
                                      <SelectItem value="Confirmed">
                                        Confirmed
                                      </SelectItem>
                                      <SelectItem value="Completed">
                                        Completed
                                      </SelectItem>
                                      <SelectItem value="Cancelled">
                                        Cancelled
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              <div>
                                <Label className="text-sm font-medium">
                                  Preferred Time
                                </Label>
                                <Input
                                  type="datetime-local"
                                  value={editFormData.preferred_time}
                                  onChange={(e) =>
                                    setEditFormData({
                                      ...editFormData,
                                      preferred_time: e.target.value,
                                    })
                                  }
                                />
                              </div>

                              {/* <div>
                                <Label className="text-sm font-medium">
                                  Property ID
                                </Label>
                                <Input
                                  type="number"
                                  value={editFormData.property}
                                  onChange={(e) =>
                                    setEditFormData({
                                      ...editFormData,
                                      property: e.target.value,
                                    })
                                  }
                                />
                              </div> */}

                              {/* <Label className="text-sm font-medium">
                                Property
                              </Label>
                              <Select
                                value={editFormData.property}
                                onValueChange={(value) =>
                                  setEditFormData({
                                    ...editFormData,
                                    property: value,
                                  })
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Property" />
                                </SelectTrigger>
                                <SelectContent>
                                  {properties.map((prop) => (
                                    <SelectItem
                                      key={prop.id}
                                      value={prop.id.toString()}
                                    >
                                      {prop.title} (#{prop.id})
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>

                              <div>
                                <Label className="text-sm font-medium">
                                  User ID
                                </Label>
                                <p className="text-xs text-muted-foreground break-all">
                                  {visit.user} (Read-only)
                                </p>
                              </div> */}

                              {/* Save and Cancel Buttons */}
                              <div className="flex gap-3 pt-4 border-t">
                                <Button
                                  className="flex-1 bg-purple-600 text-white hover:bg-purple-700"
                                  onClick={() => handleSaveEdit(visit)}
                                >
                                  <Save className="h-4 w-4 mr-2" />
                                  Save Changes
                                </Button>
                                <Button
                                  variant="outline"
                                  className="flex-1"
                                  onClick={handleCancelEdit}
                                >
                                  <X className="h-4 w-4 mr-2" />
                                  Cancel
                                </Button>
                              </div>
                            </>
                          ) : (
                            // View Mode
                            <>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="p-2 border rounded-lg">
                                  <label className="text-sm font-medium text-muted-foreground">
                                    Visit ID
                                  </label>
                                  <p className="font-semibold text-lg">
                                    #{visit.id}
                                  </p>
                                </div>
                                <div className="p-2 border rounded-lg">
                                  <label className="text-sm font-medium text-muted-foreground">
                                    Status
                                  </label>
                                  <Badge
                                    variant={
                                      visit.status === "Pending"
                                        ? "secondary"
                                        : "default"
                                    }
                                    className={`mt-1 ${visit.status !== "Pending" ? "bg-purple-600 text-white" : ""}`}
                                  >
                                    {visit.status}
                                  </Badge>
                                </div>
                              </div>

                              <div className="p-2 border rounded-lg">
                                <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  Preferred Time
                                </label>
                                <p className="font-medium mt-1">
                                  {new Date(
                                    visit.preferred_time
                                  ).toLocaleDateString()}{" "}
                                  at{" "}
                                  {new Date(
                                    visit.preferred_time
                                  ).toLocaleTimeString()}
                                </p>
                              </div>

                             

                              {/* Edit and Delete Buttons */}
                              <div className="flex gap-3 pt-4 border-t">
                                <Button
                                  variant="outline"
                                  className="flex-1"
                                  onClick={() => handleEditVisit(visit)}
                                >
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit Visit
                                </Button>
                                <Button
                                  variant="destructive"
                                  className="flex-1"
                                  onClick={() => handleDeleteVisit(visit)}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete Visit
                                </Button>
                              </div>
                            </>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))
                ) : (
                  // Fallback to static data if no visits
                  [
                    {
                      action: "New inquiry",
                      property: "3BHK Apartment in Mumbai",
                      time: "2 hours ago",
                      icon: MessageCircle,
                    },
                    {
                      action: "Property viewed",
                      property: "Villa in Goa",
                      time: "4 hours ago",
                      icon: Eye,
                    },
                    {
                      action: "Added to favorites",
                      property: "2BHK Flat in Pune",
                      time: "6 hours ago",
                      icon: Heart,
                    },
                    {
                      action: "Site visit scheduled",
                      property: "Penthouse in Delhi",
                      time: "1 day ago",
                      icon: Calendar,
                    },
                  ].map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="bg-purple-100 p-2 rounded-full">
                        <activity.icon className="h-4 w-4 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">
                          {activity.property}
                        </p>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {activity.time}
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Frequently used features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  variant="default"
                  className="w-full justify-start bg-purple-600 text-white hover:bg-purple-700"
                  size="lg"
                  onClick={handleAddProperty}
                >
                  <Building2 className="  h-5 w-5" />
                  Add New Property
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  size="lg"
                  onClick={handleManageClients}
                >
                  <Users className="  h-5 w-5" />
                  Manage Clients
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  size="lg"
                  onClick={handleViewAnalytics}
                >
                  <TrendingUp className="  h-5 w-5" />
                  View Analytics
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  size="lg"
                  onClick={handleMessages}
                >
                  <MessageCircle className="  h-5 w-5" />
                  Messages
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Problem Reports Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <Card className="lg:col-span-2 card-gradient">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  Recent Problem Reports
                </CardTitle>
                <CardDescription>
                  Latest issues reported by users
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {problemReports.length > 0 ? (
                  problemReports.slice(0, 5).map((report, index) => (
                    <div
                      key={report.id || index}
                      className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div
                        className={`p-2 rounded-full ${
                          report.priority_level === "critical"
                            ? "bg-red-100 text-red-600"
                            : report.priority_level === "high"
                            ? "bg-orange-100 text-orange-600"
                            : report.priority_level === "medium"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-purple-100 text-purple-600"
                        }`}
                      >
                        {report.problem_type === "technical" ? (
                          <Bug className="h-4 w-4" />
                        ) : report.problem_type === "account" ? (
                          <FileText className="h-4 w-4" />
                        ) : report.problem_type === "payment" ? (
                          <CreditCard className="h-4 w-4" />
                        ) : report.problem_type === "mobile" ? (
                          <Smartphone className="h-4 w-4" />
                        ) : (
                          <AlertTriangle className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{report.problem_summary}</p>
                        <p className="text-sm text-muted-foreground">
                          {report.name} • {report.problem_type} •{" "}
                          {report.priority_level}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            report.priority_level === "critical"
                              ? "destructive"
                              : report.priority_level === "high"
                              ? "destructive"
                              : report.priority_level === "medium"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {report.priority_level}
                        </Badge>
                        <div className="text-xs text-muted-foreground mt-1">
                          {report.created_at
                            ? new Date(report.created_at).toLocaleDateString()
                            : "Just now"}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      No problem reports yet
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Problem Reports Stats */}
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="text-lg">Reports Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Total Reports
                    </span>
                    <span className="font-semibold">
                      {problemReports.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Critical
                    </span>
                    <span className="font-semibold text-red-600">
                      {
                        problemReports.filter(
                          (r) => r.priority_level === "critical"
                        ).length
                      }
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      High Priority
                    </span>
                    <span className="font-semibold text-orange-600">
                      {
                        problemReports.filter(
                          (r) => r.priority_level === "high"
                        ).length
                      }
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Medium Priority
                    </span>
                    <span className="font-semibold text-yellow-600">
                      {
                        problemReports.filter(
                          (r) => r.priority_level === "medium"
                        ).length
                      }
                    </span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  size="sm"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  View All Reports
                </Button>
              </CardContent>
            </Card>

            {/* Legal Notice */}

            <Card className="card-gradient shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="">
                <div className="flex items-center gap-2">
                  <Info className="h-6 w-6 text-purple-600" />
                  <CardTitle>Notice Response</CardTitle>
                </div>
              </CardHeader>

              <CardContent className="grid lg:grid-cols-1 md:grid-cols-2 gap-4">
                {noticeData &&
                  noticeData.map((notice, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => {
                          setSelectedNotice(notice);
                          setnoticeEdit(notice);
                          setnoticeOpen(true);
                        }}
                        className=" border rounded-lg   flex justify-between p-4   bg-card/50 hover:bg-muted/50 transition-all duration-300 cursor-pointer shadow-sm hover:scale-[1.02]"
                      >
                        <div>
                          <p className=" font-semibold">
                            {notice.response_details}
                          </p>
                          <p className="text-gray-500">{notice.status}</p>
                        </div>
                        <div className="text-end">
                          <p className="border rounded-full bg-red-300 text-center  px-1">
                            {notice.response_type}
                          </p>
                          <p>
                            {new Date(notice.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </CardContent>
            </Card>

            {/* notice edit and delete */}

            <Dialog open={noticeOpen} onOpenChange={setnoticeOpen}>
              <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0">
                <div className="px-4 py-4 border-b bg-muted/20 flex-shrink-0">
                  <div className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-purple-600" />
                    <h2 className="text-base md:text-lg font-semibold">
                      Notice Details
                    </h2>
                  </div>
                </div>
                {/* customer scrollbar content */}
                <div className="flex-1 overflow-y-auto px-4 py-4">
                  {SelectedNotice && (
                    <div className="space-y-4">
                      {noticeDataEditMode ? (
                        // Edit Mode
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
                          <div className="space-y-2">
                            <Label
                              htmlFor="notice-id"
                              className="text-sm font-medium"
                            >
                              Notice ID
                            </Label>
                            <Input
                              id="notice_id"
                              name="notice_id"
                              value={noticeEdit.notice_id}
                              onChange={handleInputChange}
                              className="w-full"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label
                              htmlFor="response_type"
                              className="text-sm font-medium"
                            >
                              Response Type
                            </Label>
                            <Select
                              value={noticeEdit.response_type}
                              onValueChange={(value) =>
                                handlenotieEditchange("response_type", value)
                              }
                              required
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="compliance">
                                  Compliance Confirmation
                                </SelectItem>
                                <SelectItem value="objection">
                                  Objection
                                </SelectItem>
                                <SelectItem value="clarification">
                                  Request for Clarification
                                </SelectItem>
                                <SelectItem value="document">
                                  Document Submission
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className=" space-y-2">
                            <Label
                              htmlFor="response-details"
                              className="text-sm font-medium"
                            >
                              Response Details
                            </Label>
                            <Textarea
                              id="response_details"
                              name="response_details" // ✅ underscore use karo
                              value={noticeEdit.response_details}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label
                              htmlFor="supporting_document"
                              className="text-sm font-medium"
                            >
                              <p>
                                Upload supporting documents (PDF, DOC, Images -
                                Max 10MB)
                              </p>
                            </Label>
                            <Input
                              id="supporting_document"
                              name="supporting_document"
                              type="file"
                              onChange={handleFileChange}
                              className="w-full"
                            />
                          </div>
                          <DialogFooter>
                            <div className="flex flex-col sm:flex-row gap-2 sm:justify-end pt-4 border-t">
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => setnoticeEditDataMode(false)}
                                className="w-full sm:w-auto"
                              >
                                Cancel
                              </Button>
                              <Button className="bg-purple-600 hover:bg-purple-600"
                                onClick={(e) =>
                                  handlenoticeEditSubmit(e, SelectedNotice.slug)
                                }
                              >
                                Save Changes
                              </Button>
                            </div>
                          </DialogFooter>
                        </div>
                      ) : (
                        // View Mode - AdminDashboard style
                        <div className="space-y-6 group ">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
                            {/* Using the same renderDetailRow function style from AdminDashboard */}
                            <div className="space-y-2  p-2 rounded-sm  border">
                              <div className="flex items-start gap-2">
                                <div className="flex flex-col w-full">
                                  <span className="text-sm font-medium text-muted-foreground">
                                    Notice ID
                                  </span>
                                  <p className="text-base font-medium break-words pl-6">
                                    {SelectedNotice.notice_id || "N/A"}
                                  </p>
                                </div>
                              </div>
                            </div>
                            {/* email */}
                            <div className="space-y-2 p-2 rounded-sm  border">
                              <div className="flex items-start gap-2">
                                <div className="flex flex-col ">
                                  <span className=" font-medium text-sm text-muted-foreground">
                                    Response type
                                  </span>
                                  <p className="text-base break-words">
                                    {SelectedNotice.response_type || "N/A"}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-2 p-2 rounded-sm  border">
                              <div className="flex items-start gap-2">
                                <div className="flex flex-col w-full">
                                  <span className="font-medium text-sm text-muted-foreground">
                                    Response Details
                                  </span>
                                  <p className="text-base break-words pl-6">
                                    {SelectedNotice.response_details || "N/A"}
                                  </p>
                                </div>
                              </div>
                            </div>
                            {/* category */}
                            <div className="py-2 p-2 rounded-sm  border">
                              <div className="flex items-start gap-3">
                                <div className="flex flex-col w-full">
                                  <span className="font-semibold text-sm text-muted-foreground">
                                    Category
                                  </span>
                                  <span className="text-base break-words">
                                    {SelectedNotice.supporting_document ||
                                      "N/A"}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <DialogFooter className="md:col-span-2 pt-8 gap-2">
                              <div className="flex flex-col sm:flex-row gap-2 sm:justify-end pt-4 border-t">
                                <Button
                                  variant="destructive"
                                  onClick={() =>
                                    handelnoticeDelete(SelectedNotice.slug)
                                  }
                                  className="w-full sm:w-auto"
                                >
                                  Delete notice
                                </Button>
                                <Button
                                  variant="default"
                                  onClick={() => {
                                    setnoticeEdit(SelectedNotice);
                                    setnoticeEditDataMode(true);
                                  }}
                                  className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white"
                                >
                                  Edit Details
                                </Button>
                              </div>
                            </DialogFooter>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Quick Filters for PropertySearch */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-wrap gap-3 items-center">
          <span className="text-sm font-medium text-muted-foreground">
            Quick Filters:
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setFilterState({ ...filterState, sortBy: "price-low" })
            }
          >
            Price: Low to High
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setFilterState({ ...filterState, sortBy: "price-high" })
            }
          >
            Price: High to Low
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFilterState({ ...filterState, sortBy: "newest" })}
          >
            Newest First
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setFilterState({ ...filterState, sortBy: "relevance" })
            }
          >
            Relevance
          </Button>
        </div>
      </div>

      <PropertySearch
        onFilterChange={setFilterState}
      />
    </>
  );
};
 export default Dashboard;
// function fetchSummonsNotice() {
//   throw new Error("Function not implemented.");
// }