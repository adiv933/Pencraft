import type { SignupType } from "@adiv933/medium-common"
import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from '../config'

export default function Signup() {
  const [formData, setFormData] = useState<SignupType>({ name: "", email: "", password: "" })
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/user/signup`, formData);
      const { token } = response.data;
      localStorage.setItem("token", token);
      navigate("/posts");
    } catch (e) {
      alert("Error while signing up")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-neutral-50">
      <div className="w-full max-w-md space-y-10">
        <div className="text-center">
          <h1 className="text-4xl font-light text-neutral-900 tracking-tight">Pencraft</h1>
          <p className="text-neutral-500 text-base mt-2">Join our writing community.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-400"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-400"
            required
          />
          <button type="submit" className="w-full py-2 px-4 bg-neutral-800 text-white rounded-lg hover:bg-black transition">
            Sign up
          </button>
        </form>

        <div className="text-center text-sm text-neutral-500">
          Already have an account?{' '}
          <Link to="/signin" className="text-neutral-800 hover:underline">Sign in</Link>
        </div>

        <div className="text-center text-xs text-neutral-400">
          By signing up, you agree to our Terms of Service and Privacy Policy.
        </div>
      </div>
    </div>
  )
}
