// ===== AJ Connect — sistema de estilo =====
// Paleta y mapeos de estado/categoría. Centraliza los valores usados en el prototipo.
import { createElement } from 'react'

export const C = {
  bg: '#000',
  sidebar: '#08080a',
  panel: '#0a0a0c',
  card: '#0d0d10',
  cardAlt: '#101013',
  cyan: '#0096FF',
  cyanBright: '#00A3FF',
  cyanSoft: '#4db5ff',
  text: '#fff',
  dim: '#9a9aa4',
  mute: '#7d7d87',
  faint: '#6c6c76',
  green: '#1FBF75',
  greenSoft: '#36d98e',
  amber: '#F5A524',
  amberSoft: '#f5b94e',
  red: '#ff4d5e',
  redSoft: '#ff6b78',
  purple: '#8B5CF6',
  purpleSoft: '#a78bfa',
  border: 'rgba(255,255,255,.07)',
  borderSoft: 'rgba(255,255,255,.06)',
  borderFaint: 'rgba(255,255,255,.04)',
}

// Estilo semántico de badges/estados -> [bgColor, textColor]
const ESTADO = {
  'ACTIVO': ['rgba(31,191,117,.14)', '#36d98e'],
  'CONFIRMADO': ['rgba(31,191,117,.14)', '#36d98e'],
  'DISPONIBLE': ['rgba(31,191,117,.14)', '#36d98e'],
  'OK': ['rgba(31,191,117,.14)', '#36d98e'],
  'DEVUELTO': ['rgba(255,255,255,.07)', '#9a9aa4'],
  'PENDIENTE': ['rgba(245,165,36,.14)', '#f5b94e'],
  'POR VENCER': ['rgba(245,165,36,.14)', '#f5b94e'],
  'EN ARRIENDO': ['rgba(0,150,255,.14)', '#4db5ff'],
  'MANTENCIÓN': ['rgba(0,150,255,.14)', '#4db5ff'],
  'STOCK CRÍTICO': ['rgba(245,165,36,.16)', '#f5b94e'],
  'VENCIDO': ['rgba(255,77,94,.14)', '#ff6b78'],
  'CONFLICTO': ['rgba(255,77,94,.14)', '#ff6b78'],
  'CANCELADO': ['rgba(255,77,94,.12)', '#ff6b78'],
  'DAÑADO': ['rgba(255,77,94,.14)', '#ff6b78'],
  'DADO DE BAJA': ['rgba(255,255,255,.06)', '#6c6c76'],
}

export function estadoStyle(e) {
  return ESTADO[e] || ['rgba(255,255,255,.07)', '#9a9aa4']
}

export function dotColor(e) {
  return estadoStyle(e)[1]
}

// Colores de fondo/acento por categoría de equipo -> [bgColor, iconColor]
const CAT = {
  'Toldos': ['rgba(0,150,255,.12)', '#4db5ff'],
  'Sillas': ['rgba(139,92,246,.14)', '#a78bfa'],
  'Radios': ['rgba(31,191,117,.13)', '#36d98e'],
  'WiFi': ['rgba(0,212,255,.12)', '#3bd6f0'],
}

export function catColors(cat) {
  return CAT[cat] || CAT['Toldos']
}

// Estilo de chip/filtro (activo vs inactivo)
export function chipStyle(active) {
  return active
    ? { bg: 'rgba(0,150,255,.14)', border: 'rgba(0,150,255,.4)', color: '#4db5ff', weight: 600 }
    : { bg: '#0d0d10', border: 'rgba(255,255,255,.08)', color: '#9a9aa4', weight: 400 }
}

// Badge reutilizable a partir de un estado.
// Se usa createElement (en vez de JSX) para que este módulo siga siendo .js puro.
export function Badge({ estado, style }) {
  const [bg, color] = estadoStyle(estado)
  return createElement('span', {
    style: {
      fontSize: 10.5, fontWeight: 600, letterSpacing: '.4px', padding: '4px 10px',
      borderRadius: 20, background: bg, color, whiteSpace: 'nowrap', ...style,
    },
  }, estado)
}
