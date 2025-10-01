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
  Star,
  MessageSquare,
  User,
  Mail,
  Calendar,
  ThumbsUp,
  ThumbsDown,
  AlertCircle,
  Heart,
  Sparkles,
  Award,
  TrendingUp
} from "lucide-react";

interface StunningFeedbackPopupProps {
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

const StunningFeedbackPopup = ({
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
}: StunningFeedbackPopupProps) => {

  const getRatingColor = (rating: number) => {
    if (rating >= 5) return 'from-green-400 to-emerald-600';
    if (rating >= 4) return 'from-blue-400 to-indigo-600';
    if (rating >= 3) return 'from-yellow-400 to-orange-500';
    if (rating >= 2) return 'from-orange-400 to-red-500';
    return 'from-red-400 to-pink-600';
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

  const getFeedbackTypeStyle = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'positive': return {
        gradient: 'from-green-500 via-emerald-600 to-teal-700',
        bg: 'from-green-50 via-emerald-50 to-teal-50',
        icon: ThumbsUp,
        color: 'text-green-700'
      };
      case 'negative': return {
        gradient: 'from-red-500 via-rose-600 to-pink-700',
        bg: 'from-red-50 via-rose-50 to-pink-50',
        icon: ThumbsDown,
        color: 'text-red-700'
      };
      case 'suggestion': return {
        gradient: 'from-blue-500 via-indigo-600 to-purple-700',
        bg: 'from-blue-50 via-indigo-50 to-purple-50',
        icon: TrendingUp,
        color: 'text-blue-700'
      };
      default: return {
        gradient: 'from-gray-500 via-slate-600 to-gray-700',
        bg: 'from-gray-50 via-slate-50 to-gray-50',
        icon: MessageSquare,
        color: 'text-gray-700'
      };
    }
  };

  const renderStarRating = (rating: number, interactive: boolean = false) => {
    return (
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <div key={star} className="relative">
              <Star
                className={`h-8 w-8 transition-all duration-300 cursor-pointer ${
                  star <= rating
                    ? "text-yellow-400 fill-yellow-400 drop-shadow-lg"
                    : "text-gray-300 hover:text-yellow-200"
                } ${interactive ? 'hover:scale-110 transform' : ''}`}
                onClick={interactive ? () => onFieldChange('rating', star) : undefined}
              />
              {star <= rating && (
                <div className="absolute inset-0 animate-pulse">
                  <Star className="h-8 w-8 text-yellow-300 fill-yellow-300 opacity-50" />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className={`ml-3 px-4 py-2 rounded-full bg-gradient-to-r ${getRatingColor(rating)} text-white font-bold text-sm shadow-lg`}>
          {rating}/5
        </div>
      </div>
    );
  };

  if (!feedback) return null;

  const feedbackStyle = getFeedbackTypeStyle(feedback.feedback_type);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-hidden flex flex-col p-0 gap-0 rounded-3xl border-4 border-white shadow-2xl">
        {/* Absolutely Stunning Header */}
        <div className={`px-8 py-8 bg-gradient-to-br ${feedbackStyle.gradient} relative overflow-hidden`}>
          {/* Animated background elements */}
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute -bottom-5 -left-5 w-32 h-32 bg-white/5 rounded-full blur-lg"></div>
          <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-white/40 rounded-full animate-ping"></div>
          <div className="absolute top-1/4 right-1/3 w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
          
          <div className="relative z-10">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white flex items-center gap-4 mb-3">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30">
                  <feedbackStyle.icon className="h-8 w-8" />
                </div>
                <div>
                  Customer Feedback Details
                  <div className="flex items-center gap-2 mt-1">
                    <Heart className="h-4 w-4 text-pink-300 animate-pulse" />
                    <span className="text-sm font-normal text-white/90">
                      {editMode ? 'Edit feedback information' : 'View customer feedback'}
                    </span>
                  </div>
                </div>
              </DialogTitle>
            </DialogHeader>
          </div>
        </div>
        
        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 bg-gradient-to-br from-gray-50 via-white to-purple-50/20">
          <div className="space-y-8">
            {editMode ? (
              // Edit Mode
              <div className="space-y-8">
                {/* Rating Section */}
                <Card className="border-4 border-yellow-200 rounded-3xl overflow-hidden shadow-2xl">
                  <CardContent className="p-8 bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50">
                    <div className="text-center">
                      <Award className="h-12 w-12 mx-auto text-yellow-600 mb-4" />
                      <Label className="text-lg font-bold text-gray-800 mb-6 block">
                        Overall Rating
                      </Label>
                      {renderStarRating(editData.rating || 0, true)}
                      <p className="text-sm text-gray-600 mt-4 font-medium">
                        {getRatingText(editData.rating || 0)}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Personal Information */}
                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-gray-800 flex items-center gap-2">
                      <User className="h-4 w-4 text-purple-600" />
                      Full Name *
                    </Label>
                    <Input
                      value={editData.name || ''}
                      onChange={(e) => onFieldChange('name', e.target.value)}
                      className="h-12 bg-white/90 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-600/20 focus:border-purple-600 transition-all duration-300 hover:border-purple-400"
                      placeholder="Enter full name"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-gray-800 flex items-center gap-2">
                      <Mail className="h-4 w-4 text-purple-600" />
                      Email Address *
                    </Label>
                    <Input
                      type="email"
                      value={editData.email || ''}
                      onChange={(e) => onFieldChange('email', e.target.value)}
                      className="h-12 bg-white/90 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-600/20 focus:border-purple-600 transition-all duration-300 hover:border-purple-400"
                      placeholder="Enter email address"
                    />
                  </div>

                  {/* Category and Type */}
                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-gray-800">
                      Category *
                    </Label>
                    <Select
                      value={editData.category || ''}
                      onValueChange={(value) => onFieldChange('category', value)}
                    >
                      <SelectTrigger className="h-12 bg-white/90 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-600/20 focus:border-purple-600 transition-all duration-300 hover:border-purple-400">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-2 shadow-2xl">
                        <SelectItem value="Service Quality">Service Quality</SelectItem>
                        <SelectItem value="Website Experience">Website Experience</SelectItem>
                        <SelectItem value="Agent Support">Agent Support</SelectItem>
                        <SelectItem value="Property Listing">Property Listing</SelectItem>
                        <SelectItem value="General">General</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-gray-800">
                      Feedback Type *
                    </Label>
                    <Select
                      value={editData.feedback_type || ''}
                      onValueChange={(value) => onFieldChange('feedback_type', value)}
                    >
                      <SelectTrigger className="h-12 bg-white/90 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-600/20 focus:border-purple-600 transition-all duration-300 hover:border-purple-400">
                        <SelectValue placeholder="Select feedback type" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-2 shadow-2xl">
                        <SelectItem value="positive">Positive</SelectItem>
                        <SelectItem value="negative">Negative</SelectItem>
                        <SelectItem value="suggestion">Suggestion</SelectItem>
                        <SelectItem value="complaint">Complaint</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Subject */}
                  <div className="lg:col-span-2 space-y-3">
                    <Label className="text-sm font-bold text-gray-800">
                      Subject *
                    </Label>
                    <Input
                      value={editData.subject || ''}
                      onChange={(e) => onFieldChange('subject', e.target.value)}
                      className="h-12 bg-white/90 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-600/20 focus:border-purple-600 transition-all duration-300 hover:border-purple-400"
                      placeholder="Enter feedback subject"
                    />
                  </div>

                  {/* Detailed Feedback */}
                  <div className="lg:col-span-2 space-y-3">
                    <Label className="text-sm font-bold text-gray-800">
                      Detailed Feedback *
                    </Label>
                    <Textarea
                      value={editData.detailed_feedback || ''}
                      onChange={(e) => onFieldChange('detailed_feedback', e.target.value)}
                      className="min-h-[120px] bg-white/90 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-600/20 focus:border-purple-600 transition-all duration-300 hover:border-purple-400 resize-none"
                      placeholder="Please provide detailed feedback..."
                    />
                  </div>

                  {/* What Went Well */}
                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-gray-800 flex items-center gap-2">
                      <ThumbsUp className="h-4 w-4 text-green-600" />
                      What Went Well
                    </Label>
                    <Textarea
                      value={editData.what_went_well || ''}
                      onChange={(e) => onFieldChange('what_went_well', e.target.value)}
                      className="min-h-[100px] bg-white/90 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-600/20 focus:border-purple-600 transition-all duration-300 hover:border-purple-400 resize-none"
                      placeholder="What did you like about our service?"
                    />
                  </div>

                  {/* How to Improve */}
                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-gray-800 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-orange-600" />
                      How Can We Improve
                    </Label>
                    <Textarea
                      value={editData.how_to_improve || ''}
                      onChange={(e) => onFieldChange('how_to_improve', e.target.value)}
                      className="min-h-[100px] bg-white/90 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-600/20 focus:border-purple-600 transition-all duration-300 hover:border-purple-400 resize-none"
                      placeholder="How can we improve our service?"
                    />
                  </div>

                  {/* Recommendation */}
                  <div className="lg:col-span-2 space-y-3">
                    <Label className="text-sm font-bold text-gray-800">
                      Would you recommend us?
                    </Label>
                    <Select
                      value={editData.recommend_us || ''}
                      onValueChange={(value) => onFieldChange('recommend_us', value)}
                    >
                      <SelectTrigger className="h-12 bg-white/90 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-600/20 focus:border-purple-600 transition-all duration-300 hover:border-purple-400">
                        <SelectValue placeholder="Select recommendation" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-2 shadow-2xl">
                        <SelectItem value="yes">Yes, definitely</SelectItem>
                        <SelectItem value="maybe">Maybe</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            ) : (
              // View Mode with stunning cards
              <div className="space-y-8">
                {/* Rating Display */}
                <Card className="border-4 border-yellow-200 rounded-3xl overflow-hidden shadow-2xl">
                  <CardContent className="p-8 bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <Award className="h-8 w-8 text-yellow-600" />
                          <h3 className="text-2xl font-bold text-gray-900">Overall Rating</h3>
                        </div>
                        {renderStarRating(feedback.rating || 0)}
                        <p className="text-sm text-gray-600 mt-3 font-medium">
                          {getRatingText(feedback.rating || 0)}
                        </p>
                      </div>
                      <div className={`px-6 py-3 rounded-2xl bg-gradient-to-r ${feedbackStyle.gradient} text-white font-bold text-lg shadow-xl`}>
                        {feedback.feedback_type || 'General'}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Personal Information */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border-2 border-blue-100 rounded-2xl overflow-hidden">
                    <CardContent className="p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl text-white shadow-lg">
                          <User className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">Customer Name</p>
                          <p className="text-xl font-bold text-gray-900">{feedback.name || 'N/A'}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border-2 border-green-100 rounded-2xl overflow-hidden">
                    <CardContent className="p-6 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl text-white shadow-lg">
                          <Mail className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">Email Address</p>
                          <p className="text-lg font-bold text-gray-900">{feedback.email || 'N/A'}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border-2 border-purple-100 rounded-2xl overflow-hidden">
                    <CardContent className="p-6 bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl text-white shadow-lg">
                          <MessageSquare className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">Category</p>
                          <p className="text-lg font-bold text-gray-900">{feedback.category || 'N/A'}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border-2 border-orange-100 rounded-2xl overflow-hidden">
                    <CardContent className="p-6 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl text-white shadow-lg">
                          <Calendar className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">Submitted On</p>
                          <p className="text-lg font-bold text-gray-900">
                            {feedback.created_at ? new Date(feedback.created_at).toLocaleDateString() : 'N/A'}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Subject */}
                <Card className="border-2 border-gray-100 rounded-2xl overflow-hidden shadow-xl">
                  <CardContent className="p-8 bg-gradient-to-br from-white via-gray-50 to-blue-50/30">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Sparkles className="h-6 w-6 text-purple-600" />
                      Subject
                    </h3>
                    <p className="text-gray-700 text-lg leading-relaxed">{feedback.subject || 'No subject provided'}</p>
                  </CardContent>
                </Card>

                {/* Detailed Feedback */}
                <Card className="border-2 border-gray-100 rounded-2xl overflow-hidden shadow-xl">
                  <CardContent className="p-8 bg-gradient-to-br from-white via-gray-50 to-purple-50/30">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <MessageSquare className="h-6 w-6 text-indigo-600" />
                      Detailed Feedback
                    </h3>
                    <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">{feedback.detailed_feedback || 'No detailed feedback provided'}</p>
                  </CardContent>
                </Card>

                {/* What Went Well & Improvements */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card className="border-2 border-green-200 rounded-2xl overflow-hidden shadow-xl">
                    <CardContent className="p-8 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
                      <div className="flex items-center gap-3 mb-4">
                        <ThumbsUp className="h-6 w-6 text-green-600" />
                        <h3 className="text-xl font-bold text-green-900">What Went Well</h3>
                      </div>
                      <p className="text-green-800 text-lg leading-relaxed">{feedback.what_went_well || 'No positive feedback provided'}</p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-orange-200 rounded-2xl overflow-hidden shadow-xl">
                    <CardContent className="p-8 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
                      <div className="flex items-center gap-3 mb-4">
                        <AlertCircle className="h-6 w-6 text-orange-600" />
                        <h3 className="text-xl font-bold text-orange-900">How to Improve</h3>
                      </div>
                      <p className="text-orange-800 text-lg leading-relaxed">{feedback.how_to_improve || 'No improvement suggestions provided'}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Recommendation */}
                {feedback.recommend_us && (
                  <Card className="border-2 border-blue-200 rounded-2xl overflow-hidden shadow-xl">
                    <CardContent className="p-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
                      <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                        <Heart className="h-6 w-6 text-pink-600" />
                        Would Recommend Us
                      </h3>
                      <Badge className={`px-6 py-3 font-bold text-lg rounded-2xl ${
                        feedback.recommend_us === 'yes' ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' :
                        feedback.recommend_us === 'maybe' ? 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white' :
                        'bg-gradient-to-r from-red-500 to-pink-600 text-white'
                      } shadow-lg`}>
                        {feedback.recommend_us === 'yes' ? 'Yes, definitely' :
                         feedback.recommend_us === 'maybe' ? 'Maybe' : 'No'}
                      </Badge>
                    </CardContent>
                  </Card>
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
                  Delete Feedback
                </Button>
                <Button
                  onClick={onEdit}
                  className="sm:w-auto w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-900 text-white shadow-xl hover:shadow-2xl transition-all duration-300 font-bold transform hover:scale-105"
                >
                  <Edit className="h-5 w-5 mr-2" />
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

export default StunningFeedbackPopup;
