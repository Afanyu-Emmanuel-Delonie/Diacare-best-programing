import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import heroImg from '../assets/hero.png'
import Logo from '../components/ui/Logo'
import Reveal from '../components/ui/Reveal'
import { BRAND } from '../constants/auth'

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* ── Hero ── */}
      <section style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>

        {/* BG image */}
        <img
          src={heroImg}
          alt="DiaCare"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
          }}
        />

        {/* Solid overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundColor: 'rgba(0, 29, 57, 0.58)',
        }} />

        {/* Nav */}
        <header style={{
          position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20,
          height: 'var(--nav-top-h)',
        }}>
          <div style={{
            maxWidth: '1200px', margin: '0 auto',
            padding: '0 var(--page-margin-desktop)',
            height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <Logo size={34} showName nameClass="text-lg font-bold" />

            <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <a href="#how-it-works" className="nav-link" style={{ color: 'rgba(255,255,255,0.8)' }}>How it works</a>
              <a href="#features"     className="nav-link" style={{ color: 'rgba(255,255,255,0.8)' }}>Features</a>
            </nav>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <Link to="/login" style={{
                padding: '0 1.25rem', height: 'var(--btn-h-sm)',
                display: 'inline-flex', alignItems: 'center',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(255,255,255,0.4)',
                color: '#fff', fontSize: '0.875rem', fontWeight: 500,
                textDecoration: 'none',
              }}>Sign in</Link>
              <Link to="/register" style={{
                padding: '0 1.25rem', height: 'var(--btn-h-sm)',
                display: 'inline-flex', alignItems: 'center',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-primary-400)',
                color: 'var(--color-primary-900)',
                fontSize: '0.875rem', fontWeight: 600,
                textDecoration: 'none',
              }}>Get started</Link>
            </div>
          </div>
        </header>

        {/* Centered content */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 10,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          textAlign: 'center',
          padding: '0 var(--page-margin-desktop)',
        }}>

          <Reveal delay={0}>
            <p style={{
              color: 'var(--color-primary-400)',
              fontSize: '0.75rem', fontWeight: 700,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              marginBottom: '1.25rem',
            }}>
              Diabetes management platform
            </p>
          </Reveal>

          <Reveal delay={150}>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 900, color: '#fff',
              lineHeight: 1.05, letterSpacing: '-0.025em',
              marginBottom: '1.5rem', maxWidth: '720px',
            }}>
              Your glucose. Your patterns. Your control.{' '}
              <span style={{ color: 'var(--color-primary-400)' }}>Own your health.</span>
            </h1>
          </Reveal>

          <Reveal delay={300}>
            <p style={{
              color: 'rgba(255,255,255,0.75)',
              fontSize: '1.1rem', lineHeight: 1.75,
              maxWidth: '500px', marginBottom: '2.5rem',
            }}>
              {BRAND.sub}
            </p>
          </Reveal>

          <Reveal delay={450}>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link to="/register" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                backgroundColor: 'var(--color-primary-400)',
                color: 'var(--color-primary-900)',
                fontWeight: 700, fontSize: '0.9rem',
                padding: '0 2rem', height: 'var(--btn-h-lg)',
                borderRadius: 'var(--radius-xl)', textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(123,189,232,0.3)',
              }}>
                Get started free <ArrowRight size={16} />
              </Link>
              <a href="#how-it-works" style={{
                display: 'inline-flex', alignItems: 'center',
                border: '2px solid rgba(255,255,255,0.4)',
                color: '#fff', fontWeight: 600, fontSize: '0.9rem',
                padding: '0 2rem', height: 'var(--btn-h-lg)',
                borderRadius: 'var(--radius-xl)', textDecoration: 'none',
              }}>
                See how it works
              </a>
            </div>
          </Reveal>

        </div>

      </section>

    </div>
  )
}
