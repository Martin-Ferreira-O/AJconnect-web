import { useState } from 'react'
import { C } from '../theme.js'
import { IconLock } from '../icons.jsx'

export default function Login({ app }) {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState(false)

  const submit = () => {
    if (!email || !pass) { setError(true); return }
    setError(false)
    app.navigate('dashboard')
  }
  const onKey = (e) => { if (e.key === 'Enter') submit() }

  const inputStyle = {
    width: '100%', background: '#000', border: '1px solid rgba(255,255,255,.1)', borderRadius: 11,
    padding: '13px 14px', color: '#fff', fontFamily: 'inherit', fontSize: 14, outline: 'none',
  }

  return (
    <div className="ajscreen" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
      position: 'relative', overflow: 'hidden',
      background: 'radial-gradient(900px 600px at 50% -10%,rgba(0,150,255,.10),transparent 60%),#000',
    }}>
      {/* subtle grid backdrop */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px)',
        backgroundSize: '48px 48px',
        maskImage: 'radial-gradient(700px 500px at 50% 30%,#000,transparent 75%)',
        WebkitMaskImage: 'radial-gradient(700px 500px at 50% 30%,#000,transparent 75%)',
      }} />

      <div style={{ position: 'relative', width: '100%', maxWidth: 420, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30 }}>
        {/* brand */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 58, height: 58, borderRadius: 15, background: 'linear-gradient(150deg,#0a0a0c,#161620)',
            border: '1px solid rgba(0,163,255,.35)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 28px rgba(0,150,255,.18)',
          }}>
            <span style={{ fontWeight: 800, fontSize: 22, letterSpacing: '-1px' }}>AJ</span>
          </div>
          <div style={{ fontWeight: 800, fontSize: 26, letterSpacing: '4px' }}>AJ<span style={{ color: C.cyanBright }}> CONNECT</span></div>
        </div>

        {/* card */}
        <div style={{
          width: '100%', background: C.card, border: '1px solid rgba(255,255,255,.08)', borderRadius: 18,
          padding: '30px 28px', boxShadow: '0 30px 80px rgba(0,0,0,.6)',
        }}>
          <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Acceso administración</div>
          <div style={{ fontSize: 13, color: C.mute, marginBottom: 22 }}>Sistema interno de gestión de inventario y arriendos</div>

          {error && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 9, background: 'rgba(255,77,94,.08)',
              border: '1px solid rgba(255,77,94,.3)', color: '#ff8a96', fontSize: 12.5,
              padding: '10px 12px', borderRadius: 10, marginBottom: 16,
            }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: C.red, flex: 'none' }} />
              Credenciales incorrectas. Intenta nuevamente.
            </div>
          )}

          <label style={{ display: 'block', fontSize: 12, color: C.dim, marginBottom: 7, letterSpacing: '.3px' }}>Correo</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={onKey} placeholder="jose@ajconnect.cl"
            style={{ ...inputStyle, marginBottom: 16 }} />

          <label style={{ display: 'block', fontSize: 12, color: C.dim, marginBottom: 7, letterSpacing: '.3px' }}>Contraseña</label>
          <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} onKeyDown={onKey} placeholder="••••••••"
            style={{ ...inputStyle, marginBottom: 22 }} />

          <button className="ajbtn" onClick={submit} style={{
            width: '100%', background: C.cyan, color: '#fff', border: 'none', borderRadius: 11, padding: 14,
            fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer', boxShadow: '0 8px 24px rgba(0,150,255,.28)',
          }}>Ingresar</button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#5c5c66', fontSize: 12 }}>
          <IconLock size={13} stroke={C.cyanBright} />
          Conexión segura · Acceso privado de AJ Connect
        </div>
      </div>
    </div>
  )
}
