import { useNavigate } from 'react-router-dom'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts'
import {
  Users, Stethoscope, Activity, Calendar, FileText,
  TrendingUp, TrendingDown, ArrowRight, AlertTriangle,
  UserCheck, UserPlus, FlaskConical, LogIn, LogOut,
} from 'lucide-react'
import { StatusBadge, GLUCOSE_STATUS, classifyGlucose } from '../../constants/status'
import { authStore } from '../../store/authStore'

// ── Data ──────────────────────────────────────────────────────────────────
const STATS = [
  { label: 'Total Patients',   value: 124, change: +8,  sub: 'vs last month', icon: <Users size={22} />,       bg: 'linear-gradient(135deg,#0A4174,#49769F)' },
  { label: 'Active Doctors',   value: 18,  change: +2,  sub: 'vs last month', icon: <Stethoscope size={22} />, bg: 'linear-gradient(135deg,#16A34A,#4ade80)' },
  { label: 'Glucose Readings', value: 843, change: +34, sub: 'this week',     icon: <Activity size={22} />,    bg: 'linear-gradient(135deg,#D97706,#fbbf24)' },
  { label: 'Appointments',     value: 41,  change: -3,  sub: 'this week',     icon: <Calendar size={22} />,    bg: 'linear-gradient(135deg,#7C3AED,#a78bfa)' },
]

const QUICK_ACTIONS = [
  { label: 'Add Patient',    icon: <UserPlus size={18} />,     color: '#0A4174', bg: '#EFF6F8', href: '/patients'     },
  { label: 'Add Doctor',     icon: <Stethoscope size={18} />,  color: '#16A34A', bg: '#F0FDF4', href: '/doctors'      },
  { label: 'Log Glucose',    icon: <Activity size={18} />,     color: '#D97706', bg: '#FFFBEB', href: '/glucose'      },
  { label: 'Schedule Appt',  icon: <Calendar size={18} />,     color: '#7C3AED', bg: '#F5F3FF', href: '/appointments' },
  { label: 'Add Lab Result', icon: <FlaskConical size={18} />, color: '#0891B2', bg: '#ECFEFF', href: '/lab'          },
  { label: 'View Reports',   icon: <FileText size={18} />,     color: '#64748B', bg: '#F1F5F9', href: '/reports'      },
]

const CRITICAL_ALERTS = [
  { id: 1, patient: 'Jean Habimana',   value: 54,  type: 'LOW',      time: '08:14 AM', doctor: 'Dr. Sarah Nkusi'  },
  { id: 2, patient: 'Eric Nkurunziza', value: 310, type: 'CRITICAL', time: '07:52 AM', doctor: 'Dr. Amara Diallo' },
  { id: 3, patient: 'Paul Kagame',     value: 305, type: 'CRITICAL', time: '06:30 AM', doctor: 'Dr. James Osei'   },
]

const GLUCOSE_TREND = [
  { day: 'Mon', avg: 118, high: 182, low: 72 },
  { day: 'Tue', avg: 134, high: 210, low: 88 },
  { day: 'Wed', avg: 109, high: 165, low: 65 },
  { day: 'Thu', avg: 142, high: 230, low: 95 },
  { day: 'Fri', avg: 127, high: 195, low: 78 },
  { day: 'Sat', avg: 156, high: 280, low: 102 },
  { day: 'Sun', avg: 121, high: 178, low: 70 },
]

const GLUCOSE_DIST = [
  { name: 'Normal',   value: 58, color: '#16A34A' },
  { name: 'High',     value: 24, color: '#D97706' },
  { name: 'Critical', value: 10, color: '#DC2626' },
  { name: 'Low',      value: 8,  color: '#7C3AED' },
]

const RECENT_PATIENTS = [
  { id: 1, name: 'Alice Mutoni',    age: 34, type: 'Type 2', lastGlucose: 182, doctor: 'Dr. Amara Diallo' },
  { id: 2, name: 'Jean Habimana',   age: 52, type: 'Type 1', lastGlucose: 54,  doctor: 'Dr. Sarah Nkusi'  },
  { id: 3, name: 'Marie Uwase',     age: 41, type: 'Type 2', lastGlucose: 108, doctor: 'Dr. James Osei'   },
  { id: 4, name: 'Eric Nkurunziza', age: 29, type: 'Type 1', lastGlucose: 310, doctor: 'Dr. Amara Diallo' },
  { id: 5, name: 'Grace Ineza',     age: 47, type: 'Type 2', lastGlucose: 95,  doctor: 'Dr. Sarah Nkusi'  },
]

// 5 items max, no patient names in text
const RECENT_ACTIVITY = [
  { id: 1, icon: <LogIn size={14} />,        color: '#0A4174', bg: '#EFF6F8', text: 'Patient checked in',        sub: 'Glucose Review · Dr. Amara Diallo',     time: '2m ago'  },
  { id: 2, icon: <AlertTriangle size={14} />, color: '#DC2626', bg: '#FFF1F0', text: 'Critical glucose recorded', sub: '310 mg/dL · Dr. Amara Diallo',          time: '8m ago'  },
  { id: 3, icon: <UserCheck size={14} />,     color: '#16A34A', bg: '#F0FDF4', text: 'Doctor account approved',   sub: 'Diabetologist · King Faisal Hospital',  time: '15m ago' },
  { id: 4, icon: <FlaskConical size={14} />,  color: '#D97706', bg: '#FFFBEB', text: 'Lab result uploaded',       sub: 'HbA1c · 7.2% · Abnormal',              time: '22m ago' },
  { id: 5, icon: <LogOut size={14} />,        color: '#64748B', bg: '#F1F5F9', text: 'Patient checked out',       sub: 'Routine Check-up completed',            time: '34m ago' },
]

// ── Custom tooltip ─────────────────────────────────────────────────────────
function GlucoseTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-lg px-4 py-3 text-xs">
      <p className="font-bold text-[#1E293B] mb-2">{label}</p>
      {payload.map(p => (
        <div key={p.dataKey} className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-[#64748B] capitalize">{p.dataKey}:</span>
          <span className="font-semibold text-[#1E293B]">{p.value} mg/dL</span>
        </div>
      ))}
    </div>
  )
}

// ── Main ───────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const navigate = useNavigate()
  const user     = authStore.getUser()
  const hour     = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B] tracking-tight m-0">
            {greeting}, {user?.name?.split(' ')[0] ?? 'Admin'}
          </h1>
          <p className="text-sm text-[#64748B] mt-1 m-0">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div className="flex items-center gap-2 bg-[#FFF1F0] border border-[#DC2626]/20 text-[#DC2626] px-4 py-2 rounded-xl text-sm font-semibold">
          <AlertTriangle size={15} />
          {CRITICAL_ALERTS.length} critical alert{CRITICAL_ALERTS.length > 1 ? 's' : ''} right now
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {STATS.map(s => (
          <div key={s.label} className="relative rounded-2xl overflow-hidden p-5 flex flex-col gap-4" style={{ background: s.bg }}>
            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-white/10" />
            <div className="absolute -bottom-6 -right-2 w-28 h-28 rounded-full bg-white/5" />
            <div className="relative z-10 flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white">{s.icon}</div>
              <span className="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg bg-white/20 text-white">
                {s.change >= 0 ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                {s.change >= 0 ? '+' : ''}{s.change}
              </span>
            </div>
            <div className="relative z-10">
              <p className="m-0 text-3xl font-bold text-white font-mono">{s.value.toLocaleString()}</p>
              <p className="m-0 text-sm font-semibold text-white/90 mt-0.5">{s.label}</p>
              <p className="m-0 text-xs text-white/60 mt-0.5">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
        <p className="m-0 font-bold text-[#1E293B] mb-4">Quick Actions</p>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {QUICK_ACTIONS.map(q => (
            <button
              key={q.label}
              onClick={() => navigate(q.href)}
              className="flex flex-col items-center gap-2 p-3 rounded-xl border border-[#E2E8F0] hover:border-transparent hover:shadow-md transition-all cursor-pointer bg-transparent group"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110" style={{ backgroundColor: q.bg, color: q.color }}>
                {q.icon}
              </div>
              <span className="text-xs font-semibold text-[#64748B] text-center leading-tight">{q.label}</span>
            </button>
          ))}
        </div>
      </div>


      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E2E8F0] p-5">
          <div className="flex items-start justify-between mb-5">
            <div>
              <p className="m-0 font-bold text-[#1E293B] text-base">Glucose Trend</p>
              <p className="m-0 text-xs text-[#64748B] mt-0.5">7-day average, high & low across all patients</p>
            </div>
            <span className="text-xs font-semibold text-[#0A4174] bg-[#EFF6F8] px-2.5 py-1 rounded-lg">mg/dL</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={GLUCOSE_TREND} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="avgGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#0A4174" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#0A4174" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="highGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#DC2626" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#DC2626" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} domain={[40, 300]} />
              <Tooltip content={<GlucoseTooltip />} />
              <Area type="monotone" dataKey="high" stroke="#DC2626" strokeWidth={1.5} fill="url(#highGrad)" strokeDasharray="4 2" dot={false} />
              <Area type="monotone" dataKey="avg"  stroke="#0A4174" strokeWidth={2.5} fill="url(#avgGrad)" dot={{ r: 3, fill: '#0A4174', strokeWidth: 0 }} activeDot={{ r: 5 }} />
              <Area type="monotone" dataKey="low"  stroke="#7C3AED" strokeWidth={1.5} fill="none" strokeDasharray="4 2" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-5 mt-3 pt-3 border-t border-[#E2E8F0]">
            {[['#0A4174','Average'],['#DC2626','High'],['#7C3AED','Low']].map(([c, l]) => (
              <div key={l} className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 rounded-full inline-block" style={{ backgroundColor: c }} />
                <span className="text-xs text-[#64748B]">{l}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 flex flex-col">
          <div className="mb-4">
            <p className="m-0 font-bold text-[#1E293B] text-base">Reading Distribution</p>
            <p className="m-0 text-xs text-[#64748B] mt-0.5">Today's glucose status breakdown</p>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={GLUCOSE_DIST} cx="50%" cy="50%" innerRadius={52} outerRadius={78} paddingAngle={3} dataKey="value">
                  {GLUCOSE_DIST.map((entry, i) => <Cell key={i} fill={entry.color} stroke="none" />)}
                </Pie>
                <Tooltip formatter={(v, n) => [`${v}%`, n]} contentStyle={{ borderRadius: 10, border: '1px solid #E2E8F0', fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {GLUCOSE_DIST.map(d => (
              <div key={d.name} className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ backgroundColor: d.color + '12' }}>
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                <div>
                  <p className="m-0 text-xs font-semibold" style={{ color: d.color }}>{d.name}</p>
                  <p className="m-0 text-xs text-[#64748B]">{d.value}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row — Recent patients + Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Recent patients */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0]">
            <p className="m-0 font-bold text-[#1E293B]">Recent Patients</p>
            <button onClick={() => navigate('/patients')} className="flex items-center gap-1 text-xs font-semibold text-[#0A4174] bg-transparent border-0 cursor-pointer hover:underline">
              View all <ArrowRight size={11} />
            </button>
          </div>
          <div className="flex flex-col divide-y divide-[#E2E8F0]">
            {RECENT_PATIENTS.map(p => {
              const gs = classifyGlucose(p.lastGlucose)
              return (
                <div key={p.id} className="flex items-center gap-3 px-5 py-3 hover:bg-[#F8FAFB] transition cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-[#0A4174] text-white flex items-center justify-center text-xs font-bold shrink-0">
                    {p.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="m-0 text-sm font-semibold text-[#1E293B] truncate">{p.name}</p>
                    <p className="m-0 text-xs text-[#64748B]">{p.age}y · {p.type} · {p.doctor}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className="font-mono text-xs font-bold text-[#1E293B]">{p.lastGlucose} mg/dL</span>
                    <StatusBadge status={gs} map={GLUCOSE_STATUS} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Recent activity — no scroll, 5 items, no names */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0]">
            <p className="m-0 font-bold text-[#1E293B]">Recent Activity</p>
            <span className="flex items-center gap-1.5 text-xs text-[#16A34A] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse" />
              Live
            </span>
          </div>
          <div className="flex flex-col">
            {RECENT_ACTIVITY.map((a, i) => (
              <div key={a.id} className="flex items-start gap-3 px-5 py-3.5 hover:bg-[#F8FAFB] transition cursor-pointer relative">
                {i < RECENT_ACTIVITY.length - 1 && (
                  <div className="absolute left-[2.35rem] top-10 bottom-0 w-px bg-[#E2E8F0]" />
                )}
                <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 relative z-10" style={{ backgroundColor: a.bg, color: a.color }}>
                  {a.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="m-0 text-sm font-semibold text-[#1E293B]">{a.text}</p>
                  <p className="m-0 text-xs text-[#64748B] truncate">{a.sub}</p>
                </div>
                <span className="text-xs text-[#94A3B8] shrink-0 mt-0.5">{a.time}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
