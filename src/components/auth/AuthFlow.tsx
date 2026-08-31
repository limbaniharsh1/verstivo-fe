"use client";

import React from "react";
import MobileNumModal from "./MobileNumModal";
import OtpModal from "./OtpModal";

const AuthFlow = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [otpOpen, setOtpOpen] = React.useState(false);
  const [phone, setPhone] = React.useState("");
  const [mobileLoading, setMobileLoading] = React.useState(false);
  const [otpLoading, setOtpLoading] = React.useState(false);

  // Step 1: User submits phone number
  const handlePhoneContinue = async (data: {
    countryCode: string;
    dialCode: string;
    nationalNumber: string;
    fullPhone: string;
  }) => {
    setMobileLoading(true);

    try {
      // Call API to send OTP
      // await sendOtp(data.fullPhone);

      setPhone(data.fullPhone);
      setMobileOpen(false);
      setOtpOpen(true);
    } catch (error) {
      console.error(error);
    } finally {
      setMobileLoading(false);
    }
  };

  // Step 2: User submits OTP
  const handleVerify = async (otp: string) => {
    setOtpLoading(true);

    try {
      // Call API to verify OTP
      // await verifyOtp(phone, otp);

      console.log("Verified!", { phone, otp });
      setOtpOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setOtpLoading(false);
    }
  };

  // Resend OTP
  const handleResend = async () => {
    try {
      // await sendOtp(phone);
      console.log("OTP resent to", phone);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="rounded-full bg-primary px-6 py-3 text-primary-contrast"
      >
        Login / Signup
      </button>

      {/* Step 1: Mobile Number */}
      <MobileNumModal
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onContinue={handlePhoneContinue}
        isLoading={mobileLoading}
      />

      {/* Step 2: OTP Verification */}
      <OtpModal
        isOpen={otpOpen}
        onClose={() => setOtpOpen(false)}
        onVerify={handleVerify}
        onResend={handleResend}
        phone={phone}
        isLoading={otpLoading}
        resendCooldown={30}
      />
    </>
  );
};

export default AuthFlow;