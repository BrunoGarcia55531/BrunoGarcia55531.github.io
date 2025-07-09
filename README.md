# 🚀 SmartCompare Frontend

Frontend del proyecto **SmartCompare** para el curso CS2031 - Desarrollo Basado en Plataformas (DBP), enfocado en facilitar la comparación de productos usados en eBay con análisis inteligente, favoritos y recomendaciones personalizadas.

---

## 🏗️ Instalación y Setup

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/smartcompare-frontend.git
   cd smartcompare-frontend
   ```
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Crea un archivo `.env` en la raíz:
   ```env
   VITE_API_URL=https://tu-backend-desplegado.com
   VITE_ENV=production
   ```
   > Para desarrollo local, usa `VITE_API_URL=http://localhost:8080`

4. Inicia el entorno de desarrollo:
   ```bash
   npm run dev
   ```

5. Para build de producción:
   ```bash
   npm run build
   npm run preview
   ```

---

## 🌐 Deploy

- **Vercel/Netlify:**
  1. Sube el repo a GitHub.
  2. Importa el proyecto en Vercel/Netlify.
  3. Configura las variables de entorno (`VITE_API_URL`).
  4. Despliega la rama principal.

- **Docker (opcional):**
  Crea un archivo `Dockerfile`:
  ```Dockerfile
  # Stage 1: Build
  FROM node:20-alpine as build
  WORKDIR /app
  COPY . .
  RUN npm install && npm run build

  # Stage 2: Serve static
  FROM nginx:alpine
  COPY --from=build /app/dist /usr/share/nginx/html
  EXPOSE 80
  CMD ["nginx", "-g", "daemon off;"]
  ```

---

## ⚠️ Manejo de Errores y Seguridad

- **Rutas protegidas:**
  - Usa el componente `ProtectedRoute` para proteger vistas privadas.
  - Redirección automática a `/login` si el token expira o es inválido.
- **Toasts globales:**
  - Feedback visual para éxito/error en todas las acciones.
- **ErrorBoundary:**
  - Captura errores de React a nivel global.
- **Axios Interceptors:**
  - Manejo global de errores HTTP y redirección en 401.

---

## 📦 Estructura de Carpetas

- `src/contexts/AuthContext.tsx` — Contexto de usuario y token JWT
- `src/components/layout/ProtectedRoute.tsx` — Rutas protegidas
- `src/components/layout/ErrorBoundary.tsx` — Manejo global de errores
- `src/components/ui/ToastProvider.tsx` — Sistema de notificaciones
- `src/utils/api.ts` — Configuración de Axios y manejo de errores

---

## 🧪 Pruebas y QA

- Prueba login, búsqueda, favoritos, historial y recomendaciones.
- Verifica redirecciones y feedback visual.
- Usa `npm run preview` para probar el build antes de deploy.

---

## 📚 Recursos

- [React Docs](https://reactjs.org/)
- [TailwindCSS](https://tailwindcss.com/docs)
- [React Router 6](https://reactrouter.com/)
- [Axios Docs](https://axios-http.com/)
- [eBay Browse API](https://developer.ebay.com/api-docs/buy/browse/overview.html)

---

MIT © 2025 - SmartCompare Team
