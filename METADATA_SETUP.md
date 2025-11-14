# Metadatos y Assets de Biblioteca Pandora

## ✅ Archivos Creados

### Favicons e Iconos
- `app/icon.png` - Icono principal de Next.js (192x192)
- `public/icon-192.png` - PWA icon 192x192
- `public/icon-512.png` - PWA icon 512x512
- `public/apple-icon.png` - Apple Touch Icon 180x180

### Open Graph (WhatsApp/Redes Sociales)
- `public/og-image.png` - Imagen principal para compartir (1200x630)
- `public/og-image.svg` - Versión SVG editable

### PWA
- `public/manifest.json` - Web App Manifest

## 🎨 Colores Utilizados
- **Fondo degradado**: `#3B82F6` → `#1E40AF` (azul)
- **Tema principal**: `#3B82F6` (blue-500)
- **Background app**: `#FFFBF0` (cream)

## 📱 Vista Previa en WhatsApp
Cuando compartas el link de la web, se mostrará:
- ✅ Título: "Biblioteca Pandora"
- ✅ Descripción: "Retos diarios para pequeños exploradores. Desafía tu mente con matemáticas y lectura crítica."
- ✅ Imagen: Fondo azul con logo y texto

## 🔧 Configuración en `app/layout.tsx`
Se configuraron los siguientes metadatos:
- Open Graph (Facebook, WhatsApp)
- Twitter Cards
- Iconos multi-tamaño
- PWA manifest
- Theme color

## 📝 Variables de Entorno Recomendadas
Agrega a tu `.env`:
```
NEXT_PUBLIC_BASE_URL=https://tu-dominio.com
```

## 🚀 Próximos Pasos
1. Commit y push los cambios
2. Despliega en Vercel
3. Prueba compartir el link en WhatsApp para ver la preview
4. Si quieres personalizar la imagen OG, edita `public/og-image.svg`

## 🎨 Personalización
Para cambiar la imagen de Open Graph:
1. Edita `public/og-image.svg` con tu diseño
2. Convierte a PNG con: `qlmanage -t -s 1200 -o . og-image.svg && mv og-image.svg.png og-image.png`
3. O reemplaza directamente `public/og-image.png` con tu imagen (1200x630 px)
