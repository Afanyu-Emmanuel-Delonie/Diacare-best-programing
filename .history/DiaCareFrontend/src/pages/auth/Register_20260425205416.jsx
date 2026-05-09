/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import AuthLayout from './AuthLayout'
import InputField from '../../components/ui/InputField'
import Button from '../../components/ui/Button'
import SocialButton from '../../components/ui/SocialButton'
import { SPECIALIZATIONS } from '../../constants/auth'

export default function Register() {
  const navigate = useNavigate()
  const [showPw, setShowPw]   = useState(false)
  const [loading, setLoading] = useState(false)
  const attempts  = useRef(0)
  const lockedAt  = useRef(null)
  const [isDoctor, setIsDoctor] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', password: '',
    licenseNumber: '', specialization: '', hospital: '',
  })
  const handle = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }))

  const MAX_ATTEMPTS = 5
  const LOCKOUT_MS   = 60 * 1000

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Rate Lock 
    if(lockedAt.current && Date.now() - lockedAt.current < LOCKOUT_MS){
      const secs = Math.ceil((LOCKOUT_MS - (Date.now() - lockedAt.current))/ 1000)
      toast.error(`Too many attempts, try again in ${secs}s`)
    }


    if (isDoctor && (!form.licenseNumber || !form.specialization || !form.hospital)) {
      toast.error('Please complete your medical credentials')
      return
    }
    
    setLoading(true)
    try{}
  }

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col">
        <h2 className="text-3xl font-bold tracking-tight text-[#1E293B] mb-1">Create account</h2>
        <p className="text-sm text-[#64748B] mb-7">Join DiaCare and start managing patients</p>

        <InputField label="Full Name" type="text"     placeholder="Jane Smith"        value={form.name}     onChange={handle('name')}     autoComplete="name" />
        <InputField label="Email"     type="email"    placeholder="you@diacare.com"   value={form.email}    onChange={handle('email')}    autoComplete="email" />
        <InputField label="Password"  type="password" placeholder="Min. 8 characters" value={form.password} onChange={handle('password')} autoComplete="new-password" />

        {/* Doctor checkbox */}
        <label className="flex items-center gap-3 mb-5 cursor-pointer select-none">
          <div
            onClick={() => setIsDoctor(p => !p)}
            style={{ borderRadius: 'var(--radius-sm)', width: 18, height: 18, minWidth: 18 }}
            className={`border-2 flex items-center justify-center transition
              ${isDoctor ? 'bg-[#0A4174] border-[#0A4174]' : 'bg-white border-[#CBD5E1]'}`}
          >
            {isDoctor && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path d="M1 4l3 3 5-6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
          <span className="text-sm font-medium text-[#1E293B]">I am a licensed medical professional</span>
        </label>

        {/* Doctor extra fields */}
        {isDoctor && (
          <div className="flex flex-col p-4 rounded-xl bg-[#EFF6F8] border border-[#BDD8E9] mb-4 gap-1">
            <p className="text-xs font-semibold text-[#0A4174] mb-2">Medical credentials</p>

            <InputField label="License Number" type="text" placeholder="e.g. MD-123456" value={form.licenseNumber} onChange={handle('licenseNumber')} />

            <div className="flex flex-col gap-1.5 mb-4">
              <label className="text-xs font-semibold text-[#1E293B]">Specialization</label>
              <select
                value={form.specialization}
                onChange={handle('specialization')}
                style={{ height: 'var(--input-h-desktop)', borderRadius: 'var(--radius-md)' }}
                className="px-3.5 border border-[#E2E8F0] bg-white text-sm text-[#1E293B] font-[inherit] outline-none transition focus:border-[#0A4174] focus:ring-2 focus:ring-[#ECFEFF] w-full"
              >
                <option value="">Select specialization</option>
                {SPECIALIZATIONS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <InputField label="Hospital / Clinic" type="text" placeholder="e.g. Kigali University Hospital" value={form.hospital} onChange={handle('hospital')} />
          </div>
        )}

        <Button type="submit" full>Create Account</Button>

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-[#E2E8F0]" />
          <span className="text-xs text-[#94A3B8] font-medium">or sign up with</span>
          <div className="flex-1 h-px bg-[#E2E8F0]" />
        </div>

        <div className="flex gap-2">
          <SocialButton provider="google" onClick={() => toast.info('Google sign-up coming soon')} />
          <SocialButton provider="apple"  onClick={() => toast.info('Apple sign-up coming soon')} />
        </div>

        <p className="text-sm text-center text-[#64748B] mt-6">
          Already have an account?{' '}
          <button type="button" onClick={() => navigate('/login')} className="text-[#0A4174] font-semibold hover:underline cursor-pointer bg-transparent border-0">
            Sign in
          </button>
        </p>
      </form>
    </AuthLayout>
  )
}
