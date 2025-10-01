import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building,
  Users,
  Calendar,
  MessageCircle,
  TrendingUp,
  Phone,
  Info,
  User,
  Mail,
  AlertCircle,
  MessageSquare,
  Star,
} from "lucide-react";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PropertiesList from "@/components/ui/PropertiesList";
import EnhancedFeedbackPopup from "@/components/EnhancedFeedbackPopup";
import DataPopup from "@/components/DataPopup";
import UnifiedPopup from "@/components/UnifiedPopup";

const AgentDashboard = () => {
  const [leads, setLeads] = useState([]);

  // Fetch leads on component mount and set interval for auto-refresh
  useEffect(() => {
    fetchLeads();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchLeads, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchLeads = async () => {
    try {
      const token = localStorage.getItem("access_token");
      // console.log("Fetching leads with token:", token ? "Token exists" : "No token");

      const response = await fetch("http://127.0.0.1:8000/api/leads/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log("Leads API response status:", response.status);

      if (response.ok) {
        const result = await response.json();
        console.log("Raw API response:", result);
        console.log("Response type:", typeof result);
        // console.log("Is array:", Array.isArray(result));

        // Handle different response structures
        let leadsData = result;
        if (result.results) {
          leadsData = result.results; // Paginated response
          console.log("Using paginated results:", leadsData);
        }

        console.log("Leads data to process:", leadsData);
        console.log("Total leads count:", leadsData.length);

        if (leadsData.length > 0) {
          console.log("First lead structure:", leadsData[0]);
          console.log("First lead created_at:", leadsData[0].created_at);
        }

        // Show all leads first (remove date filter for testing)
        console.log("Setting all leads in state for testing");
        setLeads(leadsData);
      } else {
        const errorText = await response.text();
        console.log(
          "Failed to fetch leads:",
          response.status,
          response.statusText,
          errorText
        );
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  const handleCall = (number: string) => {
    toast.success(`Initiating call to ${number}...`);
    window.open(`tel:${number}`, "_self");
  };

  const handleMessage = (contact: string) => {
    toast.success(`Opening chat with ${contact}...`);
    // Open messaging interface
  };

  const handleViewListings = () => {
    toast.success("Loading your property listings...");
    // Navigate to listings page
  };

  const handleViewLeads = () => {
    toast.success("Loading active leads...");
    // Navigate to leads page
  };

  const handleViewSchedule = () => {
    toast.success("Loading your schedule...");
    // Navigate to schedule page
  };

  useEffect(() => {
    fetchCustomerData();
  }, []);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [open, setOpen] = useState(false);
  const [customerEditMode, setCustomerEditMode] = useState(false);
  const [customerdata, setCustomerData] = useState([]);
  const fetchCustomerData = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        "http://127.0.0.1:8000/api/support-tickets/",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setCustomerData(data);
      } else {
        console.log("Failed to fetch customer data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // customer service edit
  const [customerEdit, setCustomerEdit] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    category: "",
    subject: "",
    message: "",
    priority: "",
  });

  const handleCustomerEditChange = (e: any) => {
    const { name, value } = e.target;
    setCustomerEdit({ ...customerEdit, [name]: value });
  };

  // Edit
  const handleCustomerEditSubmit = async (e: any) => {
    e.preventDefault();

    if (!selectedCustomer?.id) {
      console.error("No customer selected for edit!");
      return;
    }

    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `http://127.0.0.1:8000/api/support-tickets/${selectedCustomer.id}/`, // 👈 numeric id use kar
        {
          method: "PATCH", // PATCH better than PUT
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(customerEdit),
        }
      );

      if (response.ok) {
        const update = await response.json();
        setCustomerData((prev) =>
          prev.map((c) => (c.id === update.id ? update : c))
        );
        setSelectedCustomer(update);
        setCustomerEditMode(false);
        toast.success("Customer updated!");
      } else {
        const err = await response.json();
        console.log("Update error:", err);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Delete
  const handleCustomerDelete = async (id: number) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `http://127.0.0.1:8000/api/support-tickets/${id}/`, // 👈 numeric id
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setCustomerData((prev) => prev.filter((c) => c.id !== id));
        setOpen(false);
        toast.success("Customer deleted!");
      } else {
        const err = await response.json();
        console.log("Delete error:", err);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Feedback Fetching data
  const [SelectedFeedback, setSelectedFeedback] = useState(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackData, setFeedbackData] = useState([]);
  const [feedbackDataEditMode, setFeedbackDataEditMode] = useState(false);

  const fetchFeedbackData = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch("http://127.0.0.1:8000/api/feedback/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const feeddata = await response.json();
        setFeedbackData(feeddata);
        console.log(feeddata);
        toast.success("Feedback data fetched successfully");
      } else {
        toast.error("Failed to fetch Feedback data");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch Feedback data because of method is wrong");
    }
  };

  // Feedback useEffect
  useEffect(() => {
    fetchFeedbackData();
  }, []);

  // Feedback Edit
  const [rating, setRating] = useState(0);
  const [feedbackEdit, setFeedbackEdit] = useState({
    name: "",
    email: "",
    category: "",
    feedback_type: "",
    rating: 0,
    subject: "",
    detailed_feedback: "",
    what_went_well: "",
    how_to_improve: "",
    recommend_us: "",
  });

  const handleFeedbackEditChange = (e: any) => {
    const { name, value } = e.target;
    setFeedbackEdit({ ...feedbackEdit, [name]: value });
  };

  const handleFeedbackEditSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `http://127.0.0.1:8000/api/feedback/${SelectedFeedback.slug}/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(feedbackEdit),
        }
      );
      if (response.ok) {
        const feedupdate = await response.json();
        console.log(feedupdate);
        setSelectedFeedback(feedupdate);
        setFeedbackDataEditMode(false);
        // optionally refresh the customer data list
        setFeedbackData((prev) =>
          prev.map((feedback) =>
            feedback.slug === feedupdate.slug ? feedupdate : feedback
          )
        );
        toast.success("Feedback data updated successfully");
      } else {
        console.log("Failed to update Feedback data");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update Feedback data because of method is wrong");
    }
  };

  // Feedback Delete
  const handleFeedbackDelete = async (slug: string) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `http://127.0.0.1:8000/api/feedback/${slug}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setFeedbackData((prev) =>
          prev.filter((feedback) => feedback.slug !== slug)
        );
        setFeedbackOpen(false);
        toast.success("Feedback data deleted successfully");
      } else {
        toast.error("Failed to delete feedback data");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete feedback data because of method is wrong");
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-400">
          Agent Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card
            className="card-hover cursor-pointer"
            onClick={handleViewListings}
          >
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="mr-2 h-5 w-5" />
                My Listings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">47</div>
              <Badge className="bg-success text-success-foreground">
                3 new
              </Badge>
            </CardContent>
          </Card>

          <Card className="card-hover cursor-pointer" onClick={handleViewLeads}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Active Leads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">23</div>
              <Badge className="bg-warning text-warning-foreground">
                5 urgent
              </Badge>
            </CardContent>
          </Card>

          <Card
            className="card-hover cursor-pointer"
            onClick={handleViewSchedule}
          >
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Site Visits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12</div>
              <Badge variant="secondary">This week</Badge>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                Commission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">₹1.2L</div>
              <Badge className="bg-success text-success-foreground">
                This month
              </Badge>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="card-gradient">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Today's Schedule</CardTitle>
              <Button size="sm" variant="outline" onClick={fetchLeads}>
                Refresh
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leads.length > 0 ? (
                  leads.map((lead, index) => (
                    <div
                      key={lead.id || index}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">
                          {lead.name || "No Name"} -{" "}
                          {lead.source || "Unknown Source"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {lead.phone || "No Phone"} |{" "}
                          {lead.email || "No Email"}
                        </p>
                        <Badge variant="secondary" className="mt-1">
                          {lead.status || "New"}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          Property: {lead.property || "N/A"} | Created:{" "}
                          {lead.created_at
                            ? new Date(lead.created_at).toLocaleString()
                            : "Unknown"}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCall(lead.phone || "")}
                        >
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleMessage(lead.name || "Lead")}
                        >
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">No leads found</p>
                      <p className="text-sm text-muted-foreground">
                        Check console for API response
                      </p>
                    </div>
                  </div>
                )}
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
                    <p className="font-medium">3BHK Apartment Interest</p>
                    <p className="text-sm text-muted-foreground">John Doe</p>
                  </div>
                  <Badge variant="secondary">2 min ago</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Villa Viewing Request</p>
                    <p className="text-sm text-muted-foreground">
                      Sarah Wilson
                    </p>
                  </div>
                  <Badge variant="secondary">5 min ago</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Customer Service */}
        <Card className="card-gradient shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="">
            <div className="flex items-center gap-2">
              <Info className="h-6 w-6 text-purple-600" />
              <CardTitle>Customer Service Data</CardTitle>
            </div>
          </CardHeader>

          <CardContent className="grid lg:grid-cols-1 md:grid-cols-2 gap-4">
            {customerdata &&
              customerdata.map((customer, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      setSelectedCustomer(customer);
                      setCustomerEdit(customer);
                      setOpen(true);
                    }}
                    className=" border rounded-lg   flex justify-between p-4   bg-card/50 hover:bg-muted/50 transition-all duration-300 cursor-pointer shadow-sm hover:scale-[1.02]"
                  >
                    <div>
                      <p className=" font-semibold">{customer.full_name}</p>
                      <p className="text-gray-500">{customer.subject}</p>
                    </div>
                    <div className="text-end">
                      <p className="border rounded-full bg-purple-400 text-center">
                        {customer.priority}
                      </p>
                      <p>
                        {new Date(customer.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                );
              })}
          </CardContent>
        </Card>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-md max-h-[90vh] my-8 overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-purple-600" />
                Customer Service Details
              </DialogTitle>
            </DialogHeader>
            {selectedCustomer && (
              <div className="space-y-4">
                {customerEditMode ? (
                  <form onSubmit={handleCustomerEditSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="full_name"
                          className="text-sm font-medium"
                        >
                          Full Name
                        </Label>
                        <Input
                          id="full_name"
                          name="full_name"
                          value={customerEdit.full_name}
                          onChange={handleCustomerEditChange}
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">
                          Email
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={customerEdit.email}
                          onChange={handleCustomerEditChange}
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="phone_number"
                          className="text-sm font-medium"
                        >
                          Phone
                        </Label>
                        <Input
                          id="phone_number"
                          name="phone_number"
                          value={customerEdit.phone_number}
                          onChange={handleCustomerEditChange}
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="category"
                          className="text-sm font-medium"
                        >
                          Category
                        </Label>
                        <Input
                          id="category"
                          name="category"
                          value={customerEdit.category}
                          onChange={handleCustomerEditChange}
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="priority"
                          className="text-sm font-medium"
                        >
                          Priority
                        </Label>
                        <Select
                          value={customerEdit.priority}
                          onValueChange={(value) =>
                            setCustomerEdit({
                              ...customerEdit,
                              priority: value,
                            })
                          }
                        >
                          <SelectTrigger className="w-full">
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
                      <div className=" space-y-2 sm:col-span-2">
                        <Label
                          htmlFor="subject"
                          className="text-sm font-medium"
                        >
                          Subject
                        </Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={customerEdit.subject}
                          onChange={handleCustomerEditChange}
                          className="w-full"
                        />
                      </div>
                      <div className=" space-y-2 sm:col-span-2">
                        <Label
                          htmlFor="message"
                          className="text-sm font-medium"
                        >
                          Message
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={customerEdit.message}
                          onChange={handleCustomerEditChange}
                          rows={4}
                          className="w-full resize-none"
                        />
                      </div>
                    </div>
                    <DialogFooter className="pt-4 border-t mt-4 flex justify-end gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setCustomerEditMode(false)}
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
                    <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
                      <div className="p-2 border rounded-lg">
                        <label className="text-sm font-medium text-muted-foreground">
                          Full Name
                        </label>
                        <p className="font-semibold text-sm">
                          {selectedCustomer.full_name || "N/A"}
                        </p>
                      </div>
                      <div className="p-2 border rounded-lg">
                        <label className="text-sm font-medium text-muted-foreground">
                          Email
                        </label>
                        <p className="font-semibold text-sm">
                          {selectedCustomer.email || "N/A"}
                        </p>
                      </div>
                      <div className="p-2 border rounded-lg">
                        <label className="text-sm font-medium text-muted-foreground">
                          Phone
                        </label>
                        <p className="font-semibold text-sm">
                          {selectedCustomer.phone_number || "N/A"}
                        </p>
                      </div>
                      <div className="p-2 border rounded-lg">
                        <label className="text-sm font-medium text-muted-foreground">
                          Category
                        </label>
                        <p className="font-semibold text-sm">
                          {selectedCustomer.category || "N/A"}
                        </p>
                      </div>
                      <div className="p-2 border rounded-lg">
                        <label className="text-sm font-medium text-muted-foreground">
                          Priority
                        </label>
                        <p className="font-semibold text-sm">
                          {selectedCustomer.priority || "N/A"}
                        </p>
                      </div>
                      <div className="p-2 border rounded-lg">
                        <label className="text-sm font-medium text-muted-foreground">
                          Created
                        </label>
                        <p className="font-semibold text-sm">
                          {new Date(
                            selectedCustomer.created_at
                          ).toLocaleString()}
                        </p>
                      </div>
                      <div className="p-2 border rounded-lg sm:col-span-2">
                        <label className="text-sm font-medium text-muted-foreground">
                          Subject
                        </label>
                        <p className="font-semibold text-sm">
                          {selectedCustomer.subject || "N/A"}
                        </p>
                      </div>
                      <div className="p-2 border rounded-lg sm:col-span-2">
                        <label className="text-sm font-medium text-muted-foreground">
                          Message
                        </label>
                        <p className="font-semibold text-sm whitespace-pre-wrap">
                          {selectedCustomer.message || "N/A"}
                        </p>
                      </div>
                    </div>
                    <DialogFooter className="pt-4 border-t mt-4 flex justify-end gap-2">
                      <Button
                        variant="destructive"
                        onClick={() =>
                          handleCustomerDelete(selectedCustomer.id)
                        }
                      >
                        Delete Customer
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setCustomerEdit(selectedCustomer);
                          setCustomerEditMode(true);
                        }}
                      >
                        Edit Details
                      </Button>
                    </DialogFooter>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* FeedBack Fetched data card */}
        <Card className="card-gradient shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="">
            <div className="flex items-center gap-2">
              <Info className="h-6 w-6 text-purple-600" />
              <CardTitle>Feedback</CardTitle>
            </div>
          </CardHeader>

          <CardContent className="grid lg:grid-cols-1 md:grid-cols-2 gap-4">
            {feedbackData &&
              feedbackData.map((feedback, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      setSelectedFeedback(feedback);
                      setFeedbackEdit(feedback);
                      setFeedbackOpen(true);
                    }}
                    className=" border rounded-lg   flex justify-between p-4   bg-card/50 hover:bg-muted/50 transition-all duration-300 cursor-pointer shadow-sm hover:scale-[1.02]"
                  >
                    <div>
                      <p className=" font-semibold">{feedback.name}</p>
                      <p className="text-gray-500">{feedback.category}</p>
                    </div>
                    <div className="text-end">
                      <p className="border rounded-full bg-red-300 text-center">
                        {feedback.feedback_type}
                      </p>
                      <p>
                        {new Date(feedback.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                );
              })}
          </CardContent>
        </Card>

        {/* Feedback edit and delete content */}
        {/* Feedback edit and delete content */}
        <Dialog open={feedbackOpen} onOpenChange={setFeedbackOpen}>
          <DialogContent className="max-w-[95vw] sm:max-w-md max-h-[90vh] my-4 sm:my-8 overflow-y-auto p-4 sm:p-6">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Info className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                Feedback Details
              </DialogTitle>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto px-1 sm:px-4 py-2 sm:py-4">
              {SelectedFeedback && (
                <div className="space-y-4">
                  {feedbackDataEditMode ? (
                    <form onSubmit={handleFeedbackEditSubmit}>
                      <div className="grid grid-cols-1 gap-3 sm:gap-4">
                        {/* Rating */}
                        <div className="space-y-2">
                          <Label className="text-xs sm:text-sm font-medium">
                            Overall Rating
                          </Label>
                          <div className="flex gap-1 sm:gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-6 w-6 sm:h-8 sm:w-8 cursor-pointer transition-colors ${
                                  star <= feedbackEdit.rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-muted-foreground"
                                }`}
                                onClick={() =>
                                  setFeedbackEdit({
                                    ...feedbackEdit,
                                    rating: star,
                                  })
                                }
                              />
                            ))}
                          </div>
                          <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                            {feedbackEdit.rating === 0 &&
                              "Click to rate your experience"}
                            {feedbackEdit.rating === 1 &&
                              "Poor - Needs significant improvement"}
                            {feedbackEdit.rating === 2 &&
                              "Fair - Some issues to address"}
                            {feedbackEdit.rating === 3 &&
                              "Good - Generally satisfied"}
                            {feedbackEdit.rating === 4 &&
                              "Very Good - Mostly positive experience"}
                            {feedbackEdit.rating === 5 &&
                              "Excellent - Exceeded expectations"}
                          </p>
                        </div>

                        {/* Name */}
                        <div className="space-y-2">
                          <Label
                            htmlFor="name"
                            className="text-xs sm:text-sm font-medium"
                          >
                            Full Name
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            value={feedbackEdit.name}
                            onChange={handleFeedbackEditChange}
                            className="w-full text-sm"
                          />
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                          <Label
                            htmlFor="email"
                            className="text-xs sm:text-sm font-medium"
                          >
                            Email
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={feedbackEdit.email}
                            onChange={handleFeedbackEditChange}
                            className="w-full text-sm"
                          />
                        </div>

                        {/* Subject */}
                        <div className="space-y-2">
                          <Label
                            htmlFor="subject"
                            className="text-xs sm:text-sm font-medium"
                          >
                            Subject
                          </Label>
                          <Input
                            id="subject"
                            name="subject"
                            value={feedbackEdit.subject}
                            onChange={handleFeedbackEditChange}
                            className="w-full text-sm"
                          />
                        </div>

                        {/* Category */}
                        <div className="space-y-2">
                          <Label
                            htmlFor="category"
                            className="text-xs sm:text-sm font-medium"
                          >
                            Category
                          </Label>
                          <Select
                            value={feedbackEdit.category}
                            onValueChange={(value) =>
                              setFeedbackEdit({
                                ...feedbackEdit,
                                category: value,
                              })
                            }
                          >
                            <SelectTrigger className="w-full text-sm">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="website">
                                Website Experience
                              </SelectItem>
                              <SelectItem value="mobile">Mobile App</SelectItem>
                              <SelectItem value="search">
                                Property Search
                              </SelectItem>
                              <SelectItem value="listing">
                                Property Listing
                              </SelectItem>
                              <SelectItem value="customer-service">
                                Customer Service
                              </SelectItem>
                              <SelectItem value="payment">
                                Payment Process
                              </SelectItem>
                              <SelectItem value="agent">
                                Agent Service
                              </SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Detailed Feedback */}
                        <div className="space-y-2">
                          <Label
                            htmlFor="detailed_feedback"
                            className="text-xs sm:text-sm font-medium"
                          >
                            Detailed Feedback
                          </Label>
                          <Textarea
                            id="detailed_feedback"
                            name="detailed_feedback"
                            value={feedbackEdit.detailed_feedback}
                            onChange={handleFeedbackEditChange}
                            rows={3}
                            className="w-full resize-none text-sm"
                          />
                        </div>

                        {/* What Went Well */}
                        <div className="space-y-2">
                          <Label
                            htmlFor="what_went_well"
                            className="text-xs sm:text-sm font-medium"
                          >
                            What Went Well
                          </Label>
                          <Textarea
                            id="what_went_well"
                            name="what_went_well"
                            value={feedbackEdit.what_went_well}
                            onChange={handleFeedbackEditChange}
                            rows={3}
                            className="w-full resize-none text-sm"
                          />
                        </div>

                        {/* Recommend Us */}
                        <div className="space-y-2">
                          <Label
                            htmlFor="recommend_us"
                            className="text-xs sm:text-sm font-medium"
                          >
                            Would you recommend us to others?
                          </Label>
                          <Select
                            value={feedbackEdit.recommend_us}
                            onValueChange={(value) =>
                              setFeedbackEdit({
                                ...feedbackEdit,
                                recommend_us: value,
                              })
                            }
                          >
                            <SelectTrigger className="w-full text-sm">
                              <SelectValue placeholder="Select your answer" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="definitely">
                                Definitely
                              </SelectItem>
                              <SelectItem value="probably">Probably</SelectItem>
                              <SelectItem value="not-sure">Not Sure</SelectItem>
                              <SelectItem value="probably-not">
                                Probably Not
                              </SelectItem>
                              <SelectItem value="definitely-not">
                                Definitely Not
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Buttons */}
                        <div className="pt-3 border-t mt-4 flex flex-col sm:flex-row justify-end gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setFeedbackDataEditMode(false)}
                            className="w-full sm:w-auto text-sm"
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            className="w-full sm:w-auto bg-purple-600 text-white hover:bg-purple-700 text-sm"
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
                        {/* Name */}
                        <div className="p-2 sm:p-3 border rounded-lg">
                          <label className="text-xs sm:text-sm font-medium text-muted-foreground">
                            Full Name
                          </label>
                          <p className="font-semibold text-sm mt-1">
                            {SelectedFeedback.name || "N/A"}
                          </p>
                        </div>

                        {/* Email */}
                        <div className="p-2 sm:p-3 border rounded-lg">
                          <label className="text-xs sm:text-sm font-medium text-muted-foreground">
                            Email
                          </label>
                          <p className="font-semibold text-sm mt-1 break-all">
                            {SelectedFeedback.email || "N/A"}
                          </p>
                        </div>

                        {/* Feedback Type */}
                        <div className="p-2 sm:p-3 border rounded-lg">
                          <label className="text-xs sm:text-sm font-medium text-muted-foreground">
                            Feedback Type
                          </label>
                          <p className="font-semibold text-sm mt-1">
                            {SelectedFeedback.feedback_type || "N/A"}
                          </p>
                        </div>

                        {/* Category */}
                        <div className="p-2 sm:p-3 border rounded-lg">
                          <label className="text-xs sm:text-sm font-medium text-muted-foreground">
                            Category
                          </label>
                          <p className="font-semibold text-sm mt-1">
                            {SelectedFeedback.category || "N/A"}
                          </p>
                        </div>

                        {/* Subject */}
                        <div className="p-2 sm:p-3 border rounded-lg">
                          <label className="text-xs sm:text-sm font-medium text-muted-foreground">
                            Subject
                          </label>
                          <p className="font-semibold text-sm mt-1">
                            {SelectedFeedback.subject || "N/A"}
                          </p>
                        </div>

                        {/* Detailed Feedback */}
                        <div className="p-2 sm:p-3 border rounded-lg">
                          <label className="text-xs sm:text-sm font-medium text-muted-foreground">
                            Detailed Feedback
                          </label>
                          <p className="font-semibold text-sm mt-1 whitespace-pre-wrap">
                            {SelectedFeedback.detailed_feedback || "N/A"}
                          </p>
                        </div>

                        {/* Created */}
                        <div className="p-2 sm:p-3 border rounded-lg">
                          <label className="text-xs sm:text-sm font-medium text-muted-foreground">
                            Created
                          </label>
                          <p className="font-semibold text-sm mt-1">
                            {new Date(
                              SelectedFeedback.created_at
                            ).toLocaleString()}
                          </p>
                        </div>

                        {/* What Went Well */}
                        <div className="p-2 sm:p-3 border rounded-lg">
                          <label className="text-xs sm:text-sm font-medium text-muted-foreground">
                            What did we do well?
                          </label>
                          <p className="font-semibold text-sm mt-1 whitespace-pre-wrap">
                            {SelectedFeedback.what_went_well || "N/A"}
                          </p>
                        </div>

                        {/* How to Improve */}
                        <div className="p-2 sm:p-3 border rounded-lg">
                          <label className="text-xs sm:text-sm font-medium text-muted-foreground">
                            How can we improve?
                          </label>
                          <p className="font-semibold text-sm mt-1 whitespace-pre-wrap">
                            {SelectedFeedback.how_to_improve || "N/A"}
                          </p>
                        </div>

                        {/* Recommend Us */}
                        <div className="p-2 sm:p-3 border rounded-lg">
                          <label className="text-xs sm:text-sm font-medium text-muted-foreground">
                            Would you recommend us to others?
                          </label>
                          <p className="font-semibold text-sm mt-1">
                            {SelectedFeedback.recommend_us || "N/A"}
                          </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-3 border-t mt-4 flex flex-col sm:flex-row justify-end gap-2">
                          <Button
                            variant="destructive"
                            onClick={() =>
                              handleFeedbackDelete(SelectedFeedback.slug)
                            }
                            className="w-full sm:w-auto text-sm"
                          >
                            Delete Feedback
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setFeedbackEdit(SelectedFeedback);
                              setFeedbackDataEditMode(true);
                            }}
                            className="w-full sm:w-auto text-sm"
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

export default AgentDashboard;
