import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "@/utils/axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { showSuccessToast, showErrorToast } from "@/utils/toast";
import { Eye, EyeOff, Building2, Users } from "lucide-react";
import OTPModal from "./OTPModal";

const Register = ({ setisLoggeIn, setisregister }) => {
  const navigate = useNavigate();

  const [otpModal, setOtpModal] = useState(false);
  const [userPhone, setUserPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [registerData, setRegisterData] = useState({
    full_name: "",
    email: "",
    phoneNumber: "",
    password: "",
    terms: false,
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !registerData.full_name ||
      !registerData.email ||
      !registerData.password ||
      !registerData.phoneNumber
    ) {
      showErrorToast("Please fill in all required fields.");
      return;
    }

    if (!registerData.terms) {
      showErrorToast("Please agree to the terms and conditions.");
      return;
    }

    const defaultAuth = axios.defaults.headers.common['Authorization'];
    delete axios.defaults.headers.common['Authorization'];

    try {
      await axios.post("http://127.0.0.1:8000/api/register/", {
        full_name: registerData.full_name,
        email: registerData.email,
        phone: registerData.phoneNumber,
        password: registerData.password,
      }, { withCredentials: false });

      setUserPhone(registerData.phoneNumber);
      setOtpModal(true);

      showSuccessToast(
        "Registration initiated! Please check your email and enter the OTP below."
      );

    } catch (error: any) {
      console.error("Registration error:", error);
      let errorMessage = "An unexpected error occurred during registration.";
      if (error.response && error.response.data) {
        // Display the specific validation error from the Django backend
        errorMessage = JSON.stringify(error.response.data);
      } else {
        errorMessage = error.message || errorMessage;
      }
      showErrorToast(errorMessage);
    } finally {
      axios.defaults.headers.common['Authorization'] = defaultAuth;
    }
  };

  const handleOtpSuccess = () => {
    setOtpModal(false);
    showSuccessToast("Account verified successfully! Please log in.");
    navigate("/login");
  };

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center p-4">
      <div className="hero-overlay absolute inset-0" />
      <div className="relative z-10 w-full max-w-md space-y-6">
        <div className="text-center text-white mb-8">
          <Building2 className="mx-auto h-16 w-16 mb-4 animate-pulse" />
          <h1 className="text-4xl font-bold mb-2">RealEstate Pro</h1>
          <p className="text-xl opacity-90">
            Your Property Journey Starts Here
          </p>
        </div>
        <Card className="glass backdrop-blur-xl border-white/20">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
            <CardDescription>
              Sign up to get started with your property journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister}>
              <div className="space-y-4">
                <div className="space-y-2 w-full">
                  <Label htmlFor="fullname">Full Name</Label>
                  <Input
                    id="fullname"
                    placeholder="John Doe"
                    className="bg-white/90 w-full focus:ring-purple-600 focus:border-purple-600"
                    value={registerData.full_name}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        full_name: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="regEmail">Email</Label>
                  <Input
                    id="regEmail"
                    type="email"
                    placeholder="Enter your email"
                    className="bg-white/90 focus:ring-purple-600 focus:border-purple-600"
                    value={registerData.email}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        email: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="bg-white/90 focus:ring-purple-600 focus:border-purple-600"
                    value={registerData.phoneNumber}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        phoneNumber: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="regPassword">Password</Label>
                  <div className="relative">
                    <Input
                      id="regPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      className="bg-white/90 pr-10 focus:ring-purple-600 focus:border-purple-600"
                      value={registerData.password}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          password: e.target.value,
                        })
                      }
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={registerData.terms}
                    onCheckedChange={(checked) =>
                      setRegisterData({ ...registerData, terms: !!checked })
                    }
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the{" "}
                    <Link to="/terms" className="text-purple-600 hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-purple-600 hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
                <Button
                  type="submit"
                  className="w-full btn-hero text-lg py-6 bg-purple-600 hover:bg-purple-700"
                  size="lg"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Create Account
                </Button>
              </div>
            </form>
            <div className="mt-6 text-center">
              <Link to="/login" className="text-sm text-purple-600 hover:underline">
                Already have an account? Sign In
              </Link>
            </div>
          </CardContent>
        </Card>
        <div className="text-center text-white/80 text-sm">
          <Link to="/" className="hover:text-white transition-colors">
            ← Back to Home
          </Link>
        </div>
        {otpModal && <OTPModal phone={userPhone} onSuccess={handleOtpSuccess} onClose={() => setOtpModal(false)} />}
      </div>
    </div>
  );
};

export default Register;