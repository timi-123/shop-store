"use client";

import { useState } from 'react';

const ApiDebugger = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  const testConnection = async () => {
    setError(null);
    setResults(null);
    
    try {
      // Test products API
      console.log('Testing products API...');
      const productsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        cache: 'no-store',
      });
      
      if (!productsRes.ok) {
        throw new Error(`Products API failed with status ${productsRes.status}`);
      }
      
      const products = await productsRes.json();
      console.log('Products API response:', products);
      
      // Test collections API
      console.log('Testing collections API...');
      const collectionsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collections`, {
        cache: 'no-store',
      });
      
      if (!collectionsRes.ok) {
        throw new Error(`Collections API failed with status ${collectionsRes.status}`);
      }
      
      const collections = await collectionsRes.json();
      console.log('Collections API response:', collections);
      
      setResults({
        productsCount: products.length,
        collectionsCount: collections.length,
        firstProduct: products.length > 0 ? products[0] : null,
        firstCollection: collections.length > 0 ? collections[0] : null,
      });
    } catch (err: any) { // Add type annotation here
      console.error('API test error:', err);
      setError(err.message);
    }
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {isVisible ? 'Hide Debugger' : 'Show API Debugger'}
      </button>
      
      {isVisible && (
        <div className="bg-white border rounded shadow-lg p-4 mt-2 w-96">
          <h2 className="text-lg font-bold mb-2">API Connection Debugger</h2>
          <p className="mb-2">API URL: {process.env.NEXT_PUBLIC_API_URL}</p>
          
          <button
            onClick={testConnection}
            className="bg-green-500 text-white px-4 py-1 rounded mb-4"
          >
            Test API Connection
          </button>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 p-2 rounded mb-4">
              <p className="font-bold">Error:</p>
              <p>{error}</p>
            </div>
          )}
          
          {results && (
            <div className="bg-green-100 border border-green-400 text-green-700 p-2 rounded">
              <p className="font-bold">Connection successful!</p>
              <p>Products: {results.productsCount}</p>
              <p>Collections: {results.collectionsCount}</p>
              
              {results.productsCount === 0 && (
                <p className="font-bold mt-2 text-orange-500">No products found in database!</p>
              )}
              
              {results.collectionsCount === 0 && (
                <p className="font-bold mt-2 text-orange-500">No collections found in database!</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ApiDebugger;