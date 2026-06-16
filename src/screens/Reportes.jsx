import { useState } from 'react'
import { C, chipStyle } from '../theme.js'
import { repKpis, repBars, repRank } from '../data.js'
import { IconFile } from '../icons.jsx'

const mono = "'JetBrains Mono',monospace"
const FILTERS = ['Este mes', 'Trimestre', 'Año', 'Todo']

export default function Reportes({ app }) {
  const [filter, setFilter] = useState('Este mes')

  return (
    <div className="ajscreen" style={{ maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-.5px' }}>Reportes</h1>
          <div style={{ fontSize: 13, color: C.faint, marginTop: 3 }}>Análisis del negocio · Mayo 2026</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="ajbtn" onClick={() => app.showToast('Reporte exportado a PDF')} style={exportBtn}><IconFile size={15} />PDF</button>
          <button className="ajbtn" onClick={() => app.showToast('Reporte exportado a Excel')} style={exportBtn}><IconFile size={15} stroke={C.green} />Excel</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
        {FILTERS.map((f) => {
          const st = chipStyle(filter === f)
          return (
            <button key={f} className="ajchip" onClick={() => setFilter(f)} style={{
              padding: '8px 15px', borderRadius: 20, fontFamily: 'inherit', fontSize: 12.5, cursor: 'pointer',
              background: st.bg, border: `1px solid ${st.border}`, color: st.color, fontWeight: st.weight,
            }}>{f}</button>
          )
        })}
      </div>

      <div className="aj-rep-kpis" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 18 }}>
        {repKpis.map((k) => (
          <div key={k.label} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: 18 }}>
            <div style={{ fontSize: 12, color: C.mute, marginBottom: 8 }}>{k.label}</div>
            <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-.5px', color: k.color, fontFamily: mono }}>{k.value}</div>
          </div>
        ))}
      </div>

      <div className="aj-two-col" style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 18, alignItems: 'start' }}>
        {/* bar chart */}
        <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 16, padding: 20 }}>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 18 }}>Arriendos por mes</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14, height: 200, paddingBottom: 24, position: 'relative' }}>
            {repBars.map((b) => (
              <div key={b.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ width: '100%', maxWidth: 42, height: b.h, background: 'linear-gradient(180deg,#0096FF,rgba(0,150,255,.25))', borderRadius: '7px 7px 0 0', transformOrigin: 'bottom', animation: 'ajgrow .5s ease both' }} />
                <div style={{ fontSize: 11.5, color: C.mute }}>{b.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ranking */}
        <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 16, padding: 20 }}>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 18 }}>Ranking equipos más arrendados</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
            {repRank.map((r) => (
              <div key={r.nombre}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 7 }}>
                  <span style={{ color: '#cfcfd6' }}>{r.nombre}</span>
                  <span style={{ color: C.mute, fontFamily: mono }}>{r.veces}</span>
                </div>
                <div style={{ height: 8, background: '#161618', borderRadius: 6, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: r.pct, background: 'linear-gradient(90deg,#1FBF75,#36d98e)', borderRadius: 6, transformOrigin: 'left', animation: 'ajgrow .6s ease both' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const exportBtn = {
  display: 'flex', alignItems: 'center', gap: 8, background: '#121214', border: '1px solid rgba(255,255,255,.1)',
  color: '#fff', borderRadius: 10, padding: '10px 15px', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer',
}
