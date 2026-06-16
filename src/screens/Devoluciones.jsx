import { useState } from 'react'
import { C, estadoStyle, dotColor, Badge } from '../theme.js'
import { arriendos } from '../data.js'
import { IconAlert } from '../icons.jsx'

const mono = "'JetBrains Mono',monospace"
const DEV_IDS = ['ARR-0418', 'ARR-0412', 'ARR-0489']
const OPTS = [['OK', '#36d98e'], ['Dañado', '#ff6b78'], ['Faltante', '#f5b94e']]

export default function Devoluciones({ app }) {
  const [selId, setSelId] = useState('ARR-0418')
  const [status, setStatus] = useState({}) // key `${selId}-${idx}` -> label

  const selArr = arriendos.find((x) => x.id === selId) || arriendos[3]
  const dano = Object.entries(status).some(([k, v]) => k.startsWith(selId) && v === 'Dañado')
  const setEq = (key, val) => setStatus((s) => ({ ...s, [key]: val }))

  return (
    <div className="ajscreen" style={{ maxWidth: 1280, margin: '0 auto' }}>
      <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-.5px' }}>Devoluciones</h1>
      <div style={{ fontSize: 13, color: C.faint, marginTop: 3, marginBottom: 22 }}>Cierra arriendos, revisa equipos y registra cobros por daño</div>

      <div className="aj-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 18, alignItems: 'start' }}>
        {/* pendientes */}
        <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.borderSoft}`, fontSize: 14, fontWeight: 600, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Pendientes de devolución
            <span style={{ fontSize: 11, color: '#f5b94e', background: 'rgba(245,165,36,.14)', padding: '3px 9px', borderRadius: 20 }}>3</span>
          </div>
          {DEV_IDS.map((id) => {
            const a = arriendos.find((x) => x.id === id)
            const on = selId === id
            return (
              <div key={id} className="ajrow" onClick={() => setSelId(id)}
                style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '15px 20px', borderBottom: `1px solid ${C.borderFaint}`, cursor: 'pointer', background: on ? 'rgba(0,150,255,.07)' : 'transparent' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: dotColor(a.estado), flex: 'none' }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{a.cliente}</div>
                  <div style={{ fontSize: 12, color: C.mute, fontFamily: mono }}>{a.id} · Término {a.fin}</div>
                </div>
                <Badge estado={a.estado} style={{ fontSize: 10.5 }} />
              </div>
            )
          })}
        </div>

        {/* recepción */}
        <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 16, padding: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <div style={{ fontSize: 16, fontWeight: 600 }}>Recepción de equipos</div>
            <span style={{ fontSize: 11, color: '#36d98e', background: 'rgba(31,191,117,.14)', padding: '3px 9px', borderRadius: 20, fontWeight: 600 }}>{selArr.estado}</span>
          </div>
          <div style={{ fontSize: 13, color: C.mute, fontFamily: mono, marginBottom: 18 }}>{selArr.id} · {selArr.cliente}</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18 }}>
            {selArr.equipos.map((e, idx) => {
              const key = selId + '-' + idx
              const cur = status[key]
              return (
                <div key={key} style={{ padding: 14, borderRadius: 12, background: '#101013', border: '1px solid rgba(255,255,255,.06)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 11 }}>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{e.n}</div>
                    <div style={{ fontSize: 12, color: C.mute, fontFamily: mono }}>{e.q} unidades</div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {OPTS.map(([label, col]) => {
                      const on = cur === label
                      return (
                        <button key={label} className="ajchip" onClick={() => setEq(key, label)} style={{
                          flex: 1, padding: 9, borderRadius: 9, fontFamily: 'inherit', fontSize: 12.5, cursor: 'pointer',
                          background: on ? col + '22' : '#000', border: `1px solid ${on ? col : 'rgba(255,255,255,.08)'}`,
                          color: on ? col : C.dim, fontWeight: on ? 600 : 400,
                        }}>{label}</button>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>

          {dano && (
            <div style={{ padding: 14, borderRadius: 12, background: 'rgba(255,77,94,.06)', border: '1px solid rgba(255,77,94,.22)', marginBottom: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, color: '#ff8a96', marginBottom: 11 }}>
                <IconAlert size={15} stroke={C.red} />Daño reportado
              </div>
              <input placeholder="Descripción del daño…" style={{ ...danoInput, marginBottom: 9 }} />
              <input placeholder="Monto cobro extra (CLP)" style={danoInput} />
            </div>
          )}

          <button className="ajbtn" onClick={() => { app.showToast('Arriendo cerrado · stock actualizado'); app.navigate('arriendos') }} style={{
            width: '100%', background: C.green, border: 'none', color: '#06120b', borderRadius: 11, padding: 13,
            fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer',
          }}>Cerrar arriendo y actualizar stock</button>
        </div>
      </div>
    </div>
  )
}

const danoInput = {
  width: '100%', background: '#000', border: '1px solid rgba(255,255,255,.1)', borderRadius: 9,
  padding: '10px 12px', color: '#fff', fontFamily: 'inherit', fontSize: 13, outline: 'none',
}
