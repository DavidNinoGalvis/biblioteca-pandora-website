-- SCRIPT SIMPLE PARA NEON - Solo copia y pega esto en el SQL Editor

-- Crear 3 estudiantes de ejemplo con PIN: 1234
INSERT INTO "User" (id, nickname, pin, role, "createdAt", "updatedAt")
VALUES 
  (gen_random_uuid()::text, 'Juan', '$2b$10$N9qo8uLOickgx2ZMRZoMye.IjefVrpRvIqW3p8K7C6X7uZqP8z0jS', 'student', NOW(), NOW()),
  (gen_random_uuid()::text, 'Maria', '$2b$10$N9qo8uLOickgx2ZMRZoMye.IjefVrpRvIqW3p8K7C6X7uZqP8z0jS', 'student', NOW(), NOW()),
  (gen_random_uuid()::text, 'Pedro', '$2b$10$N9qo8uLOickgx2ZMRZoMye.IjefVrpRvIqW3p8K7C6X7uZqP8z0jS', 'student', NOW(), NOW())
ON CONFLICT (nickname) DO NOTHING;

-- Ver los estudiantes creados
SELECT id, nickname, role, "createdAt" FROM "User" ORDER BY "createdAt" DESC;
