import { C, estadoStyle, dotColor, Badge } from '../theme.js'
import { arriendos, topEquipos, alertas } from '../data.js'
import {
  IconArriendosFilled, IconBox, IconAlert, IconCard, IconClock, IconChevronRight,
  IconPlus, IconClientes, IconInventario, IconCalendario,
} from '../icons.jsx'

const mono = "'JetBrains Mono',monospace"

function Kpi({ icon, value, label, valueColor, valueSize = 30, delta, cardBorder }) {
  return (
    <div className="ajcard" style={{ background: C.card, border: `1px solid ${cardBorder || C.border}`, borderRadius: 16, padding: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
        {icon}
        {delta && <span style={{ fontSize: 11, color: C.green, fontWeight: 600 }}>{delta}</span>}
      </div>
      <div style={{ fontSize: valueSize, fontWeight: 700, letterSpacing: '-1px', lineHeight: 1, color: valueColor || '#fff' }}>{value}</div>
      <div style={{ fontSize: 12.5, color: C.mute, marginTop: 6 }}>{label}</div>
    </div>
  )
}

function KpiIcon({ bg, children }) {
  return (
    <span style={{ width: 34, height: 34, borderRadius: 10, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {children}
    </span>
  )
}

export default function Dashboard({ app }) {
  const dashArriendos = arriendos.slice(0, 4).map((a) => ({
    ...a,
    periodo: `${a.ini} → ${a.fin}`,
    equiposShort: a.equipos.map((e) => `${e.q}× ${e.n.split(' ').slice(0, 2).join(' ')}`).join(', '),
  }))

  return (
    <div className="ajscreen" style={{ maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 13, color: C.faint, marginBottom: 4 }}>Buenos días</div>
          <h1 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-.5px' }}>José Antonio</h1>
        </div>
        <div style={{ fontSize: 13, color: C.faint, fontFamily: mono }}>Jueves 14 · Mayo 2026</div>
      </div>

      {/* KPI ROW */}
      <div className="aj-kpi-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 14, marginBottom: 26 }}>
        <Kpi delta="+8%" value="12" label="Arriendos activos"
          icon={<KpiIcon bg="rgba(0,150,255,.12)"><IconArriendosFilled size={17} stroke={C.cyan} /></KpiIcon>} />
        <Kpi value="48" label="Equipos disponibles"
          icon={<KpiIcon bg="rgba(31,191,117,.12)"><IconBox size={17} stroke={C.green} /></KpiIcon>} />
        <Kpi value="2" label="Stock crítico" valueColor={C.amber} cardBorder="rgba(245,165,36,.18)"
          icon={<KpiIcon bg="rgba(245,165,36,.12)"><IconAlert size={17} stroke={C.amber} /></KpiIcon>} />
        <Kpi value="$280.000" label="Pagos pendientes" valueColor="#ff5d6c" valueSize={26}
          icon={<KpiIcon bg="rgba(255,77,94,.12)"><IconCard size={17} stroke={C.red} /></KpiIcon>} />
        <Kpi value="3" label="Reservas por vencer"
          icon={<KpiIcon bg="rgba(0,150,255,.12)"><IconClock size={17} stroke={C.cyan} /></KpiIcon>} />
      </div>

      <div className="aj-two-col" style={{ display: 'grid', gridTemplateColumns: '1.55fr 1fr', gap: 18, alignItems: 'start' }}>
        {/* LEFT COL */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Próximos arriendos */}
          <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px 14px' }}>
              <h2 style={{ fontSize: 16, fontWeight: 600 }}>Próximos arriendos</h2>
              <button className="ajbtn" onClick={() => app.navigate('arriendos')} style={{ background: 'transparent', border: 'none', color: C.cyan, fontFamily: 'inherit', fontSize: 13, cursor: 'pointer', fontWeight: 500 }}>Ver todos</button>
            </div>
            <div>
              {dashArriendos.map((a) => (
                <div key={a.id} className="ajrow" onClick={() => app.openDetail('arriendo', a.id)}
                  style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '13px 20px', borderTop: '1px solid rgba(255,255,255,.05)', cursor: 'pointer' }}>
                  <div style={{ width: 9, height: 9, borderRadius: '50%', background: dotColor(a.estado), flex: 'none', boxShadow: `0 0 10px ${dotColor(a.estado)}` }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.cliente}</div>
                    <div style={{ fontSize: 12, color: C.mute, fontFamily: mono, marginTop: 2 }}>{a.id} · {a.equiposShort}</div>
                  </div>
                  <div style={{ textAlign: 'right', flex: 'none' }}>
                    <div style={{ fontSize: 12, color: C.dim, fontFamily: mono }}>{a.periodo}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, fontFamily: mono, marginTop: 2 }}>{a.total}</div>
                  </div>
                  <Badge estado={a.estado} />
                </div>
              ))}
            </div>
          </div>

          {/* Equipos más arrendados */}
          <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 16, padding: '18px 20px 20px' }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Equipos más arrendados</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
              {topEquipos.map((e) => (
                <div key={e.nombre}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 7 }}>
                    <span style={{ color: '#cfcfd6' }}>{e.nombre}</span>
                    <span style={{ color: C.mute, fontFamily: mono }}>{e.veces} arriendos</span>
                  </div>
                  <div style={{ height: 8, background: '#161618', borderRadius: 6, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: e.pct, background: 'linear-gradient(90deg,#0096FF,#00d4ff)', borderRadius: 6, transformOrigin: 'left', animation: 'ajgrow .6s ease both' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COL */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Alertas */}
          <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 16, padding: '18px 18px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <h2 style={{ fontSize: 16, fontWeight: 600 }}>Alertas</h2>
              <span style={{ fontSize: 11, color: C.dim, background: '#161618', padding: '3px 9px', borderRadius: 20 }}>4 nuevas</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {alertas.map((al, i) => (
                <div key={i} className="ajcard" style={{ display: 'flex', gap: 11, alignItems: 'flex-start', padding: '12px 13px', borderRadius: 12, background: al.bg, border: `1px solid ${al.border}`, cursor: 'pointer' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: al.dot, marginTop: 5, flex: 'none', animation: 'ajpulse 2s infinite' }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 600, lineHeight: 1.3 }}>{al.titulo}</div>
                    <div style={{ fontSize: 12, color: '#8a8a93', marginTop: 2 }}>{al.sub}</div>
                  </div>
                  <span style={{ marginTop: 2, flex: 'none', display: 'flex' }}><IconChevronRight size={15} stroke="#5c5c66" /></span>
                </div>
              ))}
            </div>
          </div>

          {/* Acciones rápidas */}
          <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 16, padding: 18 }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 14 }}>Acciones rápidas</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <QuickAction primary onClick={app.startWizard} icon={<IconPlus size={18} />} label="Nuevo arriendo" />
              <QuickAction onClick={() => app.navigate('clientes')} icon={<IconClientes size={18} />} label="Registrar cliente" />
              <QuickAction onClick={() => app.navigate('inventario')} icon={<IconInventario size={18} />} label="Agregar equipo" />
              <QuickAction onClick={() => app.navigate('calendario')} icon={<IconCalendario size={18} />} label="Ver calendario" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function QuickAction({ primary, onClick, icon, label }) {
  return (
    <button className="ajbtn" onClick={onClick} style={{
      display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start', padding: 14, borderRadius: 12,
      background: primary ? C.cyan : '#121214', border: primary ? 'none' : '1px solid rgba(255,255,255,.08)',
      color: primary ? '#fff' : '#dcdce2', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
    }}>
      {icon}
      <span style={{ fontSize: 13, fontWeight: 600 }}>{label}</span>
    </button>
  )
}
