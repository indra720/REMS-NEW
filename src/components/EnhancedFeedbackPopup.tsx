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
  Star,
  MessageSquare,
  User,
  Mail,
  Calendar,
  ThumbsUp,
  ThumbsDown,
  AlertCircle
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

interface EnhancedFeedbackPopupProps {
  isOpen: boolean;
  onClose: () => void;
  feedback: any;
  editMode: boolean;
  editData: any;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: () => void;
  onFieldChange: (field: string, value: any) => void;
}

const EnhancedFeedbackPopup = ({
  isOpen,
  onClose,
  feedback,
  editMode,
  editData,
  onEdit,
  onSave,
  onCancel,
  onDelete,
  onFieldChange,
}: EnhancedFeedbackPopupProps) => {

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-green-500';
    if (rating >= 3) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getRatingText = (rating: number) => {
    switch (rating) {
      case 1: return "Poor - Needs significant improvement";
      case 2: return "Fair - Some issues to address";
      case 3: return "Good - Generally satisfied";
      case 4: return "Very Good - Mostly positive experience";
      case 5: return "Excellent - Exceeded expectations";
      default: return "No rating provided";
    }
  };

  const getFeedbackTypeColor = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'positive': return 'bg-green-100 text-green-800 border-green-200';
      case 'negative': return 'bg-red-100 text-red-800 border-red-200';
      case 'suggestion': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const renderStarRating = (rating: number, interactive: boolean = false) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-6 w-6 transition-colors ${
              star <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            } ${interactive ? 'cursor-pointer hover:text-yellow-300' : ''}`}
            onClick={interactive ? () => onFieldChange('rating', star) : undefined}
          />
        ))}
        <span className={`ml-2 text-sm font-medium ${getRatingColor(rating)}`}>
          ({rating}/5)
        </span>
      </div>
    );
  };

  if (!feedback) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[95vh] overflow-hidden flex flex-col p-0 gap-0">
        {/* Enhanced Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-purple-600 to-purple-700 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold flex items-center gap-3">
                <MessageSquare className="h-6 w-6" />
                Customer Feedback Details
              </DialogTitle>
              <p className="text-white/90 text-sm mt-1">
                {editMode ? 'Edit feedback information' : 'View detailed feedback'}
              </p>
            </DialogHeader>
          </div>
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full"></div>
        </div>
        
        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
          <div className="space-y-6">
            {editMode ? (
              // Edit Mode
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Rating Section */}
                <div className="lg:col-span-2">
                  <Card className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-l-yellow-500">
                    <Label className="text-sm font-medium text-gray-700 mb-3 block">
                      Overall Rating
                    </Label>
                    {renderStarRating(editData.rating || 0, true)}
                    <p className="text-sm text-gray-600 mt-2">
                      {getRatingText(editData.rating || 0)}
                    </p>
                  </Card>
                </div>

                {/* Personal Information */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Full Name *
                  </Label>
                  <Input
                    value={editData.name || ''}
                    onChange={(e) => onFieldChange('name', e.target.value)}
                    className="h-11 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                    placeholder="Enter full name"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Address *
                  </Label>
                  <Input
                    type="email"
                    value={editData.email || ''}
                    onChange={(e) => onFieldChange('email', e.target.value)}
                    className="h-11 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                    placeholder="Enter email address"
                  />
                </div>

                {/* Category and Type */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Category *
                  </Label>
                  <Select
                    value={editData.category || ''}
                    onValueChange={(value) => onFieldChange('category', value)}
                  >
                    <SelectTrigger className="h-11 border-gray-200 focus:border-purple-500 focus:ring-purple-500">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Service Quality">Service Quality</SelectItem>
                      <SelectItem value="Website Experience">Website Experience</SelectItem>
                      <SelectItem value="Agent Support">Agent Support</SelectItem>
                      <SelectItem value="Property Listing">Property Listing</SelectItem>
                      <SelectItem value="General">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Feedback Type *
                  </Label>
                  <Select
                    value={editData.feedback_type || ''}
                    onValueChange={(value) => onFieldChange('feedback_type', value)}
                  >
                    <SelectTrigger className="h-11 border-gray-200 focus:border-purple-500 focus:ring-purple-500">
                      <SelectValue placeholder="Select feedback type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="positive">Positive</SelectItem>
                      <SelectItem value="negative">Negative</SelectItem>
                      <SelectItem value="suggestion">Suggestion</SelectItem>
                      <SelectItem value="complaint">Complaint</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Subject */}
                <div className="lg:col-span-2 space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Subject *
                  </Label>
                  <Input
                    value={editData.subject || ''}
                    onChange={(e) => onFieldChange('subject', e.target.value)}
                    className="h-11 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                    placeholder="Enter feedback subject"
                  />
                </div>

                {/* Detailed Feedback */}
                <div className="lg:col-span-2 space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Detailed Feedback *
                  </Label>
                  <Textarea
                    value={editData.detailed_feedback || ''}
                    onChange={(e) => onFieldChange('detailed_feedback', e.target.value)}
                    className="min-h-[120px] border-gray-200 focus:border-purple-500 focus:ring-purple-500 resize-none"
                    placeholder="Please provide detailed feedback..."
                  />
                </div>

                {/* What Went Well */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <ThumbsUp className="h-4 w-4 text-green-600" />
                    What Went Well
                  </Label>
                  <Textarea
                    value={editData.what_went_well || ''}
                    onChange={(e) => onFieldChange('what_went_well', e.target.value)}
                    className="min-h-[80px] border-gray-200 focus:border-purple-500 focus:ring-purple-500 resize-none"
                    placeholder="What did you like about our service?"
                  />
                </div>

                {/* How to Improve */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-orange-600" />
                    How Can We Improve
                  </Label>
                  <Textarea
                    value={editData.how_to_improve || ''}
                    onChange={(e) => onFieldChange('how_to_improve', e.target.value)}
                    className="min-h-[80px] border-gray-200 focus:border-purple-500 focus:ring-purple-500 resize-none"
                    placeholder="How can we improve our service?"
                  />
                </div>

                {/* Recommendation */}
                <div className="lg:col-span-2 space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Would you recommend us?
                  </Label>
                  <Select
                    value={editData.recommend_us || ''}
                    onValueChange={(value) => onFieldChange('recommend_us', value)}
                  >
                    <SelectTrigger className="h-11 border-gray-200 focus:border-purple-500 focus:ring-purple-500">
                      <SelectValue placeholder="Select recommendation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes, definitely</SelectItem>
                      <SelectItem value="maybe">Maybe</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ) : (
              // View Mode
              <div className="space-y-6">
                {/* Rating Display */}
                <Card className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-l-yellow-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Overall Rating</h3>
                      {renderStarRating(feedback.rating || 0)}
                      <p className="text-sm text-gray-600 mt-2">
                        {getRatingText(feedback.rating || 0)}
                      </p>
                    </div>
                    <Badge className={`px-3 py-1 font-medium ${getFeedbackTypeColor(feedback.feedback_type)}`}>
                      {feedback.feedback_type || 'General'}
                    </Badge>
                  </div>
                </Card>

                {/* Personal Information */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <Card className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-l-blue-500">
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-600">Customer Name</p>
                        <p className="text-base font-semibold text-gray-900">{feedback.name || 'N/A'}</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-l-green-500">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-600">Email Address</p>
                        <p className="text-base font-semibold text-gray-900">{feedback.email || 'N/A'}</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 border-l-4 border-l-purple-500">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-600">Category</p>
                        <p className="text-base font-semibold text-gray-900">{feedback.category || 'N/A'}</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 border-l-4 border-l-orange-500">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-orange-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-600">Submitted On</p>
                        <p className="text-base font-semibold text-gray-900">
                          {feedback.created_at ? new Date(feedback.created_at).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Subject */}
                <Card className="p-6 bg-white border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Subject</h3>
                  <p className="text-gray-700">{feedback.subject || 'No subject provided'}</p>
                </Card>

                {/* Detailed Feedback */}
                <Card className="p-6 bg-white border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Detailed Feedback</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">{feedback.detailed_feedback || 'No detailed feedback provided'}</p>
                </Card>

                {/* What Went Well & Improvements */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="p-6 bg-green-50 border border-green-200">
                    <div className="flex items-center gap-2 mb-3">
                      <ThumbsUp className="h-5 w-5 text-green-600" />
                      <h3 className="text-lg font-semibold text-green-900">What Went Well</h3>
                    </div>
                    <p className="text-green-800">{feedback.what_went_well || 'No positive feedback provided'}</p>
                  </Card>

                  <Card className="p-6 bg-orange-50 border border-orange-200">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertCircle className="h-5 w-5 text-orange-600" />
                      <h3 className="text-lg font-semibold text-orange-900">How to Improve</h3>
                    </div>
                    <p className="text-orange-800">{feedback.how_to_improve || 'No improvement suggestions provided'}</p>
                  </Card>
                </div>

                {/* Recommendation */}
                {feedback.recommend_us && (
                  <Card className="p-6 bg-blue-50 border border-blue-200">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">Would Recommend Us</h3>
                    <Badge className={`px-3 py-1 font-medium ${
                      feedback.recommend_us === 'yes' ? 'bg-green-100 text-green-800' :
                      feedback.recommend_us === 'maybe' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {feedback.recommend_us === 'yes' ? 'Yes, definitely' :
                       feedback.recommend_us === 'maybe' ? 'Maybe' : 'No'}
                    </Badge>
                  </Card>
                )}
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
                  Delete Feedback
                </Button>
                <Button
                  onClick={onEdit}
                  className="sm:w-auto w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Feedback
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EnhancedFeedbackPopup;
