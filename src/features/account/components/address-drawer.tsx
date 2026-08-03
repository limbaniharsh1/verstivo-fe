"use client";

import React, { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown } from "lucide-react";
import { addressSchema, type AddressSchemaType } from "../schemas/account-schemas";
import { Drawer } from "@/components/common/Drawer";

export interface AddressData {
  id?: string;
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  country: string;
  province: string;
  postalCode: string;
  phone: string;
  isDefault?: boolean;
}

interface AddressDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: AddressSchemaType, id?: string) => void;
  initialData?: AddressData | null;
}

const PROVINCE_OPTIONS = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry"
];

export function AddressDrawer({ isOpen, onClose, onSave, initialData }: AddressDrawerProps) {
  const isEditing = Boolean(initialData?.id);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<AddressSchemaType>({
    resolver: zodResolver(addressSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      address1: "",
      address2: "",
      city: "",
      country: "India",
      province: "",
      postalCode: "",
      phone: "",
      setAsDefault: false,
    },
  });

  const selectedProvince = useWatch({ control, name: "province" });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        reset({
          firstName: initialData.firstName || "",
          lastName: initialData.lastName || "",
          address1: initialData.address1 || "",
          address2: initialData.address2 || "",
          city: initialData.city || "",
          country: initialData.country || "India",
          province: initialData.province || "Gujarat",
          postalCode: initialData.postalCode || "",
          phone: initialData.phone || "",
          setAsDefault: Boolean(initialData.isDefault),
        });
      } else {
        reset({
          firstName: "",
          lastName: "",
          address1: "",
          address2: "",
          city: "",
          country: "India",
          province: "",
          postalCode: "",
          phone: "",
          setAsDefault: false,
        });
      }
    }
  }, [isOpen, initialData, reset]);

  if (!isOpen) return null;

  const onSubmitForm = (data: AddressSchemaType) => {
    onSave(data, initialData?.id);
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit address" : "Add a new address"}
      position="right"
      headerClassName="h-[68px] sm:h-[72px] shrink-0 border-b border-slate-200 px-6 bg-white"
      bodyClassName="px-6 py-5 flex-1 overflow-y-auto"
      closeButtonAriaLabel="Close address drawer"
      footer={
        <div className="p-6 border-t border-slate-200 bg-white shrink-0 space-y-4">
          <label className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 select-none cursor-pointer">
            <input
              type="checkbox"
              {...register("setAsDefault")}
              className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary cursor-pointer"
            />
            <span>Set as default address</span>
          </label>

          <button
            type="submit"
            form="address-form"
            disabled={isSubmitting}
            className="w-full h-11 sm:h-12 rounded-full bg-primary hover:bg-primary-hover text-white text-sm font-semibold transition-colors shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {isEditing ? "Update Address" : "Add Address"}
          </button>
        </div>
      }
    >
      <form
        id="address-form"
        onSubmit={handleSubmit(onSubmitForm)}
        className="space-y-3.5"
        noValidate
      >
              {/* First Name & Last Name */}
              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <input
                    type="text"
                    placeholder="First Name"
                    {...register("firstName")}
                    className={`w-full h-11 px-4 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all ${
                      errors.firstName
                        ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50/20"
                        : "border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary"
                    }`}
                  />
                  {errors.firstName && (
                    <p className="text-xs text-red-500 mt-1 font-medium">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Last Name"
                    {...register("lastName")}
                    className={`w-full h-11 px-4 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all ${
                      errors.lastName
                        ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50/20"
                        : "border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary"
                    }`}
                  />
                  {errors.lastName && (
                    <p className="text-xs text-red-500 mt-1 font-medium">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Address 1 */}
              <div>
                <input
                  type="text"
                  placeholder="Address 1"
                  {...register("address1")}
                  className={`w-full h-11 px-4 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all ${
                    errors.address1
                      ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50/20"
                      : "border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary"
                  }`}
                />
                {errors.address1 && (
                  <p className="text-xs text-red-500 mt-1 font-medium">
                    {errors.address1.message}
                  </p>
                )}
              </div>

              {/* Address 2 */}
              <div>
                <input
                  type="text"
                  placeholder="Address 2"
                  {...register("address2")}
                  className="w-full h-11 px-4 rounded-xl border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>

              {/* City */}
              <div>
                <input
                  type="text"
                  placeholder="City"
                  {...register("city")}
                  className={`w-full h-11 px-4 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all ${
                    errors.city
                      ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50/20"
                      : "border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary"
                  }`}
                />
                {errors.city && (
                  <p className="text-xs text-red-500 mt-1 font-medium">
                    {errors.city.message}
                  </p>
                )}
              </div>


              {/* Province Select Dropdown */}
              <div>
                <div className="relative">
                  <select
                    {...register("province")}
                    className={`w-full h-11 pl-4 pr-10 rounded-xl border text-sm bg-white appearance-none focus:outline-none transition-all cursor-pointer ${
                      !selectedProvince ? "text-slate-400" : "text-slate-900"
                    } ${
                      errors.province
                        ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50/20"
                        : "border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary"
                    }`}
                  >
                    <option value="" disabled hidden>
                      Province
                    </option>
                    {PROVINCE_OPTIONS.map((p) => (
                      <option key={p} value={p} className="text-slate-900">
                        {p}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                {errors.province && (
                  <p className="text-xs text-red-500 mt-1 font-medium">
                    {errors.province.message}
                  </p>
                )}
              </div>

              {/* Postal/ZIP code */}
              <div>
                <input
                  type="text"
                  placeholder="Postal/ZIP code"
                  {...register("postalCode")}
                  className={`w-full h-11 px-4 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all ${
                    errors.postalCode
                      ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50/20"
                      : "border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary"
                  }`}
                />
                {errors.postalCode && (
                  <p className="text-xs text-red-500 mt-1 font-medium">
                    {errors.postalCode.message}
                  </p>
                )}
              </div>

              {/* +91 Phone (Character entry prohibited, +91 in black text!) */}
              <div>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-sm font-medium text-slate-900 select-none pointer-events-none">
                    +91
                  </span>
                  <input
                    type="tel"
                    placeholder="Phone"
                    {...register("phone", {
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                        e.target.value = e.target.value.replace(/[^0-9]/g, "");
                      },
                    })}
                    className={`w-full h-11 pl-12 pr-4 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all ${
                      errors.phone
                        ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50/20"
                        : "border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary"
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-xs text-red-500 mt-1 font-medium">
                    {errors.phone.message}
                  </p>
                )}
              </div>
      </form>
    </Drawer>
  );
}
