// components/VendorList.tsx
import { getVendors } from "@/lib/actions/actions";
import VendorCard from "./VendorCard";

const VendorList = async () => {
  const vendors = await getVendors();

  return (
    <div className="flex flex-col items-center gap-10 py-8 px-5">
      <p className="text-heading1-bold">Our Vendors</p>
      {!vendors || vendors.length === 0 ? (
        <p className="text-body-bold">No vendors found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vendors.map((vendor: VendorType) => (
            <VendorCard key={vendor._id} vendor={vendor} />
          ))}
        </div>
      )}
    </div>
  );
};

export default VendorList;