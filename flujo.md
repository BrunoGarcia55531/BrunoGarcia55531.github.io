
### 🧭 Experiencia de Usuario Completa (UX + API)

SmartCompare guía al usuario en su recorrido desde el registro hasta la comparación de productos. Esta sección describe cómo cada acción del usuario está conectada a un endpoint del backend y una vista específica del frontend.

---

### 1. 🧑‍💼 **Registro y Login**

**Flujo:**

* El usuario se registra con su nombre, email y contraseña.
* Recibe un correo de bienvenida (asincrónico).
* Inicia sesión y recibe un JWT.

**Endpoints usados:**

* `POST /api/auth/register`
* `POST /api/auth/login`

**Vistas:**
`/register`, `/login`

**UX Destacada:**

* Validación en tiempo real
* Toasts de éxito y error
* Redirección automática al dashboard

---

### 2. 🔍 **Búsqueda de Productos**

**Flujo:**

* El usuario ingresa un término de búsqueda.
* El sistema consulta la eBay API desde el backend.
* Se muestra un ranking inteligente con productos destacados.

**Endpoints usados:**

* `GET /api/products/ebay/search?query=...`
* Internamente usa: eBay Browse API + ranking inteligente

**Vistas:**
`/search`

**UX Destacada:**

* Loader mientras se cargan resultados
* Resultados ordenados con etiquetas de “TOP”
* Paginación o scroll infinito (a implementar)

---

### 3. 🧡 **Gestión de Favoritos**

**Flujo:**

* El usuario puede marcar productos como favoritos.
* Puede acceder, ver y eliminar sus favoritos.

**Endpoints usados:**

* `POST /api/favorites`
* `GET /api/favorites/user/{userId}`
* `DELETE /api/favorites/{id}`

**Vistas:**
`/favorites`, dentro de `ProductDetail`

**UX Destacada:**

* Botón de toggle favorito (❤️ / 🤍)
* Lista paginada de productos guardados
* Feedback visual y accesibilidad

---

### 4. 🕘 **Historial de Búsquedas**

**Flujo:**

* Cada búsqueda realizada se guarda automáticamente.
* El usuario puede ver y repetir búsquedas pasadas.

**Endpoints usados:**

* `POST /api/search-history`
* `GET /api/search-history/user/{userId}`

**Vistas:**
`/history`

**UX Destacada:**

* Timeline o lista cronológica
* Botón para repetir búsqueda
* Estado vacío con mensaje motivador

---

### 5. 🤖 **Recomendaciones Inteligentes**

**Flujo:**

* El sistema analiza búsquedas y favoritos para generar sugerencias.
* El usuario puede ver sus recomendaciones personalizadas.

**Endpoints usados:**

* `GET /api/recommendations/user/{userId}`
* `POST /api/recommendations` (manual, si se desea extender)

**Vistas:**
`/recommendations`

**UX Destacada:**

* Explicación del porqué de la sugerencia
* Diseño diferenciado para recomendaciones
* Vista personalizada según comportamiento

---

### 6. ⚖️ **Comparaciones de Productos**

**Flujo:**

* El usuario selecciona varios productos para comparar.
* El sistema permite guardar, consultar y eliminar comparaciones.

**Endpoints usados:**

* `POST /api/comparisons`
* `GET /api/comparisons/paged`
* `DELETE /api/comparisons/{id}`

**Vistas:**
`/comparisons` (a implementar)

**UX Destacada:**

* Comparación visual lado a lado
* Tabla con atributos clave
* Comparaciones guardadas para referencia futura

---

### 7. 🛒 **Gestión de Productos**

**Flujo:**

* El usuario accede a detalles extendidos del producto.
* Puede visitar el enlace original en eBay.

**Endpoints usados:**

* `GET /api/products/{id}`
* `GET /api/products`

**Vistas:**
`/product/:id`

**UX Destacada:**

* Imagen grande, título, precio, condición, ubicación
* Acción rápida para favorito
* Enlace externo con ícono claro

---

### 🧪 Código de ejemplo con Axios

```ts
// Login
const res = await axios.post('/api/auth/login', { email, password });
localStorage.setItem('token', res.data.token);

// Búsqueda
const { data } = await axios.get('/api/products/ebay/search', {
  params: { query: 'laptop' },
  headers: { Authorization: `Bearer ${token}` }
});
const productos = data.ebayResponse.items;

// Guardar favorito
await axios.post('/api/favorites', { productId, userId }, {
  headers: { Authorization: `Bearer ${token}` }
});
```

---

### ✅ Resumen: UX Completa y Modular
| Función                             | Método HTTP | Request Body         | Backend URI                                         | Response Body                  |
| ----------------------------------- | ----------- | -------------------- | --------------------------------------------------- | ------------------------------ |
| 🔐 **Autenticación**                |             |                      |                                                     |                                |
| Login de usuario                    | POST        | `AuthRequest`        | `/api/auth/login`                                   | `AuthResponse`                 |
| Registro de usuario                 | POST        | `UserDTO`            | `/api/auth/register`                                | `AuthResponse`                 |
| Obtener usuario por email           | GET         | -                    | `/api/users/by-email?email={email}`                 | `UserDTO`                      |
| Crear usuario manualmente           | POST        | `UserDTO`            | `/api/users`                                        | `UserDTO`                      |
| 📦 **Productos y Búsqueda**         |             |                      |                                                     |                                |
| Obtener productos (paginado)        | GET         | -                    | `/api/products?page=0&size=10&sortBy=id`            | `List<ProductDTO>`             |
| Obtener producto por ID             | GET         | -                    | `/api/products/{id}`                                | `ProductDTO`                   |
| Crear nuevo producto                | POST        | `ProductDTO`         | `/api/products`                                     | `ProductDTO`                   |
| Buscar productos en eBay            | GET         | -                    | `/api/products/ebay/search?query=...`               | `EbaySearchAndRankingResponse` |
| ⭐ **Favoritos**                     |             |                      |                                                     |                                |
| Ver favoritos del usuario           | GET         | -                    | `/api/favorites/user/{userId}?page=0&size=10`       | `Page<FavoriteDTO>`            |
| Agregar producto a favoritos        | POST        | `FavoriteDTO`        | `/api/favorites`                                    | `FavoriteDTO`                  |
| Eliminar favorito                   | DELETE      | -                    | `/api/favorites/{id}`                               | vacío (204)                    |
| Ver todos los favoritos             | GET         | -                    | `/api/favorites`                                    | `List<FavoriteDTO>`            |
| Obtener favorito por ID             | GET         | -                    | `/api/favorites/{id}`                               | `FavoriteDTO`                  |
| ⚖️ **Comparaciones**                |             |                      |                                                     |                                |
| Obtener todas las comparaciones     | GET         | -                    | `/api/comparisons`                                  | `List<ComparisonDTO>`          |
| Obtener comparaciones paginadas     | GET         | -                    | `/api/comparisons/paged?page=0&size=10`             | `Page<ComparisonDTO>`          |
| Obtener comparación por ID          | GET         | -                    | `/api/comparisons/{id}`                             | `ComparisonDTO`                |
| Crear comparación                   | POST        | `ComparisonDTO`      | `/api/comparisons`                                  | `ComparisonDTO`                |
| Eliminar comparación                | DELETE      | -                    | `/api/comparisons/{id}`                             | vacío (204)                    |
| 🕘 **Historial de Búsquedas**       |             |                      |                                                     |                                |
| Ver historial por usuario           | GET         | -                    | `/api/search-history/user/{userId}?page=0&size=10`  | `Page<SearchHistoryDTO>`       |
| Guardar nueva búsqueda              | POST        | - (con `?terms=...`) | `/api/search-history?terms=...`                     | `SearchHistoryDTO`             |
| Obtener historial por ID            | GET         | -                    | `/api/search-history/{id}`                          | `SearchHistoryDTO`             |
| 🎯 **Recomendaciones**              |             |                      |                                                     |                                |
| Obtener recomendaciones del usuario | GET         | -                    | `/api/recommendations/user/{userId}?page=0&size=10` | `Page<RecommendationDTO>`      |
| Crear recomendación manual          | POST        | `RecommendationDTO`  | `/api/recommendations`                              | `RecommendationDTO`            |
| Eliminar recomendación              | DELETE      | -                    | `/api/recommendations/{id}`                         | vacío (204)                    |
| Obtener todas las recomendaciones   | GET         | -                    | `/api/recommendations`                              | `List<RecommendationDTO>`      |
| Obtener recomendación por ID        | GET         | -                    | `/api/recommendations/{id}`                         | `RecommendationDTO`            |

Ahora que tenemos **todos los fetches (endpoints)** definidos y organizados, te presento una **tabla unificada** que describe:

* `URL` → Ruta en el frontend
* `Funcionalidades principales` → Qué hace esa vista, qué fetches usa
* `Redirects` → Qué pasa después de una acción (login, guardar, eliminar, etc.)

Esta tabla servirá como **guía de implementación y validación UX/UI** para tu equipo.

---

### 🧭 Tabla de Vistas UI/UX + Funcionalidad y Redirección

| URL Frontend          | Funcionalidades Principales                                                                                                             | Endpoints usados                                                                  | Redirección / Navegación                          |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------- |
| `/login`              | - Ingreso de usuario con email y contraseña<br>- Validación y login con JWT                                                             | `POST /api/auth/login`                                                            | Si login es exitoso → `/dashboard`                |
| `/register`           | - Registro de nuevo usuario<br>- Envío de bienvenida por correo                                                                         | `POST /api/auth/register`                                                         | Si registro es exitoso → `/login`                 |
| `/dashboard`          | - Bienvenida al usuario<br>- Vista general del sistema<br>- Acceso rápido a búsqueda, favoritos, historial y recomendaciones            | `GET /api/users/by-email`                                                         | —                                                 |
| `/search`             | - Input de búsqueda<br>- Llamada a eBay y ranking inteligente<br>- Listado de productos ordenados<br>- Guardado automático en historial | `GET /api/products/ebay/search`<br>`POST /api/search-history?terms=...`           | —                                                 |
| `/product/:id`        | - Detalles del producto<br>- Agregar a favoritos o quitar<br>- Enlace a eBay                                                            | `GET /api/products/{id}`<br>`POST /api/favorites`<br>`DELETE /api/favorites/{id}` | Si se elimina el favorito → permanencia en página |
| `/favorites`          | - Lista paginada de productos favoritos<br>- Botón para quitar                                                                          | `GET /api/favorites/user/{userId}?page=0&size=10`<br>`DELETE /api/favorites/{id}` | Si lista vacía → mostrar estado vacío             |
| `/history`            | - Historial de búsquedas del usuario<br>- Posibilidad de repetir búsqueda                                                               | `GET /api/search-history/user/{userId}`                                           | Si repite una búsqueda → `/search?query=...`      |
| `/recommendations`    | - Lista de recomendaciones para el usuario<br>- Mostradas por relevancia y explicación                                                  | `GET /api/recommendations/user/{userId}`                                          | —                                                 |
| `/comparisons`        | - Lista de comparaciones previas<br>- Posibilidad de eliminar<br>- Visualización de atributos clave en tabla                            | `GET /api/comparisons/paged`<br>`DELETE /api/comparisons/{id}`                    | Si comparación eliminada → recargar vista         |
| `/compare/new`        | - Crear nueva comparación seleccionando productos<br>- Enviar lista de `ProductDTO` seleccionados para análisis                         | `POST /api/comparisons`                                                           | Si éxito → `/comparisons`                         |
| `/comparison/:id`     | - Ver detalles de una comparación específica<br>- Mostrar atributos comparados (precio, condición, ubicación, etc.)                     | `GET /api/comparisons/{id}`                                                       | —                                                 |
| `/profile` (opcional) | - Ver datos del usuario actual<br>- Logout, configuración (opcional)                                                                    | `GET /api/users/by-email`                                                         | Logout → `/login`                                 |
| `/404`                | - Página de error personalizada para rutas inexistentes                                                                                 | —                                                                                 | —                                                 |

---

### 🧩 Consideraciones UX Adicionales

* ✅ Todas las rutas que requieren autenticación deben usar un componente `ProtectedRoute`.
* ✅ Redirección automática si el token ha expirado (`401 Unauthorized`).
* ✅ Loader mientras se carga cada vista o fetch.
* ✅ Toasts (éxito, error) para cada acción.
* ✅ Componentes reutilizables para producto (`ProductCard`), botón de favorito, historial, etc.
* ✅ Enlace externo (nuevo tab) a eBay desde la vista `/product/:id`.

---

### 📄 Sugerencia para Implementación Técnica

Puedes definir una constante con las rutas y su metadata en un archivo:

```ts
// routes/routeMeta.ts
export const routes = [
  { path: '/login', private: false, title: 'Login' },
  { path: '/dashboard', private: true, title: 'Dashboard' },
  ...
];
```

---

¡Excelente! A continuación te presento cómo debería quedar la **estructura de páginas (`pages/`)** de tu frontend en React para el proyecto **SmartCompare**, con:

* Nombre del archivo
* Descripción funcional
* Componentes principales usados
* Hooks y servicios relacionados

Esto servirá como guía para estructurar el desarrollo y saber **qué debe hacer cada página**.

---

## 🗂️ Estructura de `src/pages/`

| Archivo / Página               | Descripción funcional                                         | Componentes principales                     | Hooks / Servicios usados                              |
| ------------------------------ | ------------------------------------------------------------- | ------------------------------------------- | ----------------------------------------------------- |
| `LoginPage.tsx`                | Formulario de login con validación y autenticación JWT        | `AuthForm`, `ToastProvider`                 | `useAuth`, `AuthService.login`                        |
| `RegisterPage.tsx`             | Registro de usuario nuevo, envío de datos a backend           | `AuthForm`                                  | `AuthService.register`                                |
| `DashboardPage.tsx`            | Bienvenida al usuario + accesos rápidos a funcionalidades     | `Layout`, `CardLink`, `RecommendationList`  | `useUser`, `useUserRecommendations`                   |
| `SearchPage.tsx`               | Búsqueda de productos eBay, muestra ranking, guarda historial | `SearchForm`, `ProductList`, `TopBadge`     | `useApi`, `useSearchHistory`, `ProductService.search` |
| `ProductDetailPage.tsx`        | Detalle completo del producto con botón de favoritos          | `ProductDetail`, `FavoriteButton`, `Loader` | `ProductService.getById`, `useFavorites`              |
| `FavoritesPage.tsx`            | Lista paginada de favoritos del usuario                       | `FavoriteList`, `Pagination`, `EmptyState`  | `useFavorites`, `FavoriteService.getByUser`           |
| `HistoryPage.tsx`              | Historial de búsquedas con opción de volver a ejecutar        | `HistoryList`, `SearchHistoryItem`          | `useSearchHistory`                                    |
| `RecommendationsPage.tsx`      | Recomendaciones personalizadas para el usuario                | `RecommendationList`, `RecommendationCard`  | `useUserRecommendations`                              |
| `ComparisonsPage.tsx`          | Lista de comparaciones guardadas y opción de eliminar         | `ComparisonList`, `ConfirmationDialog`      | `useComparisons`, `useDeleteComparison`               |
| `CreateComparisonPage.tsx`     | Selección de productos y creación de comparación              | `CreateComparisonForm`, `ProductList`       | `useCreateComparison`                                 |
| `ComparisonDetailPage.tsx`     | Comparación específica entre varios productos                 | `ComparisonTable`                           | `useComparisonDetail`                                 |
| `NotFoundPage.tsx`             | Página para rutas no válidas (404)                            | `EmptyState` o diseño especial              | —                                                     |
| `ProfilePage.tsx` *(opcional)* | Ver datos del usuario, logout, cambiar contraseña, etc.       | `UserInfoCard`, `Button`, `LogoutButton`    | `useAuth`, `UserService`                              |

---

## 🧠 Consejos de organización

1. **Ubicación recomendada:**

```
src/
└── pages/
    ├── Auth/
    │   ├── LoginPage.tsx
    │   └── RegisterPage.tsx
    ├── Product/
    │   ├── SearchPage.tsx
    │   ├── ProductDetailPage.tsx
    ├── User/
    │   ├── DashboardPage.tsx
    │   ├── FavoritesPage.tsx
    │   ├── HistoryPage.tsx
    │   ├── RecommendationsPage.tsx
    │   └── ProfilePage.tsx
    ├── Comparison/
    │   ├── ComparisonsPage.tsx
    │   ├── CreateComparisonPage.tsx
    │   └── ComparisonDetailPage.tsx
    └── NotFoundPage.tsx
```

2. **Cada página debe importar los hooks que necesite** y solo pasar props a los componentes visuales (`ProductCard`, `ComparisonTable`, etc.).

3. **Las páginas deben ser "containers"**: es decir, enfocadas en manejar lógica y datos, y luego renderizar componentes puros.


### 📦 Estructura de Código

#### 📄 Interfaces TypeScript (DTOs)

Los siguientes archivos definen los tipos usados para consumir la API. Se ubican en `src/interfaces/`:

| Archivo                           | Descripción                                             |
| --------------------------------- | ------------------------------------------------------- |
| `UserDTO.ts`                      | Datos del usuario: `id`, `email`, `nombre`, `rol`, etc. |
| `AuthRequest.ts`                  | Datos enviados en el login (`email`, `password`)        |
| `AuthResponse.ts`                 | Token JWT y datos de usuario retornados                 |
| `ProductDTO.ts`                   | Datos del producto local o de eBay                      |
| `EbaySearchAndRankingResponse.ts` | Resultado de la búsqueda eBay con ranking               |
| `FavoriteDTO.ts`                  | Favorito: relación entre usuario y producto             |
| `ComparisonDTO.ts`                | Comparaciones guardadas entre productos                 |
| `SearchHistoryDTO.ts`             | Búsquedas realizadas por el usuario                     |
| `RecommendationDTO.ts`            | Recomendaciones personalizadas generadas por el sistema |

> 💡 Todas las interfaces están sincronizadas con los DTOs del backend en Spring Boot.

---

#### 🔧 Servicios de Consumo de API (Axios)

Los servicios se ubican en `src/services/` y encapsulan las llamadas HTTP a los endpoints del backend.

| Servicio                   | Funcionalidades implementadas                                                    |
| -------------------------- | -------------------------------------------------------------------------------- |
| `AuthService.ts`           | `login`, `register`                                                              |
| `UserService.ts`           | `getUserByEmail`, `createUser`                                                   |
| `ProductService.ts`        | `getAllProducts`, `getProductById`, `searchEbay`, `createProduct`                |
| `FavoriteService.ts`       | `getFavoritesByUser`, `addFavorite`, `removeFavorite`                            |
| `ComparisonService.ts`     | `getAllComparisons`, `getComparisonById`, `createComparison`, `deleteComparison` |
| `SearchHistoryService.ts`  | `getSearchHistoryByUser`, `saveSearch`                                           |
| `RecommendationService.ts` | `getRecommendationsByUser`, `createRecommendation`, `deleteRecommendation`       |

> 🔒 Todos los servicios utilizan `axios` con configuración de token JWT a través de interceptores.

---

## 🧱 COMPONENTES REUTILIZABLES – CATEGORIZADOS

### 1. 🔧 **UI Genéricos (puros)**

Ubicación: `src/components/ui/`

| Componente          | Función                                                              |
| ------------------- | -------------------------------------------------------------------- |
| `Button.tsx`        | Botón reutilizable con variantes (primario, secundario, icon-button) |
| `Input.tsx`         | Input básico con label, error y estilos                              |
| `Textarea.tsx`      | Campo de texto largo (opcional)                                      |
| `Select.tsx`        | Dropdown selector                                                    |
| `Loader.tsx`        | Spinner o loading con animación                                      |
| `Modal.tsx`         | Modal reutilizable para confirmaciones o formularios                 |
| `ToastProvider.tsx` | Sistema de notificaciones con éxito / error                          |
| `Pagination.tsx`    | Paginador reutilizable para resultados                               |

---

### 2. 🧩 **Layout y Navegación**

Ubicación: `src/components/layout/`

| Componente           | Función                                       |
| -------------------- | --------------------------------------------- |
| `Navbar.tsx`         | Barra superior con logo, navegación y logout  |
| `Sidebar.tsx`        | Opcional: navegación lateral si lo usas       |
| `Footer.tsx`         | Pie de página                                 |
| `Layout.tsx`         | Estructura principal (Navbar + children)      |
| `ProtectedRoute.tsx` | Redirección si el usuario no está autenticado |
| `ErrorBoundary.tsx`  | Captura de errores a nivel de componentes     |

---

### 3. 🛍 **Productos**

Ubicación: `src/components/product/`

| Componente          | Función                                                  |
| ------------------- | -------------------------------------------------------- |
| `ProductCard.tsx`   | Tarjeta de producto (imagen, precio, botón de favoritos) |
| `ProductList.tsx`   | Lista de `ProductCard` con paginación o scroll infinito  |
| `ProductDetail.tsx` | Detalles completos (vista extendida)                     |
| `SearchForm.tsx`    | Input de búsqueda y botón                                |
| `TopBadge.tsx`      | Badge tipo "TOP 1" o "TOP 3" según ranking               |

---

### 4. ❤️ **Favoritos**

Ubicación: `src/components/favorites/`

| Componente           | Función                                   |
| -------------------- | ----------------------------------------- |
| `FavoriteList.tsx`   | Lista de productos favoritos del usuario  |
| `FavoriteButton.tsx` | Botón toggle para agregar/quitar favorito |

---

### 5. 🕘 **Historial**

Ubicación: `src/components/history/`

| Componente              | Función                                        |
| ----------------------- | ---------------------------------------------- |
| `SearchHistoryItem.tsx` | Mostrar búsqueda anterior + botón para repetir |
| `HistoryList.tsx`       | Lista de búsquedas cronológicas                |

---

### 6. 🤖 **Recomendaciones**

Ubicación: `src/components/recommendations/`

| Componente               | Función                                         |
| ------------------------ | ----------------------------------------------- |
| `RecommendationCard.tsx` | Tarjeta de producto con motivo de recomendación |
| `RecommendationList.tsx` | Lista de recomendaciones para el usuario        |

---

### 7. ⚖️ **Comparaciones**

Ubicación: `src/components/comparisons/`

| Componente                 | Función                                          |
| -------------------------- | ------------------------------------------------ |
| `ComparisonTable.tsx`      | Vista comparativa entre varios productos         |
| `ComparisonList.tsx`       | Lista de comparaciones guardadas                 |
| `CreateComparisonForm.tsx` | Formulario para seleccionar productos a comparar |

---

### 8. 💬 **Estados y feedback**

Ubicación: `src/components/ui/` o `src/components/common/`

| Componente               | Función                                                    |
| ------------------------ | ---------------------------------------------------------- |
| `EmptyState.tsx`         | Mostrar cuando no hay favoritos / resultados / historial   |
| `ErrorMessage.tsx`       | Mostrar mensaje si hay error al cargar datos               |
| `ConfirmationDialog.tsx` | Confirmar acciones destructivas (borrar comparación, etc.) |

---

## 📐 Consejos de Arquitectura

* Usa **props tipadas con interfaces** (`interface ProductCardProps { ... }`)
* Aplica **estilos con TailwindCSS** para mantener consistencia
* Separa lógica de presentación cuando crezca la complejidad (por ejemplo, `useProductCardLogic`)
* Mantén los componentes **lo más puros y declarativos posible**
