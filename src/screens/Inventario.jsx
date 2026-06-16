import { useState } from 'react'
import { C, estadoStyle, catColors, chipStyle, Badge } from '../theme.js'
import { equipos } from '../data.js'
import { IconSearch, IconPlus, IconChevronRight, CatIcon } from '../icons.jsx'

const mono = "'JetBrains Mono',monospace"
const CATS = ['Todos', 'Toldos', 'Sillas', 'Radios', 'WiFi']
const GRID = '1.1fr 2fr 1fr .9fr .9fr 1.2fr 1fr 44px'

export default function Inventario({ app }) {
  const [filter, setFilter] = useState('Todos')
  const [search, setSearch] = useState('')

  const q = search.toLowerCase()
  const rows = equipos.filter((e) =>
    (filter === 'Todos' || e.cat === filter) &&
    (!q || e.nombre.toLowerCase().includes(q) || e.codigo.toLowerCase().includes(q))
  )

  return (
    <div className="ajscreen" style={{ maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-.5px' }}>Inventario</h1>
          <div style={{ fontSize: 13, color: C.faint, marginTop: 3 }}>{equipos.length} equipos registrados · 48 disponibles</div>
        </div>
        <button className="ajbtn" onClick={() => app.showToast('Formulario de nuevo equipo')} style={primaryBtn}>
          <IconPlus size={16} />Nuevo equipo
        </button>
      </div>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', marginBottom: 18 }}>
        <div style={{ flex: 1, minWidth: 240, position: 'relative' }}>
          <span style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', display: 'flex' }}><IconSearch size={16} stroke="#5c5c66" /></span>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar por nombre o código…" style={searchInput} />
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {CATS.map((c) => {
            const st = chipStyle(filter === c)
            return (
              <button key={c} className="ajchip" onClick={() => setFilter(c)} style={{
                padding: '9px 16px', borderRadius: 20, fontFamily: 'inherit', fontSize: 13, cursor: 'pointer',
                background: st.bg, border: `1px solid ${st.border}`, color: st.color, fontWeight: st.weight,
              }}>{c}</button>
            )
          })}
        </div>
      </div>

      <div className="aj-table-wrap" style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden' }}>
        <div>
          <div className="aj-thead" style={{ display: 'grid', gridTemplateColumns: GRID, gap: 14, padding: '13px 22px', fontSize: 11.5, color: C.mute, textTransform: 'uppercase', letterSpacing: '.6px', borderBottom: `1px solid ${C.borderSoft}`, fontWeight: 500 }}>
            <div>Código</div><div>Equipo</div><div>Categoría</div><div style={{ textAlign: 'center' }}>Stock</div><div style={{ textAlign: 'center' }}>Disp.</div><div>Estado</div><div>Actualizado</div><div />
          </div>
          {rows.map((e) => {
            const [iconBg, iconColor] = catColors(e.cat)
            const dispColor = e.disp === 0 ? '#ff6b78' : (e.disp <= 2 ? '#f5b94e' : '#36d98e')
            return (
              <div key={e.id} className="ajrow aj-trow" onClick={() => app.openDetail('equipo', e.id)}
                style={{ display: 'grid', gridTemplateColumns: GRID, gap: 14, alignItems: 'center', padding: '14px 22px', borderBottom: `1px solid ${C.borderFaint}`, cursor: 'pointer' }}>
                <div className="aj-cell" data-label="Código" style={{ fontFamily: mono, fontSize: 12.5, color: C.dim }}>{e.codigo}</div>
                <div className="aj-cell aj-cell-primary" style={{ display: 'flex', alignItems: 'center', gap: 11, minWidth: 0 }}>
                  <span style={{ width: 34, height: 34, borderRadius: 9, background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', color: iconColor }}>
                    <CatIcon cat={e.cat} color={iconColor} />
                  </span>
                  <span style={{ fontSize: 14, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{e.nombre}</span>
                </div>
                <div className="aj-cell" data-label="Categoría" style={{ fontSize: 13, color: C.dim }}>{e.cat}</div>
                <div className="aj-cell" data-label="Stock" style={{ textAlign: 'center', fontFamily: mono, fontSize: 13 }}>{e.total}</div>
                <div className="aj-cell" data-label="Disp." style={{ textAlign: 'center', fontFamily: mono, fontSize: 13, color: dispColor, fontWeight: 600 }}>{e.disp}/{e.total}</div>
                <div className="aj-cell" data-label="Estado"><Badge estado={e.estado} /></div>
                <div className="aj-cell" data-label="Actualizado" style={{ fontSize: 12, color: C.mute, fontFamily: mono }}>{e.upd}</div>
                <div className="aj-cell-chevron" style={{ display: 'flex', justifyContent: 'flex-end', color: '#5c5c66' }}><IconChevronRight size={16} /></div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const primaryBtn = {
  display: 'flex', alignItems: 'center', gap: 8, background: C.cyan, color: '#fff', border: 'none',
  borderRadius: 10, padding: '10px 16px', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 600, cursor: 'pointer',
}
const searchInput = {
  width: '100%', background: C.card, border: `1px solid ${C.border}`, borderRadius: 10,
  padding: '10px 12px 10px 38px', color: '#fff', fontFamily: 'inherit', fontSize: 13.5, outline: 'none',
}
