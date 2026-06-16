import { useState } from 'react'
import { C, Badge } from '../theme.js'
import { calLegend, calDotsMap, calDayEvents } from '../data.js'
import { IconChevronLeft, IconChevronRight, IconAlert } from '../icons.jsx'

const DOW = ['L', 'M', 'M', 'J', 'V', 'S', 'D']

export default function Calendario({ app }) {
  const [selected, setSelected] = useState(15)

  // May 2026: Monday-based offset for the first day
  const first = (new Date(2026, 4, 1).getDay() + 6) % 7
  const cells = []
  for (let i = 0; i < first; i++) cells.push({ empty: true, key: 'e' + i })
  for (let d = 1; d <= 31; d++) cells.push({ day: d, dots: calDotsMap[d] || [], key: 'd' + d })

  return (
    <div className="ajscreen" style={{ maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-.5px' }}>Calendario de reservas</h1>
          <div style={{ fontSize: 13, color: C.faint, marginTop: 3 }}>Visualiza disponibilidad y evita overbooking</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button className="ajbtn" style={navBtn}><IconChevronLeft size={16} /></button>
          <div style={{ fontSize: 15, fontWeight: 600, minWidth: 130, textAlign: 'center' }}>Mayo 2026</div>
          <button className="ajbtn" style={navBtn}><IconChevronRight size={16} /></button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', marginBottom: 16 }}>
        {calLegend.map((l) => (
          <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, color: C.dim }}>
            <span style={{ width: 10, height: 10, borderRadius: 3, background: l.color }} />{l.label}
          </div>
        ))}
      </div>

      <div className="aj-two-col" style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: 18, alignItems: 'start' }}>
        {/* calendar grid */}
        <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 16, padding: 18 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 6, marginBottom: 8 }}>
            {DOW.map((d, i) => (
              <div key={i} style={{ textAlign: 'center', fontSize: 11, color: C.faint, textTransform: 'uppercase', letterSpacing: '.5px', padding: '4px 0' }}>{d}</div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 6 }}>
            {cells.map((c) => {
              if (c.empty) return <div key={c.key} style={{ aspectRatio: '1', opacity: 0 }} />
              const sel = c.day === selected
              const hasDots = c.dots.length > 0
              return (
                <div key={c.key}
                  onClick={() => hasDots && setSelected(c.day)}
                  style={{
                    aspectRatio: '1', borderRadius: 10,
                    background: sel ? '#0096FF' : (hasDots ? '#101013' : 'transparent'),
                    border: `1px solid ${sel ? '#0096FF' : (hasDots ? 'rgba(255,255,255,.07)' : 'rgba(255,255,255,.03)')}`,
                    padding: '7px 8px', cursor: hasDots ? 'pointer' : 'default', position: 'relative',
                    display: 'flex', flexDirection: 'column',
                  }}>
                  <span style={{ fontSize: 13, fontWeight: sel ? 700 : 400, color: sel ? '#fff' : (hasDots ? '#fff' : C.faint) }}>{c.day}</span>
                  <div style={{ display: 'flex', gap: 3, marginTop: 'auto' }}>
                    {c.dots.map((dt, i) => <span key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: dt }} />)}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* day panel */}
        <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 16, padding: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div style={{ fontSize: 16, fontWeight: 600 }}>{selected} de Mayo</div>
            <span style={{ fontSize: 12, color: C.cyan, fontWeight: 500 }}>3 reservas</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {calDayEvents.map((ev) => (
              <div key={ev.arrId} className="ajcard ajrow" onClick={() => app.openDetail('arriendo', ev.arrId)}
                style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 13, borderRadius: 12, background: '#101013', cursor: 'pointer' }}>
                <span style={{ width: 4, alignSelf: 'stretch', borderRadius: 4, background: ev.color }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600 }}>{ev.cliente}</div>
                  <div style={{ fontSize: 12, color: C.mute, marginTop: 2 }}>{ev.equipos}</div>
                </div>
                <Badge estado={ev.estado} style={{ fontSize: 10, padding: '3px 9px' }} />
              </div>
            ))}
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '12px 13px', borderRadius: 12, background: 'rgba(255,77,94,.06)', border: '1px solid rgba(255,77,94,.22)', marginTop: 4 }}>
              <span style={{ flex: 'none', marginTop: 1, display: 'flex' }}><IconAlert size={16} stroke={C.red} /></span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#ff8a96' }}>Conflicto detectado · 25 May</div>
                <div style={{ fontSize: 12, color: C.dim, marginTop: 2 }}>2 reservas solicitan los mismos toldos.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const navBtn = {
  width: 36, height: 36, borderRadius: 10, background: C.card, border: `1px solid ${C.border}`,
  color: '#bdbdc6', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
}
