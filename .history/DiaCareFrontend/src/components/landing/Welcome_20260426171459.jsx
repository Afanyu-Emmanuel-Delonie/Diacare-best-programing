import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Users, Activity } from 'lucide-react'
import heroImg from '../../assets/hero.png'
import Reveal from '../ui/Reveal'

const PILLARS = [
  { icon: ShieldCheck, label: 'Clinically trusted' },
  { icon: Users,       label: 'Built for care teams' },
  { icon: Activity,    label: 'Real-time monitoring' },
]

export default function Welcome() {
  return (
    <section style={{
      backgroundColor: 'var(--color-surface)',
      padding: '7rem var(--page-margin-desktop)',
    }}>
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '5rem', alignItems: 'center',
      }}>

        {/* Image */}
        <Reveal delay={0}>
          <div style={{
            position: 'relative',
            borderRadius: 'var(--radius-2xl)',
            overflow: 'hidden',
            aspectRatio: '4/5',
          }}>
            <img
              src={heroImg}
              alt="Doctor with patient"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
            />
            {/* Subtle blue tint so it doesn't look identical to hero */}
            <div style={{
              position: 'absolute', inset: 0,
              backgroundColor: 'rgba(10, 65, 116, 0.15)',
            }} />

            {/* Floating stat card */}
            <div style={{
              position: 'absolute', bottom: '2rem', left: '2rem', right: '2rem',
              backgroundColor: 'rgba(0, 29, 57, 0.88)',
              backdropFilter: 'blur(12px)',
              borderRadius: 'var(--radius-xl)',
              padding: '1.25rem 1.5rem',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Patients monitored today</p>
                <p style={{ color: '#fff', fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 700 }}>1,284</p>
              </div>
              <div style={{
                width: '40px', height: '40px', borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--color-primary-600)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Activity size={18} color="#fff" />
              </div>
            </div>
          </div>
        </Reveal>

        {/* Text */}
        <div>
          <Reveal delay={100}>
            <p style={{
              color: 'var(--color-primary-600)', fontSize: '0.75rem',
              fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase',
              marginBottom: '0.75rem',
            }}>Built for real care</p>
          </Reveal>

          <Reveal delay={200}>
            <h2 style={{
              font: 'var(--text-display)', color: 'var(--color-text)',
              marginBottom: '1.25rem', maxWidth: '480px',
            }}>
              Where clinical precision meets everyday living
            </h2>
          </Reveal>

          <Reveal delay={300}>
            <p style={{
              font: 'var(--text-body)', color: 'var(--color-text-muted)',
              lineHeight: 1.75, marginBottom: '2rem', maxWidth: '460px',
            }}>
              DiaCare bridges the gap between patients and their care teams — giving doctors the tools to act fast and patients the clarity to live well.
            </p>
          </Reveal>

          {/* Pillars */}
          <Reveal delay={400}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2.5rem' }}>
              {PILLARS.map(({ icon: Icon, label }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '32px', height: '32px', borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-info-bg)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <Icon size={15} color="var(--color-primary-800)" />
                  </div>
                  <span style={{ font: 'var(--text-small)', color: 'var(--color-text)', fontWeight: 500 }}>{label}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={500}>
            <Link to="/register" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              backgroundColor: 'var(--color-primary-800)',
              color: '#fff', fontWeight: 700, fontSize: '0.9rem',
              padding: '0 2rem', height: 'var(--btn-h-lg)',
              borderRadius: 'var(--radius-xl)', textDecoration: 'none',
              boxShadow: '0 8px 24px rgba(10,65,116,0.25)',
            }}>
              Get started <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>

      </div>
    </section>
  )
}
