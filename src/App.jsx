import { useState, useEffect, useRef } from 'react'
import { C } from './theme.js'
import Sidebar from './components/Sidebar.jsx'
import Topbar from './components/Topbar.jsx'
import DetailPanel from './components/DetailPanel.jsx'
import Toast from './components/Toast.jsx'
import Login from './screens/Login.jsx'
import Dashboard from './screens/Dashboard.jsx'
import Inventario from './screens/Inventario.jsx'
import Clientes from './screens/Clientes.jsx'
import Arriendos from './screens/Arriendos.jsx'
import Calendario from './screens/Calendario.jsx'
import NuevoArriendo from './screens/NuevoArriendo.jsx'
import Devoluciones from './screens/Devoluciones.jsx'
import Reportes from './screens/Reportes.jsx'
import Configuracion from './screens/Configuracion.jsx'

const CRUMB = {
  dashboard: 'Dashboard', inventario: 'Inventario', clientes: 'Clientes', arriendos: 'Arriendos',
  calendario: 'Calendario', devoluciones: 'Devoluciones', reportes: 'Reportes',
  config: 'Configuración', nuevo: 'Nuevo arriendo',
}

export default function App() {
  const [screen, setScreen] = useState('login')
  const [detail, setDetail] = useState(null) // {type, id}
  const [toast, setToast] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const toastTimer = useRef(null)
  const mainRef = useRef(null)

  const showToast = (msg) => {
    setToast(msg)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(''), 2600)
  }
  useEffect(() => () => clearTimeout(toastTimer.current), [])

  const navigate = (s) => {
    setScreen(s)
    setDetail(null)
    setSidebarOpen(false)
    if (mainRef.current) mainRef.current.scrollTop = 0
  }
  const openDetail = (type, id) => setDetail({ type, id })
  const closeDetail = () => setDetail(null)
  const startWizard = () => { setDetail(null); navigate('nuevo') }
  const logout = () => { setDetail(null); setScreen('login') }

  const app = { screen, navigate, openDetail, closeDetail, showToast, startWizard, logout }

  if (screen === 'login') {
    return <Login app={app} />
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: C.bg, color: C.text }}>
      <div
        className={'aj-sidebar-scrim' + (sidebarOpen ? ' is-open' : '')}
        onClick={() => setSidebarOpen(false)}
      />
      <Sidebar app={app} open={sidebarOpen} />

      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', background: C.bg }}>
        <Topbar app={app} crumb={CRUMB[screen] || ''} onMenu={() => setSidebarOpen(true)} />
        <main ref={mainRef} className="aj-main" style={{ flex: 1, overflowY: 'auto', padding: '30px 34px 60px' }}>
          {screen === 'dashboard' && <Dashboard app={app} />}
          {screen === 'inventario' && <Inventario app={app} />}
          {screen === 'clientes' && <Clientes app={app} />}
          {screen === 'arriendos' && <Arriendos app={app} />}
          {screen === 'calendario' && <Calendario app={app} />}
          {screen === 'nuevo' && <NuevoArriendo app={app} />}
          {screen === 'devoluciones' && <Devoluciones app={app} />}
          {screen === 'reportes' && <Reportes app={app} />}
          {screen === 'config' && <Configuracion app={app} />}
        </main>
      </div>

      <DetailPanel app={app} detail={detail} />
      <Toast msg={toast} />
    </div>
  )
}
