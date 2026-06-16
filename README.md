# AJ Connect — Web

Plataforma web interna de **gestión de inventario y arriendos** para AJ Connect, empresa
de arriendo de equipamiento logístico (toldos, radios, mobiliario) para producciones de
eventos y audiovisuales.

Esta es la versión **web de alta fidelidad** reinterpretada para escritorio/tablet a partir
del diseño móvil original (Claude Design). Reemplaza la gestión manual en Excel: inventario,
clientes, arriendos, reservas, devoluciones, calendario, comprobantes y reportes con
trazabilidad y control de overbooking.

## Stack

- **React 18** + **Vite 5** (JavaScript / JSX)
- Sin dependencias de UI externas: estilos a medida fieles al diseño (dark SaaS, acento cian)
- Tipografía: **Sora** (interfaz) + **JetBrains Mono** (códigos, montos, fechas)

## Cómo ejecutar

```bash
npm install
npm run dev      # servidor de desarrollo en http://localhost:5173
npm run build    # build de producción en dist/
npm run preview  # sirve el build de producción
```

**Acceso:** la pantalla de login acepta cualquier correo + contraseña no vacíos
(p. ej. `jose@ajconnect.cl`). La validación de error se dispara con campos vacíos.

## Módulos

| Módulo | Descripción |
|---|---|
| **Login** | Acceso oscuro con marca AJ CONNECT, estado de error y aviso de sesión segura |
| **Dashboard** | 5 KPIs, alertas, próximos arriendos, equipos más arrendados, acciones rápidas |
| **Inventario** | Tabla con buscador, filtros por categoría, badges de estado y panel de detalle |
| **Clientes** | Tabla con buscador y perfil con historial de arriendos |
| **Nuevo arriendo** | Wizard de 5 pasos: cliente → fechas → equipos → disponibilidad → confirmar + PDF |
| **Arriendos** | Tabs por estado con contadores, totales y pagos pendientes |
| **Calendario** | Mes de Mayo 2026 con marcadores por estado, panel del día y detección de conflictos |
| **Devoluciones** | Recepción equipo por equipo (OK / Dañado / Faltante) con cobro por daño |
| **Reportes** | KPIs, gráfico de barras, ranking y exportación PDF/Excel |
| **Configuración** | Datos de empresa, usuarios con roles ADMIN/BODEGA y cierre de sesión |

Componentes globales: sidebar fija (colapsa a menú en tablet/móvil), topbar con buscador y
acción rápida, slide-over de detalle, toasts y badges de estado semánticos.

## Estructura

```
src/
  main.jsx            # punto de entrada
  App.jsx             # estado global, ruteo por pantalla y layout
  styles.css          # estilos globales, fuentes, animaciones, responsive
  theme.js            # paleta y mapeos de estado/categoría
  data.js             # datos simulados (clientes, equipos, arriendos, reportes…)
  icons.jsx           # iconografía SVG de trazo
  components/         # Sidebar, Topbar, DetailPanel, Toast
  screens/            # una pantalla por módulo
```

## Notas

- **Datos simulados:** la UI usa mocks realistas en `src/data.js`, pensados para conectarse
  a una API REST (módulos Auth / Inventory / Client / Rental / Calendar / Report / PDF).
- **Responsive:** desktop-first; la sidebar colapsa a menú hamburguesa y las tablas se
  vuelven desplazables en pantallas pequeñas.
- Acciones como generar PDF, exportar o guardar borrador muestran confirmación visual (toast)
  pero no persisten — son el contrato de UI listo para integrar el backend.
