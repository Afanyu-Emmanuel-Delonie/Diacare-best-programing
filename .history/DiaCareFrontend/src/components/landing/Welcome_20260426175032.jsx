import { Link } from 'react-router-dom'
import { ArrowRight, Activity, ShieldCheck, Users } from 'lucide-react'
import Reveal from '../ui/Reveal'

const DOCTOR_IMG = 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80'

const PILLARS = [
  { icon: ShieldCheck, label: 'Backed by IDF clinical guidelines' },
  { icon: Users,       label: 'Patient and provider in sync' },
  { icon: Activity,    label: 'Alerts that actually matter' },
]

export default function Welcome() {
  return (
    <section style={{
      backgroundColor: 'var(--color-surface)',
      padding: '8rem var(--page-margin-desktop)',
    }}>
      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '6rem', alignItems: 'center',
      }}>

        <Reveal delay={0}>
          <div style={{
            position: 'relative', borderRadius: 'var(--radius-2xl)',
            overflow: 'hidden', height: '520px',
            boxShadow: '0 32px 64px rgba(0,29,57,0.18)',
          }}>
            <img
              src={DOCTOR_IMG}
              alt="Doctor with patient"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,29,57,0.7) 0%, transparent 55%)' }} />
            <div style={{
              position: 'absolute', bottom: '1.75rem', left: '1.75rem', right: '1.75rem',
              backgroundColor: 'rgba(0,29,57,0.88)', backdropFilter: 'blur(20px)',
              borderRadius: 'var(--radius-xl)', padding: '1.25rem 1.5rem',
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.875rem' }}>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Live dashboard</p>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                  backgroundColor: 'rgba(22,163,74,0.2)', borderRadius: 'var(--radius-full)',
                  padding: '0.2rem 0.6rem',
                }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#4ade80', display: 'inline-block' }} />
                  <span style={{ color: '#4ade80', fontSize: '0.65rem', fontWeight: 600 }}>Live</span>
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                {[
                  { label: 'Monitored', value: '1,284' },
                  { label: 'Alerts today', value: '3' },
                  { label: 'Avg HbA1c', value: '6.8%' },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.62rem', fontWeight: 500, marginBottom: '0.2rem' }}>{label}</p>
                    <p style={{ color: '#fff', fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 700, lineHeight: 1 }}>{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal delay={100}>
            <p style={{
              color: 'var(--color-primary-600)', fontSize: '0.72rem', fontWeight: 700,
              letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '1rem',
            }}>Built for real care</p>
          </Reveal>

          <Reveal delay={200}>
            <h2 style={{
              fontSize: 'clamp(2.25rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--color-text)',
              lineHeight: 1.1, letterSpacing: '-0.03em',
              marginBottom: '1.25rem',
            }}>
              Clinical precision.<br />Human clarity.
            </h2>
          </Reveal>

          <Reveal delay={300}>
            <p style={{
              font: 'var(--text-body)', color: 'var(--color-text-muted)',
              lineHeight: 1.8, marginBottom: '2.5rem', maxWidth: '420px',
              fontSize: '1.05rem',
            }}>
              DiaCare connects patients and care teams — giving clinicians the tools to act fast, and patients the clarity to live well.
            </p>
          </Reveal>

          <Reveal delay={400}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', marginBottom: '2.5rem' }}>
              {PILLARS.map(({ icon: Icon, label }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-info-bg)', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '1px solid var(--color-border)',
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
              backgroundColor: 'var(--color-primary-800)', color: '#fff',
              fontWeight: 700, fontSize: '0.9rem',
              padding: '0 2rem', height: 'var(--btn-h-lg)',
              borderRadius: 'var(--radius-xl)', textDecoration: 'none',
              boxShadow: '0 8px 32px rgba(10,65,116,0.3)',
            }}>
              Get started <ArrowRight size={15} />
            </Link>
          </Reveal>
        </div>

      </div>
    </section>
  )
}
