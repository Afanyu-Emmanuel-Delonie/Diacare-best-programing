import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Eye, EyeOff } from 'lucide-react'
import AuthLayout from './AuthLayout'
import InputField from '../../components/ui/InputField'
import Button from '../../components/ui/Button'
import SocialButton from '../../components/ui/SocialButton'
import { login } from '../../api/auth'
import { authStore } from '../../store/authStore'

const MAX_ATTEMPTS = 5
const LOCKOUT_MS   = 60 * 1000 // 1 minute

export default function Login() {
  const navigate  = useNavigate()
  const [form, setForm]       = useState({ email: '', password: '' })
  const [showPw, setShowPw]   = useState(false)
    const [loading, setLoading] = useState(false)
      const attempts  = useRef(0)
        const lockedAt  = useRef(null)

  const handle = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Rate limit check
    if (lockedAt.current && Date.now() - lockedAt.current < LOCKOUT_MS) {
      const secs = Math.ceil((LOCKOUT_MS - (Date.now() - lockedAt.current)) / 1000)
      toast.error(`Too many attempts. Try again in ${secs}s`)
      return
    }

    if (!form.email.trim() || !form.password.trim()) {
      toast.error('Please fill in all fields')
      return
    }

    setLoading(true)
    try {
      const { data } = await login({ email: form.email.trim(), password: form.password })

      // Store access token in memory only — never localStorage
      authStore.setToken(data.access_token)
      authStore.setUser(data.user)

      attempts.current = 0
      lockedAt.current = null

      toast.success(`Welcome back, ${data.user?.name ?? 'Doctor'}`)
      navigate('/dashboard')
    } catch (err) {
      attempts.current += 1
      if (attempts.current >= MAX_ATTEMPTS) {
        lockedAt.current = Date.now()
        attempts.current = 0
        toast.error('Too many failed attempts. Locked for 1 minute.')
      } else {
        toast.error(err.response?.data?.message ?? 'Invalid email or password')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col">
        <h2 className="text-3xl font-bold tracking-tight text-[#1E293B] mb-1">Welcome back</h2>
        <p className="text-sm text-[#64748B] mb-7">Sign in to your DiaCare account</p>

        <InputField
          label="Email"
          type="email"
          placeholder="doctor@diacare.com"
          value={form.email}
          onChange={handle('email')}
          autoComplete="email"
        />

        {/* Password with show/hide toggle */}
        <div className="flex flex-col gap-1.5 mb-4">
          <label className="text-xs font-semibold text-[#1E293B]">Password</label>
          <div className="relative">
            <input
              type={showPw ? 'text' : 'password'}
              placeholder="••••••••"
              value={form.password}
              onChange={handle('password')}
              autoComplete="current-password"
              style={{ height: 'var(--input-h-desktop)', borderRadius: 'var(--radius-md)' }}
              className="w-full px-3.5 pr-10 border border-[#E2E8F0] bg-white text-sm text-[#1E293B] font-[inherit] outline-none transition focus:border-[#0A4174] focus:ring-2 focus:ring-[#ECFEFF]"
            />
            <button
              type="button"
              onClick={() => setShowPw(p => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#64748B] transition"
            >
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div className="text-right mb-5">
          <a href="/forgot-password" className="text-xs font-medium text-[#0A4174] hover:underline">
            Forgot password?
          </a>
        </div>

        <Button type="submit" full disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>

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
