// ===== AJ Connect — iconografía (line icons) =====
// SVG simples de trazo, portados 1:1 desde el prototipo. Sin ilustraciones complejas.

function Svg({ size = 18, sw = 1.8, stroke = 'currentColor', fill = 'none', children, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={sw} style={style}>
      {children}
    </svg>
  )
}

export const IconDashboard = (p) => (
  <Svg {...p}>
    <rect x="3" y="3" width="7" height="9" rx="1.5" /><rect x="14" y="3" width="7" height="5" rx="1.5" />
    <rect x="14" y="12" width="7" height="9" rx="1.5" /><rect x="3" y="16" width="7" height="5" rx="1.5" />
  </Svg>
)

export const IconInventario = (p) => (
  <Svg {...p}>
    <path d="M21 8V5a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 5v3" />
    <path d="m3 8 9 5 9-5" />
    <path d="M3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8" />
    <path d="M12 13v8" />
  </Svg>
)

export const IconClientes = (p) => (
  <Svg {...p}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </Svg>
)

export const IconArriendos = (p) => (
  <Svg {...p}>
    <rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 10h18" /><path d="M8 15h3" />
  </Svg>
)

export const IconCalendario = (p) => (
  <Svg {...p}>
    <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
  </Svg>
)

export const IconDevoluciones = (p) => (
  <Svg {...p}>
    <path d="M9 14 4 9l5-5" /><path d="M4 9h11a5 5 0 0 1 5 5v0a5 5 0 0 1-5 5H8" />
  </Svg>
)

export const IconReportes = (p) => (
  <Svg {...p}>
    <path d="M3 3v18h18" /><rect x="7" y="11" width="3" height="6" /><rect x="12" y="7" width="3" height="10" /><rect x="17" y="13" width="3" height="4" />
  </Svg>
)

export const IconConfig = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </Svg>
)

export const IconLogout = (p) => (
  <Svg {...p}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="m16 17 5-5-5-5" /><path d="M21 12H9" />
  </Svg>
)

export const IconSearch = (p) => (
  <Svg sw={2} {...p}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></Svg>
)

export const IconPlus = (p) => (
  <Svg sw={2.2} {...p}><path d="M12 5v14M5 12h14" /></Svg>
)

export const IconBell = (p) => (
  <Svg {...p}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></Svg>
)

export const IconChevronRight = (p) => (
  <Svg sw={2} {...p}><path d="m9 18 6-6-6-6" /></Svg>
)

export const IconChevronLeft = (p) => (
  <Svg sw={2} {...p}><path d="m15 18-6-6 6-6" /></Svg>
)

export const IconCheck = (p) => (
  <Svg sw={2} {...p}><path d="M20 6 9 17l-5-5" /></Svg>
)

export const IconAlert = (p) => (
  <Svg sw={2} {...p}>
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4M12 17h.01" />
  </Svg>
)

export const IconClock = (p) => (
  <Svg sw={2} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Svg>
)

export const IconLock = (p) => (
  <Svg sw={2} {...p}><rect x="4" y="11" width="16" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></Svg>
)

export const IconClose = (p) => (
  <Svg sw={2} {...p}><path d="M18 6 6 18M6 6l12 12" /></Svg>
)

export const IconFile = (p) => (
  <Svg {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></Svg>
)

export const IconBox = (p) => (
  <Svg sw={2} {...p}>
    <path d="m7.5 4.27 9 5.15" />
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
    <path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" />
  </Svg>
)

export const IconCard = (p) => (
  <Svg sw={2} {...p}><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></Svg>
)

export const IconArriendosFilled = (p) => (
  <Svg sw={2} {...p}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 10h18" /></Svg>
)

export const IconMenu = (p) => (
  <Svg sw={2} {...p}><path d="M3 6h18M3 12h18M3 18h18" /></Svg>
)

// Iconos por categoría de equipo, con color de acento dinámico
const CAT_PATHS = {
  'Toldos': ['M3 21h18', 'M5 21V11l7-5 7 5v10', 'M9 21v-6h6v6'],
  'Sillas': ['M6 19v-7h12v7', 'M6 12V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v7', 'M6 19v2M18 19v2'],
  'Radios': ['M3.3 7 16 3', 'M5 8h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2Z', 'M8 13h.01', 'M15 12h2v4h-2z'],
  'WiFi': ['M5 12.55a11 11 0 0 1 14 0', 'M8.5 16.1a6 6 0 0 1 7 0', 'M2 8.82a15 15 0 0 1 20 0', 'M12 20h.01'],
}

export function CatIcon({ cat, color, size = 17 }) {
  const paths = CAT_PATHS[cat] || CAT_PATHS['Toldos']
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth={1.8}>
      {paths.map((d, i) => <path key={i} d={d} />)}
    </svg>
  )
}
