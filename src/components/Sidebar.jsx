import { C } from '../theme.js'
import {
  IconDashboard, IconInventario, IconClientes, IconArriendos, IconCalendario,
  IconDevoluciones, IconReportes, IconConfig, IconLogout,
} from '../icons.jsx'

const NAV = [
  { key: 'dashboard', label: 'Dashboard', Icon: IconDashboard },
  { key: 'inventario', label: 'Inventario', Icon: IconInventario },
  { key: 'clientes', label: 'Clientes', Icon: IconClientes },
  { key: 'arriendos', label: 'Arriendos', Icon: IconArriendos },
  { key: 'calendario', label: 'Calendario', Icon: IconCalendario },
  { key: 'devoluciones', label: 'Devoluciones', Icon: IconDevoluciones },
  { key: 'reportes', label: 'Reportes', Icon: IconReportes },
]

export default function Sidebar({ app, open }) {
  const { screen, navigate, logout } = app

  const itemStyle = (key) => {
    const on = screen === key
    return {
      display: 'flex', alignItems: 'center', gap: 12, padding: '11px 13px', borderRadius: 10,
      cursor: 'pointer', fontSize: 14,
      color: on ? '#fff' : C.dim,
      background: on ? 'rgba(0,150,255,.12)' : 'transparent',
      fontWeight: on ? 600 : 400,
    }
  }

  return (
    <aside
      className={'aj-sidebar' + (open ? ' is-open' : '')}
      style={{
        width: 248, flex: 'none', background: C.sidebar, borderRight: `1px solid ${C.borderSoft}`,
        display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh',
      }}
    >
      {/* brand */}
      <div style={{ padding: '22px 22px 18px', display: 'flex', alignItems: 'center', gap: 11, borderBottom: '1px solid rgba(255,255,255,.05)' }}>
        <div style={{
          width: 38, height: 38, borderRadius: 11, background: 'linear-gradient(150deg,#0a0a0c,#161620)',
          border: '1px solid rgba(0,163,255,.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none',
        }}>
          <span style={{ fontWeight: 800, fontSize: 15, letterSpacing: '-.5px' }}>AJ</span>
        </div>
        <div style={{ fontWeight: 800, fontSize: 15, letterSpacing: '1.5px' }}>AJ<span style={{ color: C.cyanBright }}> CONNECT</span></div>
      </div>

      {/* nav */}
      <nav style={{ flex: 1, padding: '14px 12px', display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto' }}>
        {NAV.map(({ key, label, Icon }) => (
          <div key={key} className="ajnav" onClick={() => navigate(key)} style={itemStyle(key)}>
            <Icon /> {label}
          </div>
        ))}
        <div style={{ height: 1, background: 'rgba(255,255,255,.05)', margin: '10px 6px' }} />
        <div className="ajnav" onClick={() => navigate('config')} style={itemStyle('config')}>
          <IconConfig /> Configuración
        </div>
      </nav>

      {/* user */}
      <div style={{ padding: 14, borderTop: '1px solid rgba(255,255,255,.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: 8, borderRadius: 11 }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#0096FF,#00d4ff)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, flex: 'none',
          }}>JF</div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>José A. Farfán</div>
            <div style={{ fontSize: 11, color: C.faint }}>Administrador</div>
          </div>
          <button className="ajbtn" onClick={logout} title="Cerrar sesión" style={{ background: 'transparent', border: 'none', color: C.faint, cursor: 'pointer', display: 'flex', padding: 4 }}>
            <IconLogout size={17} />
          </button>
        </div>
      </div>
    </aside>
  )
}
