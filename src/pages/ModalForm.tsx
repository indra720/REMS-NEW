// Required Imports
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
  Info,
  User,
  Mail,
  Phone,
  Building,
  AlertCircle,
  Calendar,
  MessageSquare,
  MessageCircle,
} from "lucide-react";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

// Customer Service State Management
const [selectedCustomer, setSelectedCustomer] = useState(null);
const [open, setOpen] = useState(false);
const [customerEditMode, setCustomerEditMode] = useState(false);
const [customerdata, setCustomerData] = useState([]);

// Customer Edit Form State
const [customerEdit, setCustomerEdit] = useState({
  full_name: "",
  email: "",
  phone_number: "",
  category: "",
  subject: "",
  message: "",
  priority: "",
});

// Fetch Customer Data
const fetchCustomerData = async () => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await fetch("http://127.0.0.1:8000/api/support-tickets/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
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

// Customer Edit Form Handler
const handleCustomerEditChange = (e) => {
  const { name, value } = e.target;
  setCustomerEdit({ ...customerEdit, [name]: value });
};

// Customer Edit Submit
const handleCustomerEditSubmit = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem("access_token");
    const response = await fetch(
      `http://127.0.0.1:8000/api/support-tickets/${selectedCustomer.id}/`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customerEdit),
      }
    );
    if (response.ok) {
      const update = await response.json();
      console.log(update);
      setSelectedCustomer(update);
      setCustomerEditMode(false);
      // Optionally refresh the customer data list
      setCustomerData((prev) =>
        prev.map((customer) => (customer.id === update.id ? update : customer))
      );
      toast({
        title: "Success",
        description: "Customer data updated successfully",
      });
    } else {
      console.log("Failed to update customer data");
    }
  } catch (error) {
    console.log(error);
    toast({ title: "Error", description: "Failed to update customer data" });
  }
};

// Customer Delete Function
const handleCustomerDelete = async (id) => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await fetch(
      `http://127.0.0.1:8000/api/support-tickets/${id}/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      setCustomerData((prev) => prev.filter((customer) => customer.id !== id));
      setOpen(false);
      toast({
        title: "Success",
        description: "Customer data deleted successfully",
      });
    }
  } catch (error) {
    console.log(error);
    toast({ title: "Error", description: "Failed to delete customer data" });
  }
};

// useEffect to fetch data on component mount
useEffect(() => {
  fetchCustomerData();
}, []);

// JSX - Customer Service Card Section
<>
  // JSX - Customer Service Card Section
  <Card className="card-gradient shadow-lg hover:shadow-xl transition-shadow duration-300">
    <CardHeader>
      <div className="flex items-center gap-3">
        <Info className="h-6 w-6 text-blue-500" />
        <CardTitle className="text-xl font-bold">
          Customer Service Data
        </CardTitle>
      </div>
    </CardHeader>

    <CardContent className="space-y-4">
      {customerdata && customerdata.length > 0 ? (
        customerdata.map((customer, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedCustomer(customer);
              setCustomerEdit(customer);
              setOpen(true);
            }}
            className="p-4 rounded-lg border bg-card/50 hover:bg-muted/50 transition-all duration-300 cursor-pointer shadow-sm hover:scale-[1.02]"
          >
            <div className="flex justify-between items-start">
              <p className="font-bold text-base mb-1 pr-2">
                {customer.full_name}
              </p>
              <Badge
                variant={
                  customer.priority === "high" || customer.priority === "urgent"
                    ? "destructive"
                    : "outline"
                }
                className="capitalize flex-shrink-0"
              >
                {customer.priority}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground truncate mb-3">
              {customer.subject}
            </p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="font-medium">{customer.category}</span>
              <span>{new Date(customer.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-muted-foreground py-4">
          No customer service requests yet.
        </p>
      )}
    </CardContent>
  </Card>
  // JSX - Customer Service Dialog
  <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent
      className="sm:max-w-3xl p-6"
      aria-describedby="customer-dialog-description"
    >
      <DialogHeader className="sr-only">
        <DialogTitle>Customer Service Details</DialogTitle>
        <DialogDescription id="customer-dialog-description">
          View, edit, or delete the customer service request.
        </DialogDescription>
      </DialogHeader>
      {selectedCustomer && (
        <div className="space-y-4">
          {customerEditMode ? (
            // Edit Mode - with controlled spacing
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div className="space-y-2">
                  <Label htmlFor="full_name" className="text-sm font-medium">
                    Full Name
                  </Label>
                  <Input
                    id="full_name"
                    name="full_name"
                    value={customerEdit.full_name}
                    onChange={handleCustomerEditChange}
                    className="h-10"
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
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone_number" className="text-sm font-medium">
                    Phone
                  </Label>
                  <Input
                    id="phone_number"
                    name="phone_number"
                    value={customerEdit.phone_number}
                    onChange={handleCustomerEditChange}
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-sm font-medium">
                    Category
                  </Label>
                  <Input
                    id="category"
                    name="category"
                    value={customerEdit.category}
                    onChange={handleCustomerEditChange}
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority" className="text-sm font-medium">
                    Priority
                  </Label>
                  <Select
                    value={customerEdit.priority}
                    onValueChange={(value) =>
                      setCustomerEdit({ ...customerEdit, priority: value })
                    }
                  >
                    <SelectTrigger className="h-10">
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
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={customerEdit.subject}
                    onChange={handleCustomerEditChange}
                    className="h-10"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="message" className="text-sm font-medium">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={customerEdit.message}
                    onChange={handleCustomerEditChange}
                    rows={3}
                    className="resize-none"
                  />
                </div>
              </div>

              {/* Edit Mode Footer */}
              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => setCustomerEditMode(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleCustomerEditSubmit}>Save Changes</Button>
              </div>
            </div>
          ) : (
            // View Mode - with controlled spacing
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                {/* Detail rows with compact spacing */}
                <div className="flex items-start gap-3">
                  <User className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
                  <div className="flex flex-col">
                    <span className="font-medium text-xs text-muted-foreground uppercase tracking-wide">
                      Full Name
                    </span>
                    <span className="text-sm mt-1">
                      {selectedCustomer.full_name || "N/A"}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
                  <div className="flex flex-col">
                    <span className="font-medium text-xs text-muted-foreground uppercase tracking-wide">
                      Email
                    </span>
                    <span className="text-sm mt-1 break-all">
                      {selectedCustomer.email || "N/A"}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
                  <div className="flex flex-col">
                    <span className="font-medium text-xs text-muted-foreground uppercase tracking-wide">
                      Phone
                    </span>
                    <span className="text-sm mt-1">
                      {selectedCustomer.phone_number || "N/A"}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Building className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
                  <div className="flex flex-col">
                    <span className="font-medium text-xs text-muted-foreground uppercase tracking-wide">
                      Category
                    </span>
                    <span className="text-sm mt-1">
                      {selectedCustomer.category || "N/A"}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <AlertCircle className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
                  <div className="flex flex-col">
                    <span className="font-medium text-xs text-muted-foreground uppercase tracking-wide">
                      Priority
                    </span>
                    <span className="text-sm mt-1 capitalize">
                      {selectedCustomer.priority || "N/A"}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
                  <div className="flex flex-col">
                    <span className="font-medium text-xs text-muted-foreground uppercase tracking-wide">
                      Created
                    </span>
                    <span className="text-sm mt-1">
                      {new Date(
                        selectedCustomer.created_at
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 md:col-span-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
                  <div className="flex flex-col w-full">
                    <span className="font-medium text-xs text-muted-foreground uppercase tracking-wide">
                      Subject
                    </span>
                    <span className="text-sm mt-1 break-words">
                      {selectedCustomer.subject || "N/A"}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 md:col-span-2">
                  <MessageCircle className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
                  <div className="flex flex-col w-full">
                    <span className="font-medium text-xs text-muted-foreground uppercase tracking-wide">
                      Message
                    </span>
                    <p className="text-sm mt-1 break-words leading-relaxed">
                      {selectedCustomer.message || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* View Mode Footer */}
              <div className="flex justify-between pt-4 border-t">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Close
                </Button>
                <div className="flex gap-2">
                  <Button
                    variant="destructive"
                    onClick={() => handleCustomerDelete(selectedCustomer.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    onClick={() => {
                      setCustomerEdit(selectedCustomer);
                      setCustomerEditMode(true);
                    }}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </DialogContent>
  </Dialog>
</>;
