import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { showSuccessToast, showErrorToast } from "@/utils/toast";
import { Eye, EyeOff, Building2, Key, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
import OTPModal from "./OTPModal"; // Make sure to import OTPModal

const Login = ({ setisLoggeIn, setisregister }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  // State for OTP Modal
  const [otpModal, setOtpModal] = useState(false);
  const [userPhone, setUserPhone] = useState("");

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // Clear old user data to prevent using stale roles
    localStorage.removeItem("user");

    if (!loginData.email || !loginData.password) {
      showErrorToast("Please fill in all required fields.");
      return;
    }

    const defaultAuth = axios.defaults.headers.common['Authorization'];
    delete axios.defaults.headers.common['Authorization'];

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login/",
        {
          email: loginData.email,
          password: loginData.password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
        }
      );

      console.log("API Response:", response.data);

      if (response.data.token) {
        localStorage.setItem("access_token", response.data.token);
      } else if (response.data.access) {
        localStorage.setItem("access_token", response.data.access);
      } else if (response.data.access_token) {
        localStorage.setItem("access_token", response.data.access_token);
      }

      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      
      // Clear the phone number from local storage after successful login
      localStorage.removeItem("phoneForVerification");

      const userRole = response.data.user && response.data.user.role ? response.data.user.role.toLowerCase() : null;
      const allowedRoles = ['admin', 'agent', 'owner', 'super_user', 'customer'];

      if (!userRole || !allowedRoles.includes(userRole)) {
        showErrorToast("Your user role is not permitted to access this application.");
        // Do not proceed with login
        return;
      }

      setisLoggeIn(true);

      showSuccessToast("Login successful! Welcome back!");

      setTimeout(() => {
        const userRole = response.data.user?.role.toLowerCase();
        switch (userRole) {
          case 'admin':
            navigate('/admin');
            break;
          case 'agent':
            navigate('/agent');
            break;
          case 'owner':
            navigate('/owner');
            break;
          case 'super_user':
            navigate('/dashboard');
            break;
          default:
            navigate('/dashboard');
            break;
        }
      }, 1000);

    } catch (error: any) {
      console.error("Login error:", error);
      const errorMessage = error.response?.data?.error || "Invalid credentials";
      
      if (errorMessage === "Please verify your phone number via OTP.") {
        const phone = localStorage.getItem("phoneForVerification");
        if (phone) {
          setUserPhone(phone);
          setOtpModal(true);
          showErrorToast(errorMessage);
        } else {
          showErrorToast("Could not find phone number for verification. Please register again.");
        }
      } else {
        showErrorToast(errorMessage);
      }
    } finally {
      axios.defaults.headers.common['Authorization'] = defaultAuth;
    }
  };

  const handleOtpSuccess = () => {
    setOtpModal(false);
    showSuccessToast("Phone verified successfully! Logging you in...");
    // Re-attempt login after successful OTP verification
    handleLogin();
  };

  const handleGoogleLogin = () => {
    showSuccessToast("Redirecting to Google authentication...");
  };

  const handleOTPLogin = () => {
    showSuccessToast("Redirecting to OTP verification...");
  };

  const handleBiometricLogin = () => {
    showSuccessToast("Please authenticate using your biometric data.");
  };

  const handleVoiceLogin = () => {
    showSuccessToast("Voice authentication feature coming soon.");
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
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to access your real estate dashboard
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="bg-white/90 focus:ring-purple-600 focus:border-purple-600"
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="bg-white/90 pr-10 focus:ring-purple-600 focus:border-purple-600"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({
                          ...loginData,
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
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-2 border-purple-600">
                  <Checkbox
                    id="remember"
                    checked={loginData.remember}
                    onCheckedChange={(checked) =>
                      setLoginData({ ...loginData, remember: !!checked })
                    }
                  />
                  <Label htmlFor="remember" className="text-sm">
                    Remember me
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full btn-hero text-lg py-6 bg-purple-600 hover:bg-purple-700"
                  size="lg"
                >
                  <Key className="mr-2 h-5 w-5" />
                  Sign In
                </Button>
              </div>
            </form>

            <div className="text-center mt-4">
              <Link
                to="/register"
                className="text-sm text-purple-600 hover:underline"
              >
                Don't have an account? Sign Up
              </Link>
            </div>

            <div className="text-center mt-2">
              <Link
                to="/forgot-password"
                className="text-sm text-purple-600 hover:underline"
              >
                Forgot your password?
              </Link>
            </div>

            <div className="mt-6 pt-6 border-t border-white/20">
              <div className="text-center text-sm text-muted-foreground mb-4">
                Or continue with
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="bg-white/90 hover:bg-white"
                  onClick={handleGoogleLogin}
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#8B5CF6"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </Button>

                <Button
                  variant="outline"
                  className="bg-white/90 hover:bg-white"
                  onClick={handleOTPLogin}
                >
                  <Smartphone className="mr-2 h-4 w-4" />
                  OTP
                </Button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <div className="text-sm text-muted-foreground">
                Advanced Login Options
              </div>
              <div className="flex justify-center mt-2 space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs"
                  onClick={handleBiometricLogin}
                >
                  🔐 Biometric Login
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs"
                  onClick={handleVoiceLogin}
                >
                  🎤 Voice Login
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-white/80 text-sm">
          <Link to="/" className="hover:text-white transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
      
      {otpModal && (
        <OTPModal
          phone={userPhone}
          onSuccess={handleOtpSuccess}
          onClose={() => setOtpModal(false)}
        />
      )}
    </div>
  );
};

export default Login;
