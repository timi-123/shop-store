// lib/actions/actions.ts (Store project)
interface AdminProduct {
  _id: string;
  title: string;
  description: string;
  media: string[];
  category: string;
  collections: any[];
  tags: string[];
  price: number;
  expense: number;
  sizes: string[];
  colors: string[];
  vendor: string | VendorType;
  isApproved: boolean;
  stockQuantity: number;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export const getCollections = async () => {
  try {
    console.log('Fetching collections from:', `${process.env.NEXT_PUBLIC_API_URL}/collections`);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collections`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      console.error('Failed to fetch collections:', response.status);
      return [];
    }
    
    const collections = await response.json();
    console.log('Collections fetched:', collections.length);
    return collections;
  } catch (error) {
    console.error('Error fetching collections:', error);
    return [];
  }
};

export const getCollectionDetails = async (collectionId: string) => {
  try {
    console.log('Fetching collection details from:', `${process.env.NEXT_PUBLIC_API_URL}/collections/${collectionId}`);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collections/${collectionId}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      console.error('Failed to fetch collection details:', response.status);
      return null;
    }
    
    const collection = await response.json();
    return collection;
  } catch (error) {
    console.error('Error fetching collection details:', error);
    return null;
  }
};

export const getProducts = async () => {
  try {
    console.log('Fetching products from:', `${process.env.NEXT_PUBLIC_API_URL}/products`);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      console.error('Failed to fetch products:', response.status);
      return [];
    }
    
    const products = await response.json() as AdminProduct[];
    console.log('Products fetched:', products.length);
    
    // Map expense to cost if needed - with explicit typing
    const mappedProducts = products.map((product: AdminProduct) => ({
      ...product,
      cost: product.expense // Map expense to cost field
    }));
    
    return mappedProducts;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const getProductDetails = async (productId: string) => {
  try {
    console.log('Fetching product details from:', `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      console.error('Failed to fetch product details:', response.status);
      return null;
    }
    
    const product = await response.json() as AdminProduct;
    // Map expense to cost if needed
    const mappedProduct = {
      ...product,
      cost: product.expense
    };
    
    return mappedProduct;
  } catch (error) {
    console.error('Error fetching product details:', error);
    return null;
  }
};

export const getSearchedProducts = async (query: string) => {
  try {
    console.log('Searching products with query:', query);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search/${query}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      console.error('Failed to search products:', response.status);
      return [];
    }
    
    const products = await response.json() as AdminProduct[];
    console.log('Search results:', products.length);
    
    // Map expense to cost if needed - with explicit typing
    const mappedProducts = products.map((product: AdminProduct) => ({
      ...product,
      cost: product.expense // Map expense to cost field
    }));
    
    return mappedProducts;
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
};

export const getOrders = async (customerId: string) => {
  try {
    console.log('Fetching orders for customer:', customerId);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/customers/${customerId}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      console.error('Failed to fetch orders:', response.status);
      return [];
    }
    
    const orders = await response.json();
    console.log('Orders fetched:', orders.length);
    return orders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
};

export const getRelatedProducts = async (productId: string) => {
  try {
    console.log('Fetching related products for:', productId);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}/related`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      console.error('Failed to fetch related products:', response.status);
      return [];
    }
    
    const products = await response.json() as AdminProduct[];
    console.log('Related products fetched:', products.length);
    
    // Map expense to cost if needed - with explicit typing
    const mappedProducts = products.map((product: AdminProduct) => ({
      ...product,
      cost: product.expense // Map expense to cost field
    }));
    
    return mappedProducts;
  } catch (error) {
    console.error('Error fetching related products:', error);
    return [];
  }
};

// Vendor specific functions
export const getVendors = async () => {
  try {
    console.log('Fetching vendors from:', `${process.env.NEXT_PUBLIC_API_URL}/vendors/public`);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/vendors/public`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      console.error('Failed to fetch vendors:', response.status);
      return [];
    }
    
    const vendors = await response.json();
    console.log('Vendors fetched:', vendors.length);
    return vendors;
  } catch (error) {
    console.error('Error fetching vendors:', error);
    return [];
  }
};

export const getVendorDetails = async (vendorId: string) => {
  try {
    console.log('Fetching vendor details from:', `${process.env.NEXT_PUBLIC_API_URL}/vendors/public/${vendorId}`);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/vendors/public/${vendorId}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      console.error('Failed to fetch vendor details:', response.status);
      return null;
    }
    
    const vendor = await response.json();
    return vendor;
  } catch (error) {
    console.error('Error fetching vendor details:', error);
    return null;
  }
};

export const getVendorProducts = async (vendorId: string) => {
  try {
    console.log('Fetching vendor products from:', `${process.env.NEXT_PUBLIC_API_URL}/vendors/public/${vendorId}/products`);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/vendors/public/${vendorId}/products`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      console.error('Failed to fetch vendor products:', response.status);
      return [];
    }
    
    const products = await response.json() as AdminProduct[];
    console.log('Vendor products fetched:', products.length);
    
    // Map expense to cost if needed
    const mappedProducts = products.map((product: AdminProduct) => ({
      ...product,
      cost: product.expense
    }));
    
    return mappedProducts;
  } catch (error) {
    console.error('Error fetching vendor products:', error);
    return [];
  }
};

export const getVendorCollections = async (vendorId: string) => {
  try {
    console.log('Fetching vendor collections from:', `${process.env.NEXT_PUBLIC_API_URL}/vendors/public/${vendorId}/collections`);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/vendors/public/${vendorId}/collections`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      console.error('Failed to fetch vendor collections:', response.status);
      return [];
    }
    
    const collections = await response.json();
    console.log('Vendor collections fetched:', collections.length);
    return collections;
  } catch (error) {
    console.error('Error fetching vendor collections:', error);
    return [];
  }
};