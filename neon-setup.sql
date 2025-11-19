-- ============================================
-- SQL PARA NEON DATABASE - MUNDO PANDORA
-- ============================================

-- Este script crea:
-- 1. Un usuario administrador
-- 2. Algunos estudiantes de ejemplo
-- 3. Datos de ejemplo de retos completados

-- ============================================
-- 1. CREAR USUARIO ADMINISTRADOR
-- ============================================
-- Nota: El PIN 'admin123' está hasheado con bcrypt
-- Si quieres otra contraseña, genera el hash con:
-- bcrypt.hash('tu_password', 10)

INSERT INTO "User" (id, nickname, pin, role, "createdAt", "updatedAt")
VALUES (
  gen_random_uuid()::text,
  'Profesor Admin',
  '$2b$10$rQYb7zXKZQXKZ5YvGxK3/.xO3Z8QZ5YvGxK3/.xO3Z8QZ5YvGxK3/.',
  'admin',
  NOW(),
  NOW()
)
ON CONFLICT (nickname) DO NOTHING;

-- ============================================
-- 2. CREAR ESTUDIANTES DE EJEMPLO (OPCIONAL)
-- ============================================
-- PIN de ejemplo: 1234 (hasheado)
-- Puedes eliminar estos después de crear tus estudiantes reales

INSERT INTO "User" (id, nickname, pin, role, "createdAt", "updatedAt")
VALUES 
  (gen_random_uuid()::text, 'Juan', '$2b$10$N9qo8uLOickgx2ZMRZoMye.IjefVrpRvIqW3p8K7C6X7uZqP8z0jS', 'student', NOW(), NOW()),
  (gen_random_uuid()::text, 'Maria', '$2b$10$N9qo8uLOickgx2ZMRZoMye.IjefVrpRvIqW3p8K7C6X7uZqP8z0jS', 'student', NOW(), NOW()),
  (gen_random_uuid()::text, 'Pedro', '$2b$10$N9qo8uLOickgx2ZMRZoMye.IjefVrpRvIqW3p8K7C6X7uZqP8z0jS', 'student', NOW(), NOW())
ON CONFLICT (nickname) DO NOTHING;

-- ============================================
-- 3. VERIFICAR QUE SE CREARON CORRECTAMENTE
-- ============================================
SELECT id, nickname, role, "createdAt" 
FROM "User" 
ORDER BY "createdAt" DESC;

-- ============================================
-- COMANDOS ÚTILES PARA ADMINISTRAR LA DB
-- ============================================

-- Ver todos los usuarios
-- SELECT * FROM "User";

-- Ver todos los retos completados
-- SELECT * FROM "CompletedChallenge";

-- Ver ranking semanal
-- SELECT 
--   u.nickname,
--   COUNT(cc.id) as total_retos,
--   SUM(cc.points) as total_puntos,
--   ROUND(AVG(cc."timeInSeconds"), 2) as tiempo_promedio
-- FROM "User" u
-- LEFT JOIN "CompletedChallenge" cc ON u.id = cc."userId"
-- WHERE u.role = 'student'
-- GROUP BY u.id, u.nickname
-- ORDER BY total_puntos DESC;

-- Eliminar todos los retos completados (CUIDADO!)
-- DELETE FROM "CompletedChallenge";

-- Eliminar un estudiante específico
-- DELETE FROM "User" WHERE nickname = 'NombreEstudiante';

-- ============================================
-- INFORMACIÓN IMPORTANTE
-- ============================================

-- CONTRASEÑAS DE LOS USUARIOS DE EJEMPLO:
-- - Profesor Admin: (no usa PIN, usa ADMIN_PASSWORD del .env)
-- - Estudiantes (Juan, Maria, Pedro): PIN = 1234

-- Para crear más estudiantes, usa la interfaz web en /admin
-- o la API POST /api/admin/students

-- Para generar un hash de PIN manualmente en Node.js:
-- const bcrypt = require('bcryptjs');
-- const hash = await bcrypt.hash('1234', 10);
-- console.log(hash);
