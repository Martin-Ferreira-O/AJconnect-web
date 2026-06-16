import { useState } from 'react'
import { C } from '../theme.js'
import { clientes } from '../data.js'
import { IconSearch, IconPlus, IconChevronRight } from '../icons.jsx'

const mono = "'JetBrains Mono',monospace"
const GRID = '2.2fr 1.2fr 1.4fr 1fr 1.1fr 44px'

export default function Clientes({ app }) {
  const [search, setSearch] = useState('')
  const q = search.toLowerCase()
  const rows = clientes.filter((c) =>
    !q || c.nombre.toLowerCase().includes(q) || c.empresa.toLowerCase().includes(q) || c.rut.toLowerCase().includes(q)
  )

  return (
    <div className="ajscreen" style={{ maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-.5px' }}>Clientes</h1>
          <div style={{ fontSize: 13, color: C.faint, marginTop: 3 }}>6 productoras · 4 activas este mes</div>
        </div>
        <button className="ajbtn" onClick={() => app.showToast('Formulario de nuevo cliente')} style={{
          display: 'flex', alignItems: 'center', gap: 8, background: C.cyan, color: '#fff', border: 'none',
          borderRadius: 10, padding: '10px 16px', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 600, cursor: 'pointer',
        }}>
          <IconPlus size={16} />Nuevo cliente
        </button>
      </div>

      <div style={{ position: 'relative', marginBottom: 18, maxWidth: 440 }}>
        <span style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', display: 'flex' }}><IconSearch size={16} stroke="#5c5c66" /></span>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar por nombre, empresa o RUT…" style={{
          width: '100%', background: C.card, border: `1px solid ${C.border}`, borderRadius: 10,
          padding: '10px 12px 10px 38px', color: '#fff', fontFamily: 'inherit', fontSize: 13.5, outline: 'none',
        }} />
      </div>

      <div className="aj-table-wrap" style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden' }}>
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: GRID, gap: 14, padding: '13px 22px', fontSize: 11.5, color: C.mute, textTransform: 'uppercase', letterSpacing: '.6px', borderBottom: `1px solid ${C.borderSoft}`, fontWeight: 500 }}>
            <div>Cliente</div><div>RUT</div><div>Contacto</div><div style={{ textAlign: 'center' }}>Arriendos</div><div>Último</div><div />
          </div>
          {rows.map((c) => (
            <div key={c.id} className="ajrow" onClick={() => app.openDetail('cliente', c.id)}
              style={{ display: 'grid', gridTemplateColumns: GRID, gap: 14, alignItems: 'center', padding: '14px 22px', borderBottom: `1px solid ${C.borderFaint}`, cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
                <span style={{ width: 38, height: 38, borderRadius: 11, background: c.color + '22', color: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, flex: 'none' }}>{c.initials}</span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.nombre}</div>
                  <div style={{ fontSize: 12, color: C.mute }}>{c.empresa}</div>
                </div>
              </div>
              <div style={{ fontFamily: mono, fontSize: 12.5, color: C.dim }}>{c.rut}</div>
              <div style={{ fontSize: 12.5, color: C.dim, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.email}</div>
              <div style={{ textAlign: 'center' }}><span style={{ fontFamily: mono, fontSize: 13, color: C.cyanSoft, fontWeight: 600 }}>{c.arr}</span></div>
              <div style={{ fontSize: 12.5, color: C.dim, fontFamily: mono }}>{c.ultimo}</div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', color: '#5c5c66' }}><IconChevronRight size={16} /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
