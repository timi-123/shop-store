// app/(root)/vendors/[vendorId]/page.tsx
import { getVendorDetails, getVendorProducts, getVendorCollections } from "@/lib/actions/actions";
import { Store, MapPin, Globe, Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";

const VendorDetailPage = async ({ params }: { params: { vendorId: string } }) => {
  const [vendor, products, collections] = await Promise.all([
    getVendorDetails(params.vendorId),
    getVendorProducts(params.vendorId),
    getVendorCollections(params.vendorId),
  ]);

  if (!vendor) {
    return (
      <div className="px-10 py-5">
        <p className="text-heading2-bold">Vendor not found</p>
      </div>
    );
  }

  return (
    <div className="px-10 py-5">
      {/* Vendor Header */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-32 h-32 bg-grey-1 rounded-full flex items-center justify-center">
            <Store className="w-16 h-16 text-grey-2" />
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-heading2-bold mb-2">{vendor.businessName}</h1>
            <p className="text-body-medium text-grey-2 mb-4">
              {vendor.businessDescription || "Welcome to our store!"}
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              {vendor.businessAddress && (
                <div className="flex items-center gap-2 text-small-medium text-grey-2">
                  <MapPin className="w-4 h-4" />
                  <p>{vendor.businessAddress.city}, {vendor.businessAddress.country}</p>
                </div>
              )}
              
              {vendor.socialMedia?.website && (
                <a
                  href={vendor.socialMedia.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-small-medium text-blue-1 hover:underline"
                >
                  <Globe className="w-4 h-4" />
                  <p>Website</p>
                </a>
              )}
              
              {vendor.socialMedia?.facebook && (
                <a
                  href={vendor.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-small-medium text-blue-1 hover:underline"
                >
                  <Facebook className="w-4 h-4" />
                  <p>Facebook</p>
                </a>
              )}
              
              {vendor.socialMedia?.instagram && (
                <a
                  href={vendor.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-small-medium text-blue-1 hover:underline"
                >
                  <Instagram className="w-4 h-4" />
                  <p>Instagram</p>
                </a>
              )}
              
              {vendor.socialMedia?.twitter && (
                <a
                  href={vendor.socialMedia.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-small-medium text-blue-1 hover:underline"
                >
                  <Twitter className="w-4 h-4" />
                  <p>Twitter</p>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Collections */}
      {collections && collections.length > 0 && (
        <div className="mb-10">
          <h2 className="text-heading2-bold mb-6">Collections</h2>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {collections.map((collection: CollectionType) => (
              <Link 
                href={`/vendors/${vendor._id}/collections/${collection._id}`} 
                key={collection._id}
              >
                <Image
                  src={collection.image}
                  alt={collection.title}
                  width={350}
                  height={200}
                  className="rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Products */}
      <div>
        <h2 className="text-heading2-bold mb-6">Products</h2>
        {!products || products.length === 0 ? (
          <p className="text-body-bold">No products available</p>
        ) : (
          <div className="flex flex-wrap justify-center gap-16">
            {products.map((product: ProductType) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorDetailPage;

export const dynamic = "force-dynamic";