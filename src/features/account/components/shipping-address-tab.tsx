"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { AddressDrawer, type AddressData } from "./address-drawer";
import type { AddressSchemaType } from "../schemas/account-schemas";
import { apiClient } from "@/lib/api-client";
import { useAuth } from "@/components/providers/auth-context";

interface BackendAddress {
  _id: string;
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export function ShippingAddressTab() {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState<AddressData[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<AddressData | null>(null);

  const fetchAddresses = useCallback(async () => {
    try {
      const res = await apiClient.get<{ status: number; data: BackendAddress[] }>("/addresses");
      if (res.status === 200 && Array.isArray(res.data)) {
        const mapped: AddressData[] = res.data.map((addr: BackendAddress) => {
          const names = addr.fullName.trim().split(" ");
          const firstName = names[0] || "";
          const lastName = names.slice(1).join(" ") || "";
          return {
            id: addr._id,
            isDefault: addr.isDefault,
            firstName,
            lastName,
            address1: addr.addressLine1,
            address2: addr.addressLine2,
            city: addr.city,
            province: addr.state,
            postalCode: addr.postalCode,
            country: addr.country,
            phone: addr.phone,
          };
        });
        setAddresses(mapped);
      }
    } catch (err) {
      console.error("Failed to load addresses:", err);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const res = await apiClient.get<{ status: number; data: BackendAddress[] }>("/addresses");
        if (isMounted && res.status === 200 && Array.isArray(res.data)) {
          const mapped: AddressData[] = res.data.map((addr: BackendAddress) => {
            const names = addr.fullName.trim().split(" ");
            const firstName = names[0] || "";
            const lastName = names.slice(1).join(" ") || "";
            return {
              id: addr._id,
              isDefault: addr.isDefault,
              firstName,
              lastName,
              address1: addr.addressLine1,
              address2: addr.addressLine2,
              city: addr.city,
              province: addr.state,
              postalCode: addr.postalCode,
              country: addr.country,
              phone: addr.phone,
            };
          });
          setAddresses(mapped);
        }
      } catch (err) {
        console.error("Failed to load addresses:", err);
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleOpenAdd = () => {
    setEditingAddress(null);
    setIsDrawerOpen(true);
  };

  const handleOpenEdit = (address: AddressData) => {
    setEditingAddress(address);
    setIsDrawerOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await apiClient.delete<{ status: number; message: string }>(`/addresses/${id}`);
      if (res.status === 200) {
        setAddresses((prev) => prev.filter((a) => a.id !== id));
        toast.success("Address removed successfully");
      }
    } catch (err: unknown) {
      const message = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || "Failed to delete address";
      toast.error(message);
    }
  };

  const handleSaveAddress = async (data: AddressSchemaType, id?: string) => {
    const fullName = `${data.firstName} ${data.lastName}`.trim();
    const payload = {
      fullName,
      phone: data.phone,
      email: user?.email || "customer@verstivo.com",
      addressLine1: data.address1,
      addressLine2: data.address2 || "",
      city: data.city,
      state: data.province,
      postalCode: data.postalCode,
      country: data.country,
      isDefault: Boolean(data.setAsDefault),
    };

    try {
      if (id) {
        const res = await apiClient.put<{ status: number; data: BackendAddress }>(`/addresses/${id}`, payload);
        if (res.status === 200) {
          toast.success("Address updated successfully!");
          await fetchAddresses();
        }
      } else {
        const res = await apiClient.post<{ status: number; data: BackendAddress }>("/addresses", payload);
        if (res.status === 201) {
          toast.success("New address added successfully!");
          await fetchAddresses();
        }
      }
      setIsDrawerOpen(false);
    } catch (err: unknown) {
      const message = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || "Failed to save address";
      toast.error(message);
    }
  };

  return (
    <div className="w-full bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs">
      {/* Card Header with Action Button */}
      <div className="px-5 sm:px-6 py-3.5 sm:py-4 border-b border-slate-100 flex flex-row items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-slate-900 whitespace-nowrap">
          Shipping Address
        </h3>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="text-primary hover:text-primary-hover text-[15px] md:text-[16px] font-semibold flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap"
        >
          <Plus className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5" />
          <span className="sm:hidden">Add</span>
          <span className="hidden sm:inline">Add a new address</span>
        </button>
      </div>

      {/* Card Body */}
      <div className="p-5 sm:p-6">
        {/* Address Cards List: 3-column Grid, Reduced Gap */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2.5">
          {addresses.map((address) => {
            const fullName = `${address.firstName} ${address.lastName}`.trim() || "User Name";
            return (
              <div
                key={address.id}
                className="bg-[#F8F8F8] rounded-2xl p-4 sm:p-4.5 flex flex-col justify-between"
              >
                <div>
                  {address.isDefault && (
                    <h4 className="text-lg xl:text-[22px] font-normal text-black leading-tight mb-4.5">
                      Default
                    </h4>
                  )}

                  {/* Username: 22px font-size, 400 weight, proper black */}
                  <p className="text-base xl:text-lg font-medium text-black leading-tight mb-1.5">
                    {fullName}
                  </p>

                  {/* Address: 18px font-size, proper black */}
                  <div className="text-sm xl:text-base text-black leading-snug space-y-0.5 font-normal">
                    <p>{address.address1}</p>
                    {address.address2 && <p>{address.address2}</p>}
                    <p>{address.city}</p>
                    <p>{address.province}</p>
                    <p>{address.postalCode}</p>
                    <p>{address.country}</p>
                    <p>{address.phone}</p>
                  </div>
                </div>

                {/* Action Buttons (Edit & Delete: 16px font-size, 500 weight, white bg, #D0D0D0 1px border, 2px gap) */}
                <div className="mt-3.5 xl:mt-4.5 flex items-center gap-2 sm:gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(address)}
                    className="min-w-[60px] py-1 py-1.75 px-4 xl:px-4.5 rounded-full bg-white border border-[#D0D0D0] hover:bg-slate-50 text-sm xl:text-[16px] font-medium text-slate-900 flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(address.id!)}
                    className="min-w-[70px] py-1 py-1.75 px-4 xl:px-4.5 rounded-full bg-white border border-[#D0D0D0] hover:bg-slate-50 text-sm xl:text-[16px] font-medium text-slate-900 flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Address Drawer Modal for Add & Edit */}
      <AddressDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSave={handleSaveAddress}
        initialData={editingAddress}
      />
    </div>
  );
}
