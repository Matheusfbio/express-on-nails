-- Habilitar extensão UUID se ainda não estiver
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Criar tabela de usuários
CREATE TABLE users (
  user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -- Inserir usuário de exemplo
-- INSERT INTO users (username, password, role) VALUES
--   ('admin', '$2b$10$hash_aqui', 'admin'),
--   ('user1', '$2b$10$hash_aqui', 'user');
