# Plan de Proyecto — DAG2 Construcciones S.A. de C.V.

## 1. Descripción del Proyecto
Página web corporativa single-page para DAG2 Construcciones S.A. de C.V., empresa de construcción, arquitectura y gestión de proyectos con sede en Celaya, Guanajuato, México. El sitio debe proyectar profesionalismo, solidez y experiencia en el sector construcción, orientado a clientes industriales, comerciales y residenciales.

## 2. Estructura de Páginas
- `/` — Página principal (single page) con secciones:
  - Inicio (Hero)
  - Quiénes Somos
  - Servicios
  - Clientes
  - Proyectos
  - Contacto

## 3. Características Principales
- [ ] Navegación fija con smooth scroll
- [ ] Hero con lema "Diseño · Gestión · Construcción" y métricas
- [ ] Sección "Quiénes Somos" con historia, misión y visión
- [ ] Grid de servicios con tarjetas interactivas
- [ ] Sección de clientes con logos/nombres
- [ ] Portafolio de proyectos con tarjetas
- [ ] Formulario de contacto con WhatsApp integration
- [ ] Diseño responsivo (móvil y escritorio)
- [ ] Animaciones suaves en transiciones
- [ ] Internacionalización (español)

## 4. Modelo de Datos
No requiere base de datos. Todo el contenido es estático y se gestionará mediante archivos de mock data.

## 5. Integraciones de Backend / Terceros
- **Supabase:** No requerido.
- **Shopify:** No requerido.
- **Stripe:** No requerido.
- **Otros:** Enlaces directos a WhatsApp y redes sociales (Facebook, Instagram, LinkedIn).

## 6. Plan de Desarrollo por Fases

### Fase 1: UI Principal — Single Page
- **Objetivo:** Construir la página principal completa con todas las secciones, navegación, estilos y mock data.
- **Entregables:**
  - Página `home/page.tsx` con todas las secciones
  - Componentes reutilizables (Header, Footer, SectionWrapper, ProjectCard, ServiceCard, ClientLogo)
  - Mock data para servicios, proyectos y clientes
  - Configuración de i18n en español
  - SEO en `index.html`
  - Estilos con Tailwind (fondo oscuro, acentos verdes)
  - Animaciones suaves

### Fase 2: Interacciones y Refinamiento
- **Objetivo:** Agregar interacciones, animaciones scroll, formulario de contacto funcional, botón WhatsApp.
- **Entregables:**
  - Smooth scroll para navegación
  - Animaciones de entrada por sección
  - Formulario de contacto con validación
  - Botón flotante de WhatsApp
  - Ajustes responsivos finales
  - Optimización de imágenes y performance

## Notas
- Diseño single page con navegación por anchor links.
- Paleta: fondo oscuro (#0f1115), acentos verdes (#22c55e), tipografía clara (#f8fafc).
- Imágenes generadas mediante Stable Diffusion para servicios, proyectos y hero.