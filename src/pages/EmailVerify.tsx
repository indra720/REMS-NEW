import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { CheckCircle, XCircle, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

const EmailVerify = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyEmail = async () => {
      if (!slug) {
        setError("No verification token found.");
        setLoading(false);
        return;
      }

      try {
        // The backend should handle the verification and user activation
        await axios.post(`http://127.0.0.1:8000/api/verify-email/`, { token: slug });
        setLoading(false);
      } catch (err: any) {
        setError(err.response?.data?.detail || "Invalid or expired verification link.");
        setLoading(false);
      }
    };

    verifyEmail();
  }, [slug]);

  const renderContent = () => {
    if (loading) {
      return (
        <>
          <Loader className="animate-spin h-12 w-12 text-purple-600" />
          <h1 className="text-2xl font-bold mt-4">Verifying your email...</h1>
          <p className="text-muted-foreground">Please wait a moment.</p>
        </>
      );
    }

    if (error) {
      return (
        <>
          <XCircle className="h-12 w-12 text-red-500" />
          <h1 className="text-2xl font-bold mt-4">Verification Failed</h1>
          <p className="text-muted-foreground">{error}</p>
          <Link to="/login">
            <Button className="mt-6">Go to Login</Button>
          </Link>
        </>
      );
    }

    return (
      <>
        <CheckCircle className="h-12 w-12 text-green-500" />
        <h1 className="text-2xl font-bold mt-4">Your email verification is successful</h1>
        <p className="text-muted-foreground mt-2">
          Welcome to Real Estate, for choosing your dream properties: house, villa, apartment.
        </p>
        <Link to="/login">
          <Button className="mt-6">Proceed to Login</Button>
        </Link>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        {renderContent()}
      </div>
    </div>
  );
};

export default EmailVerify;