"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { isValidPhoneNumber, parsePhoneNumber } from "libphonenumber-js";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { X } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
type MobileNumModalProps = {
    isOpen: boolean;
    onClose?: () => void;
    onContinue?: (data: {
        countryCode: string;
        dialCode: string;
        nationalNumber: string;
        fullPhone: string;
    }) => void;
    isLoading?: boolean;
};

// ─── Validation Schema ──────────────────────────────────────────────────────
const validationSchema = Yup.object().shape({
    phone: Yup.string()
        .required("Mobile number is required")
        .test("is-valid-phone", "Enter a valid mobile number", (value) => {
            if (!value) return false;
            return isValidPhoneNumber(value);
        }),
});

// ─── Component ──────────────────────────────────────────────────────────────
const MobileNumModal = ({
    isOpen,
    onClose,
    onContinue,
    isLoading = false,
}: MobileNumModalProps) => {
    const formik = useFormik({
        initialValues: {
            phone: "",
        },
        validationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (values) => {
            if (!values.phone || isLoading) return;

            const parsed = parsePhoneNumber(values.phone);

            onContinue?.({
                countryCode: parsed?.country || "",
                dialCode: `+${parsed?.countryCallingCode}` || "",
                nationalNumber: parsed?.nationalNumber || "",
                fullPhone: values.phone,
            });
        },
    });

    // Reset form when modal closes
    React.useEffect(() => {
        if (!isOpen) {
            formik.resetForm();
        }
    }, [isOpen]);

    // Lock body scroll & handle ESC key
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
                aria-labelledby="mobile-number-title"
                className={`relative z-10 w-full max-w-md overflow-hidden rounded-[28px] border border-border bg-surface shadow-[0_20px_60px_rgba(0,0,0,0.18)] transition-all duration-300 ease-out transform ${
                    animate ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-8"
                }`}
            >
                {/* Header */}
                <div className="flex items-start justify-between px-5 pt-5 sm:px-6 sm:pt-6">
                    <div>
                        {/* <p className="text-sm font-medium text-muted">
                            Login / Signup
                        </p> */}
                        <h2
                            id="mobile-number-title"
                            className=" text-[26px] leading-[1.05] text-foreground sm:text-[30px]"
                        >
                            Enter mobile number
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-muted">
                            We'll send you a one-time verification code.
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
                    className="px-5 pb-5 pt-6 sm:px-6 sm:pb-6"
                >
                    <label
                        htmlFor="phone"
                        className="mb-2 block text-sm font-medium text-foreground"
                    >
                        Mobile Number
                    </label>

                    {/* Phone Input */}
                    <div
                        className={`phone-input-wrapper rounded-2xl border bg-surface transition ${formik.touched.phone && formik.errors.phone
                            ? "border-red-500"
                            : "border-border"
                            }`}
                    >
                        <PhoneInput
                            international
                            countryCallingCodeEditable={false}
                            defaultCountry="IN"
                            value={formik.values.phone}
                            onChange={(value) => formik.setFieldValue("phone", value || "")}
                            onBlur={() => formik.setFieldTouched("phone", true)}
                            className="phone-input-field"
                            numberInputProps={{
                                onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
                                    // Allow: backspace, delete, tab, escape, arrows, select all
                                    const allowedKeys = [
                                        "Backspace",
                                        "Delete",
                                        "Tab",
                                        "Escape",
                                        "ArrowLeft",
                                        "ArrowRight",
                                        "Home",
                                        "End",
                                        "Enter",
                                    ];
                                    if (allowedKeys.includes(e.key)) return;
                                    if ((e.ctrlKey || e.metaKey) && e.key === "a") return;

                                    // Block input if phone is already valid
                                    if (formik.values.phone && isValidPhoneNumber(formik.values.phone)) {
                                        e.preventDefault();
                                    }
                                },
                                onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => {
                                    if (formik.values.phone && isValidPhoneNumber(formik.values.phone)) {
                                        e.preventDefault();
                                    }
                                },
                            }}
                        />
                    </div>

                    {/* Error Message */}
                    {formik.touched.phone && formik.errors.phone && (
                        <p className="mt-2 text-xs text-red-500">{formik.errors.phone}</p>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={!formik.isValid || !formik.dirty || isLoading}
                        className="mt-6 cursor-pointer inline-flex h-14 w-full items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-contrast disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isLoading ? "Sending..." : "Continue"}
                    </button>

                    {/* Terms */}
                    <p className="mt-4 text-center text-[11px] leading-5 text-muted">
                        By continuing, you agree to our{" "}
                        <a href="/terms" className="underline underline-offset-2">
                            Terms of Service
                        </a>{" "}
                        &{" "}
                        <a href="/privacy" className="underline underline-offset-2">
                            Privacy Policy
                        </a>
                    </p>
                </form>
            </div>
        </section>
    );
};

export default MobileNumModal;