## 🔄 Flujos Principales de Usuario

Esta sección describe los flujos clave que el usuario puede realizar dentro de la aplicación **SmartCompare**, junto con los endpoints involucrados, pantallas usadas y el resultado esperado en cada caso.

---

### 🔐 1. Inicio de sesión y autenticación

🎯 *Acceder al sistema como usuario registrado*

- **Pantalla:** `/login`
- **Pasos:**
  1. El usuario ingresa su email y contraseña
  2. Se envía la solicitud al backend
  3. El token JWT se guarda en localStorage
  4. Se redirige al dashboard

- **Endpoint:** `POST /api/auth/login`
- ✅ **Resultado esperado:** sesión iniciada correctamente

---

### 👤 2. Registro de nuevo usuario

🎯 *Crear una cuenta para usar SmartCompare*

- **Pantalla:** `/register`
- **Pasos:**
  1. El usuario llena sus datos
  2. Se envía el formulario
  3. Se redirige al login

- **Endpoint:** `POST /api/auth/register`
- ✅ **Resultado esperado:** usuario registrado y redirigido a login

---

### 🔍 3. Búsqueda de productos y ranking inteligente

🎯 *Buscar productos y ver los mejores según el análisis del sistema*

- **Pantalla:** `/search`
- **Pasos:**
  1. El usuario busca un término (ej. “iPhone”)
  2. Se hace la búsqueda en eBay desde el backend
  3. Se guardan los términos en el historial
  4. Se muestran resultados ordenados por ranking

- **Endpoints:**
  - `GET /api/products/ebay/search?query=...`
  - `POST /api/search-history?terms=...`

- ✅ **Resultado esperado:** resultados relevantes mostrados con badge “TOP”

---

### 🛍 4. Ver detalles de un producto

🎯 *Revisar la información completa de un producto de eBay*

- **Pantalla:** `/product/:id`
- **Pasos:**
  1. El usuario hace clic en un producto
  2. Se muestra la vista extendida con todos los detalles
  3. Puede agregar o quitar de favoritos

- **Endpoints:**
  - `GET /api/products/{id}`
  - `POST /api/favorites`
  - `DELETE /api/favorites/{id}`

- ✅ **Resultado esperado:** vista completa del producto y favorito actualizado

---

### ❤️ 5. Ver y gestionar favoritos

🎯 *Ver los productos marcados como favoritos*

- **Pantalla:** `/favorites`
- **Pasos:**
  1. Se cargan los favoritos del usuario
  2. Se puede eliminar productos guardados

- **Endpoints:**
  - `GET /api/favorites/user/{userId}?page=0&size=10`
  - `DELETE /api/favorites/{id}`

- ✅ **Resultado esperado:** favoritos listados correctamente

---

### 🕘 6. Ver historial de búsquedas

🎯 *Consultar términos de búsqueda anteriores*

- **Pantalla:** `/history`
- **Pasos:**
  1. Se muestra la lista de búsquedas anteriores
  2. Se puede repetir una búsqueda con un clic

- **Endpoint:** `GET /api/search-history/user/{userId}`
- ✅ **Resultado esperado:** historial mostrado y búsquedas repetidas fácilmente

---

### 🤖 7. Ver recomendaciones personalizadas

🎯 *Recibir sugerencias automáticas de productos*

- **Pantalla:** `/recommendations`
- **Pasos:**
  1. Se muestran recomendaciones generadas por el sistema
  2. Se pueden explorar o ver detalle

- **Endpoint:** `GET /api/recommendations/user/{userId}`
- ✅ **Resultado esperado:** recomendaciones relevantes para el usuario

---

### ⚖️ 8. Crear una comparación entre productos

🎯 *Comparar productos seleccionados antes de decidir una compra*

- **Pantalla:** `/compare/new`
- **Pasos:**
  1. El usuario selecciona productos desde la búsqueda
  2. Se envía la solicitud de comparación
  3. Se redirige a la vista de comparaciones

- **Endpoint:** `POST /api/comparisons`
- ✅ **Resultado esperado:** comparación guardada y mostrada

---

### 📊 9. Ver comparaciones anteriores

🎯 *Consultar comparaciones ya realizadas*

- **Pantalla:** `/comparisons`
- **Pasos:**
  1. Se cargan las comparaciones del usuario
  2. Se pueden eliminar o revisar en detalle

- **Endpoints:**
  - `GET /api/comparisons/paged`
  - `DELETE /api/comparisons/{id}`

- ✅ **Resultado esperado:** historial de comparaciones útil y manejable

---
