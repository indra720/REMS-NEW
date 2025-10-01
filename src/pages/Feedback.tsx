import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Star,
  MessageSquare,
  ThumbsUp,
  AlertCircle,
  Lightbulb,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Feedback = () => {
  const [rating, setRating] = useState(0);

  const feedbackTypes = [
    { value: "general", label: "General Feedback", icon: MessageSquare },
    { value: "feature", label: "Feature Request", icon: Lightbulb },
    { value: "bug", label: "Bug Report", icon: AlertCircle },
    { value: "compliment", label: "Compliment", icon: ThumbsUp },
  ];
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    detailed_feedback: "",
    what_went_well: "",
    how_to_improve: "",
    recommend_us: "",
    feedback_type: "general", // default
    rating:0,
  });

  //  handleChange
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // handleSubmit
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const token = localStorage.getItem("access_token");

  if (!token) {
    toast.error("You must be logged in to submit feedback!");
    return;
  }

  // ✅ Add this check right here, before the fetch call
  if (!formData.rating || formData.rating < 1 || formData.rating > 5) {
    toast.error("⚠️ Please select a rating between 1 and 5");
    return;
  }

  try {
    const response = await fetch("http://127.0.0.1:8000/api/feedback/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      // ✅ Replace body with this
      body: JSON.stringify({
        ...formData,
        rating: Number(formData.rating), // ensures integer
      }),
    });

    const data = await response.json();
    console.log("Feedback API response:", data);

    if (response.ok) {
      toast.success("✅ Feedback submitted successfully");
      setFormData({
        name: "",
        email: "",
        subject: "",
        category: "",
        detailed_feedback: "",
        what_went_well: "",
        how_to_improve: "",
        recommend_us: "",
        feedback_type: "general",
        rating: 0,
      });
    } else if (response.status === 401) {
      toast.error("❌ Unauthorized! Please log in again.");
    } else {
      toast.error("❌ Failed to submit feedback. Try again.");
    }
  } catch (error) {
    console.error("Error submitting feedback:", error);
    toast.error("⚠️ Network error. Please try again later.");
  }
};


  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600/5 via-background to-accent/5 py-5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4">
              We Value Your Opinion
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-accent bg-clip-text text-transparent">
              Share Your Feedback
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Help us improve by sharing your thoughts, suggestions, and
              experiences with RealEstate Pro.
            </p>
          </div>
        </div>
      </section>

      {/* Feedback Form */}
      <section className="py-5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8">
              <CardHeader>
                <CardTitle className="text-2xl mb-2">
                  Tell Us What You Think
                </CardTitle>
                <p className="text-muted-foreground">
                  Your feedback helps us create a better experience for
                  everyone.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Feedback Type */}
                <div>
                  <label className="text-sm font-medium mb-3 block">
                    What type of feedback would you like to share?
                  </label>
                  <div className="grid md:grid-cols-2 gap-4">
                    {feedbackTypes.map((type) => (
                      <Card
                        key={type.value}
                        className="p-4 cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-purple-600/50"
                      >
                        <div className="flex items-center gap-3">
                          <type.icon className="h-6 w-6 text-purple-600" />
                          <span className="font-medium">{type.label}</span>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                {/* Rating */}
                <div>
                  <label className="text-sm font-medium mb-3 block">
                    Overall Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-8 w-8 cursor-pointer transition-colors ${
                          star <= formData.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-muted-foreground"
                        }`}
                        onClick={() =>
                          setFormData({ ...formData, rating: star })
                        }
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {formData.rating === 0 && "Click to rate your experience"}
                    {formData.rating === 1 &&
                      "Poor - Needs significant improvement"}
                    {formData.rating === 2 && "Fair - Some issues to address"}
                    {formData.rating === 3 && "Good - Generally satisfied"}
                    {formData.rating === 4 &&
                      "Very Good - Mostly positive experience"}
                    {formData.rating === 5 &&
                      "Excellent - Exceeded expectations"}
                  </p>
                </div>

                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Your Name
                    </label>
                    <Input
                      placeholder="Enter your name"
                      name="name"
                      onChange={handleChange}
                      value={formData.name}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Email
                    </label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      name="email"
                      onChange={handleChange}
                      value={formData.email}
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Subject
                  </label>
                  <Input
                    placeholder="Brief summary of your feedback"
                    name="subject"
                    onChange={handleChange}
                    value={formData.subject}
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Category
                  </label>
                  <Select
                    name="category"
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="website">
                        Website Experience
                      </SelectItem>
                      <SelectItem value="mobile">Mobile App</SelectItem>
                      <SelectItem value="search">Property Search</SelectItem>
                      <SelectItem value="listing">Property Listing</SelectItem>
                      <SelectItem value="customer-service">
                        Customer Service
                      </SelectItem>
                      <SelectItem value="payment">Payment Process</SelectItem>
                      <SelectItem value="agent">Agent Service</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Detailed Feedback */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Detailed Feedback
                  </label>
                  <Textarea
                    placeholder="Please share your detailed feedback, suggestions, or describe any issues you encountered..."
                    rows={6}
                    name="detailed_feedback"
                    onChange={handleChange}
                    value={formData.detailed_feedback}
                  />
                </div>

                {/* What went well */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    What did we do well?
                  </label>
                  <Textarea
                    placeholder="Tell us what you liked about your experience..."
                    rows={3}
                    name="what_went_well"
                    onChange={handleChange}
                    value={formData.what_went_well}
                  />
                </div>

                {/* Improvements */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    How can we improve?
                  </label>
                  <Textarea
                    placeholder="Share your suggestions for improvement..."
                    rows={3}
                    name="how_to_improve"
                    onChange={handleChange}
                    value={formData.how_to_improve}
                  />
                </div>

                {/* Recommendation */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Would you recommend us to others?
                  </label>
                  <Select
                    onValueChange={(value) =>
                      setFormData({ ...formData, recommend_us: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your answer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="definitely">Definitely</SelectItem>
                      <SelectItem value="probably">Probably</SelectItem>
                      <SelectItem value="not-sure">Not Sure</SelectItem>
                      <SelectItem value="probably-not">Probably Not</SelectItem>
                      <SelectItem value="definitely-not">
                        Definitely Not
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full" size="lg" onClick={handleSubmit}>
                  Submit Feedback
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Thank You Section */}
      <section className="py-5 bg-muted/20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              Thank You for Your Feedback!
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Every piece of feedback helps us create a better experience. We
              review all submissions and use them to continuously improve our
              platform.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6">
                <CardContent className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-2">
                    24hrs
                  </div>
                  <p className="text-sm text-muted-foreground">Response Time</p>
                </CardContent>
              </Card>
              <Card className="p-6">
                <CardContent className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-2">
                    95%
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Customer Satisfaction
                  </p>
                </CardContent>
              </Card>
              <Card className="p-6">
                <CardContent className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-2">
                    1000+
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Monthly Improvements
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Feedback;
