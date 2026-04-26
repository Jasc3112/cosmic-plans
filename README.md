# Cronograma inesperado ✨

Página estática con tema mezcla de **Hora de Aventura + Steven Universe**. Una colección de tarjetas de planes para que una persona elija con un sistema simple:

- **1 click** sobre la tarjeta → "Me interesa"
- **Doble click** → "Tal vez, lo pienso"
- **Click de nuevo** → deselecciona

Las elecciones se guardan en `localStorage`. Al final, la página renderiza una tarjeta-resumen lista para **capturar como imagen** y compartir por WhatsApp / Snapchat / Discord / Instagram (vía Web Share API o descarga de PNG).

> Live: <https://jasc3112.github.io/cosmic-plans/>

---

## 🔄 Flujo de respuestas (sin GitHub, sin login)

La amiga **no necesita cuenta de GitHub**, ni de nada. En la pantalla final tiene 3 botones:

1. **📤 Compartir** → abre el share-sheet nativo del teléfono (WhatsApp / Snapchat / Discord / Instagram / etc.) con la imagen del resumen adjunta. Disponible donde el navegador soporte `navigator.share` con archivos (Chrome Android, Safari iOS modernos).
2. **📸 Guardar imagen** → descarga la tarjeta-resumen como `cronograma-inesperado.png` para que la mande manualmente.
3. **📋 Copiar texto** → copia el resumen en markdown al portapapeles (fallback de texto).

Si el dispositivo no soporta share con archivos, la página cae automáticamente a descargar la imagen. Captura de pantalla manual también funciona — la tarjeta está diseñada para ser screenshot-friendly.

---

## 🛠 Despliegue (ya hecho)

El repo ya está en `Jasc3112/cosmic-plans` con GitHub Pages activo.

Para futuros cambios, desde esta carpeta:

```bash
cd "d:/jesus/Documents/Claude Project/03-proyectos/cosmic-plans"
git add .
git commit -m "tu mensaje"
git push
```

Pages rebuilda solo en ~30-60s.

### Identidad git (configurada localmente en este repo)

```ini
user.name  = Jasc3112
user.email = jesusalexander3112@gmail.com
```

---

## 🧪 Probar localmente

```bash
cd "d:/jesus/Documents/Claude Project/03-proyectos/cosmic-plans"
python -m http.server 8000
# abre http://localhost:8000
```

Algunas APIs (clipboard, share) requieren `http://` o `https://`, no `file://`.

---

## 📝 Editar los planes

Los planes están en `script.js` en el array `PLANS`:

```js
{ id: 'identificador-unico', emoji: '🌟', title: 'Nombre', desc: 'Descripción...' }
```

Edita el array → `git push` → Pages rebuilda.

---

## 🎨 Decisiones de diseño

- **Paleta:** Bubblegum pastel, lavanda Steven Universe, menta BMO, garnet, fondo noche estrellada.
- **Tipografía:** *Bubblegum Sans* (titulares Adventure Time-y), *Quicksand* (cuerpo).
- **Tarjeta-resumen capturable:** diseñada para verse bien como screenshot vertical de móvil.
- **Generación de imagen:** `html2canvas` desde CDN (sin build step).
- **Easter eggs ligeros:**
  - BMO flotante con frases random al elegir.
  - Mensaje contextual por tarjeta (probabilidad ~45%).
  - Botón BMO permanente abajo-izquierda.
  - Tipea `stars` en el teclado para un guiño cósmico.

---

## 🚫 Lo que NO incluye

- Precios.
- El cronograma sugerido (queda como plan privado).
- Tracking, cookies, analítica.
- Backend ni base de datos.
- Tokens, claves o credenciales.
