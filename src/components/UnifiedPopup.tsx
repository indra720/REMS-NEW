import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Edit, 
  Trash2, 
  Save, 
  X, 
  User, 
  Mail, 
  Phone, 
  Calendar,
  MapPin,
  Building,
  AlertCircle,
  MessageSquare,
  Sparkles
} from "lucide-react";

interface UnifiedPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: any;
  editMode: boolean;
  editData: any;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: () => void;
  onFieldChange: (field: string, value: any) => void;
  fields: Array<{
    key: string;
    label: string;
    type: 'text' | 'select' | 'textarea' | 'datetime-local' | 'number' | 'badge' | 'email' | 'phone';
    options?: Array<{ value: string; label: string }>;
    readOnly?: boolean;
    gridCols?: 1 | 2;
    required?: boolean;
  }>;
  icon?: any;
  category?: string;
}

const UnifiedPopup = ({
  isOpen,
  onClose,
  title,
  data,
  editMode,
  editData,
  onEdit,
  onSave,
  onCancel,
  onDelete,
  onFieldChange,
  fields,
  icon: TitleIcon,
  category = "default"
}: UnifiedPopupProps) => {

  const getFieldIcon = (type: string, key: string) => {
    if (key.includes('email')) return Mail;
    if (key.includes('phone')) return Phone;
    if (key.includes('date') || key.includes('created')) return Calendar;
    if (key.includes('name') || key.includes('user')) return User;
    if (key.includes('location') || key.includes('address')) return MapPin;
    if (key.includes('property') || key.includes('building')) return Building;
    if (key.includes('priority') || key.includes('status')) return AlertCircle;
    if (key.includes('message') || key.includes('feedback')) return MessageSquare;
    return null;
  };

  const getCategoryGradient = (cat: string) => {
    switch (cat) {
      case 'report': return 'from-red-600 via-rose-700 to-pink-800';
      case 'request': return 'from-blue-600 via-indigo-700 to-purple-800';
      case 'customer': return 'from-green-600 via-emerald-700 to-teal-800';
      case 'feedback': return 'from-purple-600 via-violet-700 to-indigo-800';
      case 'grievance': return 'from-orange-600 via-red-700 to-pink-800';
      default: return 'from-purple-600 via-indigo-700 to-blue-800';
    }
  };

  const renderField = (field: any) => {
    const value = editMode ? editData[field.key] : data[field.key];
    const FieldIcon = getFieldIcon(field.type, field.key);
    
    if (editMode && !field.readOnly) {
      switch (field.type) {
        case 'select':
          return (
            <div className="space-y-3">
              <Label className="text-sm font-bold text-gray-800 flex items-center gap-2">
                {FieldIcon && <FieldIcon className="h-4 w-4 text-purple-600" />}
                {field.label}
                {field.required && <span className="text-red-500 text-xs">*</span>}
              </Label>
              <Select
                value={value}
                onValueChange={(val) => onFieldChange(field.key, val)}
              >
                <SelectTrigger className="h-12 bg-white/90 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-600/20 focus:border-purple-600 transition-all duration-300 hover:border-purple-400">
                  <SelectValue placeholder={`Select ${field.label}`} />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-2 shadow-2xl">
                  {field.options?.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="rounded-lg">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          );
        case 'textarea':
          return (
            <div className="space-y-3">
              <Label className="text-sm font-bold text-gray-800 flex items-center gap-2">
                {FieldIcon && <FieldIcon className="h-4 w-4 text-purple-600" />}
                {field.label}
                {field.required && <span className="text-red-500 text-xs">*</span>}
              </Label>
              <Textarea
                value={value || ''}
                onChange={(e) => onFieldChange(field.key, e.target.value)}
                className="min-h-[120px] bg-white/90 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-600/20 focus:border-purple-600 transition-all duration-300 hover:border-purple-400 resize-none"
                placeholder={`Enter ${field.label.toLowerCase()}...`}
              />
            </div>
          );
        case 'datetime-local':
          return (
            <div className="space-y-3">
              <Label className="text-sm font-bold text-gray-800 flex items-center gap-2">
                {FieldIcon && <FieldIcon className="h-4 w-4 text-purple-600" />}
                {field.label}
                {field.required && <span className="text-red-500 text-xs">*</span>}
              </Label>
              <Input
                type="datetime-local"
                value={value ? new Date(value).toISOString().slice(0, 16) : ''}
                onChange={(e) => onFieldChange(field.key, e.target.value)}
                className="h-12 bg-white/90 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-600/20 focus:border-purple-600 transition-all duration-300 hover:border-purple-400"
              />
            </div>
          );
        default:
          return (
            <div className="space-y-3">
              <Label className="text-sm font-bold text-gray-800 flex items-center gap-2">
                {FieldIcon && <FieldIcon className="h-4 w-4 text-purple-600" />}
                {field.label}
                {field.required && <span className="text-red-500 text-xs">*</span>}
              </Label>
              <Input
                type={field.type === 'email' ? 'email' : field.type === 'phone' ? 'tel' : field.type === 'number' ? 'number' : 'text'}
                value={value || ''}
                onChange={(e) => onFieldChange(field.key, e.target.value)}
                className="h-12 bg-white/90 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-600/20 focus:border-purple-600 transition-all duration-300 hover:border-purple-400"
                placeholder={`Enter ${field.label.toLowerCase()}...`}
              />
            </div>
          );
      }
    }

    // View mode
    if (field.type === 'badge') {
      const getBadgeStyle = (val: string) => {
        const lowerVal = val?.toLowerCase();
        if (lowerVal?.includes('pending') || lowerVal?.includes('low')) 
          return 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white';
        if (lowerVal?.includes('high') || lowerVal?.includes('urgent')) 
          return 'bg-gradient-to-r from-red-500 to-pink-600 text-white';
        if (lowerVal?.includes('completed') || lowerVal?.includes('resolved')) 
          return 'bg-gradient-to-r from-green-500 to-emerald-600 text-white';
        return 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white';
      };

      return (
        <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border-2 border-gray-100 rounded-2xl overflow-hidden">
          <CardContent className="p-6 bg-gradient-to-br from-white via-gray-50 to-purple-50/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {FieldIcon && (
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl text-white shadow-lg">
                    <FieldIcon className="h-5 w-5" />
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{field.label}</p>
                  <Badge className={`px-4 py-2 font-bold text-sm rounded-full ${getBadgeStyle(value)} shadow-lg`}>
                    {value || "N/A"}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    if (field.type === 'datetime-local' && value) {
      return (
        <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border-2 border-gray-100 rounded-2xl overflow-hidden">
          <CardContent className="p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl text-white shadow-lg">
                <Calendar className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">{field.label}</p>
                <p className="text-lg font-bold text-gray-900 mb-1">
                  {new Date(value).toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </p>
                <p className="text-sm font-medium text-blue-600">
                  {new Date(value).toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border-2 border-gray-100 rounded-2xl overflow-hidden">
        <CardContent className="p-6 bg-gradient-to-br from-white via-gray-50 to-blue-50/30">
          <div className="flex items-start gap-4">
            {FieldIcon && (
              <div className="p-3 bg-gradient-to-br from-gray-500 to-gray-700 rounded-xl text-white shadow-lg flex-shrink-0">
                <FieldIcon className="h-5 w-5" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-600 mb-2">{field.label}</p>
              <p className="text-lg font-bold text-gray-900 break-words leading-relaxed">
                {value || "N/A"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-hidden flex flex-col p-0 gap-0 rounded-3xl border-4 border-white shadow-2xl">
        {/* Header */}
        <div className={`px-8 py-8 bg-gradient-to-br ${getCategoryGradient(category)} relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute -bottom-5 -left-5 w-32 h-32 bg-white/5 rounded-full blur-lg"></div>
          
          <div className="relative z-10">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white flex items-center gap-4 mb-3">
                {TitleIcon && (
                  <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30">
                    <TitleIcon className="h-8 w-8" />
                  </div>
                )}
                <div>
                  {title}
                  <div className="flex items-center gap-2 mt-1">
                    <Sparkles className="h-4 w-4 text-yellow-300 animate-pulse" />
                    <span className="text-sm font-normal text-white/90">
                      {editMode ? 'Edit information' : 'View details'}
                    </span>
                  </div>
                </div>
              </DialogTitle>
            </DialogHeader>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 bg-gradient-to-br from-gray-50 via-white to-purple-50/20">
          <div className="space-y-6">
            {editMode ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {fields.map((field) => (
                  <div 
                    key={field.key} 
                    className={field.gridCols === 1 ? "lg:col-span-2" : ""}
                  >
                    {renderField(field)}
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {fields.map((field) => (
                  <div 
                    key={field.key}
                    className={field.gridCols === 1 ? "lg:col-span-2" : ""}
                  >
                    {renderField(field)}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
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
                  Cancel
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
                  Delete
                </Button>
                <Button
                  onClick={onEdit}
                  className="sm:w-auto w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-900 text-white shadow-xl hover:shadow-2xl transition-all duration-300 font-bold transform hover:scale-105"
                >
                  <Edit className="h-5 w-5 mr-2" />
                  Edit Details
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UnifiedPopup;
