import React from 'react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Heart } from "lucide-react"
import { useNavigate } from "react-router-dom"


const Product = ({ item }) => {

  const navigate = useNavigate()

  return (
    <Card onClick={() => navigate(`/products/${item._id}`)} className="group overflow-hidden rounded-xl border hover:shadow-lg transition-shadow duration-300">
      
      {/* Product Image */}
      <div className="relative overflow-hidden aspect-square bg-zinc-100">
        <img
          src={item.img}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Wishlist Button */}
        <button className="absolute top-3 right-3 bg-white p-1.5 rounded-full shadow hover:scale-110 transition-transform">
          <Heart size={16} className="text-zinc-500" />
        </button>
      </div>

      {/* Card Content */}
      <CardContent className="p-4">
        <h3 className="font-semibold text-zinc-900 text-sm truncate">{item.name}</h3>
        <p className="text-zinc-500 text-xs mt-1 line-clamp-2">{item.desc}</p>
        <p className="text-zinc-900 font-bold mt-2">${item.price}</p>
      </CardContent>

      {/* Card Footer */}
      <CardFooter className="p-4 pt-0">
        <Button className="w-full gap-2">
          <ShoppingCart size={16} />
          Add to Cart
        </Button>
      </CardFooter>

    </Card>
  )
}

export default Product