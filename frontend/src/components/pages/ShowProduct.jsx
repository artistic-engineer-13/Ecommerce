import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Heart, ShoppingCart, Star, Minus, Plus,Trash2,Pencil} from "lucide-react"
import { useNavigate } from "react-router-dom"
// Imports for Editing on the same page...
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { X, Check } from "lucide-react"

const ShowProduct = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [wishlist, setWishlist] = useState(false)
  const [reviewText, setReviewText] = useState("")
  const [rating, setRating] = useState(0)
  const [hoveredStar, setHoveredStar] = useState(0)
  const [reviews, setReviews] = useState([
    { id: 1, user: "John D.", rating: 5, comment: "Amazing product! Highly recommend.", date: "Feb 2025" },
    { id: 2, user: "Sarah M.", rating: 4, comment: "Great quality, fast delivery.", date: "Jan 2025" },
  ])
//   States to handle Editing on the same page...
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    img: "",
    price: "",
    })
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    axios.get(`http://localhost:4444/products/${id}`)
      .then(res => {
        setProduct(res.data)
        setFormData({          // ADD THIS
            name: res.data.name,
            desc: res.data.desc,
            img: res.data.img,
            price: res.data.price,
        })
        })
      .catch(err => console.log(err))
  }, [id])

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4444/products/${id}`)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSave = async () => {
    try {
        const res = await axios.put(`http://localhost:4444/products/${id}`, formData)
        setProduct(res.data)
        setIsEditing(false)
    } catch (error) {
        console.log(error)
    }
    }

    const handleCancel = () => {
    setFormData({
        name: product.name,
        desc: product.desc,
        img: product.img,
        price: product.price,
    })
    setIsEditing(false)
    }

  const handleReviewSubmit = (e) => {
    e.preventDefault()
    if (!reviewText || rating === 0) return
    const newReview = {
      id: reviews.length + 1,
      user: "You",
      rating,
      comment: reviewText,
      date: "Mar 2025"
    }
    setReviews([...reviews, newReview])
    setReviewText("")
    setRating(0)
  }

  if (!product) return (
    <div className="flex items-center justify-center h-96 text-zinc-400">
      Loading...
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* Product Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Left — Image */}
        <div className="rounded-2xl overflow-hidden bg-zinc-100 aspect-square">
          <img
            src={product.img}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right — Details */}
        <div className="flex flex-col gap-4">

          {/* Name */}
          {isEditing ? (
            <Input name="name" value={formData.name} onChange={handleChange} />
            ) : (
            <h1 className="text-3xl font-bold text-zinc-900">{product.name}</h1>
            )}

          {/* Price */}
          {isEditing ? (
            <Input name="price" type="number" value={formData.price} onChange={handleChange} className="w-32" />
            ) : (
            <p className="text-2xl font-semibold text-zinc-800">${product.price}</p>
            )}

          <Separator />

          {/* Description */}
          {isEditing ? (
            <Textarea name="desc" value={formData.desc} onChange={handleChange} rows={4} />
            ) : (
            <p className="text-zinc-500 text-sm leading-relaxed">{product.desc}</p>
            )}

          <Separator />

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-zinc-700">Quantity</span>
            <div className="flex items-center gap-3 border rounded-full px-3 py-1">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="text-zinc-500 hover:text-zinc-900 transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="text-sm font-semibold w-4 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="text-zinc-500 hover:text-zinc-900 transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-2">
            {isEditing ? (
                <>
                <Button onClick={handleSave} className="flex-1 gap-2">
                    <Check size={18} />
                    Save Changes
                </Button>
                <Button onClick={handleCancel} variant="outline" className="flex-1 gap-2">
                    <X size={18} />
                    Cancel
                </Button>
                </>
            ) : (
                <>
                <Button className="flex-1 gap-2">
                    <ShoppingCart size={18} />
                    Add to Cart
                </Button>
                <Button variant="outline" size="icon" onClick={() => setWishlist(!wishlist)} className="shrink-0">
                    <Heart size={18} className={wishlist ? "fill-red-500 text-red-500" : "text-zinc-500"} />
                </Button>
                {user && user.role === 'seller' && product.createdBy === user.id && (
                  <>
                    <Button variant="destructive" onClick={handleDelete} className="gap-2">
                        <Trash2 size={18} />
                        Delete
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(true)} className="gap-2">
                        <Pencil size={18} />
                        Edit
                    </Button>
                  </>
                )}
                </>
            )}
            </div>

        </div>
      </div>

      <Separator className="my-10" />

      {/* Reviews Section */}
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-zinc-900">Reviews</h2>

        {/* Existing Reviews */}
        <div className="flex flex-col gap-4">
          {reviews.map((review) => (
            <div key={review.id} className="border rounded-xl p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-zinc-900 text-sm">{review.user}</span>
                <span className="text-xs text-zinc-400">{review.date}</span>
              </div>
              {/* Stars */}
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={14}
                    className={star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-zinc-300"}
                  />
                ))}
              </div>
              <p className="text-zinc-500 text-sm">{review.comment}</p>
            </div>
          ))}
        </div>

        <Separator />

        {/* Write a Review */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-zinc-900">Write a Review</h3>

          {/* Star Rating Picker */}
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={24}
                className={`cursor-pointer transition-colors ${
                  star <= (hoveredStar || rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-zinc-300"
                }`}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
                onClick={() => setRating(star)}
              />
            ))}
          </div>

          {/* Review Text */}
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Share your thoughts about this product..."
            rows={4}
            className="w-full border rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900 resize-none text-zinc-700"
          />

          <Button onClick={handleReviewSubmit} className="w-fit">
            Submit Review
          </Button>
        </div>
      </div>

    </div>
  )
}

export default ShowProduct