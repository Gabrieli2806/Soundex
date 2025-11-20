# Soundex - Educación Musical Moderna

Una página web moderna y elegante para aprender los fundamentos de la música, con diseño Glassmorphism, soporte multiidioma y diseño completamente responsivo.

## 🌟 Características

### Diseño y UI
- **Glassmorphism UI**: Efecto de cristal moderno y elegante
- **Diseño Responsivo**: Perfectamente adaptado a móviles, tablets y desktops
- **Dark Mode**: Tema oscuro incluido y guardado en localStorage
- **Animaciones Suaves**: Transiciones fluidas y efectos visuales modernos

### Idiomas
- **Español** (idioma por defecto)
- **English** (Inglés)
- Sistema de traducción dinámico almacenado en localStorage

### Secciones Educativas

#### 🎼 Armonía
- Conceptos de acordes
- Progresiones armónicas
- Tipos de acordes (Mayor, Menor, Disminuido, Aumentado)

#### ⏱️ Rítmica
- Conceptos del pulso y compás
- Figuras rítmicas (Redonda, Blanca, Negra, Corchea)
- Estructura temporal de la música

#### 🎵 Solfeo
- Las 7 notas musicales
- Pentagrama y claves musicales
- Lectura de partituras

## 📁 Estructura de Archivos

```
Soundex/
├── index.html          # Archivo HTML principal
├── styles.css          # Estilos con Glassmorphism
├── script.js           # Funcionalidades interactivas
├── translations.js     # Sistema de traducción multiidioma
└── README.md           # Este archivo
```

## 🚀 Cómo Usar

### Opción 1: Abrir directamente
1. Descarga o clona el repositorio
2. Abre `index.html` en tu navegador web
3. ¡Listo! La página está completamente funcional

### Opción 2: Con servidor local (recomendado)
```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (si tienes http-server instalado)
http-server

# Con Live Server en VS Code
# Instala la extensión "Live Server" y haz clic derecho en index.html
```

Luego abre `http://localhost:8000` (o el puerto indicado) en tu navegador.

## ✨ Funcionalidades

### 1. **Cambio de Idioma**
- Selector en la barra de navegación
- Se guarda la preferencia en localStorage
- Cambia todo el contenido dinámicamente

### 2. **Modo Oscuro**
- Botón de toggling en la navbar
- Se guarda la preferencia en localStorage
- Compatible con todos los componentes

### 3. **Modales Interactivos**
- Haz clic en "Aprender Más" para abrir detalles
- Cierra con el botón X, ESC o clickeando fuera
- Animaciones suaves de entrada/salida

### 4. **Navegación Suave**
- Links de navegación con scroll suave
- Indicador visual de sección activa
- Navbar fija en la parte superior

### 5. **Formulario de Contacto**
- Validación de campos
- Formulario responsivo
- Confirmación al enviar

## 🎨 Colores y Diseño

### Paleta de Colores Predeterminada
- **Primario**: #6366f1 (Indigo)
- **Secundario**: #a78bfa (Purple)
- **Fondo**: Gradiente morado (667eea → 764ba2)
- **Dark Mode**: Tema oscuro automático

### Glassmorphism
- Efecto de cristal con backdrop-filter blur(10px)
- Bordes semitransparentes
- Sombras suaves
- Hover effects elegantes

## 📱 Responsividad

- **Desktop**: Diseño completo con múltiples columnas
- **Tablet**: Adaptación de grid (768px)
- **Mobile**: Diseño single-column optimizado (480px)

## 🔧 Personalización

### Cambiar Colores
Edita las variables CSS en `styles.css`:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #a78bfa;
    /* ... más variables */
}
```

### Agregar Nuevas Secciones
1. Agrega el HTML en `index.html`
2. Agrega las traducciones en `translations.js`
3. Agrega los estilos en `styles.css`
4. Agrega la funcionalidad en `script.js` si es necesaria

### Agregar Nuevo Idioma
1. Abre `translations.js`
2. Agrega un nuevo objeto de idioma:
```javascript
const translations = {
    es: { ... },
    en: { ... },
    fr: { ... }  // Nuevo idioma
};
```
3. Agrega la opción al select de idiomas en `index.html`

## 🐛 Solución de Problemas

### Las imágenes no se cargan
Las imágenes son placeholders. Reemplazalos con URLs reales:
```html
<img src="URL_DE_TU_IMAGEN" alt="Descripción">
```

### El idioma no se guarda
- Asegúrate que localStorage esté habilitado
- Limpia el caché del navegador
- Revisa la consola para errores

### Modal no abre/cierra
- Revisa que los IDs coincidan en HTML
- Verifica que JavaScript esté cargado correctamente
- Usa la consola para debugging

## 📝 Licencia

Libre para uso personal y educativo.

## 🎯 Futuras Mejoras

- [ ] Agregar lecciones interactivas
- [ ] Sistema de ejercicios
- [ ] Reproductor de audio integrado
- [ ] Tests y evaluaciones
- [ ] Dashboard de progreso
- [ ] Backend para guardar progreso de usuarios

## 📧 Contacto

Para preguntas o sugerencias, usa el formulario de contacto en la página.

---

**Soundex** - Educación Musical Moderna ✨🎵
