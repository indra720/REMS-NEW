import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EnhancedDataPopup from "./EnhancedDataPopup";
import EnhancedFeedbackPopup from "./EnhancedFeedbackPopup";
import DataPopup from "./DataPopup";
import { 
  User, 
  MessageSquare, 
  AlertTriangle, 
  Building, 
  Mail, 
  Phone,
  Calendar,
  MapPin
} from "lucide-react";

const PopupDemo = () => {
  const [showLeadPopup, setShowLeadPopup] = useState(false);
  const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);
  const [showCustomerPopup, setShowCustomerPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});

  // Sample lead data
  const sampleLead = {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 9876543210",
    property_type: "Apartment",
    budget: "50-75 Lakhs",
    location: "Gurgaon",
    status: "Hot Lead",
    created_at: "2024-01-15T10:30:00Z",
    notes: "Interested in 3BHK apartment in Sector 45. Looking for immediate possession.",
    source: "Website"
  };

  // Sample feedback data
  const sampleFeedback = {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    category: "Service Quality",
    feedback_type: "positive",
    rating: 5,
    subject: "Excellent service experience",
    detailed_feedback: "The team was very professional and helped me find the perfect property. The entire process was smooth and transparent.",
    what_went_well: "Quick response time, professional agents, transparent pricing",
    how_to_improve: "Maybe add more property photos on the website",
    recommend_us: "yes",
    created_at: "2024-01-20T14:15:00Z"
  };

  // Sample customer support data
  const sampleCustomer = {
    id: 1,
    name: "Mike Wilson",
    email: "mike.wilson@example.com",
    phone: "+91 8765432109",
    subject: "Property documentation issue",
    message: "I need help with the property registration documents. Some papers are missing from my file.",
    priority: "High",
    status: "In Progress",
    created_at: "2024-01-18T09:45:00Z",
    category: "Documentation"
  };

  // Field configurations for different popup types
  const leadFields = [
    { key: 'name', label: 'Full Name', type: 'text', icon: User, required: true },
    { key: 'email', label: 'Email Address', type: 'email', icon: Mail, required: true },
    { key: 'phone', label: 'Phone Number', type: 'phone', icon: Phone, required: true },
    { key: 'property_type', label: 'Property Type', type: 'select', options: [
      { value: 'Apartment', label: 'Apartment' },
      { value: 'Villa', label: 'Villa' },
      { value: 'Plot', label: 'Plot' },
      { value: 'Commercial', label: 'Commercial' }
    ]},
    { key: 'budget', label: 'Budget Range', type: 'text' },
    { key: 'location', label: 'Preferred Location', type: 'text', icon: MapPin },
    { key: 'status', label: 'Lead Status', type: 'badge' },
    { key: 'source', label: 'Lead Source', type: 'text' },
    { key: 'created_at', label: 'Created Date', type: 'datetime-local', readOnly: true },
    { key: 'notes', label: 'Notes', type: 'textarea', gridCols: 1 }
  ];

  const customerFields = [
    { key: 'name', label: 'Customer Name', type: 'text', icon: User, required: true },
    { key: 'email', label: 'Email Address', type: 'email', icon: Mail, required: true },
    { key: 'phone', label: 'Phone Number', type: 'phone', icon: Phone },
    { key: 'subject', label: 'Subject', type: 'text', gridCols: 1 },
    { key: 'category', label: 'Category', type: 'select', options: [
      { value: 'Technical', label: 'Technical Support' },
      { value: 'Documentation', label: 'Documentation' },
      { value: 'Payment', label: 'Payment Issues' },
      { value: 'General', label: 'General Inquiry' }
    ]},
    { key: 'priority', label: 'Priority', type: 'badge' },
    { key: 'status', label: 'Status', type: 'badge' },
    { key: 'created_at', label: 'Created Date', type: 'datetime-local', readOnly: true },
    { key: 'message', label: 'Message', type: 'textarea', gridCols: 1 }
  ];

  const handleFieldChange = (field: string, value: any) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleEdit = (data: any) => {
    setEditData(data);
    setEditMode(true);
  };

  const handleSave = () => {
    console.log('Saving data:', editData);
    setEditMode(false);
    // Here you would typically make an API call to save the data
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditData({});
  };

  const handleDelete = () => {
    console.log('Deleting item');
    // Here you would typically make an API call to delete the item
  };

  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
          Enhanced Popup Components Demo
        </h1>
        <p className="text-gray-600">
          Professional, responsive popup designs for your dashboard
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Lead Popup Demo */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-blue-600" />
              Lead Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Enhanced popup for managing leads with professional design and better UX.
            </p>
            <Button 
              onClick={() => setShowLeadPopup(true)}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            >
              View Lead Details
            </Button>
          </CardContent>
        </Card>

        {/* Feedback Popup Demo */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-purple-600" />
              Feedback Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Specialized popup for customer feedback with rating display and categorization.
            </p>
            <Button 
              onClick={() => setShowFeedbackPopup(true)}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
            >
              View Feedback Details
            </Button>
          </CardContent>
        </Card>

        {/* Customer Support Popup Demo */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              Customer Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Enhanced popup for customer support tickets with priority indicators.
            </p>
            <Button 
              onClick={() => setShowCustomerPopup(true)}
              className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800"
            >
              View Support Ticket
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Lead Popup */}
      <EnhancedDataPopup
        isOpen={showLeadPopup}
        onClose={() => {
          setShowLeadPopup(false);
          setEditMode(false);
          setEditData({});
        }}
        title="Lead Details"
        data={sampleLead}
        editMode={editMode}
        editData={editData}
        onEdit={() => handleEdit(sampleLead)}
        onSave={handleSave}
        onCancel={handleCancel}
        onDelete={handleDelete}
        onFieldChange={handleFieldChange}
        fields={leadFields}
        icon={User}
        category="lead"
      />

      {/* Enhanced Feedback Popup */}
      <EnhancedFeedbackPopup
        isOpen={showFeedbackPopup}
        onClose={() => {
          setShowFeedbackPopup(false);
          setEditMode(false);
          setEditData({});
        }}
        feedback={sampleFeedback}
        editMode={editMode}
        editData={editData}
        onEdit={() => handleEdit(sampleFeedback)}
        onSave={handleSave}
        onCancel={handleCancel}
        onDelete={handleDelete}
        onFieldChange={handleFieldChange}
      />

      {/* Enhanced Customer Support Popup */}
      <DataPopup
        isOpen={showCustomerPopup}
        onClose={() => {
          setShowCustomerPopup(false);
          setEditMode(false);
          setEditData({});
        }}
        title="Customer Support Ticket"
        data={sampleCustomer}
        editMode={editMode}
        editData={editData}
        onEdit={() => handleEdit(sampleCustomer)}
        onSave={handleSave}
        onCancel={handleCancel}
        onDelete={handleDelete}
        onFieldChange={handleFieldChange}
        fields={customerFields}
      />
    </div>
  );
};

export default PopupDemo;
