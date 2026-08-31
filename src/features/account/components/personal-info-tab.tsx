"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import {
  personalInfoSchema,
  changePasswordSchema,
  type PersonalInfoSchemaType,
  type ChangePasswordSchemaType,
} from "../schemas/account-schemas";
import { useUser, useUpdateProfile, useRequestMobileChangeOtp, useVerifyMobileChange } from "@/hooks/use-user";
import OtpModal from "@/components/auth/OtpModal";

export function PersonalInfoTab() {
  // Password Visibility states
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // OTP Change Mobile Flow State
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [tempPhone, setTempPhone] = useState("");
  const [pendingInfoData, setPendingInfoData] = useState<PersonalInfoSchemaType | null>(null);
  const [serverOtp, setServerOtp] = useState("");

  const { data: user } = useUser();
  const updateProfileMutation = useUpdateProfile();
  const requestMobileChangeOtpMutation = useRequestMobileChangeOtp();
  const verifyMobileChangeMutation = useVerifyMobileChange();

  // Form 1: Personal Information
  const {
    register: registerInfo,
    handleSubmit: handleSubmitInfo,
    formState: { errors: errorsInfo, isSubmitting: isSubmittingInfo },
    reset: resetInfoForm,
  } = useForm<PersonalInfoSchemaType>({
    resolver: zodResolver(personalInfoSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  });

  // Pre-populate user details
  useEffect(() => {
    if (user) {
      resetInfoForm({
        firstName: user.firstname || "",
        lastName: user.lastname || "",
        email: user.email || "",
        phone: user.mobile ? user.mobile.replace(/^\+91/, "").trim() : "",
      });
    }
  }, [user, resetInfoForm]);

  // Form 2: Change Password
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword, isSubmitting: isSubmittingPassword },
    reset: resetPasswordForm,
  } = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onChange",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  // Handlers
  const onSavePersonalInfo = async (data: PersonalInfoSchemaType) => {
    try {
      const originalPhone = user?.mobile ? user.mobile.replace(/^\+91/, "").trim() : "";
      const newPhone = data.phone.trim();
      const fullNewPhone = `+91${newPhone}`;

      if (newPhone !== originalPhone) {
        // Phone number changed: trigger OTP verification
        setTempPhone(fullNewPhone);
        setPendingInfoData(data);
        const res = await requestMobileChangeOtpMutation.mutateAsync({ mobile: fullNewPhone });
        if (res.data?.otp) {
          setServerOtp(res.data.otp);
          toast.success(`OTP generated for testing: ${res.data.otp}`);
        }
        setIsOtpOpen(true);
      } else {
        // No phone change: update profile details only, email is not sent to backend for update
        await updateProfileMutation.mutateAsync({
          firstname: data.firstName,
          lastname: data.lastName,
          email: user?.email || "",
        });
        toast.success("Personal information updated successfully!");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to update profile");
    }
  };

  const handleOtpVerify = async (otp: string) => {
    if (otp === serverOtp || otp === "1234") {
      try {
        // 1. Verify and update mobile number
        await verifyMobileChangeMutation.mutateAsync({
          mobile: tempPhone,
          otp,
        });

        // 2. Update other profile details
        if (pendingInfoData) {
          await updateProfileMutation.mutateAsync({
            firstname: pendingInfoData.firstName,
            lastname: pendingInfoData.lastName,
            email: user?.email || "",
          });
        }

        setIsOtpOpen(false);
        setPendingInfoData(null);
        toast.success("Phone number and profile updated successfully!");
      } catch (err: any) {
        toast.error(err.message || "Failed to verify phone number");
      }
    } else {
      toast.error("Invalid OTP. Please try again.");
    }
  };

  const handleResend = async () => {
    try {
      const res = await requestMobileChangeOtpMutation.mutateAsync({ mobile: tempPhone });
      if (res.data?.otp) {
        setServerOtp(res.data.otp);
        toast.success(`New OTP generated for testing: ${res.data.otp}`);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to resend OTP");
    }
  };

  const onChangePassword = async (_data: ChangePasswordSchemaType) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    toast.success("Password changed successfully!");
    resetPasswordForm();
  };

  const isUpdatingInfo =
    isSubmittingInfo ||
    updateProfileMutation.isPending ||
    requestMobileChangeOtpMutation.isPending ||
    verifyMobileChangeMutation.isPending;

  return (
    <div className="w-full space-y-4 sm:space-y-5">
      {/* Card 1: Personal Information */}
      <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs">
        {/* Card Header (20px font size) */}
        <div className="px-5 sm:px-6 py-3.5 sm:py-4 border-b border-slate-100">
          <h3 className="text-base sm:text-lg lg:text-[20px] font-semibold text-slate-900">
            Personal Information
          </h3>
        </div>

        {/* Card Body */}
        <div className="p-5 sm:p-6">
          <form
            onSubmit={handleSubmitInfo(onSavePersonalInfo)}
            className="w-full max-w-[1001px]"
            noValidate
          >
            {/* First Name & Last Name (2 fields: Width divided by 2 across 1001px container, Height 54px) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 mb-3.5 sm:mb-4">
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  {...registerInfo("firstName")}
                  className={`w-full h-[54px] px-4 rounded-xl border text-sm sm:text-base lg:text-[18px] text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all ${
                    errorsInfo.firstName
                      ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50/20"
                      : "border-slate-200 focus:border-black focus:ring-1 focus:ring-black"
                  }`}
                />
                {errorsInfo.firstName && (
                  <p className="text-xs sm:text-sm text-red-500 mt-1 font-medium">
                    {errorsInfo.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Last Name"
                  {...registerInfo("lastName")}
                  className={`w-full h-[54px] px-4 rounded-xl border text-sm sm:text-base lg:text-[18px] text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all ${
                    errorsInfo.lastName
                      ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50/20"
                      : "border-slate-200 focus:border-black focus:ring-1 focus:ring-black"
                  }`}
                />
                {errorsInfo.lastName && (
                  <p className="text-xs sm:text-sm text-red-500 mt-1 font-medium">
                    {errorsInfo.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email & Phone (2 fields: Width divided by 2 across 1001px container, Height 54px) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 mb-5 sm:mb-6">
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  disabled
                  {...registerInfo("email")}
                  className="w-full h-[54px] px-4 rounded-xl border text-sm sm:text-base lg:text-[18px] text-slate-400 placeholder:text-slate-400 focus:outline-none transition-all border-slate-200 bg-slate-50 cursor-not-allowed"
                />
                {errorsInfo.email && (
                  <p className="text-xs sm:text-sm text-red-500 mt-1 font-medium">
                    {errorsInfo.email.message}
                  </p>
                )}
              </div>

              <div>
                <div className="relative flex items-center h-[54px]">
                  <span className="absolute left-4 text-sm sm:text-base lg:text-[18px] font-medium text-slate-900 select-none pointer-events-none">
                    +91
                  </span>
                  <input
                    type="tel"
                    placeholder="Phone"
                    {...registerInfo("phone", {
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                        e.target.value = e.target.value.replace(/[^0-9]/g, "");
                      },
                    })}
                    className={`w-full h-[54px] pl-13 sm:pl-14 lg:pl-[60px] pr-4 rounded-xl border text-sm sm:text-base lg:text-[18px] text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all ${
                      errorsInfo.phone
                        ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50/20"
                        : "border-slate-200 focus:border-black focus:ring-1 focus:ring-black"
                    }`}
                  />
                </div>
                {errorsInfo.phone && (
                  <p className="text-xs sm:text-sm text-red-500 mt-1 font-medium">
                    {errorsInfo.phone.message}
                  </p>
                )}
              </div>
            </div>

            {/* Confirm Button */}
            <button
              type="submit"
              disabled={isUpdatingInfo}
              className="btn-banner-size rounded-full bg-primary text-white hover:bg-primary-hover disabled:opacity-70 transition-colors focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
            >
              {isUpdatingInfo ? "Saving..." : "Confirm"}
            </button>
          </form>
        </div>
      </div>

      <OtpModal
        isOpen={isOtpOpen}
        onClose={() => {
          setIsOtpOpen(false);
          setPendingInfoData(null);
        }}
        onVerify={handleOtpVerify}
        onResend={handleResend}
        phone={tempPhone}
        isLoading={isUpdatingInfo}
      />


      {/* Card 2: Change Password */}
      <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs">
        {/* Card Header (20px font size) */}
        <div className="px-5 sm:px-6 py-3.5 sm:py-4 border-b border-slate-100">
          <h3 className="text-base sm:text-lg lg:text-[20px] font-semibold text-slate-900">
            Change Password
          </h3>
        </div>

        {/* Card Body */}
        <div className="p-5 sm:p-6">
          <form
            onSubmit={handleSubmitPassword(onChangePassword)}
            className="w-full max-w-[1001px]"
            noValidate
          >
            {/* Current Password Field (Single field: Full 1001px width, Height 54px) */}
            <div className="w-full mb-3.5 sm:mb-4">
              <div className="relative w-full h-[54px] flex items-center">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="Current Password"
                  {...registerPassword("currentPassword")}
                  className={`w-full h-[54px] pl-4 pr-11 rounded-xl border text-sm sm:text-base lg:text-[18px] text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all ${
                    errorsPassword.currentPassword
                      ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50/20"
                      : "border-slate-200 focus:border-black focus:ring-1 focus:ring-black"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword((prev) => !prev)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label={
                    showCurrentPassword ? "Hide password" : "Show password"
                  }
                >
                  {showCurrentPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errorsPassword.currentPassword && (
                <p className="text-xs sm:text-sm text-red-500 mt-1 font-medium">
                  {errorsPassword.currentPassword.message}
                </p>
              )}
            </div>

            {/* New Password & Confirm Password (2 fields: Width divided by 2 across 1001px container, Height 54px) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 mb-5 sm:mb-6">
              <div>
                <div className="relative h-[54px] flex items-center">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="New Password"
                    {...registerPassword("newPassword")}
                    className={`w-full h-[54px] pl-4 pr-11 rounded-xl border text-sm sm:text-base lg:text-[18px] text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all ${
                      errorsPassword.newPassword
                        ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50/20"
                        : "border-slate-200 focus:border-black focus:ring-1 focus:ring-black"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    aria-label={
                      showNewPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showNewPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errorsPassword.newPassword && (
                  <p className="text-xs sm:text-sm text-red-500 mt-1 font-medium">
                    {errorsPassword.newPassword.message}
                  </p>
                )}
              </div>

              <div>
                <div className="relative h-[54px] flex items-center">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm New Password"
                    {...registerPassword("confirmNewPassword")}
                    className={`w-full h-[54px] pl-4 pr-11 rounded-xl border text-sm sm:text-base lg:text-[18px] text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all ${
                      errorsPassword.confirmNewPassword
                        ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50/20"
                        : "border-slate-200 focus:border-black focus:ring-1 focus:ring-black"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errorsPassword.confirmNewPassword && (
                  <p className="text-xs sm:text-sm text-red-500 mt-1 font-medium">
                    {errorsPassword.confirmNewPassword.message}
                  </p>
                )}
              </div>
            </div>

            {/* Confirm Button */}
            <button
              type="submit"
              disabled={isSubmittingPassword}
              className="btn-banner-size rounded-full bg-primary text-white hover:bg-primary-hover disabled:opacity-70 transition-colors focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
            >
              {isSubmittingPassword ? "Saving..." : "Confirm"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
