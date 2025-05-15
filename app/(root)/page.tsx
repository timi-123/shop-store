// app/(root)/page.tsx (Updated for store)
import VendorList from "@/components/VendorList";
import Collections from "@/components/Collections";
import ProductList from "@/components/ProductList";
import ApiDebugger from "@/components/debug/ApiDebugger";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Image src="/banner.png" alt="banner" width={2000} height={1000} className="w-screen" />
      <VendorList />
      {/* Remove Collections and ProductList from homepage - they'll be in vendor detail page */}
      {process.env.NODE_ENV === 'development' && <ApiDebugger />}
    </>
  );
}

export const dynamic = "force-dynamic";