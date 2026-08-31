"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { X } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
type OtpModalProps = {
    isOpen: boolean;
    onClose?: () => void;
    onVerify?: (otp: string) => void;
    onResend?: () => void;
    phone?: string;
    isLoading?: boolean;
    resendCooldown?: number;
};

// ─── Validation Schema ──────────────────────────────────────────────────────
const validationSchema = Yup.object().shape({
    otp: Yup.string()
        .required("OTP is required")
        .length(4, "Enter all 4 digits"),
});

// ─── Component ──────────────────────────────────────────────────────────────
const OtpModal = ({
    isOpen,
    onClose,
    onVerify,
    onResend,
    phone = "",
    isLoading = false,
    resendCooldown = 30,
}: OtpModalProps) => {
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);
    const [digits, setDigits] = React.useState<string[]>(["", "", "", ""]);
    const [timer, setTimer] = React.useState(resendCooldown);
    const [canResend, setCanResend] = React.useState(false);

    const formik = useFormik({
        initialValues: {
            otp: "",
        },
        validationSchema,
        validateOnChange: true,
        validateOnBlur: false,
        onSubmit: (values) => {
            if (isLoading) return;
            onVerify?.(values.otp);
        },
    });

    // ─── Sync digits to formik ──────────────────────────────────────────────
    const updateOtp = React.useCallback(
        (newDigits: string[]) => {
            setDigits(newDigits);
            formik.setFieldValue("otp", newDigits.join(""));
        },
        [formik]
    );

    // ─── Handle digit input ────────────────────────────────────────────────
    const handleChange = (index: number, value: string) => {
        // Only allow single digit
        const digit = value.replace(/\D/g, "").slice(-1);
        const newDigits = [...digits];
        newDigits[index] = digit;
        updateOtp(newDigits);

        // Auto focus next input
        if (digit && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    // ─── Handle keyboard navigation ────────────────────────────────────────
    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace") {
            e.preventDefault();

            if (digits[index]) {
                // Clear current digit
                const newDigits = [...digits];
                newDigits[index] = "";
                updateOtp(newDigits);
            } else if (index > 0) {
                // Move to previous and clear it
                const newDigits = [...digits];
                newDigits[index - 1] = "";
                updateOtp(newDigits);
                inputRefs.current[index - 1]?.focus();
            }
        }

        if (e.key === "ArrowLeft" && index > 0) {
            e.preventDefault();
            inputRefs.current[index - 1]?.focus();
        }

        if (e.key === "ArrowRight" && index < 3) {
            e.preventDefault();
            inputRefs.current[index + 1]?.focus();
        }
    };

    // ─── Handle paste ──────────────────────────────────────────────────────
    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);

        if (pasted.length === 0) return;

        const newDigits = ["", "", "", ""];
        pasted.split("").forEach((char, i) => {
            if (i < 4) newDigits[i] = char;
        });

        updateOtp(newDigits);

        // Focus last filled or next empty
        const focusIndex = Math.min(pasted.length, 3);
        inputRefs.current[focusIndex]?.focus();
    };

    // ─── Handle focus select ───────────────────────────────────────────────
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.select();
    };

    // ─── Resend timer ──────────────────────────────────────────────────────
    React.useEffect(() => {
        if (!isOpen) return;

        setTimer(resendCooldown);
        setCanResend(false);

        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setCanResend(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isOpen, resendCooldown]);

    // ─── Handle resend ────────────────────────────────────────────────────
    const handleResend = () => {
        if (!canResend || isLoading) return;

        // Reset digits
        const emptyDigits = ["", "", "", ""];
        setDigits(emptyDigits);
        formik.resetForm();

        // Restart timer
        setTimer(resendCooldown);
        setCanResend(false);

        // Focus first input
        inputRefs.current[0]?.focus();

        onResend?.();
    };

    // ─── Reset on close ───────────────────────────────────────────────────
    React.useEffect(() => {
        if (!isOpen) {
            setDigits(["", "", "", ""]);
            formik.resetForm();
        }
    }, [isOpen]);

    // ─── Auto focus first input on open ───────────────────────────────────
    React.useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                inputRefs.current[0]?.focus();
            }, 100);
        }
    }, [isOpen]);

    // ─── Lock body scroll & ESC key ───────────────────────────────────────
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

    // ─── Auto submit when all digits filled ───────────────────────────────
    React.useEffect(() => {
        const otp = digits.join("");
        if (otp.length === 4 && digits.every((d) => d !== "")) {
            formik.setFieldTouched("otp", true);
            // Small delay so user sees the last digit fill
            setTimeout(() => {
                formik.submitForm();
            }, 200);
        }
    }, [digits]);

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

    // Format timer
    const formatTimer = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, "0")}`;
    };

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
                aria-labelledby="otp-title"
                className={`relative z-10 w-full max-w-md overflow-hidden rounded-[28px] border border-border bg-surface shadow-[0_20px_60px_rgba(0,0,0,0.18)] transition-all duration-300 ease-out transform ${
                    animate ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-8"
                }`}
            >
                {/* Header */}
                <div className="flex items-start justify-between px-5 pt-5 sm:px-6 sm:pt-6">
                    <div>
                        <h2
                            id="otp-title"
                            className="text-xl font-medium leading-[1.05] text-foreground sm:text-[28px]"
                        >
                            Verify your number
                        </h2>
                        <p className="mt-2 text-sm text-muted">
                            Enter the 4-digit code sent to{" "}
                            {phone ? (
                                <span className="font-medium text-foreground">{phone}</span>
                            ) : (
                                "your mobile"
                            )}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="ml-4 inline-flex h-9 sm:h-10 w-9 sm:w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border bg-surface text-foreground transition hover:border-black"
                    >
                        <X className=" w-4 h-4 sm:w-4.5 sm:h-4.5" />
                    </button>
                </div>

                {/* Form */}
                <form
                    onSubmit={formik.handleSubmit}
                    noValidate
                    className="px-5 pb-5 pt-6 sm:pt-7.5 sm:px-6 sm:pb-6"
                >
                    {/* OTP Inputs */}
                    <div className="flex items-center justify-center gap-3 sm:gap-4">
                        {digits.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => {
                                    inputRefs.current[index] = el;
                                }}
                                type="text"
                                inputMode="numeric"
                                autoComplete="one-time-code"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={index === 0 ? handlePaste : undefined}
                                onFocus={handleFocus}
                                aria-label={`Digit ${index + 1}`}
                                className={`h-13 w-13 rounded-2xl border bg-surface text-center text-2xl font-semibold text-foreground caret-primary transition-all sm:h-14 sm:w-14 text-base sm:text-lg ${digit
                                    ? "border-primary"
                                    : formik.touched.otp && formik.errors.otp
                                        ? "border-red-500"
                                        : "border-border"
                                    } focus:border-primary`}
                            />
                        ))}
                    </div>

                    {/* Error */}
                    {formik.touched.otp && formik.errors.otp && (
                        <p className="mt-3 text-center text-xs text-red-500">
                            {formik.errors.otp}
                        </p>
                    )}

                    {/* Resend */}
                    <div className="mt-5 flex items-center justify-center gap-1 text-sm">
                        <span className="text-muted">Didn't receive it?</span>
                        {canResend ? (
                            <button
                                type="button"
                                onClick={handleResend}
                                disabled={isLoading}
                                className="cursor-pointer font-medium text-primary underline underline-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Resend Code
                            </button>
                        ) : (
                            <span className="font-medium text-foreground">
                                Resend in {formatTimer(timer)}
                            </span>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={!formik.isValid || !formik.dirty || isLoading}
                        className="mt-6 sm:mt-7 inline-flex h-13 sm:h-14 w-full items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-contrast disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isLoading ? "Verifying..." : "Verify & Continue"}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default OtpModal;