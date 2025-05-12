"use client"

import Loader from "@/components/Loader"
import ProductCard from "@/components/ProductCard"
import { getProductDetails } from "@/lib/actions/actions"
import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"

interface UserType {
  clerkId: string;
  wishlist: string[];
  createdAt: string;
  updatedAt: string;
}

const Wishlist = () => {
  const { user } = useUser()

  const [loading, setLoading] = useState(true)
  const [signedInUser, setSignedInUser] = useState<UserType | null>(null)
  const [wishlist, setWishlist] = useState<any[]>([])

  const getUser = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/users")
      const data = await res.json()
      setSignedInUser(data)
      setLoading(false)
    } catch (err) {
      console.log("[users_GET", err)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      getUser()
    }
  }, [user])

  const getWishlistProducts = async () => {
    setLoading(true)

    if (!signedInUser || !signedInUser.wishlist || !Array.isArray(signedInUser.wishlist)) {
      setLoading(false)
      return
    }

    try {
      // Make sure wishlist is an array and has items
      if (signedInUser.wishlist.length === 0) {
        setWishlist([])
        setLoading(false)
        return
      }

      const wishlistProducts = await Promise.all(
        signedInUser.wishlist.map(async (productId) => {
          const res = await getProductDetails(productId)
          return res
        })
      )

      // Filter out any null results
      setWishlist(wishlistProducts.filter(product => product !== null))
      setLoading(false)
    } catch (error) {
      console.error("Error fetching wishlist products:", error)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (signedInUser) {
      getWishlistProducts()
    }
  }, [signedInUser])

  const updateSignedInUser = (updatedUser: UserType) => {
    setSignedInUser(updatedUser)
  }

  if (!user) {
    return (
      <div className="px-10 py-5">
        <p className="text-heading3-bold my-10">Please sign in to view your wishlist</p>
      </div>
    )
  }

  return loading ? <Loader /> : (
    <div className="px-10 py-5">
      <p className="text-heading3-bold my-10">Your Wishlist</p>
      {(!wishlist || wishlist.length === 0) && (
        <p>No items in your wishlist</p>
      )}

      <div className="flex flex-wrap justify-center gap-16">
        {wishlist.map((product) => (
          <ProductCard key={product._id} product={product} updateSignedInUser={updateSignedInUser}/>
        ))}
      </div>
    </div>
  )
}

export const dynamic = "force-dynamic";

export default Wishlist