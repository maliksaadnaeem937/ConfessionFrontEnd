"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { Mail, Lock, Loader2, ArrowRight } from "lucide-react";

export default function VerifyOtpPage() {
  const [form, setForm] = useState({ email: "", otpCode: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate OTP length
    if (form.otpCode.length !== 6) {
      toast.error("OTP must be 6 digits");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Verifying OTP...", {
      position: "top-center",
    });

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/verify-otp`,
        { ...form },
        { withCredentials: true }
      );

      toast.success("Verification Successful!", {
        id: toastId,
        duration: 3000,
      });
      router.replace("/home");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 p-6 text-center">
          <h2 className="text-2xl font-bold text-white">Verify Your Account</h2>
          <p className="text-blue-100 mt-1">
            Enter the 6-digit code sent to your email
          </p>
        </div>

        {/* Form */}
        <div className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            {/* OTP Field */}
            <div className="space-y-1">
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700"
              >
                Verification Code
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="otp"
                  name="otpCode"
                  placeholder="123456"
                  value={form.otp}
                  onChange={handleChange}
                  required
                  maxLength={6}
                  minLength={6}
                  pattern="\d{6}"
                  inputMode="numeric"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all tracking-widest"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Enter the 6-digit code from your email
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  Verify Account
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>

            {/* Resend OTP Link */}
            <div className="text-center pt-2">
              <p className="text-sm text-gray-600">
                Didn't receive code?{" "}
                <Link
                  href="/resend-otp"
                  className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                >
                  Resend OTP
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
