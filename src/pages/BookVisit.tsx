import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { toast } from "react-toastify";
import { showSuccessToast, showErrorToast, showInfoToast } from "@/utils/toast";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Phone, 
  MessageCircle, 
  CheckCircle,
  AlertCircle,
  Users,
  Car,
  Coffee,
  Home,
  Star
} from "lucide-react";

const BookVisit = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [visitType, setVisitType] = useState("");
  const [selectedAgent, setSelectedAgent] = useState<number | null>(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    visitors: '',
    requirements: '',
    parking: false,
    refreshments: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // API call function for booking visit
  const bookVisit = async (visitData: any) => {
    const token = localStorage.getItem("access_token");
    
    if (!token) {
      toast({
        title: "Authentication Error",
        description: "Please log in to book a visit",
        variant: "destructive"
      });
      return false;
    }

    console.log("=== DEBUG INFO ===");
    console.log("Sending preferred_time:", visitData.preferred_time);
    console.log("Current time:", new Date().toISOString());
    console.log("Time difference (minutes):", (new Date(visitData.preferred_time).getTime() - new Date().getTime()) / (1000 * 60));
    console.log("===================");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/visits/", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(visitData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Visit booked successfully:", result);
        return true;
      } else {
        const errorData = await response.json();
        console.error("API Error Details:", errorData);
        console.error("Response Status:", response.status);
        
        // Show specific error message if available
        let errorMessage = "Failed to book visit. Please try again.";
        if (errorData.preferred_time && Array.isArray(errorData.preferred_time)) {
          errorMessage = `Time Error: ${errorData.preferred_time.join(', ')}`;
        } else if (errorData.property && Array.isArray(errorData.property)) {
          errorMessage = `Property Error: ${errorData.property.join(', ')}`;
        }
        
        toast({
          title: "Booking Failed",
          description: errorMessage,
          variant: "destructive"
        });
        return false;
      }
    } catch (error) {
      console.error("Network Error:", error);
      toast({
        title: "Network Error",
        description: "Unable to connect to server. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  };

  // Get current user ID
  const getCurrentUserId = () => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        return user.id || user.user_id || 1;
      } catch (e) {
        return 1;
      }
    }
    return 1;
  };

  const handleCall = (phoneNumber: string) => {
    window.location.href = `tel:${phoneNumber}`;
    toast({
      title: "Initiating Call",
      description: `Calling ${phoneNumber}...`,
    });
  };

  const handleSelectAgent = (agentId: number) => {
    setSelectedAgent(agentId);
    toast({
      title: "Agent Selected",
      description: "Great choice! This agent will guide your visit.",
    });
  };

  const createFutureDateTime = (date: Date, timeString: string) => {
    const [time, period] = timeString.split(' ');
    const [hours, minutes] = time.split(':');
    let hour24 = parseInt(hours);
    
    // Fix AM/PM conversion
    if (period === 'PM' && hour24 !== 12) {
      hour24 += 12;
    }
    if (period === 'AM' && hour24 === 12) {
      hour24 = 0;
    }
    
    // Create new date to avoid mutation
    const appointmentDateTime = new Date(date);
    appointmentDateTime.setHours(hour24, parseInt(minutes), 0, 0);

    // Ensure it's in the future - add buffer if needed
    const now = new Date();
    const timeDiff = appointmentDateTime.getTime() - now.getTime();
    
    if (timeDiff <= 0) {
      // If time is in past or too close, add 30 minutes buffer
      appointmentDateTime.setMinutes(appointmentDateTime.getMinutes() + 30);
      console.log("Added buffer time - new appointment time:", appointmentDateTime.toISOString());
    }

    return appointmentDateTime;
  };

  const handleBookingConfirm = async () => {
    // Validation
    if (!formData.name || !formData.phone || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (!selectedDate || !selectedTime || !selectedAgent) {
      toast({
        title: "Incomplete Booking",
        description: "Please select date, time, and agent.",
        variant: "destructive"
      });
      return;
    }

    if (typeof selectedAgent !== 'number' || selectedAgent <= 0) {
      toast({
        title: "Invalid Agent",
        description: "Please select a valid agent.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create proper future datetime
      const appointmentDateTime = createFutureDateTime(selectedDate, selectedTime);

      const visitData = {
        user: getCurrentUserId(),
        property: 1,
        preferred_time: appointmentDateTime.toISOString(),
        agent: selectedAgent,
      };

      console.log("Final visit data:", visitData);

      const success = await bookVisit(visitData);
      
      if (success) {
        toast({
          title: "Visit Booked Successfully!",
          description: "You'll receive a confirmation email shortly.",
        });

        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"
  ];

  const visitTypes = [
    {
      id: "physical",
      title: "Physical Visit",
      description: "Visit the property in person",
      icon: Home,
      duration: "30-45 mins"
    },
    {
      id: "virtual",
      title: "Virtual Tour",
      description: "Online video tour with agent",
      icon: MessageCircle,
      duration: "15-20 mins"
    },
    {
      id: "group",
      title: "Group Visit",
      description: "Visit with family/friends",
      icon: Users,
      duration: "45-60 mins"
    }
  ];

  const agents = [
    {
      id: 1,
      name: "John Doe",
      rating: 4.9,
      reviews: 127,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
      speciality: "Luxury Properties",
      experience: "8 years",
      phone: "+91 98765 43210"
    },
    {
      id: 2,
      name: "Sarah Wilson",
      rating: 4.8,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=100",
      speciality: "Residential Sales",
      experience: "6 years",
      phone: "+91 87654 32109"
    }
  ];

  const property = {
    title: "Luxury 3BHK Apartment",
    location: "Bandra West, Mumbai",
    price: "₹2,50,00,000",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400"
  };

  const isTimeSlotPast = (timeString: string, date: Date) => {
    if (!date) return false;
    
    const [time, period] = timeString.split(' ');
    const [hours, minutes] = time.split(':');
    let hour24 = parseInt(hours);
    
    if (period === 'PM' && hour24 !== 12) hour24 += 12;
    if (period === 'AM' && hour24 === 12) hour24 = 0;
    
    const slotDateTime = new Date(date);
    slotDateTime.setHours(hour24, parseInt(minutes), 0, 0);
    
    return slotDateTime <= new Date();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-purple-600/5 border-b">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center">
          <h1 className="text-4xl font-bold  mb-2 text-purple-600">Schedule Property Visit</h1>
          <p className="text-muted-foreground text-lg">
            Book a visit to explore your dream property
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Booking Form */}
          <div className="lg:col-span-2">
            <Card className="card-gradient">
              <CardContent className="p-8">
                {/* Step 1: Visit Type */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <CalendarIcon className="h-12 w-12 mx-auto text-primary mb-4 text-purple-600" />
                      <h2 className="text-2xl font-bold">Choose Visit Type</h2>
                      <p className="text-muted-foreground">Select how you'd like to explore the property</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
                      {visitTypes.map((type) => (
                        <div
                          key={type.id}
                          onClick={() => setVisitType(type.id)}
                          className={`p-6 border-2   hover:border-purple-600 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                            visitType === type.id
                              ? 'border-purple-600 bg-purple-600/5'
                              : 'border-muted hover:border-purple-600/50'
                          }`}
                        >
                          <div className="text-center">
                            <type.icon className={`h-8 w-8 mx-auto mb-3 ${
                              visitType === type.id ? 'text-purple-600' : 'text-muted-foreground'
                            }`} />
                            <h3 className="font-semibold mb-2">{type.title}</h3>
                            <p className="text-sm text-muted-foreground mb-3">{type.description}</p>
                            <Badge variant="secondary" className="text-xs">
                              {type.duration}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>

                    {visitType && (
                      <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-5 w-5 text-success" />
                          <span className="font-medium text-success">
                            {visitTypes.find(t => t.id === visitType)?.title} selected
                          </span>
                        </div>
                      </div>
                    )}

                    <Button 
                      onClick={() => setStep(2)} 
                      disabled={!visitType}
                      className="w-full bg-purple-600"
                      size="lg"
                    >
                      Continue to Date & Time
                    </Button>
                  </div>
                )}

                {/* Step 2: Date & Time */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <Clock className="h-12 w-12 mx-auto text-purple-600 mb-4 " />
                      <h2 className="text-2xl font-bold">Select Date & Time</h2>
                      <p className="text-muted-foreground">Choose your preferred visit schedule</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Calendar */}
                      <div>
                        <Label className="text-base font-medium mb-4 block">Select Date</Label>
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={(date) => date < new Date() || date.getDay() === 0}
                          className="rounded-md border w-full "
                        />
                        <p className="text-xs text-muted-foreground mt-2">
                          * Sundays are not available for visits
                        </p>
                      </div>

                      {/* Time Slots */}
                      <div>
                        <Label className="text-base font-medium mb-4 block">Available Time Slots</Label>
                        <div className="grid grid-cols-2 gap-3 max-h-80 overflow-y-auto">
                          {timeSlots.map((time) => {
                            const isPast = selectedDate ? isTimeSlotPast(time, selectedDate) : false;
                            
                            return (
                              <Button
                                key={time}
                                variant={selectedTime === time ? "default" : "outline"}
                                onClick={() => setSelectedTime(time)}
                                disabled={isPast}
                                className={`justify-start ${
                                  selectedTime === time ? 'text-white bg-purple-600 hover:bg-purple-600' : ''
                                } ${isPast ? 'opacity-50' : ''}`}
                              >
                                <Clock className="mr-2 h-4 w-4" />
                                {time} {isPast ? '(Past)' : ''}
                              </Button>
                            );
                          })}
                        </div>

                        {selectedDate && selectedTime && (
                          <div className="mt-6 bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
                            <h4 className="font-medium text-purple-600 mb-2">Selected Schedule</h4>
                            <p className="text-sm">
                              {selectedDate.toDateString()} at {selectedTime}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline" onClick={() => setStep(1)}>
                        Back
                      </Button>
                      <Button 
                        onClick={() => setStep(3)} 
                        disabled={!selectedDate || !selectedTime}
                        className="bg-purple-600 hover:bg-purple-600  "
                      >
                        Continue to Agent Selection
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Agent Selection */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <Users className="h-12 w-12 mx-auto text-primary mb-4 text-purple-600" />
                      <h2 className="text-2xl font-bold">Choose Your Agent</h2>
                      <p className="text-muted-foreground">Select an experienced agent to guide your visit</p>
                    </div>

                    <div className="space-y-4">
                      {agents.map((agent) => (
                        <div
                          key={agent.id}
                          className={`border rounded-lg p-6 hover:shadow-md transition-all cursor-pointer ${
                            selectedAgent === agent.id 
                              ? 'border bg-purple-600/5' 
                              : 'hover:border-purple-600'
                          }`}
                        >
                          <div className="flex items-start space-x-4">
                            <Avatar className="h-16 w-16">
                              <AvatarImage src={agent.image} />
                              <AvatarFallback>{agent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            
                            <div className="flex-1">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h3 className="font-semibold text-lg">{agent.name}</h3>
                                  <p className="text-muted-foreground">{agent.speciality}</p>
                                </div>
                                <div className="text-right">
                                  <div className="flex items-center mb-1">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                                    <span className="font-medium">{agent.rating}</span>
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    {agent.reviews} reviews
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                  <span>Experience: {agent.experience}</span>
                                </div>
                                <div className="flex space-x-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleCall(agent.phone)}
                                  >
                                    <Phone className="h-4 w-4 mr-1" />
                                    Call
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    className={selectedAgent === agent.id ? "text-white bg-purple-600 hover:bg-purple-600" : "text-white bg-purple-600 hover:bg-purple-600"}
                                    onClick={() => handleSelectAgent(agent.id)}
                                  >
                                    {selectedAgent === agent.id ? "Selected" : "Select Agent"}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline" onClick={() => setStep(2)}>
                        Back
                      </Button>
                      <Button 
                        onClick={() => setStep(4)} 
                        disabled={!selectedAgent}
                        className="text-white bg-purple-600 hover:bg-purple-600"
                      >
                        Continue to Details
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 4: Personal Details */}
                {step === 4 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <Users className="h-12 w-12 mx-auto text-primary mb-4 text-purple-600" />
                      <h2 className="text-2xl font-bold">Your Details</h2>
                      <p className="text-muted-foreground">Help us prepare for your visit</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input 
                          id="name" 
                          placeholder="John Doe" 
                          className="mt-2" 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input 
                          id="phone" 
                          type="tel" 
                          placeholder="+91 98765 43210" 
                          className="mt-2" 
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="john@example.com" 
                          className="mt-2" 
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="visitors">Number of Visitors</Label>
                        <Select onValueChange={(value) => setFormData({...formData, visitors: value})}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select count" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">Just me</SelectItem>
                            <SelectItem value="2">2 people</SelectItem>
                            <SelectItem value="3">3 people</SelectItem>
                            <SelectItem value="4">4+ people</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="md:col-span-2">
                        <Label htmlFor="requirements">Special Requirements or Questions</Label>
                        <Textarea
                          id="requirements"
                          placeholder="Any specific areas you'd like to focus on, accessibility needs, or questions about the property..."
                          className="mt-2"
                          value={formData.requirements}
                          onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium">Additional Services</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50">
                          <input 
                            type="checkbox" 
                            className="rounded" 
                            checked={formData.parking}
                            onChange={(e) => setFormData({...formData, parking: e.target.checked})}
                          />
                          <Car className="h-5 w-5 text-purple-600"  />
                          <span>Arrange parking assistance</span>
                        </label>
                        <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50">
                          <input 
                            type="checkbox" 
                            className="rounded" 
                            checked={formData.refreshments}
                            onChange={(e) => setFormData({...formData, refreshments: e.target.checked})}
                          />
                          <Coffee className="h-5 w-5 text-purple-600" />
                          <span>Refreshments during visit</span>
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline" onClick={() => setStep(3)}>
                        Back
                      </Button>
                      <Button onClick={() => setStep(5)} className="text-white bg-purple-600 hover:bg-purple-600">
                        Review Booking
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 5: Confirmation */}
                {step === 5 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <CheckCircle className="h-12 w-12 mx-auto text-success mb-4" />
                      <h2 className="text-2xl font-bold">Confirm Your Visit</h2>
                      <p className="text-muted-foreground">Review your booking details</p>
                    </div>

                    <div className="space-y-6">
                      <Card className="bg-success/5 border-success/20">
                        <CardHeader>
                          <CardTitle className="text-lg">Booking Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Visit Type</p>
                              <p className="font-medium">
                                {visitTypes.find(t => t.id === visitType)?.title}
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Date & Time</p>
                              <p className="font-medium">
                                {selectedDate?.toDateString()} at {selectedTime}
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Agent</p>
                              <p className="font-medium">
                                {agents.find(a => a.id === selectedAgent)?.name}
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Duration</p>
                              <p className="font-medium">
                                {visitTypes.find(t => t.id === visitType)?.duration}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
                          <div>
                            <h4 className="font-medium text-warning">Important Information</h4>
                            <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                              <li>• Please arrive 10 minutes before your scheduled time</li>
                              <li>• Bring a valid government ID for verification</li>
                              <li>• You'll receive SMS and email confirmations</li>
                              <li>• Free rescheduling available up to 2 hours before visit</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <Button variant="outline" onClick={() => setStep(4)}>
                          Back to Edit
                        </Button>
                        <Button 
                          className="text-white bg-purple-600 hover:bg-purple-600 pulse-purple" 
                          onClick={handleBookingConfirm}
                          disabled={isSubmitting}
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          {isSubmitting ? "Booking..." : "Confirm Booking"}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Property Summary */}
            <Card className="card-gradient sticky top-6">
              <CardHeader>
                <CardTitle>Property Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <img 
                    src={property.image} 
                    alt="Property" 
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold">{property.title}</h3>
                    <p className="text-sm text-muted-foreground flex items-center mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      {property.location}
                    </p>
                    <p className="text-lg font-bold text-purple-600 mt-2">{property.price}</p>
                  </div>
                  <Separator />
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>• Professional photography during visit</p>
                    <p>• Detailed property walkthrough</p>
                    <p>• Neighborhood insights and amenities tour</p>
                    <p>• Investment potential discussion</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="text-lg">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  size="sm"
                  onClick={() => handleCall("+91 98765 43210")}
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call Support
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  size="sm"
                  onClick={() => toast({
                    title: "Starting Chat",
                    description: "Connecting you to our support team...",
                  })}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Chat with Us
                </Button>
                <p className="text-xs text-muted-foreground">
                  Available 24/7 to assist with your property visit
                </p>
              </CardContent>
            </Card>

            {/* AI Assistant */}
            <Card className="bg-purple-600/5 border-purple-600/20">
              <CardHeader>
                <CardTitle className="text-lg">🤖 AI Assistant</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="font-medium mb-1">💡 Visit Tip</p>
                    <p className="text-muted-foreground">
                      Best time to visit this property is during morning hours for natural lighting.
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="font-medium mb-1">📊 Market Insight</p>
                    <p className="text-muted-foreground">
                      This area has seen 8% price appreciation in the last year.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookVisit;