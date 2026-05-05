import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import AuthLayout from './AuthLayout'
import InputField from '../../components/ui/InputField'
import Button from '../../components/ui/Button'
import SocialButton from '../../components/ui/SocialButton'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
    const [showPw, setShowPw]   = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState("")
  const handle = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }))

const handleSubmit = async (e) => {
  e.preventDefault()
  if(!form.email.trim() || form.password){ setError("Please fill in all fields"); return }
  setLoading(true)
  try{
    
  }
}

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col">
        <h2 className="text-3xl font-bold tracking-tight text-[#1E293B] mb-1">Welcome back</h2>
        <p className="text-sm text-[#64748B] mb-7">Sign in to your DiaCare account</p>

        <InputField label="Email"    type="email"    placeholder="doctor@diacare.com" value={form.email}    onChange={handle('email')}    autoComplete="email" />
        <InputField label="Password" type="password" placeholder="••••••••"           value={form.password} onChange={handle('password')} autoComplete="current-password" />

        <div className="text-right mb-5">
          <a href="#" className="text-xs font-medium text-[#0A4174] hover:underline">Forgot password?</a>
        </div>

        <Button type="submit" full>Sign In</Button>

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-[#E2E8F0]" />
          <span className="text-xs text-[#94A3B8] font-medium">or sign in with</span>
          <div className="flex-1 h-px bg-[#E2E8F0]" />
        </div>

        <div className="flex gap-2">
          <SocialButton provider="google" onClick={() => toast.info('Google sign-in coming soon')} />
          <SocialButton provider="apple"  onClick={() => toast.info('Apple sign-in coming soon')} />
        </div>

        <p className="text-sm text-center text-[#64748B] mt-6">
          Don't have an account?{' '}
          <button type="button" onClick={() => navigate('/register')} className="text-[#0A4174] font-semibold hover:underline cursor-pointer bg-transparent border-0">
            Sign up
          </button>
        </p>
      </form>
    </AuthLayout>
  )
}
