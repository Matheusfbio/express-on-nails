-- Habilitar extensão UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Dropar tabela antiga se existir
DROP TABLE IF EXISTS products;

-- Criar tabela com UUID
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir dados de exemplo (opcional)
INSERT INTO products (name, price) VALUES
  ('Product 1', 10.99),
  ('Product 2', 25.50),
  ('Product 3', 15.00);