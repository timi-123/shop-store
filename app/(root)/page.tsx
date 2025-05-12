import Collections from "@/components/Collections";
import ProductList from "@/components/ProductList";
import ApiDebugger from "@/components/debug/ApiDebugger";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Image src="/banner.png" alt="banner" width={2000} height={1000} className="w-screen" />
      <Collections />
      <ProductList />
      {process.env.NODE_ENV === 'development' && <ApiDebugger />}
    </>
  );
}

export const dynamic = "force-dynamic";