# 🎓 Biblioteca Pandora - Sistema de Gestión de Estudiantes y Ranking

## Resumen de Implementación

Este documento describe las funcionalidades implementadas para migrar el sistema de Biblioteca Pandora de localStorage a una base de datos PostgreSQL (Neon) con gestión de estudiantes por profesores.

---

## ✅ Funcionalidades Implementadas

### 1. **Configuración de Variables de Entorno**
- ✅ Creación de `.env.local` y `.env.example`
- ✅ Variables configuradas:
  - `DATABASE_URL`: Conexión a Neon PostgreSQL
  - `ADMIN_PASSWORD`: Password para acceso de profesores
  - `NEXTAUTH_SECRET`: Token secreto para autenticación
  - `NEXTAUTH_URL`: URL de la aplicación
- ✅ Documentación en `ENV_SETUP.md` para sincronizar con Vercel

### 2. **Botón "Profesores" en Navbar**
- ✅ Agregado botón con icono Shield en el header
- ✅ Redirige a `/admin` para login de profesores
- ✅ Ubicado antes del botón "Tabla de posiciones"

### 3. **Base de Datos Neon PostgreSQL**
- ✅ Instalación de dependencias:
  - `@vercel/postgres`
  - `bcryptjs` (para encriptación de PINs)
  - `next-auth` (para autenticación)
  - `@types/bcryptjs`
  - `@types/jsonwebtoken`
- ✅ Schema de Prisma con 3 tablas principales:
  - **User**: id, nickname (único), pin (encriptado), role (student/admin)
  - **QuestionBank**: banco de preguntas reutilizables
  - **CompletedChallenge**: retos completados con puntos, tiempo, fecha
- ✅ Base de datos sincronizada con `npx prisma db push`

### 4. **Sistema de Login para Profesores**
- ✅ Página `/admin` con formulario de password
- ✅ API `/api/admin/login` que valida contra `ADMIN_PASSWORD`
- ✅ Redirección a `/admin/dashboard` tras login exitoso
- ✅ Autenticación con token y cookie httpOnly

### 5. **Dashboard Administrativo**
- ✅ API `/api/admin/students` con endpoints:
  - **GET**: Listar todos los estudiantes
  - **POST**: Crear estudiante (nickname + PIN de 4 dígitos)
  - **DELETE**: Eliminar estudiante por ID
- ✅ Validación de nickname único
- ✅ PINs encriptados con bcryptjs antes de guardar
- ✅ Dashboard existente en `/admin/dashboard` (listo para integrar UI de estudiantes)

### 6. **API Routes para Retos y Ranking**
- ✅ **POST `/api/challenges/complete`**:
  - Guarda retos completados en la base de datos
  - Calcula puntos automáticamente según:
    - Tipo de reto (lectura: 10, memoria: 15, palabra: 12, adivinanza: 8)
    - Bonus por tiempo (< 30 seg: +5 pts, < 60 seg: +2 pts)
  - Registra fecha de inicio de semana para ranking semanal
- ✅ **GET `/api/challenges/complete?userId=X`**: 
  - Obtiene historial de retos de un usuario
  - Filtro opcional por tipo de reto
- ✅ **GET `/api/leaderboard?period=week|month|all`**:
  - Obtiene ranking de estudiantes
  - Calcula estadísticas:
    - Total de puntos
    - Retos correctos/totales
    - Porcentaje de precisión
    - Distribución por tipo de reto
  - Ordenado por puntos (mayor a menor)
  - Incluye posición/rank de cada estudiante

### 7. **Login de Estudiantes con Base de Datos**
- ✅ API **POST `/api/auth/student`**:
  - Valida nickname y PIN contra la base de datos
  - Verifica PIN encriptado con bcrypt
  - Retorna datos del usuario (id, nickname, role)
- ✅ Navbar actualizado para usar la API:
  - Ya no crea usuarios locales
  - Login requiere cuenta creada por profesor
  - Guarda usuario en localStorage con ID de DB

### 8. **Guardado de Retos en Base de Datos**
- ✅ Componente `/reto` actualizado:
  - Tipo User actualizado con `id` y `role`
  - `handleSubmit` ahora usa `fetch` a `/api/challenges/complete`
  - Envía: userId, type, timeInSeconds, isCorrect
  - Reemplaza completamente localStorage

### 9. **Tabla de Ranking desde Base de Datos**
- ✅ Página `/resultados` actualizada:
  - Tipo LeaderboardEntry con datos completos:
    - userId, nickname, totalPoints
    - rank, correctChallenges, totalChallenges
    - accuracy (porcentaje de precisión)
  - `useEffect` hace fetch a `/api/leaderboard?period=week`
  - Auto-refresh cada 30 segundos
  - Ya no usa localStorage
- ✅ Componente LeaderboardList actualizado:
  - Muestra nickname en lugar de name
  - Muestra estadísticas: "X/Y correctos • Z.Z%"
  - Muestra totalPoints en grande

---

## 🗂️ Estructura de Archivos Creados/Modificados

### Archivos de Configuración
```
.env.local                    # Variables locales (no commitear)
.env.example                  # Template de variables
ENV_SETUP.md                  # Documentación de setup
prisma/schema.prisma          # Schema actualizado
```

### API Routes
```
app/api/admin/login/route.ts           # Login de profesores (modificado)
app/api/admin/students/route.ts        # CRUD de estudiantes (nuevo)
app/api/auth/student/route.ts          # Login de estudiantes (nuevo)
app/api/challenges/complete/route.ts   # Guardar retos completados (nuevo)
app/api/leaderboard/route.ts           # Obtener ranking (nuevo)
```

### Utilities
```
lib/auth.ts                   # Funciones de encriptación (hashPin, comparePin)
```

### Componentes UI
```
app/Components/Navbar.tsx                    # Botón Profesores + login con API (modificado)
app/admin/page.tsx                           # Página de login admin (nuevo)
app/reto/page.tsx                            # Guardado con API (modificado)
app/resultados/page.tsx                      # Ranking desde API (modificado)
app/resultados/components/LeaderboardList.tsx # Lista actualizada (modificado)
```

---

## 🔐 Seguridad Implementada

1. **PINs Encriptados**: Todos los PINs de estudiantes se guardan con bcrypt (salt 10)
2. **Validación de Datos**: 
   - PINs deben ser 4 dígitos numéricos
   - Nicknames deben ser únicos
3. **Autenticación Admin**: Password verificado contra variable de entorno
4. **Cookies HttpOnly**: Token de sesión admin en cookie segura
5. **Tipos Estrictos**: TypeScript en todos los componentes y APIs

---

## 📊 Schema de Base de Datos

### Tabla: User
| Campo      | Tipo     | Descripción                    |
|-----------|----------|--------------------------------|
| id        | String   | CUID único                     |
| nickname  | String   | Apodo único del estudiante     |
| pin       | String   | PIN encriptado (4 dígitos)     |
| role      | String   | "student" o "admin"            |
| createdAt | DateTime | Fecha de creación              |
| updatedAt | DateTime | Última actualización           |

### Tabla: QuestionBank
| Campo         | Tipo     | Descripción                    |
|--------------|----------|--------------------------------|
| id           | String   | CUID único                     |
| type         | String   | Tipo de pregunta               |
| question     | String   | Texto de la pregunta           |
| options      | Json     | Array de opciones              |
| correctAnswer| Int      | Índice de respuesta correcta   |
| difficulty   | String   | "easy", "medium", "hard"       |
| isActive     | Boolean  | Si está activa                 |
| createdAt    | DateTime | Fecha de creación              |

### Tabla: CompletedChallenge
| Campo        | Tipo     | Descripción                    |
|-------------|----------|--------------------------------|
| id          | String   | CUID único                     |
| userId      | String   | FK a User                      |
| type        | String   | Tipo de reto                   |
| timeInSeconds| Int     | Tiempo tomado                  |
| isCorrect   | Boolean  | Si fue correcto                |
| points      | Int      | Puntos obtenidos               |
| weekStart   | DateTime | Inicio de semana (para ranking)|
| completedAt | DateTime | Fecha de completado            |

---

## 🚀 Próximos Pasos

### Funcionalidades Pendientes
1. **UI del Dashboard Admin**: 
   - Crear interfaz visual en `/admin/dashboard` para:
     - Ver lista de estudiantes
     - Crear nuevos estudiantes (formulario)
     - Eliminar estudiantes (confirmación)
     - Ver estadísticas de cada estudiante

2. **Banco de Preguntas Dinámico**:
   - Interfaz admin para crear/editar preguntas
   - Filtrado por tipo y dificultad
   - Activar/desactivar preguntas

3. **Reportes y Estadísticas**:
   - Gráficos de progreso por estudiante
   - Exportar datos a CSV/Excel
   - Comparativas por período

4. **Mejoras de UX**:
   - Loading states en formularios
   - Mensajes de éxito/error más descriptivos
   - Animaciones en transiciones

---

## 📝 Comandos Útiles

### Desarrollo
```bash
# Instalar dependencias
npm install

# Generar cliente de Prisma
npx prisma generate

# Sincronizar schema con base de datos
npx prisma db push

# Abrir Prisma Studio (visualizador de DB)
npx prisma studio

# Ejecutar desarrollo local
npm run dev
```

### Producción (Vercel)
```bash
# Sincronizar variables de entorno
vercel env pull .env.local

# Hacer deploy
vercel --prod
```

---

## 🔄 Migración de Datos

Si tienes datos previos en localStorage, puedes migrarlos manualmente:

1. Exportar datos de localStorage del navegador
2. Crear script de migración para insertar en DB vía Prisma
3. Validar integridad de datos migrados

**Nota**: Actualmente el sistema comienza limpio. Los datos de localStorage no se migran automáticamente.

---

## ✨ Créditos

Sistema desarrollado para **Biblioteca Pandora** - Plataforma educativa de desafíos para estudiantes.

**Stack Tecnológico**:
- Next.js 15
- TypeScript
- Prisma ORM
- Neon PostgreSQL
- TailwindCSS
- Framer Motion
