import { C } from '../theme.js'
import { IconSearch, IconPlus, IconBell, IconMenu } from '../icons.jsx'

export default function Topbar({ app, crumb, onMenu }) {
  return (
    <header style={{
      height: 64, flex: 'none', borderBottom: `1px solid ${C.borderSoft}`, display: 'flex',
      alignItems: 'center', gap: 16, padding: '0 26px', background: 'rgba(8,8,10,.7)',
      backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 20,
    }}>
      <button className="ajbtn aj-hamburger" onClick={onMenu} aria-label="Abrir menú" style={{
        width: 40, height: 40, borderRadius: 10, background: C.card, border: `1px solid ${C.border}`,
        color: '#bdbdc6', cursor: 'pointer', alignItems: 'center', justifyContent: 'center',
      }}>
        <IconMenu size={18} />
      </button>

      <div style={{ fontSize: 13, color: C.faint, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span>AJ Connect</span>
        <span style={{ color: '#3a3a42' }}>/</span>
        <span style={{ color: '#cfcfd6', fontWeight: 500 }}>{crumb}</span>
      </div>

      <div className="aj-topbar-search" style={{ flex: 1, maxWidth: 420, marginLeft: 8, position: 'relative' }}>
        <span style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', display: 'flex' }}>
          <IconSearch size={16} stroke="#5c5c66" />
        </span>
        <input placeholder="Buscar arriendos, equipos, clientes…" style={{
          width: '100%', background: C.card, border: `1px solid ${C.border}`, borderRadius: 10,
          padding: '10px 12px 10px 38px', color: '#fff', fontFamily: 'inherit', fontSize: 13.5, outline: 'none',
        }} />
      </div>

      <div style={{ flex: 1 }} />

      <button className="ajbtn" onClick={app.startWizard} style={{
        display: 'flex', alignItems: 'center', gap: 8, background: C.cyan, color: '#fff', border: 'none',
        borderRadius: 10, padding: '10px 16px', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 600,
        cursor: 'pointer', boxShadow: '0 6px 18px rgba(0,150,255,.25)',
      }}>
        <IconPlus size={16} />
        <span className="aj-newbtn-label">Nuevo arriendo</span>
      </button>

      <button className="ajbtn" style={{
        position: 'relative', width: 40, height: 40, borderRadius: 10, background: C.card,
        border: `1px solid ${C.border}`, color: '#bdbdc6', cursor: 'pointer', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
      }}>
        <IconBell size={18} />
        <span style={{ position: 'absolute', top: 8, right: 9, width: 7, height: 7, borderRadius: '50%', background: C.red, border: '1.5px solid #000' }} />
      </button>
    </header>
  )
}
