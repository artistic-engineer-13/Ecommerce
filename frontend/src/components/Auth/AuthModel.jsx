import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import axios from "axios"


const AuthModal = ({ open, onClose }) => {
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [registerData, setRegisterData] = useState({ name: "", email: "", password: "", role: "buyer"})// default buyer
  const [error, setError] = useState("")

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
  }

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value })
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")
    try {
      const res = await axios.post("http://localhost:4444/auth/login", loginData)
      // localStorage.setItem("token", res.data.token)       //now we are using cookies
      localStorage.setItem("user", JSON.stringify(res.data.user))
      onClose()
      window.location.reload()
    } catch (error) {
      setError("Invalid email or password")
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setError("")
    try {
      const res = await axios.post("http://localhost:4444/auth/register", registerData)
      // localStorage.setItem("token", res.data.token)
      localStorage.setItem("user", JSON.stringify(res.data.user))
      onClose()
      window.location.reload()
    } catch (error) {
      setError("Something went wrong. Try again!")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Welcome to Shopy<span className="text-red-500">.</span>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="login" className="mt-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="flex flex-col gap-4 mt-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={loginData.email}
                  onChange={handleLoginChange}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={loginData.password}
                  onChange={handleLoginChange}
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className="w-full mt-2">
                Login
              </Button>
            </form>
          </TabsContent>

          {/* Register Tab */}
          <TabsContent value="register">
            <form onSubmit={handleRegister} className="flex flex-col gap-4 mt-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="register-name">Name</Label>
                <Input
                  id="register-name"
                  name="name"
                  placeholder="John Doe"
                  value={registerData.name}
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="register-password">Password</Label>
                <Input
                  id="register-password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div className="flex flex-col gap-1.5">
              <Label>I want to</Label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setRegisterData({...registerData, role: 'buyer'})}
                  className={`flex-1 border rounded-lg py-2 text-sm font-medium transition-colors ${
                    registerData.role === 'buyer'
                    ? 'bg-zinc-900 text-white'
                    : 'bg-white text-zinc-600'
                  }`}
                >
                  Buy Products
                </button>
                <button
                  type="button"
                  onClick={() => setRegisterData({...registerData, role: 'seller'})}
                  className={`flex-1 border rounded-lg py-2 text-sm font-medium transition-colors ${
                    registerData.role === 'seller'
                    ? 'bg-zinc-900 text-white'
                    : 'bg-white text-zinc-600'
                  }`}
                >
                  Sell Products
                </button>
              </div>
            </div>
              <Button type="submit" className="w-full mt-2">
                Register
              </Button>
            </form>
          </TabsContent>
        </Tabs>

      </DialogContent>
    </Dialog>
  )
}

export default AuthModal