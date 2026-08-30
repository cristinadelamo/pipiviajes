# PipiGastos Móvil (módulo móvil)

Mini-app independiente para apuntar gastos desde el móvil, sin conexión a internet ni al
servidor de casa. Todo se guarda en el propio móvil (localStorage del navegador). Tiene dos
modos:

- **Gastos Sueltos**: para el día a día (Comunes, Personales Xtina, Personales Javi). Al
  llegar a casa, con el móvil en la red de casa, se **sincroniza directamente** contra la
  principal (sin fichero de por medio) — o, como respaldo, se puede exportar un `.json` y
  subirlo a mano en PipiGastos → **Importar desde Móvil** (barra lateral, sección General).
- **Viajes**: para apuntar los gastos desglosados de un viaje concreto. Al terminar el viaje
  se exporta un `.json` que se sube en PipiGastos desde Modo Viaje → "Importar desde móvil".

## Probarlo en local

```bash
cd mobile
npm install
npm run dev
```

## Publicar en GitHub Pages

1. Crea un repo nuevo en GitHub (puede ser público o privado con GitHub Pages activado en el plan que tengas).
2. Sube **solo el contenido de esta carpeta `mobile/`** como raíz del repo (o todo el proyecto y configura Pages para que sirva desde `/mobile`, pero es más simple subir esta carpeta sola).
3. Genera el build:
   ```bash
   npm run build
   ```
   Esto crea `mobile/dist/` con los ficheros estáticos listos.
4. Sube el contenido de `dist/` a la rama `gh-pages` del repo (o configura GitHub Actions/Pages para que lo haga automáticamente en cada push). La forma más simple sin Actions:
   ```bash
   npx gh-pages -d dist
   ```
   (la primera vez pedirá instalar el paquete `gh-pages`, acepta).
5. En GitHub → Settings → Pages, confirma que la fuente es la rama `gh-pages`. La URL quedará algo así:
   `https://<tu-usuario>.github.io/<nombre-del-repo>/`
6. Desde el móvil, abre esa URL en Safari/Chrome y usa "Añadir a pantalla de inicio" para tenerla como un icono más, a pantalla completa.

## Uso — Gastos Sueltos

1. Desde la pantalla de inicio, entra en **Gastos Sueltos**.
2. **Apuntar Gasto** cuantas veces haga falta (fecha, importe, concepto, cuenta —
   Comunes/Xtina/Javi—, estado y opcionalmente deuda).
3. Al llegar a casa, con el móvil conectado a la red de casa: pulsa el icono ⚙️ arriba a la
   derecha para poner la URL de la principal (ej. `https://192.168.31.29:3050`) y pulsa
   **Sincronizar**. Cada gasto se sube directamente como transacción real (con un código por
   defecto por cuenta) y, si se confirma, se borra ya del móvil. Los que fallen se quedan en
   la lista para reintentar.
   - La primera vez, si el navegador da un aviso de certificado no seguro, abre esa misma URL
     directamente en el navegador del móvil y acéptalo antes de sincronizar — si no, el
     `fetch()` de la sincronización fallará aunque la web se vea bien.
4. Si no hay red o falla la sincronización, usa **Exportar respaldo (.json)** → descarga un
   `.json` con el nombre `gastos_sueltos_<fecha>.json` (sin borrar nada de la lista) y súbelo
   a mano en PipiGastos → **Importar desde Móvil** (barra lateral) → asigna un código a cada
   línea (por cuenta) y pulsa **Importar**.
5. Si has usado el `.json`, vuelve al móvil y pulsa **Vaciar lista** — solo después de
   comprobar que se han importado bien en casa (sincronizar los borra solo).

## Uso — Viajes

1. Desde la pantalla de inicio, entra en **Viajes** → **Nuevo Viaje** → nombre y fechas.
2. Dentro del viaje, **Apuntar Gasto** cuantas veces haga falta (fecha, importe, concepto, forma de pago, y opcionalmente deuda).
3. Al terminar, pulsa **Exportar** → descarga un `.json` con el nombre `viaje_<nombre>_<fecha>.json`.
4. En casa, en PipiGastos → Modo Viaje → **Importar desde móvil** → selecciona ese `.json`.
   Crea el viaje y todas sus líneas de desglose de golpe, exactamente igual que si las hubieras
   apuntado a mano — con la salvedad de que ninguna línea queda vinculada todavía a un gasto
   real de Comunes (eso se hace después, igual que con cualquier desglose).

## Notas

- Si borras la app del móvil o los datos del navegador antes de exportar, se pierde lo que
  no se haya exportado — no hay copia en ningún otro sitio.
- Gastos Sueltos y Viajes se guardan por separado en el móvil; puedes tener varios viajes
  guardados a la vez, cada uno se exporta por separado.
- Reimportar el mismo `.json` de un viaje dos veces da un aviso en vez de duplicarlo. El
  import de Gastos Sueltos no tiene esa detección — no reimportes el mismo fichero dos veces.
