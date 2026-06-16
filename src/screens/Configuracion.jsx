import { C } from '../theme.js'
import { cfgUsers } from '../data.js'
import { IconPlus, IconLogout } from '../icons.jsx'

const mono = "'JetBrains Mono',monospace"

function Field({ label, value, isMono }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: 12, color: C.dim, marginBottom: 7 }}>{label}</label>
      <input defaultValue={value} style={{
        width: '100%', background: '#000', border: '1px solid rgba(255,255,255,.1)', borderRadius: 10,
        padding: '11px 12px', color: '#fff', fontFamily: isMono ? mono : 'inherit', fontSize: 13.5, outline: 'none',
      }} />
    </div>
  )
}

export default function Configuracion({ app }) {
  return (
    <div className="ajscreen" style={{ maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-.5px' }}>Configuración</h1>
      <div style={{ fontSize: 13, color: C.faint, marginTop: 3, marginBottom: 24 }}>Datos de la empresa, usuarios y preferencias</div>

      {/* empresa */}
      <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 16, padding: 22, marginBottom: 18 }}>
        <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 18 }}>Datos de la empresa</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Field label="Razón social" value="AJ Connect SpA" />
          <Field label="RUT empresa" value="77.456.789-0" isMono />
          <Field label="Correo" value="contacto@ajconnect.cl" />
          <Field label="Teléfono" value="+56 9 7654 3210" />
        </div>
      </div>

      {/* usuarios */}
      <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', marginBottom: 18 }}>
        <div style={{ padding: '18px 22px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Usuarios del sistema</div>
          <button className="ajbtn" onClick={() => app.showToast('Formulario de nuevo usuario')} style={{
            display: 'flex', alignItems: 'center', gap: 7, background: '#121214', border: '1px solid rgba(255,255,255,.1)',
            color: '#fff', borderRadius: 9, padding: '8px 13px', fontFamily: 'inherit', fontSize: 12.5, fontWeight: 600, cursor: 'pointer',
          }}><IconPlus size={14} />Agregar</button>
        </div>
        {cfgUsers.map((u) => (
          <div key={u.email} style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '14px 22px', borderTop: `1px solid ${C.borderFaint}` }}>
            <span style={{ width: 38, height: 38, borderRadius: '50%', background: u.avatarBg, color: u.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13 }}>{u.initials}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{u.nombre}</div>
              <div style={{ fontSize: 12, color: C.mute }}>{u.email}</div>
            </div>
            <span style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '.4px', padding: '4px 11px', borderRadius: 20, background: u.roleBg, color: u.roleColor }}>{u.rol}</span>
          </div>
        ))}
      </div>

      {/* logout */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: C.panel, border: `1px solid ${C.border}`, borderRadius: 16, padding: '18px 22px' }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600 }}>Cerrar sesión</div>
          <div style={{ fontSize: 12.5, color: C.mute, marginTop: 2 }}>La sesión expira tras 30 min de inactividad</div>
        </div>
        <button className="ajbtn" onClick={app.logout} style={{
          display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,77,94,.1)', border: '1px solid rgba(255,77,94,.3)',
          color: '#ff8a96', borderRadius: 10, padding: '10px 16px', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer',
        }}><IconLogout size={15} />Cerrar sesión</button>
      </div>
    </div>
  )
}
