"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { X } from "lucide-react";

type ProfileDetailsModalProps = {
  isOpen: boolean;
  onClose?: () => void;
  onSubmitProfile?: (data: { firstname: string; lastname: string; email: string }) => void;
  isLoading?: boolean;
};

const validationSchema = Yup.object().shape({
  firstname: Yup.string()
    .required("First name is required")
    .min(2, "Must be at least 2 characters"),
  lastname: Yup.string()
    .required("Last name is required")
    .min(2, "Must be at least 2 characters"),
  email: Yup.string()
    .required("Email is required")
    .email("Enter a valid email address"),
});

const ProfileDetailsModal = ({
  isOpen,
  onClose,
  onSubmitProfile,
  isLoading = false,
}: ProfileDetailsModalProps) => {
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
    },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      if (isLoading) return;
      onSubmitProfile?.(values);
    },
  });

  React.useEffect(() => {
    if (!isOpen) {
      formik.resetForm();
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  const [shouldRender, setShouldRender] = React.useState(isOpen);
  const [animate, setAnimate] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      const timer = setTimeout(() => setAnimate(true), 10);
      return () => clearTimeout(timer);
    } else {
      setAnimate(false);
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <section className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        className={`absolute inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity duration-300 ease-out ${
          animate ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-title"
        className={`relative z-10 w-full max-w-md overflow-hidden rounded-[28px] border border-border bg-surface shadow-[0_20px_60px_rgba(0,0,0,0.18)] transition-all duration-300 ease-out transform ${
          animate ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-8"
        }`}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-5 pt-5 sm:px-6 sm:pt-6">
          <div>
            <h2
              id="profile-title"
              className="text-[26px] leading-[1.05] text-foreground sm:text-[30px]"
            >
              Complete Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-muted">
              Please enter your details to complete your registration.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="ml-4 cursor-pointer inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-foreground transition hover:border-black"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={formik.handleSubmit}
          noValidate
          className="px-5 pb-5 pt-6 sm:px-6 sm:pb-6 space-y-4"
        >
          {/* First Name */}
          <div>
            <label htmlFor="firstname" className="mb-2 block text-sm font-medium text-foreground">
              First Name
            </label>
            <input
              id="firstname"
              name="firstname"
              type="text"
              value={formik.values.firstname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full h-14 rounded-2xl border px-4 text-sm bg-transparent outline-none transition ${
                formik.touched.firstname && formik.errors.firstname
                  ? "border-red-500"
                  : "border-border focus:border-black"
              }`}
              placeholder="e.g. John"
            />
            {formik.touched.firstname && formik.errors.firstname && (
              <p className="mt-1.5 text-xs text-red-500">{formik.errors.firstname}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastname" className="mb-2 block text-sm font-medium text-foreground">
              Last Name
            </label>
            <input
              id="lastname"
              name="lastname"
              type="text"
              value={formik.values.lastname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full h-14 rounded-2xl border px-4 text-sm bg-transparent outline-none transition ${
                formik.touched.lastname && formik.errors.lastname
                  ? "border-red-500"
                  : "border-border focus:border-black"
              }`}
              placeholder="e.g. Doe"
            />
            {formik.touched.lastname && formik.errors.lastname && (
              <p className="mt-1.5 text-xs text-red-500">{formik.errors.lastname}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full h-14 rounded-2xl border px-4 text-sm bg-transparent outline-none transition ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : "border-border focus:border-black"
              }`}
              placeholder="e.g. john.doe@example.com"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="mt-1.5 text-xs text-red-500">{formik.errors.email}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!formik.isValid || !formik.dirty || isLoading}
            className="mt-6 cursor-pointer inline-flex h-14 w-full items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-contrast disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Saving..." : "Save & Continue"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ProfileDetailsModal;
