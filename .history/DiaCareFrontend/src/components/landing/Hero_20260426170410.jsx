import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import heroImg from '../../assets/hero.png'
import Reveal from '../ui/Reveal'

export default function Hero() {
  return (
    <section style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>

      <img
        src={heroImg}
        alt="DiaCare"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center',
        }}
      />

      <div style={{
        position: 'absolute', inset: 0,
        backgroundColor: 'rgba(0, 29, 57, 0.58)',
      }} />

      <div style={{
        position: 'absolute', inset: 0, zIndex: 10,
        display: 'flex', flexDirection: 'column',
        justifyContent: 'flex-end', alignItems: 'center',
      }}>
        <div style={{
          maxWidth: '1200px', width: '100%', margin: '0 auto',
          padding: '0 var(--page-margin-desktop)', paddingBottom: '5rem',
          display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
        }}>

          <Reveal delay={0}>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 900, color: '#fff',
              lineHeight: 1.05, letterSpacing: '-0.025em',
              marginBottom: '1.25rem', maxWidth: '850px',
            }}>
              Your Glucose Patterns.{' '}
              <span style={{ color: 'var(--color-primary-400)' }}>Your Control.</span>
            </h1>
          </Reveal>

          <Reveal delay={150}>
            <p style={{
              color: 'rgba(255,255,255,0.75)',
              fontSize: '1.1rem', lineHeight: 1.75,
              maxWidth: '540px', marginBottom: '2.5rem',
            }}>
              Living with diabetes means making dozens of decisions every day. DiaCare gives you the clarity to make each one with confidence.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link to="/register" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                backgroundColor: 'var(--color-primary-800)',
                color: '#fff',
                fontWeight: 700, fontSize: '0.9rem',
                padding: '0 2rem', height: 'var(--btn-h-lg)',
                borderRadius: 'var(--radius-xl)', textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(10,65,116,0.4)',
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
      </div>

    </section>
  )
}
