# Plan-O-Verso ✨

Página estática con tema mezcla de **Hora de Aventura + Steven Universe**. Una colección de tarjetas de planes para que una persona elija con un sistema simple:

- **1 click** sobre la tarjeta → "Me interesa"
- **Doble click** → "Tal vez, lo pienso"
- **Click de nuevo** → deselecciona

Los precios no aparecen. Las elecciones se guardan en `localStorage` y al final se sincronizan en GitHub creando un Issue en este repo.

---

## 🛠 Cómo desplegar (cuenta Jasc3112)

### 1. Crear el repo en GitHub

1. Entra a https://github.com/new (logueado como `Jasc3112`).
2. Nombre del repo: `cosmic-plans`
3. Visibilidad: **Public** (necesario para GitHub Pages gratis).
4. NO marques "Initialize with README" (ya lo tenemos).
5. Click "Create repository".

### 2. Subir el código

Desde esta carpeta (`03-proyectos/cosmic-plans`):

```bash
cd "d:/jesus/Documents/Claude Project/03-proyectos/cosmic-plans"
git init
git add .
git commit -m "Initial commit — Plan-O-Verso ✨"
git branch -M main
git remote add origin https://github.com/Jasc3112/cosmic-plans.git
git push -u origin main
```

> Nota de identidad: si quieres que el commit aparezca con la cuenta `Jasc3112`, asegúrate de tener configurado:
> ```bash
> git config user.name "Jasc3112"
> git config user.email "jesusalexander3112@gmail.com"
> ```
> (Solo en este repo. Se aplicará dentro de la carpeta del proyecto.)

### 3. Activar GitHub Pages

1. Ve al repo en GitHub → **Settings** → **Pages** (menú lateral).
2. Source: **Deploy from a branch**.
3. Branch: `main` / `/ (root)` → **Save**.
4. Espera ~1 min. La URL final será:
   ```
   https://jasc3112.github.io/cosmic-plans/
   ```

### 4. (Opcional) Etiqueta para Issues

Para que el botón "Enviar" cree los issues con la etiqueta `respuestas`:

1. Repo → **Issues** → **Labels** → **New label**
2. Nombre: `respuestas`, color a tu gusto.

(Si no la creas, GitHub la crea sola al primer issue, no pasa nada.)

---

## 🔄 Cómo se sincronizan las respuestas

El botón **"Enviar (crear issue en GitHub)"** abre una URL pre-llenada:

```
https://github.com/Jasc3112/cosmic-plans/issues/new?title=...&body=...
```

- Tu amiga solo necesita estar logueada en **cualquier cuenta de GitHub** (no tiene que ser la tuya) y darle "Submit new issue".
- El issue queda en tu repo, listo para revisar cuando quieras.

### Si no tiene cuenta de GitHub
La página tiene un botón **"📋 Copiar texto"** que copia el resumen en markdown al portapapeles. Ella te lo pega por WhatsApp/Telegram y listo.

> 🔒 **Por qué no usamos un token automático:** un token (PAT) embebido en JS quedaría visible públicamente en el repo. Para un proyecto personal no vale el riesgo. El flujo de URL pre-llenada es seguro y solo añade un click.

---

## 🧪 Probar localmente antes de subir

Sirve la carpeta con cualquier servidor estático. Por ejemplo, con Python:

```bash
cd "d:/jesus/Documents/Claude Project/03-proyectos/cosmic-plans"
python -m http.server 8000
```

Luego abre: http://localhost:8000

(Abrir `index.html` directamente con doble click también funciona, pero algunas APIs como `clipboard` se comportan mejor en `http://`.)

---

## ⚙️ Configuración

En `script.js` arriba del archivo:

```js
const CONFIG = {
  githubUser: 'Jasc3112',
  githubRepo: 'cosmic-plans',
};
```

Si renombras el repo, actualiza `githubRepo` aquí.

---

## 📝 Editar los planes

Los planes están en `script.js` en el array `PLANS`. Cada uno tiene:

```js
{ id: 'identificador-unico', emoji: '🌟', title: 'Nombre', desc: 'Descripción...' }
```

Si quieres añadir/quitar planes, edita ese array y haz `git push`. GitHub Pages refresca solo en ~1 min.

---

## 🎨 Decisiones de diseño

- **Paleta:** mezcla de Bubblegum (rosa pastel), Steven Universe (lavanda, púrpura cósmico), Garnet (rojo cereza), BMO (menta, celeste), y noche estrellada.
- **Tipografía:** *Bubblegum Sans* para títulos (vibe AT), *Quicksand* para cuerpo (limpia, redondita).
- **Easter eggs:**
  - BMO flotante abajo-izquierda con frases random al elegir.
  - Mensaje contextual por tarjeta (con probabilidad).
  - Disclaimer central: *"esto no son citas… a menos que tú quieras que lo sean"*.
  - Botón BMO permanente (esquina inferior izquierda).
  - Tipea `stars` en cualquier momento para un guiño cósmico ✨.

---

## 🚫 Lo que NO incluye (a propósito)

- Precios (a petición).
- El cronograma sugerido (eso queda como tu plan privado, no se muestra).
- Tracking, cookies, analítica.
- Backend.
