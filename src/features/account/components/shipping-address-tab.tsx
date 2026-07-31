"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { AddressDrawer, type AddressData } from "./address-drawer";
import type { AddressSchemaType } from "../schemas/account-schemas";

export function ShippingAddressTab() {
  const [addresses, setAddresses] = useState<AddressData[]>([
    {
      id: "addr-1",
      isDefault: true,
      firstName: "User",
      lastName: "Name",
      address1: "Katargam Main Road Opp C- Complex, Near Ram Temple, Katargam",
      city: "Surat",
      province: "GJ",
      postalCode: "395004",
      country: "India",
      phone: "+919913240668",
    },
    {
      id: "addr-2",
      isDefault: false,
      firstName: "User",
      lastName: "Name",
      address1: "Katargam Main Road Opp C- Complex, Near Ram Temple, Katargam",
      city: "Surat",
      province: "GJ",
      postalCode: "395004",
      country: "India",
      phone: "+919913240668",
    },
    {
      id: "addr-3",
      isDefault: false,
      firstName: "User",
      lastName: "Name",
      address1: "Katargam Main Road Opp C- Complex, Near Ram Temple, Katargam",
      city: "Surat",
      province: "GJ",
      postalCode: "395004",
      country: "India",
      phone: "+919913240668",
    },
  ]);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<AddressData | null>(null);

  const handleOpenAdd = () => {
    setEditingAddress(null);
    setIsDrawerOpen(true);
  };

  const handleOpenEdit = (address: AddressData) => {
    setEditingAddress(address);
    setIsDrawerOpen(true);
  };

  const handleDelete = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    toast.success("Address removed successfully");
  };

  const handleSaveAddress = (data: AddressSchemaType, id?: string) => {
    if (id) {
      // Update existing address
      setAddresses((prev) =>
        prev.map((addr) => {
          if (addr.id === id) {
            return {
              ...addr,
              firstName: data.firstName,
              lastName: data.lastName,
              address1: data.address1,
              address2: data.address2,
              city: data.city,
              country: data.country,
              province: data.province,
              postalCode: data.postalCode,
              phone: data.phone,
              isDefault: data.setAsDefault ? true : addr.isDefault,
            };
          }
          return data.setAsDefault ? { ...addr, isDefault: false } : addr;
        })
      );
      toast.success("Address updated successfully!");
    } else {
      // Add new address
      const newAddress: AddressData = {
        id: `addr-${Date.now()}`,
        isDefault: Boolean(data.setAsDefault || addresses.length === 0),
        firstName: data.firstName,
        lastName: data.lastName,
        address1: data.address1,
        address2: data.address2,
        city: data.city,
        country: data.country,
        province: data.province,
        postalCode: data.postalCode,
        phone: data.phone,
      };

      setAddresses((prev) => {
        if (data.setAsDefault) {
          return [...prev.map((a) => ({ ...a, isDefault: false })), newAddress];
        }
        return [...prev, newAddress];
      });
      toast.success("New address added successfully!");
    }

    setIsDrawerOpen(false);
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
