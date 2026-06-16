import { IconCheck } from '../icons.jsx'

export default function Toast({ msg }) {
  if (!msg) return null
  return (
    <div style={{
      position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 90,
      display: 'flex', alignItems: 'center', gap: 11, background: '#0d1a12',
      border: '1px solid rgba(31,191,117,.4)', color: '#fff', padding: '13px 18px', borderRadius: 12,
      boxShadow: '0 16px 50px rgba(0,0,0,.6)', animation: 'ajfade .3s ease both',
    }}>
      <span style={{ width: 22, height: 22, borderRadius: '50%', background: '#1FBF75', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
        <IconCheck size={13} stroke="#06120b" sw={3} />
      </span>
      <span style={{ fontSize: 13.5, fontWeight: 500 }}>{msg}</span>
    </div>
  )
}
