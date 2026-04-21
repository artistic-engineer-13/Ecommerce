import React from 'react'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const NewProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    img: "",
    price: "",
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("http://localhost:4444/products", formData)
      console.log("Product created:", res.data)
      // reset form
      setFormData({ name: "", desc: "", img: "", price: "" })
      navigate('/');
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-zinc-900 mb-6">Add New Product</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">

        {/* Product Name */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">Product Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="e.g. Nike Air Max"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="desc"
            placeholder="Write product description..."
            value={formData.desc}
            onChange={handleChange}
            rows={4}
          />
        </div>

        {/* Image URL */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="image">Image URL</Label>
          <Input
            id="image"
            name="img"
            placeholder="https://example.com/image.jpg"
            value={formData.img}
            onChange={handleChange}
          />
        </div>

        {/* Price */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="price">Price ($)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            placeholder="e.g. 49.99"
            value={formData.price}
            onChange={handleChange}
          />
        </div>

        <Button type="submit" className="w-full mt-2">
          Add Product
        </Button>

      </form>
    </div>
  )
}

export default NewProduct