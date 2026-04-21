import { useState } from "react"
import { ShoppingCart, Heart, Search, Menu, X, User } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import AuthModal from "../Auth/AuthModel"
import axios from "axios"
const navLinks = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Categories", href: "/categories" },
  { name: "New", href: "/new" },
  { name: "About", href: "/about" },
]

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const user = JSON.parse(localStorage.getItem("user"))


  const handleLogout = async () => {
    await axios.post("http://localhost:4444/auth/logout")
    localStorage.removeItem("user")
    window.location.reload()
}

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      {/* Top Bar */}
      <div className="bg-zinc-900 text-white text-xs text-center py-2">
        🎉 Free shipping on orders over $50 — Limited time offer!
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-zinc-900 tracking-tight">
              Shopy<span className="text-red-500">.</span>
            </Link>
          </div>

          {/* Nav Links - Desktop */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-2">

            {/* Search */}
            {searchOpen ? (
              <div className="flex items-center gap-2 border rounded-full px-3 py-1">
                <Search size={16} className="text-zinc-400" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search products..."
                  className="outline-none text-sm w-40"
                />
                <X
                  size={16}
                  className="text-zinc-400 cursor-pointer"
                  onClick={() => setSearchOpen(false)}
                />
              </div>
            ) : (
              <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)}>
                <Search size={20} />
              </Button>
            )}

            {/* Wishlist */}
            <Button variant="ghost" size="icon" className="relative">
              <Heart size={20} />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]">
                3
              </Badge>
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart size={20} />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]">
                5
              </Badge>
            </Button>

            {/* User */}
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-zinc-700">Hi, {user.name}</span>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Button variant="ghost" size="icon" onClick={() => setAuthOpen(true)}>
                <User size={20} />
              </Button>
            )}

            <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />


            {/* Mobile Menu */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu size={20} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64">
                  <div className="flex flex-col gap-6 mt-8">
                    <a href="/" className="text-2xl font-bold text-zinc-900">
                      Shopy<span className="text-red-500">.</span>
                    </a>
                    <div className="flex flex-col gap-4">
                      {navLinks.map((link) => {
                        // hide New link for buyers and non logged in users
                        if (link.name === "New" && (!user || user.role !== "seller")) return null
                        return (
                          <Link
                            key={link.name}
                            to={link.href}
                            className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
                          >
                            {link.name}
                          </Link>
                        )
                      })}
                    </div>
                    <div className="flex flex-col gap-2 mt-4">
                      <Button variant="outline" className="w-full">Login</Button>
                      <Button className="w-full">Register</Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
