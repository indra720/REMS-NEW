import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Edit, 
  Trash2, 
  Save, 
  X, 
  User,
  Building,
  AlertCircle,
  Calendar,
  MessageSquare,
  FileText,
  CreditCard,
  Sparkles
} from "lucide-react";

interface StunningGrievancePopupProps {
  isOpen: boolean;
  onClose: () => void;
  grievance: any;
  editMode: boolean;
  editData: any;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: () => void;
  onFieldChange: (field: string, value: any) => void;
}

const StunningGrievancePopup = ({
  isOpen,
  onClose,
  grievance,
  editMode,
  editData,
  onEdit,
  onSave,
  onCancel,
  onDelete,
  onFieldChange,
}: StunningGrievancePopupProps) => {

  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case 'urgent': return 'from-red-500 to-pink-600';
      case 'high': return 'from-orange-500 to-red-500';
      case 'medium': return 'from-yellow-500 to-orange-500';
      case 'low': return 'from-green-500 to-emerald-600';
      default: return 'from-gray-500 to-slate-600';
    }
  };

  if (!grievance) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-hidden flex flex-col p-0 gap-0 rounded-3xl border-4 border-white shadow-2xl">
        {/* Beautiful Header */}
        <div className="px-8 py-8 bg-gradient-to-br from-red-600 via-rose-700 to-pink-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute -bottom-5 -left-5 w-32 h-32 bg-white/5 rounded-full blur-lg"></div>
          <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-white/40 rounded-full animate-ping"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30">
                <AlertCircle className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Grievance Management</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Sparkles className="h-4 w-4 text-yellow-300 animate-pulse" />
                  <p className="text-white/90 text-sm">
                    {editMode ? 'Edit grievance details' : 'View grievance information'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 bg-gradient-to-br from-gray-50 via-white to-red-50/20">
          <div className="space-y-8">
            {editMode ? (
              // Edit Mode with stunning inputs
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label className="text-sm font-bold text-gray-800 flex items-center gap-2">
                    <User className="h-4 w-4 text-purple-600" />
                    User ID
                  </Label>
                  <Input
                    value={editData.user || ''}
                    onChange={(e) => onFieldChange('user', e.target.value)}
                    className="h-12 bg-white/90 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-600/20 focus:border-purple-600 transition-all duration-300 hover:border-purple-400"
                    placeholder="Enter user ID"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-bold text-gray-800 flex items-center gap-2">
                    <Building className="h-4 w-4 text-purple-600" />
                    Category *
                  </Label>
                  <Select
                    value={editData.category || ''}
                    onValueChange={(value) => onFieldChange('category', value)}
                  >
                    <SelectTrigger className="h-12 bg-white/90 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-600/20 focus:border-purple-600 transition-all duration-300 hover:border-purple-400">
                      <SelectValue placeholder="Select grievance category" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-2 shadow-2xl">
                      <SelectItem value="Service Quality">Service Quality</SelectItem>
                      <SelectItem value="Documentation">Documentation Issues</SelectItem>
                      <SelectItem value="Technical">Technical Problems</SelectItem>
                      <SelectItem value="Payment">Payment Issues</SelectItem>
                      <SelectItem value="Agent Behavior">Agent Behavior</SelectItem>
                      <SelectItem value="Property Listing">Property Listing</SelectItem>
                      <SelectItem value="Legal Documentation">Legal Documentation</SelectItem>
                      <SelectItem value="Site Visit">Site Visit Issues</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-bold text-gray-800 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-purple-600" />
                    Priority Level
                  </Label>
                  <Select
                    value={editData.priority || ''}
                    onValueChange={(value) => onFieldChange('priority', value)}
                  >
                    <SelectTrigger className="h-12 bg-white/90 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-600/20 focus:border-purple-600 transition-all duration-300 hover:border-purple-400">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-2 shadow-2xl">
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-bold text-gray-800 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-purple-600" />
                    Grievance Title *
                  </Label>
                  <Input
                    value={editData.title || ''}
                    onChange={(e) => onFieldChange('title', e.target.value)}
                    className="h-12 bg-white/90 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-600/20 focus:border-purple-600 transition-all duration-300 hover:border-purple-400"
                    placeholder="Enter grievance title"
                  />
                </div>

                <div className="lg:col-span-2 space-y-3">
                  <Label className="text-sm font-bold text-gray-800 flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-purple-600" />
                    Detailed Description *
                  </Label>
                  <Textarea
                    value={editData.description || ''}
                    onChange={(e) => onFieldChange('description', e.target.value)}
                    className="min-h-[120px] bg-white/90 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-600/20 focus:border-purple-600 transition-all duration-300 hover:border-purple-400 resize-none"
                    placeholder="Please provide detailed description of your grievance..."
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-bold text-gray-800 flex items-center gap-2">
                    <Building className="h-4 w-4 text-purple-600" />
                    Property ID
                  </Label>
                  <Input
                    value={editData.property_id || ''}
                    onChange={(e) => onFieldChange('property_id', e.target.value)}
                    className="h-12 bg-white/90 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-600/20 focus:border-purple-600 transition-all duration-300 hover:border-purple-400"
                    placeholder="Enter property ID (if applicable)"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-bold text-gray-800 flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-purple-600" />
                    Transaction ID
                  </Label>
                  <Input
                    value={editData.transaction_id || ''}
                    onChange={(e) => onFieldChange('transaction_id', e.target.value)}
                    className="h-12 bg-white/90 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-600/20 focus:border-purple-600 transition-all duration-300 hover:border-purple-400"
                    placeholder="Enter transaction ID (if applicable)"
                  />
                </div>
              </div>
            ) : (
              // View Mode with stunning cards
              <div className="space-y-6">
                {/* Priority and Status */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border-2 border-gray-100 rounded-2xl overflow-hidden">
                    <CardContent className="p-6 bg-gradient-to-br from-red-50 via-rose-50 to-pink-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-3 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl text-white shadow-lg">
                            <AlertCircle className="h-6 w-6" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Priority Level</p>
                            <Badge className={`px-4 py-2 font-bold text-sm rounded-full bg-gradient-to-r ${getPriorityColor(grievance.priority)} text-white shadow-lg`}>
                              {grievance.priority || 'Medium'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border-2 border-gray-100 rounded-2xl overflow-hidden">
                    <CardContent className="p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl text-white shadow-lg">
                          <Calendar className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">Created Date</p>
                          <p className="text-lg font-bold text-gray-900">
                            {grievance.created_at ? new Date(grievance.created_at).toLocaleDateString() : 'N/A'}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* User and Category Info */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border-2 border-gray-100 rounded-2xl overflow-hidden">
                    <CardContent className="p-6 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl text-white shadow-lg">
                          <User className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">User ID</p>
                          <p className="text-lg font-bold text-gray-900">{grievance.user || 'N/A'}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border-2 border-gray-100 rounded-2xl overflow-hidden">
                    <CardContent className="p-6 bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl text-white shadow-lg">
                          <Building className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">Category</p>
                          <p className="text-lg font-bold text-gray-900">{grievance.category || 'N/A'}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Title */}
                <Card className="border-2 border-gray-100 rounded-2xl overflow-hidden shadow-xl">
                  <CardContent className="p-8 bg-gradient-to-br from-white via-gray-50 to-blue-50/30">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <FileText className="h-6 w-6 text-purple-600" />
                      Grievance Title
                    </h3>
                    <p className="text-gray-700 text-lg leading-relaxed">{grievance.title || 'No title provided'}</p>
                  </CardContent>
                </Card>

                {/* Description */}
                <Card className="border-2 border-gray-100 rounded-2xl overflow-hidden shadow-xl">
                  <CardContent className="p-8 bg-gradient-to-br from-white via-gray-50 to-purple-50/30">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <MessageSquare className="h-6 w-6 text-indigo-600" />
                      Detailed Description
                    </h3>
                    <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">{grievance.description || 'No description provided'}</p>
                  </CardContent>
                </Card>

                {/* Property and Transaction IDs */}
                {(grievance.property_id || grievance.transaction_id) && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {grievance.property_id && (
                      <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border-2 border-gray-100 rounded-2xl overflow-hidden">
                        <CardContent className="p-6 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl text-white shadow-lg">
                              <Building className="h-6 w-6" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-600 mb-1">Property ID</p>
                              <p className="text-lg font-bold text-gray-900">{grievance.property_id}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {grievance.transaction_id && (
                      <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border-2 border-gray-100 rounded-2xl overflow-hidden">
                        <CardContent className="p-6 bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl text-white shadow-lg">
                              <CreditCard className="h-6 w-6" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-600 mb-1">Transaction ID</p>
                              <p className="text-lg font-bold text-gray-900">{grievance.transaction_id}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Stunning Footer */}
        <div className="px-8 py-6 bg-white border-t-2 border-gray-100">
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            {editMode ? (
              <>
                <Button
                  variant="outline"
                  onClick={onCancel}
                  className="sm:w-auto w-full h-12 rounded-xl border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 font-semibold"
                >
                  <X className="h-5 w-5 mr-2" />
                  Cancel Changes
                </Button>
                <Button
                  onClick={onSave}
                  className="sm:w-auto w-full h-12 rounded-xl bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-800 hover:from-purple-700 hover:via-purple-800 hover:to-indigo-900 text-white shadow-xl hover:shadow-2xl transition-all duration-300 font-bold transform hover:scale-105"
                >
                  <Save className="h-5 w-5 mr-2" />
                  Save Changes
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={onDelete}
                  className="sm:w-auto w-full h-12 rounded-xl border-2 border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 transition-all duration-300 font-semibold"
                >
                  <Trash2 className="h-5 w-5 mr-2" />
                  Delete Grievance
                </Button>
                <Button
                  onClick={onEdit}
                  className="sm:w-auto w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-900 text-white shadow-xl hover:shadow-2xl transition-all duration-300 font-bold transform hover:scale-105"
                >
                  <Edit className="h-5 w-5 mr-2" />
                  Edit Grievance
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StunningGrievancePopup;
