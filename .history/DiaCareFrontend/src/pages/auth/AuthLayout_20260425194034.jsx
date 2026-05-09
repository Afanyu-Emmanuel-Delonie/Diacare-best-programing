import React from 'react'
import AuthBrand from '../../components/auth/AuthBrand'
import Logo from '../../components/ui/Logo'

export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen">

      {/* Desktop: sticky left panel */}
      <div className="hidden lg:block sticky top-0 h-screen w-[45%] shrink-0">
        <AuthBrand />
      </div>

      {/* Right: scrollable form area */}
      <div className="flex flex-1 flex-col bg-[#F8FAFB]">

        {/* Mobile: logo at top of form area, no bar */}
        <div className="flex lg:hidden items-center px-6 pt-24 pb-2">
          <Logo size={32} showName nameClass="text-[#001D39]" />
        </div>

        <div className="flex flex-1 items-center justify-center px-6 py-10">
          {children}
        </div>
      </div>

    </div>
  )
}
