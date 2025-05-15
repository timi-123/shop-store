// components/VendorCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Store, MapPin, Globe } from "lucide-react";

interface VendorCardProps {
  vendor: VendorType;
}

const VendorCard = ({ vendor }: VendorCardProps) => {
  return (
    <Link
      href={`/vendors/${vendor._id}`}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
    >
      <div className="flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-grey-1 rounded-full flex items-center justify-center mb-4">
          <Store className="w-12 h-12 text-grey-2" />
        </div>
        
        <h3 className="text-heading3-bold mb-2">{vendor.businessName}</h3>
        
        <p className="text-small-medium text-grey-2 mb-4 line-clamp-3">
          {vendor.businessDescription || "Welcome to our store!"}
        </p>
        
        {vendor.businessAddress && (
          <div className="flex items-center gap-2 text-small-medium text-grey-2 mb-2">
            <MapPin className="w-4 h-4" />
            <p>{vendor.businessAddress.city}, {vendor.businessAddress.country}</p>
          </div>
        )}
        
        {vendor.socialMedia?.website && (
          <div className="flex items-center gap-2 text-small-medium text-blue-1">
            <Globe className="w-4 h-4" />
            <p className="truncate">Visit Website</p>
          </div>
        )}
      </div>
    </Link>
  );
};

export default VendorCard;