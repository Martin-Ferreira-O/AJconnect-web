import { useState } from 'react'
import { C, estadoStyle, Badge } from '../theme.js'
import { arriendos } from '../data.js'
import { IconPlus, IconChevronRight, IconArriendosFilled } from '../icons.jsx'

const mono = "'JetBrains Mono',monospace"
const GRID = '1fr 1.8fr 1.4fr 2fr 1.1fr 1fr 44px'

const TABS = [
  { key: 'todos', label: 'Todos', m: () => true },
  { key: 'activos', label: 'Activos', m: (a) => a.estado === 'ACTIVO' },
  { key: 'pendientes', label: 'Pendientes', m: (a) => a.estado === 'PENDIENTE' },
  { key: 'porvencer', label: 'Por vencer', m: (a) => a.estado === 'POR VENCER' || a.estado === 'VENCIDO' },
  { key: 'devueltos', label: 'Devueltos', m: (a) => a.estado === 'DEVUELTO' },
  { key: 'cancelados', label: 'Cancelados', m: (a) => a.estado === 'CANCELADO' },
]

export default function Arriendos({ app }) {
  const [tab, setTab] = useState('todos')
  const cur = TABS.find((t) => t.key === tab) || TABS[0]
  const rows = arriendos.filter(cur.m)

  return (
    <div className="ajscreen" style={{ maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 18 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-.5px' }}>Arriendos</h1>
          <div style={{ fontSize: 13, color: C.faint, marginTop: 3 }}>Gestión de reservas, confirmaciones y devoluciones</div>
        </div>
        <button className="ajbtn" onClick={app.startWizard} style={{
          display: 'flex', alignItems: 'center', gap: 8, background: C.cyan, color: '#fff', border: 'none',
          borderRadius: 10, padding: '10px 16px', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 600, cursor: 'pointer',
        }}>
          <IconPlus size={16} />Nuevo arriendo
        </button>
      </div>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 18, borderBottom: `1px solid ${C.border}` }}>
        {TABS.map((t) => {
          const on = tab === t.key
          return (
            <button key={t.key} className="ajchip" onClick={() => setTab(t.key)} style={{
              padding: '10px 15px', background: 'transparent', border: 'none',
              borderBottom: `2px solid ${on ? '#0096FF' : 'transparent'}`, color: on ? '#fff' : C.dim,
              fontFamily: 'inherit', fontSize: 13.5, cursor: 'pointer', fontWeight: on ? 600 : 400,
              display: 'flex', alignItems: 'center', gap: 7,
            }}>
              {t.label}
              <span style={{ fontSize: 11, color: C.faint, background: '#161618', padding: '1px 7px', borderRadius: 10 }}>{arriendos.filter(t.m).length}</span>
            </button>
          )
        })}
      </div>

      <div className="aj-table-wrap" style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden' }}>
        <div>
          <div className="aj-thead" style={{ display: 'grid', gridTemplateColumns: GRID, gap: 14, padding: '13px 22px', fontSize: 11.5, color: C.mute, textTransform: 'uppercase', letterSpacing: '.6px', borderBottom: `1px solid ${C.borderSoft}`, fontWeight: 500 }}>
            <div>N°</div><div>Cliente</div><div>Periodo</div><div>Equipos</div><div>Estado</div><div style={{ textAlign: 'right' }}>Total</div><div />
          </div>
          {rows.map((a) => {
            const pagado = a.pago === '$0'
            const equiposShort = a.equipos.map((e) => `${e.q}× ${e.n.split(' ').slice(0, 2).join(' ')}`).join(', ')
            return (
              <div key={a.id} className="ajrow aj-trow" onClick={() => app.openDetail('arriendo', a.id)}
                style={{ display: 'grid', gridTemplateColumns: GRID, gap: 14, alignItems: 'center', padding: '14px 22px', borderBottom: `1px solid ${C.borderFaint}`, cursor: 'pointer' }}>
                <div className="aj-cell" data-label="N°" style={{ fontFamily: mono, fontSize: 12.5, color: C.dim }}>{a.id}</div>
                <div className="aj-cell aj-cell-primary" style={{ fontSize: 14, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.cliente}</div>
                <div className="aj-cell" data-label="Periodo" style={{ fontSize: 12.5, color: C.dim, fontFamily: mono }}>{a.ini} → {a.fin}</div>
                <div className="aj-cell" data-label="Equipos" style={{ fontSize: 12.5, color: C.dim, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{equiposShort}</div>
                <div className="aj-cell" data-label="Estado"><Badge estado={a.estado} /></div>
                <div className="aj-cell" data-label="Total" style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: mono, fontSize: 13.5, fontWeight: 700 }}>{a.total}</div>
                  <div style={{ fontSize: 11, color: pagado ? '#36d98e' : '#f5b94e', fontFamily: mono }}>{pagado ? 'Pagado' : a.pago + ' pend.'}</div>
                </div>
                <div className="aj-cell-chevron" style={{ display: 'flex', justifyContent: 'flex-end', color: '#5c5c66' }}><IconChevronRight size={16} /></div>
              </div>
            )
          })}
          {rows.length === 0 && (
            <div style={{ padding: '54px 20px', textAlign: 'center', color: C.faint }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}><IconArriendosFilled size={36} stroke="#3a3a42" sw={1.5} /></div>
              <div style={{ fontSize: 14 }}>No hay arriendos en esta categoría.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
