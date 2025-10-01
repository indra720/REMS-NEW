import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StunningDataPopup from "./StunningDataPopup";
import StunningFeedbackPopup from "./StunningFeedbackPopup";
import { 
  User, 
  MessageSquare, 
  AlertTriangle, 
  Building, 
  Mail, 
  Phone,
  Calendar,
  MapPin,
  Star,
  Sparkles,
  Heart,
  Award,
  TrendingUp
} from "lucide-react";

const StunningPopupDemo = () => {
  const [showLeadPopup, setShowLeadPopup] = useState(false);
  const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);
  const [showCustomerPopup, setShowCustomerPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});

  // Sample data with your project's style
  const sampleLead = {
    id: 1,
    name: "Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    phone: "+91 9876543210",
    property_type: "3BHK Apartment",
    budget: "₹75-90 Lakhs",
    location: "Sector 45, Gurgaon",
    status: "Hot Lead",
    created_at: "2024-01-15T10:30:00Z",
    notes: "Looking for ready-to-move 3BHK apartment with modern amenities. Prefers high-rise buildings with good connectivity to metro.",
    source: "Website Inquiry"
  };

  const sampleFeedback = {
    id: 1,
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    category: "Service Quality",
    feedback_type: "positive",
    rating: 5,
    subject: "Outstanding service and support",
    detailed_feedback: "The entire team was incredibly professional and helped me find my dream home. The process was transparent, efficient, and stress-free. Special thanks to the agent who went above and beyond to ensure all my requirements were met.",
    what_went_well: "Quick response time, professional agents, transparent pricing, excellent follow-up, and smooth documentation process",
    how_to_improve: "Maybe add virtual property tours and more detailed floor plans on the website",
    recommend_us: "yes",
    created_at: "2024-01-20T14:15:00Z"
  };

  const sampleCustomer = {
    id: 1,
    name: "Amit Patel",
    email: "amit.patel@example.com",
    phone: "+91 8765432109",
    subject: "Property registration documentation",
    message: "I need assistance with the property registration documents. Some papers seem to be missing from my file and I need guidance on the next steps for completing the registration process.",
    priority: "High",
    status: "In Progress",
    created_at: "2024-01-18T09:45:00Z",
    category: "Documentation Support"
  };

  // Field configurations
  const leadFields = [
    { key: 'name', label: 'Full Name', type: 'text', icon: User, required: true },
    { key: 'email', label: 'Email Address', type: 'email', icon: Mail, required: true },
    { key: 'phone', label: 'Phone Number', type: 'phone', icon: Phone, required: true },
    { key: 'property_type', label: 'Property Type', type: 'select', options: [
      { value: '1BHK Apartment', label: '1BHK Apartment' },
      { value: '2BHK Apartment', label: '2BHK Apartment' },
      { value: '3BHK Apartment', label: '3BHK Apartment' },
      { value: 'Villa', label: 'Villa' },
      { value: 'Plot', label: 'Plot' },
      { value: 'Commercial', label: 'Commercial Space' }
    ]},
    { key: 'budget', label: 'Budget Range', type: 'text' },
    { key: 'location', label: 'Preferred Location', type: 'text', icon: MapPin },
    { key: 'status', label: 'Lead Status', type: 'badge' },
    { key: 'source', label: 'Lead Source', type: 'text' },
    { key: 'created_at', label: 'Created Date', type: 'datetime-local', readOnly: true },
    { key: 'notes', label: 'Notes & Requirements', type: 'textarea', gridCols: 1 }
  ];

  const customerFields = [
    { key: 'name', label: 'Customer Name', type: 'text', icon: User, required: true },
    { key: 'email', label: 'Email Address', type: 'email', icon: Mail, required: true },
    { key: 'phone', label: 'Phone Number', type: 'phone', icon: Phone },
    { key: 'subject', label: 'Subject', type: 'text', gridCols: 1 },
    { key: 'category', label: 'Support Category', type: 'select', options: [
      { value: 'Technical Support', label: 'Technical Support' },
      { value: 'Documentation Support', label: 'Documentation Support' },
      { value: 'Payment Issues', label: 'Payment Issues' },
      { value: 'Property Inquiry', label: 'Property Inquiry' },
      { value: 'General Support', label: 'General Support' }
    ]},
    { key: 'priority', label: 'Priority Level', type: 'badge' },
    { key: 'status', label: 'Ticket Status', type: 'badge' },
    { key: 'created_at', label: 'Created Date', type: 'datetime-local', readOnly: true },
    { key: 'message', label: 'Support Message', type: 'textarea', gridCols: 1 }
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
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditData({});
  };

  const handleDelete = () => {
    console.log('Deleting item');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="h-12 w-12 text-purple-600 animate-pulse" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 bg-clip-text text-transparent">
              Stunning Popup Components
            </h1>
            <Sparkles className="h-12 w-12 text-blue-600 animate-pulse" />
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Professional, beautiful, and responsive popup designs that match your project's stunning UI style. 
            Experience the perfect blend of aesthetics and functionality.
          </p>
        </div>

        {/* Demo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Lead Management Popup */}
          <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 border-4 border-blue-100 rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 text-white p-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                  <User className="h-8 w-8" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">Lead Management</CardTitle>
                  <p className="text-blue-100 mt-1">Professional lead tracking</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
              <p className="text-gray-700 mb-6 leading-relaxed">
                Stunning popup for managing leads with beautiful cards, gradient backgrounds, and smooth animations.
              </p>
              <Button 
                onClick={() => setShowLeadPopup(true)}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-900 text-white shadow-xl hover:shadow-2xl transition-all duration-300 font-bold transform hover:scale-105"
              >
                <Star className="h-5 w-5 mr-2" />
                View Lead Details
              </Button>
            </CardContent>
          </Card>

          {/* Feedback Management Popup */}
          <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 border-4 border-purple-100 rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-br from-purple-500 via-purple-600 to-violet-700 text-white p-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                  <MessageSquare className="h-8 w-8" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">Feedback System</CardTitle>
                  <p className="text-purple-100 mt-1">Customer feedback management</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 bg-gradient-to-br from-purple-50 to-violet-50">
              <p className="text-gray-700 mb-6 leading-relaxed">
                Specialized popup for customer feedback with interactive star ratings and beautiful categorization.
              </p>
              <Button 
                onClick={() => setShowFeedbackPopup(true)}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-purple-600 via-purple-700 to-violet-800 hover:from-purple-700 hover:via-purple-800 hover:to-violet-900 text-white shadow-xl hover:shadow-2xl transition-all duration-300 font-bold transform hover:scale-105"
              >
                <Heart className="h-5 w-5 mr-2" />
                View Feedback Details
              </Button>
            </CardContent>
          </Card>

          {/* Customer Support Popup */}
          <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 border-4 border-orange-100 rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-br from-orange-500 via-amber-600 to-yellow-700 text-white p-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                  <AlertTriangle className="h-8 w-8" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">Support Tickets</CardTitle>
                  <p className="text-orange-100 mt-1">Customer support system</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 bg-gradient-to-br from-orange-50 to-yellow-50">
              <p className="text-gray-700 mb-6 leading-relaxed">
                Enhanced popup for customer support tickets with priority indicators and status tracking.
              </p>
              <Button 
                onClick={() => setShowCustomerPopup(true)}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-orange-600 via-amber-700 to-yellow-800 hover:from-orange-700 hover:via-amber-800 hover:to-yellow-900 text-white shadow-xl hover:shadow-2xl transition-all duration-300 font-bold transform hover:scale-105"
              >
                <Award className="h-5 w-5 mr-2" />
                View Support Ticket
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">✨ Amazing Features ✨</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white rounded-2xl shadow-lg border-2 border-gray-100">
              <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Responsive Design</h3>
              <p className="text-sm text-gray-600">Perfect on all devices</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-lg border-2 border-gray-100">
              <Sparkles className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Stunning Animations</h3>
              <p className="text-sm text-gray-600">Smooth transitions</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-lg border-2 border-gray-100">
              <Heart className="h-8 w-8 text-pink-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Beautiful UI</h3>
              <p className="text-sm text-gray-600">Professional design</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-lg border-2 border-gray-100">
              <Award className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Easy Integration</h3>
              <p className="text-sm text-gray-600">Simple to implement</p>
            </div>
          </div>
        </div>

        {/* Stunning Lead Popup */}
        <StunningDataPopup
          isOpen={showLeadPopup}
          onClose={() => {
            setShowLeadPopup(false);
            setEditMode(false);
            setEditData({});
          }}
          title="Lead Management System"
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

        {/* Stunning Feedback Popup */}
        <StunningFeedbackPopup
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

        {/* Stunning Customer Support Popup */}
        <StunningDataPopup
          isOpen={showCustomerPopup}
          onClose={() => {
            setShowCustomerPopup(false);
            setEditMode(false);
            setEditData({});
          }}
          title="Customer Support System"
          data={sampleCustomer}
          editMode={editMode}
          editData={editData}
          onEdit={() => handleEdit(sampleCustomer)}
          onSave={handleSave}
          onCancel={handleCancel}
          onDelete={handleDelete}
          onFieldChange={handleFieldChange}
          fields={customerFields}
          icon={AlertTriangle}
          category="customer"
        />
      </div>
    </div>
  );
};

export default StunningPopupDemo;
