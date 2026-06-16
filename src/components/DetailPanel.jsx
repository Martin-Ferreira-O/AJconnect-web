import { C, estadoStyle, Badge } from '../theme.js'
import { arriendos, clientes, equipos } from '../data.js'
import { IconClose, IconFile } from '../icons.jsx'

const mono = "'JetBrains Mono',monospace"

function InfoRow({ label, value, valueStyle }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '13px 16px', background: C.card }}>
      <span style={{ fontSize: 13, color: C.dim }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 600, ...valueStyle }}>{value}</span>
    </div>
  )
}

function PanelHeader({ kicker, onClose }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
      <div style={{ fontSize: 13, color: C.mute, textTransform: 'uppercase', letterSpacing: '.6px', fontWeight: 500 }}>{kicker}</div>
      <button className="ajbtn" onClick={onClose} style={{ background: '#161618', border: 'none', color: C.dim, width: 30, height: 30, borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <IconClose size={15} />
      </button>
    </div>
  )
}

export default function DetailPanel({ app, detail }) {
  if (!detail) return null
  const { closeDetail } = app

  return (
    <>
      <div onClick={closeDetail} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.6)', zIndex: 50, animation: 'ajscrim .2s ease both' }} />
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: 'min(560px,92vw)', background: '#0b0b0e',
        borderLeft: '1px solid rgba(255,255,255,.1)', zIndex: 60, boxShadow: '-30px 0 80px rgba(0,0,0,.6)',
        overflowY: 'auto', animation: 'ajslide .28s cubic-bezier(.16,1,.3,1) both',
      }}>
        {detail.type === 'arriendo' && <ArriendoDetail app={app} id={detail.id} />}
        {detail.type === 'cliente' && <ClienteDetail app={app} id={detail.id} />}
        {detail.type === 'equipo' && <EquipoDetail app={app} id={detail.id} />}
      </div>
    </>
  )
}

function ArriendoDetail({ app, id }) {
  const a = arriendos.find((x) => x.id === id) || arriendos[0]
  const pagoColor = a.pago === '$0' ? '#36d98e' : '#f5b94e'
  const diasLabel = a.dias > 0 ? `${a.dias} días` : (a.dias === 0 ? 'Hoy' : 'Vencido')

  return (
    <div style={{ padding: '24px 26px 30px' }}>
      <PanelHeader kicker="Detalle de arriendo" onClose={app.closeDetail} />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 6 }}>
        <h2 style={{ fontSize: 21, fontWeight: 700 }}>{a.cliente}</h2>
        <Badge estado={a.estado} style={{ fontSize: 11, padding: '5px 12px' }} />
      </div>
      <div style={{ fontSize: 13, color: C.mute, fontFamily: mono, marginBottom: 22 }}>{a.id} · {a.rut}</div>

      <div style={infoBox}>
        <InfoRow label="Periodo" value={`${a.ini} → ${a.fin} 2026`} valueStyle={{ fontFamily: mono }} />
        <InfoRow label="Total" value={a.total} valueStyle={{ fontSize: 14, fontWeight: 700, color: '#4db5ff', fontFamily: mono }} />
        <InfoRow label="Pago pendiente" value={a.pago} valueStyle={{ color: pagoColor, fontFamily: mono }} />
        <InfoRow label="Días restantes" value={diasLabel} valueStyle={{ fontFamily: mono }} />
      </div>

      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Equipos arrendados</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 24 }}>
        {a.equipos.map((e, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 14px', borderRadius: 11, background: C.card, border: '1px solid rgba(255,255,255,.06)' }}>
            <span style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(0,150,255,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4db5ff', fontFamily: mono, fontSize: 13, fontWeight: 600, flex: 'none' }}>{e.q}×</span>
            <span style={{ flex: 1, fontSize: 13.5, fontWeight: 500 }}>{e.n}</span>
            <span style={{ fontSize: 10, fontWeight: 600, padding: '3px 9px', borderRadius: 20, background: 'rgba(31,191,117,.14)', color: '#36d98e' }}>EN CURSO</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button className="ajbtn" onClick={() => app.navigate('devoluciones')} style={{ width: '100%', background: C.green, border: 'none', color: '#06120b', borderRadius: 11, padding: 13, fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Registrar devolución</button>
        <button className="ajbtn" onClick={() => app.showToast('Comprobante PDF generado')} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#121214', border: '1px solid rgba(255,255,255,.1)', color: '#fff', borderRadius: 11, padding: 13, fontFamily: 'inherit', fontSize: 13.5, fontWeight: 600, cursor: 'pointer' }}><IconFile size={15} />Generar comprobante PDF</button>
      </div>
    </div>
  )
}

function ClienteDetail({ app, id }) {
  const c = clientes.find((x) => x.id === id) || clientes[0]
  const historial = [
    { id: 'ARR-0412', estado: 'ACTIVO', equipos: '3 Toldos · 8 Sillas', periodo: '13 May → 20 May', total: '$420.000' },
    { id: 'ARR-0398', estado: 'DEVUELTO', equipos: '2 Radios · 1 WiFi', periodo: '28 Abr → 2 May', total: '$95.000' },
    { id: 'ARR-0385', estado: 'DEVUELTO', equipos: '5 Sillas Director', periodo: '15 Abr → 18 Abr', total: '$75.000' },
  ]

  return (
    <div style={{ padding: '24px 26px 30px' }}>
      <PanelHeader kicker="Detalle de cliente" onClose={app.closeDetail} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 15, marginBottom: 22 }}>
        <span style={{ width: 54, height: 54, borderRadius: 15, background: c.color + '22', color: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 18, flex: 'none' }}>{c.initials}</span>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700 }}>{c.nombre}</h2>
          <div style={{ fontSize: 13, color: C.mute, fontFamily: mono }}>{c.rut}</div>
        </div>
      </div>

      <div style={infoBox}>
        <InfoRow label="Correo" value={c.email} valueStyle={{ fontWeight: 500 }} />
        <InfoRow label="Teléfono" value={c.tel} valueStyle={{ fontWeight: 500, fontFamily: mono }} />
        <InfoRow label="Total arriendos" value={c.arr} valueStyle={{ fontWeight: 700, color: '#4db5ff', fontFamily: mono }} />
        <InfoRow label="Último arriendo" value={c.ultimo} valueStyle={{ fontWeight: 500, fontFamily: mono }} />
      </div>

      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Historial de arriendos</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 24 }}>
        {historial.map((h) => {
          const [bg, color] = estadoStyle(h.estado)
          return (
            <div key={h.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 14px', borderRadius: 11, background: C.card, border: '1px solid rgba(255,255,255,.06)' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                  <span style={{ fontSize: 12, fontFamily: mono, color: C.dim }}>{h.id}</span>
                  <span style={{ fontSize: 9.5, fontWeight: 600, padding: '2px 7px', borderRadius: 20, background: bg, color }}>{h.estado}</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{h.equipos}</div>
                <div style={{ fontSize: 11.5, color: C.mute, fontFamily: mono }}>{h.periodo}</div>
              </div>
              <span style={{ fontSize: 13.5, fontWeight: 700, fontFamily: mono }}>{h.total}</span>
            </div>
          )
        })}
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <button className="ajbtn" onClick={app.startWizard} style={{ flex: 1, background: C.cyan, border: 'none', color: '#fff', borderRadius: 11, padding: 13, fontFamily: 'inherit', fontSize: 13.5, fontWeight: 600, cursor: 'pointer' }}>Nuevo arriendo</button>
        <button className="ajbtn" onClick={() => app.showToast('Editar cliente')} style={{ flex: 1, background: '#121214', border: '1px solid rgba(255,255,255,.1)', color: '#fff', borderRadius: 11, padding: 13, fontFamily: 'inherit', fontSize: 13.5, fontWeight: 600, cursor: 'pointer' }}>Editar cliente</button>
      </div>
    </div>
  )
}

function EquipoDetail({ app, id }) {
  const e = equipos.find((x) => x.id === id) || equipos[0]
  const dispColor = e.disp === 0 ? '#ff6b78' : (e.disp <= 2 ? '#f5b94e' : '#36d98e')
  const dispPct = Math.round((e.disp / e.total) * 100) + '%'
  const historial = [
    { dot: '#36d98e', txt: 'Devolución registrada · +3 disponibles', fecha: 'Hoy 09:12' },
    { dot: '#4db5ff', txt: 'Arriendo ARR-0412 · −3 unidades', fecha: '13 May 11:30' },
    { dot: '#a78bfa', txt: 'Equipo creado en inventario', fecha: '02 Ene 2026' },
  ]

  return (
    <div style={{ padding: '24px 26px 30px' }}>
      <PanelHeader kicker="Detalle de equipo" onClose={app.closeDetail} />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 6 }}>
        <h2 style={{ fontSize: 21, fontWeight: 700 }}>{e.nombre}</h2>
        <Badge estado={e.estado} style={{ fontSize: 11, padding: '5px 12px' }} />
      </div>
      <div style={{ fontSize: 13, color: C.mute, fontFamily: mono, marginBottom: 22 }}>{e.codigo} · {e.cat}</div>

      <div style={{ marginBottom: 22 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, marginBottom: 8 }}>
          <span style={{ color: C.dim }}>Disponibilidad</span>
          <span style={{ fontFamily: mono, color: dispColor, fontWeight: 600 }}>{e.disp} / {e.total}</span>
        </div>
        <div style={{ height: 10, background: '#161618', borderRadius: 6, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: dispPct, background: 'linear-gradient(90deg,#1FBF75,#36d98e)', borderRadius: 6, transformOrigin: 'left', animation: 'ajgrow .5s ease both' }} />
        </div>
      </div>

      <div style={infoBox}>
        <InfoRow label="Stock total" value={e.total} valueStyle={{ fontFamily: mono }} />
        <InfoRow label="En arriendo" value={e.arr} valueStyle={{ fontFamily: mono }} />
        <InfoRow label="Precio / día" value={e.precio} valueStyle={{ color: '#4db5ff', fontFamily: mono }} />
        <InfoRow label="Última actualización" value={e.upd} valueStyle={{ fontWeight: 500, fontFamily: mono }} />
      </div>

      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Historial de cambios</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginBottom: 24 }}>
        {historial.map((h, i) => (
          <div key={i} style={{ display: 'flex', gap: 11 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: h.dot, marginTop: 5, flex: 'none' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13 }}>{h.txt}</div>
              <div style={{ fontSize: 11.5, color: C.faint, fontFamily: mono }}>{h.fecha}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <button className="ajbtn" onClick={() => app.showToast('Editar equipo')} style={{ flex: 1, background: C.cyan, border: 'none', color: '#fff', borderRadius: 11, padding: 13, fontFamily: 'inherit', fontSize: 13.5, fontWeight: 600, cursor: 'pointer' }}>Editar equipo</button>
        <button className="ajbtn" onClick={() => app.showToast('Equipo dado de baja')} style={{ background: 'rgba(255,77,94,.1)', border: '1px solid rgba(255,77,94,.3)', color: '#ff8a96', borderRadius: 11, padding: '13px 18px', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 600, cursor: 'pointer' }}>Dar de baja</button>
      </div>
    </div>
  )
}

const infoBox = {
  display: 'flex', flexDirection: 'column', gap: 1, background: 'rgba(255,255,255,.05)', borderRadius: 12,
  overflow: 'hidden', border: '1px solid rgba(255,255,255,.06)', marginBottom: 22,
}
