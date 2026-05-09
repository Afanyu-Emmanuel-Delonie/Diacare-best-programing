import Reveal from '../ui/Reveal'

const STATS = [
  { value: '2,400+', label: 'Patients managed' },
  { value: '98%',    label: 'Alert accuracy'   },
  { value: '24/7',   label: 'Real-time sync'   },
  { value: '40+',    label: 'Specialist doctors'},
]

export default function Stats() {
  return (
    <section style={{
      backgroundColor: 'var(--color-surface)',
      padding: '5rem var(--page-margin-desktop)',
    }}>
      <div style={{
        maxWidth: '00px', margin: '0 auto',
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '2rem',
      }}>
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 100}>
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              textAlign: 'center',
              paddingLeft: i > 0 ? '2rem' : 0,
              borderLeft: i > 0 ? '1px solid var(--color-border)' : 'none',
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                fontWeight: 700, color: 'var(--color-primary-800)',
                lineHeight: 1, marginBottom: '0.5rem',
              }}>{s.value}</span>
              <span style={{
                fontSize: '0.9rem', color: 'var(--color-text-muted)',
                fontWeight: 500,
              }}>{s.label}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
