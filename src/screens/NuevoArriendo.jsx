import { useState } from 'react'
import { C, catColors } from '../theme.js'
import { clientes, equipos } from '../data.js'
import { IconSearch, IconCheck, IconClock, CatIcon, IconFile } from '../icons.jsx'

const mono = "'JetBrains Mono',monospace"
const LABELS = ['Cliente', 'Fechas', 'Equipos', 'Disponibilidad', 'Confirmar']
const WIZ_EQUIPOS = ['e1', 'e3', 'e4', 'e5', 'e8']

export default function NuevoArriendo({ app }) {
  const [step, setStep] = useState(0)
  const [confirmed, setConfirmed] = useState(false)
  const [clienteSel, setClienteSel] = useState('c1')
  const [qty, setQty] = useState({ e1: 2, e3: 6, e4: 0, e5: 0, e8: 0 })

  const goto = (n) => { if (!confirmed && n <= step) setStep(n) }
  const next = () => {
    if (step >= 4) { setConfirmed(true); app.showToast('Comprobante PDF generado correctamente'); return }
    setStep(step + 1)
  }
  const back = () => { if (step === 0) { app.navigate('arriendos'); return } setStep(step - 1) }
  const changeQty = (id, d) => setQty((q) => ({ ...q, [id]: Math.max(0, (q[id] || 0) + d) }))

  const backLabel = step === 0 ? 'Cancelar' : 'Atrás'
  const nextLabel = step === 4 ? 'Confirmar arriendo' : (step === 3 ? 'Confirmar disponibilidad' : 'Continuar')
  const nextBg = step === 4 ? C.green : C.cyan

  return (
    <div className="ajscreen" style={{ maxWidth: 1180, margin: '0 auto' }}>
      <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-.5px', marginBottom: 4 }}>Nuevo arriendo</h1>
      <div style={{ fontSize: 13, color: C.faint, marginBottom: 22 }}>Completa los pasos para registrar y confirmar el arriendo</div>

      {/* stepper */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 26, flexWrap: 'wrap' }}>
        {LABELS.map((l, i) => {
          const done = confirmed || i < step
          const active = !confirmed && i === step
          return (
            <div key={l} style={{ display: 'flex', alignItems: 'center' }}>
              <div onClick={() => goto(i)} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                <span style={{
                  width: 30, height: 30, borderRadius: '50%',
                  background: done ? '#0096FF' : (active ? 'rgba(0,150,255,.15)' : '#161618'),
                  border: `1px solid ${active ? '#0096FF' : 'transparent'}`,
                  color: done ? '#fff' : (active ? '#4db5ff' : C.faint),
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600, flex: 'none',
                }}>{done ? '✓' : i + 1}</span>
                <span style={{ fontSize: 13, color: (done || active) ? '#fff' : C.faint, fontWeight: active ? 600 : 400, whiteSpace: 'nowrap' }}>{l}</span>
              </div>
              <span style={{ width: 34, height: 1, background: 'rgba(255,255,255,.12)', margin: '0 14px', display: i < 4 ? 'inline-block' : 'none' }} />
            </div>
          )
        })}
      </div>

      <div className="aj-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 20, alignItems: 'start' }}>
        <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 16, padding: 24, minHeight: 380 }}>
          {/* Step 0: cliente */}
          {!confirmed && step === 0 && (
            <div className="ajscreen">
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>1 · Seleccionar cliente</div>
              <div style={{ position: 'relative', marginBottom: 14 }}>
                <span style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', display: 'flex' }}><IconSearch size={16} stroke="#5c5c66" /></span>
                <input placeholder="Buscar cliente o registrar nuevo…" style={{ ...darkInput, padding: '11px 12px 11px 38px' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {clientes.slice(0, 4).map((c) => {
                  const on = clienteSel === c.id
                  return (
                    <div key={c.id} onClick={() => setClienteSel(c.id)} className="ajcard"
                      style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 13, borderRadius: 12, background: on ? 'rgba(0,150,255,.08)' : '#101013', border: `1px solid ${on ? 'rgba(0,150,255,.4)' : 'rgba(255,255,255,.06)'}`, cursor: 'pointer' }}>
                      <span style={{ width: 36, height: 36, borderRadius: 10, background: c.color + '22', color: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13 }}>{c.initials}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 600 }}>{c.nombre}</div>
                        <div style={{ fontSize: 12, color: C.mute, fontFamily: mono }}>{c.rut}</div>
                      </div>
                      {on && <IconCheck size={18} stroke={C.cyan} sw={2.5} />}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Step 1: fechas */}
          {!confirmed && step === 1 && (
            <div className="ajscreen">
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>2 · Fechas del arriendo</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 18 }}>
                <div>
                  <label style={dateLabel}>Fecha inicio</label>
                  <input defaultValue="2026-05-22" type="date" style={{ ...darkInput, colorScheme: 'dark' }} />
                </div>
                <div>
                  <label style={dateLabel}>Fecha término</label>
                  <input defaultValue="2026-05-26" type="date" style={{ ...darkInput, colorScheme: 'dark' }} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: 11, alignItems: 'center', padding: '13px 15px', borderRadius: 12, background: 'rgba(0,150,255,.06)', border: '1px solid rgba(0,150,255,.2)' }}>
                <IconClock size={18} stroke={C.cyan} />
                <div style={{ fontSize: 13, color: '#bdbdc6' }}>Periodo de <b style={{ color: '#fff' }}>4 días</b>. El sistema verificará el calendario al continuar.</div>
              </div>
            </div>
          )}

          {/* Step 2: equipos */}
          {!confirmed && step === 2 && (
            <div className="ajscreen">
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>3 · Agregar equipos</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {WIZ_EQUIPOS.map((id) => {
                  const e = equipos.find((x) => x.id === id)
                  const [iconBg, iconColor] = catColors(e.cat)
                  return (
                    <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 12, background: '#101013', border: '1px solid rgba(255,255,255,.06)' }}>
                      <span style={{ width: 34, height: 34, borderRadius: 9, background: iconBg, color: iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}><CatIcon cat={e.cat} color={iconColor} /></span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13.5, fontWeight: 500 }}>{e.nombre}</div>
                        <div style={{ fontSize: 11.5, color: C.mute, fontFamily: mono }}>{e.disp} disp · {e.precio}/día</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <button className="ajbtn" onClick={() => changeQty(id, -1)} style={stepperBtn('#1a1a1e', '1px solid rgba(255,255,255,.08)')}>−</button>
                        <span style={{ fontFamily: mono, fontSize: 14, width: 22, textAlign: 'center', fontWeight: 600 }}>{qty[id] || 0}</span>
                        <button className="ajbtn" onClick={() => changeQty(id, 1)} style={stepperBtn('#0096FF', 'none')}>+</button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Step 3: disponibilidad */}
          {!confirmed && step === 3 && (
            <div className="ajscreen">
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>4 · Verificación de disponibilidad</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                {[
                  { nombre: 'Toldo Negro 6x6m', msg: '5 de 8 disponibles en el periodo' },
                  { nombre: 'Silla Director Plegable', msg: '28 de 40 disponibles en el periodo' },
                ].map((ch) => (
                  <div key={ch.nombre} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 15px', borderRadius: 12, background: 'rgba(31,191,117,.05)', border: '1px solid rgba(31,191,117,.2)' }}>
                    <span style={{ width: 24, height: 24, borderRadius: '50%', background: '#36d98e', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}><IconCheck size={13} stroke="#06120b" sw={3} /></span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 600 }}>{ch.nombre}</div>
                      <div style={{ fontSize: 12, color: C.dim }}>{ch.msg}</div>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 600, color: '#36d98e' }}>DISPONIBLE</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 11, alignItems: 'center', padding: '14px 15px', borderRadius: 12, background: 'rgba(31,191,117,.06)', border: '1px solid rgba(31,191,117,.25)', marginTop: 14 }}>
                <IconCheck size={18} stroke={C.green} />
                <div style={{ fontSize: 13, color: '#bdbdc6' }}>Sin conflictos de fecha · stock suficiente. Puedes confirmar el arriendo.</div>
              </div>
            </div>
          )}

          {/* Step 4: confirmar / confirmado */}
          {step === 4 && (
            <div className="ajscreen">
              {confirmed ? (
                <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(31,191,117,.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}>
                    <IconCheck size={32} stroke={C.green} sw={2.5} />
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Arriendo confirmado</div>
                  <div style={{ fontSize: 13.5, color: C.dim, marginBottom: 6 }}>ARR-0490 · Productora Austral SpA</div>
                  <div style={{ fontSize: 13, color: C.mute, maxWidth: 340, margin: '0 auto 22px' }}>Fechas bloqueadas en calendario, disponibilidad actualizada y comprobante generado.</div>
                  <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                    <button className="ajbtn" onClick={() => app.showToast('Comprobante PDF descargado')} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#121214', border: '1px solid rgba(255,255,255,.1)', color: '#fff', borderRadius: 10, padding: '11px 18px', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 600, cursor: 'pointer' }}><IconFile size={15} />Comprobante PDF</button>
                    <button className="ajbtn" onClick={() => app.navigate('arriendos')} style={{ background: C.cyan, border: 'none', color: '#fff', borderRadius: 10, padding: '11px 18px', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 600, cursor: 'pointer' }}>Ver arriendos</button>
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>5 · Revisar y confirmar</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: 'rgba(255,255,255,.05)', borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(255,255,255,.06)' }}>
                    <ReviewRow label="Cliente" value="Productora Austral SpA" />
                    <ReviewRow label="Periodo" value="22 May → 26 May" mono />
                    <ReviewRow label="Equipos" value="2× Toldo Negro 6x6m · 6× Silla Director" />
                    <ReviewRow label="Total" value="$210.000" valueStyle={{ fontSize: 15, color: '#4db5ff', fontFamily: mono }} />
                  </div>
                  <div style={{ fontSize: 12.5, color: C.mute, marginTop: 14, display: 'flex', gap: 8, alignItems: 'center' }}>
                    <IconCheck size={14} stroke={C.green} />Al confirmar se generará el comprobante PDF y se bloquearán las fechas.
                  </div>
                </div>
              )}
            </div>
          )}

          {/* nav */}
          {!confirmed && (
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginTop: 24, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,.06)' }}>
              <button className="ajbtn" onClick={back} style={{ background: '#121214', border: '1px solid rgba(255,255,255,.1)', color: '#dcdce2', borderRadius: 10, padding: '11px 18px', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 600, cursor: 'pointer' }}>{backLabel}</button>
              <button className="ajbtn" onClick={next} style={{ background: nextBg, border: 'none', color: '#fff', borderRadius: 10, padding: '11px 22px', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 600, cursor: 'pointer' }}>{nextLabel}</button>
            </div>
          )}
        </div>

        {/* summary sidebar */}
        <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 16, padding: 20, position: 'sticky', top: 20 }}>
          <div style={{ fontSize: 13, color: C.mute, textTransform: 'uppercase', letterSpacing: '.6px', marginBottom: 16, fontWeight: 500 }}>Resumen</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div><div style={{ fontSize: 11.5, color: C.faint, marginBottom: 3 }}>Cliente</div><div style={{ fontSize: 14, fontWeight: 600 }}>Productora Austral SpA</div></div>
            <div><div style={{ fontSize: 11.5, color: C.faint, marginBottom: 3 }}>Periodo</div><div style={{ fontSize: 14, fontWeight: 600, fontFamily: mono }}>22 May → 26 May</div></div>
            <div style={{ height: 1, background: 'rgba(255,255,255,.06)' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}><span style={{ color: C.dim }}>2× Toldo Negro 6x6m</span><span style={{ fontFamily: mono }}>$150.000</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}><span style={{ color: C.dim }}>6× Silla Director</span><span style={{ fontFamily: mono }}>$60.000</span></div>
            </div>
            <div style={{ height: 1, background: 'rgba(255,255,255,.06)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ fontSize: 14, fontWeight: 600 }}>Total</span><span style={{ fontSize: 19, fontWeight: 700, color: '#4db5ff', fontFamily: mono }}>$210.000</span></div>
          </div>
          <button className="ajbtn" onClick={() => app.showToast('Borrador guardado')} style={{ width: '100%', marginTop: 18, background: '#121214', border: '1px solid rgba(255,255,255,.1)', color: C.dim, borderRadius: 10, padding: 10, fontFamily: 'inherit', fontSize: 12.5, cursor: 'pointer' }}>Guardar borrador</button>
        </div>
      </div>
    </div>
  )
}

function ReviewRow({ label, value, mono: isMono, valueStyle }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '13px 16px', background: '#0a0a0c' }}>
      <span style={{ fontSize: 13, color: '#9a9aa4' }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: isMono ? 600 : 600, fontFamily: isMono ? mono : 'inherit', ...valueStyle }}>{value}</span>
    </div>
  )
}

const darkInput = {
  width: '100%', background: '#000', border: '1px solid rgba(255,255,255,.1)', borderRadius: 10,
  padding: '11px 12px', color: '#fff', fontFamily: 'inherit', fontSize: 13.5, outline: 'none',
}
const dateLabel = { display: 'block', fontSize: 12, color: '#9a9aa4', marginBottom: 7 }
const stepperBtn = (bg, border) => ({
  width: 28, height: 28, borderRadius: 8, background: bg, border, color: '#fff', cursor: 'pointer',
  fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
})
