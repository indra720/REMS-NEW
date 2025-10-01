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
  CheckCircle,
  Clock,
  Star
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface EnhancedDataPopupProps {
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
    icon?: any;
    required?: boolean;
  }>;
  icon?: any;
  category?: string;
}

const EnhancedDataPopup = ({
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
}: EnhancedDataPopupProps) => {

  const getFieldIcon = (type: string) => {
    switch (type) {
      case 'email': return Mail;
      case 'phone': return Phone;
      case 'datetime-local': return Calendar;
      default: return null;
    }
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'lead': return 'from-blue-500 to-blue-600';
      case 'customer': return 'from-green-500 to-green-600';
      case 'feedback': return 'from-purple-500 to-purple-600';
      case 'grievance': return 'from-red-500 to-red-600';
      case 'report': return 'from-orange-500 to-orange-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const renderField = (field: any) => {
    const value = editMode ? editData[field.key] : data[field.key];
    const FieldIcon = field.icon || getFieldIcon(field.type);
    
    if (editMode && !field.readOnly) {
      switch (field.type) {
        case 'select':
          return (
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                {FieldIcon && <FieldIcon className="h-4 w-4" />}
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
              </Label>
              <Select
                value={value}
                onValueChange={(val) => onFieldChange(field.key, val)}
              >
                <SelectTrigger className="h-11 border-gray-200 focus:border-purple-500 focus:ring-purple-500">
                  <SelectValue placeholder={`Select ${field.label}`} />
                </SelectTrigger>
                <SelectContent>
                  {field.options?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          );
        case 'textarea':
          return (
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                {FieldIcon && <FieldIcon className="h-4 w-4" />}
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
              </Label>
              <Textarea
                value={value || ''}
                onChange={(e) => onFieldChange(field.key, e.target.value)}
                className="min-h-[100px] border-gray-200 focus:border-purple-500 focus:ring-purple-500 resize-none"
                placeholder={`Enter ${field.label.toLowerCase()}`}
              />
            </div>
          );
        case 'datetime-local':
          return (
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                {FieldIcon && <FieldIcon className="h-4 w-4" />}
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
              </Label>
              <Input
                type="datetime-local"
                value={value ? new Date(value).toISOString().slice(0, 16) : ''}
                onChange={(e) => onFieldChange(field.key, e.target.value)}
                className="h-11 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
          );
        case 'number':
          return (
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                {FieldIcon && <FieldIcon className="h-4 w-4" />}
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
              </Label>
              <Input
                type="number"
                value={value || ''}
                onChange={(e) => onFieldChange(field.key, e.target.value)}
                className="h-11 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                placeholder={`Enter ${field.label.toLowerCase()}`}
              />
            </div>
          );
        default:
          return (
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                {FieldIcon && <FieldIcon className="h-4 w-4" />}
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
              </Label>
              <Input
                type={field.type === 'email' ? 'email' : field.type === 'phone' ? 'tel' : 'text'}
                value={value || ''}
                onChange={(e) => onFieldChange(field.key, e.target.value)}
                className="h-11 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                placeholder={`Enter ${field.label.toLowerCase()}`}
              />
            </div>
          );
      }
    }

    // View mode
    if (field.type === 'badge') {
      const getBadgeVariant = (val: string) => {
        const lowerVal = val?.toLowerCase();
        if (lowerVal?.includes('pending') || lowerVal?.includes('low')) return 'secondary';
        if (lowerVal?.includes('high') || lowerVal?.includes('urgent')) return 'destructive';
        if (lowerVal?.includes('completed') || lowerVal?.includes('resolved')) return 'default';
        return 'outline';
      };

      return (
        <Card className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 border-l-4 border-l-purple-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {FieldIcon && <FieldIcon className="h-4 w-4 text-gray-600" />}
              <span className="text-sm font-medium text-gray-600">{field.label}</span>
            </div>
            <Badge variant={getBadgeVariant(value)} className="font-medium">
              {value || "N/A"}
            </Badge>
          </div>
        </Card>
      );
    }

    if (field.type === 'datetime-local' && value) {
      return (
        <Card className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-l-blue-500">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-gray-600">{field.label}</p>
              <p className="text-base font-semibold text-gray-900">
                {new Date(value).toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(value).toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>
        </Card>
      );
    }

    return (
      <Card className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 border-l-4 border-l-gray-400 hover:shadow-md transition-shadow">
        <div className="flex items-start gap-3">
          {FieldIcon && <FieldIcon className="h-5 w-5 text-gray-600 mt-0.5 flex-shrink-0" />}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-600 mb-1">{field.label}</p>
            <p className="text-base font-semibold text-gray-900 break-words">
              {value || "N/A"}
            </p>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-hidden flex flex-col p-0 gap-0">
        {/* Enhanced Header */}
        <div className={`px-6 py-5 bg-gradient-to-r ${getCategoryColor(category)} text-white relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold flex items-center gap-3">
                {TitleIcon && <TitleIcon className="h-6 w-6" />}
                {title}
              </DialogTitle>
              <p className="text-white/90 text-sm mt-1">
                {editMode ? 'Edit the information below' : 'View detailed information'}
              </p>
            </DialogHeader>
          </div>
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full"></div>
          <div className="absolute -right-5 -bottom-5 w-20 h-20 bg-white/5 rounded-full"></div>
        </div>
        
        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
          <div className="space-y-6">
            {editMode ? (
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
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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

        {/* Enhanced Footer */}
        <div className="px-6 py-4 bg-white border-t border-gray-200">
          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            {editMode ? (
              <>
                <Button
                  variant="outline"
                  onClick={onCancel}
                  className="sm:w-auto w-full border-gray-300 hover:bg-gray-50"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  onClick={onSave}
                  className="sm:w-auto w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={onDelete}
                  className="sm:w-auto w-full border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
                <Button
                  onClick={onEdit}
                  className="sm:w-auto w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
                >
                  <Edit className="h-4 w-4 mr-2" />
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

export default EnhancedDataPopup;
