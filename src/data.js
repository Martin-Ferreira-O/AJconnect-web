// ===== AJ Connect — datos simulados (mock) =====
// Pensados para conectarse a una API REST. Reflejan las entidades del dominio:
// Cliente, Equipo, Arriendo (con DetalleArriendo), Reserva y Devolución.

export const clientes = [
  { id: 'c1', initials: 'PA', color: '#0096FF', nombre: 'Productora Austral SpA', rut: '76.543.210-K', empresa: 'Productora Austral', tel: '+56 9 1234 5678', email: 'contacto@austral.cl', arr: 18, activos: 2, ultimo: '13 May 2026' },
  { id: 'c2', initials: 'SF', color: '#1FBF75', nombre: 'Set Films SpA', rut: '76.898.123-4', empresa: 'Set Films', tel: '+56 9 8765 4321', email: 'hola@setfilms.cl', arr: 12, activos: 1, ultimo: '10 May 2026' },
  { id: 'c3', initials: 'CS', color: '#F5A524', nombre: 'Cine Sur Ltda.', rut: '76.111.222-3', empresa: 'Cine Sur', tel: '+56 9 2233 4455', email: 'cuentas@cinesur.cl', arr: 8, activos: 0, ultimo: '5 May 2026' },
  { id: 'c4', initials: 'CS', color: '#ff4d5e', nombre: 'Clip Studio Ltda.', rut: '77.123.456-7', empresa: 'Clip Studio', tel: '+56 9 5566 7788', email: 'studio@clip.cl', arr: 5, activos: 1, ultimo: '12 May 2026' },
  { id: 'c5', initials: 'PN', color: '#8B5CF6', nombre: 'Productora Norte SpA', rut: '76.444.555-6', empresa: 'Productora Norte', tel: '+56 9 6677 8899', email: 'norte@prodnorte.cl', arr: 3, activos: 0, ultimo: '1 May 2026' },
  { id: 'c6', initials: 'VP', color: '#F5862B', nombre: 'Volcán Producciones', rut: '76.777.888-9', empresa: 'Volcán', tel: '+56 9 9988 7766', email: 'info@volcan.cl', arr: 22, activos: 1, ultimo: '14 May 2026' },
]

export const equipos = [
  { id: 'e1', codigo: 'EQ-0847', nombre: 'Toldo Negro 6x6m', cat: 'Toldos', total: 8, disp: 5, arr: 3, estado: 'DISPONIBLE', precio: '$25.000', upd: 'Hoy 09:12' },
  { id: 'e2', codigo: 'EQ-0832', nombre: 'Toldo Negro 4x4m', cat: 'Toldos', total: 12, disp: 0, arr: 12, estado: 'EN ARRIENDO', precio: '$18.000', upd: 'Hoy 08:40' },
  { id: 'e3', codigo: 'EQ-0215', nombre: 'Silla Director Plegable', cat: 'Sillas', total: 40, disp: 28, arr: 12, estado: 'DISPONIBLE', precio: '$4.500', upd: 'Ayer 17:22' },
  { id: 'e4', codigo: 'EQ-0561', nombre: 'Radio Motorola T600', cat: 'Radios', total: 20, disp: 14, arr: 6, estado: 'DISPONIBLE', precio: '$6.000', upd: 'Hoy 10:05' },
  { id: 'e5', codigo: 'EQ-0601', nombre: 'Router WiFi Portátil', cat: 'WiFi', total: 6, disp: 1, arr: 5, estado: 'STOCK CRÍTICO', precio: '$12.000', upd: 'Hoy 11:31' },
  { id: 'e6', codigo: 'EQ-0858', nombre: 'Toldo Blanco 8x8m', cat: 'Toldos', total: 4, disp: 0, arr: 4, estado: 'EN ARRIENDO', precio: '$32.000', upd: '12 May' },
  { id: 'e7', codigo: 'EQ-0229', nombre: 'Silla Alta Maquillaje', cat: 'Sillas', total: 15, disp: 15, arr: 0, estado: 'DISPONIBLE', precio: '$5.500', upd: '08 May' },
  { id: 'e8', codigo: 'EQ-0577', nombre: 'Radio Baofeng UV-5R', cat: 'Radios', total: 24, disp: 9, arr: 13, estado: 'STOCK CRÍTICO', precio: '$3.500', upd: 'Hoy 09:50' },
  { id: 'e9', codigo: 'EQ-0310', nombre: 'Mesa Plegable Producción', cat: 'Sillas', total: 18, disp: 11, arr: 7, estado: 'DISPONIBLE', precio: '$7.000', upd: '10 May' },
  { id: 'e10', codigo: 'EQ-0142', nombre: 'Extensión Eléctrica Industrial', cat: 'WiFi', total: 30, disp: 22, arr: 5, estado: 'MANTENCIÓN', precio: '$2.500', upd: '09 May' },
]

export const arriendos = [
  { id: 'ARR-0412', cliente: 'Productora Austral SpA', rut: '76.543.210-K', ini: '13 May', fin: '20 May', estado: 'ACTIVO', total: '$420.000', pago: '$0', dias: 2,
    equipos: [{ n: 'Toldo Negro 6x6m', q: 3 }, { n: 'Silla Director Plegable', q: 8 }] },
  { id: 'ARR-0489', cliente: 'Clip Studio Ltda.', rut: '77.123.456-7', ini: '12 May', fin: '19 May', estado: 'POR VENCER', total: '$195.000', pago: '$95.000', dias: 1,
    equipos: [{ n: 'Router WiFi Portátil', q: 2 }, { n: 'Radio Motorola T600', q: 4 }] },
  { id: 'ARR-0411', cliente: 'Set Films SpA', rut: '76.898.123-4', ini: '15 May', fin: '18 May', estado: 'PENDIENTE', total: '$85.000', pago: '$85.000', dias: 4,
    equipos: [{ n: 'Radio Baofeng UV-5R', q: 2 }, { n: 'Router WiFi Portátil', q: 1 }] },
  { id: 'ARR-0418', cliente: 'Cine Sur Ltda.', rut: '76.111.222-3', ini: '10 May', fin: '13 May', estado: 'VENCIDO', total: '$125.000', pago: '$125.000', dias: -1,
    equipos: [{ n: 'Silla Director Plegable', q: 5 }] },
  { id: 'ARR-0405', cliente: 'Volcán Producciones', rut: '76.777.888-9', ini: '08 May', fin: '12 May', estado: 'DEVUELTO', total: '$240.000', pago: '$0', dias: -4,
    equipos: [{ n: 'Toldo Blanco 8x8m', q: 2 }, { n: 'Mesa Plegable Producción', q: 4 }] },
  { id: 'ARR-0398', cliente: 'Productora Norte SpA', rut: '76.444.555-6', ini: '02 May', fin: '05 May', estado: 'CANCELADO', total: '$60.000', pago: '$0', dias: -9,
    equipos: [{ n: 'Radio Baofeng UV-5R', q: 3 }] },
]

export const topEquipos = [
  { nombre: 'Silla Director Plegable', veces: 42, pct: '100%' },
  { nombre: 'Toldo Negro 6x6m', veces: 31, pct: '74%' },
  { nombre: 'Radio Motorola T600', veces: 24, pct: '57%' },
  { nombre: 'Router WiFi Portátil', veces: 18, pct: '43%' },
]

// Alertas del dashboard
export const alertas = [
  { titulo: 'Toldo Negro 6x6m vence mañana', sub: 'Productora Austral · ARR-0412', dot: '#F5A524', bg: 'rgba(245,165,36,.06)', border: 'rgba(245,165,36,.22)' },
  { titulo: '2 equipos con daño reportado', sub: 'Set Films SpA · revisar devolución', dot: '#ff4d5e', bg: 'rgba(255,77,94,.06)', border: 'rgba(255,77,94,.22)' },
  { titulo: 'Router WiFi Portátil — stock bajo', sub: 'Solo 1 de 6 disponibles', dot: '#F5A524', bg: 'rgba(245,165,36,.06)', border: 'rgba(245,165,36,.22)' },
  { titulo: 'Cine Sur — devolución pendiente', sub: 'ARR-0418 venció hace 1 día', dot: '#ff4d5e', bg: 'rgba(255,77,94,.06)', border: 'rgba(255,77,94,.22)' },
]

// Reportes
export const repKpis = [
  { label: 'Ingresos del mes', value: '$4.2M', color: '#36d98e' },
  { label: 'Arriendos cerrados', value: '38', color: '#fff' },
  { label: 'Utilización inventario', value: '72%', color: '#4db5ff' },
  { label: 'Días prom. arriendo', value: '5.3', color: '#a78bfa' },
]

export const repBars = [
  { label: 'Ene', h: '46%' }, { label: 'Feb', h: '58%' }, { label: 'Mar', h: '72%' },
  { label: 'Abr', h: '64%' }, { label: 'May', h: '100%' }, { label: 'Jun', h: '38%' },
]

export const repRank = [
  { nombre: 'Silla Director Plegable', veces: '42 arr.', pct: '100%' },
  { nombre: 'Toldo Negro 6x6m', veces: '31 arr.', pct: '74%' },
  { nombre: 'Radio Motorola T600', veces: '24 arr.', pct: '57%' },
  { nombre: 'Router WiFi Portátil', veces: '18 arr.', pct: '43%' },
  { nombre: 'Toldo Blanco 8x8m', veces: '12 arr.', pct: '29%' },
]

// Configuración — usuarios del sistema
export const cfgUsers = [
  { initials: 'JF', color: '#0096FF', avatarBg: '#0096FF22', nombre: 'José A. Farfán', email: 'jose@ajconnect.cl', rol: 'ADMIN', roleBg: 'rgba(0,150,255,.14)', roleColor: '#4db5ff' },
  { initials: 'MS', color: '#36d98e', avatarBg: '#36d98e22', nombre: 'María Soto', email: 'maria@ajconnect.cl', rol: 'ADMIN', roleBg: 'rgba(0,150,255,.14)', roleColor: '#4db5ff' },
  { initials: 'PB', color: '#f5b94e', avatarBg: '#f5b94e22', nombre: 'Pedro Bodega', email: 'pedro@ajconnect.cl', rol: 'BODEGA', roleBg: 'rgba(245,165,36,.14)', roleColor: '#f5b94e' },
]

// Calendario — puntos por día + eventos del día seleccionado (15 May)
export const calLegend = [
  { label: 'Confirmado', color: '#36d98e' }, { label: 'Pendiente', color: '#f5b94e' },
  { label: 'Bloqueado', color: '#4db5ff' }, { label: 'Reserva', color: '#a78bfa' }, { label: 'Conflicto', color: '#ff6b78' },
]

export const calDotsMap = {
  13: ['#4db5ff'], 14: ['#4db5ff', '#36d98e'], 15: ['#4db5ff', '#36d98e', '#f5b94e'],
  18: ['#4db5ff'], 20: ['#4db5ff'], 22: ['#a78bfa'], 25: ['#ff6b78'],
}

export const calDayEvents = [
  { cliente: 'Productora Austral SpA', equipos: '3 Toldos · 8 Sillas', color: '#4db5ff', estado: 'ACTIVO', arrId: 'ARR-0412' },
  { cliente: 'Clip Studio Ltda.', equipos: '2 WiFi · 4 Radios', color: '#36d98e', estado: 'ACTIVO', arrId: 'ARR-0489' },
  { cliente: 'Set Films SpA', equipos: '2 Radios · 1 WiFi', color: '#f5b94e', estado: 'PENDIENTE', arrId: 'ARR-0411' },
]
