import React from 'react'
import { BRAND, AUTH_STATS } from '../../constants/auth'
import Logo from '../ui/Logo'

export default function AuthBrand() {
  return (
    <div className="auth-left">
      <div className="auth-brand">
        <Logo size={50} />
      </div>

      <div className="auth-left-body">
        <h1 className="auth-left-heading">
          {BRAND.tagline.split('\n').map((line, i) => (
            <React.Fragment key={i}>{line}{i === 0 && <br />}</React.Fragment>
          ))}
        </h1>
        <p className="auth-left-sub">{BRAND.sub}</p>

        <div className="auth-stats">
          {AUTH_STATS.map(s => (
            <div key={s.label} className="auth-stat-pill">
              <span className="auth-stat-value">{s.value}</span>
              <span className="auth-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="auth-blob auth-blob-1" />
      <div className="auth-blob auth-blob-2" />
    </div>
  )
}
