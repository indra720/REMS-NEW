import { useState } from "react";
import axios from "@/utils/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { showErrorToast, showSuccessToast } from "@/utils/toast";

export default function OTPModal({ phone, onSuccess, onClose }) {
  const [otp, setOtp] = useState("");

  const handleVerifyOtp = async () => {
    console.log("Verifying OTP for phone:", phone, "with OTP:", otp);
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/verify-otp/", { phone, otp }, { withCredentials: false });
      showSuccessToast(res.data.message);
      onSuccess();
    } catch (err) {
      showErrorToast("Invalid OTP, try again.");
      console.error("OTP Error:", err.response?.data);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-bold mb-4">Verify Phone</h2>
        <Input
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
        />
        <Button onClick={handleVerifyOtp} className="mt-4 w-full">Verify OTP</Button>
        <Button onClick={onClose} className="mt-2 w-full" variant="ghost">Cancel</Button>
      </div>
    </div>
  );
}
