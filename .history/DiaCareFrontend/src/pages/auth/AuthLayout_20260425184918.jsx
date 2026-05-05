import React from 'react'


export default function AuthLayout({ children }) {
  return (
    <div className="auth-root">
      {/* Left — Brand Panel */}
      <div className="auth-left">
        <div className="auth-brand">
          <span className="auth-brand-icon">🩺</span>
          <span className="auth-brand-name">DiaCare</span>
        </div>

        <div className="auth-left-body">
          <h1 className="auth-left-heading">
            Smarter diabetes<br />care starts here.
          </h1>
          <p className="auth-left-sub">
            Monitor patients, track glucose trends, and act on insights — all in one place.
          </p>

          {/* Decorative stat pills */}
          <div className="auth-stats">
            {[
              { value: '2,400+', label: 'Patients managed' },
              { value: '98%',    label: 'Alert accuracy'   },
              { value: '24/7',   label: 'Real-time sync'   },
            ].map(s => (
              <div key={s.label} className="auth-stat-pill">
                <span className="auth-stat-value">{s.value}</span>
                <span className="auth-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative blobs */}
        <div className="auth-blob auth-blob-1" />
        <div className="auth-blob auth-blob-2" />
      </div>

      {/* Right — Form Panel */}
      <div className="auth-right">
        {children}
      </div>
    </div>
  )
}
